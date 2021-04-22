<template>
  <div class="main">
    <base-success :signal="!added"></base-success>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light border-bottom border-primary border-2 fs-2"
    >
      <div class="container-fluid col-8 offset-2">
        <span class="navbar-brand fs-2 fw-normal brand" href="#"
          >YouWeather</span
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <hr class="d-block d-lg-none" />
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link brand ms-4 fs-4" to="/home"
                ><img
                  class="me-2 d-sm-inline-block d-lg-none d-xl-inline-block"
                  src="../img/UI/home.png"
                  alt=""
                />
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                v-if="!isLogged"
                class="nav-link brand ms-4 fs-4"
                to="/login"
                ><img
                  class="me-2 d-sm-inline-block d-lg-none d-xl-inline-block"
                  src="../img/UI/login.png"
                  alt=""
                />Login</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                v-if="!isLogged"
                class="nav-link brand ms-4 fs-4"
                to="/register"
                ><img
                  class="me-2 d-sm-inline-block d-lg-none d-xl-inline-block"
                  src="../img/UI/adduser.png"
                  alt=""
                />Register</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                v-if="isLogged"
                class="nav-link brand ms-4 fs-4"
                to="/dashboard"
                ><img
                  class="me-2 d-sm-inline-block d-lg-none d-xl-inline-block"
                  src="../img/UI/heart.png"
                  alt=""
                />Dashboard</router-link
              >
            </li>
            <li class="nav-item">
              <span
                v-if="isLogged"
                class="nav-link brand ms-4 fs-4"
                @click="logout()"
                ><img
                  class="me-2 d-sm-inline-block d-lg-none d-xl-inline-block"
                  src="../img/UI/logout.png"
                  alt=""
                />Logout</span
              >
            </li>
          </ul>
          <p
            v-if="isLogged"
            class="d-sm-block d-lg-none fs-6 text-center me-3 my-3"
          >
            Welcome {{ activeUser }}
          </p>
        </div>
      </div>
      <p v-if="isLogged" class="d-none d-lg-block fs-6 text-center me-3 my-3">
        Welcome {{ activeUser }}
      </p>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    isLogged() {
      return this.$store.getters["users/isLogged"];
    },
    activeUser() {
      return this.$store.getters["users/activeUserMail"];
    },
    added() {
      return this.$store.getters["users/isAdded"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout");
    },
  },
};
</script>

<style scoped>
img {
  height: 35px;
  margin-bottom: 8px;
}

nav {
  font-family: "Montserrat", sans-serif;
}

.nav-link:hover {
  color: #fa8231 !important;
}
a.router-link-active {
  font-size: 1.7rem !important;
  font-weight: 500;
  color: black !important;
}
hr {
  margin: 0.3rem 0;
}

.brand {
  transition: 0.3s;
}
.brand:hover {
  font-size: 110% !important;
}
</style>
