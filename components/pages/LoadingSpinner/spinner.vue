<template>
    <div class="loader"></div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .loader {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-left-color: #3498db; 
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  