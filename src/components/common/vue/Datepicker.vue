<template>
  <input class="datepicker-here" data-language="zh" placeholder="选择时间"/>
</template>

<style lang="less">
  .datepicker-here {
    font-family: "Microsoft Yahei", "微软雅黑";
    background-color: #CEDDE9;
    border: none;
    outline: none;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-indent: 10px;
  }
</style>

<script>
  import 'air-datepicker/dist/css/datepicker.min.css'
  import 'air-datepicker'
  import 'air-datepicker/dist/js/i18n/datepicker.zh'

  export default {
    name: 'date-picker',
    props: ['options'],
    data: function() {
      return {picker: null}
    },
    computed: {},
    methods: {},
    mounted: function() {
      $(this.$el).datepicker(this.options)
    }
  }
</script>
