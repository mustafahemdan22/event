'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';
import { branches } from '@/data/branches';
import styles from '@/styles/About.module.css';

export default function AboutPage() {
  const { t, locale } = useLocale();

  const values = [
    {
      icon: '✨',
      title: t.about.values.quality,
      description: t.about.values.qualityDesc,
    },
    {
      icon: '👗',
      title: t.about.values.style,
      description: t.about.values.styleDesc,
    },
    {
      icon: '🤝',
      title: t.about.values.service,
      description: t.about.values.serviceDesc,
    },
  ];
const team = [
  {
    name: locale === 'en' ? 'Islam' : 'إسلام',
    role: locale === 'en' ? 'Manager' : 'مدير',
    image: '/team1.jpeg',
  },
  {
    name: locale === 'en' ? 'Mohamed' : 'محمد',
    role: locale === 'en' ? 'Supervisor' : 'سوبرفايزر',
    image: '/team2.jpeg  ',
  },
  {
    name: locale === 'en' ? 'Walid' : 'وليد',
    role: locale === 'en' ? 'Salesperson' : 'بائع',
    image: "/team3.jpeg"
  },
];
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.heroTitle}>{t.about.title}</h1>
            <p className={styles.heroSubtitle}>
              {locale === 'en' 
                ? "EVENT is a leading clothing store in Egypt, redefining fashion without limits. We bring you the latest trends, premium quality, and styles that let you express yourself freely."
                : "إيفينت هو متجر ملابس رائد في مصر، يعيد تعريف الموضة بلا حدود. نقدم لك أحدث الصيحات، بجودة عالية، وتصاميم تتيح لك التعبير عن نفسك بحرية."}            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.storyGrid}>
            <motion.div
              className={styles.storyImage}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800"
                alt="Our Story"
                fill
                className={styles.image}
              />
            </motion.div>
            <motion.div
              className={styles.storyContent}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>{t.about.story.title}</h2>
              <p className={styles.sectionText}>{t.about.story.content}</p>
              
              <h2 className={styles.sectionTitle}>{t.about.mission.title}</h2>
              <p className={styles.sectionText}>{t.about.mission.content}</p>
              
              <h2 className={styles.sectionTitle}>{t.about.vision.title}</h2>
              <p className={styles.sectionText}>{t.about.vision.content}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <motion.h2
            className={styles.valuesSectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.about.values.title}
          </motion.h2>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className={styles.valueIcon}>{value.icon}</span>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.section}>
        <div className="container">
          <motion.h2
            className={styles.teamTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {locale === 'en' ? 'Meet Our Team' : 'تعرف على فريقنا'}
          </motion.h2>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.teamImage}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={styles.image}
                  />
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </motion.div>
            ))}
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
            {locale === 'en' ? 'Our Expansion - Branches' : 'توسعنا - فروعنا'}
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
