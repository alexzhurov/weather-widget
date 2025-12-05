import { defineWidget } from "@/utils/defineWidget";
import App from "@/App.vue";
import AppStyles from "@/App.scss?raw";
import WeatherWidgetStyles from "@/components/WeatherWidget.scss?raw";
import SettingsComponentStyles from "@/components/SettingsComponent.scss?raw";

// Повторите для каждого компонента
defineWidget({
  tag: "weather-widget",
  component: App,
  styles: [AppStyles, WeatherWidgetStyles, SettingsComponentStyles],
});
