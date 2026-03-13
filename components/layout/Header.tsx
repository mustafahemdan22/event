"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocale } from "@/context/LocaleContext";
import styles from "@/styles/Header.module.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({  top: 0, behavior: "smooth" });
  };

  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { locale, toggleLocale, t, isRTL } = useLocale();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];

  const productCategories = [
    { href: "/category/men", label: t.categories.men },
    { href: "/category/women", label: t.categories.women },
    { href: "/category/kids", label: t.categories.kids },
    { href: "/category/Accessories", label: t.categories.accessories },
    { href: "/category/Lingerie", label: t.categories.lingerie },
    { href: "/category/shoes", label: t.categories.shoes },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
      {/* Top Bar - Disappears on scroll */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            className={styles.topBar}
            initial={{ height: "auto", opacity: 1 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`container ${styles.topBarContent}`}>
              <div className={styles.discountBanner}>
                {locale === "en"
                  ? "🎉 Special Offer: 20% OFF on your first order!"
                  : "🎉 عرض خاص: خصم 20% على طلبك الأول!"}
              </div>
             <div className={styles.topSocials}>
  <a href="#" className={styles.socialLink}>
    <FaFacebookF />
  </a>

  <a href="#" className={styles.socialLink}>
    <FaInstagram />
  </a>

  <a href="#" className={styles.socialLink}>
    <FaTwitter />
  </a>
</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.navContent}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              Event
            </Link>

            {/* Desktop Navigation */}
            <ul className={styles.navLinks}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}

              <li
                className={styles.productsWrapper}
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <Link href="/shop" className={styles.navLink}>
                  {t.nav.products} ▾
                </Link>

                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className={styles.productsDropdown}
                    >
                      {productCategories.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={styles.dropdownLink}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            {/* Actions */}
            <div className={styles.actions}>
              {/* Language */}
              <button className={styles.iconButton} onClick={toggleLocale}>
                <span className={styles.langText}>
                  {locale === "en" ? "AR" : "EN"}
                </span>
              </button>

              {/* Theme */}
              <button className={styles.iconButton} onClick={toggleTheme}>
                {resolvedTheme === "dark" ? "☀️" : "🌙"}
              </button>

              {/* Desktop Only Icons */}
              <div className={styles.desktopOnly}>
                

                <Link href="/wishlist" className={styles.iconButton}>
                  ❤️
                  {wishlistItems.length > 0 && (
                    <span className={styles.badge}>{wishlistItems.length}</span>
                  )}
                </Link>

                <Link href="/cart" className={styles.iconButton}>
                  🛒
                  {totalItems > 0 && (
                    <span className={styles.badge}>{totalItems}</span>
                  )}
                </Link>

                <Link href="/login" className={styles.iconButton}>
                  👤
                </Link>
              </div>

              {/* Burger */}
              <button
                className={styles.menuButton}
                onClick={() => setIsMenuOpen((p) => !p)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={styles.mobileMenu}
            >
              {/* Mobile Actions */}
              <div className={styles.mobileActions}>
                <Link href="/wishlist" className={styles.iconButton}>
                  ❤️
                </Link>
                <Link href="/cart" className={styles.iconButton}>
                  🛒
                </Link>
                <Link href="/login" className={styles.iconButton}>
                  👤
                </Link>
              </div>

              <ul className={styles.mobileNavLinks}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={styles.mobileNavLink}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

                {/* Mobile Categories Accordion */}
                <li className={styles.mobileProductsGroup}>
                  <button
                    className={styles.mobileCategoryToggle}
                    onClick={() => setIsMobileCategoriesOpen((prev) => !prev)}
                  >
                    <span>{t.nav.products}</span>
                    <motion.span
                      animate={{ rotate: isMobileCategoriesOpen ? 360 : 0 }}
                      transition={{ duration: 0.45 }}
                    >
                     ▾
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isMobileCategoriesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        {productCategories.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={styles.mobileSubLink}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Controls */}
      <AnimatePresence>
        {isScrolled && (
          <>
            {/* Scroll to Top Arrow - Bottom Left */}
            <motion.button
              className={styles.scrollToTop}
              onClick={scrollToTop}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ↑
            </motion.button>

            {/* Floating Social Icons - Bottom Right */}
            <motion.div
              className={styles.floatingSocials}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              <a href="#" className={styles.floatingSocialLink}><FaFacebookF/></a>
              <a href="#" className={styles.floatingSocialLink}><FaInstagram/> </a>
              <a href="#" className={styles.floatingSocialLink}><FaTwitter/> </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
