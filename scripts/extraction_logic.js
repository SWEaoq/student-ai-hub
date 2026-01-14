
// Helper to flatten CONTENT for site_settings
function flattenContent(obj, prefix = '') {
  let result = {};
  for (const key in obj) {
    if (key === 'en' || key === 'ar') continue; 
  }
  return result;
}

// Better approach for CONTENT:
// Iterate through 'en' keys, find matching 'ar' keys, build the object.
function processContent() {
  const settings = [];
  const en = CONTENT.en;
  const ar = CONTENT.ar;

  function recurse(obj, parentKey = '') {
    for (const key in obj) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        recurse(obj[key], currentKey);
      } else {
        // It's a leaf value (string)
        // Find corresponding value in AR
        // We need to traverse AR object using the currentKey path
        const arValue = getNestedValue(ar, currentKey);
        settings.push({
          key: currentKey,
          value: {
            en: obj[key],
            ar: arValue || ''
          }
        });
      }
    }
  }

  recurse(en);
  return settings;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

const allData = {
  site_settings: processContent(),
  tools: TOOLS.map(t => {
    const { icon, ...rest } = t;
    return {
      ...rest,
      icon_name: typeof icon === 'string' ? icon : (icon?.render?.name || icon?.name || t.id)
    };
  }), 
  prompts: PROMPTS.map(p => ({
    ...p,
    id: p.content.en.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  })),
  playbooks: GUIDES.map(g => {
    const { icon, ...rest } = g;
    return {
      ...rest,
      icon_name: typeof icon === 'string' ? icon : (icon?.render?.name || icon?.name || g.id)
    };
  }),
  academy_categories: ACADEMY_CATEGORIES.map(c => {
    const { icon, ...rest } = c;
    return {
      ...rest,
      icon_name: typeof icon === 'string' ? icon : (icon?.render?.name || icon?.name || c.id)
    };
  }),
  academy_tutorials: Object.entries(ACADEMY_TUTORIALS).map(([key, t]) => {
    const { icon, ...rest } = t;
    return {
      ...rest,
      id: key, // Use the dictionary key as ID
      icon_name: typeof icon === 'string' ? icon : (icon?.render?.name || icon?.name || key)
    };
  })
};

console.log(JSON.stringify(allData, null, 2));
