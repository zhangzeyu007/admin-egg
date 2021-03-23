<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 12:14:06
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-23 16:35:28
-->
<template>
  <div id="register">
    <div class="register-main">
      <div class="avatar-box">
        <img src="../assets/logo.jpg" alt="" />
      </div>
      <div class="register-form">
        <el-form
          ref="registerRules"
          :model="form"
          :rules="registerRules"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="form.username"
              prefix-icon="el-icon-user-solid"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form.email"
              prefix-icon="el-icon-message"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱验证码" prop="emailCode">
            <el-input
              v-model="form.emailCode"
              prefix-icon="el-icon-s-promotion"
              style="width: 260px"
              clearable
            >
            </el-input>
            <div class="captcha">
              <el-button
                type="primary"
                @click="sendEmailCode"
                :disabled="send.timer > 0"
                style="width: 100px"
                >{{ sendText }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              prefix-icon="el-icon-unlock"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="role">
            <el-select
              v-model="form.role"
              placeholder="请选择"
              style="width: 370px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="register-button">
        <el-button
          type="primary"
          size="medium"
          class="btn"
          @click="registerClick"
          >注册</el-button
        >
      </div>
      <div class="back" @click="goBack">back</div>
    </div>
    <video
      id="video"
      src="../assets/video_back3.mp4"
      autoplay="autoplay"
      muted
      loop
    ></video>
  </div>
</template>

<script>
import { Message } from "element-ui";
import roles from "../config/roleconfig";
import Md5 from "md5";
export default {
  data() {
    return {
      send: {
        timer: 0,
      },
      form: {
        username: "",
        password: "",
        email: "951642243@qq.com",
        emailCode: "",
        role: "",
      },
      options: roles,
      registerRules: {
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
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "change",
          },
          {
            message: "邮箱格式不正确",
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          },
        ],
        emailCode: [
          {
            required: true,
            message: "请输入验证码",
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
        role: [
          {
            required: true,
            message: "请选择用户权限",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    sendText() {
      if (this.send.timer <= 0) {
        return "发送";
      }
      return `${this.send.timer}s后发送`;
    },
  },
  methods: {
    goBack() {
      this.$router.push("/login");
    },
    // 发送邮箱
    sendEmailCode() {
      this.send.timer = 10;
      this.$api.util.sendEmail({ email: this.form.email }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          Message({
            message: "邮箱发送成功请注意查收",
            type: "success",
          });
        } else {
          Message({
            message: "邮箱发送失败稍后再试",
            type: "warning",
          });
        }
      });
      this.timer = setInterval(() => {
        this.send.timer -= 1;
        if (this.send.timer === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    // 注册按钮
    registerClick() {
      this.$refs["registerRules"].validate((valid) => {
        if (valid) {
          let params = {
            username: this.form.username,
            password: Md5(this.form.password),
            email: this.form.email,
            emailCode: this.form.emailCode,
            role: this.form.role,
          };
          this.$api.user.registerUser(params).then((res) => {
            console.log(res);
            if (res.code === 200) {
              Message({
                type: "success",
                message: res.message,
              });
              let timer = setTimeout(() => {
                this.$router.push({ path: "/login" });
                clearTimeout(timer);
              }, 1000);
            } else {
              Message({
                type: "warning",
                message: res.message,
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style  lang="less" scoped>
#register {
  width: 100%;
  height: 100%;
  position: relative;
}
.register-main {
  width: 510px;
  height: 520px;
  background-color: #fff;
  opacity: 0.9;
  border-radius: 15px;
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
.register-form {
  padding: 10px 20px;
  margin-top: 80px;
  box-sizing: border-box;
}
.register-button {
  margin-top: 15px;
  text-align: center;
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
  .register-main {
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
  .register-main {
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
  .register-main {
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
.back {
  position: absolute;
  right: 50px;
  bottom: 50px;
  color: #409eff;
}
.captcha {
  display: inline;
  margin-left: 10px;
}
</style>