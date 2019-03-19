<!--用户管理-->
<template>
  <div class="main-vue">
    <!--菜单-->
    <div class="main-menu" :class="{pageBlur:switchPop}">
      <div class="menu-wrap">
        <Menus :spas='spas' @changeContent='changeContent'></Menus>
      </div>
    </div>
    <!--SPA-->
    <div class="main-content" :class="{pageBlur:switchPop}">
      <!-- <router-view name="content"></router-view> -->
      <component @POPUP='openPop' :is='currentView' :switchPop='switchPop'></component>
    </div>
    <!-- 弹窗 -->
      <div  class="win-all"   v-if='switchPop'>
         <add-user @POPDOWN='closePop' v-if='switchPop=="addUser"'></add-user>
         <edit-user @POPDOWN='closePop' v-if='switchPop=="editUser"'></edit-user>
         <add-user-team @POPDOWN='closePop' v-if='switchPop=="addUserTeam"'></add-user-team>
         <edit-user-team @POPDOWN='closePop' v-if='switchPop=="editUserTeam"'></edit-user-team>
         <add-user-team-user 
                             :userTeamUserData='userTeamUserData'
                             :groupId='groupId' 
                             @POPDOWN='closePop' 
                             v-if='switchPop=="addUserTeamUser"'>
                             </add-user-team-user>
      </div>
  </div>
</template>

<script>
import Menus from '../../menu/menu'
import usersManagement from './content/userManagement/usersManagement'
import userTeamManagement from './content/userTeamManagement/userTeamManagement'
import addUser from './content/userManagement/addUser'
import editUser from './content/userManagement/editUser'
import addUserTeam from './content/userTeamManagement/addUserTeam.vue'
import editUserTeam from './content/userTeamManagement/editUserTeam'
import addUserTeamUser from './content/userTeamManagement/addUserTeamUser'
export default {
  data() {
    return {
      props: ['ins', 'int'],
      h: 0,
      groupId: '',
      str: [],
      userTeamUserData: [],
      switchFlag: true,
      switchPop: '',
      currentView: 'usersManagement',
      spas: [
        {
          name: '用户管理',
          switchFlag: 1
        },
        {
          name: '用户分组管理',
          switchFlag: 1
        }
        // {
        //   name: '菜单方案',
        //   switchFlag: 1,
        //   subset: [
        //     {
        //       name: '菜单方案',
        //       iconClass: 'icon-unlink',
        //       toLink: ''
        //     }
        //   ]
        // }
      ]
    }
  },
  mounted() {
    this.loadMenu()
    //    this.initWinHeight()
    // this.initPopupWin()
  },
  methods: {
    closePop() {
      this.switchPop = ''
    },
    openPop(param, param1, param2) {
      this.switchPop = param
      if (param1) {
        this.userTeamUserData = param1
      }
      if (param2) {
        this.groupId = param2
      }
    },
    initPopupWin() {
      let self = this
      /**
       * [弹出事件监听]
       * obj:{[规则]
       *   name:[名称],
       *   winStyle:[窗口类型 page|| content]
       *   vueURL:[vue地址]
       *   winPararm:[弹窗参数]
       * }
       */
      this.$on(EventBridge.POPUP_WIN_EVENT, function(obj) {
        // self.winStyle = obj.winStyle
        // self.winPararm = obj.winPararm || ''
        // let vueURL = obj.newPage ? obj.vueURL : './components/main' + obj.vueURL
        // let vueURL = './components/main' + obj
        // let vueObj = resolve => require([vueURL], resolve)
        // self.currentPop = vueObj
        self.switchPop = true
      })
      /**
       * [关闭窗口]
       */
      this.$on(EventBridge.POPDOWN_WIN_EVENT, function() {
        self.switchWin = false
      })
    },
    /**
     * @desc 初始化窗口&监听窗口变化
     */
    initWinHeight() {
      let self = this
      self.h =
        (window.innerHeight || document.documentElement.clientHeight) - 48
      EventBridge.$on(EventBridge.WINDOW_CHANGE_EVENT, function(winHeight) {
        self.h = winHeight - 48
      })
    },
    /**
     * @desc 菜单开关
     */
    switchMenu() {
      this.switchFlag = !this.switchFlag
      EventBridge.$emit(EventBridge.WINDOW_CHANGE_EVENT)
    },
    changeContent(str) {
      if (str === 0) {
        this.currentView = 'usersManagement'
      } else if (str === 1) {
        this.currentView = 'userTeamManagement'
      }
    },
    loadMenu() {
      this.$http.get('api/menu/sheme/ref/son?schemeId=' + sessionStorage.getItem('SCHEME_ID') + '&menuId=4')
        .then((res) => {
          this.spas = res.data.data
          for (let i = 0; i < this.spas.length; i++) {
            if (this.spas[i].FLAG === 1) {
              this.str.push(i)
            }
          }
          if (this.str[0] === 0) {
            this.currentView = 'usersManagement'
          }
          if (thit.str[0] === 1) {
            this.currentView = 'userTeamManagement'
          }
        }).catch(() => {
        })
    }
  },
  watch: {},
  components: {
    Menus,
    usersManagement,
    userTeamManagement,
    addUser,
    editUser,
    addUserTeamUser,
    addUserTeam,
    editUserTeam
  },
  beforeDestroy() { }
}
</script>

<style></style>
