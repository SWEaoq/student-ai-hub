
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase URL or Service Role Key in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.resolve('/Users/abdullahalqobaisi/.gemini/antigravity/brain/43ff1009-a11f-491b-88e5-08d3b1763bfc/supabase_academy_tutorials.json');

async function populateData() {
  try {
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const tutorials = JSON.parse(rawData);

    console.log(`Found ${tutorials.length} tutorials to insert.`);

    for (const tutorial of tutorials) {
      const { error } = await supabase
        .from('academy_tutorials')
        .upsert(tutorial, { onConflict: 'id' });

      if (error) {
        console.error(`Error inserting ${tutorial.id}:`, error.message);
        if (error.message.includes('relation "academy_tutorials" does not exist')) {
            console.error('\nCRITICAL: The table "academy_tutorials" does not exist.'); 
            console.error('Please run the SQL schema provided in "supabase_schema.sql" in your Supabase Dashboard SQL Editor first.');
            process.exit(1);
        }
      } else {
        console.log(`Successfully upserted: ${tutorial.id}`);
      }
    }
    console.log('Data population complete.');
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

populateData();
