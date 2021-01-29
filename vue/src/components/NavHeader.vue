<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">课件</a>
          <a href="javascript:;">测验</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="isProfileLoaded">欢迎你: {{ userProfile.username }}</a>
          <a href="javascript:;" v-if="!isAuthenticated" @click="login">登录</a>
          <a href="javascript:;" v-if="!isAuthenticated" @click="goToRegister">注册</a>
          <a href="javascript:;" v-if="isAuthenticated" @click="logout">退出</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import {AUTH_LOGOUT} from "../store/index"
export default {
  name: "nav-header",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isProfileLoaded"]),
    ...mapState(['userProfile']),

  },
  mounted() {},
  methods: {
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(()=>{});
    },

    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/modal.scss";
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      @include flex();
      align-items: flex-start;
      a {
        display: inline-block;
        color: #b0b0b0;
        font-size: $fontG;
        margin-right: 17px;
      }

    }
  }
}
</style>
