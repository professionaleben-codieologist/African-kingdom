import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const PASSWORD = 'africankingdom2026';

const STATUS_STYLES = {
  pending:   'bg-yellow-900/40 text-yellow-400 border border-yellow-700/50',
  confirmed: 'bg-green-900/40 text-green-400 border border-green-700/50',
  cancelled: 'bg-red-900/40 text-red-400 border border-red-700/50',
};

function StatusBadge({ status }) {
  const s = (status || 'pending').toLowerCase();
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${STATUS_STYLES[s] || STATUS_STYLES.pending}`}>
      {s}
    </span>
  );
}

// ── Login Screen ──────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (pw === PASSWORD) {
      onLogin();
    } else {
      setErr(true);
      setPw('');
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-yellow-500 font-serif text-2xl text-center tracking-widest uppercase mb-1">
          African Kingdom
        </p>
        <p className="text-yellow-800 text-xs text-center tracking-[0.3em] uppercase mb-8">
          Admin Dashboard
        </p>

        <form onSubmit={handleSubmit} className="bg-[#1A1A1A] border border-[#2A2A2A] p-8 space-y-5">
          <div>
            <label className="block text-yellow-600 text-xs tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(false); }}
              placeholder="Enter admin password"
              autoFocus
              className="w-full bg-black border border-[#2A2A2A] focus:border-yellow-600 text-white px-4 py-3 text-sm outline-none transition-colors"
            />
            {err && <p className="text-red-400 text-xs mt-2">Incorrect password.</p>}
          </div>
          <button type="submit" className="btn-gold w-full">
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null); // id being updated
  const [filter, setFilter] = useState('all');

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('booking_date', { ascending: false });
    if (error) setError(error.message);
    else setReservations(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchReservations(); }, [fetchReservations]);

  async function updateStatus(id, status) {
    setUpdating(id);
    const { error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id);
    if (!error) {
      setReservations(prev =>
        prev.map(r => r.id === id ? { ...r, status } : r)
      );
    }
    setUpdating(null);
  }

  const counts = {
    all: reservations.length,
    pending: reservations.filter(r => (r.status || 'pending').toLowerCase() === 'pending').length,
    confirmed: reservations.filter(r => (r.status || '').toLowerCase() === 'confirmed').length,
    cancelled: reservations.filter(r => (r.status || '').toLowerCase() === 'cancelled').length,
  };

  const visible = filter === 'all'
    ? reservations
    : reservations.filter(r => (r.status || 'pending').toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="bg-black border-b border-yellow-700/30 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-yellow-500 font-serif text-lg tracking-widest uppercase">African Kingdom</p>
          <p className="text-yellow-800 text-xs tracking-[0.3em] uppercase">Admin Dashboard</p>
        </div>
        <a href="/" className="text-gray-500 hover:text-yellow-400 text-xs tracking-widest uppercase transition-colors">
          ← Back to Site
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: counts.all, color: 'text-yellow-400' },
            { label: 'Pending', value: counts.pending, color: 'text-yellow-400' },
            { label: 'Confirmed', value: counts.confirmed, color: 'text-green-400' },
            { label: 'Cancelled', value: counts.cancelled, color: 'text-red-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#1A1A1A] border border-[#2A2A2A] p-5">
              <p className="text-gray-500 text-xs tracking-widest uppercase mb-1">{label}</p>
              <p className={`text-3xl font-bold font-serif ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-all duration-200 ${
                filter === f
                  ? 'bg-yellow-600 text-black border-yellow-600 font-bold'
                  : 'border-yellow-700/40 text-yellow-600 hover:border-yellow-500'
              }`}
            >
              {f} ({counts[f]})
            </button>
          ))}
          <button
            onClick={fetchReservations}
            className="ml-auto px-4 py-1.5 text-xs tracking-widest uppercase border border-[#2A2A2A] text-gray-400 hover:text-yellow-400 hover:border-yellow-700/40 transition-all duration-200"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-red-400 text-center py-10">{error}</p>
        ) : visible.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No reservations found.</p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#2A2A2A]">
                    {['Customer', 'Phone', 'Email', 'Date & Time', 'Guests', 'Section', 'Special Requests', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left text-yellow-700 text-xs tracking-widest uppercase py-3 px-3 font-normal whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map(r => (
                    <tr key={r.id} className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors">
                      <td className="py-3 px-3 text-white font-medium whitespace-nowrap">{r.customer_name || '—'}</td>
                      <td className="py-3 px-3 text-gray-300 whitespace-nowrap">{r.phone_number || '—'}</td>
                      <td className="py-3 px-3 text-gray-400 text-xs">{r.email || '—'}</td>
                      <td className="py-3 px-3 text-gray-300 whitespace-nowrap">
                        <span>{r.booking_date || '—'}</span>
                        {r.time && <span className="text-gray-500 ml-1 text-xs">{r.time}</span>}
                      </td>
                      <td className="py-3 px-3 text-gray-300 text-center">{r.guest_count || '—'}</td>
                      <td className="py-3 px-3 text-gray-300 whitespace-nowrap">{r.section || '—'}</td>
                      <td className="py-3 px-3 text-gray-500 text-xs max-w-[160px] truncate" title={r.special_requests || r.notes}>
                        {r.special_requests || r.notes || '—'}
                      </td>
                      <td className="py-3 px-3"><StatusBadge status={r.status} /></td>
                      <td className="py-3 px-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(r.id, 'confirmed')}
                            disabled={updating === r.id || (r.status || '').toLowerCase() === 'confirmed'}
                            className="px-3 py-1 text-xs bg-green-900/50 text-green-400 border border-green-700/50 hover:bg-green-800/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                          >
                            ✓ Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(r.id, 'cancelled')}
                            disabled={updating === r.id || (r.status || '').toLowerCase() === 'cancelled'}
                            className="px-3 py-1 text-xs bg-red-900/50 text-red-400 border border-red-700/50 hover:bg-red-800/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                          >
                            ✕ Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {visible.map(r => (
                <div key={r.id} className="bg-[#1A1A1A] border border-[#2A2A2A] p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-white font-medium">{r.customer_name || '—'}</p>
                      <p className="text-gray-400 text-xs">{r.phone_number}</p>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <span>📅 {r.booking_date} {r.time}</span>
                    <span>👥 {r.guest_count} guests</span>
                    <span>🏠 {r.section}</span>
                    {r.email && <span className="truncate">✉ {r.email}</span>}
                  </div>
                  {(r.special_requests || r.notes) && (
                    <p className="text-gray-500 text-xs italic">"{r.special_requests || r.notes}"</p>
                  )}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => updateStatus(r.id, 'confirmed')}
                      disabled={updating === r.id || (r.status || '').toLowerCase() === 'confirmed'}
                      className="flex-1 py-2 text-xs bg-green-900/50 text-green-400 border border-green-700/50 hover:bg-green-800/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ✓ Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, 'cancelled')}
                      disabled={updating === r.id || (r.status || '').toLowerCase() === 'cancelled'}
                      className="flex-1 py-2 text-xs bg-red-900/50 text-red-400 border border-red-700/50 hover:bg-red-800/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('ak_admin') === '1'
  );

  function handleLogin() {
    sessionStorage.setItem('ak_admin', '1');
    setAuthed(true);
  }

  return authed ? <Dashboard /> : <LoginScreen onLogin={handleLogin} />;
}
