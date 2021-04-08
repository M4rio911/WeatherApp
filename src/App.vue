<template>
  <div>
    <the-header></the-header>
    <base-card> </base-card>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
import BaseCard from "./components/BaseCard";
export default {
  components: {
    TheHeader,
    BaseCard,
  },
  created(){
    this.$store.dispatch("users/tryLogin");
  }
};
</script>

<style>
@import url("../FixedBoot/BS.css");
</style>
<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
