<template>
  <div class="demo-warp">
     <div class='map-div'></div>
     <div class='legend-div'>
       <div class='legend-border'>
        <div>图例</div>
        <div>
          <div>GSM正常基站</div>
          <div>GSM退服基站</div>
          <div>GSM停电基站</div>
          <div>LTE正常基站</div>
          <div>LTE退服基站</div>
          <div>LTE停电基站</div>
        </div>
       </div>
     </div>
     <div class='siteStatistics'>
       <div class='siteStatistics-border'>
        <div>
         <div>GSM基站</div>
         <div><span>11</span><span>/</span><span>220</span></div>
       </div>
      <div>
         <div>LTE基站</div>
         <div><span>11</span><span>/</span><span>220</span></div>
       </div>
      <div>
         <div>GSM小区</div>
         <div><span>11</span><span>/</span><span>220</span></div>
       </div>
      <div>
         <div>LTE小区</div>
         <div><span>11</span><span>/</span><span>220</span></div>
       </div>
     </div>
    </div>
    <select class='area-select'>
          <option value="全省">全省</option>
          <option value="长江淮河流域">长江淮河流域</option>
          <option value="合肥火车站">合肥火车站</option>
          <option value="合肥机场">合肥机场</option>
    </select>
    <div class='infoBack'>
      <div class='infoBack-border'>
        <ul class='info-man-list'>
          <li>张三</li>
          <li>张三</li>
          <li>张三</li>
          <li>张三</li>
          <li>张三</li>
        </ul>
        <div class='info-back'>
          <div>回传信息</div>
          </div>
        <div class='text-back'>
          <div>回传文本</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './security.less'
