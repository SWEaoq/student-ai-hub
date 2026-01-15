
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTool() {
    // Fetch the tool with an ID or name that matches 'uxpilot' (from screenshot url)
    // trying by name pattern search as I don't have the ID
    console.log('Fetching webdesign tool (likely name contains uxpilot)...');
    
    // First try to find it
    const { data: tools, error } = await supabase
        .from('tools')
        .select('*')
        .ilike('name', '%uxpilot%'); // Assuming name text match

    if (error) {
        console.error('Error fetching tool:', error);
        return;
    }

    if (tools && tools.length > 0) {
        const tool = tools[0];
        console.log('Found Tool:', tool.name);
        console.log('ID:', tool.id);
        console.log('Root URL:', tool.url);
        console.log('Content URL (en):', tool.content?.en?.url);
        console.log('Content URL (root):', tool.content?.url);
        console.log('Example Prompts (root type):', typeof tool.examplePrompts);
        console.log('Example Prompts (root sample):', JSON.stringify(tool.examplePrompts, null, 2));
    } else {
        console.log('No tool found matching uxpilot');
        // fallback query to list a few tools
        const { data: allTools } = await supabase.from('tools').select('name, url, examplePrompts').limit(3);
        console.log('Sample of other tools:', JSON.stringify(allTools, null, 2));
    }
}

checkTool();
