const API_KEY = "YOUR_OPENWEATHER_API_KEY";

export async function fetchWeather(city: string) {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}` + `&units=metric&appid=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("API error");
  return res.json();
}
