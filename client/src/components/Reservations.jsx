import { useState } from 'react';
import { supabase } from '../lib/supabase';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: '',
  section: 'Restaurant',
  notes: '',
};

export default function Reservations() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('reservations').insert([{
      customer_name: form.name,
      phone_number: form.phone,
      email: form.email || null,
      booking_date: form.date,
      time: form.time,
      guest_count: parseInt(form.guests),
      section: form.section,
      special_requests: form.notes || null,
      notes: form.notes || null,
      status: 'pending',
    }]);

    if (error) {
      setErrorMsg(error.message);
      setStatus('error');
    } else {
      setStatus('success');
      setForm(initialForm);
    }
  }

  return (
    <section id="reservations" className="py-24 bg-[#111111]">
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-yellow-700 tracking-[0.4em] uppercase text-xs text-center mb-3">
          Reserve Your Spot
        </p>
        <h2 className="section-title">VIP Table Booking</h2>
        <div className="gold-divider" />
        <p className="text-gray-400 text-center text-sm mt-4 mb-10 tracking-wide">
          Book your exclusive table at African Kingdom. We'll confirm your reservation via WhatsApp or call.
        </p>

        {status === 'success' ? (
          <div className="bg-[#1A1A1A] border border-yellow-700/40 p-8 text-center">
            <div className="text-yellow-500 text-4xl mb-4">✓</div>
            <h3 className="text-white font-serif text-xl mb-2">Reservation Received!</h3>
            <p className="text-gray-400 text-sm mb-6">
              Thank you, we'll confirm your booking shortly via WhatsApp or phone.
            </p>
            <button
              onClick={() => setStatus(null)}
              className="btn-gold"
            >
              Make Another Booking
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-yellow-600 text-xs tracking-widest uppercase mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-black border border-[#2A2A2A] focus:border-yellow-600 text-white px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-yellow-600 text-xs tracking-widest uppercase mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. 09063342155"
                  className="w-full bg-black border border-[#2A2A2A] focus:border-yellow-600 text-white px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-yellow-600 text-xs tracking-widest uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full bg-black border border-[#2A2A2A] focus:border-yellow-600 text-white px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-yellow-600 text-xs tracking-widest uppercase mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-black border border-[#2A2A2A] focus:border-yellow-600 text-white px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-yellow-600 text-xs tracking-widest uppercase mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  value={form.time}
                  onChange={handleChange}
                  className="w-full bg-black border border-[#2A2A2A] focus:border-yellow-600 text-white px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-yellow-600 text-xs tracking-widest uppercase mb-2">
                  Guests *
                </label>
                <input
                  type="number"
                  name="guests"
                  required
                  min="1"
                  max="50"
                  value={form.guests}
                  onChange={handleChange}
                  placeholder="No. of guests"
                  className="w-full bg-black border border-[#2A2A2A] focus:border-yellow-600 text-white px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-yellow-600 text-xs tracking-widest uppercase mb-2">
                Section
              </label>
              <select
                name="section"
                value={form.section}
                onChange={handleChange}
                className="w-full bg-black border border-[#2A2A2A] focus:border-yellow-600 text-white px-4 py-3 text-sm outline-none transition-colors"
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Bar">Bar</option>
                <option value="Club">Club / VIP Lounge</option>
              </select>
            </div>

            <div>
              <label className="block text-yellow-600 text-xs tracking-widest uppercase mb-2">
                Special Requests
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Any special requests or notes..."
                className="w-full bg-black border border-[#2A2A2A] focus:border-yellow-600 text-white px-4 py-3 text-sm outline-none transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm">{errorMsg || 'Something went wrong. Please try again.'}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Submitting...' : 'Confirm Reservation'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
