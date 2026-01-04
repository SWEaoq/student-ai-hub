import { useEffect } from 'react';
import { setPageTitle, setMetaDescription, setOpenGraph } from '../utils/seo';

/**
 * useSEO - Hook for managing page SEO metadata
 * @param {Object} seoData - SEO data {title, description, ogTitle, ogDescription, ogImage, ogUrl}
 */
export const useSEO = ({ 
  title, 
  description, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  ogUrl 
}) => {
  useEffect(() => {
    if (title) setPageTitle(title);
    if (description) setMetaDescription(description);
    
    if (ogTitle || ogDescription || ogImage || ogUrl) {
      setOpenGraph({
        title: ogTitle || title,
        description: ogDescription || description,
        image: ogImage,
        url: ogUrl || window.location.href
      });
    }
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl]);
};

