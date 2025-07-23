<template>
  <div class="movie-card">
    <h3>{{ movie.title }}</h3>
    <p v-if="movie.year">Year: {{ movie.year }}</p>
    <p v-if="movie.genres">Genres: {{ movie.genres.join(', ') }}</p>
    <img v-if="movie.poster" :src="movie.poster" alt="Poster" style="max-width: 150px;" />
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: { type: Object, required: true }
  }
}
</script>

<style scoped>
.movie-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem;
  width: 220px;
  box-shadow: 2px 2px 8px #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style> 