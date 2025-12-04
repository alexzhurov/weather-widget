<template>
  <div class="app-container">
    <template v-if="showSettings">
      <font-awesome-icon icon="xmark" @click="toggleView" class="toggle-btn" />
      <SettingsComponent />
    </template>
    <template v-else>
      <font-awesome-icon icon="gear" @click="toggleView" class="toggle-btn" />
      <WeatherWidget />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import WeatherWidget from "@/components/WeatherWidget.vue";
import SettingsComponent from "@/components/SettingsComponent.vue";

const showSettings = ref(false);

function toggleView() {
  showSettings.value = !showSettings.value;
}
</script>

<style scoped>
.app-container {
  width: 16rem;
  max-height: 450px;
  overflow-y: auto;
  scrollbar-gutter: stable;
  padding-left: 8px;
  padding-bottom: 10px;
  /* padding: 20px; */
  font-family: Arial, sans-serif;
  border: 2px solid black;
  position: relative;
}

.toggle-btn {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 16px;
}
</style>
