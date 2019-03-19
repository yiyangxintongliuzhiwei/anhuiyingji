<!-- 地震-->
<template>
  <div class="data-warp">
    <div class="top-bar">
      <!-- 模糊查询 -->
      <div>
        <div>用户名:</div>
        <input type="text" placeholder="模糊匹配" class="top-input" v-model="fuzzySearch" @keydown.enter="fuzzyQuery">
        <div class="top-button check-button" @click="fuzzyQuery">查询</div>
      </div>
      <!-- <div class="bar1">
        <div class="data_btn"><a href="api/earthquake/export">数据导出</a></div>
        <div class="data_btn"><a href="api/earthquake/template">模板下载</a></div>
        <input type="file" @change="getFile($event)"><button class="shangchuan" @click="submitfile($event)">上传</button>
      </div> -->
      <div>
        <div v-if='addPermision' class="top-button add-button" @click="addUser">添加</div>
        <div v-if='delPermision' class="top-button del-button" @click="delUser">删除</div>
      </div>
    </div>
    <!-- 添加用户弹框 -->
    <div class="limit-edit-popup-box limit-edit-popup-box-add" v-show="addPop">
      <div class="limit-edit-popup-box-content">
        <div class="limit-edit-popup">
          <div class="limit-edit-popup-content">
            <div class='closePopBtn' @click='addClosePop'>X</div>
            <div class="title">添加用户信息</div>
            <div class='li-item'>
              <div>
                用户名：
                <el-input clearable v-model="addloginName" placeholder="请输入用户名"></el-input>
              </div>
              <div>
                中文名称：
                <el-input clearable v-model="addzhName" placeholder="请输入中文名称"></el-input>
              </div>
              <div>
                密码：
                <el-input clearable v-model="addpassword" placeholder="请输入密码"></el-input>
              </div>
              <div>
                联系方式：
                <el-input clearable v-model="addphone" placeholder="请输入联系方式"></el-input>
              </div>
              <div>
                地市：
                <el-input clearable v-model="addcityName" placeholder="请输入地市"></el-input>
              </div>
              <div>
                区县：
                <el-input clearable v-model="addcountyName" placeholder="请输入区县"></el-input>
              </div>
              <div>
                乡镇：
                <el-input clearable v-model="addtownName" placeholder="请输入乡镇"></el-input>
              </div>
              <div>
                所属部门：
                <el-input clearable v-model="adddeptName" placeholder="请输入所属部门"></el-input>
              </div>
              <div>
                <!-- 类型：<el-input clearable v-model="adduserType" placeholder="类型：无线人员为1001/传输人员为1002"></el-input> -->
                类&nbsp&nbsp&nbsp&nbsp型:
                <el-select v-model='roleValues' @change='selectChanges()' clearable>
                  <el-option v-for="item in roleOptionss" :key="item.TYPE_NAME" :value="item.TYPE_NAME">
                  </el-option>
                </el-select>
              </div>
              <div>
                角&nbsp&nbsp&nbsp&nbsp色:
                <el-select v-model='roleValue' @change='selectChange()' clearable>
                  <el-option v-for="item in roleOptions" :key="item.rName" :value="item.rName">
                  </el-option>
                </el-select>
              </div>
              <div>&nbsp&nbsp&nbsp&nbsp</div>
              <div>&nbsp&nbsp&nbsp&nbsp</div>
            </div>
            <div class='btn-li'>
              <el-button class='btn' @click='addConform'>确认</el-button>
            </div>
            <!-- type="primary"  -->
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑用户弹框 -->
    <div class="limit-edit-popup-box limit-edit-popup-box-add" v-show="editPop">
      <div class="limit-edit-popup-box-content">
        <div class="limit-edit-popup">
          <div class="limit-edit-popup-content">
            <div class='closePopBtn' @click='editClosePop'>X</div>
            <div class="title">编辑信息</div>
            <div class='li-item'>
              <div>
                用户名：
                <el-input clearable v-model="editloginName" placeholder="请输入用户名"></el-input>
              </div>
              <div>
                中文名称：
                <el-input clearable v-model="editzhName" placeholder="请输入中文名称"></el-input>
              </div>
              <div>
                密码：
                <el-input clearable v-model="editpassword" placeholder="请输入密码"></el-input>
              </div>
              <div>
                联系方式：
                <el-input clearable v-model="editphone" placeholder="请输入联系方式"></el-input>
              </div>
              <div>
                地市：
                <el-input clearable v-model="editcityName" placeholder="请输入地市"></el-input>
              </div>
              <div>
                区县：
                <el-input clearable v-model="editcountyName" placeholder="请输入区县"></el-input>
              </div>
              <div>
                乡镇：
                <el-input clearable v-model="edittownName" placeholder="请输入乡镇"></el-input>
              </div>
              <div>
                所属部门：
                <el-input clearable v-model="editdeptName" placeholder="请输入所属部门"></el-input>
              </div>
              <div>
                <!-- 类型：<el-input clearable v-model="edituserType" placeholder="类型：无线人员为1001/传输人员为1002"></el-input> -->
                类&nbsp&nbsp&nbsp&nbsp型:
                <el-select v-model='roleValues' @change='selectChanges()' clearable>
                  <el-option v-for="item in roleOptionss" :key="item.TYPE_NAME" :value="item.TYPE_NAME">
                  </el-option>
                </el-select>
              </div>
              <div>
                角&nbsp&nbsp&nbsp&nbsp色:
                <el-select v-model='roleValue' @change='selectChange()' clearable>
                  <el-option v-for="item in roleOptions" :key="item.rName" :value="item.rName">
                  </el-option>
                </el-select>
              </div>
              <div>&nbsp&nbsp&nbsp&nbsp</div>
              <div>&nbsp&nbsp&nbsp&nbsp</div>
            </div>
            <div class='btn-li'>
              <el-button class='btn' @click='editConform'>确认</el-button>
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
            <th>用户名</th>
            <th>中文名字</th>
            <th>联系方式</th>
            <th>地市</th>
            <th>地区</th>
            <th>乡镇</th>
            <th>创建时间</th>
            <th>所属部门</th>
            <th>账号类型</th>
            <th v-if='editPermision'></th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="(item,index) in (userData.slice((currentPage-1)*pagesize,currentPage*pagesize))" :key="index">
            <td>
              <div v-if='CHECKEDArr[index]' :class="{selected_btn:CHECKEDArr[index].flag}" @click="changeChecked(index)"></div>
            </td>
            <td>{{item.loginName}}</td>
            <td>{{item.zhName}}</td>
            <!-- <td>{{item.password}}</td> -->
            <td>{{item.phone}}</td>
            <td>{{item.cityName}}</td>
            <td>{{item.countyName}}</td>
            <td>{{item.townName}}</td>
            <td>{{item.createTime}}</td>
            <td>{{item.deptName}}</td>
            <td>{{item.userTypeName}}</td>
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
import './usersManagement.less'
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      addPermision: false,
      delPermision: false,
      editPermision: false,
      userData: [
        { loginName: '', zhName: '', password: '', phone: '', cityName: '', countyName: '', townName: '', createTime: '', deptName: '', userType: '' }
      ],
      showdatas: [],
      fuzzySearch: '',
      CHECKEDArr: [{ flag: false }],
      gridColumns: [
        { field: 'epiLat', alias: '纬度' },
        { field: 'epiLon', alias: '经度' },
        { field: 'epiDepth', alias: '深度' },
        { field: 'locationC', alias: '地点' },
        { field: 'eqType', alias: '类型' },
        { field: 'm', alias: '震级' },
        { field: 'oTime', alias: '发震时间' }
      ],
      upath: '',
      addPop: false,
      editPop: false,
      addloginName: '',
      addzhName: '',
      addpassword: '',
      addphone: '',
      addcityName: '',
      addcountyName: '',
      addtownName: '',
      adddeptName: '',
      adduserType: '',
      addrId: '',
      roleValue: '',
      roleValues: '',
      editroleValue: '',
      roleOptions: [
        {
          'R_ID': 1001,
          'R_NAME': '系统管理员',
          'P_NAME': '删,增,改,查',
          'P_ID': '1,2,3,4'
        },
        {
          'R_ID': 1002,
          'R_NAME': '省指挥',
          'P_NAME': '删,增,改,查',
          'P_ID': '1,2,3,4'
        }
      ],
      roleOptionss: [
        {
          'R_ID': 1001,
          'R_NAME': '无线人员'
        },
        {
          'R_ID': 1002,
          'R_NAME': '传输人员'
        }
      ],
      addm: '',
      addoTime: '',
      editloginName: '',
      editzhName: '',
      editpassword: '',
      editdeptName: '',
      edituserType: '',
      editrId: '',
      editphone: '',
      editcityName: '',
      editcountyName: '',
      edittownName: '',
      editoTime: '',
      editID: '',
      delList: []
    }
  },
  mounted() {
    this.loadData();
    this.confirmPermision();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      // this.CHECKEDArr[0].flag = false;
      for (let item of this.CHECKEDArr) {
        item.flag = false
      }
      this.showdatas = this.userData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
    },
    handleSizeChange(val) {
      // console.log(val)
      this.pagesize = val
    },
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
    loadData() {
      this.CHECKEDArr = [];
      this.$http.get('api/user').then(
        (res) => {
          // console.log(res)
          this.userData = res.data.data
          this.showdatas = this.userData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize);
          this.userData.forEach(element => {
            this.CHECKEDArr.push({ flag: false })
          })
        }
      )
      // 查询用户类型
      this.$http.get('api/mix/d0059').then(res => {
        this.roleOptionss = res.data.data;
      })
      // 查询用户角色
      this.$http.get('api/role').then(res => {
        this.roleOptions = res.data.data;
      })
    },
    // 每一页显示的算法
    // 模糊查询
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
    // 角色选择
    selectChange() {
      if (this.roleOptions && this.roleValue) {
        this.roleOptions.forEach(element => {
          if (element.rName === this.roleValue) {
            this.addrId = element.rId
          }
        });
      }
    },
    // 类型选择
    selectChanges() {
      if (this.roleOptionss && this.roleValues) {
        this.roleOptionss.forEach(element => {
          if (element.TYPE_NAME === this.roleValues) {
            this.adduserType = element.TYPE_ID
          }
        });
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
    // 模板下载
    download() {
      this.$http.get('api/earthquake/template').then(
        (res) => {
          // console.log(res.data)
          // this.userData = res.data
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
      file.append('file', this.upath);// filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      // console.log( file.get('file'))
      let config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$http.post('api/earthquake/import', file, config).then(
        (res) => {
          // console.log(res)
          // this.userData = res.data.data
          this.loadData()
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
      this.addloginName = ''
      this.addzhName = ''
      this.addpassword = ''
      this.addphone = ''
      this.addcityName = ''
      this.addcountyName = ''
      this.addtownName = ''
      this.adduserType = ''
      this.adddeptName = ''
      this.roleValue = ''
      this.roleValues = ''
      this.addrId = ''
    },
    // 关闭编辑弹框
    editClosePop() {
      this.editPop = false;
    },
    // 添加确认
    addConform() {
      if (this.addloginName === '') {
        this.$message.error('必须输入用户姓名')
      }
      if (this.addrId === '') {
        this.$message.error('必须输入角色')
      }
      var userEntity = {
        loginName: this.addloginName,
        zhName: this.addzhName,
        password: this.addpassword,
        phone: this.addphone,
        cityName: this.addcityName,
        countyName: this.addcountyName,
        townName: this.addtownName,
        deptName: this.adddeptName,
        userType: this.adduserType,
        rId: this.addrId
      }
      this.$http.post('api/user/save', userEntity).then(
        (res) => {
          // console.log(res)
          if (res.data.msg === 'success') {
            alert('添加成功！！！');
            this.addClosePop();
            this.loadData();
          } else if (res.data.data === 'BusinessException: 用户名已经存在') {
            this.$message.error('用户名重复')
          } else {
            alert('添加失败！！！')
          }
        }
      )
    },
    // 编辑确认
    editConform() {
      var userEntity = {
        userId: this.editID,
        loginName: this.editloginName,
        zhName: this.editzhName,
        password: this.editpassword,
        phone: this.editphone,
        cityName: this.editcityName,
        countyName: this.editcountyName,
        townName: this.edittownName,
        deptName: this.editdeptName,
        userType: this.adduserType,
        rId: this.addrId
      }
      this.$http.put('api/user/update', userEntity).then(
        (res) => {
          // console.log(res)
          if (res.data.msg === 'success') {
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
          this.delList.push(this.showdatas[i].userId)
        }
      }
      // console.log(this.delList)
      if (this.delList.length > 0) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('api/user/deleteBatch', {
            // ids: this.delList
            params: {
              userIds: this.delList.join()
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
              // console.log(res)
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
        this.editID = this.showdatas[index].userId;
        this.editloginName = this.showdatas[index].loginName;
        this.editzhName = this.showdatas[index].zhName;
        this.editpassword = this.showdatas[index].password;
        this.editphone = this.showdatas[index].phone;
        this.editcityName = this.showdatas[index].cityName;
        this.editcountyName = this.showdatas[index].countyName;
        this.edittownName = this.showdatas[index].townName;
        this.editdeptName = this.showdatas[index].deptName;
        // this.edituserType = this.showdatas[index].userType
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
