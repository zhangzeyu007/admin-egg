<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 12:14:06
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-02 16:05:40
-->
<template>
  <div id="register">
    <div class="register-main">
      <div class="avatar-box">
        <img src="../assets/logo.jpg" alt="" />
      </div>
      <div class="register-form">
        <el-form ref="registerForm" :model="form" label-width="60px">
          <el-form-item label="用户名">
            <el-input
              v-model="form.userName"
              prefix-icon="el-icon-user-solid"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              prefix-icon="el-icon-unlock"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="form.permisstion" placeholder="请选择">
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
        <el-button type="primary" size="medium" class="btn" round
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
export default {
  data() {
    return {
      form: {
        userName: "",
        password: "",
        permisstion: "",
      },
      options: [
        { name: "员工", value: 1 },
        { name: "管理员", value: 0 },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/login");
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
.register-main {
  width: 450px;
  height: 400px;
  background-color: #fff;
  opacity: 0.9;
  border-radius: 35px;
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
</style>