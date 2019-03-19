<!-- 无线人员 -->
<template>
  <div class="data-warp">
    <div class="top-bar">
      <!-- 模糊查询 -->
      <div>
        <div>地区:</div>
        <input type="text" placeholder="模糊匹配" class="top-input" v-model="fuzzySearch" @keydown.enter="fuzzyQuery">
        <div class="top-button check-button" @click="fuzzyQuery">查询</div>
      </div>
      <div class="bar1">
        <div class="data_btn"><a href="api/weather/export">数据导出</a></div>
        <div class="data_btn"><a href="api/weather/template">模板下载</a></div>
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
            <div class="title">添加天气</div>
            <div class='li-item'>
              <div>
                   地区：<el-input clearable v-model="addregionName" placeholder="请输入地区"></el-input>
              </div>
              <div>
                   天气情况：<el-input clearable v-model="addweatherInfo" placeholder="请输入天气情况"></el-input>
              </div>
              <div>
                   天气时间：<el-input clearable v-model="addweatherTime" placeholder="例如：2018/5/30 11：00:00"></el-input>
              </div>
              <div>
                   温度：<el-input clearable v-model="addweatherWendu" placeholder="请输入温度"></el-input>
              </div>
              <div>
                   风力：<el-input clearable v-model="addweatherWindPower" placeholder="请输入风力"></el-input>
              </div> 
              <div>
                   白天天气路径：<el-input clearable v-model="addweatherDImg" placeholder="请输入天气路径"></el-input>
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
                   地区：<el-input clearable v-model="editregionName" placeholder="请输入地区"></el-input>
              </div>
              <div>
                   天气情况：<el-input clearable v-model="editweatherInfo" placeholder="请输入天气情况"></el-input>
              </div>
              <div>
                   天气时间：<el-input clearable v-model="editweatherTime" placeholder="例如：2018/5/30 11：00:00"></el-input>
              </div>
              <div>
                   温度：<el-input clearable v-model="editweatherWendu" placeholder="请输入温度"></el-input>
              </div>
              <div>
                   风力：<el-input clearable v-model="editweatherWindPower" placeholder="请输入风力"></el-input>
              </div> 
              <div>
                   白天天气路径：<el-input clearable v-model="editweatherDImg" placeholder="请输入天气路径"></el-input>
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
          <th></th><th>地区</th><th>天气</th><th>天气情况</th><th>温度</th><th>时间</th><th>风力</th><th></th>
        </tr>
        </thead>
        <tbody id="tbody">
        <tr v-for="(item,index) in (userData.slice((currentPage-1)*pagesize,currentPage*pagesize))" :key="index">
          <td><div v-if='CHECKEDArr[index]' :class="{selected_btn:CHECKEDArr[index].flag}" @click="changeChecked(index)"></div></td>
          <td>{{item.regionName}}</td>
          <td>{{item.weatherName}}</td>
          <td>{{item.weatherInfo}}</td>
           <td>{{item.weatherWendu}}</td>
          <td>{{item.weatherTime}}</td> 
          <td>{{item.weatherWindPower}}</td>
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
  import './datamanger.less'
  export default {
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        userData: [
          {regionName: '', weatherName: '', weatherInfo: '', weatherWendu: '', weatherTime: '', weatherWindPower: ''}
        ],
        showdatas: '',
        fuzzySearch: '',
        CHECKEDArr: [{ flag: false }],
        gridColumns: [
          {field: 'regionName', alias: '地区名字'},
          {field: 'weatherName', alias: '天气情况'},
          {field: 'weatherInfo', alias: 'weatherInfo'},
          {field: 'weatherWendu', alias: '温度'},
          {field: 'weatherTime', alias: '天气时间'},
          {field: 'weatherWindPower', alias: '风力'}
        ],
        upath: '',
        addPop: false,
        editPop: false,
        addregionName: '',
        addweatherInfo: '',
        addweatherTime: '',
        addweatherWendu: '',
        addweatherWindPower: '',
        addweatherDImg: '',
        editregionName: '',
        editweatherTime: '',
        editweatherWendu: '',
        editweatherWindPower: '',
        editweatherDImg: '',
        editweatherInfo: '',
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
        this.$http.get('api/weather/all').then(
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
        this.$http.get('api/weather/like',
          {
            params: {
              regionName: this.fuzzySearch
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
        this.$http.get('api/weather/template').then(
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
        this.$http.post('api/weather/import', file, config).then(
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
        this.addregionName = ''
        this.addweatherInfo = ''
        this.addweatherTime = ''
        this.addweatherWendu = ''
        this.addweatherWindPower = ''
        this.addweatherDImg = ''
      },
      // 关闭编辑弹框
      editClosePop() {
        this.editPop = false;
      },
      // 添加确认
      addConform() {
        var entity = {
          regionName: this.addregionName,
          weatherDImg: this.addweatherDImg,
          weatherInfo: this.addweatherInfo,
          weatherTime: this.addweatherTime,
          weatherWendu: this.addweatherWendu,
          weatherWindPower: this.addweatherWindPower
        }
        this.$http.post('api/weather', entity).then(
          (res) => {
            if ( res.data.msg === 'success') {
              alert('添加成功！！！');
              this.addClosePop();
              this.loadData();
            } else {
              alert('添加失败！！！')
            }
            // console.log(res)
          }
        )
      },
      // 编辑确认
      editConform() {
        var entity = {
          regionId: this.editID,
          regionName: this.editregionName,
          weatherInfo: this.editweatherInfo,
          weatherTime: this.editweatherTime,
          weatherWendu: this.editweatherWendu,
          weatherWindPower: this.editweatherWindPower,
          weatherDImg: this.editweatherDImg
        }
        this.$http.put('api/weather', entity).then(
          (res) => {
            if ( res.data.msg === 'success') {
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
            this.delList.push(this.showdatas[i].regionName)
          }
        }
        // console.log(this.delList)
        if (this.delList.length > 0) {
          this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete('api/weather/batch', {
              // ids: this.delList
              params: {
                regionNames: this.delList.join()
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
          this.editID = this.showdatas[index].regionId;
          this.editregionName = this.showdatas[index].regionName;
          this.editweatherInfo = this.showdatas[index].weatherInfo;
          this.editweatherTime = this.showdatas[index].weatherTime;
          this.editweatherWendu = this.showdatas[index].weatherWendu;
          this.editweatherWindPower = this.showdatas[index].weatherWindPower;
          this.editweatherDImg = this.showdatas[index].weatherDImg
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
