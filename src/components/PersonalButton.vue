<template>
    <button class="personal-button">
      {{ props.text }}
    </button>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    text: string
  }>();
  </script>
  
  <style scoped>
  .personal-button {
    background-color: #5d5dec;
    color: #fff;
    padding: 10px 20px;
    border: 3px solid #18181b #66d253;
    border-radius: 5px;
  }
  </style>