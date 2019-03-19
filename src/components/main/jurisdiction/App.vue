<!--权限管理-->
<template>
  <div class="main-vue">
    <!--菜单-->
    <div class="main-menu" >
      <div class="menu-wrap">
        <Menus :spas='spas' @changeContent='changeContent'></Menus>
      </div>
    </div>
    <!--SPA-->
    <div class="main-content">
      <component :is='currentView'></component>
    </div>
    <div class="win-all"  v-if="switchPop" @click='closePop()'>
      <add-user></add-user>
    </div>
  </div>
</template>
<script>
import Menus from '../menu/menu'
import Juris from './juris/juris.vue'
import Scheme from './schemes/schemes.vue'
import User from './usermanger/User.vue'
import addUser from './usermanger/addUser.vue'
export default {
  props: ['int'],
  data() {
    return {
      h: 0,
      switchFlag: true,
      switchPop: false,
      str: [],
      currentView: 'Juris',
      spas: [
        {
          name: '权限列表',
          switchFlag: 1
        },
        {
          name: '角色列表',
          switchFlag: 1
        },
        {
          name: '菜单方案',
          switchFlag: 1
        }
      ]
    }
  },
  mounted() {
    this.loadMenu()
    //    this.initWinHeight()
  },
  methods: {
    /**
     * @desc 初始化窗口&监听窗口变化
     */
    initWinHeight() {
      let self = this
      self.h =
        (window.innerHeight || document.documentElement.clientHeight) - 60
      EventBridge.$on(EventBridge.WINDOW_CHANGE_EVENT, function(winHeight) {
        self.h = winHeight - 60
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
        this.currentView = 'Juris'
      } else if (str === 1) {
        this.currentView = 'User'
      } else {
        this.currentView = 'Scheme'
      }
    },
    loadMenu() {
      this.$http.get('api/menu/sheme/ref/son?schemeId=' + sessionStorage.getItem('SCHEME_ID') + '&menuId=5')
        .then((res) => {
          this.spas = res.data.data
          for (let i = 0; i < this.spas.length; i++) {
            if (this.spas[i].FLAG === 1) {
              this.str.push(i)
            }
          }
          if (this.str[0] === 0) {
            this.currentView = 'Juris'
          }
          if (thit.str[0] === 1) {
            this.currentView = 'User'
          }
          if (thit.str[0] === 2) {
            this.currentView = 'Scheme'
          }
        }).catch(() => {
        })
    }
  },
  watch: {},
  components: {
    Menus,
    Juris,
    User,
    Scheme,
    addUser
  },
  beforeDestroy() { }
}
</script>

<style></style>
