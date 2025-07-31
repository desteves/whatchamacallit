const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sample_mflix';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const movieSchema = new mongoose.Schema({}, { collection: 'embedded_movies', strict: false });
const Movie = mongoose.model('Movie', movieSchema);

app.get('/api/movies', async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: 'Missing title query param' });
  try {
    const movies = await Movie.find({ title: { $regex: title, $options: 'i' } })
      .limit(20)
      .select('title year genres poster');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    console.log('Movie ID:', req.params.id);
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
}); 