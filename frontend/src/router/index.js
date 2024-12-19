import { createRouter, createWebHistory } from 'vue-router'

import AllTraining from '@/views/AllTraining.vue'
import TrainingNetwork from '@/views/TrainingNetwork.vue'
import CreateTraining from '@/views/createTraining.vue'
import editTrainee from '@/views/editTrainee.vue'
import viewTrainee from '@/views/viewTrainee.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TrainingNetwork,
    },
    {
      path: '/alltraining',
      name: 'alltraining',
    
      component: AllTraining,
    },
    {
      path: '/createtraining',
      name: 'createtraining',
    
      component: CreateTraining,
    },
    {
      path: '/edittrainee/:id',
      name: '/edittrainee',
    
      component: editTrainee,
    },
    {
      path: '/trainees/:id',
      name: '/viewTrainee/:id',
    
      component: viewTrainee,
    },
  ],
})

export default router
