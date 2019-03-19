<template>
  <div class="login-wrapper">
    <div class="bg-img"></div>
    <div class="content-wrapper">
      <h3 class="title">应急调度系统</h3>
      <form>
        <input type="text" placeholder="请输入用户名" class="username" v-model="username" @focus="clearErr()">
        <input type="password" placeholder="请输入密码" class="password" v-model="password" @focus="clearErr()">
        <input type="button" value="登录" class="login-button" @click="loginEvent()" @keyup.enter="loginEvent()">
        <transition name="fade-slide">
          <div class="error-msg" v-if="errMsg">
            {{errMsg}}
          </div>
        </transition>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errMsg: '',
      userList: [],
      cities: {
        'haikou': '海口',
        'sanya': '三亚',
        'danzhou': '儋州',
        'wuzhishan': '五指山',
        'wenchang': '文昌',
        'qionghai': '琼海',
        'wanning': '万宁',
        'dongfang': '东方',
        'lingao': '临高',
        'changjiang': '昌江',
        'ledong': '乐东',
        'baoting': '保亭',
        'baisha': '白沙',
        'chengmai': '澄迈',
        'qiongzhong': '琼中',
        'lingshui': '陵水',
        'tunchang': '屯昌',
        'dingan': '定安',
        'sansha': '三沙'
      }
    }
  },
  mounted() {
    this.loadUserList()
  },
  methods: {
    loadUserList() { },
    loginEvent() {
      console.log(this.username)
      // alert(this.username)
      // this.$http.post('api/user/login?lname=' + this.username + '&psw=' + this.password).then((res) => {
      this.$http.post('api/user/login', {
        loginName: this.username,
        password: this.password
      }).then((res) => {
        if (res.data.msg === 'success') {
          this.errMsg = ''
          console.log(res.data.data[0])
          sessionStorage.setItem('SCHEME_ID', res.data.data[0].SCHEME_ID)
          sessionStorage.setItem('USER_ID', res.data.data[0].USER_ID)
          sessionStorage.setItem('PHONE', res.data.data[0].PHONE)
          sessionStorage.setItem('GROUP_NAME', res.data.data[0].GROUP_NAME)
          sessionStorage.setItem('LOGIN_NAME', res.data.data[0].LOGIN_NAME)
          sessionStorage.setItem('R_ID', res.data.data[0].R_ID)
          sessionStorage.setItem('newLname', res.data.data[0].newLname)
          this.checkUser(this.username)
          this.$http.get('api/mix/d0061?rId=' + sessionStorage.getItem('R_ID')).then((res) => {
            if (res.data.data.length !== 0) {
              sessionStorage.setItem('P_ID', res.data.data[0].P_ID)
            }
          })
        } else {
          this.errMsg = '用户名或密码错误'
        }
      })
    },
    checkUser(username) {
      // username = this.username
      // password = this.password
      sessionStorage.setItem('_USER', username)
      // sessionStorage.setItem('_REGION_NAME', '全省')
      // sessionStorage.setItem('_SUPER_ADMIN', 'admin')
      // this.errMsg = '用户名或密码不正确'
      // EventBridge.$emit(EventBridge.LOGIN_EVENT, { flag: 1 })
      this.$emit('login', true)
    },
    clearErr() {
      this.errMsg = ''
    }
  }
}
</script>
<style lang='less' rel="stylesheet/less">
.login-wrapper {
  width: 100%;
  height: 100%;
  .bg-img {
    width: 100%;
    height: 100%;
    background: url('../../assets/img/bg.png');
    background-size: cover;
  }
  .content-wrapper {
    position: absolute;
    width: 400px;
    height: 300px;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -200px;
    background-color: rgba(60, 60, 60, 0.1);
    border-radius: 4px;
    .title {
      color: #f4f4f4;
      font-size: 22px;
      font-weight: 500;
      text-align: center;
    }
    .error-msg {
      position: absolute;
      text-align: center;
      width: 100%;
      color: mistyrose;
      transition: all 0.3s;
      color: red;
    }
    .fade-slide-enter-active,
    .fade-slide-leave-active {
      transition: all 0.3s;
    }
    .fade-slide-enter,
    .fade-slide-leave-active {
      transform: rotateY(90deg);
      opacity: 0;
    }
    .username,
    .password {
      display: block;
      margin: 25px auto;
      width: 240px;
      height: 36px;
      outline: none;
      text-indent: 10px;
      border-radius: 4px;
      border: none;
      background-color: rgba(132, 210, 255, 0.8);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      color: #ffffff;
      font-size: 14px;
      letter-spacing: 1px;
      transition: all 0.3s;
    }
    ::-webkit-input-placeholder {
      color: #fff;
    }
    :-moz-placeholder {
      color: #fff;
    }
    ::-moz-placeholder {
      color: #fff;
    }
    :-ms-input-placeholder {
      color: #fff;
    }
    .username:focus,
    .password:focus,
    .username:hover,
    .password:hover {
      background-color: transparent;
      border-color: #96c4e9;
      box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.22),
        0 0 8px rgba(130, 190, 233, 0.6);
    }
    .login-button {
      letter-spacing: 10px;
      cursor: pointer;
      margin: 32px auto 20px;
      display: block;
      width: 240px;
      height: 36px;
      outline: none;
      border-radius: 4px;
      border: none;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.17);
      background-color: rgba(132, 210, 255, 0.9);
      color: #ffffff;
      transition: all 0.2s;
    }
    .login-button:hover {
      background-color: rgba(89, 228, 255, 0.1);
      border-color: #96c4e9;
      box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.24),
        0 0 4px rgba(130, 190, 233, 0.47);
    }
  }
}
</style>
