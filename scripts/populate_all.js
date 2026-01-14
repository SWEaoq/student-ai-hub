
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase URL or Service Role Key in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.resolve('supabase_data.json');

async function populateAll() {
  try {
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const allData = JSON.parse(rawData);

    // Map JSON keys to table names
    const tableMap = {
      site_settings: 'site_settings',
      tools: 'tools',
      prompts: 'prompts',
      playbooks: 'playbooks',
      academy_categories: 'academy_categories',
      academy_tutorials: 'academy_tutorials'
    };

    for (const [key, tableName] of Object.entries(tableMap)) {
      const rows = allData[key];
      if (!rows || rows.length === 0) {
        console.log(`No data for ${tableName} (${key})`);
        continue;
      }

      console.log(`Upserting ${rows.length} rows into ${tableName}...`);

      // Upsert in batches to avoid payload limits
      const batchSize = 50;
      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        const { error } = await supabase
          .from(tableName)
          .upsert(batch, { onConflict: key === 'site_settings' ? 'key' : 'id' });

        if (error) {
          console.error(`Error inserting into ${tableName}:`, error.message);
          if (error.message.includes('relation') && error.message.includes('does not exist')) {
             console.error(`!!! Table ${tableName} missing. Run supabase_full_schema.sql first! !!!`);
          }
        }
      }
      console.log(`Finished ${tableName}`);
    }

    console.log('All data population complete.');
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

populateAll();
