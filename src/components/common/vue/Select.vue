<template lang="html">
  <div class="selector-wrap" :class="{noBottomRadius: showOptions && hasOptions}" @mouseleave="closeList">
    <div class="selector" @click="showList(index)">
      <input type="text" readonly v-model="selectedOption" :placeholder="placeholder">
      <i class="iconfont icon-31xiala" :class="{trans: showOptions}"></i>
    </div>
    <ul class="options" v-show="showOptions==true">
      <li :class="{selectedItem: index==selectIndex}" v-for="(option, index) in options"
          @click="chooseItem(index, option)">{{option}}
      </li>
    </ul>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'bo-select',
    props: {
      options: {
        type: [String, Array],
        default: () => []
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      changeItem: ''
    },
    data() {
      return {
        showOptions: false,
        selectIndex: 0,
        selectedOption: '',
        hasOptions: false,
        index: 0
      }
    },
    methods: {
      /**
       * show options
       * @param index
       */
      showList(index) {
        this.showOptions = !this.showOptions;
      },
      /**
       * close options
       */
      closeList() {
        this.showOptions = false;
      },
      /**
       * select item
       * @param index
       * @param option
       */
      chooseItem(index, option) {
        this.selectIndex = index;
        this.selectedOption = option;
        this.showOptions = false;
        this.$emit('onSelect', option, index);
      }
    },
    watch: {
      changeItem(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.selectIndex = this.options.indexOf(newVal);
          this.selectedOption = newVal;
        }
      }
    },
    beforeUpdate() {
      if (this.options && this.options.length > 0) {
        this.hasOptions = true;
      }
    },
    mounted() {
      this.selectedOption = this.changeItem;
      if (this.options && this.options.length > 0) {
        this.selectedOption = this.options[0]
      }
    }
  }
</script>
<style lang='less' rel="stylesheet/less">
  .selector-wrap {
    display: inline-block;
    position: relative;
    font-family: "Microsoft Yahei", "微软雅黑";
    background-color: #CEDEEA;
    align-items: center;
    width: 120px;
    /*min-width: 120px;*/
    height: 30px;
    font-size: 14px;
    /*z-index: 20;*/
    border-radius: 15px;

    .selector {
      color: #4F4F4F;
      opacity: 1;
      width: inherit;
      height: inherit;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      input {
        font-family: inherit;
        cursor: pointer;
        border: none;
        outline: none;
        color: inherit;
        background-color: transparent;
        height: inherit;
        width: 75%;
        box-sizing: border-box;
        padding: 0 2% 0 15%;
        letter-spacing: 2px;
      }
      i {
        color: inherit;
        margin: 0 10% 0 0;
        transition: transform .3s;
      }
      .trans {
        transition: transform .3s;
        transform: rotate(180deg);
      }
    }

    .options {
      position: absolute;
      opacity: 1;
      width: 100%;
      height: auto;
      max-height: 180px;
      overflow-y: auto;
      background-color: #EAF1F6;
      text-align: center;
      margin: 0;
      padding: 0;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      transition: all 0.2s ease;
      box-shadow: 1px 1px 1px #DDD;
      z-index: 1;
      li {
        color: #4F4F4F;
        opacity: 0.6;
        list-style: none;
        padding: 5px 0;
        cursor: pointer;
      }
      li:hover {
        opacity: 0.9;
      }
      li.selectedItem {
        color: #0089DB !important;
        opacity: 0.7 !important;
      }
    }
  }

  .noBottomRadius {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>
