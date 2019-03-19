<!--用户组管理-->
<template>
  <div class="user-team-warp">
    <div class='content'>
      <div class='left-content' ref="tableL">
        <div class="top-bar">
          <div>
            <!-- <div>姓名:</div> -->
            <input type="text" placeholder="模糊匹配" class="top-input" v-model="fuzzySearch">
            <div class="top-button check-button" @click="fuzzyQuery">查询</div>
          </div>
          <div>
            <div v-if='addPermision' class="top-button add-button" @click='addUserTeam'>添加</div>

            <!-- 添加用户组弹框开始 -->
            <div class="limit-edit-popup-boxd limit-edit-popup-box-add" v-show="addPop">
              <div class="limit-edit-popup-box-contentd">
                <div class="limit-edit-popupd">
                  <div class="limit-edit-popup-contentd">
                    <div class='closePopBtn' @click='addClosePop'>X</div>
                    <div class="titled">添加用户组信息</div>
                    <div class='li-itemd'>
                      <div>
                        用户组名称：
                        <el-input clearable v-model="addgroupName" size='mini' placeholder="请输入用户组名称"></el-input>
                      </div>
                      <div>
                        选择方案
                        <el-select v-model='menuValue' @change='selectChange()' clearable>
                          <el-option v-for="item in menuOptions" :key="item.schemeName" :value="item.schemeName">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class='btn-lid'>
                      <el-button class='btnd' @click='addConform'>确认</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 添加用户组完 -->

            <!-- 编辑用户组弹框开始 -->
            <div class="limit-edit-popup-boxd limit-edit-popup-box-add" v-show="editPop">
              <div class="limit-edit-popup-box-contentd">
                <div class="limit-edit-popupd">
                  <div class="limit-edit-popup-contentd">
                    <div class='closePopBtn' @click='editClosePop'>X</div>
                    <div class="titled">编辑用户组信息</div>
                    <div class='li-itemd'>
                      <div>
                        用户组名称：
                        <el-input clearable v-model="editgroupName" size='mini' placeholder="请输入用户组名称"></el-input>
                      </div>
                      <div>
                        选择方案
                        <el-select v-model='menuValue' @change='selectChanges()' clearable>
                          <el-option v-for="item in menuOptions" :key="item.schemeName" :value="item.schemeName">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class='btn-lid'>
                      <el-button class='btnd' @click='editConform'>确认</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 编辑用户组完 -->
          </div>
        </div>

        <div class="user-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>用户组id</th>
                <th>用户组名称</th>
                <th>菜单id</th>
                <th>菜单名称</th>
                <th v-if='addPermision'></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in (userTeamData.slice((currentPage-1)*pagesize,currentPage*pagesize))">
                <td>
                  <div v-if='CHECKEDArr[index]' :class="{selected_btn:CHECKEDArr[index].flag}" @click="changeChecked(index)"></div>
                </td>
                <td>{{item.groupId}}</td>
                <td>{{item.groupName}}</td>
                <td>{{item.menuSchemeEntity[0].schemeId}}</td>
                <td>{{item.menuSchemeEntity[0].schemeName}}</td>
                <!-- <td>{{item.CREATE_TIME}}</td> -->
                <td v-if='editPermision || delPermision'>
                  <div v-if='editPermision' @click='editUserTeam(index)'></div>
                  <div v-if='delPermision' @click='delUserTeam()'></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-pagination">
          <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 15, 20, 30, 50]" :total="userTeamData.length" :current-page="currentPage" :page-size="pagesize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
      <div class='arrow' :style="{height:arrowH+'px'}">
        <img src='../../../../../common/images/Shape(1).png'>
        <!-- <img src='../../../../../common/images/Shape.png'> -->
      </div>
      <div class='right-content' ref="tableR">
        <div class="top-bar">
          <div>
            <!-- <div>姓名:</div> -->
            <input type="text" placeholder="模糊匹配" class="top-input" v-model="fuzzySearchs">
            <div class="top-button check-button" @click="fuzzyQuerys">查询</div>
          </div>
          <div>
            <div v-if='editPermision' class="top-button add-button" @click='addUserTeamUser()'>编辑</div>
            <!-- <div class="top-button del-button" @click='delUserTeam'>删除</div> -->
          </div>
        </div>
        <div class="user-table">
          <table>
            <thead>
              <tr>
                <th>用户id</th>
                <th>用户名称</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in (userTeamUserData.slice((currentPages-1)*pagesizes,currentPages*pagesizes))">
                <!-- <td><div v-if='CHECKEDArr1[index]' :class="{selected_btn:CHECKEDArr1[index].flag}" @click="changeCheckedUser(index)"></div></td> -->
                <td>{{item.userId}}</td>
                <td>{{item.loginName}}</td>
                <!-- <td><div @click='delUserTeams()'></div></td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-pagination">
          <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 15, 20, 30, 50]" :total="userTeamUserData.length" :current-page="currentPages" :page-size="pagesizes" @size-change="handleSizeChanges" @current-change="handleCurrentChanges">
          </el-pagination>
        </div>
      </div>
    </div>

    <div class="addUserTeamUser" v-show="editPops">
      <div class='closePopBtn' @click='closePop'>X</div>
    </div>

  </div>
