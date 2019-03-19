<!--重点区域保障-->
<template>
  <div class="main-vue">
    <!--菜单-->
    <div class="main-menu">
      <div class="menu-wrap" :class="{pageBlur:switchPop}">
        <Menus v-if='spas.length!==0' :spas='spas' @changeContent='changeContent'></Menus>
      </div>
    </div>
    <!--SPA-->
    <div class="main-content" :class="{pageBlur:switchPop}" style="padding: 10px">
      <!-- <securityMap :int="int" :titleActionIndex='titleActionIndex' :titleActionFlag='titleActionFlag'></securityMap> -->
      <div class="demo-warp">
        <div class='map-div' v-show="!titleActionIndex.startsWith('2_')"></div>
        <div class='Bmap-div' v-show="titleActionIndex.startsWith('2_')"></div>
        <div class='legend-div' v-show='!hideFlag1'>
          <div class='legend-border'>
            <div>图例</div>
            <div>
              <div class='left'>
                <div>GSM正常基站</div>
                <div>GSM退服基站</div>
                <div>GSM停电基站</div>
                <div>LTE正常基站</div>
                <div>LTE退服基站</div>
                <div>LTE停电基站</div>
              </div>
              <div class='right'>
                <div>应急车</div>
                <div>油机车</div>
                <div>抢修车</div>
                <div>卫星电话</div>
                <div>无线人员</div>
                <div>传输人员</div>
              </div>
            </div>
          </div>
        </div>
        <div class='hide-btn1' :class="{'hide-btn1-active':hideFlag1}" @click='hideDiv(1)'></div>
        <div class='siteStatistics' v-show='!hideFlag2'>
          <div class='siteStatistics-border'>
            <div>
              <div>GSM基站</div>
              <div>
                <span @click="showOffSiteList('a1008')" style='color:#ff5252'>{{gsmNum.val1}}</span>
                <span style='font-family:"DigifaceWide"'>/</span>
                <span @click="showOffSiteList('a1006')" style='color:#ff5252'>{{gsmNum.val3}}</span>
                <span style='font-family:"DigifaceWide"'>/</span>
                <span style='color:#33ff77'>{{gsmNum.val2}}</span>
              </div>
            </div>
            <div>
              <div>LTE基站</div>
              <div>
                <span @click="showOffSiteList('a1007')" style='color:#ff5252'>{{lteNum.val1}}</span>
                <span style='font-family:"DigifaceWide"'>/</span>
                <span @click="showOffSiteList('a1005')" style='color:#ff5252'>{{lteNum.val3}}</span>
                <span style='font-family:"DigifaceWide"'>/</span>
                <span style='color:#33ff77'>{{lteNum.val2}}</span>
              </div>
            </div>
            <div>
              <div>GSM小区</div>
              <div>
                <span>{{gsmCellNum.val1}}</span>
                <span style='font-family:"DigifaceWide"'>/</span>
                <span>{{gsmCellNum.val2}}</span>
              </div>
            </div>
            <div>
              <div>LTE小区</div>
              <div>
                <span>{{lteCellNum.val1}}</span>
                <span style='font-family:"DigifaceWide"'>/</span>
                <span>{{lteCellNum.val2}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class='hide-btn2' :class="{'hide-btn2-active':hideFlag2}" @click='hideDiv(2)'></div>
        <select class='area-select' @change="changeArea($event)">
          <option v-for='(item) in areaList' :value='item.AREA_ID'>{{item.AREA_NAME}}</option>
        </select>
        <div class='infoBack' v-show='!hideFlag3'>
          <div class='infoBack-border'>
            <ul class='info-man-list' v-if='infoBackIndex==1'>
              <li @click='showInfoBackImg(item)' v-for='(item,index) in infoBackData' :class='{infoBackActive:infoBackImgIndex==item.OPERATE_USER_ID}'>{{item.OPERATE_USER_ID}}</li>
            </ul>
            <div>
              <div class='info-back' :class='{infoBackActive:infoBackIndex==1}' @click='clickInfoBack(1)'>
                <div :class="{blink:blinkFlag}">回传信息</div>
              </div>
              <div class='text-back' :class='{infoBackActive:infoBackIndex==2}' @click='clickInfoBack(2)'>
                <div>聊天室</div>
              </div>
            </div>
          </div>
        </div>
        <div class='hide-btn3' :class="{'hide-btn3-active':hideFlag3}" @click='hideDiv(3)'></div>
        <div class='infoBackImg' v-if='infoBackImgIndex&&infoBackIndex==1'>
          <swiper :options="SwiperOption" class="swiper-info" ref='myswiper'>
            <swiper-slide class="infoSlide" v-for="(item,index) in infobackList" :key="index">
              <div v-if='item.SHEET_ACCESSORIES!=null'>
                <!-- <img v-for="imgItem in item.SHEET_ACCESSORIES.split(',')" :src="'http://10.243.100.22:8080'+imgItem"> -->
                <img v-for="imgItem in item.SHEET_ACCESSORIES.split(',')" v-if="imgItem.indexOf('jpg')>0|| imgItem.indexOf('png')>0" :src="'http://120.210.236.82:8080'+imgItem">
                <video v-for="videoItem in item.SHEET_ACCESSORIES.split(',')" v-if="videoItem.indexOf('mp4')>0" :src="videoItem" controls="controls">您的浏览器不支持video标签。</video>
              </div>
              <div>{{item.DESCRIBE}}</div>
            </swiper-slide>
          </swiper>
          <div class="videoSwiper-pagination"></div>
        </div>
        <div class='typhoonList' v-if='typhooonFlag&&!hideFlag4'>
          <div class='typhoonBorder'>
            <div class='typhoonLi ' v-for='(item,index) of typhoonList' @click='chooseTyphoon(item,index)'>
              <span class='typhoon-select ' :class="{'typhoon-select-active':typhoonFlagList[index].flag}"></span>
              <span>{{item.NAME_CN}}</span>
            </div>
          </div>
        </div>
        <div class='hide-btn4' v-if='typhooonFlag' :class="{'hide-btn4-active':hideFlag4}" @click='hideDiv(4)'></div>
        <div class='undispatchDiv' v-show="!titleActionIndex.startsWith('2_') && !hideFlag5">
          <div class='border'>
            <div class='content-list'>
              <!-- <div class='wirelessBg' :style="{background:item.layer?'#263345':'none'}" @click="signUserPosition(item)" v-for='(item,index) in signUserData'>{{item.RESNAME}}</div> -->
              <div class='wirelessBg' @click="signUserPosition(item)" v-for='(item,index) in signUserData'>{{item.RESNAME}}</div>
              <!-- <div class='wirelessBg'></div>
              <div class='wirelessBg'></div>
              <div class='wirelessBg'></div>
              <div class='wirelessBg'></div> -->
            </div>
            <div class='tab-list'>
              <div :class='{"active-tab":UndispatchListIndex===1}' @click='changeUndispatchList(1)'>签到人员</div>
              <!-- <div :class='{"active-tab":UndispatchListIndex===1}' @click='changeUndispatchList(1)'>GSM<br>未调度</div>
              <div :class='{"active-tab":UndispatchListIndex===2}' @click='changeUndispatchList(2)'>LTE<br>未调度</div>
              <div :class='{"active-tab":UndispatchListIndex===3}' @click='changeUndispatchList(3)'>无线<br>人员</div>
              <div :class='{"active-tab":UndispatchListIndex===4}' @click='changeUndispatchList(4)'>传输<br>人员</div>
              <div :class='{"active-tab":UndispatchListIndex===5}' @click='changeUndispatchList(5)'>应<br>急车</div> -->
            </div>
          </div>
        </div>
        <div class='hide-btn5' :class="{'hide-btn5-active':hideFlag5}" @click='hideDiv(5)'></div>
        <!-- webim 弹窗开始 -->
        <div v-show="webim" class="webim">
          <span class='closeChatWindow' @click='closewebim'>X</span>
          <iframe src="./static/build/index.html" frameborder="0" pixels='100%'></iframe>
          <div @click="closewebim">X</div>
          <!-- <div @click="closewebim" style>X</div> -->
        </div>
        <!-- webim 弹窗完 -->
      </div>
    </div>
    <!-- 地图弹窗 -->
    <div class="win-all" v-if='switchPop'>
      <!-- 应急调度弹窗 -->
      <dispatch @sucessDispatch='sucessDispatch' :dispatchSiteInfo='dispatchSiteInfo' @POPDOWN='closePop'></dispatch>
    </div>
    <div class="win-all" v-if='switchPop2'>
      <!-- 应急调度弹窗 -->
      <offSiteList :indi='indi' :areaId='areaId' @POPDOWN='closePop2'></offSiteList>
    </div>
  </div>
</template>
<script>
import Menus from './menu/menu'
import dispatch from './security/dispatch'
import offSiteList from './security/offSiteList'
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
let signPerson = require('../../../assets/img/security/person.png')
// import securityMap from './securityMap.vue'
export default {
  props: ['int', 'ins'],
  data() {
    return {
      areaList: [{
        'AREA_ID': 1024270864,
        'AREA_NAME': '2017春节2G区域3'
      }],
      areaId: 0,
      areaName: '',
      typhooonFlag: false,
      siteId: '',
      h: 0,
      switchPop: false,
      switchPop2: false,
      indi: '',
      webim: false,
      blinkFlag: false,
      hideFlag1: false,
      hideFlag2: false,
      hideFlag3: false,
      hideFlag4: false,
      hideFlag5: false,
      blinkIntervalId: null,
      titleActionIndex: '0_0_0',
      titleActionFlag: true,
      switchFlag: true,
      UndispatchListIndex: 1,
      gsmNum: {
        val1: 0,
        val2: 0,
        val3: 0
      },
      lteNum: {
        val1: 0,
        val2: 0,
        val3: 0
      },
      gsmCellNum: {
        val1: 0,
        val2: 0
      },
      lteCellNum: {
        val1: 0,
        val2: 0
      },
      dispatchSiteInfo: {
        'BTSNAME': '池州IBSC2-CIZ-池州翠白路农贸市场(九华农商行)-LZG',
        'START_TIME': '2018-05-29 18:32:59',
        'CITYNAME': '池州',
        'LATITUDE': '30.65944',
        'NE_ID': '-1475283325',
        'SITE_TYPE': '201',
        'VENDER': '中兴',
        'TOWNINFO': '清风街道办事处',
        'COUNTYNAME': '池州市',
        'LONGITUDE': '117.48482'
      },
      spas: [],
      mapIndex: '',
      map: null,
      bmap: null,
      infoWindow: '',
      infobackList: [],
      signUserData: [],
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
        '1_1_0': 'c11',
        '1_1_1': 'c12',
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
          'layer': null,
          'dataId': 'a1009',
          'siteType': '201',
          'data': [],
          'name': '2G基站'
        },
        'c02': {
          'markerArr': {},
          'flag': false,
          'icon': g2SiteOff,
          'z_index': 600,
          'layer': null,
          'dataId': 'a1008',
          'siteType': '9201',
          'data': [],
          'name': '2G退服基站'
        },
        'c03': {
          'markerArr': {},
          'flag': false,
          'icon': g2SiteEle,
          'z_index': 600,
          'layer': null,
          'dataId': 'a1006',
          'siteType': '8104',
          'data': [],
          'name': '2G停电基站'
        },
        'c04': {
          'markerArr': {},
          'flag': false,
          'icon': g4Site,
          'z_index': 600,
          'layer': null,
          'dataId': 'a1010',
          'data': [],
          'name': '4G基站'
        },
        'c05': {
          'markerArr': {},
          'flag': false,
          'icon': g4SiteOff,
          'z_index': 600,
          'layer': null,
          'dataId': 'a1007',
          'data': [],
          'name': '4G退服基站'
        },
        'c06': {
          'markerArr': {},
          'flag': false,
          'icon': g4SiteEle,
          'z_index': 600,
          'layer': null,
          'dataId': 'a1005',
          'data': null,
          'name': '4G停电基站'
        },
        'c07': {
          'markerArr': {},
          'flag': false,
          'icon': emerCar,
          'z_index': 600,
          'layer': null,
          'dataId': 'd0045',
          'data': [],
          'name': '通信车'
        },
        'c08': {
          'markerArr': {},
          'flag': false,
          'icon': oilCar,
          'z_index': 600,
          'layer': null,
          'dataId': 'd0053',
          'data': [],
          'name': '油机车'
        },
        'c09': {
          'markerArr': {},
          'flag': false,
          'icon': repairCar,
          'z_index': 600,
          'layer': null,
          'dataId': 't0001',
          'data': [],
          'name': '二干光缆中断'
        },
        'c10': {
          'markerArr': {},
          'flag': false,
          'icon': satelitePhone,
          'z_index': 600,
          'layer': null,
          'dataId': 't0001',
          'data': [],
          'name': '二干光缆中断'
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
        },
        'c13': {
          'markerArr': {},
          'flag': false,
          'icon': transPerson,
          'z_index': 600,
          'layer': [],
          'dataId': 'd0054',
          'data': [],
          'name': '雨量'
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
          'dataId': 'd0037',
          'data': [],
          'name': '台风路径'
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
      },
      typhoonList: [],
      typhoonFlagList: [],
      infoBackImgIndex: '',
      infoBackIndex: 0,
      infoBackData: [],
      strs: '',
      popup: L.popup({ closeButton: false, className: 'gis-popup' }).setContent('<div id="float-tips"></div>'),
      SwiperOption: {
        autoplay: 30000,
        setWrapperSize: true,
        pagination: '.videoSwiper-pagination',
        autoplayDisableOnInteraction: false,
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        notNextTick: true
      }
    }
  },
  created() {
    this.loadAreaList()
  },
  mounted() {
    // 初始化Arcgis地图
    this.initArcgisMap()
    // 加载场景列表
    // 加载场景列表
    this.loadAreaList()
    // 加载菜单
    this.loadMenu()
    this.loadInfoBackData()
    this.loadSignUserData()
    // 加载回传信息数据
    setInterval(() => {
      this.loadInfoBackData()
      this.loadSignUserData()
    }, 30000)
    // 初始化百度地图
    this.initMap()
  },
  methods: {
    loadMenu() {
      this.$http.get('api/menu/sheme/ref/son?schemeId=' + sessionStorage.getItem('SCHEME_ID') + '&menuId=1')
        .then((res) => {
          this.spas = res.data.data
          let str = ''
          for (let i = 0; i < this.spas.length; i++) {
            if (this.spas[i].DATA.length !== 0) {
              for (let j = 0; j < this.spas[i].DATA.length; j++) {
                if (this.spas[i].DATA[j].FLAG) {
                  // str = i + '_' + j
                  // console.log(str)
                  if (this.spas[i].DATA[j].DATA.length !== 0) {
                    for (let k = 0; k < this.spas[i].DATA[j].DATA.length; k++) {
                      if ((this.spas[i].DATA[j]).DATA[k].FLAG) {
                        str = i + '_' + j + '_' + k
                        this.strs = str
                        this.spas[i].DATA[j].DATA[k].SWITCHFLAG = 1
                        this.loadMapData(this.indexToIndi[str], this.areaId)
                        return
                      }
                    }
                  } else {
                    str = i + '_' + j
                    this.strs = str
                    this.loadMapData(this.indexToIndi[str], this.areaId)
                    return
                  }
                }
              }
            }
          }
        }).catch(() => {
        })
    },
    loadInfoBackData() {
      this.$http.get('api/mix/d0055').then((res) => {
        if (res.data.data && res.data.data.length !== 0 && res.data.data.length !== this.infoBackData.length) {
          this.infoBackData = res.data.data
          this.blinkIntervalId = setInterval(() => {
            this.blinkFlag = !this.blinkFlag
          }, 500)
        }
      })
    },
    clickInfoBack(index) {
      if (index !== this.infoBackIndex) {
        this.infoBackIndex = index
        if (index === 2) {
          this.webim = true;
        } else {
          clearInterval(this.blinkIntervalId)
          this.blinkIntervalId = null
          this.blinkFlag = false
        }
      } else {
        // this.infobackList = []
        this.infoBackIndex = 0
      }
    },
    loadSignUserData() {
      if (!this.signUserLayer) {
        this.signUserLayer = L.layerGroup().addTo(this.map)
      }
      this.$http.post('api/signIn/info').then(res => {
        if (res.data.data.length !== 0) {
          this.signUserData = res.data.data
          for (let item of this.signUserData) {
            item.flag = false;
            item.layer = null
            item['layer'] = L.marker([item['BAIDULATITUDE'], item['BAIDULONGITUDE']], {
              icon: L.icon({ iconUrl: signPerson, iconSize: [24, 31] })
              // zIndexOffset: zIndex,
            }).addTo(this.signUserLayer)
            let sContent = ''
            item['layer'].addEventListener('click', (obj) => {
              sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
                                <div class="base-info3">
                                  <div title="${item.RESNAME}">姓名：    ${item.RESNAME}</div>
                                  <div>状态：    已签到</div>
                                  <div>经度：    ${item.BAIDULONGITUDE}</div>
                                  <div>纬度：    ${item.BAIDULATITUDE}</div>
                                </div>
                                </div>
                                </div ></div>`
              this.popup.setLatLng(obj.latlng);
              this.popup.openOn(this.map);
              document.getElementById('float-tips').innerHTML = sContent;
            });
          }
        }
      })
    },
    signUserPositionOne(item) {
      if (!item['layer']) {
        for (let a of this.signUserData) {
          if (a['layer']) {
            this.map.removeLayer(a['layer']);
            a['layer'] = null
          }
        }
        this.map.panTo([item['BAIDULATITUDE'], item['BAIDULONGITUDE']])
      } else {
        this.map.removeLayer(item['layer']);
        item['layer'] = null
      }
    },
    signUserPosition(item) {
      this.map.setView([item['BAIDULATITUDE'], item['BAIDULONGITUDE']], 10)
    },
    closewebim() {
      this.webim = false
      this.infoBackIndex = 0;
    },
    showInfoBackImg(item) {
      if (this.infoBackImgIndex === item.OPERATE_USER_ID) {
        this.infoBackImgIndex = ''
      } else {
        this.infoBackImgIndex = item.OPERATE_USER_ID
        this.$http.get('api/mix/d0056?operateUserId=' + this.infoBackImgIndex).then((res) => {
          if (res.data.data && res.data.data.length !== 0) {
            this.infobackList = res.data.data
          }
        })
      }
    },
    closePop() {
      this.switchPop = ''
    },
    closePop2() {
      this.switchPop2 = ''
    },
    hideDiv(num) {
      console.log(this['hideFlag' + num])
      this['hideFlag' + num] = !this['hideFlag' + num]
    },
    changeContent(str, flag) {
      this.titleActionIndex = str
      this.changeIndi(str)
    },
    changeUndispatchList(index) {
      this.UndispatchListIndex = index
    },
    showOffSiteList(type) {
      if (this.gsmNum.val1 !== 0 || this.lteNum.val1 !== 0 || this.gsmNum.val3 !== 0 || this.lteNum.val3 !== 0) {
        this.indi = type
        this.switchPop2 = type
      }
    },
    initMap() {
      if (this.bmap) {
        return
      }
      if (BMap) {
        this.bmap = new BMap.Map(this.$el.children[1].children[0].children[1], { enableMapClick: false })
        this.bmap.setMapStyle({ styleJson: styleJson })
        this.bmap.centerAndZoom(new BMap.Point(117.28, 31.86), 8)
        this.bmap.enableScrollWheelZoom(true)
        this.infoWindow = new BMap.InfoWindow('', { enableMessage: false })
        window.closeInfoWindow = () => {
          this.bmap.closeInfoWindow()
        }
      } else {
        console.log('百度地图API无法访问')
      }
    },
    initArcgisMap() {
      var crs = new L.Proj.CRS(
        'EPSG:4326',
        '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
        {
          origin: [-400, 400],
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
      this.map = L.map(this.$el.children[1].children[0].children[0], {
        attributionControl: false,
        zoomControl: false,
        crs: crs,
        tileSize: 256,
        layers: L.tileLayer('http://10.225.61.237:13398/arcgis/rest/services/gismap/anhuiAll/MapServer/tile/{z}/{y}/{x}')
      }).setView([31.7985800000, 117.2904100000], 9);
      // 加载arcgis 瓦片
      // this.map = L.map(this.$el.children[1].children[0].children[0]).setView([31.7985800000, 117.2904100000], 9);
      // L.esri.tiledMapLayer(
      //   { url: 'https://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer' }).addTo(this.map);
      window.closeInfoWindow = () => {
        this.popup._close()
      }
    },
    changeIndi(val) {
      if (val !== '0_0' && val !== '0_0_close' && val !== '0_1' && val !== '0_1_close' && val !== '0_2' && val !== '0_2_close' && val !== '1_0' && val !== '1_0_close' && val !== '1_1' && val !== '1_1_close' && val !== '1_2' && val !== '1_2_close' && val !== '2_0' && val !== '2_0_close') {
        if (val.endsWith('_close')) {
          if (val.startsWith('2_')) {
            this.clearMarker(this.indexToIndi[val.substring(0, val.length - 6)])
          } else {
            this.clearLayer(this.indexToIndi[val.substring(0, val.length - 6)])
          }
        } else {
          this.loadMapData(this.indexToIndi[val], this.areaId)
        }
      }
    },
    // 基站统计
    loadSiteNumData(areaIds) {
      console.log(areaIds)
      // this.gsmNum.val1 = 100
      // this.gsmNum.val3 = 200
      this.$http.get('http://10.243.65.239:8080/ips-ice/indi/statistics/a1004?areaId=' + areaIds).then((result) => {
        this.gsmNum.val1 = result.data.data[0].KPI_VALUE1
        this.gsmNum.val2 = result.data.data[0].KPI_VALUE2
      })
      this.$http.get('http://10.243.65.239:8080/ips-ice/indi/statistics/a1003?areaId=' + areaIds).then((result) => {
        this.lteNum.val1 = result.data.data[0].KPI_VALUE1
        this.lteNum.val2 = result.data.data[0].KPI_VALUE2
      })
      // this.$http.get('http://10.243.65.239:8080/ips-ice/indi/statistics/a1002?areaId=' + areaId).then((result) => {
      //   this.gsmNum.val3 = result.data.data[0].KPI_VALUE1
      // })
      this.$http.get('api/powerCut/powerNum', {
        params: {
          areaId: areaIds,
          neType: 201
        }
      }).then((res) => {
        if (res.data.data.length > 0) {
          this.gsmNum.val3 = res.data.data[0].COUNTNUM
        } else {
          this.gsmNum.val3 = 0
        }
      })
      // this.$http.get('http://10.243.65.239:8080/ips-ice/indi/statistics/a1001?areaId=' + areaId).then((result) => {
      //   this.lteNum.val3 = result.data.data[0].KPI_VALUE1
      // })
      this.$http.get('api/powerCut/powerNum', {
        params: {
          areaId: areaIds,
          neType: 8104
        }
      }).then((res) => {
        if (res.data.data.length > 0) {
          this.lteNum.val3 = res.data.data[0].COUNTNUM
        } else {
          this.lteNum.val3 = 0
        }
      })
      this.$http.get('http://10.243.65.239:8080/ips-ice/indi/statistics/a1011?areaId=' + areaIds).then((result) => {
        this.gsmCellNum.val1 = result.data.data[0].KPI_VALUE1
        this.gsmCellNum.val2 = result.data.data[0].KPI_VALUE2
      })
      this.$http.get('http://10.243.65.239:8080/ips-ice/indi/statistics/a1012?areaId=' + areaIds).then((result) => {
        this.lteCellNum.val1 = result.data.data[0].KPI_VALUE1
        this.lteCellNum.val2 = result.data.data[0].KPI_VALUE2
      })
    },
    // 重点区域列表查询
    loadAreaList() {
      this.$http.get('api/mix/d0060').then((res) => {
        if (!res.data || !res.data.data || res.data.data.length <= 0) {
          return;
        }
        this.areaList = res.data.data
        this.areaId = this.areaList[0].AREA_ID
        this.areaName = this.areaList[0].AREA_NAME
        this.map.setView([this.areaList[0].CENTER_LATITUDE, this.areaList[0].CENTER_LONGITUDE], 8)
        this.loadSiteNumData(this.areaId)
      }).catch((error) => {
        console.log(error);
      });
    },
    changeArea(event) {
      // console.log(event.target.selectedIndex)
      this.areaId = event.target.value
      this.map.panTo([this.areaList[event.target.selectedIndex].CENTER_LATITUDE, this.areaList[event.target.selectedIndex].CENTER_LONGITUDE])
      this.loadMapData(this.indexToIndi[this.strs], this.areaId)
      this.loadSiteNumData(this.areaId)
    },
    loadMapData(type, areaIds) {
      this.clearLayer(this.indexToIndi[this.strs])
      if (type === 'c01') {
        this.$http.get('api/mix/d0052?neId=201&areaId=' + areaIds).then((res) => {
          let data = res.data.data;
          this.createGisMarker(type, data)
        }).catch((error) => {
          console.log('indicator has error', error);
        })
      } else if (type === 'c04') {
        this.$http.get('api/mix/d0052?neId=8104&areaId=' + areaIds).then((res) => {
          let data = res.data.data;
          this.createGisMarker(type, data)
        }).catch((error) => {
          console.log('indicator has error', error);
        })
      } else {
        if (type === 'c02' || type === 'c05') {
          this.$http.get('http://10.243.65.239:8080/ips-ice/indi/statistics/' + this.lcf[type].dataId + '?areaId=' + areaIds).then((res) => {
            // this.$http.get('api/mix/' + this.lcf[type].dataId + '?areaId=' + areaId).then((res) => {
            let data = res.data.data;
            this.createGisMarker(type, data)
          }).catch((error) => {
            console.log('indicator has error', error);
          })
        } else if (type === 'c03') {
          this.$http.get('api/powerCut/powercut/id', {
            params: {
              areaId: areaIds,
              neType: 201
            }
          }).then((res) => {
            let data = res.data.data;
            this.createGisMarker(type, data)
          })
        } else if (type === 'c06') {
          this.$http.get('api/powerCut/powercut/id', {
            params: {
              areaId: areaIds,
              neType: 8104
            }
          }).then((res) => {
            let data = res.data.data;
            this.createGisMarker(type, data)
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
                console.log('aaabbb')
                this.renderTyphooneData(data)
              } else if (type === 'c16') {
                this.renderEarthquake(data)
              } else {
                this.createGisMarker(type, data)
              }
            }
          }).catch((error) => {
            console.log(`${this.lcf[type].dataId} indicator has error`, error);
          })
        }
      }
    },
    creatCollectionPoints(type, validData) {
      let self = this
      // this.clearMapData()
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
            '<div>网元类型：    ' + e.point.siteData.SITE_TYPE + '</div>' +
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
                <div>网元类型：    ${item.SITE_TYPE}</div>
                <div>所属乡镇：    ${item.COUNTYNAME}</div>
              </div>
              </div ></div>`
            self.infoWindow.setContent(sContent)
            this.openInfoWindow(self.infoWindow, new BMap.Point(e.target.getPosition().lng, e.target.getPosition().lat))
          }
        })
      }
    },
    createGisMarker(type, validData) {
      window.openDispatch = (event) => {
        console.log('aaa')
        this.switchPop = true;
        console.log(this.switchPop)
        event.stopPropagation()
      }
      // console.log(validData)
      let myConfig = this.lcf[type]
      if (!myConfig['layer']) {
        myConfig['layer'] = L.layerGroup().addTo(this.map)
      }
      // myConfig['layer'].clearLayers()
      let self = this
      // 获取数据配置
      let iconUrl = myConfig['icon']
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
        let sContent;
        marker.addEventListener('click', (obj) => {
          if (type === 'c02' || type === 'c05') {
            self.dispatchSiteInfo = item
            let wirelessName = ''
            let transName = ''
            let emerCarName = ''
            // var oilCarName = ''
            let state1 = ''
            let state2 = ''
            let state3 = ''
            let state4 = ''
            self.$http.all([
              self.$http.get('api/mix/d0049?btsId=' + item.NE_ID),
              self.$http.get('api/mix/d0050?btsId=' + item.NE_ID),
              self.$http.get('api/mix/d0051?btsId=' + item.NE_ID),
              self.$http.get('api/mix/d0057?btsId=' + item.NE_ID)
            ])
              .then(self.$http.spread((res1, res2, res3, res4) => {
                // wirelessName = res1.data.data.length !== 0 && res1.data.data[0].USER_NAME_W ? res1.data.data[0].USER_NAME_W : '无'
                if (res1.data.data.length !== 0) {
                  res1.data.data.forEach((item) => {
                    wirelessName += item.USER_NAME_W + '、'
                  })
                } else {
                  wirelessName = '无'
                }
                if (res2.data.data.length !== 0) {
                  res2.data.data.forEach((item) => {
                    transName += item.USER_NAME_T + '、'
                  })
                } else {
                  transName = '无'
                }
                if (res3.data.data.length !== 0) {
                  res3.data.data.forEach((item) => {
                    emerCarName += item.VEHICLEID + '、'
                  })
                } else {
                  emerCarName = '无'
                }
                // transName = res2.data.data.length !== 0 && res2.data.data[0].USER_NAME_T ? res2.data.data[0].USER_NAME_T : '无'
                // emerCarName = res3.data.data.length !== 0 && res3.data.data[0].VEHICLEID ? res3.data.data[0].VEHICLEID : '无'
                // oilCarName = res4.data.data.length !== 0 && res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? res4.data.data[0].OILENGINE_CODE : '无'
                state1 = res1.data.data.length !== 0 && res1.data.data[0].USER_NAME_W ? '已调度' : '未调度'
                state2 = res2.data.data.length !== 0 && res2.data.data[0].USER_NAME_T ? '已调度' : '未调度'
                state3 = res3.data.data.length !== 0 && res3.data.data[0].VEHICLEID ? '已调度' : '未调度'
                state4 = res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? '已调度' : '未调度'
                sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
                                <div class="base-info3">
                                  <div title="${item.BTSNAME}">基站名称：    ${item.BTSNAME}</div>
                                  <div>厂商：    ${item.VENDER}</div>
                                  <div>网元类型：    ${item.SITE_TYPE}</div>
                                  <div>所属乡镇：    ${item.TOWNINFO}</div>
                                  <div>告警时间：    ${item.EVENTSTIME}</div>
                                  <div>退服原因：    ${item.TITLETEXT}</div>
                                  <div style="width:100%;height:0px;border-bottom:1px dashed #8ba3c3;position: relative;top:-6px;"></div>
                                  <div>油机车名称：    ${res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? res4.data.data[0].OILENGINE_CODE : ''}</div>
                                  <div>发电人员    ${res4.data.data.length !== 0 && res4.data.data[0].CREATORNAME ? res4.data.data[0].CREATORNAME : ''}</div>
                                  <div>发电工单号：    ${res4.data.data.length !== 0 && res4.data.data[0].EOMS_ID ? res4.data.data[0].EOMS_ID : ''}</div>
                                  <div>故障原因：    ${res4.data.data.length !== 0 && res4.data.data[0].FAULTREASON ? res4.data.data[0].FAULTREASON : ''}</div>
                                  <div>处理结果：    ${res4.data.data.length !== 0 && res4.data.data[0].FAULTRESULT ? res4.data.data[0].FAULTRESULT : ''}</div>
                                  <div>油机状态：    ${res4.data.data.length !== 0 && res4.data.data[0].OIL_STATUS ? res4.data.data[0].OIL_STATUS : ''}</div>
                                </div>
                                <div onclick="openDispatch(event)" class='dispatch-info'>
                                  <div>
                                    <span style="visibility:hidden">XXXX</span><span>无线人员</span><span>传输人员</span><span>通信车</span><span>油机车</span>
                                  </div>
                                  <div>
                                    <span>调度状态</span><span>${state1}</span><span>${state2}</span><span>${state3}</span><span>${state4}</span>
                                  </div>
                                  <div>
                                    <span>保障详情</span><span title='${wirelessName}'>${wirelessName}</span><span title='${transName}'>${transName}</span><span title='${emerCarName}'>${emerCarName}</span><span>-</span>
                                  </div>
                                </div>
                                </div ></div>`
                this.popup.setLatLng(obj.latlng);
                this.popup.openOn(this.map);
                document.getElementById('float-tips').innerHTML = sContent;
              }));
          } else if (type === 'c03' || type === 'c06') {
            let items = validData[i]['INT_ID']
            this.$http.get('api/powerCut/powercut/info', {
              params: {
                intId: items
              }
            }).then((res) => {
              let item = res.data.data[0]
              self.dispatchSiteInfo = item
              let wirelessName = ''
              let transName = ''
              let emerCarName = ''
              // var oilCarName = ''
              let state1 = ''
              let state2 = ''
              let state3 = ''
              let state4 = ''
              self.$http.all([
                self.$http.get('api/mix/d0049?btsId=' + item.INT_ID),
                self.$http.get('api/mix/d0050?btsId=' + item.INT_ID),
                self.$http.get('api/mix/d0051?btsId=' + item.INT_ID),
                self.$http.get('api/mix/d0057?btsId=' + item.INT_ID)
              ])
                .then(self.$http.spread((res1, res2, res3, res4) => {
                  // wirelessName = res1.data.data.length !== 0 && res1.data.data[0].USER_NAME_W ? res1.data.data[0].USER_NAME_W : '无'
                  if (res1.data.data.length !== 0) {
                    res1.data.data.forEach((item) => {
                      wirelessName += item.USER_NAME_W + '、'
                    })
                  } else {
                    wirelessName = '无'
                  }
                  if (res2.data.data.length !== 0) {
                    res2.data.data.forEach((item) => {
                      transName += item.USER_NAME_T + '、'
                    })
                  } else {
                    transName = '无'
                  }
                  if (res3.data.data.length !== 0) {
                    res3.data.data.forEach((item) => {
                      emerCarName += item.VEHICLEID + '、'
                    })
                  } else {
                    emerCarName = '无'
                  }
                  // if (res4.data.data.length !== 0) {
                  //   res3.data.data.forEach((item) => {
                  //     oilCarName += item.OILENGINE_CODE + '、'
                  //   })
                  // } else {
                  //   oilCarName = '无'
                  // }
                  // transName = res2.data.data.length !== 0 && res2.data.data[0].USER_NAME_T ? res2.data.data[0].USER_NAME_T : '无'
                  // emerCarName = res3.data.data.length !== 0 && res3.data.data[0].VEHICLEID ? res3.data.data[0].VEHICLEID : '无'
                  // oilCarName = res4.data.data.length !== 0 && res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? res4.data.data[0].OILENGINE_CODE : '无'
                  state1 = res1.data.data.length !== 0 && res1.data.data[0].USER_NAME_W ? '已调度' : '未调度'
                  state2 = res2.data.data.length !== 0 && res2.data.data[0].USER_NAME_T ? '已调度' : '未调度'
                  state3 = res3.data.data.length !== 0 && res3.data.data[0].VEHICLEID ? '已调度' : '未调度'
                  state4 = res4.data.data.length !== 0 && res4.data.data[0].EOMS_ID ? '已调度' : '未调度'
                  sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
                                <div class="base-info3">
                                  <div title="${item.ZH_LABEL}">基站名称：    ${item.ZH_LABEL}</div>
                                  <div>厂商：    ${item.CHANGJIA}</div>
                                  <div>网元类型：    ${item.LEIXING}</div>
                                  <div>所属乡镇：    ${item.SMALL_TOWNS}</div>
                                  <div>告警时间：    ${item.EVENT_TIME}</div>
                                  <div>退服原因：    ${item.ALARM_TITLE_TEXT}</div>
                                  <div style="width:100%;height:0px;border-bottom:1px dashed #8ba3c3;position: relative;top:-6px;"></div>
                                  <div>油机名称：    ${res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? res4.data.data[0].OILENGINE_CODE : ''}</div>
                                  <div>发电人员：    ${res4.data.data.length !== 0 && res4.data.data[0].CREATORNAME ? res4.data.data[0].CREATORNAME : ''}</div>
                                  <div>发电工单号：  ${res4.data.data.length !== 0 && res4.data.data[0].EOMS_ID ? res4.data.data[0].EOMS_ID : ''}</div>
                                  <div>故障原因：    ${res4.data.data.length !== 0 && res4.data.data[0].FAULTREASON ? res4.data.data[0].FAULTREASON : ''}</div>
                                  <div>处理结果：    ${res4.data.data.length !== 0 && res4.data.data[0].FAULTRESULT ? res4.data.data[0].FAULTRESULT : ''}</div>
                                  <div>油机状态：    ${res4.data.data.length !== 0 && res4.data.data[0].OIL_STATUS ? res4.data.data[0].OIL_STATUS : ''}</div>
                                </div>
                                <div onclick="openDispatch(event)" class='dispatch-info'>
                                  <div>
                                    <span style="visibility:hidden">XXXX</span><span>无线人员</span><span>传输人员</span><span>通信车</span><span>油机车</span>
                                  </div>
                                  <div>
                                    <span>调度状态</span><span>${state1}</span><span>${state2}</span><span>${state3}</span><span>${state4}</span>
                                  </div>
                                  <div>
                                    <span>保障详情</span><span title='${wirelessName}'>${wirelessName}</span><span title='${transName}'>${transName}</span><span title='${emerCarName}'>${emerCarName}</span><span>-</span>
                                  </div>
                                </div>
                                </div ></div>`
                  this.popup.setLatLng(obj.latlng);
                  this.popup.openOn(this.map);
                  document.getElementById('float-tips').innerHTML = sContent;
                }))
            });
          } else if (type === 'c07') {
            sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
              <div class="base-info2">
                <div>车牌：    ${item.VEHICLEID}</div>
                <div>车型：    ${item.VEHICLEMODEL}</div>
                <div title="${item.LOCATIONADDRESS}">位置：    ${item.LOCATIONADDRESS}</div>
              </div>
              </div ></div>`
            this.popup.setLatLng(obj.latlng);
            this.popup.openOn(this.map);
            document.getElementById('float-tips').innerHTML = sContent;
          } else if (type === 'c08') {
            sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
              <div class="base-info2">
              <div>油机车名称:    ${item.OILENGINE_CODE}</div>
                <div>发电人员:    ${item.CREATORNAME}</div>
                 <div title="${item.SITE_NAME}">基站名称：    ${item.SITE_NAME}</div>
                <div>故障原因：    ${item.FAULTREASON}</div>
                <div>处理结果：    ${item.FAULTRESULT}</div>
                <div>油机状态：    ${item.OIL_STATUS}</div>
              </div>
              </div ></div>`
            this.popup.setLatLng(obj.latlng);
            this.popup.openOn(this.map);
            document.getElementById('float-tips').innerHTML = sContent;
          } else if (type === 'c11' || type === 'c12') {
            sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
              <div class="base-info2">
                <div style='width:150px'>姓名：    ${item.USER_NAME}</div>
                <div>电话号码：    ${item.MOBILE}</div>
                <div style='width:150px'>类型：    ${item.TYPE_NAME}</div>
                <div title="${item.LOCATIONADDRESS}">位置：    ${item.LOCATIONADDRESS}</div>
              </div>
              </div ></div>`
            this.popup.setLatLng(obj.latlng);
            this.popup.openOn(this.map);
            document.getElementById('float-tips').innerHTML = sContent;
          } else {
            sContent = `<div class="map-info-window" onclick="closeInfoWindow()"><div class="map-info-border"> 
              <div class="base-info">
                <div title="${item.BTSNAME}">基站名称：    ${item.BTSNAME}</div>
                <div>厂商：    ${item.VENDER}</div>
                <div>网元类型：    ${item.SITE_TYPE}</div>
                <div title="${item.TOWNINFO}">所属乡镇：    ${item.TOWNINFO}</div>
              </div>
              </div ></div>`
            this.popup.setLatLng(obj.latlng);
            this.popup.openOn(this.map);
            document.getElementById('float-tips').innerHTML = sContent;
          }
          // document.getElementsByClassName('gis-popup')[0].style.height = `${toolHeight}px`;
        });
      }
    },
    sucessDispatch(id) {
      console.log(id)
      let self = this
      this.switchPop = false
      var wirelessName = ''
      var transName = ''
      var emerCarName = ''
      // var oilCarName = ''
      var state1 = ''
      var state2 = ''
      var state3 = ''
      // var state4 = ''
      let sContent = ''
      self.$http.all([
        self.$http.get('api/mix/d0049?btsId=' + id),
        self.$http.get('api/mix/d0050?btsId=' + id),
        self.$http.get('api/mix/d0051?btsId=' + id),
        self.$http.get('api/mix/d0057?btsId=' + id)
      ])
        .then(self.$http.spread((res1, res2, res3, res4) => {
          // wirelessName = res1.data.data.length !== 0 && res1.data.data[0].USER_NAME_W ? res1.data.data[0].USER_NAME_W : '无'
          // transName = res2.data.data.length !== 0 && res2.data.data[0].USER_NAME_T ? res2.data.data[0].USER_NAME_T : '无'
          // emerCarName = res3.data.data.length !== 0 && res3.data.data[0].VEHICLEID ? res3.data.data[0].VEHICLEID : '无'
          if (res1.data.data.length !== 0) {
            res1.data.data.forEach((item) => {
              wirelessName += item.USER_NAME_W
            })
          } else {
            wirelessName = '-'
          }
          if (res2.data.data.length !== 0) {
            res2.data.data.forEach((item) => {
              transName += item.USER_NAME_T
            })
          } else {
            transName = '-'
          }
          if (res3.data.data.length !== 0) {
            res3.data.data.forEach((item) => {
              emerCarName += item.VEHICLEID
            })
          } else {
            emerCarName = '-'
          }
          // oilCarName = res4.data.data.length !== 0 && res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? res4.data.data[0].OILENGINE_CODE : '无'
          state1 = res1.data.data.length !== 0 && res1.data.data[0].USER_NAME_W ? '已调度' : '未调度'
          state2 = res2.data.data.length !== 0 && res2.data.data[0].USER_NAME_T ? '已调度' : '未调度'
          state3 = res3.data.data.length !== 0 && res3.data.data[0].VEHICLEID ? '已调度' : '未调度'
          // state4 = res4.data.data.length !== 0 && res4.data.data[0].OILENGINE_CODE ? '已调度' : '未调度'
          sContent = `<div>
                          <span style="visibility:hidden">XXXX</span><span>无线人员</span><span>传输人员</span><span>通信车</span><span>油机车</span>
                                  </div>
                                  <div>
                                    <span>调度状态</span><span>${state1}</span><span>${state2}</span><span>${state3}</span><span>-</span>
                                  </div>
                                  <div>
                                    <span>保障详情</span><span title='${wirelessName}'>${wirelessName}</span><span title='${transName}'>${transName}</span><span title='${emerCarName}'>${emerCarName}</span><span>-</span>
                                  </div>`
          let dom = document.getElementsByClassName('dispatch-info')[0]
          dom.innerHTML = sContent
        }));
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
            this.bmap.removeOverlay(this.lcf[type]['layer'][i])
          }
          this.lcf[type]['layer'] = []
        }
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
    },
    // 雨量渲染
    renderRainData(data) {
      var bdary = new BMap.Boundary();
      // console.log(data)
      this.bmap.centerAndZoom('合肥', 8)
      data.forEach((item) => {
        bdary.get(item.CITYNAME + '市', (rs) => {       // 获取行政区域
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
              fillColor: this.getColor(item.RAIN),
              opacity: 0.8
            }); // 建立多边形覆盖物
            this.bmap.addOverlay(ply);  // 添加覆盖物
            this.lcf['c13']['layer'].push(ply)
            ply.addEventListener('mouseover', (e) => {
              // console.log(e)
              let sContent = null
              sContent = '<div class="map-info-window"><div class="map-info-border"><div class="base-info2">' +
                '<div style="width:204px">时间：' + item.PUBLISH_TIME + '</div>' +
                '<div style="width:170px">城市：' + item.CITYNAME + '</div>' +
                '<div style="width:204px">雨量：' + item.RAIN + 'mm' + '</div>' +
                // '<div>温度：' + item.WEATHER_WENDU + '</div>' +
                '</div></div></div>'
              this.infoWindow.setContent(sContent)
              this.bmap.openInfoWindow(this.infoWindow, new BMap.Point(e.point.lng, e.point.lat))
            })
            ply.addEventListener('mouseout', (e) => {
              this.bmap.closeInfoWindow()
            })
            pointArray = pointArray.concat(ply.getPath());
          }
          // addlabel();
        });
      })
    },
    getColor(value) {
      // return d === '永泰县' ? '#db4840' : d === '闽侯县' ? '#BD0026' : d === '武平县' ? '#f3f661' : d === '福鼎市' ? '#FC4E2A' : d === '仙游县' ? '#FD8D3C' : d === '涵江区' ? '#FEB24C' : '#2ca25f';
      let color = ''
      if (value <= 20) {
        color = '#52cc7a'
      } else if (value > 20 && value <= 40) {
        color = '#33bbff'
      } else if (value > 40 && value <= 60) {
        color = '#ffe066'
      } else if (value > 60 && value <= 80) {
        color = '#ffb266'
      } else {
        color = '#cc0000'
      }
      return color
    },
    // 天气渲染
    renderWeatherData(type, data) {
      let self = this
      // this.clearMapData()
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
            self.bmap.closeInfoWindow()
          })
          myConfig['layer'].push(marker)
          this.bmap.addOverlay(marker)
        }
      }
    },
    // 天气边界
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
            this.lcf['c14']['layer'].push(ply)
            this.bmap.addOverlay(ply);  // 添加覆盖物
            pointArray = pointArray.concat(ply.getPath());
          }
          if (item === '安徽省') {
            this.bmap.setViewport(pointArray);    // 调整视野
          }
          // addlabel();
        });
      })
    },
    // 地震渲染
    renderEarthquake(data) {
      // this.clearMapData()
      this.bmap.centerAndZoom(new BMap.Point(104.08, 31.86), 5)
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
            self.bmap.openInfoWindow(self.infoWindow, new BMap.Point(this.getCenter().lng, this.getCenter().lat))
          })
          marker.addEventListener('mouseout', function(e, point) {
            self.bmap.closeInfoWindow()
          })
          myConfig['layer'].push(marker)
          this.bmap.addOverlay(marker)
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
      this.bmap.centerAndZoom(new BMap.Point(pointArr[oneI].LONGITUDE, pointArr[oneI].LATITUDE), 6)
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
            this.bmap.panTo(new BMap.Point(nowPosition.LONGITUDE, nowPosition.LATITUDE))
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
      this.bmap.addOverlay(polyline)
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
      this.bmap.addOverlay(marker)
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
        self.bmap.openInfoWindow(self.infoWindow, new BMap.Point(this.getCenter().lng, this.getCenter().lat))
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
        this.bmap.addOverlay(marker)
        let iconUrl = require('../../../assets/img/security/typhoon.png')
        let icon = new BMap.Icon(iconUrl, new BMap.Size(40, 40), { imageSize: new BMap.Size(40, 40) })
        let marker1 = new BMap.Marker(latLng, { icon: icon })
        item.blastingLayer.push(marker1)
        this.bmap.addOverlay(marker1)
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
          this.bmap.removeOverlay(item.blastingLayer[i])
        }
        item.blastingLayer = []
      }
    },
    clearTyphoon(item) {
      if (item.layer.length > 0) {
        console.log(item)
        for (let i in item.layer) {
          this.bmap.removeOverlay(item.layer[i])
        }
        item.layer = []
      }
      this.clearBlastRing(item)
    },
    clearMapData() {
      this.bmap.clearOverlays()
    },
    getRainColor(item) {
      let color = ''
      if (item.RAIN <= 10) {
        color = '#99ff99'
      } else if (item.RAIN > 10 && item.RAIN <= 25) {
        color = '#58cc41'
      } else if (item.RAIN > 25 && item.RAIN < 50) {
        color = '#66bdff'
      } else if (item.RAIN >= 50 && item.RAIN < 100) {
        color = '#b5adee'
      } else if (item.RAIN >= 100 && item.RAIN < 250) {
        color = '#ff33ff'
      } else {
        color = '#ad3737'
      }
      return color
    }
  },
  watch: {},
  components: {
    Menus,
    dispatch,
    offSiteList
  },
  beforeDestroy() { }
}
</script>

<style></style>
