const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dfq1xxerr';

interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  crop?: string;
  format?: string;
}

/**
 * Generates an optimized Cloudinary URL from a public ID or raw URL.
 * If a full URL is passed, it is returned as-is.
 * If a public ID is passed, a transformation URL is built.
 */
export function getCloudinaryUrl(publicIdOrUrl: string, options: CloudinaryOptions = {}): string {
  if (!publicIdOrUrl) return '';

  // If it's already a full URL, return as-is
  if (publicIdOrUrl.startsWith('http')) {
    return publicIdOrUrl;
  }

  const { width = 800, quality = 'auto', crop, format = 'auto' } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (crop) transforms.push(`c_${crop}`);

  const transformStr = transforms.join(',');
  const cleanId = publicIdOrUrl.startsWith('/') ? publicIdOrUrl.slice(1) : publicIdOrUrl;

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformStr}/${cleanId}`;
}

export default getCloudinaryUrl;
