<template>
  <div>
    <div class="slogen">
      <h1 style="font-weight: normal">Pseudo 知乎</h1>
    </div>

    <el-card class="signup-content">
      <!-- <img src="../assets/logo.jpg" alt /> -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <!-- <el-menu-item index="1" @click="nowStatus = register">注册</el-menu-item>
        <el-menu-item index="2" @click="nowStatus = login">登录</el-menu-item>-->
        <el-menu-item index="1" @click="status_register">注册</el-menu-item>
        <el-menu-item index="2" @click="status_login">登录</el-menu-item>
      </el-menu>
      <br />

      <div class="register" v-show="nowStatus === 'register'">
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="0px">
          <el-form-item prop="username" class="no-label">
            <el-input placeholder="请输入用户名" v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="email" class="no-label">
            <el-input placeholder="请输入邮箱" v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="no-label">
            <el-input placeholder="请输入密码" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="passwordEnsure" class="no-label">
            <el-input placeholder="请再次输入密码" v-model="registerForm.passwordEnsure"></el-input>
          </el-form-item>
          <el-form-item prop="submit">
            <el-button class="submit-btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
        <div class="footer register-footer">
          <span>
            注册即代表同意
            <a href="#">《Fake协议》</a>
            <a href="#">《隐私保护指引》</a>
          </span>
          <a href="#">注册机构号</a>
        </div>
      </div>

      <div class="login" v-show="nowStatus === 'login'">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px">
          <el-form-item prop="username" class="no-label">
            <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="no-label">
            <el-input placeholder="请输入密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <div class="others">
            <span>手机验证码登录</span>
            <span>忘记密码？</span>
          </div>
          <el-form-item prop="submit">
            <el-button class="submit-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="footer login-footer">
          <span>
            <span href="#">二维码登录</span>
            <span class="footer-dot">・</span>
            <span href="#">海外手机登录</span>
            <span class="footer-dot">・</span>
            <span href="#">社交账号登录</span>
          </span>
        </div>
      </div>
      <!-- <div class="switcher">
        {{tips[nowStatus].base}}
        <span
          @click="nowStatus = nowStatus === 'register' ? 'login' : 'register'"
        >{{tips[nowStatus].link}}</span>
      </div>-->
    </el-card>
  </div>
</template>

<script>
//引入请求组件
//直接写axios暂替
// import request from '@/service';
import md5 from "md5";
// import qs from 'qs';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      // else if (!this.pwdReg.test(value)) {
      // callback(
      //   new Error("用户密码需由数字/大写字母/小写字母/标点符号组成，8位以上")
      // );
      // }
      else {
        if (this.registerForm.passwordEnsure !== "") {
          this.$refs.registerForm.validateField("passwordEnsure");
        }
        callback();
      }
    };

    //参考
    // let validatePass = (rule, value, callback) => {
    //   let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else if (regExp.test(value) === false) {
    //     callback(new Error("8-16字母和数字组成，不能是纯数字或纯英文"));
    //   } else {
    //     if (this.ruleForm.repass !== "") {
    //       this.$refs.ruleForm.validateField("repass");
    //     }
    //     callback();
    //   }
    // };

    const validatePassEnsure = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };

    // const nowStatus = "register";

    return {
      nowStatus: "login", //register or login
      tips: {
        register: {
          base: "已有账号？",
          link: "登录"
        },
        login: {
          base: "没有账号",
          link: "注册"
        }
      },

      registerForm: {
        username: "", //使用name会报：async-validator: ["username is required"]
        email: "",
        password: "",
        passwordEnsure: ""
      },

      registerRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        passwordEnsure: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: validatePassEnsure,
            trigger: "blur"
          }
        ]
      },

      loginForm: {
        username: "",
        password: ""
      },

      loginRules: {
        username: [
          { required: true, message: "请输入用户名或邮箱", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    //用户注册方法
    async register() {
      // 初始写法
      // await this.$http //request
      //   .post("/users/create", {
      //     name: this.registerForm.username,
      //     pwd: md5(this.registerForm.password),
      //     email: this.registerForm.email
      //   })

      // axios(config)写法
      console.log("Register start");
      console.log("Username: " + this.registerForm.username);
      await this.$http({
        method: "post",
        url: "/users/create",
        data: {
          name: this.registerForm.username,
          pwd: md5(this.registerForm.password),
          email: this.registerForm.email
        }

        //传递参数要将参数序列化
        // data: qs.stringify({
        //   name: this.registerForm.username,
        //   pwd: md5(this.registerForm.password),
        //   email: this.registerForm.email
        // }),
        //传送参数的形式从Request Payload改为form-data
        // headers:{'Content-Type':'application/x-www-form-urlencoded'}
        // headers:{'Content-Type':'application/json'}
      })
        .then(res => {
          // if (res.status === 201) {
          //   this.$Message.success("注册成功");
          //   // this.$router.push({ name: "home" });
          //   this.$router.push({ path: "/" });
          // } else {
          //   console.log(res.data);
          //   this.$Message.error(res.data.msg);
          // }

          //注册完自动登录
          if (res.status === 201) {
            this.$Message.success("注册成功");
          }
          this.loginForm.username = this.registerForm.username;
          this.loginForm.password = this.registerForm.password;
          this.login();
        })
        .catch(res => {
          console.log(res.data);
          this.$Message.error(res.data.msg);
        });
    },

    //用户登录方法
    async login() {
      await this.$http({
        method: "post",
        url: "/users/login",
        data: {
          name: this.loginForm.username,
          pwd: md5(this.loginForm.password)
        }
      }).then(res => {
        if (res.status === 200) {
          this.$Message.success("登录成功");
          // this.$router.push({ name: "home" });
          this.$router.push({ path: "/" });
        } else {
          console.log("登录失败");
          this.$Message.error(res.data.msg);
        }
      });
    },

    submitForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("Submit success");
          if (this.nowStatus === "register") {
            console.log("触发注册方法");
            this.register();
          } else {
            console.log("触发登陆方法");
            this.login();
          }
        } else {
          this.$Message.error("error submit!!!");
          return false;
        }
        return "";
      });
    },

    status_register() {
      this.nowStatus = "register";
      console.log("nowStatus -> " + this.nowStatus);
    },

    status_login() {
      this.nowStatus = "login";
      console.log("nowStatus -> " + this.nowStatus);
    }
  }
};
</script>

<style>
.slogen {
  text-align: center;
  margin-top: 200px;
  margin-bottom: 20px;
  color: #0084ff;
  text-shadow: 0 0 4px #fff;
}

.el-card.signup-content {
  width: 350px;
  text-align: center;
  margin: 0 auto;
  padding-top: 0;
  padding-bottom: 15px;
}

.signup-content .el-input__inner {
  width: 300px;
}

.others {
  padding: 0 25px;
  margin-bottom: 10px;
  overflow: hidden;
  font-size: 0.8em;
}

.others span:first-child {
  float: left;
}

.others span:last-child {
  float: right;
}

.submit-btn span {
  color: #fff;
}

.signup-content .el-button {
  width: 300px;
  /* margin-bottom: -20px; */
}

.login-footer,
.register-footer {
  font-size: 0.7em;
  margin: 0 auto;
  width: 300px;
}
</style>