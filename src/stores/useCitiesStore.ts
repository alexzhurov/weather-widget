import { defineStore } from "pinia";
import axios from "axios";
import { API_KEY, WEATHER_BASE_URL } from "@/config/weather";

export const useCitiesStore = defineStore("cities", {
  state: () => ({
    cities: JSON.parse(localStorage.getItem("weather-cities") || "[]") as {
      id: number;
      name: string;
    }[],
    newCity: "",
    storageKey: "weather-cities",
    error: null as string | null,
  }),

  actions: {
    saveToLocalStorage() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cities));
    },

    async addCity() {
      const name = this.newCity.trim();
      if (!name) return;

      if (
        this.cities.find((c) => c.name.toLowerCase() === name.toLowerCase())
      ) {
        this.newCity = "";
        return;
      }

      try {
        const { data } = await axios.get(WEATHER_BASE_URL, {
          params: { q: name, units: "metric", lang: "en", appid: API_KEY },
        });

        if (data.cod && data.cod !== 200) {
          throw new Error(data.message || "City not found");
        }

        const city = { id: data.id, name: data.name };
        this.cities.push(city);
        this.newCity = "";
        this.saveToLocalStorage();
        this.error = null;
      } catch (e: any) {
        this.error =
          e.response?.data?.message || e.message || "Error adding city";
        console.error("City search error:", this.error);
      }
    },

    removeCity(id: number) {
      this.cities = this.cities.filter((c) => c.id !== id);
      this.saveToLocalStorage();
    },

    async initWithGeo() {
      if (this.cities.length) return;
      if (!navigator.geolocation) return;

      const coords = await new Promise<GeolocationPosition | null>(
        (resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos),
            () => resolve(null)
          );
        }
      );
      if (!coords) return;

      const { latitude, longitude } = coords.coords;

      try {
        const resp = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              lat: latitude,
              lon: longitude,
              units: "metric",
              lang: "en",
              appid: API_KEY,
            },
          }
        );

        const data = resp.data;
        const city = { id: data.id, name: data.name };

        if (!this.cities.find((c) => c.id === city.id)) {
          this.cities.push(city);
          this.saveToLocalStorage();
        }
      } catch (e) {
        console.error("Unable to determine the city by geolocation", e);
      }
    },
  },
});
