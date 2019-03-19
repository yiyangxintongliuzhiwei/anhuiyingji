<!-- 角色列表 -->
<template>
  <div class="data-warp">
    <div class="top-bar">
      <!-- 模糊查询 -->
      <div>
        <div>角色名称:</div>
        <input type="text" placeholder="模糊匹配" class="top-input" v-model="fuzzySearch" @keydown.enter="fuzzyQuery">
        <div class="top-button check-button" @click="fuzzyQuery">查询</div>
      </div>
      <!-- <div class="bar1">
        <div class="data_btn"><a href="api/emergency/export?userTypeId=1001">数据导出</a></div>
        <div class="data_btn"><a href="api/emergency/template?userTypeId=1001">模板下载</a></div>       
        <input type="file" @change="getFile($event)"><button class="shangchuan" @click="submitfile($event)">上传</button>
      </div> -->
      <div>
        <div v-if='addPermision' class="top-button add-button" @click="addUser">添加</div>
        <div v-if='delPermision' class="top-button del-button" @click="delUser">删除</div>
      </div>
    </div>
    <!-- 添加用户弹框 -->
    <div class="limit-edit-popup-boxj limit-edit-popup-box-addj" v-show="addPop">
      <div class="limit-edit-popup-box-contentj">
        <div class="limit-edit-popupj">
          <div class="limit-edit-popup-contentj">
            <div class='closePopBtn' @click='addClosePop'>X</div>
            <div class="titlej">添加角色</div>
            <div class='li-itemj'>
              <!-- <div>
                   角色ID：<el-input clearable v-model="addrId" placeholder="请输入角色ID"></el-input>
              </div>
              
              <div>
                   角色名称：<el-input clearable v-model="addrName" placeholder="请输入角色姓名"></el-input>
              </div>      -->
              <!-- <div>
                <span>角色ID :</span>
                <input v-model="addrId" placeholder="请输入角色ID" class="shuru">
              </div> -->
              <div>
                <span>角色名称 :</span>
                <input v-model="addrName" placeholder="请输入角色名称">
              </div>
              <div>
                <span>选择权限 :</span>
                <el-checkbox-group v-model="pcheckList" style="margin-top:8px">
                  <el-checkbox label="查看"></el-checkbox>
                  <el-checkbox label="修改"></el-checkbox>
                  <el-checkbox label="增加"></el-checkbox>
                  <el-checkbox label="删除"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class='btn-lij'>
              <div class='btnj' @click='addConform'>确认</div>
            </div>
            <!-- type="primary"  -->
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑用户弹框 -->
    <div class="limit-edit-popup-boxj limit-edit-popup-box-addj" v-show="editPop">
      <div class="limit-edit-popup-box-contentj">
        <div class="limit-edit-popupj">
          <div class="limit-edit-popup-contentj">
            <div class='closePopBtn' @click='editClosePop'>X</div>
            <div class="titlej">编辑用户</div>
            <div class='li-itemj'>
              <!-- <div>
                   角色ID：<el-input clearable v-model="editrId" placeholder="请输入权限ID"></el-input>
              </div>
              <div>
                   角色名称：<el-input clearable v-model="editrName" placeholder="请输入权限姓名"></el-input>
              </div>      -->
              <div>
                <span>角色名称 :</span>
                <input v-model="editrName" placeholder="请输入角色名称" class="shuru">
              </div>
              <div>
                <span>选择权限 :</span>
                <el-checkbox-group v-model="pcheckList" style="margin-top:8px">
                  <el-checkbox label="查看"></el-checkbox>
                  <el-checkbox label="修改"></el-checkbox>
                  <el-checkbox label="增加"></el-checkbox>
                  <el-checkbox label="删除"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class='btn-lij'>
              <div class='btnj' @click='editConform'>确认</div>
            </div>
            <!-- type="primary"  -->
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-table">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>角色ID</th>
            <th>角色名称</th>
            <th>权限名称</th>
            <th v-if='editPermision'></th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="(item,index) in (userData.slice((currentPage-1)*pagesize,currentPage*pagesize))" :key="index">
            <td>
              <div v-if='CHECKEDArr[index]' :class="{selected_btn:CHECKEDArr[index].flag}" @click="changeChecked(index)"></div>
            </td>
            <td>{{item.rId}}</td>
            <td>{{item.rName}}</td>
            <!-- <td>{{item.rId}}</td> -->
            <td>{{item.pName}}</td>
            <td v-if='editPermision'>
              <div @click="changeEdit(index)"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-pagination">
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 15, 20, 30, 50]" :total="userData.length" :current-page="currentPage" :page-size="pagesize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import './user.less'
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      showdatas: [],
      userData: [
        { rId: '', rName: '' }
      ],
      pcheckList: ['查'],
      pIdList: [],
      fuzzySearch: '',
      CHECKEDArr: [{ flag: false }],
      gridColumns: [
        { field: 'userName', alias: '姓名' },
        { field: 'userId', alias: '英文名字' },
        { field: 'mobile', alias: '手机号' },
        { field: 'deptName', alias: '部门' },
        { field: 'email', alias: '邮箱' },
        { field: 'regionName', alias: '地区' }
      ],
      upath: '',
      addPop: false,
      editPop: false,
      addrName: '',
      addrId: '',
      editrId: '',
      editrName: '',
      addPermision: false,
      delPermision: false,
      editPermision: false,
      delList: []
    }
  },
  mounted() {
    this.loadData();
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
    handleCurrentChange(val) {
      this.currentPage = val
      for (let item of this.CHECKEDArr) {
        item.flag = false
      }
      this.showdatas = this.userData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
    },
    handleSizeChange(val) {
      // console.log(val)
      this.pagesize = val
    },
    loadData() {
      this.CHECKEDArr = [];
      this.$http.get('api/role').then(
        (res) => {
          // console.log(res)
          this.userData = res.data.data
          // console.log(this.userData);
          this.showdatas = this.userData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
          this.userData.forEach(element => {
            this.CHECKEDArr.push({ flag: false })
          })
        }
      )
    },
    // 每一页显示的算法
    // 模糊查询
    fuzzyQuery() {
      this.$http.get('api/role/liking',
        {
          params: {
            rName: this.fuzzySearch
          }
        }).then((res) => {
          // console.log(res)
          this.userData = res.data.data;
        });
      this.fuzzySearch = '';
    },
    // 添加用户
    addUser() {
      this.addPop = true;
    },
    // 关闭添加弹框
    addClosePop() {
      this.addPop = false;
      this.addrId = '';
      this.addrName = ''
    },
    // 关闭编辑弹框
    editClosePop() {
      this.editPop = false;
    },
    // 添加确认
    addConform() {
      this.pIdList = [];
      this.pcheckList.forEach((item) => {
        if (item === '查看') {
          this.pIdList.push(1)
        } else if (item === '修改') {
          this.pIdList.push(2)
        } else if (item === '增加') {
          this.pIdList.push(3)
        } else if (item === '删除') {
          this.pIdList.push(4)
        }
      })
      var userRoleEntity = {
        pId: this.pIdList,
        rName: this.addrName
      }
      this.$http.post('api/role', userRoleEntity).then(
        (res) => {
          if (res.data.msg === 'success') {
            alert('添加成功！！！');
            this.addClosePop();
            this.loadData();
          } else {
            alert('添加失败！！！')
          }
          // console.log(res)
        })
    },
    // 编辑确认
    editConform() {
      this.pIdList = [];
      this.pcheckList.forEach((item) => {
        if (item === '查看') {
          this.pIdList.push(1)
        } else if (item === '修改') {
          this.pIdList.push(2)
        } else if (item === '增加') {
          this.pIdList.push(3)
        } else if (item === '删除') {
          this.pIdList.push(4)
        }
      })
      var userRoleEntity = {
        rId: this.editrId,
        rName: this.editrName,
        pId: this.pIdList
      }
      this.$http.put('api/role', userRoleEntity).then(
        (res) => {
          if (res.data.msg === 'success') {
            this.editClosePop();
            alert('修改成功！！！');
            this.loadData();
          } else {
            alert('修改失败')
          }
          // console.log(res)
        }
      )
    },
    // 删除用户
    delUser() {
      this.delList = [];
      for (let i = 0; i < this.CHECKEDArr.length; i++) {
        if (this.CHECKEDArr[i].flag) {
          this.delList.push(this.showdatas[i].rId)
        }
      }
      console.log(this.delList)
      if (this.delList.length > 0) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('api/role/deleteBatch', {
            // ids: this.delList
            params: {
              rIds: this.delList.join()
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
              console.log(res)
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    // 多选开关
    changeChecked(index) {
      this.$nextTick(() => {
        // this.CHECKEDArr[index].flag = !this.CHECKEDArr[index].flag;
        this.CHECKEDArr[index].flag = !this.CHECKEDArr[index].flag
      })
    },
    changeEdit(index) {
      this.$nextTick(() => {
        this.editPop = true;
        this.editrId = this.showdatas[index].rId;
        console.log(this.editrId);
        this.editrName = this.showdatas[index].rName
      })
    }
  },
  watch: {},
  components: {},
  beforeDestroy() {
  }
}
</script>

<style></style>
