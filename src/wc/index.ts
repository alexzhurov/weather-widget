// wc/index.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import WeatherWidget from "../components/WeatherWidget.vue";
import { FontAwesomeIcon } from "../plugins/fontawesome";

export function createWidgetApp(el: HTMLElement) {
  const app = createApp(WeatherWidget);

  const pinia = createPinia();
  app.use(pinia);

  app.component("font-awesome-icon", FontAwesomeIcon);

  app.mount(el);
}
