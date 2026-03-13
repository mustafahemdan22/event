'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { categories } from '@/data/categories';
import ProductCard from '@/components/product/ProductCard';
import { useLocale, getLocalizedText } from '@/context/LocaleContext';
import styles from '@/styles/Shop.module.css';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

export default function ShopPage() {
  const { t, locale } = useLocale();
  const convexProducts = useQuery(api.products.getProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productsPerPage = 12;

  const filteredProducts = useMemo(() => {
    if (!convexProducts) return [];
    let result = [...convexProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        // Keep original order (assume newest first)
        break;
    }

    return result;
  }, [convexProducts, selectedCategory, sortBy, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 500]);
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Page Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.title}>{t.shop.title}</h1>
          <p className={styles.subtitle}>
            {t.shop.showing} {filteredProducts.length} {t.shop.products}
          </p>
        </motion.div>

        <div className={styles.content}>
          {/* Mobile Filter Toggle */}
          <button
            className={styles.filterToggle}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            {t.shop.filters}
          </button>

          {/* Sidebar Filters */}
          <aside className={`${styles.sidebar} ${isFilterOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>{t.shop.category}</h3>
              <ul className={styles.filterList}>
                <li>
                  <button
                    className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
                    onClick={() => handleCategoryChange('all')}
                  >
                    {t.shop.allProducts}
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      className={`${styles.filterButton} ${selectedCategory === cat.slug ? styles.active : ''}`}
                      onClick={() => handleCategoryChange(cat.slug)}
                    >
                      {getLocalizedText(cat, 'name', locale)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>{t.shop.price}</h3>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className={styles.priceInput}
                  min={0}
                  max={priceRange[1]}
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className={styles.priceInput}
                  min={priceRange[0]}
                  max={1000}
                />
              </div>
            </div>

            <button className={styles.clearFilters} onClick={handleClearFilters}>
              {t.shop.clearFilters}
            </button>
          </aside>

          {/* Products Grid */}
          <main className={styles.main}>
            {/* Sort Controls */}
            <div className={styles.controls}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className={styles.sortSelect}
              >
                <option value="newest">{t.shop.sortOptions.newest}</option>
                <option value="price-asc">{t.shop.sortOptions.priceAsc}</option>
                <option value="price-desc">{t.shop.sortOptions.priceDesc}</option>
                <option value="name">{t.shop.sortOptions.name}</option>
              </select>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className={styles.grid}>
                {paginatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className={styles.noProducts}>
                <p>{t.shop.noProducts}</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  {t.common.previous}
                </button>
                
                <div className={styles.pageNumbers}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  {t.common.next}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
