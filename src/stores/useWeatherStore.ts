import { defineStore } from "pinia";
import axios from "axios";
import { WeatherAPIResponse } from "@/types/weather";
import { API_KEY, WEATHER_BASE_URL } from "@/config/weather";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    weathers: {} as Record<number, WeatherAPIResponse>,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAll(cities: { id: number; name: string }[]) {
      if (!cities.length) return;
      this.loading = true;
      this.error = null;

      try {
        const results = await Promise.all(
          cities.map((c) =>
            axios.get(WEATHER_BASE_URL, {
              params: { id: c.id, units: "metric", lang: "en", appid: API_KEY },
            })
          )
        );

        results.forEach((res) => {
          this.weathers[res.data.id] = res.data;
        });
      } catch (e: unknown) {
        if (e instanceof Error) {
          this.error = e.message;
        } else {
          this.error = String(e);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
