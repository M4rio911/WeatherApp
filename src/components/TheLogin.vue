<template>
  <div class="border border-primary bg-light col-6 offset-3">
    <form @submit.prevent="">
      <div class="mb-3 row"> 
        <p class="text-center display-4">Log in</p>
        <label for="staticEmail" class="col-lg-2 col-form-label"
          >Email</label
        >
        <div class="col-lg-10">
          <input
            type="text"
            class="form-control"
            id="staticEmail"
            ref="email"
            placeholder="email@example.com"
            autocomplete="e-mail"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-lg-2 col-form-label"
          >Password</label
        >
        <div class="col-lg-10">
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            ref="password"
            autocomplete="password"
            placeholder="* * * *"
          />
        </div>
      </div>
      <div class="col-auto text-center">
        <button
          type="submit"
          class="btn btn-outline-dark mb-3 mb-3 fs-5"
          @click="login()"
        >
          Ok
        </button>
      </div>
    </form>
    <base-message
      type="alert"
      :title="ErrTitle"
      :message="ErrMsg"
      @reset="reset()"
      v-if="!IsValidate"
    ></base-message>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ErrMsg: "",
      ErrTitle: "",
      IsValidate: true,
    };
  },
  methods: {
    async login() {
      const email = this.$refs["email"].value;
      const password = this.$refs["password"].value;
      try {
        await this.$store.dispatch("users/userLogReg", {
          mode: "login",
          email,
          password,
        });
      } catch (error) {
        this.IsValidate = false;
        this.ErrTitle = "Fetch Error";
        this.ErrMsg = error.message;
      }
    },
    reset() {
      this.ErrMsg = "";
      this.ErrTitle = "";
      this.IsValidate = true;
    },
  },
};
</script>
