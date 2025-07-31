<script>
import axios from 'axios';
import MovieCard from './components/MovieCard.vue';

export default {
  name: 'App',
  components: { MovieCard },
  data() {
    return {
      search: '',
      movies: [],
      loading: false,
      error: ''
    };
  },
  methods: {
    async searchMovies() {
      if (!this.search) return;
      this.loading = true;
      this.error = '';
      try {
        const res = await axios.get('http://localhost:3001/api/movies', {
          params: { title: this.search }
        });
        this.movies = res.data;
      } catch (e) {
        this.error = 'Failed to fetch movies.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <div id="app">
    <h1>Movie Search (mflix)</h1>
    <form @submit.prevent="searchMovies">
      <input v-model="search" placeholder="Enter movie title..." />
      <button type="submit">Search</button>
    </form>
    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color: red">{{ error }}</div>
    <div class="movies">
      <MovieCard v-for="movie in movies" :key="movie._id" :movie="movie" />
    </div>
  </div>
</template>

<style>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #42b983;
  --text-color: #2c3e50;
  --light-gray: #f5f5f5;
  --border-color: #e0e0e0;
  --error-color: #e74c3c;
  --success-color: #2ecc71;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}

h1 {
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 2.2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

form {
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

input[type="text"] {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  min-width: 300px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2);
}

button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #3aa876;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.loading, .error, .no-results {
  padding: 2rem;
  font-size: 1.1rem;
  margin: 2rem 0;
  border-radius: 4px;
}

.loading {
  color: var(--primary-color);
  background-color: rgba(44, 62, 80, 0.05);
}

.error {
  color: var(--error-color);
  background-color: rgba(231, 76, 60, 0.1);
  border-left: 4px solid var(--error-color);
  padding-left: 1.5rem;
}

.no-results {
  color: #666;
  font-style: italic;
}

.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 0;
  width: 100%;
}

/* Modal overlay for better contrast with the modal */
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .movies {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 0;
  }
  
  h1 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  
  form {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  
  input[type="text"] {
    width: 100%;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  #app {
    padding: 1.25rem 0.75rem;
  }
  
  .movies {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
