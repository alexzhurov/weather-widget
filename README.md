# 🌦 Weather Widget (Vue.js + Web Components)

A lightweight, standalone weather widget that can be embedded **on any website** in one line:

```html
<weather-widget></weather-widget>
<script type="module" src="dist/weather-widget.js"></script>
```

## Technologies Used

- Vue.js 3 + Composition API
- TypeScript
- Pinia for state management
- Axios for API requests
- SCSS for styling
- Web Components build via Vue CLI
API
- Data fetched from [OpenWeather API](https://openweathermap.org/api)

## Project setup

Install dependencies:
```bash
yarn install
```

### Build the widget

Build the Web Component for production:
```bash
yarn build
```

Build and watch for changes
```bash
yarn build:watch
```
