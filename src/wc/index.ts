// wc/index.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import { FontAwesomeIcon } from "@/plugins/fontawesome";
import { useCitiesStore } from "@/stores/useCitiesStore";

export function createWidgetApp(el: HTMLElement) {
  const app = createApp(App);

  const pinia = createPinia();
  app.use(pinia);

  const citiesStore = useCitiesStore();
  citiesStore.loadFromLocalStorage();

  app.component("font-awesome-icon", FontAwesomeIcon);

  app.mount(el);
}
