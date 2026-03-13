/**
 * Cloudinary utility to generate optimized image URLs.
 * Default cloud name is 'gravity-store' unless overridden by environment variable.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dfq1xxerr';

interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  format?: string;
  crop?: string;
}

/**
 * Transforms a Cloudinary URL or a public ID into an optimized URL.
 * If the input is not a Cloudinary URL, it returns it as is.
 */
export function getCloudinaryUrl(src: string, options: CloudinaryOptions = {}) {
  if (!src.includes('res.cloudinary.com')) return src;

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options;

  // Extract the part after /upload/
  const parts = src.split('/upload/');
  if (parts.length < 2) return src;

  const baseUrl = parts[0] + '/upload/';
  const publicId = parts[1];

  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (crop && (width || height)) transformations.push(`c_${crop}`);

  const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : '';

  return `${baseUrl}${transformationString}${publicId}`;
}
