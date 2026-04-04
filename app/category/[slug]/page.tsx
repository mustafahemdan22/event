'use client';

import React, { use } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ProductCard from '@/components/product/ProductCard';
import { useLocale, getLocalizedText } from '@/context/LocaleContext';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import styles from '@/styles/Category.module.css';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  
  // Fetch Category and Products dynamically from Convex
  const category = useQuery(api.functions.categories.getCategoryBySlug, { slug: resolvedParams.slug });
  const convexProducts = useQuery(api.functions.products.getProductsByCategory, { category: resolvedParams.slug });
  const { t, locale } = useLocale();

  if (category === undefined || convexProducts === undefined) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (category === null) {
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

  const name = locale === 'ar' ? category.name : category.nameEn;
  const description = locale === 'ar' ? category.description : category.descriptionEn;
  const headerImageUrl = category.heroImagePublicId ? getCloudinaryUrl(category.heroImagePublicId, { width: 1920, quality: 'auto' }) : '';

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div 
        className={styles.hero}
        style={headerImageUrl ? { backgroundImage: `url(${headerImageUrl})` } : { backgroundColor: '#333' }}
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
                <ProductCard key={product._id} product={product as any} index={index} />
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
