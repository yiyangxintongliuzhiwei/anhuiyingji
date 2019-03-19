<!-- component template -->
<template>
  <table class="custom-table">
    <thead>
    <tr>
      <th v-for="item in columns" @click="sortBy(item.field)"
          :class="{active: sortKey == item.field }"
          :style="{maxWidth:(item.maxWidth?item.maxWidth+'px':'')}">
        <span v-if="!item.hidden" v-html="item.alias"></span>
        <span v-if="sortKey == item.field" class="arrow"
              :class="sortOrders[item.field] > 0 ? 'asc' : 'dsc'">
        </span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr class="allData" v-for="(entry, index) in filteredData" @click="onRowClicked(entry, $event)">
      <td v-for="(item, itemIndex) in columns" @click="onCellClicked(item, entry , $event)"
          :style="{maxWidth:(item.maxWidth?item.maxWidth+'px':'')}" @mouseover="showIndex = itemIndex;showRowIndex = index" @mouseout="showIndex = -1;showRowIndex = -1">
        <div v-if="item.formatter" v-html="item.formatter(entry[item.field])"></div>
        <div v-if="!item.formatter">
          {{entry[item.field]}}
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style rel="stylesheet/less" lang="less">
  .custom-table {
    text-align: center;
    width: 100%;
    border: 0;
    border-spacing: 0;
    position: relative;
  }
  .allData {
    .data {
      position: absolute;
      color: #4F4F4F;
      display: inline-block;
      background-color: #fff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
      border-radius: 4px;
      width: 100px;
      height: 20px;
     // left: 10px;
    }
  }
  .custom-table thead {
    background-color: #70A3D3;
    color: #FFF;
    cursor: pointer;
  }

  .custom-table th {
    text-align: center;
    height: 46px;
    font-size: 14px;
    font-weight: bold;
  }

  .custom-table tbody {
    color: #FFFFFF;
    font-size: 12px;
  }

  .custom-table tbody tr:nth-child(2n+1) {
    background: #6492BE
  }

  .custom-table tbody tr:nth-child(2n) {
    background: #70A3D3
  }

  .custom-table tbody tr {
    height: 30px;
  }

  .custom-table .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .custom-table .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #000;
  }

  .custom-table .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #000;
  }
</style>
<script>
  export default {
    name: 'data-table',
    replace: true,
    props: {
      data: Array,
      columns: Array,
      filterKey: String,
      isSortAble: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      var sortOrders = {};
      this.columns.forEach(function(column) {
        sortOrders[column.field] = 1
      });
      return {
        sortKey: '',
        sortOrders: sortOrders,
        eventPrefix: 'vuetable:',
        showIndex: false,
        showRowIndex: false
      }
    },
    computed: {
      filteredData: function() {
        var sortKey = this.sortKey;
        var filterKey = this.filterKey && this.filterKey.toLowerCase();
        var order = this.sortOrders[sortKey] || 1;
        var data = this.data;
        /* 过滤 */
        if (filterKey) {
          data = data.filter(function(row) {
            return Object.keys(row).some(function(key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        /* 排序 */
        if (sortKey) {
          data = data.slice().sort(function(a, b) {
            a = a[sortKey];
            b = b[sortKey];
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },
    filters: {
      capitalize: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function(key) {
        //        if (this.isSortAble || isSortAble) {
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1
        //        }
      },
      onRowClicked: function(dataItem, event) {
        this.$emit(this.eventPrefix + 'row-clicked', dataItem, event);
        return true
      },
      onCellClicked: function(dataItem, entry, event) {
        this.$emit(this.eventPrefix + 'cell-clicked', dataItem, entry, event)
      }
    }
  }
</script>
