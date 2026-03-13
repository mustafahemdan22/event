'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';
import { branches } from '@/data/branches';
import styles from '@/styles/Contact.module.css';

export default function ContactPage() {
  const { t, locale } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: locale === 'en' ? 'Address' : 'العنوان',
      content: t.contact.info.address,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      title: locale === 'en' ? 'Email' : 'البريد الإلكتروني',
      content: t.contact.info.email,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: locale === 'en' ? 'Phone' : 'الهاتف',
      content: t.contact.info.phone,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: locale === 'en' ? 'Hours' : 'ساعات العمل',
      content: t.contact.info.hours,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      title: locale === 'en' ? 'Tax ID' : 'الرقم الضريبي',
      content: (t.contact.info as any).taxNo,
    },
  ];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        
        <div className="container">
          <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.234963249234!2d29.9956621!3d31.2673493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5daa1b61c0f6f%3A0x98df462f596b1d5d!2sEvent+(Miami)!5e0!3m2!1sen!2seg!4v1697056087881!5m2!1sen!2seg"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.heroTitle}>{t.contact.title}</h1>
            <p className={styles.heroSubtitle}>{t.contact.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            {/* Contact Form */}
            <motion.div
              className={styles.formContainer}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.contact.form.name}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.contact.form.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.contact.form.subject}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.contact.form.message}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows={5}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.contact.form.send}
                </motion.button>

                {isSubmitted && (
                  <motion.p
                    className={styles.successMessage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ {t.contact.form.success}
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className={styles.infoContainer}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.infoCards}>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className={styles.infoCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={styles.infoIcon}>{info.icon}</div>
                    <div>
                      <h3 className={styles.infoTitle}>{info.title}</h3>
                      <p className={styles.infoContent}>{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className={styles.mapContainer}>
                <a 
                  href="https://bit.ly/3z3C0Bw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.mapPlaceholder}
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  <span>📍</span>
                  <p>{locale === 'en' ? 'View Location on Map' : 'عرض الموقع على الخريطة'}</p>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className={styles.branchesSection}>
        <div className="container">
          <motion.h2 
            className={styles.branchesTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {locale === 'en' ? 'Our Branches' : 'فروعنا'}
          </motion.h2>

          <div className={styles.branchGrid}>
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                className={styles.branchCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.branchHeader}>
                  <h3 className={styles.branchName}>{branch.name[locale]}</h3>
                  <span className={styles.branchBadge}>{branch.city[locale]}</span>
                </div>

                <div className={styles.branchInfo}>
                  <div className={styles.infoItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{branch.address[locale]}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <a href={`tel:${branch.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {branch.phone}
                    </a>
                  </div>

                  <div className={styles.infoItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>
                      {locale === 'en' 
                        ? '10:00 AM - 11:00 PM (Fri: 12:00 AM)' 
                        : '10:00 ص - 11:00 م (الجمعة: 12:00 ص)'}
                    </span>
                  </div>
                </div>

                <a 
                  href={branch.mapLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.branchLink}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                  {locale === 'en' ? 'Open in Maps' : 'فتح في الخرائط'}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
