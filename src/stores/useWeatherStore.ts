import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    lastCity: "",
  }),
  actions: {
    setCity(city: string) {
      this.lastCity = city;
    },
  },
});
