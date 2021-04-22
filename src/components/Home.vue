<template>
  <div class="row d-flex justify-content-between px-2 col-10 offset-1">
    <base-spinner v-if="!isLoaded"></base-spinner>
    <base-weather-card
      v-else
      class="col-xl-4 col-lg-6"
      v-for="info in weather_info"
      :city="info.city"
      :temp="info.temp"
      :pressure="info.pressure"
      :humidity="info.humidity"
      :weather="info.weather"
      :key="info"
    ></base-weather-card>
  </div>
</template>

<script>
import axios from "axios";
import BaseWeatherCard from "./BaseWeatherCard.vue";
export default {
  data() {
    return {
      test: false,
      // DEFAULT CITIES
      def_cities: ["London", "Warsaw", "Sydney", "Berlin", "Moscow", "Rome"],
      weather_info: [],
      isLoaded: true,
      refresher: undefined,
    };
  },
  components: {
    BaseWeatherCard,
  },
  mounted() {
    const loop = () => {
      this.isLoaded = false;
      // console.log("refresh");
      try {
        for (const city of this.def_cities) {
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=93d71fee8b9fabde47f81589d838ab02`
            )
            .then((response) => {
              this.weather_info = this.weather_info.filter(filtered_city => filtered_city.city !== city);
              this.weather_info.push({
                city: city,
                temp: Math.round(response.data.main.temp * 10) / 10,
                pressure: response.data.main.pressure,
                humidity: response.data.main.humidity,
                weather: response.data.weather[0].main,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {
        console.log(error);
      }

      this.isLoaded = true;
    };
    loop();
    this.refresher = setInterval(() => {
      loop();
    }, 60000);
  },
  beforeUnmount() {
    clearInterval(this.refresher);
  },
};
</script>

<style scoped>
.off {
  display: none;
}
</style>
