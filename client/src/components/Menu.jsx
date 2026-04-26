import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const SECTION_ORDER = ['Restaurant', 'Bar', 'Club'];

const IMGS = {
  jollof:   'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=200&q=80',
  egusi:    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&q=80',
  goat:     'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80',
  pepper:   'https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80',
  asun:     'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=200&q=80',
  cocktail: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80',
  beer:     'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&q=80',
  vip:      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80',
  default:  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80',
};

function getFallbackImage(itemName, section) {
  const n = (itemName || '').toLowerCase();
  const s = (section || '').toLowerCase();
  if (n.includes('jollof'))                              return IMGS.jollof;
  if (n.includes('egusi') || n.includes('pounded'))      return IMGS.egusi;
  if (n.includes('goat'))                                return IMGS.goat;
  if (n.includes('pepper') || n.includes('soup'))        return IMGS.pepper;
  if (n.includes('asun'))                                return IMGS.asun;
  if (n.includes('cocktail') || n.includes('wine') || n.includes('spirit')) return IMGS.cocktail;
  if (n.includes('beer') || n.includes('lager') || n.includes('stout'))     return IMGS.beer;
  if (s === 'club' || n.includes('vip') || n.includes('package')) return IMGS.vip;
  if (s === 'bar') return IMGS.cocktail;
  return IMGS.default;
}

function MenuCard({ item, section }) {
  const img = item.image_url || getFallbackImage(item.name, section);
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-yellow-700/50 transition-all duration-300 flex flex-col sm:flex-row overflow-hidden">
      <img
        src={img}
        alt={item.name}
        className="w-full h-40 sm:w-28 sm:h-28 object-cover flex-shrink-0"
        loading="lazy"
      />
      <div className="flex flex-1 items-start justify-between gap-3 p-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-serif text-base mb-1 leading-snug">{item.name}</h4>
          {item.description && (
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{item.description}</p>
          )}
        </div>
        {item.price != null && (
          <span className="text-yellow-500 font-serif text-sm whitespace-nowrap pt-0.5">
            ₦{Number(item.price).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Menu() {
  // sections: ['Restaurant', 'Bar', 'Club']
  // grouped: { Restaurant: { 'Main Dishes': [...items], 'Soups': [...] }, Bar: {...}, ... }
  const [sections, setSections] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const { data: categories, error: catErr } = await supabase
          .from('categories')
          .select('*')
          .order('id');
        if (catErr) throw catErr;

        const { data: items, error: itemErr } = await supabase
          .from('menu_items')
          .select('*')
          .order('name');
        if (itemErr) throw itemErr;

        // Build a map: categoryId -> { name, section }
        const catMap = {};
        for (const cat of categories) {
          catMap[cat.id] = { name: cat.name, section: cat.section || cat.name };
        }

        // Group items: section -> categoryName -> [items]
        const result = {};
        for (const item of items) {
          const cat = catMap[item.category_id];
          if (!cat) continue;
          const sec = cat.section;
          const catName = cat.name;
          if (!result[sec]) result[sec] = {};
          if (!result[sec][catName]) result[sec][catName] = [];
          result[sec][catName].push(item);
        }

        // Sort sections by preferred order
        const sectionKeys = Object.keys(result).sort((a, b) => {
          const ai = SECTION_ORDER.indexOf(a);
          const bi = SECTION_ORDER.indexOf(b);
          if (ai === -1 && bi === -1) return 0;
          if (ai === -1) return 1;
          if (bi === -1) return -1;
          return ai - bi;
        });

        setSections(sectionKeys);
        setGrouped(result);
        if (sectionKeys.length > 0) setActiveSection(sectionKeys[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const activeCategories = grouped[activeSection] || {};

  return (
    <section id="menu" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-yellow-700 tracking-[0.4em] uppercase text-xs text-center mb-3">
          Curated for You
        </p>
        <h2 className="section-title">Our Menu</h2>
        <div className="gold-divider" />

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-center text-red-400 py-10">Failed to load menu: {error}</p>
        )}

        {!loading && !error && sections.length > 0 && (
          <>
            {/* Section tabs */}
            <div className="flex justify-start sm:justify-center gap-2 mt-10 mb-10 overflow-x-auto pb-2 scrollbar-none">
              {sections.map(sec => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`px-6 py-2 text-sm tracking-widest uppercase transition-all duration-200 border whitespace-nowrap flex-shrink-0 ${
                    activeSection === sec
                      ? 'bg-yellow-600 text-black border-yellow-600 font-bold'
                      : 'border-yellow-700/40 text-yellow-600 hover:border-yellow-500'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Categories with items */}
            {Object.keys(activeCategories).length > 0 ? (
              <div className="space-y-10">
                {Object.entries(activeCategories).map(([catName, items]) => (
                  <div key={catName}>
                    <h3 className="text-yellow-600 text-xs tracking-[0.4em] uppercase mb-4 pb-2 border-b border-yellow-700/20">
                      {catName}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {items.map(item => (
                        <MenuCard key={item.id} item={item} section={activeSection} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">No items in this section yet.</p>
            )}
          </>
        )}

        {!loading && !error && sections.length === 0 && (
          <p className="text-center text-gray-500 py-10">Menu coming soon.</p>
        )}
      </div>
    </section>
  );
}
