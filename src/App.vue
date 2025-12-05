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
import { createPinia, setActivePinia } from "pinia";
import WeatherWidget from "@/components/WeatherWidget.vue";
import SettingsComponent from "@/components/SettingsComponent.vue";
import { FontAwesomeIcon } from "@/plugins/fontawesome";

setActivePinia(createPinia());

const showSettings = ref(false);

function toggleView() {
  showSettings.value = !showSettings.value;
}
</script>
