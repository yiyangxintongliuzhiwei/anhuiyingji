<!--用户组修改用户-->
<template>
  <div class='addUserTeamUser'>
    <div class='closePopBtn' @click='closePop'>X</div>
    <div class='addUserTitle'>编辑用户组用户</div>
    <div class="top-bar">
      <div>
        <!-- <div>姓名:</div> -->
        <input type="text" placeholder="模糊匹配" class="top-input" v-model="fuzzySearch">
        <div class="top-button check-button" @click="fuzzyQuery">查询</div>
      </div>
      <div>
        <!-- <div class="top-button add-button" @click='addUserTeam'>添加</div> -->
        <!-- <div class="top-button del-button" @click='delUserTeam'>删除</div> -->
      </div>
    </div>
    <div class='content'>
      <div class='left-content' ref="tableL">
        <div class="user-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>用户名称列表</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in (userData.slice((currentPage-1)*pagesize,currentPage*pagesize))">
                <td>
                  <div v-if='CHECKEDArr[index]' :class="{selected_btn:CHECKEDArr[index].flag}" @click="changeChecked(index)"></div>
                </td>
                <!-- <td>{{item.USER_ID}}</td> -->
                <td>{{item.loginName}}</td>
                <!-- <td>{{item.CREATE_TIME}}</td> -->
                <!-- <td><div @click='editUserTeam'></div><div @click='delUserTeam(index)'></div></td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-pagination">
          <el-pagination background layout="prev, pager, next" :total="userData.length" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
      <div class='arrow' :style="{height:arrowH+'px'}">
        <img src='../../../../../common/images/Shape(1).png' @click='addUsersToTeam()'>
        <img src='../../../../../common/images/Shape.png' @click='removeUsersFromTeam()'>
      </div>
      <div class='right-content' ref="tableR">
        <div class="user-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>用户id</th>
                <th>用户名称</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in (userTeamUserData.slice((currentTeamUserPage-1)*pagesize,currentTeamUserPage*pagesize))">
                <td>
                  <div v-if='CHECKEDArr1[index]' :class="{selected_btn:CHECKEDArr1[index].flag}" @click='changeChecked1(index)'></div>
                </td>
                <td>{{item.userId}}</td>
                <td>{{item.loginName}}</td>
                <!-- <td>{{item.CREATE_TIME}}</td> -->
                <!-- <td><div @click='delUserTeam(index)'></div></td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-pagination">
          <el-pagination background layout="prev, pager, next" :total="userTeamUserData.length" :current-page="currentTeamUserPage" :page-size="pagesize" @current-change="handleCurrentChange1">
          </el-pagination>
        </div>
      </div>
      <div class='clear'></div>
    </div>
  </div>

</template>

