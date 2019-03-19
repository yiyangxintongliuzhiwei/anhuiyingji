<template>
  <div class='offSiteList'>
    <div class='closePopBtn' @click='closePop'>X</div>
    <div class="content">
      <div>
        <div class="title">退服基站列表</div>
        <div class='siteinfo'>
          <div class='table-head'>
            <span>基站名称</span>
            <!-- <span>基站位置</span> -->
            <span>网元类型</span>
            <span>厂商</span> 
            <span>所属地市</span>
            <span>所属区县</span>
            <span>所属乡镇</span>
            <span>退服时间</span>
            <span>退服原因</span>
            <span>已调度信息</span>
          </div>
          <div class='table-li' v-for='(item,index) in listData' v-show="tingdian">
            <span :title='item.ZH_LABEL'>{{item.ZH_LABEL}}</span>
            <!-- <span>{{item.COUNTYNAME}}</span> -->
            <span>{{item.LEIXING}}</span>
            <span>{{item.CHANGJIA}}</span>
            <span>{{item.REGION_NAME}}</span>
            <span>{{item.CITY_NAME}}</span>
            <span>{{item.SMALL_TOWNS}}</span>
            <span :title='item.EVENT_TIME'>{{item.EVENT_TIME}}</span>
            <span>{{item.ALARM_TITLE_TEXT}}</span>
            <span>{{dispatchData[index]}}</span>
          </div>
          <div class='table-li' v-for='(item,index) in listData' v-show="tuifu">
            <span :title='item.BTSNAME'>{{item.BTSNAME}}</span>
            <!-- <span>{{item.COUNTYNAME}}</span> -->
            <span>{{item.SITE_TYPE}}</span>
            <span>{{item.VENDER}}</span>
            <span>{{item.CITYNAME}}</span>
            <span>{{item.COUNTYNAME}}</span>
            <span>{{item.TOWNINFO}}</span>
            <span :title='item.EVENTSTIME'>{{item.EVENTSTIME}}</span>
            <span>{{item.TITLETEXT}}</span>
            <span>{{dispatchData[index]}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './offSiteList.less'
export default {
  props: ['indi', 'areaId'],
  data() {
    return {
      switchPop: true,
      tuifu: false,
      tingdian: false,
      listData: [{
        'BTSNAME': 'ANQ-桐城晨光机械x-HZL',
        'START_TIME': '2018-05-29 19:57:36',
        'CITYNAME': '安庆',
        'LATITUDE': '31.0084',
        'NE_ID': '1576647963',
        'SITE_TYPE': '8104',
        'VENDER': '中兴',
        'TOWNINFO': '文昌街道',
        'COUNTYNAME': '桐城',
        'LONGITUDE': '116.933',
        'EVENTSTIME': '2018/8/25 18:25',
        'LEIXING': '',
        'CHANGJIA': '',
        'SMALL_TOWNS': '',
        'EVENT_TIME': '',
        'ALARM_TITLE_TEXT': ''
      },
      {
        'BTSNAME': 'ANQ-潜山黄龛-HZL',
        'START_TIME': '2018-05-29 19:57:36',
        'CITYNAME': '安庆',
        'LATITUDE': '30.65651',
        'NE_ID': '1675168931',
        'SITE_TYPE': '8104',
        'VENDER': '中兴',
        'TOWNINFO': '水吼镇',
        'COUNTYNAME': '潜山',
        'LONGITUDE': '116.36302',
        'EVENTSTIME': '2018/8/25 18:25',
        'LEIXING': '',
        'CHANGJIA': '',
        'SMALL_TOWNS': '',
        'EVENT_TIME': '',
        'ALARM_TITLE_TEXT': ''
      },
      {
        'BTSNAME': 'ANQ-望江三站-HZL',
        'START_TIME': '2018-05-29 19:57:36',
        'CITYNAME': '安庆',
        'LATITUDE': '30.1242',
        'NE_ID': '1691929372',
        'SITE_TYPE': '8104',
        'VENDER': '中兴',
        'TOWNINFO': '华阳镇',
        'COUNTYNAME': '望江',
        'LONGITUDE': '116.6842',
        'EVENTSTIME': '2018/8/25 18:25',
        'LEIXING': '',
        'CHANGJIA': '',
        'SMALL_TOWNS': '',
        'EVENT_TIME': '',
        'ALARM_TITLE_TEXT': ''
      }],
      dispatchData: [],
      flagA: false
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    closePop() {
      this.$emit('POPDOWN', '')
    },
    loadData() {
      this.listData = []
      this.dispatchData = []
      let self = this
      // console.log('11111' + this.indi)
      // console.log('11111' + this.areaId)
      if (this.indi === 'a1008' || this.indi === 'a1007') {
        this.tuifu = true
        this.tindian = false
        self.$http.get('http://10.243.65.239:8080/ips-ice/indi/statistics/' + this.indi + '?areaId=' + this.areaId).then((res) => {
          this.listData = res.data.data;
          for (let i = 0; i < this.listData.length; i++) {
            this.switchPop = false
          // var wirelessName = ''
          // var transName = ''
          // var emerCarName = ''
          // var oilCarName = ''
          // var state1 = ''
          // var state2 = ''
          // var state3 = ''
          // var state4 = ''
            self.$http.all([
              self.$http.get('api/mix/d0049?btsId=' + this.listData[i].NE_ID),
              self.$http.get('api/mix/d0050?btsId=' + this.listData[i].NE_ID),
              self.$http.get('api/mix/d0051?btsId=' + this.listData[i].NE_ID),
              self.$http.get('api/mix/d0057?btsId=' + this.listData[i].NE_ID)
            ])
              .then(self.$http.spread((res1, res2, res3, res4) => {
                var wirelessName = ''
                var transName = ''
                var emerCarName = ''
              // wirelessName = res1.data.data.length !== 0 && res1.data.data[0].USER_NAME_W ? res1.data.data[0].USER_NAME_W : '无'
              // transName = res2.data.data.length !== 0 && res2.data.data[0].USER_NAME_T ? res2.data.data[0].USER_NAME_T : '无'
              // emerCarName = res3.data.data.length !== 0 && res3.data.data[0].VEHICLEID ? res3.data.data[0].VEHICLEID : '无'
                if (res1.data.data.length !== 0) {
                  res1.data.data.forEach((item) => {
                    wirelessName += item.USER_NAME_W + '、'
                  })
                }
                if (res2.data.data.length !== 0) {
                  res2.data.data.forEach((item) => {
                    transName += item.USER_NAME_T + '、'
                  })
                }
                if (res3.data.data.length !== 0) {
                  res3.data.data.forEach((item) => {
                    emerCarName += item.VEHICLEID + '、'
                  })
                }
              // oilCarName = res4.data.data.length !== 0 && res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? res4.data.data[0].OILENGINE_CODE : '无'
              // state1 = res1.data.data.length !== 0 && res1.data.data[0].USER_NAME_W ? '已调度' : '未调度'
              // state2 = res2.data.data.length !== 0 && res2.data.data[0].USER_NAME_T ? '已调度' : '未调度'
              // state3 = res3.data.data.length !== 0 && res3.data.data[0].VEHICLEID ? '已调度' : '未调度'
              // state4 = res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? '已调度' : '未调度'
                this.dispatchData.push(wirelessName + transName + emerCarName)
                console.log(this.dispatchData)
              }));
          }
        })
      }
      if (this.indi === 'a1006' || this.indi === 'a1005') {
        this.tingdian = true
        this.tuifu = false
        var num = ''
        if (this.indi === 'a1006') {
          num = 201
        }
        if (this.indi === 'a1005') {
          num = 8104
        }
        self.$http.get('api/powerCut/powercut/id', {
          params: {
            areaId: this.areaId,
            neType: num
          }
        }).then((res) => {
        // this.$http.get('api/mix/' + this.indi + '?areaId=' + this.areaId).then((res) => {
        // this.listData = res.data.data;
          let validata = res.data.data
          for (let i = 0; i < validata.length; i++) {
            let items = validata[i]['INT_ID']
            console.log(items)
            var arr = []
            self.$http.get('api/powerCut/powercut/info', {
              params: {
                intId: items
              }
            }).then((res) => {
              // console.log(res.data.data)
              arr.push(res.data.data[0])
            })
          }
          this.listData = arr
          console.log(this.listData)
          for (let i = 0; i < this.listData.length; i++) {
            this.switchPop = false
          // var wirelessName = ''
          // var transName = ''
          // var emerCarName = ''
          // var oilCarName = ''
          // var state1 = ''
          // var state2 = ''
          // var state3 = ''
          // var state4 = ''
            self.$http.all([
              self.$http.get('api/mix/d0049?btsId=' + this.listData[i].INT_ID),
              self.$http.get('api/mix/d0050?btsId=' + this.listData[i].INT_ID),
              self.$http.get('api/mix/d0051?btsId=' + this.listData[i].INT_ID),
              self.$http.get('api/mix/d0057?btsId=' + this.listData[i].INT_ID)
            ])
              .then(self.$http.spread((res1, res2, res3, res4) => {
                var wirelessName = ''
                var transName = ''
                var emerCarName = ''
                var oilCarName = ''
              // wirelessName = res1.data.data.length !== 0 && res1.data.data[0].USER_NAME_W ? res1.data.data[0].USER_NAME_W : '无'
              // transName = res2.data.data.length !== 0 && res2.data.data[0].USER_NAME_T ? res2.data.data[0].USER_NAME_T : '无'
              // emerCarName = res3.data.data.length !== 0 && res3.data.data[0].VEHICLEID ? res3.data.data[0].VEHICLEID : '无'
                if (res1.data.data.length !== 0) {
                  res1.data.data.forEach((item) => {
                    wirelessName += item.USER_NAME_W + '、'
                  })
                }
                if (res2.data.data.length !== 0) {
                  res2.data.data.forEach((item) => {
                    transName += item.USER_NAME_T + '、'
                  })
                }
                if (res3.data.data.length !== 0) {
                  res3.data.data.forEach((item) => {
                    emerCarName += item.VEHICLEID + '、'
                  })
                }
                if (res4.data.data.length !== 0) {
                  res4.data.data.forEach((item) => {
                    oilCarName += item.OILENGINE_CODE + '、'
                  })
                }
              // oilCarName = res4.data.data.length !== 0 && res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? res4.data.data[0].OILENGINE_CODE : '无'
              // state1 = res1.data.data.length !== 0 && res1.data.data[0].USER_NAME_W ? '已调度' : '未调度'
              // state2 = res2.data.data.length !== 0 && res2.data.data[0].USER_NAME_T ? '已调度' : '未调度'
              // state3 = res3.data.data.length !== 0 && res3.data.data[0].VEHICLEID ? '已调度' : '未调度'
              // state4 = res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? '已调度' : '未调度'
                this.dispatchData.push(wirelessName + transName + emerCarName + oilCarName)
                console.log(this.dispatchData)
              }));
          }
        }).catch((error) => {
          console.log('indicator has error', error);
        })
      }
    }
  },
  watch: {},
  components: {
  },
  beforeDestroy() { }
}
</script>