import styleJson from './style.js'
let g2Site = require('../../../assets/img/security/j2.png')
let g2SiteOff = require('../../../assets/img/security/2G_X.png')
let g2SiteEle = require('../../../assets/img/security/2G_Y.png')
let g4Site = require('../../../assets/img/security/j1.png')
let g4SiteOff = require('../../../assets/img/security/4G_X.png')
let g4SiteEle = require('../../../assets/img/security/4G_Y.png')
let emerCar = require('../../../assets/img/security/comunicationCar.png')
let oilCar = require('../../../assets/img/security/oilCar.png')
let repairCar = require('../../../assets/img/security/repairCar.png')
let satelitePhone = require('../../../assets/img/security/satelitePhone.png')
let transPerson = require('../../../assets/img/security/transPerson.png')
let lineLessPerson = require('../../../assets/img/security/lineLessPerson.png')
export default {
  props: ['int', 'titleActionIndex'],
  data() {
    return {
      mapIndex: '',
      map: null,
      infoWindow: '',
      indexToIndi: {
        '0_0_0': 'c01',
        '0_0_1': 'c02',
        '0_0_2': 'c03',
        '0_1_0': 'c04',
        '0_1_1': 'c05',
        '0_1_2': 'c06',
        '1_0_0': 'c07',
        '1_0_1': 'c08',
        '1_0_2': 'c09',
        '1_0_3': 'c10',
        '1_0_4': 'c11',
        '1_1_0': 'c12',
        '2_0_0': 'c13',
        '2_0_1': 'c14',
        '2_1': 'c15',
        '2_2': 'c16'
      },
      lcf: {
        'c01': {
          'markerArr': {},
          'flag': false,
          'icon': g2Site,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'siteType': '201',
          'data': [],
          'name': '2G基站'
        },
        'c02': {
          'markerArr': {},
          'flag': false,
          'icon': g2SiteOff,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'siteType': '9201',
          'data': [],
          'name': '4G基站'
        },
        'c03': {
          'markerArr': {},
          'flag': false,
          'icon': g2SiteEle,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'siteType': '8104',
          'data': [],
          'name': '4G退服基站'
        },
        'c04': {
          'markerArr': {},
          'flag': false,
          'icon': g4Site,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': 'VIP退服基站'
        },
        'c05': {
          'markerArr': {},
          'flag': false,
          'icon': g4SiteOff,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': '停电基站'
        },
        'c06': {
          'markerArr': {},
          'flag': false,
          'icon': g4SiteEle,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': '停电机房'
        },
        'c07': {
          'markerArr': {},
          'flag': false,
          'icon': emerCar,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': '传输中断'
        },
        'c08': {
          'markerArr': {},
          'flag': false,
          'icon': oilCar,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': '应急车'
        },
        'c09': {
          'markerArr': {},
          'flag': false,
          'icon': repairCar,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': '二干光缆中断'
        },
        'c10': {
          'markerArr': {},
          'flag': false,
          'icon': satelitePhone,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': '二干光缆中断'
        },
        'c11': {
          'markerArr': {},
          'flag': false,
          'icon': lineLessPerson,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': '二干光缆中断'
        },
        'c12': {
          'markerArr': {},
          'flag': false,
          'icon': transPerson,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': '二干光缆中断'
        },
        'c13': {
          'markerArr': {},
          'flag': false,
          'icon': transPerson,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': '二干光缆中断'
        },
        'c14': {
          'markerArr': {},
          'flag': false,
          'icon': transPerson,
          'z_index': 600,
          'layer': [],
          'dataId': 'd0042',
          'data': [],
          'name': '二干光缆中断'
        },
        'c15': {
          'markerArr': {},
          'flag': false,
          'icon': transPerson,
          'z_index': 600,
          'layer': [],
          'dataId': 't0001',
          'data': [],
          'name': '二干光缆中断'
        },
        'c16': {
          'markerArr': {},
          'flag': false,
          'icon': transPerson,
          'z_index': 600,
          'layer': [],
          'dataId': 'd0039',
          'data': [],
          'name': '二干光缆中断'
        }
      },
      geoCoordMap: {
        '合肥': [117.37, 31.986],
        '六安': [116.27, 31.786],
        '滁州': [118.07, 32.486],
        '蚌埠': [117.27, 33.086],
        '淮南': [116.67, 32.786],
        '宿州': [117.77, 33.486],
        '淮北': [116.67, 33.686],
        '亳州': [116.27, 33.386],
        '阜阳': [115.57, 32.986],
        '安庆': [116.47, 30.486],
        '池州': [117.47, 30.386],
        '黄山': [118.17, 29.886],
        '宣城': [119.27, 30.916],
        '芜湖': [118.17, 31.186],
        '马鞍山': [118.47, 31.616],
        '铜陵': [117.87, 30.956]
      }
    }
  },
  mounted() {
    this.initMap()
    this.loadMapData('c01')
  },
  watch: {
    titleActionIndex(val) {
      this.changeIndi(val)
    }
  },
  methods: {
    showInfoBackImg(item) {
      this.infoBackImgIndex = item;
    },
    decode(json) {
      if (!json.UTF8Encoding) {
        return json
      }
      let features = json.features
      for (let f = 0; f < features.length; f++) {
        let feature = features[f]
        let coordinates = feature.geometry.coordinates
        let encodeOffsets = feature.geometry.encodeOffsets
        for (let c = 0; c < coordinates.length; c++) {
          let coordinate = coordinates[c]
          if (feature.geometry.type === 'Polygon') {
            coordinates[c] = this.decodePolygon(coordinate, encodeOffsets[c])
          } else if (feature.geometry.type === 'MultiPolygon') {
            for (let c2 = 0; c2 < coordinate.length; c2++) {
              let polygon = coordinate[c2]
              coordinate[c2] = this.decodePolygon(polygon, encodeOffsets[c][c2])
            }
          }
        }
      }
      json.UTF8Encoding = false
      return json
    },
    decodePolygon(coordinate, encodeOffsets) {
      let result = []
      let prevX = encodeOffsets[0]
      let prevY = encodeOffsets[1]
      for (let i = 0; i < coordinate.length; i += 2) {
        let x = coordinate.charCodeAt(i) - 64
        let y = coordinate.charCodeAt(i + 1) - 64
        x = (x >> 1) ^ -(x & 1)
        y = (y >> 1) ^ -(y & 1)
        x += prevX
        y += prevY
        prevX = x
        prevY = y
        result.push([x / 1024, y / 1024])
      }
      return result
    },
    removeSameLatLon(latLon) {
      if (!latLon || latLon.length === 0) {
        return
      }
      function newCroObj(obj) {
        let item = {}
        for (let p in obj) {
          item[p] = obj[p]
        }
        return item
      }
      let latLonArray = []
      for (let item of latLon) {
        latLonArray.push(newCroObj(item))
      }
      let result = [latLonArray[latLonArray.length - 1]]
      let tempObj = result[result.length - 1]
      for (let i = latLonArray.length - 1; i > -1; i--) {
        let obj = latLonArray[i]
        if (
          tempObj.LATITUDE === obj.LATITUDE &&
          tempObj.LONGITUDE === obj.LONGITUDE
        ) {
          latLonArray.splice(i, 1)
        }
        if (i === 0) {
          i = latLonArray.length
          if (i === 0) {
            break
          }
          result.push(latLonArray[latLonArray.length - 1])
          tempObj = result[result.length - 1]
        }
      }
      return result
    },
    closePop() {
      this.switchPop = ''
    },
    changeContent(str, flag) {
      this.titleActionIndex = str
      this.changeIndi(str)
    },
    changeUndispatchList(index) {
      this.UndispatchListIndex = index
    },
    initMap() {
      if (this.map) {
        return
      }
      this.map = new BMap.Map(this.$el.children[1].children[0].children[0], { enableMapClick: false })
      this.map.setMapStyle({ styleJson: styleJson })
      this.map.centerAndZoom(new BMap.Point(117.28, 31.86), 8)
      this.map.enableScrollWheelZoom(true)
      this.infoWindow = new BMap.InfoWindow('', { enableMessage: false })
      window.closeInfoWindow = () => {
        this.map.closeInfoWindow()
      }
      window.openDispatch = (event) => {
        this.switchPop = true;
        event.stopPropagation()
      }
    },
    changeIndi(val) {
      // this.clearMapData()
      if (val !== '0_1' && val !== '0_1_close' && val !== '0_2' && val !== '0_2_close' && val !== '1_0' && val !== '1_0_close' && val !== '1_1' && val !== '1_1_close' && val !== '1_2' && val !== '1_2_close' && val !== '2_0' && val !== '2_0_close') {
        if (val.endsWith('_close')) {
          this.clearMarker(this.indexToIndi[val.substring(0, val.length - 6)])
        } else {
          this.loadMapData(this.indexToIndi[val])
        }
      }
    },
    // 数据查询
    loadData(indi, callback) {
      this.$http.get('api/mix/' + indi).then((res) => {
        if (!res.data || !res.data.data || res.data.data.length <= 0) {
          return;
        }
        callback(res.data.data);
      }).catch((error) => {
        console.log(`${indi} indicator has error`, error);
      });
    },
    loadSiteNumData() {
      this.loadData('a1004', (result) => {
        this.gsmNum.val1 = result[0].KPI_VALUE1
        this.gsmNum.val2 = result[0].KPI_VALUE2
      })
      this.loadData('a1003', (result) => {
        this.lteNum.val1 = result[0].KPI_VALUE1
        this.lteNum.val2 = result[0].KPI_VALUE2
      })
      this.loadData('a1011', (result) => {
        this.gsmCellNum.val1 = result[0].KPI_VALUE1
        this.gsmCellNum.val2 = result[0].KPI_VALUE2
      })
      this.loadData('a1012', (result) => {
        this.lteCellNum.val1 = result[0].KPI_VALUE1
        this.lteCellNum.val2 = result[0].KPI_VALUE2
      })
    },
    loadMapData(type) {
      if (type === 'c01') {
        this.$http.get('api/mix/d0052?neId=201&areaId=-1377635857').then((res) => {
          let data = res.data.data;
          this.createMarker(type, data)
        }).catch((error) => {
          console.log('indicator has error', error);
        })
      } else if (type === 'c04') {
        this.$http.get('api/mix/d0052?neId=8104&areaId=-1377635857').then((res) => {
          let data = res.data.data;
          this.createMarker(type, data)
        }).catch((error) => {
          console.log('indicator has error', error);
        })
      } else {
        this.$http.get('api/mix/' + this.lcf[type].dataId).then((res) => {
          if (res.data && res.data.data) {
            let data = res.data.data;
            if (type === 'c13') {
              this.renderRainData(data)
            } else if (type === 'c01') {
              this.creatCollectionPoints(type, data)
            } else if (type === 'c04') {
              this.creatCollectionPoints(type, data)
            } else if (type === 'c14') {
              this.renderWeatherData(type, data)
            } else if (type === 'c15') {
              this.renderTyphooneData(data)
            } else if (type === 'c16') {
              this.renderEarthquake(data)
            } else {
              this.createMarker(type, data)
            }
          }
        }).catch((error) => {
          console.log(`${this.lcf[type].dataId} indicator has error`, error);
        })
      }
    },
    creatCollectionPoints(type, validData) {
      let self = this
      this.clearMapData()
      if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
        var points = [];  // 添加海量点数据
        for (var i = 0; i < validData.length; i++) {
          let point = null
          point = new BMap.Point(validData[i]['LONGITUDE'], validData[i]['LATITUDE'])
          point.siteData = validData[i]
          points.push(point);
        }
        var options = null
        if (type === 'c01') {
          options = {
            shape: BMAP_POINT_SHAPE_CIRCLE,
            color: '#3b7da0',
            size: BMAP_POINT_SIZE_SMALL
          }
        } else {
          options = {
            shape: BMAP_POINT_SHAPE_CIRCLE,
            color: '#0eec22',
            size: BMAP_POINT_SIZE_SMALL
          }
        }
        var pointCollection = new BMap.PointCollection(points, options)
        pointCollection.addEventListener('click', function(e) {
          // alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat)
          // console.log(e.point.siteData)
          let sContent = null
          sContent = '<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"><div class="base-info">' +
            '<div title="' + e.point.siteData.BTSNAME + '">基站名称：    ' + e.point.siteData.BTSNAME + '</div>' +
            '<div>厂商：    ' + e.point.siteData.VENDER + '</div>' +
            '<div>网元类型：    ' + e.point.siteData.NE_TYPE + '</div>' +
            '<div>所属乡镇：    ' + e.point.siteData.COUNTYNAME + '</div>' +
            '</div></div></div>'
          self.infoWindow.setContent(sContent)
          self.map.openInfoWindow(self.infoWindow, new BMap.Point(e.point.lng, e.point.lat))
        });
        this.lcf[type]['layer'].push(pointCollection)
        this.map.addOverlay(pointCollection)
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
        icon = new BMap.Icon(iconUrl, new BMap.Size(25, 25), { imageSize: new BMap.Size(25, 25) })
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
          self.dispatchSiteInfo = item
          let sContent = null
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
                                  <div>网元类型：    ${item.NE_TYPE}</div>
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
                                  <div>网元类型：    ${item.NE_TYPE}</div>
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
                self.infoWindow.setContent(sContent)
                this.openInfoWindow(self.infoWindow, new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat))
              }));
          } else if (type === 'c07') {
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
          } else {
            sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
              <div class="base-info">
                <div title="${item.BTSNAME}">基站名称：    ${item.BTSNAME}</div>
                <div>厂商：    ${item.VENDER}</div>
                <div>网元类型：    ${item.NE_TYPE}</div>
                <div>所属乡镇：    ${item.COUNTYNAME}</div>
              </div>
              </div ></div>`
            self.infoWindow.setContent(sContent)
            this.openInfoWindow(self.infoWindow, new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat))
          }
        })
      }
    },
    clearMarker(type) {
      if (type === 'c15') {
        this.typhooonFlag = false
        for (let i = 0; i < this.typhoonList.length; i++) {
          this.clearTyphoon(this.typhoonList[i])
        }
      } else {
        if (this.lcf[type]['layer'].length > 0) {
          for (let i in this.lcf[type]['layer']) {
            this.map.removeOverlay(this.lcf[type]['layer'][i])
          }
          this.lcf[type]['layer'] = []
        }
      }
    },
    // 雨量渲染
    renderRainData(data) {

    },
    // 天气渲染
    renderWeatherData(type, data) {
      let self = this
      this.clearMapData()
      this.getBoundary()
      let myConfig = this.lcf[type]
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        if (this.geoCoordMap[item.REGION_NAME]) {
          let point = new BMap.Point(
            (this.geoCoordMap[item.REGION_NAME])[0],
            (this.geoCoordMap[item.REGION_NAME])[1]
          )
          let iconUrl = require('../../../assets/img/security/weather/' + item.WEATHER_ALIAS + '.png')
          let icon = new BMap.Icon(iconUrl, new BMap.Size(40, 40), { imageSize: new BMap.Size(40, 40) })
          // console.log(icon)
          let marker = new BMap.Marker(point, { icon: icon })
          marker.addEventListener('mouseover', function(e) {
            let sContent = null
            sContent = '<div class="map-info-window"><div class="map-info-border"><div class="base-info2">' +
              '<div style="width:204px">时间：' + item.WEATHER_TIME + '</div>' +
              '<div style="width:170px">城市：' + item.REGION_NAME + '</div>' +
              '<div style="width:204px">天气：' + item.WEATHER_NAME + '</div>' +
              '<div>温度：' + item.WEATHER_WENDU + '</div>' +
              '</div></div></div>'
            self.infoWindow.setContent(sContent)
            this.openInfoWindow(self.infoWindow, new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat))
          })
          marker.addEventListener('mouseout', function(e, point) {
            self.map.closeInfoWindow()
          })
          myConfig['layer'].push(marker)
          this.map.addOverlay(marker)
        }
      }
    },
    getBoundary() {
      var bdary = new BMap.Boundary();
      let regions = ['合肥市', '六安市', '滁州市', '蚌埠市', '淮南市', '宿州市', '淮北市', '亳州市', '阜阳市', '安庆市', '池州市', '黄山市', '宣城市', '芜湖市', '马鞍山市', '铜陵市', '安徽省']
      regions.forEach((item) => {
        bdary.get(item, (rs) => {       // 获取行政区域
          // map.clearOverlays();        // 清除地图覆盖物
          var count = rs.boundaries.length; // 行政区域的点有多少个
          if (count === 0) {
            // alert('未能获取当前输入行政区域');
            return;
          }
          var pointArray = [];
          for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {
              strokeStyle: 'dashed',
              strokeWeight: 3,
              strokeColor: '#5c7699',
              fillColor: 'rgba(208,240,125,0.1)'
            }); // 建立多边形覆盖物
            this.map.addOverlay(ply);  // 添加覆盖物
            pointArray = pointArray.concat(ply.getPath());
          }
          if (item === '安徽省') {
            this.map.setViewport(pointArray);    // 调整视野
          }
          // addlabel();
        });
      })
    },
    // 地震渲染
    renderEarthquake(data) {
      this.clearMapData()
      this.map.centerAndZoom(new BMap.Point(104.08, 31.86), 5)
      let self = this
      let myConfig = this.lcf['c16']
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        if (item.EPI_LON > 0 && item.EPI_LAT > 0) {
          let point = new BMap.Point(item.EPI_LON, item.EPI_LAT)
          let marker = new BMap.Circle(point, 50000, {
            strokeColor: '#fc460f',
            fillColor: '#fc460f',
            strokeWeight: 2,
            strokeStyle: 'solid',
            strokeOpacity: 1,
            fillOpacity: 0.9
          });
          marker.addEventListener('mouseover', function(e, point) {
            let sContent = null
            sContent = '<div class="map-info-window"><div class="map-info-border"><div class="base-info2">' +
              '<b>地点：</b>' + item.LOCATION_C + '<br>' + '<b>经度：</b>' + item.EPI_LON + '<br>' + '<b>纬度：</b>' + item.EPI_LAT +
              '<br>' + '<b>震级：</b>' + item.M + '<br>' + '<b>深度：</b>' + item.EPI_DEPTH + '<br>' + '<b>地震时间：</b>' + item.SYNC_TIME +
              '</div></div></div>'
            self.infoWindow.setContent(sContent)
            self.map.openInfoWindow(self.infoWindow, new BMap.Point(this.getCenter().lng, this.getCenter().lat))
          })
          marker.addEventListener('mouseout', function(e, point) {
            self.map.closeInfoWindow()
          })
          myConfig['layer'].push(marker)
          this.map.addOverlay(marker)
        }
      }
    },
    renderTyphooneData(data) {
      this.typhooonFlag = true
      this.typhoonList = data
      for (let item of this.typhoonList) {
        item.flag = false;
        item.layer = []
        item.blastingLayer = []
        this.typhoonFlagList.push({ flag: false })
      }
    },
    chooseTyphoon(item, index) {
      this.$nextTick(() => {
        this.typhoonFlagList[index].flag = !this.typhoonFlagList[index].flag
        if (this.typhoonFlagList[index].flag) {
          this.$http.get('api/mix/d0038?codeList=' + item.TYPHOON_CODE).then((res) => {
            // console.log(res.data.data)
            if (res.data.data.length > 0) {
              this._addHistoryRoute(res.data.data, item);
            }
          })
        } else {
          clearInterval(item.intervalId2);
          clearInterval(item.intervalId);
          item.intervalId2 = null;
          item.intervalId = null;
          this.clearTyphoon(item)
          // this.map.removeOverlay()
          // item.layer.clearLayers();
          // item.blastingLayer.clearLayers();
          // this.typhoonInfoFlag = false;
        }
      })
    },
    _addHistoryRoute(data, item) {
      var result = this.dataDispose(data);
      let pointArr = result[0];
      // console.log(pointArr)
      let nowPosition = result[1];
      // let pointArr2 = result[2];
      // let landPosition = result[3];
      var oneI = 0;
      this.map.centerAndZoom(new BMap.Point(pointArr[oneI].LONGITUDE, pointArr[oneI].LATITUDE), 6)
      if (pointArr !== [null]) {
        this.addPolylineInflexion(pointArr[oneI], '#FF0', '#FDAC03', item);
        item.intervalId = setInterval(() => {
          this.clearBlastRing(item);
          let point1 = new BMap.Point(pointArr[oneI].LONGITUDE, pointArr[oneI].LATITUDE)
          let point2 = new BMap.Point(pointArr[oneI + 1].LONGITUDE, pointArr[oneI + 1].LATITUDE)
          var arr = [point1, point2];
          this.addPolyline(arr, '#FDE92A', item);
          this.addPolylineInflexion(pointArr[oneI + 1], '#FFE728', '#F0975B', item);
          this.addBlastRing(pointArr[oneI + 1], item, '历史台风圈');
          oneI++;
          console.log(oneI)
          if (oneI >= pointArr.length - 1) {
            this.clearBlastRing(item);
            clearInterval(item.intervalId);
            item.intervalId = null;
            this.addBlastRing(nowPosition, item);
            this.map.panTo(new BMap.Point(nowPosition.LONGITUDE, nowPosition.LATITUDE))
            // L.popup({
            //   autoClose: true,
            //   closeButton: false,
            //   className: 'gis-popup',
            //   pane: 'markerPane'
            // }).setLatLng([landPosition.LATITUDE, landPosition.LONGITUDE]).setContent('"' + landPosition.TYPHOON_NAME + '"' + '    ' +
            //   landPosition.TYPHOON_TIME_LABEL.split(' ')[0]).addTo(item.layer);
            // 预测位置打点
            // var twoI = 0;
            // if (pointArr2.length >= 2) {
            //   // this.addPolylineInflexion(pointArr2[twoI], '#588AF6', '#588AF6', item);
            //   item.intervalId2 = setInterval(() => {
            //     var arr2 = [
            //       new BMap.Point(pointArr2[twoI].LONGITUDE, pointArr2[twoI].LATITUDE),
            //       new BMap.Point(pointArr2[twoI + 1].LONGITUDE, pointArr2[twoI + 1].LATITUDE)
            //     ];
            //     this.addPolyline(arr2, 'red', item, '虚线');
            //     // this.addPolylineInflexion(pointArr2[twoI + 1], '#588AF6', '#588AF6', item);
            //     twoI++;
            //     if (twoI >= pointArr2.length - 1) {
            //       clearInterval(item.intervalId2);
            //       item.intervalId2 = null;
            //     }
            //   }, 80);
            // } else if (pointArr2.length === 1) {
            //   // this.addPolylineInflexion(pointArr2[0], '#588AF6', '#588AF6', item);
            // }
          }
        }, 100)
      }
    },
    addPolyline(polylineArray, color, item, str) {
      //  添加路径折线
      var dashArray = str ? 'dashed' : 'solid';
      console.log(polylineArray)
      let polyline = new BMap.Polyline(polylineArray, {
        strokeColor: '#3F6EC7',
        strokeStyle: dashArray,
        strokeWeight: 2,
        strokeOpacity: 1
      });
      item['layer'].push(polyline);
      this.map.addOverlay(polyline)
    },
    addPolylineInflexion(pointData, fillColor, color, item) {
      let self = this
      //  添加路径拐点
      let marker = new BMap.Circle(new BMap.Point(pointData.LONGITUDE, pointData.LATITUDE), 40000, {
        fillColor: '#DBE92C',
        strokeWeight: 1,
        strokeColor: '#B2C496',
        strokeOpacity: 1,
        fillOpacity: 0.8
      })
      item.layer.push(marker)
      this.map.addOverlay(marker)
      marker.addEventListener('mouseover', obj => {
        marker.setRadius(80000)
      })
      marker.addEventListener('mouseout', () => {
        marker.setRadius(40000)
      })
      marker.addEventListener('click', function(obj) {
        // let M = pointData.TYPHOON_TIME.substring(6, 7)
        // let D = pointData.TYPHOON_TIME.substring(8, 10)
        // let H = pointData.TYPHOON_TIME.substring(11, 13)
        // this.nowData.TIME_LABEL = pointData.TYPHOON_TIME.substring(6, 7)
        // this.nowData.TYPHOON_NUM = pointData.TYPHOON_NUM
        // this.nowData.TYPHOON_CODE = pointData.TYPHOON_CODE
        // this.nowData.NAME_CN = pointData.NAME_CN
        // this.nowData.TYPHOON_TIME_LABEL = M + '月' + D + '日' + H + '时'
        // this.nowData.CENTER_P =
        //   pointData.LONGITUDE + '°/' + pointData.LATITUDE + '°'
        // this.nowData.WIND_POWER = pointData.WIND_POWER
        // this.nowData.WIND_SPEED = pointData.WIND_SPEED
        // this.nowData.PRESSURE = pointData.PRESSURE
        // this.nowData.MOVE_SPEED = pointData.MOVE_SPEED
        // this.nowData.MOVE_DIRECTION = pointData.MOVE_DIRECTION
        // this.nowData.RADIUS7 = pointData.RADIUS7
        // this.nowData.RADIUS10 = pointData.RADIUS10
        // this.nowData.SN = pointData.SN
        let sContent = null
        sContent = `<div class="map-info-window"><div class="map-info-border"><div class="base-info2">
          <div>台风编号：${pointData.TYPHOON_CODE}</div>
          <div>台风名称：${pointData.TYPHOON_NAME}</div>
          <div title="${pointData.TYPHOON_TIME_LABEL}">时间：${pointData.TYPHOON_TIME_LABEL}</div>
          <div>台风中心：${pointData.LONGITUDE}°/${pointData.LATITUDE}°</div>
          <div>风力：${pointData.WIND_POWER}</div>
          <div>风速：${pointData.WIND_SPEED}</div>
          <div>气压：${pointData.PRESSURE}</div>
          <div>风向：${pointData.MOVE_DIRECTION}</div>
          <div>七级风圈：${pointData.RADIUS7}公里</div>
          <div>十级风圈：${pointData.RADIUS10}公里</div>
          </div></div></div>`
        self.infoWindow.setContent(sContent)
        self.map.openInfoWindow(self.infoWindow, new BMap.Point(this.getCenter().lng, this.getCenter().lat))
      })
    },
    addBlastRing(nowPosition, item, str) {
      //  添加飓风圈
      // var layer = str ? item['blastingLayer'] : item['layer']
      if (nowPosition != null) {
        var latLng = new BMap.Point(nowPosition.LONGITUDE, nowPosition.LATITUDE)
        let marker = new BMap.Circle(latLng, 200 * 1000, {
          fillColor: '#e62e52',
          strokeWeight: 1,
          strokeColor: '#e62e52',
          strokeOpacity: 0.4,
          fillOpacity: 0.4
        })
        item.blastingLayer.push(marker)
        this.map.addOverlay(marker)
        let iconUrl = require('../../../assets/img/security/typhoon.png')
        let icon = new BMap.Icon(iconUrl, new BMap.Size(40, 40), { imageSize: new BMap.Size(40, 40) })
        let marker1 = new BMap.Marker(latLng, { icon: icon })
        item.blastingLayer.push(marker1)
        this.map.addOverlay(marker1)
      }
    },
    dataDispose(ret) {
      var pointArr = [];
      var pointArr2 = [];
      var nowPosition = null;
      var landPosition = null;
      for (var x in ret) {
        if (ret[x].STATUS === 0) {
          pointArr.push(ret[x]);
        } else if (ret[x].STATUS === 1) {
          nowPosition = ret[x];
        } else if (ret[x].STATUS === 2) {
          if (ret[x].FORECAST_COUNTRY === '中国') {
            pointArr2.push(ret[x]);
          }
        }
      }
      landPosition = ret[0];
      pointArr.push(nowPosition)
      return [pointArr, nowPosition, pointArr2, landPosition];
    },
    clearBlastRing(item) {
      if (item.blastingLayer.length > 0) {
        for (let i in item.blastingLayer) {
          this.map.removeOverlay(item.blastingLayer[i])
        }
        item.blastingLayer = []
      }
    },
    clearTyphoon(item) {
      if (item.layer.length > 0) {
        console.log(item)
        for (let i in item.layer) {
          this.map.removeOverlay(item.layer[i])
        }
        item.layer = []
      }
      this.clearBlastRing(item)
    },
    clearMapData() {
      this.map.clearOverlays()
    }
  }
}
</script>
