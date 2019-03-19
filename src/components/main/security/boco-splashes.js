/* eslint-disable */
import L from 'leaflet'

// Leaflet < 0.8 compatibility
if (typeof L.Layer === 'undefined') {
  L.Layer = L.Class;
}
let BocoSplashes = L.Layer.extend({
  initialize: function(config) {
    this._cfg = config;
    this._data = [];
    this._el = L.DomUtil.create('div', 'leaflet-zoom-hide');
    this._el.style.left = "0px";
    this._el.style.top = "0px";
    this._canvas = document.createElement('canvas');
    this._el.appendChild(this._canvas);
    this._ctx = this._canvas.getContext('2d');
    this._layerGroup = L.layerGroup();
  },
  setOption:function(config){
    this._cfg = config;
    this._update();
  },
  onAdd: function(map) {
    let size = map.getSize();
    this._map = map;
    this._width = size.x;
    this._height = size.y;
    this._el.style.width = size.x + 'px';
    this._el.style.height = size.y + 'px';
    this._el.style.position = 'absolute';
    this._canvas.width = size.x;
    this._canvas.height = size.y;
    this._origin = this._map.layerPointToLatLng(new L.Point(0, 0));
    map.getPanes().overlayPane.appendChild(this._el);
    map.on('moveend', this._reset, this);
    this._update();
  },
  addTo: function(map) {
    map.addLayer(this);
    this._layerGroup.addTo(map);
    return this;
  },
  onRemove: function(map) {
    this._layerGroup.clearLayers();
    map.removeLayer(this._layerGroup);
    map.getPanes().overlayPane.removeChild(this._el);
    map.off('moveend', this._reset, this);
    this._data = [];
  },
  clear: function() {
    this._ctx.clearRect(0, 0, this._width, this._height);
    this._layerGroup.clearLayers();
    this._data = [];
  },
  _clear: function() {
    this._ctx.clearRect(0, 0, this._width, this._height);
    this._layerGroup.clearLayers();
  },
  _draw: function() {
    if (!this._map) { return; }

    var mapPane = this._map.getPanes().mapPane;
    var point = mapPane._leaflet_pos;

    // reposition the layer
    this._el.style[BocoSplashes.CSS_TRANSFORM] = 'translate(' +
      -Math.round(point.x) + 'px,' +
      -Math.round(point.y) + 'px)';

    this._update();
  },
  _update: function() {
    // console.time('本次渲染消耗时间：');
    if (this._data.length == 0) {
      this._clear();
      return;
    }

    let labelField = this._cfg.labelField || 'label';
    let valueField = this._cfg.valueField;
    let gradient = this._cfg.gradient ? this._cfg.gradient : [
      { min: 0, max: 33, color: 'rgb(0,255,0)' },
      { min: 33, max: 66, color: 'rgb(0,255,0)' },
      { min: 66, max: 100, color: 'rgb(0,255,0)'}
    ];
    let len = this._data.length;
    let bounds = this._map.getBounds();
    let validData = [];

    while (len--) {
      let entry = this._data[len];
      let latlng = entry.latlng;

      if (!bounds.contains(latlng)) {
        continue;
      }

      let value = Number(entry[valueField]);
      let point = this._map.latLngToContainerPoint(latlng);
      let latlngPoint = { x: Math.round(point.x), y: Math.round(point.y) };
      latlngPoint.latlng = latlng;
      latlngPoint.label = entry[labelField];
      latlngPoint.color = 'rgb(0,255,0)';
      for (let i = 0; i < gradient.length; i++) {
        let entry = gradient[i];
        let min = entry['min'] ? entry['min'] : null;
        let max = entry['max'] ? entry['max'] : null;
        if (min && max) {
          if (value >= min && value < max) {
            latlngPoint.color = entry['color'];
            latlngPoint.item = i;
            break;
          } else {
            continue;
          }
        }
        if (min && !max) {
          if (value >= min) {
            latlngPoint.color = entry['color'];
            latlngPoint.item = i;
            break;
          } else {
            continue;
          }
        }
        if (!min && max) {
          if (value < max) {
            latlngPoint.color = entry['color'];
            latlngPoint.item = i;
            break;
          } else {
            continue;
          }
        }
      }
      validData.push(latlngPoint);
    }
    if (validData.length > 100) {
      this._drawPointMarker(validData);
    } else {
      this._drawIconMarker(validData);
    }
  },
  /** 地图放大到一定级别,用图片替换点 */
  _drawIconMarker: function(validData) {
    let len = validData.length;
    // console.log('本次渲染点个数：' + len);
    let scale = Math.pow(2, this._map.getZoom());
    let radiusScale = this._cfg.scaleRadiusDiv ? scale : 0;
    let radius = this._cfg.radiusDiv * radiusScale;
    let maxDivRadius = this._cfg.maxDivRadius;
    if (maxDivRadius && radius > maxDivRadius) {
      radius = maxDivRadius;
    }
    let gradient = this._cfg.gradient ? this._cfg.gradient : [
      { min: 0, max: 33, color: 'rgb(0,255,0)' },
      { min: 33, max: 66, color: 'rgb(0,255,0)' },
      { min: 66, max: 100, color: 'rgb(0,255,0)'}
    ];
    let styleDom = document.getElementById("gis_ripple");
    let styleStr = '';
    for (let i = 0; i < gradient.length; i++) {
      styleStr += `.gis-ripple-${i}:before{\ncontent:' ';position: absolute;z-index:2;left:0;top:0;width:${radius}px;height:${radius}px;background-color: ${gradient[i]['color']};border-radius: 50%;\n}\n`;
      styleStr += `.gis-ripple-${i}:after{\ncontent:' ';position: absolute;z-index:1;width:${radius}px;height:${radius}px;background-color: ${gradient[i]['color']};border-radius: 50%;box-shadow: 0 0 10px rgba(0,0,0,.3) inset;animation-name: gis-ripple-${i};animation-duration: 1s;animation-timing-function: ease;animation-delay: 0s;animation-iteration-count: infinite;animation-direction: normal;\n}\n`;
      styleStr += `@keyframes gis-ripple-${i}{\n0% {left:${radius/2}px;top:${radius/2}px;opcity:1;width:0;height:0;}\n100% {left:-20px;top:-20px;opacity: 0;width:${radius + 40}px;height:${radius + 40}px;}\n}\n`;
    }
    styleDom.innerHTML = styleStr;
    while (len--) {
      let entry = validData[len];
      let latLng = entry.latlng;
      let icon = L.divIcon({
        html: `<div class="gis-ripple-${entry.item}"></div>`,
        iconSize: new L.Point(radius, radius)
      });
      let marker = L.marker(latLng, { icon: icon });
      this._layerGroup.addLayer(marker);
      if(entry.label){
        let popup = L.popup({
          closeButton : false,
          className: 'gis-splashes-popup'
        }).setContent('<div>' + entry.label + '</div>');
        marker.addEventListener('mouseover',function(obj){
          popup.setLatLng(obj.latlng);
          popup.openOn(this._map);
        });
        marker.addEventListener('mouseout',function(obj){
          popup._close();
        });
      }
    }
    // console.timeEnd('本次渲染消耗时间：');
  },
  /** 地图缩小到一定级别,则画点表示基站 */
  _drawPointMarker: function(validData) {
    let len = validData.length;
    // console.log('本次渲染点个数：' + len);
    // radius根据图层缩放缩放
    let scale = Math.pow(2, this._map.getZoom());
    let radiusScale = this._cfg.scaleRadius ? scale : 1;
    let radius = this._cfg.radius * radiusScale;
    let maxRadius = this._cfg.maxRadius;
    if (maxRadius && radius > maxRadius) {
      radius = maxRadius;
    }
    while (len--) {
      let entry = validData[len];
      this._ctx.beginPath();
      this._ctx.fillStyle = entry.color;
      let cx = entry.x;
      let cy = entry.y;
      this._ctx.moveTo(cx, cy);
      this._ctx.arc(cx, cy, radius, 0, 2 * Math.PI, true);
      this._ctx.fill();
      this._ctx.closePath();
    }
    // console.timeEnd('本次渲染消耗时间：');
  },
  setData: function(data) {
    let latField = this._cfg.latField || 'lat';
    let lngField = this._cfg.lngField || 'lng';
    let valueField = this._cfg.valueField || 'value';
    let labelField = this._cfg.labelField || 'label';

    // transform data to latlngs
    let len = data.length;
    let d = [];
    while (len--) {
      let entry = data[len];
      let latlng = new L.LatLng(entry[latField], entry[lngField]);
      let dataObj = { latlng: latlng };
      dataObj[valueField] = entry[valueField];
      if (entry[labelField]) {
        dataObj[labelField] = entry[labelField];
      }
      d.push(dataObj);
    }
    this._data = d;
    this._clear();
    this._draw();
  },
  _reset: function() {
    this._origin = this._map.layerPointToLatLng(new L.Point(0, 0));
    let size = this._map.getSize();
    if (this._width !== size.x || this._height !== size.y) {
      this._width = size.x;
      this._height = size.y;

      this._el.style.width = this._width + 'px';
      this._el.style.height = this._height + 'px';
    }
    this._clear();
    this._draw();
  }
});

BocoSplashes.CSS_TRANSFORM = (function() {
  let div = document.createElement('div');
  let props = [
    'transform',
    'WebkitTransform',
    'MozTransform',
    'OTransform',
    'msTransform'
  ];
  for (let i = 0; i < props.length; i++) {
    let prop = props[i];
    if (div.style[prop] !== undefined) {
      return prop;
    }
  }
  return props[0];
})();

export default BocoSplashes;
