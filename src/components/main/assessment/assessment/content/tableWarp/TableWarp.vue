<!--事后评估-->
<template>
  <div class="assessment-warp">
    <div class="top-bar">
      <div class="top-button check-button" @click="toExcel()">数据导出</div>
    </div>
    <div class="bottom-table">
      <table>
        <thead>
        <tr>
          <th>事后评估列表</th><th>事后评估列表</th><th>事后评估列表</th><th>事后评估列表</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in userData">
          <td>{{item.USER_NAME}}</td>
          <td>{{item.USER_PASS}}</td>
          <td>{{item.USER_LEVEL}}</td>
          <td>{{item.USER_NAME}}</td>
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
  import './tablewarp.less'
  export default {
    data() {
      return {
        gridColumns: [
          {field: 'USER_NAME', alias: '事后评估列表'},
          {field: 'USER_PASS', alias: '事后评估列表'},
          {field: 'USER_LEVEL', alias: '事后评估列表'},
          {field: 'USER_NAME', alias: '事后评估列表'}
        ],
        userData: [
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 1, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'},
        {CHECKED: 0, USER_NAME: 'BOCO-AnHui', USER_PASS: '********', USER_LEVEL: 'admin'}
        ]
      }
    },
    mounted() {
    },
    methods: {
      handleCurrentChange(val) {
      },
      toExcel() {
        this.outExcel(this.userData, '事后评估-加分项-2018/03/13', this.gridColumns)
      },
      /**
       * JSONData：表数据
       * FileName: Excel表名
       * head： 表头
       * {field: 'SITE_NAME', alias: '站点名'},
       */
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
      }
    },
    watch: {},
    components: {},
    beforeDestroy() {
    }
  }
</script>

<style></style>
