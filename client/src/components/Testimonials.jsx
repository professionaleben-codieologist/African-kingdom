const reviews = [
  {
    name: 'Alebiosu Itunu',
    text: 'Amazing experience! Warm vibrant atmosphere, great music, true African vibe. Food absolutely delicious!',
  },
  {
    name: 'Sajinyan Oluwole',
    text: 'Best restaurant so far. Delicious meals, great customer service!',
  },
  {
    name: 'Blessing Ogunleye',
    text: 'Great spot to chill! Bar is lively, food tasty, club turns up the vibe. Clean and safe!',
  },
  {
    name: 'Akinyemi Omotayo',
    text: 'Best culinary experience. Menu full of flavor, crafted with fresh ingredients.',
  },
  {
    name: 'Alao Roqeeb',
    text: 'Best restaurant in Owo local government!',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-yellow-700 tracking-[0.4em] uppercase text-xs text-center mb-3">
          What Our Guests Say
        </p>
        <h2 className="section-title">Guest Reviews</h2>
        <div className="gold-divider" />

        {/* Google rating badge */}
        <div className="flex items-center justify-center gap-2 mt-5 mb-12">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-yellow-400 font-bold text-sm">4.7</span>
          <span className="text-gray-500 text-sm">on Google Reviews · 35 Reviews</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-[#1A1A1A] border border-yellow-700/30 hover:border-yellow-600/60 transition-all duration-300 p-6 flex flex-col"
            >
              <Stars />
              <p className="text-gray-300 text-sm leading-relaxed italic flex-1 mb-5">
                "{r.text}"
              </p>
              <div className="border-t border-yellow-700/20 pt-4">
                <p className="text-yellow-500 text-xs tracking-widest uppercase font-bold">{r.name}</p>
                <p className="text-gray-600 text-xs mt-0.5">Google Review · Verified Guest</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
