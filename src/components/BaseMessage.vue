<template>
  <div :class="type" class="d-flex bckg">
    <div
      v-if="type == 'alert'"
      class="card text-center col-6 offset-3 p-5 rounded-3"
    >
      <h2 class="display-4">{{ title }}</h2>
      <p class="">{{ message }}</p>
      <button class="btn btn-primary" @click="close()">OK</button>
    </div>
    <div
      v-if="type == 'form'"
      class="card text-center col-8 offset-2 px-4 py-3 rounded-3 my-4"
    >
      <span @click="close()" class="text-end mb-2"
        >Exit <img src="../img/icons/UI/delete.png" alt=""
      /></span>
      <h2 class="display-4">Add your Cities here</h2>
      <hr class="mt-3" />
      <form  @submit.prevent="validate()" class="mb-3">
        <div class="text-start">
          <label for="city" class="form-label display-5 fs-2 mt-2 mb-3"
            >Enter city name:</label
          >
          <input
            ref="city1"
            type="text"
            id="city"
            class="form-control"
            placeholder=". . ."
          />
          <p class="text-danger mt-1" v-if="!!warning">{{warning}}</p>
        </div>
        <div>
          
      <button type="submit" class="btn btn-primary mt-3 col-6">
        OK
      </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "message", "type"],
  data() {
    return {
      warning: false,
    };
  },
  methods: {
    close() {
      this.$emit("reset");
    },
    async validate() {
      this.warning = false;
      const city = this.$refs["city1"].value.trim();
      if(city == ""){
        this.warning = "This field must not be empty";
      }else{
        try{
          await this.$store.dispatch("weather/sendData", {
            city,
            userId: this.activeUserId,
            userToken: this.activeUserToken
          });
        }catch(error){
          this.warning = "City not found!";
        }
        if(this.warning === false){
          this.$emit("reset");
          this.$store.commit("users/IsAddedChange");
          // this.$router.go("/dashboard");
        }
      }
    },
  },
  computed: {
    activeUserId(){
      return this.$store.getters["users/activeUserId"];
    },
    activeUserToken(){
      return this.$store.getters["users/activeUserToken"];
    }
  }
};
</script>

<style scoped>

.bckg{
  z-index: 100;
}

.alert {
  font-family: "Montserrat", sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.4);
  align-items: center;
}
.form {
  font-family: "Montserrat", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(1, 1, 1, 0.4);
  align-items: flex-start;
}

.form span img {
  width: 25px;
  transition: 0.2s;
}
.form span img:hover {
  width: 35px;
}
</style>
