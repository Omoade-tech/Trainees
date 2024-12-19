<template>
    <div class="nav">
     <nav class="navbar navbar-expand-lg navbar-light bg-light  w-100">
       <div class="container-fluid p-0">
         <!-- Logo -->
         <router-link to="/" class="navbar-brand fw-bold px-3" href="#">Training Network</router-link>
   
         <!-- Toggle button for mobile view -->
         <button
           class="navbar-toggler"
           type="button"
           data-bs-toggle="collapse"
           data-bs-target="#navbarNav"
           aria-controls="navbarNav"
           aria-expanded="false"
           aria-label="Toggle navigation"
         >
           <span class="navbar-toggler-icon"></span>
         </button>
   
         <!-- Navbar Links -->
         <div class="collapse navbar-collapse" id="navbarNav">
           <!-- Centered Links -->
           <ul class="navbar-nav mx-auto">
             <li class="nav-item">
               <RouterLink to="/alltraining" class="nav-link">All Training</RouterLink>
             </li>


          
             <li class="nav-item">
                <RouterLink to="/createtraining" class="nav-link">Create  New Training</RouterLink>
             </li>
           </ul>
   
       
         </div>
       </div>
     </nav>
   </div>
   
   
   </template>
   
   <script>
   
   </script>
   
   <style scoped>
  
   
   </style>