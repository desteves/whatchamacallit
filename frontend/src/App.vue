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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}
.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
}
</style>
