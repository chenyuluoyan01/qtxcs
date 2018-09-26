<template>
  <div class="login-main login-live">
    <img class="bg" src="../../../images/login_bg.png">
    <img class="bg_logo" src="../../../images/logo_bg.png">
    <login @goRegister="goRegister" @goForget="goForget" v-if="status == 'login'"></login>
    <register @goLogin="goLogin" v-if="status == 'register'"></register>
    <forget-psw @goLogin="goLogin" v-if="status == 'forgetPsw'"></forget-psw>
  </div>
</template>

<script>
import Vue from 'vue'
import login from './login'
import register from './register'
import forgetPsw from './forgetPsw'
export default {
  name:'loginMain',
  data: function() {
    return {
      status:'login'
    }
  },
  components: {
    login,register,forgetPsw
  },
  mounted: function(){
  },
  methods:{
    goRegister: function(){
      this.status = 'register'
    },
    goLogin: function(){
      this.status = 'login'
    },
    goForget: function(){
      this.status = 'forgetPsw'
    }
  }
}
</script>

<style lang="less" scoped>
.min-box .main-content{
  margin-top: 0!important;
}
.login-live{
  width: 100vw;
  height: 100vh;
  z-index: 9999999999;
  position: fixed;
  left: 0;
  img.bg{
    width:100vw;
    height:100vh;
    position:absolute;
    top:0;
    left:0;
    z-index:-1;
  }
  img.bg_logo{
    position:fixed;
    top:0;
    left:0;
    bottom: 0;
    right:0;
    margin: auto;
    margin-top: 100px;
  }
}
</style>