</template>

<script>
import './userTeamManagement.less'
// import addUserTeamUsers from './addUserTeamUser.vue'
export default {
  props: ['switchPop'],
  data() {
    return {
      arrowH: 150,
      pagesize: 10,
      currentPage: 1,
      pagesizes: 10,
      currentPages: 1,
      fuzzySearch: '',
      fuzzySearchs: '',
      addPop: false,
      menuValue: '',
      addPermision: false,
      delPermision: false,
      editPermision: false,
      menuOptions: [
        {
          'schemeId': 1,
          'schemeName"': '方案一'
        },
        {
          'schemeId': 2,
          'schemeName': '方案二'
        },
        {
          'schemeId': 3,
          'schemeName': '方案三'
        }
      ],
      sId: '',
      addgroupName: '',
      editgroupName: '',
      editPop: false,
      editPops: false,
      editID: '',
      eId: '',
      flag: false,
      showdatas: [],
      userTeamData: [
        { groupId: '', groupName: '', schemeId: '', menuSchemeEntity: [{ shemeId: 1, schemeName: '方案一' }] }
      ],
      userTeamUserData: [
        { userId: '', loginName: '' }
      ],
      groupId: '',
      CHECKEDArr: [{ flag: false }],
      CHECKEDArr1: [{ flag: false }],
      delList: [],
      delLists: [],
      userTeamUserIndex: 0
    }
  },
  watch: {
    switchPop(val) {
      if (val === '') {
        this.loadUserTeamUserData(this.groupId, this.userTeamUserIndex)
      }
    }
  },
  created() {
    this.loadData()
    // this.loadUserTeamUserData(this.showdatas[0].groupId)
    // console.log(this.showdatas)
  },
  mounted() {
    // this.$nextTick(() => {
    // this.flag = true
    // })
    // this.loadData()
    // console.log(this.userTeamData)
    this.confirmPermision()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      for (let item of this.CHECKEDArr) {
        item.flag = false
      }
      this.showdatas = this.userTeamData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
    },
    handleCurrentChanges(val) {
      this.currentPages = val
    },
    handleSizeChange(val) {
      // console.log(val)
      this.pagesize = val
    },
    handleSizeChanges(val) {
      // console.log(val)
      this.pagesizes = val
    },
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
    // 方案选择
    selectChange() {
      if (this.menuOptions && this.menuValue) {
        this.menuOptions.forEach(element => {
          if (element.schemeName === this.menuValue) {
            this.sId = element.schemeId
          }
        });
      }
    },
    selectChanges() {
      if (this.menuOptions && this.menuValue) {
        this.menuOptions.forEach(element => {
          if (element.schemeName === this.menuValue) {
            this.eId = element.schemeId
          }
        });
      }
    },
    // 左模糊匹配
    fuzzyQuery() {
      this.$http.get('api/user/group/like', {
        params: {
          groupName: this.fuzzySearch
        }
      }).then((res) => {
        this.userTeamData = res.data.data;
      });
      this.fuzzySearch = '';
    },
    // 右模糊匹配
    fuzzyQuerys() {
      this.$http.get('api/user/group/like/' + '{groupId}' + '/' + '{loginName}' + '?' + 'groupId' + '=' + this.groupId + '&' + 'loginName' + '=' + this.fuzzySearchs).then((res) => {
        this.userTeamUserData = res.data.data;
      });
      this.fuzzySearchs = '';
    },
    initArrowHeight() {
      this.$nextTick(() => {
        this.arrowH = this.$refs.tableL.offsetHeight < this.$refs.tableR.offsetHeight ? this.$refs.tableL.offsetHeight : this.$refs.tableR.offsetHeight
      })
    },
    loadData() {
      // this.CHECKEDArr = []
      // this.$http.indi.get('d0008', {}, (res) => {
      //   this.userTeamData = res.data.data
      //   this.userTeamData.forEach(element => {
      //     this.CHECKEDArr.push({ flag: false })
      //   });
      //   this.CHECKEDArr[0].flag = true
      //   // this.initArrowHeight()
      //   this.loadUserTeamUserData(this.userTeamData[0].GROUP_ID)
      // })
      this.CHECKEDArr = [];
      this.$http.get('api/user/group/').then(
        (res) => {
          // console.log(res)
          this.userTeamData = res.data.data
          this.showdatas = this.userTeamData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
          this.loadUserTeamUserData(this.showdatas[0].groupId)
          this.userTeamData.forEach(element => {
            this.CHECKEDArr.push({ flag: false })
          })
          this.CHECKEDArr[0].flag = true
          this.initArrowHeight()
          // this.loadUserTeamUserData(this.userTeamData[0].groupId)
        }
      )
      this.$http.get('api/user/group/menu').then(
        (res) => {
          this.menuOptions = res.data.data
        }
      )
    },
    loadUserTeamUserData(gId) {
      // console.log(gId)
      // this.$http.indi.get('d0010', {
      //   groupId: gId
      // }, (res) => {
      //   this.userTeamUserData = res.data.data
      //   this.groupId = gId
      //   this.userTeamUserIndex = index
      //   this.userTeamUserData.forEach(element => {
      //     this.CHECKEDArr1.push({ flag: false })
      //   });
      //   this.initArrowHeight()
      // })
      this.$http.get('api/user/group/' + '{groupId}' + '?' + 'groupId' + '=' + gId).then(
        (res) => {
          // console.log(res)
          this.userTeamUserData = res.data.data
          this.groupId = gId
        }
      )
    },
    changeChecked(index) {
      this.$nextTick(() => {
        for (let i = 0; i < this.userTeamData.length; i++) {
          this.CHECKEDArr[i].flag = false
        }
        if (!this.CHECKEDArr[index].flag) {
          this.CHECKEDArr[index].flag = !(this.CHECKEDArr[index].flag)
        }
        if (this.CHECKEDArr[index].flag) {
          // console.log(this.showdatas[index].groupId)
          this.groupId = this.showdatas[index].groupId
          this.loadUserTeamUserData(this.showdatas[index].groupId)
        }
      })
    },
    // changeCheckedUser(index) {
    //   this.$nextTick(() => {
    //     for (let i = 0; i < this.userTeamUserData.length; i++) {
    //       this.CHECKEDArr1[i].flag = false
    //     }
    //     if (!this.CHECKEDArr1[index].flag) {
    //       this.CHECKEDArr1[index].flag = !(this.CHECKEDArr1[index].flag)
    //     }
    //   })
    // },
    // 用户组左删除
    delUserTeam() {
      // console.log(this.userTeamData)
      this.delList = [];
      for (let i = 0; i < this.CHECKEDArr.length; i++) {
        if (this.CHECKEDArr[i].flag) {
          this.delList.push(this.showdatas[i].groupId)
        }
      }
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('api/user/group/groupbatch', {
          params: {
            groupIds: this.delList.join()
          }
        }).then(
          (res) => {
            if (res.data.msg === 'success') {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.loadData()
            }
          }
        ).catch(
          () => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          }
        )
      })
    },
    // 左用户组添加
    addUserTeam() {
      // this.$emit('POPUP', 'addUserTeam')
      this.addPop = true;
    },
    // 左用户组添加确认
    addConform() {
      var userGroupEntity = {
        groupName: this.addgroupName,
        schemeId: this.sId
      }
      this.$http.post('api/user/group/groupmsg', userGroupEntity).then(
        (res) => {
          console.log(res)
          if (res.data.msg === 'success') {
            alert('添加成功！！！');
            this.addClosePop();
            this.loadData();
          } else {
            alert('添加失败！！！')
          }
        }
      )
    },
    // 左用户组添加关闭
    addClosePop() {
      this.addPop = false;
      this.addgroupName = '';
    },
    // 左用户组编辑关闭
    editClosePop() {
      this.editPop = false
    },
    // 左用户组编辑
    editUserTeam(index) {
      // this.$emit('POPUP', 'editUserTeam')
      this.$nextTick(() => {
        this.editPop = true;
        this.editID = this.showdatas[index].groupId;
        this.editgroupName = this.showdatas[index].groupName
      })
    },
    // 左用户组编辑
    editConform() {
      var userGroupEntity = {
        groupId: this.editID,
        groupName: this.editgroupName,
        schemeId: this.eId
      }
      this.$http.put('api/user/group/', userGroupEntity).then(
        (res) => {
          if (res.data.msg === 'success') {
            alert('修改成功！！！');
            this.editClosePop();
            this.loadData();
          } else {
            alert('修改失败！！！')
          }
        }
      )
    },
    closePop() {
      this.editPops = false
    },
    // 右用户编辑
    addUserTeamUser() {
      this.$emit('POPUP', 'addUserTeamUser', this.userTeamUserData, this.groupId)
      // this.editPops = true
    }
    // editUserTeamUser() {
    //   this.$emit('POPUP', 'editUserTeamUser')
    // }
  },
  components: {
    // addUserTeamUsers
  },
  beforeDestroy() { }
}
</script>
<style lang="less">
.limit-edit-popup-boxd {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  .limit-edit-popup-box-contentd {
    width: 412px;
    height: 580px;
    // height: auto;
    position: absolute;
    left: 50%;
    top: 33%;
    margin-left: -206px;
    margin-top: -216px;
    background: rgba(104, 116, 131, 0.5);
    border: 1px solid #475465;
    border-radius: 10px;
    .limit-edit-popupd {
      width: 388px;
      height: 550px;
      // height: auto;
      border: 1px solid #475465;
      border-radius: 8px;
      position: absolute;
      left: 12px;
      top: 12px;
      // background: yellow;
      .limit-edit-popup-contentd {
        width: 388px;
        height: 550px;
        // height: auto;
        // border: 1px solid #475465;
        border-radius: 8px;
        position: absolute;
        left: 0px;
        top: 0px;
        background: #b1bfd1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .titled {
          width: 388px;
          height: 30px;
          font-weight: bold;
          letter-spacing: 2px;
          font-size: 22px;
          // background: yellow;
          padding-top: 10px;
          padding-left: 10px;
          box-sizing: border-box;
        }
        .li-itemd {
          width: 388px;
          height: 468px;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 4px;
          box-sizing: border-box;
          div {
            font-size: 16px;
            padding-top: 4px;
            box-sizing: border-box;
          }
        }
        .btn-lid {
          width: 388px;
          height: 53px;
          // background: cadetblue;
          padding-left: 50%;
          box-sizing: border-box;
          margin-left: -80px;
          .btnd {
            width: 72px;
            height: 40px;
            background: #29cc5f;
          }
        }
      }
    }
  }
}
</style>
