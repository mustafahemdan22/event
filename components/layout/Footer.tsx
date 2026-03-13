'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  const { t, locale } = useLocale();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: t.nav.home },
    { href: '/shop', label: t.nav.shop },
    { href: '/about', label: t.nav.about },
    { href: '/blog', label: t.nav.blog },
    { href: '/contact', label: t.nav.contact },
  ];

  const categoryLinks = [
    { href: '/category/men', label: t.categories.men },
    { href: '/category/women', label: t.categories.women },
    { href: '/category/kids', label: t.categories.kids },
    { href: '/category/shoes', label: t.categories.shoes },
    { href: '/category/accessories', label: t.categories.accessories },
  ];

  const customerService = [
    { href: '/shipping', label: t.footer.shippingInfo },
    { href: '/returns', label: t.footer.returns },
    { href: '/size-guide', label: t.footer.sizeGuide },
    { href: '/faq', label: t.footer.faq },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )},
    { name: 'Instagram', href: '#', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )},
    { name: 'Twitter', href: '#', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )},
    { name: 'YouTube', href: '#', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
      </svg>
    )},
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.mainFooter}>
        <div className="container">
          <div className={styles.footerGrid}>
            {/* About Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={styles.footerColumn}
            >
              <Link href="/" className={styles.footerLogo}>
                Event
              </Link>
              <p className={styles.footerAbout}>
                {t.footer.aboutText}
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={styles.footerColumn}
            >
              <h3 className={styles.columnTitle}>{t.footer.quickLinks}</h3>
              <ul className={styles.linkList}>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={styles.footerColumn}
            >
              <h3 className={styles.columnTitle}>{t.categories.all}</h3>
              <ul className={styles.linkList}>
                {categoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={styles.footerColumn}
            >
              <h3 className={styles.columnTitle}>{t.footer.customerService}</h3>
              <ul className={styles.linkList}>
                {customerService.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={styles.footerColumn}
            >
              <h3 className={styles.columnTitle}>{t.footer.newsletter}</h3>
              <p className={styles.newsletterText}>{t.footer.newsletterText}</p>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder={t.home.newsletter.placeholder}
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z"/>
                    <path d="M22 2 11 13"/>
                  </svg>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
  <div className="container">
    <div className={styles.bottomContent}>
      <div className={styles.copyright}>
        <p>© {currentYear} Event. {t.footer.rights}.</p>
        <p style={{ fontSize: '0.75rem', opacity: 0.9 , marginTop: '4px' }}>
          {locale === 'en' ? 'Tax Registration No' : 'رقم التسجيل الضريبي'}: {(t.contact.info as any).taxNo}
        </p>
        <p style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '4px' }}>
          {locale === 'en' ? 'Website by mustafa' : 'تم التطوير بواسطة مصطفي حمدان'}
        </p>
      </div>
     
    </div>
  </div>
</div>
    </footer>
  );
}
