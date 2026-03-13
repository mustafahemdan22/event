'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ProductCard from '@/components/product/ProductCard';
import { useLocale } from '@/context/LocaleContext';
import styles from '@/styles/NewArrivals.module.css'; // Keeping original styles import as the instruction's snippet had a different one but didn't explicitly state to change it.

export default function NewArrivals() {
  const { t } = useLocale();
  const newArrivals = useQuery(api.products.getNewArrivals);

  if (newArrivals === undefined) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.loading}>Loading new arrivals...</div> {/* Added text for clarity */}
        </div>
      </section>
    );
  }

  if (!newArrivals || newArrivals.length === 0) return null;

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
            <h2 className={styles.title}>{t.home.newArrivals.title}</h2>
            <p className={styles.subtitle}>{t.home.newArrivals.subtitle}</p>
          </div>
          <Link href="/shop?filter=new" className={styles.viewAll}>
            {t.product.viewDetails}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>

        <div className={styles.grid}>
          {newArrivals.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
