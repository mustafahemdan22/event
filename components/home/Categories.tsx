'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { useLocale } from '@/context/LocaleContext';
import styles from '@/styles/Categories.module.css';

export default function Categories() {
  const { t, locale } = useLocale();
  const convexCategories = useQuery(api.functions.categories.listCategories);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  if (convexCategories === undefined) {
    return null; // Loading state
  }
  
  const categories = convexCategories || [];

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
          <h2 className={styles.title}>{t.home.categories.title}</h2>
          <p className={styles.subtitle}>{t.home.categories.subtitle}</p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category: any, index: number) => (
            <motion.div
              key={category._id}
              variants={itemVariants}
              className={`${styles.card} ${index === 0 || index === 3 ? styles.cardLarge : ''}`}
            >
              <Link href={`/category/${category.slug}`} className={styles.cardLink}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={getCloudinaryUrl(category.heroImagePublicId, { width: 800, quality: 'auto', crop: 'fill' })}
                    alt={locale === 'ar' ? category.name : category.nameEn}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                  />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.categoryName}>
                    {locale === 'ar' ? category.name : category.nameEn}
                  </h3>
                  <p className={styles.productCount}>
                    {category.productCount} {locale === 'en' ? 'Products' : 'منتج'}
                  </p>
                  <span className={styles.shopNow}>
                    {locale === 'en' ? 'Shop Now' : 'تسوق الآن'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
