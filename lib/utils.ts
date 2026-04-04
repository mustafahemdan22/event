/**
 * Format a price number for display, with locale-aware currency formatting.
 */
export function formatPrice(price: number, locale: string = 'en'): string {
  if (locale === 'ar') {
    return `${price.toFixed(2)} ج.م`;
  }
  return `${price.toFixed(2)} EGP`;
}

/**
 * Calculate the discount percentage between an original price and a sale price.
 */
export function getDiscountPercentage(
  originalPrice: number,
  salePrice: number
): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
