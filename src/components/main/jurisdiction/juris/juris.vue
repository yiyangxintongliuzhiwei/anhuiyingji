<!-- 权限列表 -->
<template>
  <div class="data-warp">
    <div class="top-bar">
      <!-- 模糊查询 -->
      <div>
        <div>权限名称:</div>
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
    <!-- <div class="limit-edit-popup-box limit-edit-popup-box-add" v-show="addPop">
        <div class="limit-edit-popup-box-content">
        <div class="limit-edit-popup">
          <div class="limit-edit-popup-content">
            <div class='closePopBtn' @click='addClosePop'>X</div>
            <div class="title">添加用户</div>
            <div class='li-item'>
              <div>
                   权限名称：<el-input clearable v-model="addpName" placeholder="请输入权限名称"></el-input>
              </div>     
            </div>
            <div class='btn-li'><el-button class='btn' @click='addConform'>确认</el-button></div>
          </div>
        </div>
      </div>
      </div> -->

    <!-- 新添加用户弹框 -->
    <div class="limit-edit-popup-boxq limit-edit-popup-box-addq" v-show="addPop">
      <div class="limit-edit-popup-box-contentq">
        <div class="limit-edit-popupq">
          <div class="limit-edit-popup-contentq">
            <div class="closePopBtn" @click="addClosePop">X</div>
            <div class="titleq">添加用户</div>
            <div class="li-itemq">
              <div>
                <span>权限名称 :</span>
                <input v-model="addpName" placeholder="请输入权限名称" class="shuru">
              </div>
            </div>
            <div class='btn-liq'>
              <div class='btnq' @click='addConform'>确认</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑用户弹框 -->
    <div class="limit-edit-popup-boxq limit-edit-popup-box-addq" v-show="editPop">
      <div class="limit-edit-popup-box-contentq">
        <div class="limit-edit-popupq">
          <div class="limit-edit-popup-contentq">
            <div class='closePopBtn' @click='editClosePop'>X</div>
            <div class="titleq">编辑用户</div>
            <div class='li-itemq'>
              <!-- <div>
                   权限ID：<el-input clearable :disabled="true" v-model="editpId" placeholder="请输入权限ID"></el-input>
              </div>
              <div>
                   权限姓名：<el-input clearable v-model="editpName" placeholder="请输入权限姓名"></el-input>
              </div>      -->
              <div>
                <span>权限ID :</span>
                <input v-model="editpId" placeholder="请输入权限ID" class="shuru" disabled="readonly">
              </div>
              <div>
                <span>权限名称 :</span>
                <input v-model="editpName" placeholder="请输入权限姓名" class="shuru">
              </div>
            </div>
            <div class='btn-liq'>
              <div class='btnq' @click='editConform'>确认</div>
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
            <th>权限ID</th>
            <th>权限名称</th>
            <th v-if='editPermision'></th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr v-for="(item,index) in (userData.slice((currentPage-1)*pagesize,currentPage*pagesize))" :key="index">
            <td>
              <div v-if='CHECKEDArr[index]' :class="{selected_btn:CHECKEDArr[index].flag}" @click="changeChecked(index)"></div>
            </td>
            <td>{{item.pId}}</td>
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
import './juris.less'
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      showdatas: [],
      userData: [
        { pId: '', pName: '' }
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
      addPermision: false,
      delPermision: false,
      editPermision: false,
      addpName: '',
      addpId: '',
      editpId: '',
      editpName: '',
      delList: []
    }
  },
  mounted() {
    this.loadData();
    this.confirmPermision();
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
      this.$http.get('api/permission').then(
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
      this.$http.get('api/permission/like',
        {
          params: {
            permissionName: this.fuzzySearch
          }
        }).then((res) => {
          // console.log(res)
          this.userData = res.data.data;
        });
      this.fuzzySearch = '';
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
      console.log(this.upath)
    },
    submitfile(event) {
      var file = new FormData();
      file.append('filename', this.upath);// filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      console.log(file.get('filename'))
      let config = { headers: { 'Content-Type': 'multipart/form-data' } };
      this.$http.post('api/emergency/import', file, config).then(
        (res) => {
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
      this.addpId = '';
      this.addpName = ''
    },
    // 关闭编辑弹框
    editClosePop() {
      this.editPop = false;
    },
    // 添加确认
    addConform() {
      var userPermissionEntity = {
        pId: this.addpId,
        pName: this.addpName
      }
      this.$http.post('api/permission', userPermissionEntity).then(
        (res) => {
          if (res.data.data === 1) {
            alert('添加成功！！！');
            this.addClosePop();
            this.loadData();
          } else {
            alert('添加失败！！！')
          }
        })
    },
    // 编辑确认
    editConform() {
      var userPermissionEntity = {
        pId: this.editpId,
        pName: this.editpName
      }
      this.$http.put('api/permission', userPermissionEntity).then(
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
          this.delList.push(this.showdatas[i].pId)
        }
      }
      console.log(this.delList)
      if (this.delList.length > 0) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('api/permission/batch', {
            // ids: this.delList
            params: {
              permissionIds: this.delList.join()
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
        this.editpId = this.showdatas[index].pId;
        this.editpName = this.showdatas[index].pName
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
