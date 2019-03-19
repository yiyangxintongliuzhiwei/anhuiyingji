/**
 * @author lsz
 * @desc 装载机
 */

/* 加载插件 */
import '../lib/jquery-vendor.js'
// import '../lib/leaflet/leaflet.js'
// import '../lib/leaflet/leaflet.markercluster.js'

/* 组件引入 */
import Vue from 'vue'
// import VueRouter from 'vue-router' // 路由
import axios from 'axios' //  Ajax
// import Raven from 'raven-js' // 日志采集
import App from './App' // main App
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { events } from './event.js'
Vue.use(ElementUI)
Vue.component('swiper', swiper)
Vue.component('swiper-slide', swiperSlide)
// import './components/common/lib/DateUtil.js'
/* 路由配置文件 */
/* 事件配置表 */
Vue.prototype.$http = axios
let app = {
  /**
   * 装载 Ajax
   */
  loadAjax() {
    /**
 *  设置是否注册更新回调函数,默认状态为false
 *  如果设置为true，在vue 实例销毁函数中需增加取消监听指标消息监听
 *  否则，因为对回调函数存在引用关系，可能无法销毁vue实例(暂未有确切证据)
 */
    // axios.indi.setOnUpdateStatus(false);
    // Vue.prototype.$http = axios;
  },
  /**
   * 装载路由
   */
  loadRouter() {
    Vue.use(VueRouter)
    return new VueRouter({
      history: true,
      saveScrollPosition: true,
      routes: util.routerParser(router.routerNav)
    })
  },
  /**
   * 中央事件总线
   */
  loadEvent() {
    window.EventBridge = new Vue({
      data() {
        return events || {}
      }
    })
  },
  /**
   * 日志采集
   */
  // loadRaven() {
  //   Raven.config('https://352b49d31a1947bf81e176dfceddcb17@sentry.io/111323', {
  //     logger: 'eds-pc',
  //     dataCallback(data) {
  //       return data;
  //     }
  //   }).addPlugin(RavenVue, Vue).install();
  //   window.Raven = Raven;
  // },
  /**
   * 初始化 vue
   */
  initVue() {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      template: '<App/>',
      // router: router,
      components: {
        App
      }
    });
    // 发布时放开 (取消所有日子警告)
    // Vue.config.silent = true
    Vue.config.devtools = true
  },
  /**
   * 注册全局自定义组件
   * */
  loadCustomComponent() {
    let baseUrl = './components/common/vue/'
    Vue.component('bo-select', require(`${baseUrl}Select.vue`))
    Vue.component('date-picker', require(`${baseUrl}Datepicker.vue`))
    Vue.component('data-table', require(`${baseUrl}DataTable.vue`))
    Vue.component('echarts', require(`${baseUrl}Echarts.vue`))
  },
  run() {
    this.loadAjax()
    this.loadEvent()
    // this.loadRaven()
    this.initVue()
    this.loadCustomComponent()
  }
}

app.run() // 入口
