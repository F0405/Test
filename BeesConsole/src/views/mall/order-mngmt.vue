<!-- 订单管理 -->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="'全部订单('+allCount+')'" name="first"><allorders /></el-tab-pane>
      <el-tab-pane :label="'待发货('+noSendCount+')'" name="second"><dropshipping /></el-tab-pane>
      <el-tab-pane :label="'待送达('+noReceiveCount+')'" name="third"><noserved /></el-tab-pane>
      <el-tab-pane :label="'已完成('+receiveCount+')'"><accomplish /></el-tab-pane>
      <el-tab-pane :label="'已取消('+cancleCount+')'" name="fourth1"><noaccomplish /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import allorders from './components/all-orders'
import dropshipping from './components/drop-shipping'
import accomplish from './components/accomplish'
import noserved from './components/no-served'
import noaccomplish from './components/noaccomplish'
import { mapActions, mapState } from 'vuex'
export default {
  components: { allorders, dropshipping, accomplish, noaccomplish, noserved },
  props: {},
  data() {
    return {
      activeName: 'first'

    }
  },
  computed: {
    ...mapState({
      allCount: state => state.order.allCount, // 全部
      noSendCount: state => state.order.noSendCount, // 代发货
      noReceiveCount: state => state.order.noReceiveCount, // 带送达
      receiveCount: state => state.order.receiveCount, // 已完成
      cancleCount: state => state.order.cancleCount// 已取消
    })
  },
  watch: {},
  created() {
    this.navigation()
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    ...mapActions('order', ['navigation']),
    handleClick(tab, event) {

    }
  }
}
</script>
<style scoped lang='less'>
label {
  vertical-align: super;
}
.file {
  position: relative;
  display: inline-block;
  width: 60%;
  height: 30px;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
}
.file input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 30px;
  opacity: 0;
}

.check-oo,
.el-checkbox {
  width: 150px;
  height: 40px;
  .el-checkbox__label {
    width: 150px;
    height: 30px;
    border: solid #ccc 1px;
    text-align: center;
    line-height: 30px;
    margin-left: 20px;
  }
}
.reset {
  margin: 0;
  width: 200px;
}
.export {
  width: 62%;
  margin: 0 auto;
}
</style>
