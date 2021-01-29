<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/static/logo.svg" alt=""/></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">邮箱注册</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入用户名" v-model="username" />
          </div>
          <div class="input">
            <input type="text" placeholder="请输入邮箱" v-model="email" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请再次输入密码"
              v-model="confirm_password"
            />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="register">注册</a>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
    <modal
      title="提示"
      btnType="1"
      sureText="去登录"
      :showModal="showModal"
      @cancel="showModal = false"
      @submit="goToLogin"
    >
      <template v-slot:body>
        <p>注册成功</p>
      </template>
    </modal>
  </div>
</template>
<script>
import NavFooter from "./../components/NavFooter";
import Modal from "./../components/Modal";
import {AUTH_REQUEST} from "./../store/index"

export default {
  name: "register",
  components: {
    NavFooter,
    Modal,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      showModal: false,
    };
  },
  methods: {
    register() {
      let { username, email, password, confirm_password } = this;
      this.$api
        .register({
          username,
          email,
          password,
          confirm_password,
        })
        .then(() => {
          this.$store.dispatch(AUTH_REQUEST, {email, password}).then(()=>{
            this.$router.push("/");
          })
        });
    },
    goToLogin() {
      this.showModal = false;
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/modal.scss";

.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("/static/login-bg.jpg") no-repeat center;
    .container {
      height: 576px;
      width: $min-width;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>
