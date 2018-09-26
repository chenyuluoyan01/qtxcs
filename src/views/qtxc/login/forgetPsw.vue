<template>
  <div>
    <h2 class="company">金成达科技有限公司</h2>
    <div class="login-main">
      <ul class="clear">
        <li>
          <h2>找回密码</h2>
        </li>
        <li class="register-lib"  @click="goLogin">
          <span>登录</span>
          <img src="../../../images/arrow.svg" alt="">
        </li>
      </ul>
      <div class="login-dialog-main">
        <ul class="clear">
          <li class="login-right">
            <ul>
              <li class="btn-list">
                <label for="phone">手机号码：</label>
                <input class="text-input" type="tel" id="phone" placeholder="请输入手机号">
              </li>
              <li class="btn-list via">
                <label for="via">验证码：</label>
                <input class="text-input" id="via" type="text" placeholder="验证码">
                <div class="code" @click="refreshCode">
                  <s-identify :identifyCode="identifyCode"></s-identify>
                </div>
              </li>
              <li class="btn-list msg-code">
                <label for="code">短信验证码：</label>
                <input class="text-input" id="code" type="text" placeholder="请输入手机验证码">
                <span v-if="codeOpen == 'open'" @click="getCode" class="get-code">获取验证码</span>
                <span v-if="codeOpen == 'close'" class="close-code">{{second}}s后重试</span>
              </li>
              <li class="btn-list psw-wrap">
                <label for="psw">登录密码：</label>
                <input class="text-input" id="psw" :type="pswOpen?'text':'password'" placeholder="请输入密码">
                <img @click="pswOpen=!pswOpen" v-if="pswOpen == false" src="../../../images/eye-close.png"/>
                <img @click="pswOpen=!pswOpen" v-if="pswOpen == true" src="../../../images/eye-open.png"/>
              </li>
              <li style="border:0">
                <button @click="login">注册</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'
export default {
  name:'register',
  data: function() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      codeOpen:"open",
      second:60,
      pswOpen:false
    }
  },
  components: {
  },
  mounted: function(){
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    $(".btn-list").each(function(i,item){
      var eachItem = $(".btn-list").eq(i).find(".text-input");
      eachItem.focus(function(){
        console.log(i)
        $(".blue-border").removeClass("blue-border")
        $(".btn-list").eq(i).addClass("blue-border")
      })
      eachItem.blur(function(){
        $(".blue-border").removeClass("blue-border");
      })
    })
    setTimeout(function(){
      $(".login-right").height($(".login-left").height())
    })
  },
  methods:{
    goLogin: function(){
      this.$emit("goLogin")
    },
    getCode: function(){
      let _this = this;
      _this.codeOpen = "close";
      this.$Message.success('短信已发送成功！');
      var Timer = null;
      Timer = setInterval(function(){
        _this.second --
        if(_this.second == 0){
          clearInterval(Timer)
          _this.codeOpen = "open"
          _this.second = 60
        }
      },1000)
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    login: function(){
      localStorage.setItem("jcd_main_token","123")
      this.$emit("login")
    }
  }
}
</script>

