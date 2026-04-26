export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#1A1A1A] py-10 text-center">
      <p className="font-serif text-yellow-500 text-lg tracking-widest uppercase mb-1">
        African Kingdom
      </p>
      <p className="text-yellow-800 text-xs tracking-[0.3em] uppercase mb-6">
        Restaurant · Bar · Club
      </p>
      <div className="gold-divider mb-6" />
      <p className="text-gray-600 text-xs tracking-wide">
        © {new Date().getFullYear()} African Kingdom, Owo, Nigeria. All rights reserved.
      </p>
    </footer>
  );
}
