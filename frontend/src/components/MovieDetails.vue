<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">&times;</button>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="movie-details">
        <div class="movie-header">
          <img v-if="movie.poster" :src="movie.poster" :alt="movie.title" class="movie-poster" />
          <div class="movie-info">
            <h2>{{ movie.title }}</h2>
            <p v-if="movie.year"><strong>Year:</strong> {{ movie.year }}</p>
            <p v-if="movie.rated"><strong>Rated:</strong> {{ movie.rated }}</p>
            <p v-if="movie.runtime"><strong>Runtime:</strong> {{ movie.runtime }}</p>
            <p v-if="movie.genres"><strong>Genres:</strong> {{ Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres }}</p>
            <p v-if="movie.imdb && movie.imdb.rating" :class="{
                'rating-high': movie.imdb.rating > 7,
                'rating-medium': movie.imdb.rating <= 7 && movie.imdb.rating > 5,
                'rating-low': movie.imdb.rating <= 5
              }">
              <strong>IMDb Rating:</strong> {{ movie.imdb.rating }}/10 <span v-if="movie.imdb.votes">({{ movie.imdb.votes }} votes)</span>
            </p>
          </div>
        </div>
        
        <div class="movie-plot">
          <h3>Plot</h3>
          <p>{{ movie.plot || 'No plot summary available.' }}</p>
        </div>

        <div v-if="movie.directors && movie.directors.length > 0" class="movie-section">
          <h3>Director{{ movie.directors.length > 1 ? 's' : '' }}</h3>
          <p>{{ Array.isArray(movie.directors) ? movie.directors.join(', ') : movie.directors }}</p>
        </div>

        <div v-if="movie.cast && movie.cast.length > 0" class="movie-section">
          <h3>Cast</h3>
          <p>{{ Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast }}</p>
        </div>

        <div v-if="movie.languages && movie.languages.length > 0" class="movie-section">
          <h3>Language{{ movie.languages.length > 1 ? 's' : '' }}</h3>
          <p>{{ Array.isArray(movie.languages) ? movie.languages.join(', ') : movie.languages }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MovieDetails',
  props: {
    movieId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      movie: {},
      loading: true,
      error: null
    };
  },
  async created() {
    console.log('Movie ID:', this.movieId);
    try {
      const response = await axios.get(`http://localhost:3001/api/movies/${this.movieId}`);
      this.movie = response.data;
    } catch (err) {
      console.error('Error fetching movie details:', err);
      this.error = 'Failed to load movie details. Please try again later.';
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #000;
}

.movie-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.movie-poster {
  max-width: 300px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.movie-info {
  flex: 1;
  text-align: left;
}

.movie-info h2 {
  margin-top: 0;
  color: #333;
}

.movie-info p {
  margin: 0.5rem 0;
  color: #555;
}

.movie-plot {
  margin: 1.5rem 0;
  line-height: 1.6;
  text-align: left;
}

.movie-plot h3,
.movie-section h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.movie-section {
  margin: 1.5rem 0;
  text-align: left;
}

.rating-high {
  color: #2e7d32; /* Green */
  font-weight: bold;
}

.rating-medium {
  color: #ed6c02; /* Orange */
  font-weight: bold;
}

.rating-low {
  color: #d32f2f; /* Red */
  font-weight: bold;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #d32f2f;
}

@media (max-width: 768px) {
  .movie-header {
    flex-direction: column;
  }
  
  .movie-poster {
    align-self: center;
  }
}
</style>
