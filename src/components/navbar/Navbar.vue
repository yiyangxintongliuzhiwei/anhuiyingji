<template>
  <div class="nav-wrap">
    <div class="nav-row">
      <div class="nav-icon">
        <img src="../../../static/img/navbar/left_logo.png">
      </div>
      <div class="nav-bar">
        <div v-for="(item, index) in navData" ref="baritem" class="nav-bar-item" @click="navItemActionEvent(item,index)" @mouseenter="showNavItem(index)" @mouseleave="closeNavItem()">
          <div class="nav-bar-item-title">
            <span :class="{titleAction: (index==int),forbiddenBtn:!item.FLAG}">{{item.MEUN_NAME}}</span>
          </div>
          <!--子选项 sourceUrl可配置-->
          <!--<div class="nav-bar-con" v-show="index==navItemShowFlag && openItem==true">-->
          <!--<div v-for="(subItem ,subIndex) in item.sourceUrl"-->
          <!--@click="subTitleActionEvent(index,subIndex)"-->
          <!--class="nav-bar-con-name"-->
          <!--:class="{titleAction: (subTitleActionIndex==(index+'_'+subIndex))}">-->
          <!--&lt;!&ndash;路由跳转&ndash;&gt;-->
          <!--<router-link :to='subItem.link' v-if="!subItem.type">{{subItem.name}}</router-link>-->
          <!--&lt;!&ndash;连接跳转&ndash;&gt;-->
          <!--<a v-if="subItem.type==='href'" :href="subItem.link+login_user" target="_blank">{{subItem.name}}</a>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <div class="nav-login">
          <div class="login">
            <div class="usericon">
            </div>
            <div class="username">
              你好!<br/>
              <div style="padding-left:0">{{login_user}}</div>
            </div>
          </div>
          <div class="loginPop">
            <div @click="logoutEvent">退出用户</div>
            <div @click="logoutEvent">切换用户</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
require('./navbar.less')
export default {
  props: ['titleActionIndex'],
  data() {
    return {
      int: 0,
      switchPop: false,
      navData: [
        {
          name: '重点区域保障 ',
          link: '/security/security',
          sourceUrl: []
        },
        {
          name: '事后评估',
          link: '/assessment/assessment',
          sourceUrl: []
        },
        {
          name: '数据管理',
          link: '/data/data',
          sourceUrl: []
        },
        {
          name: '用户管理',
          link: '/users/users',
          sourceUrl: []
        },
        {
          name: '权限管理',
          link: '/jurisdiction/jurisdiction',
          sourceUrl: []
        }
      ],
      navItemShowFlag: 0,
      subTitleActionIndex: '0_0',
      openItem: false,
      login_user: '未登录',
      scheme_id: '',
      login_admin: null
    }
  },
  watch: {
    titleActionIndex(val) {
      this.int = val;
    }
  },
  computed: {},
  mounted() {
    this.getLoginUser()
    this.loadMenu()
    // this.updateNav()
  },
  methods: {
    /**
     * 获取当前登录用户
     */
    getLoginUser() {
      if (sessionStorage.getItem('_USER') !== null) {
        this.login_user = sessionStorage.getItem('_USER')
        this.scheme_id = sessionStorage.getItem('SCHEME_ID')
        // this.login_admin = sessionStorage.getItem('_SUPER_ADMIN')
      }
    },
    /** 加载菜单数据 */
    loadMenu() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        // fullscreen: true
        background: 'rgba(0, 0, 0, 0.5)'
      });
      this.$http.get('api/menu/sheme/ref/parent?parent=' + this.scheme_id)
        .then(res => {
          // console.log(res.data.data)
          if (res.data.data && res.data.data.length !== 0) {
            loading.close();
            this.navData = res.data.data
            // this.navData = [
            //   {
            //     MEUN_NAME: '重点区域保障 ',
            //     link: '/security/security',
            //     sourceUrl: []
            //   },
            //   {
            //     MEUN_NAME: '时候评估',
            //     link: '/security/security',
            //     sourceUrl: []
            //   },
            //   {
            //     MEUN_NAME: '数据管理',
            //     link: '/security/security',
            //     sourceUrl: []
            //   },
            //   {
            //     MEUN_NAME: '用户管理',
            //     link: '/security/security',
            //     sourceUrl: []
            //   },
            //   {
            //     MEUN_NAME: '权限管理',
            //     link: '/security/security',
            //     sourceUrl: []
            //   },
            //   {
            //     MEUN_NAME: '旧版',
            //     link: '/security/security',
            //     sourceUrl: []
            //   }
            // ]
          }
        })
    },
    /**
     * 用户退出
     */
    logoutEvent() {
      sessionStorage.removeItem('_USER')
      sessionStorage.removeItem('USER_ID')
      sessionStorage.removeItem('SCHEME_ID')
      sessionStorage.removeItem('PHONE')
      sessionStorage.removeItem('GROUP_NAME')
      sessionStorage.removeItem('LOGIN_NAME')
      // EventBridge.$emit(EventBridge.LOGIN_EVENT, { flag: 0 })
      this.$emit('loginOut', false)
    },
    navItemActionEvent: function(item, index) {
      //      if (this.int === index) {
      //        return
      //      }
      // if (item.MEUN_NAME === '旧版') {
      //   // window.location.href = 'http://www.baidu.com'
      //   window.open('http://10.243.65.238:8080/ahyj/')
      // }
      if (item.FLAG) {
        this.int = index;
        this.$emit('changeView', index, item.MEUN_NAME)
      }
    },
    /* 显示下拉框 */
    showNavItem: function(index) {
      this.openItem = true
      this.navItemShowFlag = index
    },
    /* 关闭下拉框 */
    closeNavItem: function() {
      this.openItem = false
    },
    /* 选中状态子标题样式 */
    subTitleActionEvent: function(index, subIndex) {
      this.subTitleActionIndex = index + '_' + subIndex
      // 点击后隐藏下拉菜单
      this.openItem = false
    },
    /* 动态生成场景菜单 */
    updateNav() {
      let url = window.location.href
      if (url.indexOf('security') >= 0) {
        this.int = 0
      } else if (url.indexOf('assessment') >= 0) {
        this.int = 1
      } else if (url.indexOf('data') >= 0) {
        this.int = 2
      } else if (url.indexOf('users') >= 0) {
        this.int = 3
      } else if (url.indexOf('jurisdiction') >= 0) {
        this.int = 4
      }
    }
  }
}
</script>
