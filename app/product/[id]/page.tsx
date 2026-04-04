'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useLocale, getLocalizedText } from '@/context/LocaleContext';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import ProductCard from '@/components/product/ProductCard';
import styles from '@/styles/ProductDetail.module.css';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = React.use(params);
  const product = useQuery(api.functions.products.getProductByManualId, { id: resolvedParams.id });
  const categoryProducts = useQuery(api.functions.products.getProductsByCategory, 
    { category: product?.category || '' }
  );
  
  const relatedProducts = React.useMemo(() => {
    if (!product || !categoryProducts) return [];
    return categoryProducts
      .filter((p) => p._id !== product._id)
      .slice(0, 4);
  }, [product, categoryProducts]);
  
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { t, locale } = useLocale();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Define fallback options in case product has no sizes/colors in DB
  const availableSizes = product?.sizes?.length ? product.sizes : ['S', 'M', 'L', 'XL'];
  const availableColors = product?.colors?.length ? product.colors : [
    { name: 'Black', nameAr: 'أسود', hex: '#000000' },
    { name: 'White', nameAr: 'أبيض', hex: '#FFFFFF' },
    { name: 'Navy', nameAr: 'كحلي', hex: '#000080' }
  ];

  if (product === undefined) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className={styles.notFound}>
        <h1>{locale === 'en' ? 'Product not found' : 'المنتج غير موجود'}</h1>
        <Link href="/shop" className={styles.backButton}>
          {t.cart.continueShopping}
        </Link>
      </div>
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
    if (!selectedSize || !selectedColor) {
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">{t.nav.home}</Link>
          <span>/</span>
          <Link href="/shop">{t.nav.shop}</Link>
          <span>/</span>
          <span>{name}</span>
        </nav>

        <div className={styles.productSection}>
          {/* Image Gallery */}
          <div className={styles.gallery}>
            <motion.div
              className={styles.mainImage}
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={getCloudinaryUrl(product.images[selectedImage], { width: 1000, quality: 'auto' })}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                priority
              />
              {hasDiscount && (
                <span className={styles.discountBadge}>-{discountPercent}%</span>
              )}
            </motion.div>
            
            {product.images.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`${styles.thumbnail} ${selectedImage === idx ? styles.activeThumbnail : ''}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <Image
                      src={getCloudinaryUrl(img, { width: 200, height: 200, quality: 'auto' })}
                      alt={`${name} ${idx + 1}`}
                      fill
                      sizes="100px"
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={styles.name}>{name}</h1>

              {/* Rating */}
              <div className={styles.rating}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
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
                <span className={styles.reviewCount}>
                  ({product.reviews} {t.product.reviews})
                </span>
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

              {/* Description */}
              <p className={styles.description}>{description}</p>

              {/* Size Selection */}
              <div className={styles.optionSection}>
                <label className={styles.optionLabel}>
                  {t.product.size}: <span className={styles.optionValue}>{selectedSize || t.product.selectSize}</span>
                </label>
                <div className={styles.sizes}>
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeButton} ${selectedSize === size ? styles.activeSize : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className={styles.optionSection}>
                <label className={styles.optionLabel}>
                  {t.product.color}: <span className={styles.optionValue}>
                    {selectedColor ? (locale === 'ar' ? selectedColor.nameAr : selectedColor.name) : t.product.selectColor}
                  </span>
                </label>
                <div className={styles.colors}>
                  {availableColors.map((color) => (
                    <button
                      key={color.hex}
                      className={`${styles.colorButton} ${selectedColor?.hex === color.hex ? styles.activeColor : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color)}
                      title={locale === 'ar' ? color.nameAr : color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className={styles.optionSection}>
                <label className={styles.optionLabel}>{t.product.quantity}</label>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
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
                    >
                      {addedToCart ? '✓ ' : ''}
                      {addedToCart 
                        ? (locale === 'en' ? 'Added!' : 'تمت الإضافة!') 
                        : t.product.addToCart}
                    </motion.button>
                  ) : (
                    <motion.div
                      key="selection-prompt"
                      className={styles.selectionPrompt}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
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
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                </motion.button>
              </div>

              {/* Stock Status */}
              <div className={styles.stockStatus}>
                {product.inStock && product.stock > 0 ? (
                  <span className={styles.inStock}>
                    ✓ {t.product.inStock} 
                    {product.stock < 10 && ` (${locale === 'ar' ? 'بقي فقط' : 'Only'} ${product.stock} ${locale === 'ar' ? 'متوفر' : 'left'})`}
                  </span>
                ) : (
                  <span className={styles.outOfStock}>✗ {t.product.outOfStock}</span>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>{t.product.relatedProducts}</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((product, index) => (
                <ProductCard key={product._id} product={product as any} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
