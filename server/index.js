const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load .env — file is named '. env' (with space) in this project
dotenv.config({ path: path.join(__dirname, '. env') });

const app = express();
const PORT = process.env.PORT || 5000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(cors());
app.use(express.json());

// GET all categories
app.get('/api/categories', async (req, res) => {
  const { data, error } = await supabase.from('categories').select('*').order('id');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET menu items, optionally filtered by category_id
app.get('/api/menu', async (req, res) => {
  let query = supabase.from('menu_items').select('*, categories(name)').order('name');
  if (req.query.category_id) {
    query = query.eq('category_id', req.query.category_id);
  }
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST reservation
app.post('/api/reservations', async (req, res) => {
  const { name, phone, email, date, time, guests, section, notes } = req.body;
  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const { data, error } = await supabase
    .from('reservations')
    .insert([{ name, phone, email, date, time, guests, section, notes }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
