
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkCols() {
    console.log('Fetching one tool to check columns...');
    const { data, error } = await supabase.from('tools').select('*').limit(1);
    
    if (error) { 
        console.error(error);
        return;
    }
    
    if (data && data.length > 0) {
        console.log('Columns found:', Object.keys(data[0]));
        console.log('Sample Data:', JSON.stringify(data[0], null, 2));
    } else {
        console.log('No tools found.');
    }
}
checkCols();
