// main.ts
import { createApp } from "vue";
import App from "@/App.vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@/plugins/fontawesome";
import { useCitiesStore } from "@/stores/useCitiesStore";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
const pinia = createPinia();
app.use(pinia);

const citiesStore = useCitiesStore();
citiesStore.loadFromLocalStorage();
app.mount("#app");
