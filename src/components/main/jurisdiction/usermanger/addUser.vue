<!---->
<template>
  <div class="j-user-add">
    <div class="content">
      <div>
        <div class="title">添加用户</div>
        <div class="add-li"></div>
        <div class="button confirm-button">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
    },
    methods: {},
    watch: {}
  }
</script>

<style lang="less" rel="stylesheet/less">
.j-user-add {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    position: relative;
    border: 1px solid #475465;
    border-radius: 8px;
    background: rgba(104, 116, 131, 0.5);
    height: 50%;
    width: 30%;
    min-width: 280px;
    min-height: 305px;
    padding: 10px;
    >div {
      border-radius: 8px;
      width: 100%;
      height: 100%;
      border: 1px solid #2D363E;
      background: #B1BFD1;
      .title {
        color: #14263D;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 2px;
        margin-left: 15px;
        margin-top: 5px;
      }
      .add-li {
        height: 70%;
        width: 90%;
        background: #475465;
        margin: 10px auto;
      }
      .confirm-button {
        margin: 0 auto;
      }
    }
  }
  .button {
    border: 1px solid #202D3D;
    border-radius: 3px;
    width: 55px;
    color: #ffffff;
    height: 32px;
    line-height: 28px;
    text-align: center;
    font-size: 18px;
    background: #1ba4e7;
    cursor: pointer;
    letter-spacing: 2px;
    margin: 0px 5px;
    box-shadow: 0px 0.5px 0 #fff inset;
    //box-shadow: 0 1px 0 #9CA9B9;
  }
}
.blur {
  /*-webkit-filter: blur(2px);*/
  /*-moz-filter: blur(2px);*/
  /*-ms-filter: blur(2px);*/
  /*filter: blur(2px);*/
  position: relative;
}
</style>
