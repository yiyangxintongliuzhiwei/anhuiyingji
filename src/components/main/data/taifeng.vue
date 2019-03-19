<!-- 地震-->
<template>
  <div class="data-warp">
    <div class="top-bar">
      <!-- 模糊查询 -->
      <div>
        <div>台风名称:</div>
        <input type="text" placeholder="模糊匹配" class="top-input" v-model="fuzzySearch" @keydown.enter="fuzzyQuery">
        <div class="top-button check-button" @click="fuzzyQuery">查询</div>
      </div>
      <div class="bar1">
        <div class="data_btn"><a href="api/typhoon/export">数据导出</a></div>
        <div class="data_btn"><a href="api/typhoon/template">模板下载</a></div>
        <input type="file" @change="getFile($event)"><button class="shangchuan" @click="submitfile($event)">上传</button>
      </div>
      <div>
        <div class="top-button add-button" @click="addUser">添加</div>
        <div class="top-button del-button" @click="delUser">删除</div>
      </div>
    </div>
      <!-- 添加用户弹框 -->
    <div class="limit-edit-popup-boxs limit-edit-popup-box-adds" v-show="addPop">
     <div class="limit-edit-popup-box-contents">
       <div class="limit-edit-popups">
         <div class="limit-edit-popup-contents">
           <div class='closePopBtn' @click='addClosePop'>X</div>
           <div class="titles">添加台风信息</div>
           <div class='li-items'>
             <div class="left">
              <div>
                   地区：<el-input clearable size='mini' v-model="addforecastCountry" placeholder="请输入台风地区"></el-input>
              </div>
              <div>
                   纬度：<el-input clearable size='mini' v-model="addlatitude" placeholder="请输入纬度"></el-input>
              </div>
              <div>
                   经度：<el-input clearable size='mini' v-model="addlongitude" placeholder="请输入经度"></el-input>
              </div>
              <div>
                   移动方向：<el-input clearable size='mini' v-model="addmoveDirection" placeholder="请输入移动方向"></el-input>
              </div>
              <div>
                   移动速度：<el-input clearable size='mini' v-model="addmoveSpeed" placeholder="请输入移动速度"></el-input>
              </div> 
              <div>
                   压力：<el-input clearable size='mini' v-model="addpressure" placeholder="请输入压力"></el-input>
              </div>
              <div>
                   10级影响：<el-input clearable size='mini'  v-model="addradius10" placeholder="请输入10级影响"></el-input>
              </div>
              </div>
              <div class="right">
              <div>
                   7级影响：<el-input clearable size='mini'  v-model="addradius7" placeholder="请输入7级影响"></el-input>
              </div>
              <div>
                   状态：<el-input clearable size='mini'  v-model="addstatus" placeholder="请输入台风状态"></el-input>
              </div>
              <div>
                   台风编码：<el-input clearable size='mini'  v-model="addtyphoonCode" placeholder="请输入台风编码"></el-input>
              </div>
              <div>
                   路径序号：<el-input clearable size='mini'  v-model="addtyphoonNum" placeholder="请输入台风路径序号"></el-input>
              </div>
              <div>
                   台风时间：<el-input clearable size='mini'  v-model="addtyphoonTimeLabel" placeholder="例如：2018-05-23 15:00:00"></el-input>
              </div>
              <div>
                   风力：<el-input clearable size='mini'  v-model="addwindPower" placeholder="请输入风力"></el-input>
              </div>
              <div>
                   风速：<el-input clearable size='mini' v-model="addwindSpeed" placeholder="请输入风速"></el-input>
              </div>
              </div>
           </div>
           <div class='btn-lis'><el-button class='btns' @click='addConform'>确认</el-button></div> 
         </div>
       </div>
     </div>  
    </div>



     <!-- 编辑用户弹框 -->
      <div class="limit-edit-popup-boxs limit-edit-popup-box-adds" v-show="editPop">
      <div class="limit-edit-popup-box-contents">
        <div class="limit-edit-popups">
          <div class="limit-edit-popup-contents">
            <div class='closePopBtn' @click='editClosePop'>X</div>
            <div class="titles">编辑信息</div>
            <div class='li-items'>
              <div class="left">
              <div>
                   地区：<el-input clearable size='mini' v-model="editforecastCountry" placeholder="请输入台风地区"></el-input>
              </div>
              <div>
                   纬度：<el-input clearable size='mini' v-model="editlatitude" placeholder="请输入纬度"></el-input>
              </div>
              <div>
                   经度：<el-input clearable size='mini' v-model="editlongitude" placeholder="请输入经度"></el-input>
              </div>
              <div>
                   移动方向：<el-input clearable size='mini' v-model="editmoveDirection" placeholder="请输入移动方向"></el-input>
              </div>
              <div>
                   移动速度：<el-input clearable size='mini' v-model="editmoveSpeed" placeholder="请输入移动速度"></el-input>
              </div> 
              <div>
                   压力：<el-input clearable size='mini' v-model="editpressure" placeholder="请输入压力"></el-input>
              </div>
              <div>
                   10级影响：<el-input clearable size='mini'  v-model="editradius10" placeholder="请输入10级影响"></el-input>
              </div>
              </div>
              <div class="right">
              <div>
                   7级影响：<el-input clearable size='mini'  v-model="editradius7" placeholder="请输入7级影响"></el-input>
              </div>
              <div>
                   状态：<el-input clearable size='mini'  v-model="editstatus" placeholder="请输入台风状态"></el-input>
              </div>
              <div>
                   台风编码：<el-input clearable size='mini'  v-model="edittyphoonCode" placeholder="请输入台风编码"></el-input>
              </div>
              <div>
                   路径序号：<el-input clearable size='mini'  v-model="edittyphoonNum" placeholder="请输入台风路径序号"></el-input>
              </div>
              <div>
                   台风时间：<el-input clearable size='mini'  v-model="edittyphoonTimeLabel" placeholder="例如：2018-05-23 15:00:00"></el-input>
              </div>
              <div>
                   风力：<el-input clearable size='mini'  v-model="editwindPower" placeholder="请输入风力"></el-input>
              </div>
              <div>
                   风速：<el-input clearable size='mini' v-model="editwindSpeed" placeholder="请输入风速"></el-input>
              </div>
              </div>     
            </div>
            <div class='btn-lis'><el-button class='btns' @click='editConform'>确认</el-button></div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-table">
      <table class="table">
        <thead>
        <tr>
          <th></th><th>台风名称</th><th>地点</th><th>移动方向</th><th>移动速度</th><th>压力</th><th>状态</th><th>风力</th><th>风速</th><th></th>
        </tr>
        </thead>
        <tbody id="tbody">
        <tr v-for="(item,index) in (userData.slice((currentPage-1)*pagesize,currentPage*pagesize))" :key="index">
          <td><div v-if='CHECKEDArr[index]' :class="{selected_btn:CHECKEDArr[index].flag}" @click="changeChecked(index)"></div></td>
          <td>{{item.nameCn}}</td>
          <td>{{item.forecastCountry}}</td>
          <td>{{item.moveDirection}}</td>
          <td>{{item.moveSpeed}}</td>
          <td>{{item.pressure}}</td>
          <td>{{item.status}}</td> 
          <td>{{item.windPower}}</td>
          <td>{{item.windSpeed}}</td>
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
  import './taifeng.less'
  export default {
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        userData: [
          {nameCn: '', forecastCountry: '', moveDirection: '', moveSpeed: '', pressure: '', status: '', windPower: '', windSpeed: ''}
        ],
        fuzzySearch: '',
        showdatas: '',
        CHECKEDArr: [{ flag: false }],
        gridColumns: [
          {field: 'nameCn', alias: '台风名称'},
          {field: 'forecastCountry', alias: '地点'},
          {field: 'moveDirection', alias: '移动方向'},
          {field: 'moveSpeed', alias: '移动速度'},
          {field: 'pressure', alias: '压力'},
          {field: 'status', alias: '台风状态'},
          {field: 'windPower', alias: '风力'},
          {field: 'windSpeed', alias: '风速'}
        ],
        upath: '',
        addPop: false,
        editPop: false,
        addforecastCountry: '',
        addlatitude: '',
        addlongitude: '',
        addmoveDirection: '',
        addmoveSpeed: '',
        addpressure: '',
        addradius10: '',
        addradius7: '',
        addstatus: '',
        addtyphoonCode: '',
        addtyphoonNum: '',
        addtyphoonTimeLabel: '',
        addwindPower: '',
        addwindSpeed: '',
        editforecastCountry: '',
        editlatitude: '',
        editlongitude: '',
        editmoveDirection: '',
        editmoveSpeed: '',
        editpressure: '',
        editradius10: '',
        editradius7: '',
        editstatus: '',
        edittyphoonCode: '',
        edittyphoonNum: '',
        edittyphoonTimeLabel: '',
        editwindPower: '',
        editwindSpeed: '',
        // editID: '',
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
        this.$http.get('api/typhoon/all').then(
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
        this.$http.get('api/typhoon/like',
          {
            params: {
              typhoonName: this.fuzzySearch
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
        this.$http.get('api/typhoon/template').then(
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
        this.$http.post('api/typhoon/import', file, config).then(
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
        this.addPop = false
        this.addforecastCountry = ''
        this.addlatitude = ''
        this.addlongitude = ''
        this.addmoveDirection = ''
        this.addmoveSpeed = ''
        this.addpressure = ''
        this.addradius10 = ''
        this.addradius7 = ''
        this.addstatus = ''
        this.addtyphoonCode = ''
        this.addtyphoonNum = ''
        this.addtyphoonTimeLabel = ''
        this.addwindPower = ''
        this.addwindSpeed = ''
      },
      // 关闭编辑弹框
      editClosePop() {
        this.editPop = false;
      },
      // 添加确认
      addConform() {
        var entity = {
          forecastCountry: this.addforecastCountry,
          latitude: this.addlatitude,
          longitude: this.addlongitude,
          moveDirection: this.addmoveDirection,
          moveSpeed: this.addmoveSpeed,
          pressure: this.addpressure,
          radius10: this.addradius10,
          radius7: this.addradius7,
          status: this.addstatus,
          typhoonCode: this.addtyphoonCode,
          typhoonTimeLabel: 'this.addtyphoonTimeLabel',
          typhoonNum: this.addtyphoonNum,
          windPower: this.addwindPower,
          windSpeed: this.addwindSpeed
        }
        this.$http.post('api/typhoon', entity).then(
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
        var entity = {
          forecastCountry: this.editforecastCountry,
          latitude: this.editlatitude,
          longitude: this.editlongitude,
          moveDirection: this.editmoveDirection,
          moveSpeed: this.editmoveSpeed,
          pressure: this.editpressure,
          radius10: this.editradius10,
          radius7: this.editradius7,
          status: this.editstatus,
          typhoonCode: this.edittyphoonCode,
          typhoonTimeLabel: 'this.edittyphoonTimeLabel',
          typhoonNum: this.edittyphoonNum,
          windPower: this.editwindPower,
          windSpeed: this.editwindSpeed
        }
        this.$http.put('api/typhoon', entity).then(
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
            this.delList.push(this.showdatas[i].typhoonCode)
          }
        }
        // console.log(this.delList)
        if (this.delList.length > 0) {
          this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete('api/typhoon/batch', {
              // ids: this.delList
              params: {
                typhoonCodes: this.delList.join()
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
        //   this.editID = this.userData[index].id;
          this.editforecastCountry = this.showdatas[index].forecastCountry;
          this.editlatitude = this.showdatas[index].latitude;
          this.editlongitude = this.showdatas[index].longitude;
          this.editmoveDirection = this.showdatas[index].moveDirection;
          this.editmoveSpeed = this.showdatas[index].moveSpeed;
          this.editpressure = this.showdatas[index].pressure;
          this.editradius10 = this.showdatas[index].radius10;
          this.editradius7 = this.showdatas[index].radius7;
          this.editstatus = this.showdatas[index].status;
          this.edittyphoonCode = this.showdatas[index].typhoonCode;
          this.edittyphoonTimeLabel = this.showdatas[index].typhoonTimeLabel;
          this.edittyphoonNum = this.showdatas[index].typhoonNum;
          this.editwindPower = this.showdatas[index].windPower;
          this.editwindSpeed = this.showdatas[index].windSpeed
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
