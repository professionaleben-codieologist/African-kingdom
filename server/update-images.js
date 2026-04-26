const { createClient } = require('@supabase/supabase-js');

const sb = createClient(
  'https://mcjwvdbafyxyerrwvnhc.supabase.co',
  process.env.SUPABASE_ANON_KEY
);

// id -> image_url  (IDs confirmed from list-items.js)
const updates = [
  { id: 1,  img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=200&q=80' }, // Jollof Rice & Chicken
  { id: 2,  img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&q=80' }, // Pounded Yam & Egusi
  { id: 3,  img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80' },    // Peppered Goat Meat
  { id: 4,  img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80' },    // Pepper Soup
  { id: 5,  img: 'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=200&q=80' }, // Asun
  { id: 6,  img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80' },    // Margarita
  { id: 7,  img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80' },    // Chapman
  { id: 8,  img: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&q=80' }, // Heineken
  { id: 9,  img: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&q=80' }, // Hennessy VS
  { id: 10, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80' }, // VIP Table - Standard
  { id: 11, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80' }, // VIP Table - Premium
];

async function run() {
  for (const { id, img } of updates) {
    const { data, error } = await sb
      .from('menu_items')
      .update({ image_url: img })
      .eq('id', id)
      .select('name');

    if (error) console.error(`✗ id=${id}: ${error.message}`);
    else if (!data.length) console.log(`  (no row) id=${id}`);
    else console.log(`✓ [${id}] ${data[0].name}`);
  }
  console.log('\nDone.');
}

run();
