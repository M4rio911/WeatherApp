<template>
  <div class="col-6 offset-3">
    <p class="text-center display-4">Register</p>
    <form @submit.prevent="">
      <div class="mb-lg-3 row">
        <label for="staticEmail" class="col-lg-2 col-form-label">Email</label>
        <div class="col-lg-10">
          <input
            type="text"
            class="form-control"
            id="staticEmail"
            ref="i1"
            placeholder="email@example.com"
            autocomplete="username"
          />
        </div>
      </div>
      <div class="mb-lg-3 row">
        <label for="inputPassword" class="col-lg-2 col-form-label"
          >Password</label
        >
        <div class="col-lg-10">
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            ref="i2"
            placeholder="* * * *"
            autocomplete="new-password"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword2" class="col-lg-2 col-form-label"
          >Repeat Password</label
        >
        <div class="col-lg-10">
          <input
            type="password"
            class="form-control"
            id="inputPassword2"
            ref="i3"
            placeholder="* * * *"
            autocomplete="new-password"
          />
        </div>
      </div>
      <div class="col-auto text-center">
        <button
          type="submit"
          class="btn btn-outline-dark mb-3"
          @click="validate()"
        >
          REGISTER
        </button>
      </div>
      <base-message
        type="alert"
        :title="ErrTitle"
        :message="ErrMsg"
        @reset="reset()"
        v-if="!IsValidate"
      ></base-message>
    </form>
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
    validate() {
      const email_check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const email = this.$refs["i1"].value;
      const password = this.$refs["i2"].value;
      const password2 = this.$refs["i3"].value;
      if (
        email.trim() === "" ||
        password.trim() === "" ||
        password2.trim() === ""
      ) {
        this.ErrTitle = "Fill empty places";
        this.ErrMsg = "Some of inputs are empty, please fill them";
        this.IsValidate = false;
      } else if (password !== password2) {
        this.IsValidate = false;
        this.ErrTitle = "Password Error";
        this.ErrMsg = "Password do not match";
      } else if (password.length < 6) {
        this.IsValidate = false;
        this.ErrTitle = "Password Error";
        this.ErrMsg = "Password should be at least 6 chharacters long";
      } else if (email_check.test(email.toLowerCase()) === false) {
        this.IsValidate = false;
        this.ErrTitle = "Email Error";
        this.ErrMsg = "Invalid Email";
      } else {
        this.submit(email, password);
      this.$refs["i1"].value = "";
      this.$refs["i2"].value = "";
      this.$refs["i3"].value = "";
      }
    },
    async submit(email, password) {
      try{
        await this.$store.dispatch('users/userLogReg', {
        mode: "register",
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
