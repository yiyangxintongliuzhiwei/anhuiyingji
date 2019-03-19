<!-- 无线人员 -->
<template>
  <div class="data-warp">
    <div class="top-bar">
      <!-- 模糊查询 -->
      <div>
        <div>姓名:</div>
        <input type="text" placeholder="模糊匹配" class="top-input" v-model="fuzzySearch" @keydown.enter="fuzzyQuery">
        <div class="top-button check-button" @click="fuzzyQuery">查询</div>
      </div>
      <div class="bar1">
        <div class="data_btn">
          <a href="api/emergency/export?userTypeId=1001">数据导出</a>
        </div>
        <div class="data_btn">
          <a href="api/emergency/template?userTypeId=1001">模板下载</a>
        </div>
        <input type="file" @change="getFile($event)">
        <button class="shangchuan" @click="submitfile($event)">上传</button>
      </div>
      <div>
        <div v-if='addPermision' class="top-button add-button" @click="addUser">添加</div>
        <div v-if='delPermision' class="top-button del-button" @click="delUser">删除</div>
      </div>
    </div>
    <!-- 添加用户弹框 -->
    <div class="limit-edit-popup-boxd limit-edit-popup-box-add" v-show="addPop">
      <div class="limit-edit-popup-box-contentd">
        <div class="limit-edit-popupd">
          <div class="limit-edit-popup-contentd">
            <div class='closePopBtn' @click='addClosePop'>X</div>
            <div class="titled">添加用户</div>
            <div class='li-itemd'>
              <div>
                姓名：
                <el-input clearable v-model="addUSERNAME" placeholder="请输入用户姓名"></el-input>
              </div>
              <div>
                英文名：
                <el-input clearable v-model="addUSERID" placeholder="请输入名字拼音"></el-input>
              </div>
              <div>
                手机号：
                <el-input clearable v-model="addMOBILE" placeholder="请输入用户手机号"></el-input>
              </div>
              <div>
                邮箱：
                <el-input clearable v-model="addEMAIL" placeholder="请输入用户邮箱"></el-input>
              </div>
              <div>
                部门：
                <el-input clearable v-model="addDEPTNAME" placeholder="请输入用户部门"></el-input>
              </div>
              <div>
                地市：
                <el-input clearable v-model="addcityName" placeholder="请输入用户地市"></el-input>
              </div>
              <div>
                区县：
                <el-input clearable v-model="addcountyName" placeholder="请输入用户区县"></el-input>
              </div>
              <div>
                乡镇：
                <el-input clearable v-model="addtownName" placeholder="请输入用户乡镇"></el-input>
              </div>
              <!-- <div>
                   乡镇：<el-input clearable v-model="addtownName" size='mini' placeholder="请输入用户乡镇"></el-input>
              </div>
              <div>
                   乡镇：<el-input clearable v-model="addtownName" size='mini' placeholder="请输入用户乡镇"></el-input>
              </div>      -->
            </div>
            <div class='btn-lid'>
              <el-button class='btnd' @click='addConform'>确认</el-button>
            </div>
            <!-- type="primary"  -->
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑用户弹框 -->
    <div class="limit-edit-popup-boxd limit-edit-popup-box-add" v-show="editPop">
      <div class="limit-edit-popup-box-contentd">
        <div class="limit-edit-popupd">
          <div class="limit-edit-popup-contentd">
            <div class='closePopBtn' @click='editClosePop'>X</div>
            <div class="titled">编辑用户</div>
            <div class='li-itemd'>
              <div>
                姓名：
                <el-input clearable v-model="editUSERNAME" placeholder="请输入用户姓名"></el-input>
              </div>
              <div>
                英文名：
                <el-input clearable v-model="editUSERID" placeholder="请输入名字拼音"></el-input>
              </div>
              <div>
                手机号：
                <el-input clearable v-model="editMOBILE" placeholder="请输入用户手机号"></el-input>
              </div>
              <div>
                邮箱：
                <el-input clearable v-model="editEMAIL" placeholder="请输入用户邮箱"></el-input>
              </div>
              <div>
                部门：
                <el-input clearable v-model="editDEPTNAME" placeholder="请输入用户部门"></el-input>
              </div>
              <div>
                地市：
                <el-input clearable v-model="editcityName" placeholder="请输入用户地市"></el-input>
              </div>
              <div>
                区县：
                <el-input clearable v-model="editcountyName" placeholder="请输入用户区县"></el-input>
              </div>
              <div>
                乡镇：
                <el-input clearable v-model="edittownName" placeholder="请输入用户乡镇"></el-input>
              </div>
              <!-- <div>
                   乡镇：<el-input clearable v-model="addtownName" size='mini' placeholder="请输入用户乡镇"></el-input>
              </div>
              <div>
                   乡镇：<el-input clearable v-model="addtownName" size='mini' placeholder="请输入用户乡镇"></el-input>
              </div>     -->
            </div>
            <div class='btn-lid'>
              <el-button class='btnd' @click='editConform'>确认</el-button>
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
            <th>姓名</th>
            <th>英文名字</th>
            <th>手机号</th>
            <th>邮箱</th>
            <th>部门</th>
            <th>地市</th>
            <th>区县</th>
            <th>乡镇</th>
            <th v-if='editPermision'></th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="(item,index) in (userData.slice((currentPage-1)*pagesize,currentPage*pagesize))" :key="index">
            <td>
              <div v-if='CHECKEDArr[index]' :class="{selected_btn:CHECKEDArr[index].flag}" @click="changeChecked(index)"></div>
            </td>
            <td>{{item.userName}}</td>
            <td>{{item.userId}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.email}}</td>
            <td>{{item.deptName}}</td>
            <td>{{item.cityName}}</td>
            <td>{{item.countyName}}</td>
            <td>{{item.townName}}</td>
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
import './datamanger.less'
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      showdatas: [],
      userData: [
        { userName: '', userId: '', mobile: '', deptName: '', email: '', cityName: '', countyName: '', townName: '' }
      ],
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
      addUSERNAME: '',
      addUSERID: '',
      addMOBILE: '',
      addDEPTNAME: '',
      addEMAIL: '',
      addcityName: '',
      addcountyName: '',
      addtownName: '',
      editUSERNAME: '',
      editUSERID: '',
      editMOBILE: '',
      editDEPTNAME: '',
      editEMAIL: '',
      editcityName: '',
      editcountyName: '',
      edittownName: '',
      editID: '',
      delList: [],
      addPermision: false,
      delPermision: false,
      editPermision: false
    }
  },
  mounted() {
    this.loadData();
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
      this.$http.get('api/emergency/classify', {
        params: {
          userTypeId: '1001'
        }
      }).then(
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
      if (this.fuzzySearch === '') {
        this.loadData()
      } else {
        this.$http.get('api/emergency/like',
          {
            params: {
              userName: this.fuzzySearch,
              userTypeId: 1001
            }
          }).then((res) => {
            // console.log(res)
            this.userData = res.data.data;
          });
        this.fuzzySearch = '';
      }
    },
    // 数据导出
    toExcel() {
      this.outExcel(this.userData, '数据管理-加分项-2018/05/23', this.gridColumns)
    },
    outExcel(JSONData, FileName, head) {
      // 先转化json
      var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData
      var excel = '<table>'
      // 生成表头
      var row = '<tr>'
      for (var i = 0; i < head.length - 1; i++) {
        row += '<td>' + head[i].alias + '</td>'
      }
      excel += row + '</tr>'
      // 循环生成表身
      for (var j = 0; j < arrData.length; j++) {
        var rows = '<tr>'
        for (var k = 0; k < head.length; k++) {
          var td = arrData[j][head[k].field] ? arrData[j][head[k].field] : ''
          rows += '<td>' + td + '</td>'
        }
        excel += rows + '</tr>'
      }
      excel += '</table>'
      var excelFile = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
        'xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel"'
      excelFile += ' charset="UTF-8">'
      excelFile += '<head>'
      excelFile += '<!--[if gte mso 9]>'
      excelFile += '<xml>'
      excelFile += '<x:ExcelWorkbook>'
      excelFile += '<x:ExcelWorksheets>'
      excelFile += '<x:ExcelWorksheet>'
      excelFile += '<x:Name>'
      excelFile += 'sheet'
      excelFile += '</x:Name>'
      excelFile += '<x:WorksheetOptions>'
      excelFile += '<x:DisplayGridlines/>'
      excelFile += '</x:WorksheetOptions>'
      excelFile += '</x:ExcelWorksheet>'
      excelFile += '</x:ExcelWorksheets>'
      excelFile += '</x:ExcelWorkbook>'
      excelFile += '</xml>'
      excelFile += '<![endif]-->'
      excelFile += '</head>'
      excelFile += '<body>'
      excelFile += excel
      excelFile += '</body>'
      excelFile += '</html>'
      var uri = 'data:application/vnd.ms-excelcharset=utf-8,' + encodeURIComponent(excelFile)
      var link = document.createElement('a')
      link.href = uri
      link.style = 'visibility:hidden'
      link.download = FileName + '.xls'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    download() {
      this.$http.get('api/emergency/template', {
        params: {
          userTypeId: '1001'
        }
      }).then(
        (res) => {
          // console.log(res)
          // let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
          // let objectUrl = URL.createObjectURL(blob);
          // window.location.href = objectUrl
        }
      )
    },
    // 上传文件
    getFile(event) {
      this.upath = event.target.files[0]
      // console.log(this.upath)
    },
    submitfile(event) {
      var file = new FormData();
      file.append('file', this.upath);// file是键，file是值，就是要传的文件，test.zip是要传的文件名
      // console.log(file.get('filename'))
      // console.log(file.get('file'))
      let config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$http.post('api/emergency/import', file, config).then(
        (res) => {
          // console.log(res)
          if (res.data.msg === 'success') {
            this.loadData()
          }
        }
      )
    },
    // 添加用户
    addUser() {
      this.addPop = true;
    },
    // 关闭添加弹框
    addClosePop() {
      this.addPop = false;
      this.addDEPTNAME = '';
      this.addEMAIL = '';
      this.addMOBILE = '';
      this.addcityName = '';
      this.addcountyName = '';
      this.addtownName = '';
      this.addUSERID = '';
      this.addUSERNAME = ''
    },
    // 关闭编辑弹框
    editClosePop() {
      this.editPop = false;
    },
    // 添加确认
    addConform() {
      if (this.addUSERNAME === '') {
        this.$message.error('必须输入用户姓名')
      }
      if (this.addUSERID === '') {
        this.$message.error('必须输入英文名称')
      }
      var emergencyPerson = {
        deptName: this.addDEPTNAME,
        email: this.addEMAIL,
        mobile: this.addMOBILE,
        cityName: this.addcityName,
        countyName: this.addcountyName,
        townName: this.addtownName,
        userId: this.addUSERID,
        userName: this.addUSERNAME,
        usertypeId: 1001
      }
      this.$http.post('api/emergency', emergencyPerson).then(
        (res) => {
          if (res.data.data === 1) {
            alert('添加成功！！！');
            this.addClosePop();
            this.loadData();
          } else if (res.data.data === 'BusinessException: 应急人员信息已存在') {
            this.$message.error('用户名重复')
          } else {
            alert('添加失败！！！')
          }
        })
    },
    // 编辑确认
    editConform() {
      var emergencyPerson = {
        id: this.editID,
        deptName: this.editDEPTNAME,
        email: this.editEMAIL,
        mobile: this.editMOBILE,
        cityName: this.editcityName,
        countyName: this.editcountyName,
        townName: this.edittownName,
        userId: this.editUSERID,
        userName: this.editUSERNAME,
        usertypeId: 1001
      }
      this.$http.put('api/emergency', emergencyPerson).then(
        (res) => {
          if (res.data.data === 1) {
            this.editClosePop();
            alert('修改成功！！！');
            this.loadData();
          } else {
            alert('修改失败')
          }
        }
      )
    },
    // 删除用户
    delUser() {
      this.delList = [];
      for (let i = 0; i < this.CHECKEDArr.length; i++) {
        if (this.CHECKEDArr[i].flag) {
          this.delList.push(this.showdatas[i].id)
        }
      }
      console.log(this.delList)
      if (this.delList.length > 0) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('api/emergency/batch', {
            // ids: this.delList
            params: {
              ids: this.delList.join()
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
        this.editID = this.showdatas[index].id;
        // console.log(this.editID)
        this.editUSERNAME = this.showdatas[index].userName;
        this.editUSERID = this.showdatas[index].userId;
        this.editDEPTNAME = this.showdatas[index].deptName;
        this.editMOBILE = this.showdatas[index].mobile;
        this.editEMAIL = this.showdatas[index].email;
        this.editcityName = this.showdatas[index].cityName;
        this.editcountyName = this.showdatas[index].countyName;
        this.edittownName = this.showdatas[index].townName
      })
    }
  },
  watch: {},
  components: {},
  beforeDestroy() {
  }
}
</script>
<style lang="less">
.data-warp
  .limit-edit-popup-boxd
  .limit-edit-popup-box-contentd
  .limit-edit-popupd
  .limit-edit-popup-contentd
  .li-itemd
  div {
  color: #243943 !important;
}
// .el-button{
//   margin-top: 2px !important
// }
</style>
