<!--菜单管理-->
<template>
  <div class="data-warp">
    <div class="top-bar">
      <div>
        <input type="text" placeholder="模糊匹配" class="top-input">
        <div class="top-button check-button">查询</div>
      </div>
      <div>
        <div class="top-button add-button">添加</div>
        <div class="top-button del-button">删除</div>
      </div>
    </div>
    <div class="bottom-table">
      <table>
        <thead>
        <tr>
          <th></th><th>用户管理项</th><th>用户管理项</th><th>用户管理项</th><th>用户管理项</th><th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in userData">
          <td><input type="checkbox" v-model="item.CHECKED"></td>
          <td>{{item.USER_NAME}}</td>
          <td>{{item.USER_PASS}}</td>
          <td>{{item.USER_LEVEL}}</td>
          <td>{{item.USER_NAME}}</td>
          <td><div class="iconfont icon-xiugaioryijian"></div></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="table-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="120"
        :current-page="1"
        :page-size="12"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import './menuManagement.less'
export default {
  data() {
    return {
      userData: [
        {
          CHECKED: 0,
          USER_NAME: 'BOCO-AnHui',
          USER_PASS: '********',
          USER_LEVEL: 'admin'
        },
        {
          CHECKED: 1,
          USER_NAME: 'BOCO-AnHui',
          USER_PASS: '********',
          USER_LEVEL: 'admin'
        },
        {
          CHECKED: 0,
          USER_NAME: 'BOCO-AnHui',
          USER_PASS: '********',
          USER_LEVEL: 'admin'
        },
        {
          CHECKED: 0,
          USER_NAME: 'BOCO-AnHui',
          USER_PASS: '********',
          USER_LEVEL: 'admin'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    handleCurrentChange(val) {}
  },
  watch: {},
  components: {},
  beforeDestroy() {}
}
</script>

<style></style>
