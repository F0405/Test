<template>
  <el-table :data="orderData" border stripe :height="orderHeight">
    <el-table-column label="订单编号" prop="number" align="center" />
    <el-table-column label="ERP订单编号" prop="ERPNumber" align="center" />
    <el-table-column label="订单金额" prop="money" align="center" />
    <el-table-column label="订单支付类型" prop="type" align="center" />
    <el-table-column label="下单时间" prop="time" align="center" />
    <el-table-column label="订单状态" prop="status" align="center" />
    <el-table-column label="操作" width="100" align="center">
      <template slot-scope="{row}">
        <el-button type="text" size="small" @click="orderCheck(row)">
          查看订单
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
const orderData = [
  { number: '123456789', ERPNumber: '123456789', money: '￥12.80', type: '在线支付', time: '2019-04-09 12:22:12', status: '已取消' },
  { number: '123456789', ERPNumber: '123456789', money: '￥12.80', type: '货到付款', time: '2019-04-09 12:22:12', status: '已取消' },
  { number: '123456789', ERPNumber: '123456789', money: '￥12.80', type: '在线支付', time: '2019-04-09 12:22:12', status: '已取消' },
  { number: '123456789', ERPNumber: '123456789', money: '￥12.80', type: '在线支付', time: '2019-04-09 12:22:12', status: '已取消' },
  { number: '123456789', ERPNumber: '123456789', money: '￥12.80', type: '在线支付', time: '2019-04-09 12:22:12', status: '已取消' }
]
export default {
  data() {
    return {
      orderHeight: '',
      orderData
    }
  },
  created() {
    this.getOrderHeight()
  },
  methods: {
    getOrderHeight() {
      this.orderHeight = window.innerHeight * 0.52
    },
    orderCheck(e) {
      console.log('查看订单,需要跳转')
    }
  }
}
</script>
