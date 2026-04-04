'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useLocale, getLocalizedText } from '@/context/LocaleContext';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import styles from '@/styles/ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { locale, t } = useLocale();

  const name = getLocalizedText(product, 'name', locale);
  const productId = (product.id || product._id) as string;
  const isWishlisted = isInWishlist(productId);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? getDiscountPercentage(product.originalPrice!, product.price)
    : 0;

  // Optimized image URL
  const imageUrl = getCloudinaryUrl(product.images[0], { width: 500, quality: 'auto' });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sizes?.length && product.colors?.length) {
      addItem(product, product.sizes[0], product.colors[0]);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${productId}`} className={styles.cardLink}>
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <motion.div
            className={styles.imageWrapper}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {!imageError ? (
              <Image
                src={imageUrl} // Using optimized image URL
                alt={name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={styles.image}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </div>
            )}
          </motion.div>

          {/* Badges */}
          <div className={styles.badges}>
            {hasDiscount && (
              <span className={styles.discountBadge}>-{discountPercent}%</span>
            )}
            {product.newArrival && (
              <span className={styles.newBadge}>
                {t.product.new}
              </span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className={styles.lowStockBadge}>{t.product.lowStock}</span>
            )}
            {product.stock === 0 && (
              <span className={styles.outOfStockBadge}>{t.product.outOfStock}</span>
            )}
          </div>

          {/* Hover Overlay with Actions */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.actions}>
              {/* Wishlist Button */}
              <motion.button
                className={`${styles.actionButton} ${isWishlisted ? styles.wishlisted : ''}`}
                onClick={handleToggleWishlist}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0 }}
                title={isWishlisted ? t.product.removeFromWishlist : t.product.addToWishlist}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </motion.button>

              {/* Add to Cart Button */}
              <motion.button
                className={styles.actionButton}
                onClick={handleAddToCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                title={t.product.addToCart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
              </motion.button>

              {/* View Details Button */}
              <motion.button
                className={styles.actionButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                title={t.product.viewDetails}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          
          {/* Rating */}
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={star <= Math.floor(product.rating) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  className={star <= Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className={styles.reviewCount}>({product.reviews})</span>
          </div>

          {/* Price */}
          <div className={styles.priceContainer}>
            <span className={styles.price}>{formatPrice(product.price, locale)}</span>
            {hasDiscount && (
              <span className={styles.originalPrice}>
                {formatPrice(product.originalPrice!, locale)}
              </span>
            )}
          </div>

          {/* Colors Preview */}
          {product.colors && product.colors.length > 0 && (
            <div className={styles.colors}>
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color.hex}
                  className={styles.colorDot}
                  style={{ backgroundColor: color.hex }}
                  title={locale === 'ar' ? color.nameAr : color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className={styles.moreColors}>+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
