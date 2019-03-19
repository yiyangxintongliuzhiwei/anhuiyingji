<!--编辑用户-->
<template>
  <div class="user-edit">
    <div class='closePopBtn' @click='closePop'>X</div>
    <div class="content">
        <div>
          <div class="title">编辑用户</div>
          <div class="add-li">
            <div class='errorInfo'>{{errorInfo}}</div>
            <div class='li-item'>
              用户名称：
              <el-input @focus="clearError"  placeholder="请输入用户名" v-model="lname" clearable></el-input>
            </div>
            <div class='li-item'>
              用户密码：
              <el-input @focus="clearError"  placeholder="请输入用户密码"  type='password' v-model="psw" clearable></el-input>
            </div>
            <div class='li-item'>
              密码确认：
              <el-input @focus="clearError"  placeholder="请输入用户密码" type='password' v-model="pswConfirm" clearable></el-input>
            </div>
            <div class='li-item'>
              手机号码：
              <el-input  @focus="clearError" placeholder="请输入手机号码" v-model="phone" clearable></el-input>
            </div>
            <div class='li-item'>
              所属部门：
              <el-input  @focus="clearError" placeholder="请输入手机号码" v-model="deptName" clearable></el-input>
            </div>
            <div class='li-item'>
              账户类型：
              <el-input  @focus="clearError" placeholder="请输入手机号码" v-model="userType" clearable></el-input>
            </div>
            <div class='li-item'>
              角色选择：
              <el-select  v-model='roleValue' @change='selectChange()' clearable>
                <el-option
                    v-for="item in roleOptions"
                    :key="item.R_NAME"
                    :value="item.R_NAME">
                  </el-option>
              </el-select>
            </div>
            <!-- <div class="button confirm-button">确认</div> -->
            <div class='btn-li'><el-button class='btn' type="primary" @click='addUser'>确认</el-button></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lname: '',
      psw: '',
      pswConfirm: '',
      phone: '',
      deptName: '',
      userType: '',
      roleValue: '',
      rId: '',
      errorInfo: '',
      roleOptions: [
        {
          'R_ID': 1001,
          'R_NAME': '系统管理员',
          'P_NAME': '删,增,改,查',
          'P_ID': '1,2,3,4'
        },
        {
          'R_ID': 1002,
          'R_NAME': '省指挥',
          'P_NAME': '删,增,改,查',
          'P_ID': '1,2,3,4'
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    closePop() {
      this.$emit('POPDOWN', '')
    },
    selectChange() {
      if (this.roleOptions && this.roleValue) {
        this.roleOptions.forEach(element => {
          if (element.R_NAME === this.roleValue) {
            this.rId = element.R_ID
          }
        });
      }
    },
    addUser() {
      if (!this.lname || !this.psw || !this.pswConfirm || !this.roleValue) {
        this.errorInfo = '有内容项为空'
      } else {
        if (this.CheckPassWord(this.pswConfirm)) {
          this.errorInfo = ''
          this.$http.indi.get('d0004', {
            lname: this.lname,
            psw: this.psw,
            phone: this.phone,
            rId: this.rId,
            deptName: this.deptName,
            userType: this.userType
          }, (res) => {
            alert('新增用户成功')
          })
        }
      }
    },
    showWarn(msg) {
      this.errorInfo = msg
    },
    clearError() {
      this.errorInfo = ''
    },
    CheckPassWord(password) {
      var str = password;
      if (str === null || str !== this.psw) {
        this.showWarn('两次密码不一致')
        return false;
      }
      if (str === null || str.length < 8) {
        this.showWarn('密码少于8位')
        return false;
      }
      var reg = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!@#$%^&*-_.])[a-zA-Z\d!@#$%^&*-_.]*$/)
      if (reg.test(str)) {
        return true;
      } else {
        this.showWarn('密码不少于8位,应包含数字,大小写字母及特殊字符')
        return false;
      }
    }

  },
  watch: {}
}
</script>

<style lang="less" rel="stylesheet/less">
.user-edit {
  position: relative;
  height: 52%;
  width: 30%;
  min-width: 280px;
  min-height: 430px;
  max-height: 490px;
  // background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    position: relative;
    border: 1px solid #475465;
    border-radius: 8px;
    background: rgba(104, 116, 131, 0.5);
    width: 100%;
    height: 100%;
    padding: 10px;
    > div {
      border-radius: 8px;
      width: 100%;
      height: 100%;
      border: 1px solid #2d363e;
      background: #b1bfd1;
      .title {
        color: #14263d;
        font-weight: bold;
        letter-spacing: 2px;
        width: 90%;
        margin: 5px auto;
        font-size: 22px;
      }
      .add-li {
        height: 70%;
        width: 90%;
        // background: #475465;
        margin: 10px auto;
        .errorInfo {
          padding-left: 84px;
          height: 20px;
          color: tomato;
        }
        .li-item {
          font-size: 16px;
          height: 40px;
          margin: 0 auto 20px auto;
          .el-input {
            display: inline-block;
            width: 75%;
          }
        }
      }
      .confirm-button {
        margin: 0 auto;
      }
    }
  }
  .btn-li {
  }
  .btn {
    border: 1px solid #202d3d;
    margin-left: calc(~'50% - 35px');
    // height: 32px;
    // line-height: 10px;
  }
  .button {
    border: 1px solid #202d3d;
    border-radius: 3px;
    width: 55px;
    color: #ffffff;
    height: 32px;
    line-height: 28px;
    text-align: center;
    font-size: 18px;
    background: #1ba4e7;
    cursor: pointer;
    letter-spacing: 2px;
    margin: 0px 5px;
    box-shadow: 0px 0.5px 0 #fff inset;
    //box-shadow: 0 1px 0 #9CA9B9;
  }
}
.blur {
  /*-webkit-filter: blur(2px);*/
  /*-moz-filter: blur(2px);*/
  /*-ms-filter: blur(2px);*/
  /*filter: blur(2px);*/
  position: relative;
}
</style>
