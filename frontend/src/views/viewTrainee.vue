<template>
    <div class="container py-4">
      <!-- Loading State -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <!-- Error Message -->
      <div v-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
  
      <div v-if="!loading && trainee" class="row">
        <!-- Trainee Information -->
        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-body">
              <h2 class="card-title mb-4">{{ trainee.name }}</h2>
              
              <h5 class="text-muted mb-3">Skills: {{ trainee.skill }} </h5>
  
              <h5 class="text-muted mb-3">About</h5>
              <p class="card-text">{{ trainee.bio }}</p>
              <div class="mt-4">
                <h4 class="card-title mb-4">Training Center</h4>
                <h5 class="mb-3">{{ trainee.training_center.name }}</h5>
              </div>
              <div class="mb-3">
                <strong class="text-muted">Location:  </strong>
                <span class="mt-2">{{ trainee.training_center.location }}</span>
              </div>
              <div class="mb-3">
                <strong class="text-muted">Description</strong>
                <p class="mt-2">{{ trainee.training_center.description }}</p>
              </div>
              <!-- Delete Button -->
              <button class="btn btn-danger" @click="deleteTrainee">Delete Trainee</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- No Data Message -->
      <div v-if="!loading && !trainee" class="alert alert-info text-center">
        Trainee not found.
      </div>
    </div>
</template>

<script>
import api from '../services/api.js'

export default {
  name: 'TraineeView',
  
  data() {
    return {
      trainee: null,
      loading: true,
      error: null
    }
  },

  methods: {
    async fetchTrainee() {
      this.loading = true;
      this.error = null;
      const traineeId = this.$route.params.id; 
      try {
        const response = await api.getTraineeById(traineeId); 
        this.trainee = response.data.data;
      } catch (err) {
        this.error = 'Error loading trainee details: ' + err.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteTrainee() {
      const traineeId = this.$route.params.id; 
      if (confirm('Are you sure you want to delete this trainee?')) {
        this.loading = true;
        this.error = null;
        try {
          await api.deleteTrainee(traineeId); 
          alert('Trainee deleted successfully.');
          this.$router.push('/alltraining'); 
        } catch (err) {
          this.error = 'Error deleting trainee: ' + err.message;
        } finally {
          this.loading = false;
        }
      }
    },
 
  },

  created() {
    this.fetchTrainee();
  }
}
</script>

<style scoped>
.badge {
  font-size: 0.9rem;
}
</style>