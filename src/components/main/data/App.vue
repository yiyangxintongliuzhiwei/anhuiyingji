<!--重点区域保障-->
<!--数据管理-->
<template>
  <div class="main-vue">
    <!--菜单-->
    <div class="main-menu" :class="{'main-menu-off':!switchFlag}">
      <div class="menu-wrap">
        <Menus :spas='spas' @changeContent='changeContent'></Menus>
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
      <!-- <demo></demo> -->
      <component :is='currentView'>
        <!-- <component :is='currentViews' v-if="tianqishuju"></component>  -->
      </component>
    </div>
  </div>
</template>

<script>
import Menus from '../menu/menu'
import demo from './datamanger.vue'
import carry from './carry.vue'
import earthquake from './earthquake.vue'
import jiangshuiliang from './jiangshuiliang.vue'
import weather from './weather.vue'
import taifeng from './taifeng.vue'
import yujingxinxi from './yujingxinxi.vue'
import yuqingxinxi from './yuqingxinxi.vue'
export default {
  props: ['int'],
  data() {
    return {
      h: 0,
      switchFlag: true,
      currentView: 'demo',
      tianqishuju: false,
      currentViews: 'carry',
      str: [],
      str1: [],
      spas: [
        {
          name: '无线人员',
          switchFlag: 1
        },
        {
          name: '传输人员',
          switchFlag: 1
        },
        {
          name: '事后评估',
          switchFlag: 1
        },
        {
          name: '天气数据',
          switchFlag: 1,
          subset: [
            {
              name: '舆情信息',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '天气预报',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '降水量',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '预警信息',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '台风',
              iconClass: 'icon-unlink',
              toLink: ''
            },
            {
              name: '地震',
              iconClass: 'icon-unlink',
              toLink: ''
            }
          ]
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
    changeContent(str) {
      console.log(str)
      if (str === 0) {
        this.currentView = 'demo'
      } else if (str === 1) {
        this.currentView = 'carry'
      } else if (str === 2) {
        this.currentView = ''
      } else {
        if (str === '3_0') {
          this.currentView = 'yuqingxinxi'
        } else if (str === '3_1') {
          this.currentView = 'weather'
        } else if (str === '3_2') {
          this.currentView = 'jiangshuiliang'
        } else if (str === '3_3') {
          this.currentView = 'yujingxinxi'
        } else if (str === '3_4') {
          this.currentView = 'taifeng'
        } else {
          this.currentView = 'earthquake'
        }
      }
    },
    loadMenu() {
      this.$http.get('api/menu/sheme/ref/son?schemeId=' + sessionStorage.getItem('SCHEME_ID') + '&menuId=3')
        .then((res) => {
          this.spas = res.data.data
          console.log(this.spas)
          for (var i = 0; i < this.spas.length; i++) {
            if (this.spas[i].FLAG === 1 && (i !== 3)) {
              this.str.push(i)
              // console.log(this.str)
            }
            if (this.spas[i].FLAG === 1 && (i === 3)) {
              for (let j = 0; j < this.spas[3].DATA.length; j++) {
                if (this.spas[3].DATA[j].FLAG === 1) {
                  this.str1.push(3 + '_' + j)
                }
              }
            }
          }
          // console.log(this.str.concat(this.str1))
          if (this.str.concat(this.str1)[0] === 0) {
            this.currentView = 'demo'
          }
          if (this.str.concat(this.str1)[0] === 1) {
            this.currentView = 'carry'
          }
          if (this.str.concat(this.str1)[0] === 2) {
            this.currentView = ''
          }
          if (this.str.concat(this.str1)[0] === '3_0') {
            this.currentView = 'yuqingxinxi'
          }
          if (this.str.concat(this.str1)[0] === '3_1') {
            this.currentView = 'weather'
          }
          if (this.str.concat(this.str1)[0] === '3_2') {
            this.currentView = 'jiangshuiliang'
          }
          if (this.str.concat(this.str1)[0] === '3_3') {
            this.currentView = 'yujingxinxi'
          }
          if (this.str.concat(this.str1)[0] === '3_4') {
            this.currentView = 'taifeng'
          }
          if (this.str.concat(this.str1)[0] === '3_5') {
            this.currentView = 'earthquake'
          }
        }).catch(() => {
        })
    }
  },
  watch: {},
  components: {
    Menus,
    demo,
    carry,
    earthquake,
    jiangshuiliang,
    taifeng,
    weather,
    yujingxinxi,
    yuqingxinxi
  },
  beforeDestroy() { }
}
</script>

<style></style>
