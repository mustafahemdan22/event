'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useLocale } from '@/context/LocaleContext';
import { formatPrice } from '@/lib/utils';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import styles from '@/styles/Cart.module.css';

export default function CartPage() {
  const { items, totalItems, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const { t, locale } = useLocale();

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.emptyIcon}>🛒</div>
          <h1 className={styles.emptyTitle}>{t.cart.empty}</h1>
          <Link href="/shop" className={styles.continueButton}>
            {t.cart.continueShopping}
          </Link>
        </motion.div>
      </div>
    );
  }

  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className={styles.page}>
      <div className="container">
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t.cart.title} ({totalItems})
        </motion.h1>

        <div className={styles.content}>
          {/* Cart Items */}
          <div className={styles.items}>
            {items.map((item, index) => {
              const name = locale === 'ar' ? item.product.nameAr : item.product.name;
              const colorName = locale === 'ar' ? item.selectedColor.nameAr : item.selectedColor.name;
              const productId = (item.product.id || item.product._id) as string;

              // ✅ fallback image
              const imageUrl = item.product.images?.length
                ? getCloudinaryUrl(item.product.images[0], {
                    width: 120,
                    quality: 'auto',
                    crop: 'fill',
                  })
                : '/images/placeholder.png';

              return (
                <motion.div
                  key={`${productId}-${item.selectedSize}-${item.selectedColor.hex}`}
                  className={styles.item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Image */}
                  <div className={styles.itemImage}>
                    <Image
                      src={imageUrl}
                      alt={name || ''}
                      fill
                      sizes="120px"
                      className={styles.image}
                    />
                  </div>

                  {/* Details */}
                  <div className={styles.itemDetails}>
                    <Link href={`/product/${productId}`} className={styles.itemName}>
                      {name}
                    </Link>

                    <div className={styles.itemMeta}>
                      <span>{t.product.size}: {item.selectedSize}</span>
                      <span className={styles.metaDivider}>|</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {t.product.color}:
                        <span
                          className={styles.colorDot}
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {colorName}
                      </span>
                    </div>

                    <div className={styles.itemPrice}>
                      {formatPrice(item.product.price, locale)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={styles.itemActions}>
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.quantityButton}
                        onClick={() =>
                          updateQuantity(
                            productId,
                            item.selectedSize,
                            item.selectedColor.hex,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>

                      <span className={styles.quantityValue}>{item.quantity}</span>

                      <button
                        className={styles.quantityButton}
                        onClick={() =>
                          updateQuantity(
                            productId,
                            item.selectedSize,
                            item.selectedColor.hex,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className={styles.removeButton}
                      onClick={() =>
                        removeItem(
                          productId,
                          item.selectedSize,
                          item.selectedColor.hex
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>

                  {/* Total */}
                  <div className={styles.itemTotal}>
                    {formatPrice(item.product.price * item.quantity, locale)}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <motion.div
            className={styles.summary}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={styles.summaryTitle}>
              {locale === 'en' ? 'Order Summary' : 'ملخص الطلب'}
            </h2>

            <div className={styles.summaryRow}>
              <span>{t.cart.subtotal}</span>
              <span>{formatPrice(subtotal, locale)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>{t.cart.shipping}</span>
              <span>{shipping === 0 ? t.cart.free : formatPrice(shipping, locale)}</span>
            </div>

            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>{t.cart.total}</span>
              <span>{formatPrice(total, locale)}</span>
            </div>

            <Link href="/checkout" className={styles.checkoutButton}>
              {t.cart.checkout}
            </Link>

            <Link href="/shop" className={styles.continueLink}>
              {t.cart.continueShopping}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}