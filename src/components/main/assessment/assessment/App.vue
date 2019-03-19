<!--事后评估-->
<template>
  <div class="main-vue" :style="{height:h+'px'}">
    <!--菜单-->
    <div class="main-menu" :class="{'main-menu-off':!switchFlag}">
      <div class="menu-wrap">
        <Menus :spas='spas'></Menus>
        <div class="menu-switch" @click="switchMenu()"  style="display: none">
          <div class="menu-switch-after">
            <div class="iconfont" :class="{'icon-qiehuanqizuo':switchFlag,'icon-qiehuanqiyou':!switchFlag}">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--SPA-->
    <div class="main-content" :class="{'main-content-open':!switchFlag}">
      <!-- <router-view name="content"></router-view> -->
      <div is="TableContent"></div>
    </div>
  </div>
</template>

<script>
import Menus from '../../menu/menu'
import TableContent from './content/tableWarp/TableWarp.vue'
export default {
  data() {
    return {
      h: 0,
      switchFlag: true,
      spas: [
        {
          name: '应急预案',
          switchFlag: 1,
          subset: [
            {
              name: '季度',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '年度',
              iconClass: 'icon-unlink',
              toLink: ''
            }
          ]
        },
        {
          name: '应急演练',
          switchFlag: 1,
          subset: [
            {
              name: '季度',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '年度',
              iconClass: 'icon-unlink',
              toLink: ''
            }
          ]
        },
        {
          name: '物质管理',
          switchFlag: 1,
          subset: [
            {
              name: '季度',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '年度',
              iconClass: 'icon-unlink',
              toLink: ''
            }
          ]
        },
        {
          name: '人员能力',
          switchFlag: 1,
          subset: [
            {
              name: '季度',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '年度',
              iconClass: 'icon-unlink',
              toLink: ''
            }
          ]
        },
        {
          name: '平台能力',
          switchFlag: 1,
          subset: [
            {
              name: '季度',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '年度',
              iconClass: 'icon-unlink',
              toLink: ''
            }
          ]
        },
        {
          name: '应急保障',
          switchFlag: 1,
          subset: [
            {
              name: '季度',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '年度',
              iconClass: 'icon-unlink',
              toLink: ''
            }
          ]
        },
        {
          name: '加分项',
          switchFlag: 1,
          subset: [
            {
              name: '季度',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '年度',
              iconClass: 'icon-unlink',
              toLink: ''
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.initWinHeight()
    this.loadMenu()
  },
  methods: {
    /**
     * @desc 初始化窗口&监听窗口变化
     */
    initWinHeight() {
      let self = this
      self.h =
        (window.innerHeight || document.documentElement.clientHeight) - 68
      EventBridge.$on(EventBridge.WINDOW_CHANGE_EVENT, function(winHeight) {
        self.h = winHeight - 68
      })
    },
    /**
     * @desc 菜单开关
     */
    switchMenu() {
      this.switchFlag = !this.switchFlag
      EventBridge.$emit(EventBridge.WINDOW_CHANGE_EVENT)
    },
    loadMenu() {
      this.$http.get('api/menu/sheme/ref/son?schemeId=' + sessionStorage.getItem('SCHEME_ID') + '&menuId=2')
        .then((res) => {
          this.spas = res.data.data
        }).catch(() => {
        })
    }
  },
  watch: {},
  components: {
    Menus,
    TableContent
  },
  beforeDestroy() { }
}
</script>

<style></style>
