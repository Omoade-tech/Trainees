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
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-body">
            <h2 class="card-title mb-4">Edit Trainee</h2>
            <form @submit.prevent="updateTrainee">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" v-model="trainee.name" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="skill" class="form-label">Skills</label>
                <input type="text" id="skill" v-model="trainee.skill" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="bio" class="form-label">Bio</label>
                <textarea id="bio" v-model="trainee.bio" class="form-control" required></textarea>
              </div>
              <div class="mb-3">
                <label for="training_center" class="form-label">Training Center</label>
                <input type="text" id="training_center" v-model="trainee.training_center.name" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="location" class="form-label">Location</label>
                <input type="text" id="location" v-model="trainee.training_center.location" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea id="description" v-model="trainee.training_center.description" class="form-control" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Update Trainee</button>
            </form>
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
name: 'EditTrainee',

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
      const response = await api.getTraineeById(traineeId); this.trainee = response.data.data;
    } catch (err) {
      this.error = 'Error loading trainee details: ' + err.message;
    } finally {
      this.loading = false;
    }
  },

  async updateTrainee() {
    const traineeId = this.$route.params.id; 
    this.loading = true;
    this.error = null;
    try {
      await api.updateTrainee(traineeId, this.trainee);
      alert('Trainee updated successfully.');
      // Redirect to the trainee's detail view
      this.$router.push(`/trainees/${traineeId}`); 
    } catch (err) {
      this.error = 'Error updating trainee: ' + err.message;
    } finally {
      this.loading = false;
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