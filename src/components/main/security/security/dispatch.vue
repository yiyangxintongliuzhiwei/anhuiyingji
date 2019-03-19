<template>
      <div class='emer-dispatch'>
         <div class='closePopBtn' @click='closePop'>X</div>
         <div class="content">
          <div>
            <div class="title">基站调度</div>
            <div class='siteinfo'>
              <div class='table-head'>
                <span>基站名称</span>
                <span>基站位置</span>
                <span>网元类型</span>
                <span>厂商</span>
                <span>退服时间</span>
                <span>退服原因</span>
              </div>
              <div v-show="tingdian">
                <span :title='dispatchSiteInfo.ZH_LABEL'>{{dispatchSiteInfo.ZH_LABEL}}}</span>
                <span>{{dispatchSiteInfo.SMALL_TOWNS}}</span>
                <span>{{dispatchSiteInfo.LEIXING}}</span>
                <span>{{dispatchSiteInfo.CHANGJIA}}</span>
                <span :title='dispatchSiteInfo.EVENT_TIME'>{{dispatchSiteInfo.EVENT_TIME}}</span>
                <span>{{dispatchSiteInfo.ALARM_TITLE_TEXT}}</span>
              </div>
              <div v-show="tuifu">
                <span :title='dispatchSiteInfo.BTSNAME'>{{dispatchSiteInfo.BTSNAME}}}</span>
                <span>{{dispatchSiteInfo.TOWNINFO}}</span>
                <span>{{dispatchSiteInfo.SITE_TYPE}}</span>
                <span>{{dispatchSiteInfo.VENDER}}</span>
                <span :title='dispatchSiteInfo.EVENTSTIME'>{{dispatchSiteInfo.EVENTSTIME}}</span>
                <span>{{dispatchSiteInfo.TITLETEXT}}</span>
              </div>
            </div>
            <div class='tab-div'>
              <span :class='{activeSpan:emerIndex===1}' @click='changeEmer(1)'>无线人员</span>
              <span :class='{activeSpan:emerIndex===2}' @click='changeEmer(2)'>传输人员</span>
              <span :class='{activeSpan:emerIndex===3}' @click='changeEmer(3)'>应急车</span>
            </div>
            <div class='dispatch-content'>
              <div>
                <div class='choose-div'>
                  <span :class='{activeChoose:conditionIndex===1}' @click='changeCondition(1)'>全部人员</span>
                  <span :class='{activeChoose:conditionIndex===2}' @click='changeCondition(2)'>空闲人员</span>
                </div>
                <!-- <div class='fuzzyDiv'>
                  <input type="text" placeholder="模糊匹配" class="fuzzy-input">
                </div> -->
                <div class='result-box'>
                  <span  v-if="checkArr1[index]" :class='{activeSpan:checkArr1[index].flag}' class='result-item' v-for='(item,index) in dispatchResult1' @click='chooseItem1(item,index)'>{{item.USER_NAME?item.USER_NAME:item.VEHICLEID}}{{conditionIndex==1?(item.TASKNUM?'(已调度)':'(空闲)'):''}}</span>
                  <span  v-if="checkArr2[index]" :class='{activeSpan:checkArr2[index].flag}' class='result-item' v-for='(item,index) in dispatchResult2' @click='chooseItem2(item,index)'>{{item.USER_NAME?item.USER_NAME:item.VEHICLEID}}{{conditionIndex==1?(item.TASKNUM?'(已调度)':'(空闲)'):''}}</span>
                  <span  v-if="checkArr3[index]" :class='{activeSpan:checkArr3[index].flag}' class='result-item' v-for='(item,index) in dispatchResult3' @click='chooseItem3(item,index)'>{{item.USER_NAME?item.USER_NAME:item.VEHICLEID}}{{conditionIndex==1?(item.TASKNUM?'(已调度)':'(空闲)'):''}}</span>
                </div>
              </div>
              <!-- <div class='dispatch-gis'>
              </div> -->
            </div>
            <div class='dispatchConfirm' @click='doDispatch()'>
              安排人员调度
            </div>
          </div>
         </div>
      </div>
