const features = [
  {
    icon: '📅',
    title: 'Accepts Reservations',
    desc: 'Book your table in advance for a guaranteed VIP experience.',
  },
  {
    icon: '🍽️',
    title: 'Dine-in, Drive-through & Delivery',
    desc: 'Enjoy our food your way — at the table, on the go, or at home.',
  },
  {
    icon: '🍹',
    title: 'Great Cocktails & Beer Selection',
    desc: 'Premium spirits, craft cocktails, and a wide range of cold beers.',
  },
  {
    icon: '💳',
    title: 'Card & NFC Payments Accepted',
    desc: 'Pay seamlessly with card, tap-to-pay, or cash.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Good for Kids',
    desc: 'A welcoming atmosphere the whole family can enjoy.',
  },
  {
    icon: '🅿️',
    title: 'Free Parking Available',
    desc: 'Ample free parking right at our premises.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#111111]">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-yellow-700 tracking-[0.4em] uppercase text-xs text-center mb-3">
          The African Kingdom Experience
        </p>
        <h2 className="section-title">Why Choose African Kingdom</h2>
        <div className="gold-divider" />

        <p className="text-gray-400 text-center text-sm md:text-base max-w-2xl mx-auto mt-6 mb-14 leading-relaxed tracking-wide">
          Owo's most celebrated dining and nightlife destination — where authentic African flavours,
          premium cocktails, and electrifying nightlife come together under one roof.
        </p>

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
