<!-- 售点买家详情 -->
<template>
  <div>
    <div class="basicInfo">
      <p><span>基本信息</span></p>
      <el-form :model="form">
        <el-col v-for="(item,index) in formDetail" :key="index" :span="6">
          <el-form-item :label="item.name" label-width="60">
            <span>{{ form[item.value] }}</span>
          </el-form-item>
        </el-col>
        <div class="status" @click="statusShow=true">{{ status }}</div>
      </el-form>
    </div>
    <!-- 状态变更 -->
    <el-dialog
      :visible.sync="statusShow"
      width="40%"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div>
          <i class="el-icon-tickets" style="color: #13ce66;margin-right:3px;" />
          <span>维护ERP ID</span>
        </div>
      </template>
      <div v-if="status=='禁用'">
        禁用后售点将不能进行在商城端进行任何操作，是否继续禁用售点？
      </div>
      <div v-else>
        启用后售点将可以在商城端进行任何操作，是否继续启用售点？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statusShow = false">取 消</el-button>
        <el-button type="primary" @click="statusSure(status)">确 定</el-button>
      </span>
    </el-dialog>

    <div ref="under" class="under" :style="{height: underHeight+ 'px'}">
      <div class="left">
        <el-tabs v-model="activeName">
          <el-tab-pane label="订单信息" name="order">
            <orderList />
          </el-tab-pane>
          <el-tab-pane label="促销信息" name="sale">
            <saleList />
          </el-tab-pane>
          <el-tab-pane label="售点全部信息" name="all">
            <allInfo />
          </el-tab-pane>
        </el-tabs>
        <!-- <div class="btn">
          <div :class="{selected:info=='order'}" @click="info='order'">订单信息</div>
          <div :class="{selected:info=='sale'}" @click="info='sale'">促销信息</div>
          <div :class="{selected:info=='all'}" @click="info='all'">售点全部信息</div>
        </div>
        <orderList v-show="info=='order'" />
        <saleList v-show="info=='sale'" />
        <allInfo v-show="info=='all'" /> -->
      </div>
      <div class="right">
        <p>动态</p>
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in progressItems"
            :key="index"
            type="success"
            :timestamp="item.timestamp"
          >
            {{ item.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
import orderList from './detail/order-list'
import saleList from './detail/sale-list'
import allInfo from './detail/all-info'
const formDetail = [
  { name: '售点名称：', value: 'name' },
  { name: '售点ID：', value: 'ID' },
  { name: '店主名称：', value: 'ownerName' },
  { name: '店主手机号：', value: 'ownerPhone' },
  { name: 'ERP 售点ID：', value: 'ERP' },
  { name: 'BU：', value: 'BU' },
  { name: 'Area：', value: 'Area' },
  { name: '售点渠道：', value: 'channel' },
  { name: '客户状态：', value: 'status' },
  { name: '注册来源：', value: 'origin' },
  { name: '售点渠道：', value: 'channel' }
]
const form = {
  name: '1000000432',
  ID: '1000000432',
  ownerName: '李伟',
  ownerPhone: '15074334223',
  ERP: 'XXXXX2',
  BU: 'BUSE',
  Area: '温州',
  channel: '餐饮',
  status: '启用',
  origin: '经销商代表注册'
}
const progressItems = [
  {
    content: '下单成功',
    timestamp: '执行时间：2020-04-27 '
  }, {
    content: '首次下单',
    timestamp: '执行时间：2020-04-26 '
  }, {
    content: '首次登陆',
    timestamp: '执行时间：2020-04-28'
  }
]
export default {
  components: { orderList, saleList, allInfo },
  props: {},
  data() {
    return {
      formDetail,
      status: '',
      statusShow: false,
      form,
      activeName: 'order',
      // info: 'order',
      underHeight: '',
      progressItems
    }
  },
  computed: {
  },
  watch: {

  },
  created() {
    this.status = '禁用'
  },
  mounted() {
    this.underHeight = window.innerHeight - this.$refs.under.offsetHeight - 28
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    statusSure(e) {
      if (e === '启用') { // 启用
        this.status = '禁用'
      } else {
        this.status = '启用'
      }
      this.statusShow = false
    }
  }
}
</script>
<style  scoped>
.left .el-tabs__header {
  padding-left: 10px;
  box-sizing: border-box;
}
</style>