</template>
<script>
let emerCar = require('../../../../assets/img/security/comunicationCar.png')
let transPerson = require('../../../../assets/img/security/transPerson.png')
let lineLessPerson = require('../../../../assets/img/security/lineLessPerson.png')
export default {
  props: ['dispatchSiteInfo'],
  data() {
    return {
      switchPop: true,
      tingdian: false,
      tuifu: false,
      map: null,
      infoWindow: '',
      emerIndex: 1,
      conditionIndex: 1,
      queryType: '全部人员',
      popup: L.popup({ closeButton: false, className: 'gis-popup' }),
      type: ['XX', 'c11', 'c12', 'c07'],
      lcf: {
        'c07': {
          'markerArr': {},
          'flag': false,
          'icon': emerCar,
          'z_index': 600,
          'layer': null,
          'dataId': 'd0045',
          'data': [],
          'name': '传输中断'
        },
        'c11': {
          'markerArr': {},
          'flag': false,
          'icon': lineLessPerson,
          'z_index': 600,
          'layer': null,
          'dataId': 'd0040',
          'data': [],
          'name': '二干光缆中断'
        },
        'c12': {
          'markerArr': {},
          'flag': false,
          'icon': transPerson,
          'z_index': 600,
          'layer': null,
          'dataId': 'd0041',
          'data': [],
          'name': '二干光缆中断'
        }
      },
      dispatchResult1: ['陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三'],
      dispatchResult2: ['陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三'],
      dispatchResult3: ['陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三', '陈五三'],
      checkArr1: [{ flag: false }],
      checkArr2: [{ flag: false }],
      checkArr3: [{ flag: false }],
      chooseList1: [],
      chooseList2: [],
      chooseList3: []
    }
  },
  mounted() {
    // this.initMap()
    this.changeEmer(1)
    console.log(this.dispatchSiteInfo)
    if (this.dispatchSiteInfo.hasOwnProperty('ZH_LABEL')) {
      this.tuifu = false
      this.tingdian = true
    } else {
      this.tindian = false
      this.tuifu = true
    }
  },
  methods: {
    closePop() {
      this.$emit('POPDOWN', '')
    },
    changeEmer(index) {
      // this.conditionIndex = 1
      this.emerIndex = index
      // this.map.clearOverlays()
      // this.map.clearLayers()
      this.dispatchResult1 = []
      this.dispatchResult2 = []
      this.dispatchResult3 = []
      // let arr = ['c07', 'c11', 'c12'];
      // for (let i = 0; i < arr.length; i++) {
      //   // console.log(this.lcf[arr[i]])
      //   if (this.lcf[arr[i]]['layer']) {
      //     this.lcf[arr[i]]['layer'].clearLayers()
      //   }
      // }
      if (index === 1) {
        if (this.queryType === '全部人员') {
          this.$http.get('api/mix/d0046')
            .then((res) => {
              this.dispatchResult1 = res.data.data
              // this.checkArr = []
              // this.createGisMarker(this.type[this.emerIndex], this.dispatchResult1)
              this.dispatchResult1.forEach((item) => {
                this.checkArr1.push({ flag: false })
              })
            })
        } else {
          this.$http.get('api/mix/d0046')
            .then((res) => {
              if (res.data.data.length !== 0) {
                res.data.data.forEach(item => {
                  if (item.TASKNUM === 0) {
                    this.dispatchResult1.push(item)
                  }
                })
              }
              // this.createGisMarker(this.type[this.emerIndex], this.dispatchResult1)
              // this.checkArr = []
              this.dispatchResult1.forEach((item) => {
                this.checkArr1.push({ flag: false })
              })
            })
        }
      } else if (index === 2) {
        if (this.queryType === '全部人员') {
          this.$http.get('api/mix/d0047')
            .then((res) => {
              this.dispatchResult2 = res.data.data
              // this.createGisMarker(this.type[this.emerIndex], this.dispatchResult2)
              // this.checkArr = []
              this.dispatchResult2.forEach((item) => {
                this.checkArr2.push({ flag: false })
              })
            })
        } else {
          this.$http.get('api/mix/d0047')
            .then((res) => {
              if (res.data.data.length !== 0) {
                res.data.data.forEach(item => {
                  if (item.TASKNUM === 0) {
                    this.dispatchResult2.push(item)
                  }
                })
              }
              // this.createGisMarker(this.type[this.emerIndex], this.dispatchResult2)
              // this.checkArr = []
              this.dispatchResult2.forEach((item) => {
                this.checkArr2.push({ flag: false })
              })
            })
        }
      } else if (index === 3) {
        if (this.queryType === '全部人员') {
          this.$http.get('api/mix/d0048')
            .then((res) => {
              this.dispatchResult3 = res.data.data
              // this.createGisMarker(this.type[this.emerIndex], this.dispatchResult3)
              // this.checkArr = []
              this.dispatchResult3.forEach((item) => {
                this.checkArr3.push({ flag: false })
              })
            })
        } else {
          this.$http.get('api/mix/d0048')
            .then((res) => {
              if (res.data.data.length !== 0) {
                res.data.data.forEach(item => {
                  if (item.TASKNUM === 0) {
                    this.dispatchResult3.push(item)
                  }
                })
              }
              // this.createGisMarker(this.type[this.emerIndex], this.dispatchResult3)
              // this.checkArr = []
              this.dispatchResult3.forEach((item) => {
                this.checkArr3.push({ flag: false })
              })
            })
        }
      }
    },
    changeCondition(index) {
      this.conditionIndex = index
      if (index === 1) {
        this.queryType = '全部人员'
      } else {
        this.queryType = '空闲人员'
      }
      this.changeEmer(this.emerIndex)
    },
    chooseItem1(item, index) {
      this.$nextTick(() => {
        this.checkArr1[index].flag = !this.checkArr1[index].flag
        if (this.checkArr1[index].flag) {
          this.chooseList1.push(item)
          // this.map.centerAndZoom(new BMap.Point(item.BAIDULONGITUDE, item.BAIDULATITUDE), 10)
          // this.map.setView([item.BAIDULATITUDE, item.BAIDULONGITUDE], 10)
        }
      })
    },
    chooseItem2(item, index) {
      this.$nextTick(() => {
        this.checkArr2[index].flag = !this.checkArr2[index].flag
        if (this.checkArr2[index].flag) {
          this.chooseList2.push(item)
          // this.map.centerAndZoom(new BMap.Point(item.BAIDULONGITUDE, item.BAIDULATITUDE), 10)
          // this.map.setView([item.BAIDULATITUDE, item.BAIDULONGITUDE], 10)
        }
      })
    },
    chooseItem3(item, index) {
      this.$nextTick(() => {
        this.checkArr3[index].flag = !this.checkArr3[index].flag
        if (this.checkArr3[index].flag) {
          this.chooseList3.push(item)
          // this.map.centerAndZoom(new BMap.Point(item.BAIDULONGITUDE, item.BAIDULATITUDE), 10)
          // this.map.setView([item.BAIDULATITUDE, item.BAIDULONGITUDE], 10)
        }
      })
    },
    doDispatch() {
      console.log(this.chooseList1)
      console.log(this.chooseList2)
      console.log(this.chooseList3)
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      this.chooseList1.forEach((item) => {
        arr1.push({
          'userId': item.USER_ID,
          'userName': item.USER_NAME,
          'mobile': item.MOBILE
        })
      })
      this.chooseList2.forEach((item) => {
        arr2.push({
          'userId': item.USER_ID,
          'userName': item.USER_NAME,
          'mobile': item.MOBILE
        })
      })
      this.chooseList3.forEach((item) => {
        arr3.push({
          'userId': item.USER_ID,
          'userName': item.USER_NAME,
          'mobile': item.MOBILE
        })
      })
      if (this.chooseList1.length !== 0 || this.chooseList2.length !== 0 || this.chooseList3.length !== 0) {
        this.$http.post('api/dispatch/tempTask', {
          'btsName': this.dispatchSiteInfo.BTSNAME,
          'btsNumber': this.dispatchSiteInfo.NE_ID,
          'deptName': '测试部门',
          'faultReason': this.dispatchSiteInfo.TITLETEXT,
          'remark': this.dispatchSiteInfo.TITLETEXT,
          'sendContact': sessionStorage.getItem('PHONE'),
          // 'sendDeptId': sessionStorage.getItem('GROUP_NAME'),
          'sendUserId': sessionStorage.getItem('USER_ID'),
          'wirelessList': arr1,
          'tranList': arr2,
          'carList': arr3
        }).then((res) => {
          if (res.data.msg === 'success') {
            this.$message({
              type: 'success',
              message: '调度成功'
            })
            this.$emit('sucessDispatch', this.dispatchSiteInfo.NE_ID)
          } else {
            this.$message({
              type: 'info',
              message: '调度失败'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '请求错误'
          })
        })
      }
    },
    // 基站以及调度资源打点
    createMarker(type, validData) {
      let myConfig = this.lcf[type]
      let self = this
      // 获取数据配置
      let iconUrl = myConfig['icon']
      // let zIndex = myConfig['z_index']
      // console.log(validData)
      let icon = new BMap.Icon(iconUrl, new BMap.Size(36, 35), { imageSize: new BMap.Size(36, 35) })
      if (type === 'c07' || type === 'c08' || type === 'c09' || type === 'c10' || type === 'c11' || type === 'c12') {
        // icon = new BMap.Icon(iconUrl, new BMap.Size(25, 25), { imageSize: new BMap.Size(25, 25) })
      }
      for (let i = 0; i < validData.length; i++) {
        let item = validData[i]
        let point = new BMap.Point(
          validData[i]['LONGITUDE'] ? validData[i]['LONGITUDE'] : validData[i]['BAIDULONGITUDE'],
          validData[i]['LATITUDE'] ? validData[i]['LATITUDE'] : validData[i]['BAIDULATITUDE']
        )
        let marker = new BMap.Marker(point, { icon: icon })
        marker['type'] = type;
        myConfig['layer'].push(marker)
        this.map.addOverlay(marker)
        marker.addEventListener('click', function(e) {
          // console.log(sContent)
          // let type = e.target.type;
          let sContent = null
          if (type === 'c07') {
            sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
              <div class="base-info2">
                <div>车牌：    ${item.VEHICLEID}</div>
                <div>车型：    ${item.VEHICLEMODEL}</div>
                <div title="${item.LOCATIONADDRESS}">位置：    ${item.LOCATIONADDRESS}</div>
              </div>
              </div ></div>`
            self.infoWindow.setContent(sContent)
            this.openInfoWindow(self.infoWindow, new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat))
          } else if (type === 'c11' || type === 'c12') {
            sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
              <div class="base-info2">
                <div style='width:150px'>姓名：    ${item.USER_NAME}</div>
                <div>电话号码：    ${item.MOBILE}</div>
                <div style='width:150px'>类型：    ${item.TYPE_NAME}</div>
                <div title="${item.LOCATIONADDRESS}">位置：    ${item.LOCATIONADDRESS}</div>
              </div>
              </div ></div>`
            self.infoWindow.setContent(sContent)
            this.openInfoWindow(self.infoWindow, new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat))
          }
        })
      }
    },
    createGisMarker(type, validData) {
      let myConfig = this.lcf[type]
      if (!myConfig['layer']) {
        myConfig['layer'] = L.layerGroup().addTo(this.map)
      }
      // myConfig['layer'].clearLayers()
      let self = this
      // 获取数据配置
      let iconUrl = myConfig['icon']
      // let zIndex = myConfig['z_index']
      // console.log(validData)
      let icon = L.icon({ iconUrl: iconUrl, iconSize: [36, 35] })
      if (type === 'c07' || type === 'c08' || type === 'c09' || type === 'c10' || type === 'c11' || type === 'c12') {
        icon = L.icon({ iconUrl: iconUrl, iconSize: [25, 25] })
      }
      for (let i = 0; i < validData.length; i++) {
        let item = validData[i]
        let marker = L.marker([validData[i]['LATITUDE'] ? validData[i]['LATITUDE'] : validData[i]['BAIDULATITUDE'], validData[i]['LONGITUDE'] ? validData[i]['LONGITUDE'] : validData[i]['BAIDULONGITUDE']], {
          icon: icon,
          // zIndexOffset: zIndex,
          attributes: {
            type: type
          }
        }).addTo(myConfig['layer'])
        // console.log(marker)
        let sContent;
        if (type === 'c02' || type === 'c05' || type === 'c03' || type === 'c06') {
          var wirelessName = ''
          var transName = ''
          var emerCarName = ''
          var state1 = ''
          var state2 = ''
          var state3 = ''
          self.$http.all([
            self.$http.get('api/mix/d0049?btsId=' + item.NE_ID),
            self.$http.get('api/mix/d0050?btsId=' + item.NE_ID),
            self.$http.get('api/mix/d0051?btsId=' + item.NE_ID)
          ])
            .then(self.$http.spread((res1, res2, res3) => {
              if (res1.data.data.length > 0 && res2.data.data.length > 0 && res3.data.data.length > 0) {
                wirelessName = res1.data.data[0].USER_NAME_W ? res1.data.data[0].USER_NAME_W : '无'
                transName = res2.data.data[0].USER_NAME_T ? res2.data.data[0].USER_NAME_T : '无'
                emerCarName = res3.data.data[0].VEHICLEID ? res3.data.data[0].VEHICLEID : '无'
                state1 = res1.data.data[0].USER_NAME_W ? '已调度' : '未调度'
                state2 = res2.data.data[0].USER_NAME_T ? '已调度' : '未调度'
                state3 = res3.data.data[0].VEHICLEID ? '已调度' : '未调度'
                sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
                                <div class="base-info">
                                  <div title="${item.BTSNAME}">基站名称：    ${item.BTSNAME}</div>
                                  <div>厂商：    ${item.VENDER}</div>
                                  <div>网元类型：    ${item.SITE_TYPE}</div>
                                  <div>所属乡镇：    ${item.COUNTYNAME}</div>
                                  <div>告警级别：    一级告警</div>
                                  <div>退服原因：    XXXX</div>
                                </div>
                                <div onclick="openDispatch(event)" class='dispatch-info'>
                                  <div>
                                    <span style="visibility:hidden">XXXX</span><span>无线人员</span><span>传输人员</span><span>通信车</span>
                                  </div>
                                  <div>
                                    <span>调度状态</span><span>${state1}</span><span>${state2}</span><span>${state3}</span>
                                  </div>
                                  <div>
                                    <span>保障详情</span><span>${wirelessName}</span><span>${transName}</span><span>${emerCarName}</span>
                                  </div>
                                </div>
                                </div ></div>`
              } else {
                sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
                                <div class="base-info">
                                  <div title="${item.BTSNAME}">基站名称：    ${item.BTSNAME}</div>
                                  <div>厂商：    ${item.VENDER}</div>
                                  <div>网元类型：    ${item.SITE_TYPE}</div>
                                  <div>所属乡镇：    ${item.COUNTYNAME}</div>
                                  <div>告警级别：    一级告警</div>
                                  <div>退服原因：    XXXX</div>
                                </div>
                                <div onclick="openDispatch(event)" class='dispatch-info'>
                                  <div>
                                    <span style="visibility:hidden">XXXX</span><span>无线人员</span><span>传输人员</span><span>通信车</span>
                                  </div>
                                  <div>
                                    <span>调度状态</span><span>未调度</span><span>未调度</span><span>未调度</span>
                                  </div>
                                  <div>
                                    <span>保障详情</span><span>无</span><span>无</span><span>无</span>
                                  </div>
                                </div>
                                </div ></div>`
              }
            }));
        } else if (type === 'c07') {
          sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
              <div class="base-info2">
                <div>车牌：    ${item.VEHICLEID}</div>
                <div>车型：    ${item.VEHICLEMODEL}</div>
                <div title="${item.LOCATIONADDRESS}">位置：    ${item.LOCATIONADDRESS}</div>
              </div>
              </div ></div>`
        } else if (type === 'c11' || type === 'c12') {
          sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
              <div class="base-info2">
                <div style='width:150px'>姓名：    ${item.USER_NAME}</div>
                <div>电话号码：    ${item.MOBILE}</div>
                <div style='width:150px'>类型：    ${item.TYPE_NAME}</div>
                <div title="${item.LOCATIONADDRESS}">位置：    ${item.LOCATIONADDRESS}</div>
              </div>
              </div ></div>`
        } else {
          sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
              <div class="base-info">
                <div title="${item.BTSNAME}">基站名称：    ${item.BTSNAME}</div>
                <div>厂商：    ${item.VENDER}</div>
                <div>网元类型：    ${item.SITE_TYPE}</div>
                <div>所属乡镇：    ${item.COUNTYNAME}</div>
              </div>
              </div ></div>`
        }
        marker.addEventListener('click', (obj) => {
          this.popup.setContent(sContent)
          this.popup.setLatLng(obj.latlng);
          this.popup.openOn(this.map);
          // document.getElementById('float-tips').innerHTML = sContent;
          // document.getElementsByClassName('gis-popup')[0].style.height = `${toolHeight}px`;
        });
        // marker.addEventListener('mouseout', () => {
        //   this.popup._close();
        //   // this.mcIndex = 0;
        // });
      }
    },
    initMap() {
      if (this.map) {
        return
      }
      var crs = new L.Proj.CRS(
        'EPSG:4326',
        '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
        {
          // origin: [-400, 400],
          resolutions: [
            0.014276766034981682, // Level 0
            0.011897305029151402, // Level 1
            0.007138383017490841, // Level 2
            0.00475892201166056, // Level 3
            0.00237946100583028, // Level 4
            0.00118973050291514, // Level 5
            3.5691915087454206E-4, // Level 6
            1.9035688046642243E-4, // Level 7
            1.1897305029151401E-4,  // Level 8
            2.3794610058302804E-5,  // Level 9
            1.1897305029151402E-5,  // Level 10
            7.138383017490841E-6,  // Level 11
            4.75892201166056E-6,  // Level 12
            2.37946100583028E-6  // Level 13
          ]
        }
      )
      this.map = L.map(this.$el.children[1].children[0].children[3].children[1], {
        attributionControl: false,
        zoomControl: false,
        crs: crs,
        tileSize: 256,
        layers: L.tileLayer('http://10.225.61.237:13398/arcgis/rest/services/gismap/anhuiAll/MapServer/tile/{z}/{y}/{x}')
      }).setView([31.86, 117.28], 8);
      // 加载arcgis 瓦片
      // L.esri.tiledMapLayer(
      //   { url: 'http://10.225.61.237:13398/arcgis/rest/services/gismap/anhuiAll/MapServer' }).addTo(this.map);
      // this.map = new BMap.Map(this.$el.children[1].children[0].children[3].children[1], { enableMapClick: false })
      // this.map.setMapStyle({ styleJson: styleJson })
      // this.map.centerAndZoom(new BMap.Point(117.28, 31.86), 7)
      // this.map.enableScrollWheelZoom(true)
      // this.infoWindow = new BMap.InfoWindow('', { enableMessage: false })
    },
    clearMarker(type) {
      if (this.lcf[type]['layer'].length > 0) {
        for (let i in this.lcf[type]['layer']) {
          this.map.removeOverlay(this.lcf[type]['layer'][i])
        }
        this.lcf[type]['layer'] = []
      }
    },
    clearLayer(type) {
      let myConfig = this.lcf[type];
      if (myConfig['layer']) {
        try {
          myConfig['layer'].clearLayers();
        } catch (e) {
          myConfig['layer'].onRemove(this.map);
          myConfig['layer'] = null;
        }
      }
      // if (myConfig['markerArr']) {
      //   myConfig['markerArr'] = {};
      // }
    }
  },
  watch: {},
  components: {
  },
  beforeDestroy() { }
}
</script>
