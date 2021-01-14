
<!-- 已完成 -->
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
        type="datetimerange"
        range-separator="至"
        :picker-options="timeChange"
        :default-time="['00:00:00','23:59:59']"
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
        style="width: 200px;vertical-align: top;margin-right: 16px;"
        placeholder="请选择渠道"
        collapse-tags
        :props="{multiple:true}"
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
    >
      <!-- 订单详情 -->
      <el-table-column label="订单编号" align="center" width="171">
        <template slot-scope="{ row }">
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
          <div v-if="!update" class="table_item">
            <el-input
              v-model="row.erpId"
              style="100px"
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
            {{ row.totalAmount/100 }}
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
      <el-table-column label="操作" width="100" align="center" />
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
        <el-button type="primary" size="small" @click="handleDao">
          导出
        </el-button>
      </span>
      <span v-if="!flag" slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="orderinfo">查看订单信息 </el-button>
        <el-button type="primary" size="small" style="width:110px" @click="yesinfo">同意 </el-button>
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
import Cookies from 'js-cookie'
import Pagination from '@/components/Pagination'
import request from '@/utils/request'
import { mapGetters } from 'vuex'
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
const allData = [
  { label: '售点ID', id: '1' },
  { label: '售点名称', id: '2' },
  { label: 'ERP客户ID', id: '3' },
  { label: '店主手机号', id: '4' },
  { label: '店主姓名', id: '5' },
  { label: '渠道', id: '6' },
  { label: '子渠道', id: '8' }
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
  props: {},
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
      // 分页
      query: {
        total: 0,
        current: 1,
        size: 20,
        id: undefined,
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
      allData,
      upDataShow: false,
      upResShow: false,
      checkList: [], // 多选框
      payType: '',
      noorder: '',
      orderSn: '',
      // 时间
      time: {
        createStartTime: null,
        createEndTime: null
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
    handlebj() {
      this.update = false
    },
    // 时间
    formatTime(time) {
      this.time.createStartTime = time[0]
      this.time.createEndTime = time[1]
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
        url: '/order-service/management/confirm/send',
        data: {
          orderSn: row.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.$message.success('确认送达成功')
            this.getpropertyList()
          }
        })
        .catch((err) => {
          console.log(err)
        })
      console.log('TODO', row)
    },
    changTime(val) {
      console.log(val)
    },
    // erp是否有
    handleerp(val) {
      this.erp.yes = val
      this.erp.no = val
    },
    // 列表
    getpropertyList() {
      request({
        url: '/order-service/management/order/management/ws/list',
        data: {
          pageSize: this.query.size,
          pageNum: this.query.current,
          orderStatus: 3
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.saleListData = resp.data.list
            console.log(this.saleListData)
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
    formatStartTime(val) {
      this.valueTime = val
      console.log(this.valueTime)
    },
    // 导出
    // 导出
    exportSure() {
      if (this.query.id !== '' && this.query.id || this.query.name !== '' && this.query.name || this.query.phone !== '' && this.query.phone) {
        this.flag = true
        var xhr = new XMLHttpRequest()
        // post方式请求后台的路径
        xhr.open('get', `https://bees-server-dev.ab-inbev.cn/order-service/management/export/excel?orderSn=${this.query.id}&receiverName=${this.query.name}&receiverPhone=${this.query.phone}`, true)
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
          orderSn: this.query.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.saleListData = resp.data.list
            this.query.total = resp.data.totalCount
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
          orderStatus: 3,
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
          console.log(err)
        })
    },
    // 重置
    resetFilter(e) {
      e.id = ''
      e.name = ''
      e.valueTime = ''
      e.createTime = ''
      e.channel = ''
      e.payStyle = ''
      e.phone = ''
      e.status = ''
      e.ERPID = ''
      this.time.createStartTime = ''
      this.time.createEndTime = ''
      this.getpropertyList()
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
      console.log(row, 'row')
      const info = { orderSn: row.orderSn, erpId: row.erpId, wsStorename: row.wsStorename, pocId: row.pocId, receiverName: row.receiverName, receiverPhone: row.receiverPhone, createTime: row.createTime, paymentTime: row.paymentTime, skuName: row.orderItems[0].skuName, skuQuantity: row.orderItems[0].skuQuantity, skuPrice: row.orderItems[0].skuPrice, msg: row.status.msg, erpSku: row.orderItems[0].erpSku, sapSku: row.orderItems[0].sapSku, skuId: row.orderItems[0].skuId, productAmount: row.orderItems[0].productAmount, receiverDetailAddress: row.receiverDetailAddress, m1Username: row.m1Username, m1Phone: row.m1Phone, channalName: row.channalName, subChannalName: row.subChannalName, msgt: row.payType.msg, totalAmount: row.totalAmount, payAmount: row.payAmount, discountAmount: row.discountAmount, skuImg: row.orderItems[0].skuImg }
      localStorage.setItem('data', JSON.stringify(info))
      this.$router.push({
        path: 'detail'
      })
    },
    // 确认送达
    shipping(row) {
      console.log(row, '2131')
      request({
        url: '/order-service/management/confirm/send',
        data: {
          orderSn: row.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.$message.error('发货成功')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 导出事件
    handleDao() {
      console.log(111)
      request({
        url: '/order-service/management/export/excel',
        data: {
          pageSize: this.query.size,
          pageNum: this.query.current
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            console.log(resp.data, 200)
          }
        })
        .catch((err) => {
          console.log(err)
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
      console.log(row)
      const info = { orderSn: row.orderSn, erpId: row.erpId, wsStorename: row.wsStorename, pocId: row.pocId, receiverName: row.receiverName, receiverPhone: row.receiverPhone, createTime: row.createTime, paymentTime: row.paymentTime, skuName: row.orderItems[0].skuName, skuQuantity: row.orderItems[0].skuQuantity, skuPrice: row.orderItems[0].skuPrice, msg: row.status.msg, erpSku: row.orderItems[0].erpSku, sapSku: row.orderItems[0].sapSku, skuId: row.orderItems[0].skuId, productAmount: row.orderItems[0].productAmount, receiverDetailAddress: row.receiverDetailAddress, m1Username: row.m1Username, m1Phone: row.m1Phone, channalName: row.channalName, subChannalName: row.subChannalName, msgt: row.payType.msg, totalAmount: row.totalAmount, payAmount: row.payAmount, discountAmount: row.discountAmount, skuImg: row.orderItems[0].skuImg }
      localStorage.setItem('data', JSON.stringify(info))
      this.orderNo = row.orderNo
      this.exportShow = true
      this.orderSn = row.orderSn
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
    yesinfo() {
      request({
        url: '/order-service/management/check/cancle',
        data: {
          orderSn: this.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.exportShow = false
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

