/**
 * SEO utilities for managing page metadata
 */

/**
 * Update page title
 * @param {string} title - Page title
 */
export const setPageTitle = (title) => {
  document.title = title ? `${title} | AI Hub` : 'AI Hub';
};

/**
 * Update meta description
 * @param {string} description - Meta description
 */
export const setMetaDescription = (description) => {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  meta.content = description || 'The ultimate toolkit for founders, creators, and professionals.';
};

/**
 * Update Open Graph tags
 * @param {Object} ogData - Open Graph data {title, description, image, url}
 */
export const setOpenGraph = ({ title, description, image, url }) => {
  const setOGTag = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  if (title) setOGTag('og:title', title);
  if (description) setOGTag('og:description', description);
  if (image) setOGTag('og:image', image);
  if (url) setOGTag('og:url', url);
};

