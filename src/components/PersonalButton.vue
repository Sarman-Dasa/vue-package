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

<style>
.personal-button {
  background-color: #5d5dec;
  color: #fff;
  padding: 10px 20px;
  border: 3px solid #18181b;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.personal-button:hover {
  background-color: #4b4bdb;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.personal-button:focus {
  outline: none;
  border-color: #66d253;
  box-shadow: 0 0 0 4px rgba(102, 210, 83, 0.5);
}

.personal-button:active {
  background-color: #4343c7;
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