<style lang="less" scoped>
h2{
  line-height: 42px;
  color: rgba(74, 144, 226, 1);
  font-size: 22px;
  line-height: 60px;
}
.company{
  text-indent: 60px!important;
}
.login-main{
  width: 400px;
  margin: 0 auto;
  padding: 20px 20px 50px 20px;
  position: relative;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(228, 228, 228, 0.5);
  border: 1px solid rgba(237, 233, 233, 1);
  top:60px;
  h2{
    text-indent: 0;
  }
  ul{
    li{
      float: left;
      line-height: 60px;
    }
    li.register-lib{
      float: right;
      img{
        vertical-align: middle;
      }
      span{
        color: rgba(194, 189, 189, 1);
        font-size: 16px;
        cursor: pointer;
        vertical-align: middle;
      }
      span:hover{
        color: rgba(74, 144, 226, 1);
      }
    }
  }
}
li.login-right{
  background: #fff;
  float:left;
  ul{
    width:80%;
    height:100%;
    margin:0 auto;
    li{
      width:100%;
      float:none;
      border-bottom:1px solid #D2D2D2;
      button{
        width:100%;
        line-height: 32px;
        font-size:14px;
        cursor:pointer;
        background: #4A90E2;
        color:#fff;
        -webkit-transition: all .30s ease-in-out;
        -moz-transition: all .30s ease-in-out;
        -ms-transition: all .30s ease-in-out;
        -o-transition: all .30s ease-in-out;
        transition: all .30s ease-in-out;
      }
      button:hover{
        background: #57a3f3;
        -webkit-transition: all .30s ease-in-out;
        -moz-transition: all .30s ease-in-out;
        -ms-transition: all .30s ease-in-out;
        -o-transition: all .30s ease-in-out;
        transition: all .30s ease-in-out;
      }
      label{
        display:inline-block;
        text-align: left;
        line-height: 25px;
        color: rgba(41, 41, 41, 1);
        font-size: 14px;
      }
      input{
        display:inline-block;
        width:60%;
        height:26px;
        line-height: 1.5;
        font-size: 14px;
        border:none;
        outline: none;
      }
    }
    .msg-code{
      label{
        width:30%;
      }
      input{
        width:40%;
      }
      span{
        font-size:14px;
        cursor:pointer;
        -webkit-transition: all .30s ease-in-out;
        -moz-transition: all .30s ease-in-out;
        -ms-transition: all .30s ease-in-out;
        -o-transition: all .30s ease-in-out;
        transition: all .30s ease-in-out;
      }
      .get-code:hover{
        color:#2db7f5;
        -webkit-transition: all .30s ease-in-out;
        -moz-transition: all .30s ease-in-out;
        -ms-transition: all .30s ease-in-out;
        -o-transition: all .30s ease-in-out;
        transition: all .30s ease-in-out;
      }
      .get-code{
        color:#4A90E2;
      }
      .close-code{
        color:#ccc;
        cursor: not-allowed;
      }
    }
    .via{
      label{
        width:24%;
      }
      input{
        width:20%;
      }
      .code{
        position: relative;
        top:10px;
      }
    }
  }
}
.psw-wrap{
  img{
    position:relative;
    top:10px;
    cursor:pointer;
  }
}
.login-main-wrap{
  height:100vh;
  overflow: hidden;
  .http-name{
    background-color: #FDFDFD;
    height: 800px;
    position: relative;
    top: -10px;
    h2{
      color: rgba(134, 132, 132, 1);
      font-size: 16px;
      text-align: center;
      line-height:80px;
    }
  }
}
.code{
  display: inline-block;
  vertical-align: middle;
  margin-left:26px;
}
.forgetPsw{
  float:right;
  color: rgba(124, 124, 124, 1);
  font-size:12px;
  cursor:pointer;
  margin-top:4px;
}
.forgetPsw:hover {
  color: #488DDD;
}
.blue-border{
  box-shadow: 0px 2px 0px #cfd9e9;
  border-bottom:1px solid #488DDD!important;
  -webkit-transition: all .30s ease-in-out;
      -moz-transition: all .30s ease-in-out;
      -ms-transition: all .30s ease-in-out;
        -o-transition: all .30s ease-in-out;
          transition: all .30s ease-in-out;
}
.free-login span{
  line-height: 22px;
  color: rgba(124, 124, 124, 1);
  font-size:12px;
}

</style>




<!-- <template>
  <div class="login-main-wrap">
    <div class="top">
      <div class="top-main clear">
        <span class="cy-name">金成达</span>
        <span class="cy-line">|</span>
        <span class="cy-login">找回密码</span>
        <Button class="cy-register-btn" @click="goLogin">登录</Button>
      </div>
      <div class="login-dialog">
        <div class="login-dialog-main">
          <ul class="clear">
            <li class="login-right">
              <ul>
                <li class="btn-list">
                  <label for="phone">手机号码：</label>
                  <input class="text-input" type="tel" id="phone" placeholder="请输入手机号">
                </li>
                <li class="btn-list msg-code">
                  <label for="code">短信验证码：</label>
                  <input class="text-input" id="code" type="text" placeholder="请输入手机验证码">
                  <span v-if="codeOpen == 'open'" @click="getCode" class="get-code">获取验证码</span>
                  <span v-if="codeOpen == 'close'" class="close-code">{{second}}s后重新获取</span>
                </li>
                <li class="btn-list psw-wrap">
                  <label for="psw">设定新密码：</label>
                  <input class="text-input" id="psw" :type="pswOpen?'text':'password'" placeholder="请输入密码">
                  <img @click="pswOpen=!pswOpen" v-if="pswOpen == false" src="../../../images/eye-close.png"/>
                  <img @click="pswOpen=!pswOpen" v-if="pswOpen == true" src="../../../images/eye-open.png"/>
                </li>
                <li style="border:0">
                  <button @click="login">确定</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="http-name">
        <h2>kingdartech.com</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Lib from 'assets/js/Lib'
import Api from 'assets/js/api/api'
import sIdentify from 'components/utility/identify'
export default {
  name:'forgetPsw',
  data: function() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      codeOpen:"open",
      pswOpen:false,
      second:60
    }
  },
  components: {
    sIdentify
  },
  mounted: function(){
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    $(".btn-list").each(function(i,item){
      var eachItem = $(".btn-list").eq(i).find(".text-input");
      eachItem.focus(function(){
        console.log(i)
        $(".blue-border").removeClass("blue-border")
        $(".btn-list").eq(i).addClass("blue-border")
      })
      eachItem.blur(function(){
        $(".blue-border").removeClass("blue-border");
      })
    })
    setTimeout(function(){
      $(".login-right").height($(".login-left").height())
    })
  },
  methods:{
    goLogin: function(){
      this.$emit("goLogin")
    },
    getCode: function(){
      let _this = this;
      _this.codeOpen = "close";
      this.$Message.success('短信已发送成功！');
      var Timer = null;
      Timer = setInterval(function(){
        _this.second --
        if(_this.second == 0){
          clearInterval(Timer)
          _this.codeOpen = "open"
          _this.second = 60
        }
      },1000)
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    login: function(){
      localStorage.setItem("jcd_main_token","123")
      this.$emit("login")
    }
  }
}
</script>

