<template>
  <div class="widget">
    <div class="location">Moscow, RU</div>

    <div class="weather-main">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M3 15a4 4 0 0 0 4 4h10a5 5 0 0 0 0-10 6 6 0 0 0-11-2A4 4 0 0 0 3 15z"
          />
        </svg>
      </div>
      <div class="temperature">10°C</div>
    </div>

    <div class="description">Feels like 5°C. Broken clouds. Light breeze</div>

    <div class="details">
      <div class="row">
        <div class="half">
          <font-awesome-icon icon="location-arrow" rotation="270" />
          <span> 3.0 m/s SSE</span>
        </div>
        <div class="half">
          <font-awesome-icon icon="compass" />
          <span>1021 hPa</span>
        </div>
      </div>

      <div class="row">
        <div class="half">Humidity: 97%</div>
        <div class="half">Dew point: 0°C</div>
      </div>

      <div class="row">
        <div>Visibility: 10.0 km</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { fetchWeather } from "../services/weatherApi";

export default defineComponent({
  name: "WeatherWidget",

  setup() {
    const city = ref("");
    const weather = ref<any>(null);
    const loading = ref(false);
    const error = ref("");

    const loadWeather = async () => {
      if (!city.value) {
        error.value = "Enter a city name";
        return;
      }
      loading.value = true;
      error.value = "";

      try {
        weather.value = await fetchWeather(city.value);
      } catch (e) {
        error.value = "Failed to load weather";
      }

      loading.value = false;
    };

    return { city, weather, loading, error, loadWeather };
  },
});
</script>

<style lang="scss">
.widget {
  width: 16rem; // ~ w-64
  padding: 1rem; // ~ p-4
  background: #fff; // bg-white
  color: #4a5568; // gray-700
  border-radius: 1rem; // rounded-2xl
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); // shadow
  user-select: none; // select-none
  font-family: sans-serif;

  .location {
    font-size: 0.875rem; // text-sm
    font-weight: 700; // font-medium
  }

  .weather-main {
    display: flex; // flex
    align-items: center; // items-center
    margin-top: 0.5rem; // mt-2

    .icon {
      flex: 1; // basis-1/2
      display: flex;
      justify-content: flex-end;
      font-size: 3rem; // text-5xl
      font-weight: 600; // font-semibold
      color: #d6bcfa; // text-purple-200
      svg {
        width: 2.5rem; // w-10
        height: 2.5rem; // h-10
      }
    }

    .temperature {
      flex: 1; // basis-1/2
      margin-left: 0.5rem; // ml-2
      font-size: 1.125rem; // text-lg
      font-weight: 700; // font-bold
    }
  }

  .description {
    margin-top: 0.25rem; // mt-1
    font-size: 0.875rem; // text-sm
  }

  .details {
    margin-top: 1rem; // mt-4
    font-size: 0.875rem; // text-sm
    text-align: left;

    .row {
      display: flex;
      margin-bottom: 0.25rem; // space-y-1

      .half {
        flex: 1; // basis-1/2
        display: flex;
        align-items: center;
      }

      .half + .half {
        margin-left: 0.25rem; // gap
      }
    }
  }
}
</style>
