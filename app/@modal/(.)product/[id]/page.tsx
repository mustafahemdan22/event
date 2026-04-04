'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useLocale, getLocalizedText } from '@/context/LocaleContext';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import Modal from '@/components/ui/Modal';
import styles from '@/styles/ProductDetail.module.css';

interface InterceptedProductPageProps {
  params: Promise<{ id: string }>;
}

export default function InterceptedProductPage({ params }: InterceptedProductPageProps) {
  const resolvedParams = React.use(params);
  const product = useQuery(api.functions.products.getProductByManualId, { id: resolvedParams.id });

  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { t, locale } = useLocale();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const availableSizes = product?.sizes?.length ? product.sizes : ['S', 'M', 'L', 'XL'];
  const availableColors = product?.colors?.length ? product.colors : [
    { name: 'Black', nameAr: 'أسود', hex: '#000000' },
    { name: 'White', nameAr: 'أبيض', hex: '#FFFFFF' },
    { name: 'Navy', nameAr: 'كحلي', hex: '#000080' }
  ];

  if (product === undefined) {
    return (
      <Modal>
        <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className={styles.spinner}></div>
        </div>
      </Modal>
    );
  }

  if (product === null) {
    return (
      <Modal>
        <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
          <h2>{locale === 'en' ? 'Product not found' : 'المنتج غير موجود'}</h2>
        </div>
      </Modal>
    );
  }

  const name = getLocalizedText(product, 'name', locale);
  const description = getLocalizedText(product, 'description', locale);
  const isWishlisted = isInWishlist(product._id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? getDiscountPercentage(product.originalPrice!, product.price)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Modal>
      <div className={styles.productSection} style={{ gap: '2rem', padding: '1rem' }}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage} style={{ maxHeight: '400px' }}>
            <Image
              src={getCloudinaryUrl(product.images[selectedImage], { width: 600, quality: 'auto' })}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              style={{ objectFit: 'contain' }}
              priority
            />
            {hasDiscount && (
              <span className={styles.discountBadge}>-{discountPercent}%</span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  className={`${styles.thumbnail} ${selectedImage === idx ? styles.activeThumbnail : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <Image
                    src={getCloudinaryUrl(img, { width: 100, height: 100, quality: 'auto' })}
                    alt={`${name} ${idx + 1}`}
                    fill
                    sizes="80px"
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.info}>
          <h1 className={styles.name} style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{name}</h1>

          {/* Price */}
          <div className={styles.priceContainer} style={{ marginBottom: '1rem' }}>
            <span className={styles.price}>{formatPrice(product.price, locale)}</span>
            {hasDiscount && (
              <span className={styles.originalPrice}>
                {formatPrice(product.originalPrice!, locale)}
              </span>
            )}
          </div>

          <p className={styles.description} style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {description.length > 150 ? description.substring(0, 150) + '...' : description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Size Selection */}
            <div className={styles.optionSection} style={{ marginBottom: 0 }}>
              <label className={styles.optionLabel} style={{ fontSize: '0.85rem' }}>
                {t.product.size}: <span className={styles.optionValue}>{selectedSize || t.product.selectSize}</span>
              </label>
              <div className={styles.sizes}>
                {availableSizes.map((size: string) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${selectedSize === size ? styles.activeSize : ''}`}
                    onClick={() => setSelectedSize(size)}
                    style={{ minWidth: '2.5rem', padding: '0.5rem', fontSize: '0.8rem' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className={styles.optionSection} style={{ marginBottom: 0 }}>
              <label className={styles.optionLabel} style={{ fontSize: '0.85rem' }}>
                {t.product.color}: <span className={styles.optionValue}>
                  {selectedColor ? (locale === 'ar' ? selectedColor.nameAr : selectedColor.name) : t.product.selectColor}
                </span>
              </label>
              <div className={styles.colors}>
                {availableColors.map((color: any) => (
                  <button
                    key={color.hex}
                    className={`${styles.colorButton} ${selectedColor?.hex === color.hex ? styles.activeColor : ''}`}
                    style={{ backgroundColor: color.hex, width: '2rem', height: '2rem' }}
                    onClick={() => setSelectedColor(color)}
                    title={locale === 'ar' ? color.nameAr : color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <AnimatePresence mode="wait">
              {selectedSize && selectedColor ? (
                <motion.button
                  key="add-to-cart-btn"
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{ padding: '0.75rem' }}
                >
                  {addedToCart ? '✓ ' : ''}
                  {addedToCart ? (locale === 'en' ? 'Added!' : 'تمت الإضافة!') : t.product.addToCart}
                </motion.button>
              ) : (
                <motion.div
                  key="selection-prompt"
                  className={styles.selectionPrompt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  style={{ padding: '0.75rem', fontSize: '0.85rem' }}
                >
                  {locale === 'en' ? 'Select Size and Color to Add' : 'اختر المقاس واللون للإضافة'}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}
              onClick={() => toggleItem(product)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ width: '3rem', height: '3rem' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </motion.button>
          </div>

        </div>
      </div>
    </Modal>
  );
}
