const { createClient } = require('@supabase/supabase-js');
const sb = createClient(
  'https://mcjwvdbafyxyerrwvnhc.supabase.co',
  process.env.SUPABASE_ANON_KEY
);
sb.from('menu_items').select('id, name, image_url').order('name')
  .then(({ data, error }) => {
    if (error) console.error(error.message);
    else data.forEach(r => console.log(`[${r.id}] "${r.name}" | img: ${r.image_url || 'null'}`));
  });
