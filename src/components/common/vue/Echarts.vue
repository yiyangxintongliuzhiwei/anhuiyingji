<template>
  <div class="echarts"></div>
</template>

<style>
  .echarts {
    width: 600px;
    height: 400px;
  }
</style>

<script>
  import echarts from 'echarts'
  export default {
    props: ['options', 'theme', 'initOptions', 'group', 'refFlag'],
    data: function() {
      return {chart: null}
    },
    computed: {
      // Only recalculated when accessed from JavaScript.
      // Won't update DOM on value change because getters don't depend on reactive values
      width: {
        cache: false,
        getter: function() {
          return this.chart.getWidth()
        }
      },
      height: {
        cache: false,
        getter: function() {
          return this.chart.getHeight()
        }
      },
      isDisposed: {
        cache: false,
        getter: function() {
          return this.chart.isDisposed()
        }
      }
    },
    methods: {
      // provide a explicit merge option method
      mergeOptions: function(options) {
        this.chart.setOption(options)
      },
      // just delegates ECharts methods to Vue component
      resize: function() {
        this.chart.resize()
      },
      getWidth: function() {
        this.chart.getWidth()
      },
      getHeight: function() {
        this.chart.getHeight()
      },
      getDom: function() {
        this.chart.getDom()
      },
      on: function(eventName, handler, context) {
        this.chart.on(eventName, handler, context)
      },
      off: function(eventName, handler) {
        this.chart.off(eventName, handler);
      },
      dispatchAction: function(payload) {
        this.chart.dispatchAction(payload)
      },
      showLoading: function() {
        this.chart.showLoading()
      },
      hideLoading: function() {
        this.chart.hideLoading()
      },
      getDataURL: function() {
        return this.chart.getDataURL()
      },
      clear: function() {
        this.chart.clear()
      },
      dispose: function() {
        this.chart.dispose()
      }
    },
    mounted: function() {
      let self = this;
      let chart = echarts.init(this.$el, this.theme, this.initOptions)
      chart.on('click', function(param) {
        self.$emit('chartClick', param)
      })
      // use assign statements to tigger "options" and "group" setters
      if (this.options) {
        chart.setOption(this.options);
      }
      this.$watch('options', function(options) {
        chart.setOption(options, true)
      }, {deep: true})
      chart.group = this.group
      this.$watch('group', function(group) {
        chart.group = group
      })
      this.chart = chart
      EventBridge.$on(EventBridge.WINDOW_CHANGE_EVENT, function() {
        setTimeout(function() {
          self.chart.resize();
        }, 0)
      });
    },
    connect: function(group) {
      if (typeof group !== 'string') {
        group = group.map(chart => chart.chart)
      }
      echarts.connect(group)
    },
    disconnect: function(group) {
      echarts.connect(group)
    },
    registerMap: function(name, geoData, area) {
      echarts.registerMap(name, geoData, area)
    },
    registerTheme: function(name, theme) {
      echarts.registerTheme(name, theme)
    }
  }
</script>
