<!--新增用户-->
<template>
  <div class="userTeam-add">
    <div class='closePopBtn' @click='closePop'>X</div>
    <div class="content">
        <div>
          <div class="title">添加用户组</div>
          <div class="add-li">
            <div class='errorInfo'>{{errorInfo}}</div>
            <div class='li-item'>
              请输入组名称：
              <el-input @focus="clearError"  placeholder="请输入用户组名称" v-model="gname" clearable></el-input>
            </div>
            <div class='li-item'>
              选择菜单方案：
              <el-select  v-model='menuValue' @change='selectChange()' clearable>
                <el-option
                    v-for="item in menuOptions"
                    :key="item.SCHEME_NAME"
                    :value="item.SCHEME_NAME">
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
      gname: '',
      sId: '',
      errorInfo: '',
      menuValue: '',
      menuOptions: [
        {
          'SCHEME_ID': 1,
          'SCHEME_NAME': '方案一'
        },
        {
          'SCHEME_ID': 2,
          'SCHEME_NAME': '方案二'
        },
        {
          'SCHEME_ID': 3,
          'SCHEME_NAME': '方案三'
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
      if (this.menuOptions && this.menuValue) {
        this.menuOptions.forEach(element => {
          if (element.SCHEME_NAME === this.menuValue) {
            this.sId = element.SCHEME_ID
          }
        });
      }
    },
    addUser() {
      // if (!this.gname || !this.menuValue) {
      //   this.errorInfo = '有内容项为空'
      // } else {
      //   this.errorInfo = ''
      //   this.$http.indi.get('d0015', {
      //     gname: this.gname,
      //     sId: this.sId
      //   }, (res) => {
      //     this.closePop()
      //   })
      // }
      if (!this.gname || !this.menuValue) {
        this.errorInfo = '有内容项为空'
      } else {
        var userGroupEntity = {
          groupName: this.gname,
          schemeId: this.sId
        }
        this.errorInfo = ''
        this.$http.post('api/user/group/groupmsg', userGroupEntity).then(
          (res) => {
            if (res.data.msg === 'success') {
              this.closePop()
            }
          }
        )
      }
    },
    showWarn(msg) {
      this.errorInfo = msg
    },
    clearError() {
      this.errorInfo = ''
    }
  },
  watch: {}
}
</script>

<style lang="less" rel="stylesheet/less">
.userTeam-add {
  position: relative;
  // height: 38%;
  width: 30%;
  min-width: 280px;
  min-height: 300px;
  max-height: 390px;
  // background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  // background: url('')
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