<script>
import './addUserTeamUser.less'
export default {
  props: ['groupId'],
  data() {
    return {
      userTeamUserData: [],
      arrowH: 150,
      userData: [],
      // groupId: '',
      pagesize: 7,
      currentPage: 1,
      showdata: [],
      showdatas: [],
      chooseList: [],
      chooseList1: [],
      currentTeamUserPage: 1,
      flag: false,
      fuzzySearch: '',
      CHECKEDArr: [{ flag: false }],
      CHECKEDArr1: [{ flag: false }]
    }
  },
  created() {
    this.loadData()
    this.loadUserTeamUserData()
    // this.loadUserTeamUserData()
  },
  mounted() {

  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      for (let item of this.CHECKEDArr) {
        item.flag = false
      }
      this.showdata = this.userData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
    },
    handleCurrentChange1(val) {
      this.currentTeamUserPage = val
      for (let item of this.CHECKEDArr1) {
        item.flag = false
      }
      this.showdatas = this.userTeamUserData.slice((this.currentTeamUserPage - 1) * this.pagesize, this.currentTeamUserPage * this.pagesize);
    },
    loadData() {
      this.CHECKEDArr = []
      // this.$http.indi.get('d0002', {}, (res) => {
      //   this.userData = res.data.data
      //   this.userData.forEach(element => {
      //     this.CHECKEDArr.push({ flag: false })
      //   });
      //   this.initArrowHeight()
      // })
      this.$http.get('api/user').then(
        (res) => {
          this.userData = res.data.data
          this.showdata = this.userData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
          this.userData.forEach(element => {
            this.CHECKEDArr.push({ flag: false })
          });
          this.initArrowHeight()
        }
      )
    },
    initArrowHeight() {
      this.$nextTick(() => {
        this.arrowH = this.$refs.tableL.offsetHeight < this.$refs.tableR.offsetHeight ? this.$refs.tableL.offsetHeight : this.$refs.tableR.offsetHeight
      })
    },
    loadUserTeamUserData() {
      console.log(this.groupId)
      console.log(this.userTeamUserData)
      // this.$http.indi.get('d0010', {
      //   groupId: this.groupId
      // }, (res) => {
      //   this.userTeamUserData = res.data.data
      //   this.userTeamUserData.forEach(element => {
      //     this.CHECKEDArr1.push({ flag: false })
      //   });
      //   this.initArrowHeight()
      // })
      this.$http.get('api/user/group/' + '{groupId}' + '?' + 'groupId' + '=' + this.groupId).then(
        (res) => {
          this.userTeamUserData = res.data.data
          this.showdatas = this.userTeamUserData.slice((this.currentTeamUserPage - 1) * this.pagesize, this.currentTeamUserPage * this.pagesize);
          this.userTeamUserData.forEach(element => {
            this.CHECKEDArr1.push({ flag: false })
          });
          this.initArrowHeight()
        }
      )
    },
    changeChecked(index) {
      this.$nextTick(() => {
        this.chooseList = []
        this.CHECKEDArr[index].flag = !(this.CHECKEDArr[index].flag)
        if (this.CHECKEDArr[index].flag) {
          console.log(this.chooseList)
          // this.delList.push((this.userTeamData.slice(index, index + 1))[0].GROUP_ID)
          this.chooseList.push(this.showdata[index].userId)
        }
      })
    },
    changeChecked1(index) {
      this.$nextTick(() => {
        this.chooseList1 = []
        this.CHECKEDArr1[index].flag = !(this.CHECKEDArr1[index].flag)
        if (this.CHECKEDArr1[index].flag) {
          this.chooseList1.push(this.showdatas[index].userId)
        }
      })
    },
    addUsersToTeam() {
      // this.chooseList.forEach((item) => {
      //   this.$http.indi.get('d0012', {
      //     groupId: this.groupId,
      //     userId: item
      //   }, (res) => {
      //     this.loadUserTeamUserData()
      //   })
      // })
      var userGroupRelEntity = {
        groupId: this.groupId,
        userId: this.chooseList.join()
      }
      console.log(userGroupRelEntity)
      this.$http.post('api/user/group/', userGroupRelEntity).then(
        (res) => {
          console.log(res)
          if (res.data.msg === 'success') {
            this.loadUserTeamUserData()
          }
        }
      )
    },
    fuzzyQuery() {
      if (this.fuzzySearch === '') {
        this.loadData()
      }
      this.$http.get('api/user/like/' + this.fuzzySearch).then((res) => {
        // console.log(res)
        this.userData = res.data.data;
      });
      this.fuzzySearch = '';
    },
    removeUsersFromTeam() {
      // this.chooseList1.forEach((item) => {
      //   this.$http.indi.get('d0013', {
      //     groupId: this.groupId,
      //     userId: item
      //   }, (res) => {
      //     this.loadUserTeamUserData()
      //   })
      // })
      // console.log(this.groupId)
      // console.log(this.chooseList1)
      this.$http.delete('api/user/group/grouprel' + '?' + 'groupId' + '=' + this.groupId + '&' + 'userId' + '=' + this.chooseList1.join()).then(
        (res) => {
          // console.log(res)
          if (res.data.msg === 'success') {
            this.loadUserTeamUserData()
          }
        }
      )
    },
    closePop() {
      this.$emit('POPDOWN', '')
    }
  },
  watch: {},
  components: {},
  beforeDestroy() { }
}
</script>

<style></style>
