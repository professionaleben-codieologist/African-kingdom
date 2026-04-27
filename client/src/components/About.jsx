const features = [
  {
    icon: '🍽️',
    title: 'Accepts Reservations',
    desc: 'Book your table in advance for a guaranteed VIP experience.',
  },
  {
    icon: '💳',
    title: 'Multiple Payment Options',
    desc: 'Credit cards, debit cards & NFC mobile payments accepted.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family Friendly',
    desc: 'Good for kids, perfect for family outings.',
  },
  {
    icon: '🅿️',
    title: 'Free Parking',
    desc: 'Free street parking and parking lot available.',
  },
  {
    icon: '🍸',
    title: 'Full Bar Service',
    desc: 'Premium cocktails, wine and spirits.',
  },
  {
    icon: '🚗',
    title: 'Dine-in & Delivery',
    desc: 'Dine-in, drive-through and delivery available.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#111111]">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <p className="text-yellow-700 tracking-[0.4em] uppercase text-xs text-center mb-3">
          Our Story
        </p>
        <h2 className="section-title">About African Kingdom</h2>
        <div className="gold-divider" />
        <p className="text-yellow-600/70 text-center text-sm tracking-widest uppercase mt-4 mb-8">
          Owo's Premier Destination Since Day One
        </p>

        {/* Story */}
        <p className="text-gray-400 text-center text-sm md:text-base max-w-2xl mx-auto mb-16 leading-relaxed tracking-wide">
          African Kingdom Restaurant, Bar &amp; Club is Owo's most beloved destination for fine dining,
          premium cocktails and electrifying nightlife. Located on Oke Ogun Street, opposite the Technical
          College, we bring you an authentic African experience with rich flavors, warm hospitality and a
          vibrant atmosphere that keeps you coming back night after night.
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-yellow-700/50 transition-all duration-300 p-6 flex flex-col gap-3"
            >
              <span className="text-3xl">{icon}</span>
              <h3 className="text-yellow-400 text-sm font-bold tracking-wide">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
