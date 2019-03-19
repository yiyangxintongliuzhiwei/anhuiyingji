<template>
  <div class="menu-main">
    <div v-for="(item,index) in spas" class="subset" :style="{borderWidth:index==titleActionFlag?'2px':'0px'}">
      <div class="subset-title" :class="{forbiddenStyle:!item.FLAG}" @click="isTitleShowEvent(index,item)" :style="{background:index==titleActionFlag && !item.DATA?'#60748e':'',justifyContent:'space-between'}">
        <div class="subset-name" :style="{color:index==titleActionFlag && !item.DATA?'#fff':'#37475C'}">{{item.MEUN_NAME}}</div>
        <div :style="{background:index==titleActionFlag && item.DATA?'#5C7699':'',color:index==titleActionFlag && item.DATA?'#C9D7EA':'#5B7598',borderLeftWidth:!item.DATA?'0px':'1px'}" class="subset-switch iconfont" :class="{'icon-sanjiao1':(index==titleActionFlag && item.DATA),'icon-sanjiao3':(index!=titleActionFlag && item.DATA)}"></div>
      </div>
      <div class="subset-item" v-show="index == titleActionFlag">
        <div class="subset-warp" style="width: 100%" v-for="(subItem,subIndex) in item.DATA">
          <div class="subset-item-li">
            <div class="subset-item-title" @click="isSubTitleShowEvent(index,subIndex,subItem)" :class="{'subTitleAction': (subTitleActionIndex1==(index+'_'+subIndex)&&subItem.DATA.length==0),forbiddenStyle1:!subItem.FLAG}">
              <div class="iconfont" :class="subItem.DATA&&subItem.DATA.length!=0?subTitleActionIndex1.indexOf(index+'_'+subIndex) > -1?'icon-fanhui4':'icon-fanhui2':''"></div>
              <div class="subset-item-li-name">{{subItem.MEUN_NAME}}</div>
            </div>
            <div class="subset-item-sub" v-show="subTitleActionIndex1.indexOf(index+'_'+subIndex) > -1">
              <div class="subset-item-li-sub" v-for="(subSubItem,subSubIndex) in subItem.DATA" @click="isSubSubTitleShowEvent(index,subIndex,subSubIndex,subSubItem)" :class="{'subTitleAction': (subTitleActionIndex==(index+'_'+subIndex+'_'+subSubIndex)),forbiddenStyle1:!subSubItem.FLAG}">
                <div class="subset-item-li-name">&nbsp;&nbsp;&nbsp;&nbsp;{{subSubItem.MEUN_NAME}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './menus.less'
export default {
  props: ['spas'],
  data() {
    return {
      baseLink: '/data/data/', // 路由基路径*
      titleActionFlag: 0, // 一级菜单
      subTitleActionIndex: '0_0_0', // 菜单项选中
      subTitleActionIndex1: '0_0', // 菜单项选中
      login_user: '未登录',
      login_admin: null
    }
  },
  mounted() {
    // this.$router.push(this.baseLink + 'outStation') // 默认显示 基站退服
    this.getLoginUser()
  },
  methods: {
    /**
     * 获取当前登录用户
     */
    getLoginUser() { },
    /* 显示活动菜单项 */
    isTitleShowEvent: function(index, item) {
      if (!item.FLAG) {
        console.log('!!!')
        return
      }
      if (this.titleActionFlag === index) {
        if (!item.DATA && this.titleActionFlag === index) {
          return
        }
        this.titleActionFlag = -1
      } else {
        this.titleActionFlag = index
        if (item.hasOwnProperty('MENU_URL') && item.MENU_URL) {
          this.$emit('changeContent', item.MENU_URL)
        }
      }
    },
    /* 显示一级活动菜单子项 */
    isSubTitleShowEvent: function(index, subIndex, item) {
      if (!item.FLAG) {
        return
      }
      if (this.subTitleActionIndex1 === index + '_' + subIndex) {
        this.subTitleActionIndex1 = ''
        // return
      } else {
        this.subTitleActionIndex1 = index + '_' + subIndex
        if (item.hasOwnProperty('MENU_URL') && item.MENU_URL) {
          this.$emit('changeContent', item.MENU_URL)
        }
        //        this.subTitleActionIndex = index + '_' + subIndex + '_0';
      }
    },
    /* 显示二级活动菜单子项 */
    isSubSubTitleShowEvent: function(index, subIndex, subSubIndex, item) {
      if (!item.FLAG) {
        return
      }
      if (
        this.subTitleActionIndex ===
        index + '_' + subIndex + '_' + subSubIndex
      ) {
        return
      }
      this.subTitleActionIndex = index + '_' + subIndex + '_' + subSubIndex
      if (item.hasOwnProperty('MENU_URL') && item.MENU_URL) {
        this.$emit('changeContent', item.MENU_URL)
      }
    },
    /**
     * 过滤器
     */
    filterArr(arr) {
      if (arr) {
        return arr.filter(function(item) {
          return (
            (item.hasOwnProperty('SWITCHFLAG') && item.SWITCHFLAG) ||
            (item.hasOwnProperty('FLAG') && item.FLAG)
          )
        })
      } else {
        return []
      }
    }
  }
}
</script>
