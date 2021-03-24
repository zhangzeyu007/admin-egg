<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 12:14:06
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-24 12:13:37
-->

<template>
  <div id="login">
    <div class="login-main">
      <div class="avatar-box">
        <img src="../assets/logo.jpg" alt="" />
      </div>
      <div class="login-form">
        <img
          @click="goRegister"
          class="icon-register"
          src="../static/image/login/icon_register.png"
          alt=""
        />
        <el-form
          ref="loginForm"
          :model="form"
          label-width="80px"
          :rules="loginRules"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="form.username"
              prefix-icon="el-icon-user-solid"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              prefix-icon="el-icon-unlock"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="captcha" label="验证码" class="captcha-container">
            <el-row>
              <el-col :span="16">
                <el-input
                  v-model="form.captcha"
                  placeholder="请输入验证码"
                ></el-input>
              </el-col>
              <el-col :span="4">
                <div class="captcha">
                  <div v-html="captcha" @click="resetCaptcha"></div>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-button">
        <div class="login-info">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </div>
        <div class="login-footer">
          <el-row>
            <el-col :span="12"></el-col>
            <el-col :span="12">
              <el-button
                type="primary"
                icon="el-icon-mobile-phone"
                size="medium"
                @click="goLogin"
                >登录</el-button
              >
              <el-button
                type="info"
                icon="el-icon-refresh"
                size="medium"
                @click="resetForm"
                >重置</el-button
              >
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <video
      id="video"
      src="../assets/video_back.mp4"
      autoplay
      muted
      loop
    ></video>
  </div>
</template>

<script>
import { Message } from "element-ui";
import md5 from "md5";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        captcha: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change",
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20个字符",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change",
          },
        ],
        captcha: [
          {
            required: true,
            message: "请输入校验码",
            trigger: "change",
          },
        ],
      },
      captcha: "",
      checked: true,
    };
  },
  created() {
    this.resetCaptcha();
  },
  methods: {
    goLogin() {
      let that = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$api.user
            .Login({
              username: this.form.username,
              password: md5(this.form.password),
              captcha: this.form.captcha,
            })
            .then((res) => {
              if (res.code === 200) {
                if (res.data && res.data.token) {
                  localStorage.setItem("token", res.data.token);
                  that.$router.push({ name: "Home" });
                  window.location.reload();
                }
              }
              if (res.code === -1) {
                Message({
                  message: res.message,
                  type: "warning",
                });
                this.resetCaptcha();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    resetForm() {
      this.$refs["loginForm"].resetFields();
    },
    goRegister() {
      this.$router.push({ path: "/register" });
    },
    resetCaptcha() {
      this.$api.user
        .getCaptcha()
        .then((response) => {
          this.captcha = response;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style  lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  position: relative;
}
.el-col {
  border: 1px solid transparent;
}
.login-main {
  width: 450px;
  height: 350px;
  background-color: #fff;
  opacity: 0.9;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 25px rgb(197, 197, 197);
  z-index: 1000;
  .avatar-box {
    width: 100px;
    height: 100px;
    padding: 10px;
    border-radius: 50%;
    border: 1px solid #eeee;
    background-color: #fff;
    box-shadow: 0 0 10px rgb(197, 197, 197);
    overflow: hidden;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
.icon-register {
  width: 36px;
  height: 32px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.login-form {
  padding: 0px 20px;
  margin-top: 70px;
  box-sizing: border-box;
}
.login-button {
  margin-top: 15px;
}
.btn {
  font-size: 16px;
  padding: 15px 80px;
  box-sizing: border-box;
}
#video {
  width: 100%;
  height: 100%;
  position: fixed;
  transform: scaleX(1.4);
  z-index: -100;
}
@media (max-width: 1250px) {
  .login-main {
    display: none;
  }
  #video {
    width: 100%;
    height: 100%;
    transform: scale(1.5);
    z-index: -100;
  }
}
@media (max-width: 846px) {
  .login-main {
    display: none;
  }
  #video {
    width: 100%;
    height: 100%;
    transform: scale(3);
    z-index: -100;
  }
}
@media (max-width: 378px) {
  .login-main {
    display: none;
  }
  #video {
    width: 100%;
    height: 100%;
    transform: scale(5);
    z-index: -100;
  }
}
@media (max-height: 600px) {
  #video {
    width: 100%;
    height: 100%;
    transform: scale(2);
    z-index: -100;
  }
}
@media (max-height: 400px) {
  #video {
    width: 100%;
    height: 100%;
    transform: scale(5);
    z-index: -100;
  }
}
@media (max-height: 200px) {
  .login-main {
    display: none;
  }
  #video {
    width: 100%;
    height: 100%;
    transform: scale(8);
    z-index: -100;
  }
}
.login-info {
  padding: 0 35px;
  box-sizing: border-box;
}

.captcha-icon {
  width: 100px;
  height: 40px;
}
</style>