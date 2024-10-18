<template>
    <button class="personal-button">
      {{ props.text }}
    </button>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    text: string;
  }>();
  </script>
  
  <style scoped>
  .personal-button {
    background-color: #5d5dec;
    color: #fff;
    padding: 10px 20px;
    border: 2px solid #5d5dec;
    border-radius: 5px;
  }
  </style>