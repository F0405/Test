
<!-- 全部订单管理 -->
<template>
  <div class="app-container">
    <!-- 条件搜索 -->

    <div class="filter-container">
      <el-input
        v-model.trim="query.id"
        placeholder="订单编号"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-input
        v-model.trim="query.erp"
        placeholder="ERP订单编码"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-input
        v-model.trim="query.name"
        placeholder="收货人姓名"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-date-picker
        v-model="query.valueTime"
        :picker-options="timeChange"
        :default-time="['00:00:00','23:59:59']"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="filter-item"
        value-format="yyyy-MM-dd HH:mm:ss"
        style="width:550px"
        @change="formatTime"
      />
      <el-cascader
        v-model="query.channel"
        :options="opetionChannel"
        :value="query.channel"
        :props="{multiple:true}"
        style="width: 200px;vertical-align: top;margin-right: 16px;"
        placeholder="请选择渠道"
        collapse-tags
        @change="handleChangeq"
      />
      <el-select
        v-model="query.payStyle"
        placeholder="支付方式"
        clearable
        style="width: 200px"
        class="filter-item"
        @change="changval"
      >
        <el-option
          v-for="item in payStyleOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model.trim="query.phone"
        placeholder="收货人电话"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-select
        v-model="query.ERPID"
        :placeholder="$t('customer.ERPID')"
        clearable
        style="width: 200px"
        class="filter-item"
        @change="handleerp"
      >
        <el-option
          v-for="item in ERPIDOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="primary"
        class="filter-item"
        @click="handleFilter(query)"
      >搜索</el-button>
      <el-button class="filter-item" @click="resetFilter(query)">重置</el-button>
    </div>
    <div class="dataList">
      数据列表
      <div class="fr">
        <el-button
          icon="el-icon-upload2"
          type="primary"
          size="mini"
          plain
          @click="exportSure"
        >导出</el-button>
      </div>
    </div>
    <!-- 表格列表 -->
    <el-table
      :data="saleListData"
      border
      stripe
      max-height="265"
      @selection-change="handleSelectionChange"
      @cell-click="cellClick"
    >
      <!-- 订单详情 -->
      <el-table-column label="订单编号" align="center" width="171">
        <template slot-scope="{ row }" :show-overflow-tooltip="true">
          <el-button type="text" @click="detail(row)">{{
            row.orderSn
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="ERP订单编号"
        align="center"
      >
        <template slot-scope="{row}" class="from">
          <div v-if="update" @click="handlebj">
            {{ row.erpId }}
          </div>
          <div v-else-if="!update&&row.erpId!==''" class="table_item">
            <el-input
              v-model="row.erpId"
              class="input"
              @blur="handleblur"
            />
            <el-button type="primary" style="width:30px;height:35px" icon="el-icon-edit" circle @click="handlecompile(row)" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="售点名称" prop="wsStorename" align="center" />
      <el-table-column label="售点ID" prop="pocId" align="center" />
      <el-table-column label="收货人" prop="receiverName" align="center" />
      <el-table-column label="联系电话" prop="receiverPhone" align="center" />
      <el-table-column label="渠道" align="center">
        <template slot-scope="{ row }">
          <span>
            {{ row.channalName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center">
        <template slot-scope="{ row }">
          <span>
            {{ row.totalAmount/100 }}￥
          </span>
        </template>

      </el-table-column>
      <el-table-column label="订单类型" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.payType.status===4">
            货到付款
          </span>
          <span v-else>
            线上付款
          </span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center">
        <template slot-scope="{ row }">
          <span>
            {{ row.payType.msg }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" prop="paymentTime" align="center" />
      <el-table-column label="下单时间" prop="createTime" align="center" />
      <el-table-column label="订单状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.status.msg }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="{ row }">
          <!-- 线上 -->
          <div v-if="row.status.code===1">
            <el-button type="primary" size="small" style="width:80px" @click="handleEdit(row)">
              发货
            </el-button>
          </div>
          <!-- 线下 -->
          <div v-else-if="row.status.code===0 || row.status.code===1">
            <el-button type="primary" size="small" style="width:80px" @click="deliver(row)">
              发货
            </el-button>
          </div>
          <!-- 确认送达 -->
          <div v-else-if="row.status.code===2">
            <el-button type="primary" size="small" @click="shipping(row)">
              确认送达
            </el-button>
          </div>
          <!-- 审核 -->
          <div v-else-if="row.status.code===5">
            <el-button type="primary" size="small" style="width:80px" @click="handleaudit(row)">
              审核
            </el-button>
          </div>
          <!-- 退款 -->
          <!-- <div v-else-if="row.status.code===4 && row.payStatus.status===1">
            <el-button type="primary" size="small" style="width:80px">
              退款
            </el-button>
          </div> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 导出 -->
    <el-dialog
      :visible.sync="exportShow"
      width="33%"
      :close-on-click-modal="false"
      center
      :title="flag?'导出信息':''"
    >
      <span>
        <div>
          <div v-if="!flag" class="boss">
            <p>售点老板要求取消订单。</p>
            <el-input v-model="noorder" placeholder="售点老板提交的备注" class="noorder" />
            <p>您是是否同意?</p>
          </div>
        </div>
        <div v-if="flag" class="export">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="city in cities" :key="city" :label="city">{{
              city
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </span>
      <span v-if="flag" slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="cancel"> 取消 </el-button>
        <el-button type="primary" size="small">
          导出
        </el-button>
      </span>
      <span v-if="!flag" slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="orderinfo">查看订单信息 </el-button>
        <el-button type="primary" size="small" style="width:110px" @click="handleyesinfo">同意 </el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <pagination
      v-show="saleListData.length > 0"
      :total="query.total"
      :page.sync="query.current"
      :close-on-click-modal="false"
      :limit.sync="query.size"
      @pagination="getList"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import request from '@/utils/request'
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'js-cookie'

// const channelOptions = [
//   { name: 'CR', value: '1' },
//   { name: '线下', value: '0' }
// ]
const payStyleOptions = [
  { name: '微信', value: '1' },
  { name: '支付宝', value: '2' },
  { name: '银行转账', value: '3' },
  { name: '支票', value: '4' }
]
const statusOptions = [
  { name: '有余量', value: '0' }
]
const ERPIDOptions = [
  { name: '是', value: '1' },
  { name: '否', value: '0' }
]
// 导出信息
const cityOptions = [
  '订单',
  'ERP订单编号',
  '下单时间',
  '售点名称',
  '售点ID',
  '收货人',
  '联系电话',
  '渠道',
  '订单金额',
  '收获地址',
  '订单支付类型',
  '支付时间',
  '订单状态',
  '订单商品'
]
export default {
  components: { Pagination }, // 分页

  data() {
    return {
      // 详情页id
      compile: '',
      orderNo: '',
      update: true,
      flag: true,
      cityOptions,
      // channelOptions,
      payStyleOptions,
      statusOptions,
      ERPIDOptions,
      saleListData: [],
      step: 2,
      checkAll: false, // 全选状态
      checkedCities: [], // 全选数组
      cities: cityOptions, // 全选
      isIndeterminate: true, // 全选
      auditFlag: true,
      list: [],
      // 分页
      query: {
        total: 0,
        current: 1,
        size: 10,
        id: '',
        orderSn: '',
        name: undefined,
        createTime: undefined,
        channel: undefined,
        payStyle: undefined,
        phone: undefined,
        status: undefined,
        ERPID: undefined,
        valueTime: '',
        erp: ''
      },
      timeChange: {
        disabledDate(date) {
          // 当天可选：date.getTime() < Date.now() - 24 * 60 * 60 * 1000 //date.getTime() < Date.now()
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      exportShow: false,
      editShow: false,
      erpForm: {
        name: undefined,
        id: undefined,
        orderSn: undefined
      },
      selectShow: false,
      upDataShow: false,
      upResShow: false,
      checkList: [], // 多选框
      payType: '',
      noorder: '', // 审核
      orderSn: '',
      // 时间
      time: {
        createStartTime: '',
        createEndTime: ''
      },
      // 支付状态
      payment: {
        Alipay: null, // 支付宝
        unionpay: null, // 银联
        pay: null
      },
      erp: {
        yes: null,
        no: null
      },
      // 渠道
      channel: []
    }
  },
  computed: {
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'optionRegion'])
  },
  watch: {},
  created() {
    this.getpropertyList()
    this.stateFormat()
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
    handlebj() {
      this.update = false
    },
    aa() {
      console.log(this.update)
    },
    // erp是否有
    handleerp(val) {
      this.erp.yes = val
      this.erp.no = val
    },
    // 时间
    formatTime(time) {
      this.time.createStartTime = time[0]
      this.time.createEndTime = time[1]
      console.log(this.time.createStartTime, this.time.createEndTime)
    },
    stateFormat(row, column) {
      console.log(row)
    },
    changval(val) {
      const value = Number(val)
      this.payType = value
      this.payment.Alipay = value
      this.payment.unionpay = value
      this.payment.pay = value
      console.log(this.payType, '支付')
    },
    handleEdit(row) {
      request({
        url: '/order-service/management/send/goods',
        data: {
          orderSn: row.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.$message.success('发货成功')
            this.getpropertyList()
            this.navigation()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 发货
    deliver(row) {
      request({
        url: '/order-service/management/send/goods',
        data: {
          orderSn: row.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.$message.success('发货成功')
            this.getpropertyList()
            this.navigation()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changTime(val) {
      console.log(val)
    },
    // 列表
    getpropertyList() {
      request({
        url: '/order-service/management/order/management/ws/list',
        data: {
          pageSize: this.query.size,
          pageNum: this.query.current
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.saleListData = resp.data.list
            this.query.total = resp.data.totalCount
            this.erpForm.id = resp.data.list.erpId
            this.erpForm.orderSn = resp.data.list.orderSn
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 分页
    getList(val) {
      this.query.current = val.page
      this.query.size = val.limit
      this.getpropertyList()
    },

    // 导出
    exportSure() {
      if (this.query.id !== '' && this.query.id || this.query.name !== '' && this.query.name || this.query.phone !== '' && this.query.phone || this.time.createStartTime !== '' && this.time.createStartTime || this.time.createEndTime !== '' && this.time.createEndTime) {
        this.flag = true
        var xhr = new XMLHttpRequest()
        // post方式请求后台的路径
        xhr.open('get', `https://bees-server-dev.ab-inbev.cn/order-service/management/export/excel?orderSn=${this.query.id}&receiverName=${this.query.name}&receiverPhone=${this.query.phone}&createStartTime=${this.time.createStartTime}&createEndTime=${this.time.createEndTime}&channelId=${this.channel}&payType=${this.payType}`, true)
        // 导出的Excel是二进制数据类型，所以设置为blob
        xhr.responseType = 'blob'
        // 请求头（key,value），请求头可以设置多个key-value对
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
        xhr.setRequestHeader('AuthenToken', Cookies.get('AuthenToken'))
        xhr.setRequestHeader('type', 1)
        // 返回成功，导出的Excel文件
        xhr.onload = function () {
          if (this.status === 200) {
            var blob = this.response
            var a = document.createElement('a')
            var url = window.URL.createObjectURL(blob)
            a.href = url
            // 设置文件名称
            a.download = 'test.xlsx'
            a.click()
          }
        }
        var feeDate = null // document.getElementById("")//$('#feeDate').val()
        // 请求的参数，json格式，后台要用json格式接收
        xhr.send(JSON.stringify({
          'feeDate': feeDate
        }))
      } else {
        this.flag = true
        var xhrr = new XMLHttpRequest()
        // post方式请求后台的路径
        xhrr.open('get', `https://bees-server-dev.ab-inbev.cn/order-service/management/export/excel`, true)
        // 导出的Excel是二进制数据类型，所以设置为blob
        xhrr.responseType = 'blob'
        // 请求头（key,value），请求头可以设置多个key-value对
        xhrr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
        xhrr.setRequestHeader('AuthenToken', Cookies.get('AuthenToken'))
        xhrr.setRequestHeader('type', 1)
        // 返回成功，导出的Excel文件
        xhrr.onload = function () {
          if (this.status === 200) {
            var blob = this.response
            var a = document.createElement('a')
            var url = window.URL.createObjectURL(blob)
            a.href = url
            // 设置文件名称
            a.download = 'test.xlsx'
            a.click()
          }
        }
        var feeDatet = null // document.getElementById("")//$('#feeDate').val()
        // 请求的参数，json格式，后台要用json格式接收
        xhrr.send(JSON.stringify({
          'feeDate': feeDatet
        }))
      }
    },
    // 取消
    cancel() {
      this.exportShow = false
    },
    // 编辑
    handlecompile(row) {
      this.query.orderSn = row.orderSn
      this.query.erpId = row.erpId
      request({
        url: '/order-service/management/upload/erp',
        data: {
          erpId: this.query.erpId,
          orderSn: this.query.orderSn,
          pageSize: this.query.size,
          pageNum: this.query.current
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.saleListData = resp.data.list
            this.getpropertyList()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 表格事件
    cellClick(row) {
      row.isEdit = false
      console.log(row.isEdit)
    },
    // 查询
    handleFilter(val) {
      request({
        url: '/order-service/management/order/management/ws/list',
        data: {
          receiverName: this.query.name,
          orderSn: this.query.id,
          erpId: this.query.erp,
          receiverPhone: this.query.phone,
          pageSize: this.query.size,
          pageNum: this.query.current,
          payType: this.payType,
          // eslint-disable-next-line no-dupe-keys
          payType: this.payment.Alipay,
          // eslint-disable-next-line no-dupe-keys
          payType: this.payment.unionpay,
          // eslint-disable-next-line no-dupe-keys
          payType: this.payment.pay,
          isHaveErp: this.erp.yes,
          // eslint-disable-next-line no-dupe-keys
          isHaveErp: this.erp.no,
          createStartTime: this.time.createStartTime,
          createEndTime: this.time.createEndTime,
          channelId: this.channel
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.saleListData = resp.data.list
          }
        })
        .catch((err) => {
          console.log('err::::')
          console.log(err.response)
        })
    },
    // 重置
    resetFilter(e) {
      e.id = ''
      e.name = ''
      e.createTime = ''
      e.channel = ''
      e.payStyle = ''
      e.phone = ''
      e.status = ''
      e.ERPID = ''
      e.valueTime = ''
      e.valueTime = ''
      e.erp = ''
      this.time.createStartTime = ''
      this.time.createEndTime = ''
      this.handleFilter()
    },
    handleSelectionChange(val) {
      console.log('MMHH', val)
    },
    selectSure() {
      console.log(this.$refs.selectTree.getCheckedNodes())
      this.selectShow = false
    },
    add() {
      console.log(1)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },

    // 详情页
    detail(row) {
      const info = { orderSn: row.orderSn, erpId: row.erpId, wsStorename: row.wsStorename, pocId: row.pocId, receiverName: row.receiverName, receiverPhone: row.receiverPhone, createTime: row.createTime, paymentTime: row.paymentTime, skuName: row.orderItems[0].skuName, skuQuantity: row.orderItems[0].skuQuantity, skuPrice: row.orderItems[0].skuPrice, msg: row.status.msg, erpSku: row.orderItems[0].erpSku, sapSku: row.orderItems[0].sapSku, skuId: row.orderItems[0].skuId, productAmount: row.orderItems[0].productAmount, receiverDetailAddress: row.receiverDetailAddress, m1Username: row.m1Username, m1Phone: row.m1Phone, channalName: row.channalName, subChannalName: row.subChannalName, msgt: row.payType.msg, totalAmount: row.totalAmount, payAmount: row.payAmount, discountAmount: row.discountAmount, skuImg: row.orderItems[0].skuImg, code: row.status.code, status: row.payStatus.status }
      localStorage.setItem('data', JSON.stringify(info))
      this.$router.push({
        path: 'detail',
        query: {
          status: 4
        }
      })
    },
    // 确认送达
    shipping(row) {
      request({
        url: '/order-service/management/confirm/send',
        data: {
          orderSn: row.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.$message.success('发货成功')
            this.getpropertyList()
            this.navigation()
          }
        })
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleblur() {
      this.update = true
    },
    // 导出信息
    handleCheckedCitiesChange(value) {
      this.checkedCities = value
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    },
    // 审核
    handleaudit(row) {
      this.flag = false
      const info = { orderSn: row.orderSn, erpId: row.erpId, wsStorename: row.wsStorename, pocId: row.pocId, receiverName: row.receiverName, receiverPhone: row.receiverPhone, createTime: row.createTime, paymentTime: row.paymentTime, skuName: row.orderItems[0].skuName, skuQuantity: row.orderItems[0].skuQuantity, skuPrice: row.orderItems[0].skuPrice, msg: row.status.msg, erpSku: row.orderItems[0].erpSku, sapSku: row.orderItems[0].sapSku, skuId: row.orderItems[0].skuId, productAmount: row.orderItems[0].productAmount, receiverDetailAddress: row.receiverDetailAddress, m1Username: row.m1Username, m1Phone: row.m1Phone, channalName: row.channalName, subChannalName: row.subChannalName, msgt: row.payType.msg, totalAmount: row.totalAmount, payAmount: row.payAmount, discountAmount: row.discountAmount, skuImg: row.orderItems[0].skuImg }
      localStorage.setItem('data', JSON.stringify(info))
      this.orderNo = row.orderNo
      this.exportShow = true
      this.orderSn = row.orderSn
      request({
        url: '/order-service/management/refund/reason',
        data: {
          orderSn: this.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.noorder = resp.data.note
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 审核详情
    orderinfo() {
      this.$router.push({
        path: 'detail',
        query: {
          orderNo: this.orderNo,
          status: 1
        }

      })
    },
    // 渠道
    handleChangeq(val) {
      const a = val.map(item => item[0])
      const b = [...new Set(a)]
      this.channel = b
      console.log(this.channel)
    },
    // 订单审核同意
    handleyesinfo() {
      request({
        url: '/order-service/management/check/cancle',
        data: {
          orderSn: this.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.$message.success('审核同意')
            this.exportShow = false
            this.getpropertyList()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }
}
</script>
<style scoped lang='less'>
label {
  vertical-align: super;
}
.table_item{
  display: flex;
}
.input{
  width: 70px;
}
.from .el-input{
  width: 200px;
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
  width: 220px;
}
.export {
  width: 72%;
  margin: 0 auto;
}
.consent{
  width: 70px;
}
.boss{
  width: 70%;
  margin: 0 auto;
   p{ display: flex;
      justify-content: center;
   }
}

</style>

