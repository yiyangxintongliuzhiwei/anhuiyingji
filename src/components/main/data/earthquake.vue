<!-- 地震-->
<template>
  <div class="data-warp">
    <div class="top-bar">
      <!-- 模糊查询 -->
      <div>
        <div>参考位置:</div>
        <input type="text" placeholder="模糊匹配" class="top-input" v-model="fuzzySearch" @keydown.enter="fuzzyQuery">
        <div class="top-button check-button" @click="fuzzyQuery">查询</div>
      </div>
      <div class="bar1">
        <div class="data_btn"><a href="api/earthquake/export">数据导出</a></div>
        <div class="data_btn"><a href="api/earthquake/template">模板下载</a></div>
        <input type="file" @change="getFile($event)"><button class="shangchuan" @click="submitfile($event)">上传</button>
      </div>
      <div>
        <div class="top-button add-button" @click="addUser">添加</div>
        <div class="top-button del-button" @click="delUser">删除</div>
      </div>
    </div>
      <!-- 添加用户弹框 -->
      <div class="limit-edit-popup-box limit-edit-popup-box-add" v-show="addPop">
      <div class="limit-edit-popup-box-content">
        <div class="limit-edit-popup">
          <div class="limit-edit-popup-content">
            <div class='closePopBtn' @click='addClosePop'>X</div>
            <div class="title">添加地震信息</div>
            <div class='li-item'>
              <div>
                   纬度：<el-input clearable v-model="addepiLat" placeholder="请输入纬度"></el-input>
              </div>
              <div>
                   经度：<el-input clearable v-model="addepiLon" placeholder="请输入经度"></el-input>
              </div>
              <div>
                   深度：<el-input clearable v-model="addepiDepth" placeholder="请输入地震深度"></el-input>
              </div>
              <div>
                   地点：<el-input clearable v-model="addlocationC" placeholder="请输入地震地点"></el-input>
              </div>
              <div>
                   类型：<el-input clearable v-model="addeqType" placeholder="请输入地震类型"></el-input>
              </div> 
              <div>
                   震级：<el-input clearable v-model="addm" placeholder="请输入震级"></el-input>
              </div>
              <div>
                   发震时间：<el-input clearable v-model="addoTime" placeholder="请输入发震时间"></el-input>
              </div>     
            </div>
            <div class='btn-li'><el-button class='btn' @click='addConform'>确认</el-button></div>
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
                   纬度：<el-input clearable v-model="editepiLat" placeholder="请输入纬度"></el-input>
              </div>
              <div>
                   经度：<el-input clearable v-model="editepiLon" placeholder="请输入经度"></el-input>
              </div>
              <div>
                   深度：<el-input clearable v-model="editepiDepth" placeholder="请输入地震深度"></el-input>
              </div>
              <div>
                   地点：<el-input clearable v-model="editlocationC" placeholder="请输入地震地点"></el-input>
              </div>
              <div>
                   类型：<el-input clearable v-model="editeqType" placeholder="请输入地震类型"></el-input>
              </div> 
              <div>
                   震级：<el-input clearable v-model="editm" placeholder="请输入震级"></el-input>
              </div> 
              <div>
                   发震时间：<el-input clearable v-model="editoTime" placeholder="例如：2018/5/30 11：00:00"></el-input>
              </div>    
            </div>
            <div class='btn-li'><el-button class='btn' @click='editConform'>确认</el-button></div>
            <!-- type="primary"  -->
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-table">
      <table class="table">
        <thead>
        <tr>
          <th></th><th>维度</th><th>经度</th><th>深度</th><th>参考位置</th><th>地震种类</th><th>震级</th><th>发震时刻</th><th></th>
        </tr>
        </thead>
        <tbody id="tbody">
        <tr v-for="(item,index) in (userData.slice((currentPage-1)*pagesize,currentPage*pagesize))" :key="index">
          <td><div v-if='CHECKEDArr[index]' :class="{selected_btn:CHECKEDArr[index].flag}" @click="changeChecked(index)"></div></td>
          <td>{{item.epiLat}}</td>
          <td>{{item.epiLon}}</td>
          <td>{{item.epiDepth}}</td>
          <td>{{item.locationC}}</td>
          <td>{{item.eqType}}</td> 
          <td>{{item.m}}</td>
          <td>{{item.oTime}}</td>
          <td><div @click="changeEdit(index)"></div></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="table-pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 15, 20, 30, 50]"
        :total="userData.length"
        :current-page="currentPage"
        :page-size="pagesize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import './earthquake.less'
  export default {
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        userData: [
          {epiLat: '', epiLon: '', epiDepth: '', autoFlag: '', eqType: '', locationC: ''}
        ],
        showdatas: [],
        fuzzySearch: '',
        CHECKEDArr: [{ flag: false }],
        gridColumns: [
          {field: 'epiLat', alias: '纬度'},
          {field: 'epiLon', alias: '经度'},
          {field: 'epiDepth', alias: '深度'},
          {field: 'locationC', alias: '地点'},
          {field: 'eqType', alias: '类型'},
          {field: 'm', alias: '震级'},
          {field: 'oTime', alias: '发震时间'}
        ],
        upath: '',
        addPop: false,
        editPop: false,
        addepiLat: '',
        addepiLon: '',
        addepiDepth: '',
        addlocationC: '',
        addeqType: '',
        addm: '',
        addoTime: '',
        editepiLat: '',
        editepiLon: '',
        editepiDepth: '',
        editlocationC: '',
        editeqType: '',
        editm: '',
        editoTime: '',
        editID: '',
        delList: []
      }
    },
    mounted() {
      this.loadData();
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
      loadData() {
        this.CHECKEDArr = [];
        this.$http.get('api/earthquake/all').then(
          (res) => {
            // console.log(res)
            this.userData = res.data.data
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
        this.$http.get('api/earthquake/like',
          {
            params: {
              locationC: this.fuzzySearch
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
        this.addepiLat = ''
        this.addepiLon = ''
        this.addepiDepth = ''
        this.addlocationC = ''
        this.addeqType = ''
        this.addm = ''
        this.addoTime = ''
      },
      // 关闭编辑弹框
      editClosePop() {
        this.editPop = false;
      },
      // 添加确认
      addConform() {
        var earthQuakeEntity = {
          epiLat: this.addepiLat,
          epiLon: this.addepiLon,
          epiDepth: this.addepiDepth,
          locationC: this.addlocationC,
          eqType: this.addeqType,
          m: this.addm,
          oTime: this.addoTime
        }
        this.$http.post('api/earthquake', earthQuakeEntity).then(
          (res) => {
            // console.log(res)
            if ( res.data.msg === 'success') {
              alert('添加成功！！！');
              this.addClosePop();
              this.loadData();
            } else {
              alert('添加失败！！！')
            }
          }
        )
      },
      // 编辑确认
      editConform() {
        var earthQuakeEntity = {
          id: this.editID,
          epiLat: this.editepiLat,
          epiLon: this.editepiLon,
          epiDepth: this.editepiDepth,
          locationC: this.editlocationC,
          eqType: this.editeqType,
          m: this.editm,
          oTime: this.editoTime
        }
        this.$http.put('api/earthquake/update', earthQuakeEntity).then(
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
        for ( let i = 0; i < this.CHECKEDArr.length; i++) {
          if (this.CHECKEDArr[i].flag) {
            this.delList.push(this.showdatas[i].id)
          }
        }
        // console.log(this.delList)
        if (this.delList.length > 0) {
          this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete('api/earthquake/batch', {
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
          this.editID = this.showdatas[index].id;
          this.editepiLat = this.showdatas[index].epiLat;
          this.editepiLon = this.showdatas[index].epiLon;
          this.editepiDepth = this.showdatas[index].epiDepth;
          this.editlocationC = this.showdatas[index].locationC;
          this.editeqType = this.showdatas[index].eqType;
          this.editm = this.showdatas[index].m;
          this.editoTime = this.showdatas[index].oTime
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
