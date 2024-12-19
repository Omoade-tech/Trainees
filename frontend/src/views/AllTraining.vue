<template>
    <div class="container mt-4">
      <!-- Header -->
      <div class="mb-4">
        <h2 class="text-center">All Trainee</h2>
      </div>
  
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
  
      <!-- Trainees Cards Grid -->
      <div v-if="!loading && trainees.length" class="row row-cols-1 row-cols-md-2 g-4">
        <div v-for="trainee in trainees" :key="trainee.id" class="col">
          <div class="card h-100 shadow">
            <div class="card-header bg-primary"></div>
            <div class="card-body p-4">
              <h4 class="card-title mb-3">{{ trainee.name }}</h4>
              <div class="card-text mb-4">
                <div class="d-flex align-items-center mb-3">
                  <i class="bi bi-building me-2 text-primary fs-5"></i>
                  <span class="fs-5">
                    <strong>Training Center:</strong> {{ trainee.training_center.name }}
                  </span>
                </div>
              </div>
              <div class="d-flex gap-3 justify-content-end mt-auto">
                <button 
                  class="btn btn-primary btn-lg px-4"
                  @click="viewTrainee(trainee)"
                >
                  <i class="bi bi-eye me-2"></i> View
                </button>
                <button 
                  class="btn btn-secondary btn-lg px-4"
                  @click="editTrainee(trainee)"
                >
                  <i class="bi bi-pencil me-2"></i> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- No Data Message -->
      <div v-if="!loading && !trainees.length" class="alert alert-info text-center">
        No trainees found.
      </div>
    </div>
  </template>
  
  <script>
  import api from '../services/api.js'
  
  export default {
    name: 'TraineeList',
    
    data() {
      return {
        trainees: [],
        loading: true,
        error: null,
      };
    },
  
    methods: {
      async fetchTrainees() {
        this.loading = true;
        this.error = null;
        try {
          const response = await api.getTrainees();
          this.trainees = response.data.data.data;
        } catch (err) {
          this.error = 'Error loading trainees: ' + err.message;
        } finally {
          this.loading = false;
        }
      },
  
      viewTrainee(trainee) {
        this.$router.push(`/trainees/${trainee.id}`);
      },
  
      editTrainee(trainee) {
        this.$router.push(`/edittrainee/${trainee.id}`);
      }
    },
  
    created() {
      this.fetchTrainees();
    }
  };
  </script>
  
  <style scoped>
  .card {
    transition: transform 0.2s;
    border: none;
    min-height: 300px;
  }
  
  .card:hover {
    transform: translate(-5px);
  }
  
  .card-header {
    height: 8px;
    padding: 0;
  }
  
  .loading-state {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  
  .btn {
    transition: all 0.2s;
  }
  
  .btn:hover {
    transform: scale(1.05);
  }
  
  /* Make cards fill more of the screen */
  .container {
    max-width: 1400px;
  }
  
  /* If you want to use Bootstrap icons, make sure to import the CSS */
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
  </style>