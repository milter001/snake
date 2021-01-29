<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  created() {

  },
  mounted() {
    console.log("App.vue mounted()");
  },
  methods: {},
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
@import "./assets/scss/mixin.scss";
</style>
