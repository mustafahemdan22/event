'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ProductCard from '@/components/product/ProductCard';
import { useLocale } from '@/context/LocaleContext';
import styles from '@/styles/FeaturedProducts.module.css';

export default function FeaturedProducts() {
  const { t, locale } = useLocale();
  const featuredProducts = useQuery(api.products.getFeaturedProducts);

  if (featuredProducts === undefined) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.loading}>Loading featured products...</div>
        </div>
      </section>
    );
  }

  if (!featuredProducts || featuredProducts.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.headerContent}>
            <h2 className={styles.title}>{t.home.featured.title}</h2>
            <p className={styles.subtitle}>{t.home.featured.subtitle}</p>
          </div>
          <Link href="/shop?filter=featured" className={styles.viewAll}>
            {t.product.viewDetails}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

        <div className={styles.grid}>
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
