<template>
  <div>
    <div class="movie-card" @click="showDetails = true">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <p v-if="movie.year" class="movie-year">{{ movie.year }}</p>
      <p v-if="movie.genres" class="movie-genres">{{ Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres }}</p>
      <img v-if="movie.poster" :src="movie.poster" alt="Poster" class="movie-poster" />
    </div>

    <MovieDetails 
      v-if="showDetails" 
      :movie-id="movie._id" 
      @close="showDetails = false" 
    />
  </div>
</template>

<script>
import MovieDetails from './MovieDetails.vue';

export default {
  name: 'MovieCard',
  components: {
    MovieDetails
  },
  props: {
    movie: { 
      type: Object, 
      required: true 
    }
  },
  data() {
    return {
      showDetails: false
    };
  }
};
</script>

<style scoped>
.movie-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  height: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
}

.movie-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.movie-title {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  text-align: center;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.movie-year {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

.movie-genres {
  margin: 0.25rem 0 0.75rem;
  color: #666;
  font-size: 0.85rem;
  text-align: center;
  font-style: italic;
}

.movie-poster {
  max-width: 150px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 480px) {
  .movie-poster {
    max-width: 120px;
  }
}
</style>