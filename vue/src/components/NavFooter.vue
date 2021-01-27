<template>
  <div class="footer">
    <div class="footer-link">
      <a href="javascrpt:;" target="_blank"></a><span>|</span>
      <a href="javascrpt:;" target="_blank">联系我们</a><span>|</span>
      <a href="javascrpt:;" target="_blank">关于我们</a><span>|</span>
    </div>
    <div class="copyright">
      Copyright ©2019 <span class="domain">strawberrymaker.cn</span> All Rights
      Reserved.
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-footer",
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/modal.scss";
.footer {
  height: 234px;
  border-top: 4px solid #ff6600;
  background-color: #333333;
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
    margin-bottom: 13px;
  }
  .copyright {
    .domain {
      color: #ff6600;
    }
  }
}
</style>
