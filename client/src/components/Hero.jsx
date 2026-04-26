import { useState, useEffect } from 'react';

const slides = [
  "https://lh3.googleusercontent.com/p/AF1QipOCfLMlTDaTZZ8IvJ166zpGQbAo4scuY6MbgY0O=s680-w680-h510-rw",
  "https://lh3.googleusercontent.com/p/AF1QipNgVH-7daafbIFw_A5OOPN5gFubfO2EGUACzykr=s680-w680-h510-rw",
  "https://lh3.googleusercontent.com/p/AF1QipPOdCRTmPNyEwfWdvkDjgednLbCCwMzBnoMfyKL=s680-w680-h510-rw",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Slideshow backgrounds */}
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Decorative gold circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-yellow-700/10 z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-yellow-700/20 z-10" />

      <div className="relative z-20 px-4 max-w-4xl mx-auto">
        <p className="text-yellow-600 tracking-[0.5em] uppercase text-sm mb-6">
          Owo, Ondo State · Nigeria
        </p>

        <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-4">
          African <span className="text-yellow-500">Kingdom</span>
        </h1>

        <p className="text-yellow-600 tracking-[0.4em] uppercase text-base md:text-lg mb-2">
          Restaurant · Bar · Club
        </p>

        <div className="gold-divider my-6" />

        <p className="text-gray-300 text-lg md:text-2xl font-serif italic mb-10">
          "Owo's Premier Destination"
        </p>

        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-10 tracking-wide">
          Experience the finest dining, premium cocktails, and electrifying nightlife
          in the heart of Owo. Where luxury meets African culture.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#reservations" className="btn-gold">
            Book a VIP Table
          </a>
          <a
            href="#menu"
            className="border border-yellow-600 text-yellow-500 hover:bg-yellow-600/10 py-3 px-8 transition-all duration-300 tracking-widest uppercase text-sm"
          >
            View Menu
          </a>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-yellow-500 w-6' : 'bg-yellow-700/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
