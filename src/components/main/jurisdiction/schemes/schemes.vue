<!--菜单方案-->
<template>
  <div class="scheme-warp">
    <div class="scheme-item">
      <div class="menu-li menu-1-li" v-for="(item,index) in menu1" @click="meun3(index)" :class="{'menu-li-ng': bgFlag1 === index}">{{item.schemeName}}</div>
    </div>

    <div class="scheme-item">
      <div class="menu-2-title">菜单全集</div>
      <el-tree :data="data" @node-click="handleNodeClick" style="background:#DEE5EE"></el-tree>
    </div>

    <div class="scheme-item">
      <div class="menu-3-title">当前菜单方案</div>
      <div>
        <div class="menu-li menu-2-li" v-for="items in menu3" @dblclick="delmenu(items)">
          <div>{{items.meunName}}</div>
          <div class="menu-li-icon iconfont"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './schemes.less';
export default {
  data() {
    return {
      menu1: [],
      menu2: [],
      menu3: [],
      bgFlag1: 0,
      schemeId: '',
      addPermision: false,
      delPermision: false,
      editPermision: false,
      data: [
        {
          menuId: 1,
          parentMId: 0,
          label: '重点区域保障',
          children: [{
            menuId: 6,
            parentMId: 1,
            label: '退服故障基站',
            children: [{
              menuId: 7,
              parentMId: 6,
              label: 'GSM基站退服',
              children: [{
                menuId: 9,
                parentMId: 7,
                label: '退服基站'
              },
              {
                menuId: 10,
                parentMId: 7,
                label: '停电基站'
              },
              {
                menuId: 8,
                parentMId: 7,
                label: '正常基站'
              }]
            },
            {
              menuId: 11,
              parentMId: 6,
              label: 'LTE基站退服',
              children: [{
                menuId: 13,
                parentMId: 11,
                label: '退服基站'
              },
              {
                menuId: 14,
                parentMId: 11,
                label: '停电基站'
              },
              {
                menuId: 12,
                parentMId: 11,
                label: '正常基站'
              }]
            }]
          },
          {
            menuId: 15,
            parentMId: 1,
            label: '应急信息呈现',
            children: [{
              menuId: 16,
              parentMId: 15,
              label: '应急资源',
              children: [{
                menuId: 19,
                parentMId: 16,
                label: '抢修车'
              },
              {
                menuId: 20,
                parentMId: 16,
                label: '卫星电话'
              },
              {
                menuId: 17,
                parentMId: 16,
                label: '应急车'
              },
              {
                menuId: 18,
                parentMId: 16,
                label: '油机'
              }]
            },
            {
              menuId: 21,
              parentMId: 15,
              label: '应急人员',
              children: [{
                menuId: 22,
                parentMId: 21,
                label: '无线人员'
              },
              {
                menuId: 23,
                parentMId: 21,
                label: '传输人员'
              }]
            }]
          },
          {
            menuId: 24,
            parentMId: 1,
            label: '天气概况',
            children: [{
              menuId: 25,
              parentMId: 24,
              label: '天气',
              children: [{
                menuId: 27,
                parentMId: 25,
                label: '天气'
              },
              {
                menuId: 26,
                parentMId: 25,
                label: '降雨量'
              }]
            },
            {
              menuId: 28,
              parentMId: 24,
              label: '台风路径'
            },
            {
              menuId: 29,
              parentMId: 24,
              label: '地震范围'
            }]
          }]
        },
        {
          menuId: 2,
          parentMId: 0,
          label: '事后评估'
        },
        {
          menuId: 3,
          parentMId: 0,
          label: '数据管理'
        },
        {
          menuId: 4,
          parentMId: 0,
          label: '用户管理',
          children: [{
            menuId: 59,
            parentMId: 4,
            label: '用户管理'
          },
          {
            menuId: 60,
            parentMId: 4,
            label: '用户分组管理'
          }]
        },
        {
          menuId: 5,
          parentMId: 0,
          label: '权限管理',
          children: [{
            menuId: 61,
            parentMId: 5,
            label: '权限列表'
          },
          {
            menuId: 62,
            parentMId: 5,
            label: '角色列表'
          }, {
            menuId: 62,
            parentMId: 5,
            label: '菜单方案'
          }]
        },
        {
          menuId: 64,
          parentMId: 0,
          label: '应急调度'
        }
      ]
    }
  },
  mounted() {
    // 菜单合集
    this.menuall();
    // 方案合集
    this.menu2all();
    // 默认当前菜单方案
    this.meun3(0)
    this.confirmPermision()
  },
  methods: {
    // 确认权限
    confirmPermision() {
      let per = sessionStorage.getItem('P_ID');
      if (per.includes('3')) {
        this.addPermision = true;
      }
      if (per.includes('4')) {
        this.delPermision = true;
      }
      if (per.includes('2')) {
        this.editPermision = true;
      }
    },
    // 添加菜单
    handleNodeClick(data) {
      if (this.addPermision || this.editPermision) {
        var menuSchemeRelEntity = {
          menuId: data.menuId,
          schemeId: this.schemeId
        }
        this.$http.post('api/menu/sheme/ref', menuSchemeRelEntity).then(
          (res) => {
            if (res.data.msg === 'success') {
              this.meun3(this.schemeId - 1)
            }
          }
        )
      } else {
        this.$message.error('无此操作权限')
      }
    },
    // 方案合集
    menu2all() {
      this.$http.get('api/user/group/menu').then(
        (res) => {
          this.menu1 = res.data.data
        }
      )
    },
    // 菜单合集
    menuall() {
      this.$http.get('api/menu/sheme/ref').then(
        (res) => {
          // console.log(res)
        }
      )
    },
    // 当前菜单方案
    meun3(index) {
      this.bgFlag1 = index
      this.$http.get('api/menu/sheme/ref/' + (index + 1)).then(
        (res) => {
          if (res.data.data.length === 0) {
            this.menu3 = []
            this.schemeId = index + 1
          } else {
            this.menu3 = res.data.data[0].menuDefEntityList
            this.schemeId = res.data.data[0].schemeId
          }
        }
      )
    },
    // 删除菜单合集
    delmenu(items) {
      if (this.delPermision) {
        this.$http.delete('api/menu/sheme/ref/' + this.schemeId + '/' + items.menuId).then(
          (res) => {
            if (res.data.msg === 'success') {
              this.meun3(this.schemeId - 1)
            }
          }
        )
      } else {
        this.$message.error('无此操作权限')
      }
      // console.log(items)
    }
  },
  watch: {}
};
</script>
<style lang="less">
.el-tree-node__content {
  height: 35px !important;
  border-bottom: 1px solid #c3cfdc !important;
  .el-tree-node__label {
    font-size: 15px !important;
    letter-spacing: 2px;
  }
}
.el-tree-node__content:hover {
  background: #babbbb !important;
}
</style>
