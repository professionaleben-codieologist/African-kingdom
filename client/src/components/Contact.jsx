export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] border-t border-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-yellow-700 tracking-[0.4em] uppercase text-xs text-center mb-3">Find Us</p>
        <h2 className="section-title">Contact & Location</h2>
        <div className="gold-divider" />

        {/* Google Maps — real embed */}
        <div className="mt-10 mb-12 border border-[#2A2A2A] overflow-hidden w-full">
          <iframe
            title="African Kingdom Location"
            src="https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d518818776.0607359!2d5.5619359!3d7.209650062709737!2m2!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1047af46bedbce31%3A0x7eed0eab829371a9!2sAfrican%20kingdom%20restaurant%2C%20bar%20and%20club!5e0!3m2!1sen!2sng!4v1777084605839!5m2!1sen!2sng"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Contact details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Location */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border border-yellow-700/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-yellow-500 text-xs tracking-widest uppercase">Location</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Owo, Ondo State<br />Nigeria</p>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border border-yellow-700/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-yellow-500 text-xs tracking-widest uppercase">Phone / WhatsApp</h3>
            <a href="tel:+2349063342155" className="text-gray-400 text-sm hover:text-yellow-400 transition-colors">
              +234 906 334 2155
            </a>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border border-yellow-700/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-yellow-500 text-xs tracking-widest uppercase">Opening Hours</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Restaurant: 8am – 11pm<br />
              Bar &amp; Club: 8pm – 3am
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
