'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { getCategoryBySlug } from '@/data/categories';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ProductCard from '@/components/product/ProductCard';
import { useLocale, getLocalizedText } from '@/context/LocaleContext';
import styles from '@/styles/Category.module.css';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const category = getCategoryBySlug(resolvedParams.slug);
  const convexProducts = useQuery(api.products.getProductsByCategory, 
    { category: resolvedParams.slug }
  );
  const { t, locale } = useLocale();

  if (convexProducts === undefined) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className={styles.notFound}>
        <h1>{locale === 'en' ? 'Category not found' : 'الفئة غير موجودة'}</h1>
        <Link href="/shop" className={styles.backButton}>
          {t.cart.continueShopping}
        </Link>
      </div>
    );
  }

  const products = convexProducts || [];

  const name = getLocalizedText(category, 'name', locale);
  const description = getLocalizedText(category, 'description', locale);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div 
        className={styles.hero}
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {name}
          </motion.h1>
          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      <div className="container">
        <div className={styles.productsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {products.length} {locale === 'en' ? 'Products' : 'منتج'}
            </h2>
          </div>

          {products.length > 0 ? (
            <div className={styles.grid}>
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className={styles.noProducts}>
              <p>{t.shop.noProducts}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
