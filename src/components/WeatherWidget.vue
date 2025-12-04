<template>
  <div v-if="weatherStore.loading">Loading...</div>
  <div v-else>
    <div v-for="item in cityWeatherList" :key="item.city.id" class="widget">
      <template v-if="item.weather">
        <div class="location">
          <span>
            {{ item.city.name
            }}{{ item.weather.sys.country && `, ${item.weather.sys.country}` }}
          </span>
        </div>

        <div class="weather-main" v-if="item.weather">
          <div class="icon">
            <img :src="getIcon(item.city.id)" :alt="item.mainWeather.main" />
          </div>
          <div class="temperature">
            {{ floorCelc(item.weather.main.temp) }}°C
          </div>
        </div>

        <div class="description" v-if="item.mainWeather">
          Feels like {{ floorCelc(item.weather.main.feels_like) }}°C.
          {{ capitalizeFirstLetter(item.mainWeather.description) }}
        </div>
        <div class="details" v-if="item.weather">
          <div class="row">
            <div class="half">
              <font-awesome-icon icon="location-arrow" rotation="270" />
              <span>
                {{ item.weather.wind.speed }} m/s
                {{ getWindDirection(item.weather.wind.deg) }}
              </span>
            </div>
            <div class="half">
              <font-awesome-icon icon="compass" />
              <span>{{ item.weather.main.pressure }} hPa</span>
            </div>
          </div>

          <div class="row">
            <div class="half">Humidity: {{ item.weather.main.humidity }}%</div>
            <div class="half">
              Dew point:
              {{
                getDewPoint(item.weather.main.temp, item.weather.main.humidity)
              }}°C
            </div>
          </div>

          <div class="row">
            <div>
              Visibility: {{ (item.weather.visibility / 1000).toFixed(1) }} km
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, computed, onMounted, onBeforeUnmount } from "vue";
import { useCitiesStore } from "@/stores/useCitiesStore";
import { useWeatherStore } from "@/stores/useWeatherStore";

const citiesStore = useCitiesStore();
const weatherStore = useWeatherStore();

const updateWeather = () => {
  if (citiesStore.cities.length) {
    weatherStore.fetchAll(citiesStore.cities);
  } else {
    citiesStore.initWithGeo();
  }
};

let stopWatch: () => void | null = null;

onMounted(() => {
  updateWeather();
  stopWatch = watch(() => citiesStore.cities, updateWeather, { deep: true });
});

const cityWeatherList = computed(() =>
  citiesStore.cities.map((city) => {
    const weather = weatherStore.weathers[city.id];
    return {
      city,
      weather,
      mainWeather: weather?.weather[0],
    };
  })
);

onBeforeUnmount(() => {
  stopWatch && stopWatch();
});

const getIcon = (id: number) => {
  const weather = weatherStore.weathers[id];
  return weather
    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    : "";
};

const getWindDirection = (deg: number) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
};

const getDewPoint = (temp: number, humidity: number) => {
  return floorCelc(+(temp - (100 - humidity) / 5).toFixed(1));
};
const floorCelc = (temperature: number) => {
  return Math.floor(temperature);
};

const capitalizeFirstLetter = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1);
</script>

<style lang="scss">
.widget {
  padding: 1rem;
  background: #fff;
  color: #4a5568;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  font-family: sans-serif;

  .location {
    font-size: 0.875rem;
    font-weight: 700;
  }

  .weather-main {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;

    .icon {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      font-size: 3rem;
      font-weight: 600;
      color: #d6bcfa;
      svg {
        width: 2.5rem;
        height: 2.5rem;
      }
    }

    .temperature {
      flex: 1;
      margin-left: 0.5rem;
      font-size: 1.125rem;
      font-weight: 700;
    }
  }

  .description {
    margin-top: 0.25rem;
    font-size: 0.875rem;
  }

  .details {
    margin-top: 1rem;
    font-size: 0.875rem;
    text-align: left;

    .row {
      display: flex;
      margin-bottom: 0.25rem;

      .half {
        flex: 1;
        display: flex;
        align-items: center;
      }

      .half + .half {
        margin-left: 0.25rem;
      }
    }
  }
}
</style>
