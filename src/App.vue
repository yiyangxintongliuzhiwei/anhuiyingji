<template>
  <div id="app" :style="{height:h+'px'}">
    <!-- 主页面 -->
    <div @login='checkLoginState' is="login" v-if="!isLogin"></div>
    <Navbar @loginOut='checkLoginState' @changeView='changeView' :titleActionIndex="titleActionIndex" v-if="isLogin"></Navbar>
    <div v-for='(item,index) in totalView' :id='item.id' :style="{display:item.flag?'block':'none'}" class="page" v-if="isLogin" :key="index">
      <keep-alive>
        <component :is='viewArr[item.int]' :ins='item.int' :int="totalView.length-1"></component>
      </keep-alive>
    </div>
    <div class="winList" v-if="isLogin">
      <div v-for="(item,index) in totalView" class="winLi" :key='index'>
        <div class="winDiv" :class="{winActive:item.flag}" @click="showWin(index)">
          <div class="red_icon" v-if="item.flag" @click.stop="delWin(index)"></div>
          <div class="green_icon" v-else></div>
          {{item.name}}
        </div>
        <div class="margin_box"></div>
      </div>
    </div>
  </div>
</template>
<script>
import login from './components/login/Login.vue';
import Navbar from './components/navbar/Navbar.vue';
import security from './components/main/security/App.vue';
import datas from './components/main/data/App.vue';
import assessment from './components/main/assessment/assessment/App.vue';
import jurisdiction from './components/main/jurisdiction/App.vue';
import users from './components/main/users/users/App.vue';
import oldSystem from './components/main/oldSystem/App'
import './assets/iconfont/iconfont.css';
import './assets/less/index.less';
import './assets/less/app.less';
import '../lib/leaflet/leaflet.css';
import '../lib/leaflet/MarkerCluster.css';
import '../lib/leaflet/MarkerCluster.Default.css';
export default {
  name: 'app',
  data() {
    return {
      h: 0,
      int: 0,
      isLogin: false,
      titleActionIndex: null,
      winStyle: '',
      currentView: 'security',
      currentPop: '',
      viewArr: ['security', 'assessment', 'datas', 'users', 'jurisdiction', 'oldSystem'],
      totalView: [{ id: 'page_0', name: '重点区域保障', flag: true, int: 0 }],
      winPararm: '' // 弹窗传参
    };
  },
  created() {
    // this.$http.indi.setApiUrl('api/');
    this.initWinHeight();
    // this.initPopupWin();
    this.checkLoginState();
    console.log(this.totalView);
  },
  methods: {
    /**
     * @desc 初始化窗口&监听窗口变化&派发窗口变化事件给子App.vue
     * 每个子APP.vue要监听事件(WINDOW_CHANGE_EVENT)做自适应
     */
    delWin(index) {
      if (this.totalView.length === 1) {
        return;
      }
      if (index === 0) {
        this.totalView[index + 1].flag = true;
        this.currentView = this.viewArr[this.totalView[index + 1].int];
        this.titleActionIndex = this.totalView[index + 1].int;
      } else {
        this.totalView[index - 1].flag = true;
        this.currentView = this.viewArr[this.totalView[index - 1].int];
        this.titleActionIndex = this.totalView[index - 1].int;
      }
      this.totalView.splice(index, 1);
    },
    showWin(index) {
      if (this.totalView[index] && this.totalView[index].flag) {
        return;
      }
      for (let e of this.totalView) {
        e.flag = false;
      }
      this.totalView[index].flag = true;
      this.titleActionIndex = this.totalView[index].int;
      this.currentView = this.viewArr[this.totalView[index].int];
    },
    initWinHeight() {
      let self = this;
      window.onload = window.onresize = function() {
        self.h = window.innerHeight || document.documentElement.clientHeight;
        if (self.h < 600) {
          self.h = 600;
        }
        EventBridge.$emit(EventBridge.WINDOW_CHANGE_EVENT, self.h);
      };
    },
    changeView(index, name) {
      this.currentView = this.viewArr[index];
      let len = this.totalView.length;
      // let name = '';
      // switch (index) {
      //   case 0:
      //     name = '重点区域保障';
      //     break;
      //   case 1:
      //     name = '事后评估';
      //     break;
      //   case 2:
      //     name = '数据管理';
      //     break;
      //   case 3:
      //     name = '用户管理';
      //     break;
      //   case 4:
      //     name = '权限管理';
      //     break;
      //   case 5:
      //     name = '旧版';
      //     break
      // }
      for (let e of this.totalView) {
        if (e.flag) {
          e.flag = false;
        }
      }
      this.totalView.push({
        id: 'page_' + len,
        name: name,
        flag: true,
        int: index
      });
      // console.log(this.totalView)
    },
    /**
     * @desc
     * 1.全局弹窗容器
     * 2.弹窗为事件(POPUP_WIN_EVENT)单通道
     * 3.弹窗分全屏弹窗(page)和主内容区弹窗(content),以 "winStyle" 字段区分
     */
    initPopupWin() {
      let self = this;
      /**
       * [弹出事件监听]
       * obj:{[规则]
     *   name:[名称],
     *   winStyle:[窗口类型 page|| content]
     *   vueURL:[vue地址]
     *   winPararm:[弹窗参数]
     * }
       */
      EventBridge.$on(EventBridge.POPUP_WIN_EVENT, function(obj) {
        // self.winStyle = obj.winStyle
        // self.winPararm = obj.winPararm || ''
        // let vueURL = obj.newPage ? obj.vueURL : './components/main' + obj.vueURL
        let vueURL = './components/main' + obj;
        let vueObj = resolve => require([vueURL], resolve);
        self.currentPop = vueObj;
        self.switchPop = true;
      });
      /**
       * [关闭窗口]
       */
      EventBridge.$on(EventBridge.POPDOWN_WIN_EVENT, function() {
        self.switchWin = false;
      });
    },
    checkLoginState(state) {
      // console.log(sessionStorage.getItem(''))
      if (sessionStorage.getItem('_USER') !== null) {
        this.isLogin = true;
        return
      }
      // EventBridge.$on(EventBridge.LOGIN_EVENT, state => {
      //   console.log('LOGIN_EVENT');
      //   console.log(state)
      //   if (state) {
      //     this.isLogin = true;
      //     // this.$router.push('/security/security/demo');
      //   } else if (!state) {
      //     this.isLogin = false;
      //   }
      // });
      if (state) {
        this.isLogin = true;
        // window.location.reload();
        // this.$router.push('/security/security/demo');
      } else if (!state) {
        this.isLogin = false;
        this.totalView = [{ id: 'page_0', name: '重点区域保障', flag: true, int: 0 }]
      }
    }
  },
  watch: {
    /**
     * 监听路由变化时，派发关闭弹窗事件
     */
    $route: function() {
      EventBridge.$emit(EventBridge.POPDOWN_WIN_EVENT);
    }
  },
  components: {
    Navbar,
    login,
    security,
    datas,
    users,
    jurisdiction,
    assessment,
    oldSystem
  }
};
</script>
