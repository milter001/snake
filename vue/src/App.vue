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
  mounted() {
    this.getUserInfo(); // 首次打开页面时根据cookie获取用户信息
  },
  methods: {
    getUserInfo() {
        this.$api
          .getUserInfo()
          .then((res = {}) => {
            this.$store.dispatch("saveMobile", res.data.data.mobile);
          });
      
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
@import "./assets/scss/mixin.scss";
</style>


