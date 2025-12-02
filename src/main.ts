// main.ts
import { createApp } from "vue";
import AppDev from "./dev/AppDev.vue";
import { pinia } from "./stores";
import { FontAwesomeIcon } from "./plugins/fontawesome";

const app = createApp(AppDev);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.mount("#app");
