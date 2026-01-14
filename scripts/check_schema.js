import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://htouwsqvhvmsdimagheu.supabase.co'
const supabaseKey = 'sb_publishable_MklYFjr1M6w9UVOnd3-6ZA_2jzFx_AF'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSchema() {
  console.log('Checking playbooks table structure...')
  // Try to insert a row with all possible fields to see if it errors, 
  // or just select with a non-existent column to see error.
  // Better: Inspect information_schema (if allowed) or just try to select * and look at keys of returned object (if I add 1 row).
  
  // Attempt to select 'content' column from playbooks
  const { data, error } = await supabase
    .from('playbooks')
    .select('content')
    .limit(1)

  if (error) {
    console.log('Error selecting content column (it might not exist):', error.message)
  } else {
    console.log('Content column exists!')
  }

  // Also check if table exists indeed (we know it does but just sanity check)
}

checkSchema()
