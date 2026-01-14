
import { CONTENT, TOOLS, PROMPTS, GUIDES, ACADEMY_CATEGORIES, ACADEMY_TUTORIALS } from '../src/data/content.js';
import fs from 'fs';
import path from 'path';

// Helper to flatten CONTENT for site_settings
function flattenContent(obj, prefix = '') {
  let result = {};
  for (const key in obj) {
    if (key === 'en' || key === 'ar') continue; // Skip language keys at top level if structured that way?
    // Wait, CONTENT structure is { en: { ... }, ar: { ... } }
    // We want keys like "nav.login" -> { en: "Login", ar: "..." }
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
  tools: TOOLS.map(t => ({
    ...t,
    icon_name: t.icon?.render?.name || t.icon?.name || t.id 
  })), 
  prompts: PROMPTS,
  playbooks: GUIDES.map(g => ({
    ...g,
    icon_name: g.icon?.render?.name || g.icon?.name || g.id
  })),
  academy_categories: ACADEMY_CATEGORIES.map(c => ({
    ...c,
    icon_name: c.icon?.render?.name || c.icon?.name || c.id
  })),
  academy_tutorials: Object.values(ACADEMY_TUTORIALS).map(t => ({
    ...t,
    icon_name: t.icon?.render?.name || t.icon?.name || t.id
  }))
};

// We need to handle icons. In content.js, icons are imported components.
// We can't serialize components to JSON. We need their names to map back in the frontend.
// I will regex read the file to map variable names to imports if needed, 
// OR simpler: modify this script to just use a placeholder or try to infer.
// The previous manual extraction used "Smartphone", "Code" strings.
// I should probably manually check standard icons or map them.
// 'lucide-react' icons usually have a displayName.

console.log(JSON.stringify(allData, null, 2));