<style lang="less" scoped>
  .psw-wrap{
    img{
      position:absolute;
      cursor:pointer;
    }
  }
  .login-main-wrap{
    height:100vh;
    overflow: hidden;
    .http-name{
      background-color: #FDFDFD;
      height: 800px;
      position: relative;
      top:-42px;
      h2{
        color: rgba(134, 132, 132, 1);
        font-size: 16px;
        text-align: center;
        line-height:80px;
      }
    }
  }
  .code{
    display: inline-block;
    vertical-align: middle;
    margin-left:26px;
  }
  .forgetPsw{
    float:right;
    color: rgba(124, 124, 124, 1);
    font-size:12px;
    cursor:pointer;
    margin-top:4px;
  }
  .forgetPsw:hover {
    color: #488DDD;
  }
  .blue-border{
    box-shadow: 0px 2px 0px #cfd9e9;
    border-bottom:1px solid #488DDD!important;
    -webkit-transition: all .30s ease-in-out;
       -moz-transition: all .30s ease-in-out;
        -ms-transition: all .30s ease-in-out;
         -o-transition: all .30s ease-in-out;
            transition: all .30s ease-in-out;
  }
  .free-login span{
    line-height: 22px;
    color: rgba(124, 124, 124, 1);
    font-size:12px;
  }
  .login-main-wrap{
    .top{
      height: 108px;
      background-color: #FDFDFD;
      .top-main{
        width: 55%;
        padding: 30px 0px;
        margin: 0 auto;
        span{
          vertical-align:middle;
        }
        .cy-name{
          color: rgba(68, 68, 68, 1);
          font-size:28px;
        }
        .cy-line{
          font-size:16px;
          color:#E1E1E1;
          margin-left: 16px;
        }
        .cy-login{
          font-size:18px;
          color: #B7B7B7;
          margin-left:20px;
        }
        .cy-register-btn{
          float: right;
          padding: 2px 20px;
          margin-top:8px;
          border:1px solid #488DDD;
          background: #fff;
          color: #488DDD;
          border-radius: 6px;
        }
        .cy-register-btn:hover{
          background: #488DDD;
          color:#fff;
        }
      }
    }
    .login-dialog{
      background: #F2F2F2;
      .login-dialog-main{
        width: 55%;
        background: #F2F2F2;
        margin:0 auto;
        ul{
          padding:40px 0px;
          li{
            float:left;
          }
          /* li.login-left{
            width:51%;
            img{
              width:100%;
            }
          } */
          li.login-right{
            width:100%;
            border:1px solid #EDE9E9;
            background: #fff;
            ul{
              width:50%;
              height:100%;
              margin:0 auto;
              padding-top:20px;
              li{
                float:none;
                padding: 24px 0px;
                border-bottom:1px solid #D2D2D2;
                button{
                  width:100%;
                  line-height: 32px;
                  font-size:14px;
                  cursor:pointer;
                  background: #4A90E2;
                  color:#fff;
                  -webkit-transition: all .30s ease-in-out;
                  -moz-transition: all .30s ease-in-out;
                  -ms-transition: all .30s ease-in-out;
                  -o-transition: all .30s ease-in-out;
                  transition: all .30s ease-in-out;
                }
                button:hover{
                  background: #57a3f3;
                  -webkit-transition: all .30s ease-in-out;
                  -moz-transition: all .30s ease-in-out;
                  -ms-transition: all .30s ease-in-out;
                  -o-transition: all .30s ease-in-out;
                  transition: all .30s ease-in-out;
                }
                label{
                  display:inline-block;
                  width:30%;
                  text-align: left;
                  line-height: 25px;
                  color: rgba(41, 41, 41, 1);
                  font-size: 14px;
                }
                input{
                  display:inline-block;
                  width:58%;
                  height:26px;
                  line-height: 1.5;
                  font-size: 14px;
                  border:none;
                  outline: none;
                 /*  background: #F2F2F2;
                 border:1px solid #ccc;
                 border-radius:2px; */
                }
              }
              .msg-code{
                label{
                  width:30%;
                }
                input{
                  width:40%;
                }
                span{
                  font-size:14px;
                  cursor:pointer;
                  -webkit-transition: all .30s ease-in-out;
                  -moz-transition: all .30s ease-in-out;
                  -ms-transition: all .30s ease-in-out;
                  -o-transition: all .30s ease-in-out;
                  transition: all .30s ease-in-out;
                }
                .get-code:hover{
                  color:#2db7f5;
                  -webkit-transition: all .30s ease-in-out;
                  -moz-transition: all .30s ease-in-out;
                  -ms-transition: all .30s ease-in-out;
                  -o-transition: all .30s ease-in-out;
                  transition: all .30s ease-in-out;
                }
                .get-code{
                  color:#4A90E2;
                }
                .close-code{
                  color:#ccc;
                  cursor: not-allowed;
                }
              }
              .via{
                margin-bottom:26px;
                label{
                  width:30%;
                }
                input{
                  width:30%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
 -->