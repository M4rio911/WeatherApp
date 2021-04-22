<template>
  <div class="row d-flex justify-content-between px-2 col-10 offset-1 py-5">
    <p v-if="!isLoaded" class="display-3 text-center">LOADING</p>
    <div class="container text-center mb-5">
      <!-- cities -->
      <div class="d-flex justify-content-center">
        <button class="btn btn-block btn-primary d-flex align-items-center p-4" @click="addingForm = true">
          <span class="display-4"> Add your favourite cities here</span>
          <img class="mt-2 ms-3" src="../img/UI/add.png" alt="" />
        </button>
      </div>
    </div>
    <base-message v-if="addingForm" type="form" @reset="close"></base-message>
    <base-spinner v-if="!isLoaded"></base-spinner>
    <div v-else-if="get.length > 0 && isLoaded" class="row">
      <base-weather-card
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
    <p v-else class="text-center fs-4">No cities Added yet :(</p>
  </div>
</template>

<script>
import BaseWeatherCard from './BaseWeatherCard';
import BaseMessage from "./BaseMessage.vue";
import axios from 'axios';
export default {
  components: {
    BaseMessage,
    BaseWeatherCard,
  },
  data() {
    return {
      addingForm: false,
      isLoaded: true,
      weather_info: [],
      refresher: undefined
    };
  },
  methods: {
    close() {
      this.addingForm = false;
    },
  },
  computed: {
    get() {
      return this.$store.getters["weather/cities"];
    },
    activeUserToken() {
      return this.$store.getters["users/activeUserToken"];
    },
    activeUserId() {
      return this.$store.getters["users/activeUserId"];
    },
  },
  created() {
    const loop = () => {
      this.isLoaded = false;
      console.log("refresh");
        for (const city of this.get) {
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
img {
  height: 35px;
  margin-bottom: 8px;
}
</style>
