'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';
import styles from '@/styles/Hero.module.css';

export default function Hero() {
  const { t, isRTL } = useLocale();
          const text = t.home.hero.title.split("");


  return (
    
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.gradientOverlay} />
        <div className={styles.pattern} />
      </div>

      <div className="container">
        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >

<motion.h1
  className={styles.title}
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.9,
      },
    },
  }}
>
  {text.map((char, index) => (
    <motion.span
      key={index}
      variants={{
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4 }}
    >
      {char}
    </motion.span>
  ))}
</motion.h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t.home.hero.subtitle}
            </motion.p>

            <motion.div
              className={styles.buttons}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/shop" className={styles.primaryButton}>
                {t.home.hero.cta}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/category/women" className={styles.secondaryButton}>
                {t.home.hero.secondary}
              </Link>
            </motion.div>

            <motion.div
              className={styles.stats}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Products</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>50k+</span>
                <span className={styles.statLabel}>Customers</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>4.9</span>
                <span className={styles.statLabel}>Rating</span>
              </div>
            </motion.div>
          </motion.div>

        
        </div>
      </div>

    </section>
  );
}
