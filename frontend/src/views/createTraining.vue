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
  
      <div v-if="!loading" class="row">
        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-body">
              <h2 class="card-title mb-4">Add Trainee</h2>
              <form @submit.prevent="createTrainee">
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
                  <select 
                    id="training_center" 
                    class="form-select" 
                    v-model="selectedTrainingCenter"
                    @change="updateTrainingCenter"
                    required
                  >
                    <option value="">Select a Training Center</option>
                    <option 
                      v-for="center in trainingCenters" 
                      :key="center.id" 
                      :value="center"
                    >
                      {{ center.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="location" class="form-label">Location</label>
                  <input type="text" id="location" v-model="trainee.training_center.location" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea id="description" v-model="trainee.training_center.description" class="form-control" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add Trainee</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../services/api.js'
  
  export default {
    name: 'createTrainee',
  
    data() {
      return {
        trainee: {
          name: '',
          skill: '',
          bio: '',
          training_center: {
            name: '',
            location: '',
            description: ''
          }
        },
        selectedTrainingCenter: null,
        trainingCenters: [],
        loading: false,
        error: null
      }
    },
  
    async created() {
      try {
        this.loading = true;
        // Assuming you have an API endpoint to fetch training centers
        this.trainingCenters = await api.getTrainingCenters();
      } catch (err) {
        this.error = 'Error loading training centers: ' + err.message;
      } finally {
        this.loading = false;
      }
    },
  
    methods: {
      updateTrainingCenter() {
        if (this.selectedTrainingCenter) {
          this.trainee.training_center = {
            name: this.selectedTrainingCenter.name,
            location: this.selectedTrainingCenter.location,
            description: this.selectedTrainingCenter.description
          };
        } else {
          this.trainee.training_center = {
            name: '',
            location: '',
            description: ''
          };
        }
      },
  
      async createTrainee() {
        this.loading = true;
        this.error = null;
        try {
          await api.createTrainee(this.trainee);
          alert('Trainee added successfully.');
          this.$router.push('/alltraining'); 
        } catch (err) {
          this.error = 'Error adding trainee: ' + err.message;
        } finally {
          this.loading = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .badge {
    font-size: 0.9rem;
  }
  </style>