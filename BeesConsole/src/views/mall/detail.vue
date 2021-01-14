 <!-- 详情页 -->
<template>
  <div class="detail">
    <div class="detail-header">
      <div class="detail-header-left">
        <b>订单{{ orderSn }}:{{ msg }}</b>
      </div>
      <div class="detail-header-right">
        <div v-if="status===1&&code===4">
          <el-button type="primary" size="small" style="width:80px" @click="handlerefundtwo">
            退款
          </el-button>
        </div>
        <div v-if="this.$route.query.status===1&&this.$route.query.status===4" class="detail-header-right">
          <el-button v-if="flag===true" size="medium" type="primary" plain @click="handlenocancel">不取消订单</el-button>
          <el-button size="medium" type="primary" @click="handlecancel">取消订单</el-button>
        </div>
        <div v-else-if="code!==4" class="detai">
          <el-button v-if="!orderstatus" size="medium" type="primary" @click="handlecanceltt">取消订单</el-button>
          <el-button v-if="orderstatus" size="medium" type="primary" @click="handletk">退款</el-button>
        </div>
        <div class="export">
          <el-button size="medium" type="primary">导出订单信息</el-button>
        </div>
      </div>
    </div>
    <!-- 基本信息 -->
    <div class="detail-header-centent">
      <p>基本信息</p>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          label="ERP订单编号"
          align="center"
        >
          <template slot-scope="{row}">
            <span>
              {{ row.erpId }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="售点名称"
          align="center"
        >
          <template slot-scope="{row}">
            <span>
              {{ row.wsStorename }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="售点ID" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.pocId }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="payment" label="订单类型" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.msgt }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          label="销售员"
          align="center"
        >
          <template slot-scope="{row}">
            <span>
              {{ row.m1Username }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="销售员电话"
          align="center"
        >
          <template slot-scope="{row}">
            <span>
              {{ row.m1Phone }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="渠道" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.channalName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="payment" label="子渠道" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.subChannalName }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 收货人信息 -->
      <p>收货人信息</p>
      <el-table style="width: 100%" border :data="tableData">
        <el-table-column
          label="收货人"
          align="center"
        >
          <template slot-scope="{row}">
            <span>
              {{ row.receiverName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="收货人电话"
          align="center"
        >
          <template slot-scope="{row}">
            <span>
              {{ row.receiverPhone }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="收货人地址" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.receiverDetailAddress }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 订单信息 -->
      <p>订单信息</p>
      <el-table style="width: 100%" border :data="tableData">
        <el-table-column label="图片" width="180" align="center">
          <template slot-scope="{row}">
            <img :src="row.skuImg.detailImag.img1" alt="">
            <img :src="row.skuImg.detailImag.img2" alt="">
            <img :src="row.skuImg.detailImag.img3" alt="">
          </template>
          <template slot-scope="{row}">
            <img :src="row.skuImg.mainImag.img1" alt="">
            <img :src="row.skuImg.mainImag.img2" alt="">
            <img :src="row.skuImg.mainImag.img3" alt="">
          </template>
          <template slot-scope="{row}">
            <img :src="row.skuImg.shareImag.img1" alt="">
            <img :src="row.skuImg.shareImag.img2" alt="">
            <img :src="row.skuImg.shareImag.img3" alt="">
          </template>
        </el-table-column>
        <el-table-column label="名称" width="180" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.skuName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="促销活动" align="center" />
        <el-table-column label="商品政策编码" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.skuId }}

            </span>
          </template>

        </el-table-column>
        <el-table-column label="ERP商品政策编码" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.erpSku }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="SKU编码" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.baseSku }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="商品售卖价" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.skuPrice/100 }}￥
            </span>
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.skuQuantity }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="小计" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.skuPrice/100*row.skuQuantity }}￥
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="detail-header-footer">
        <div />
        <div class="many">
          <div><span>订单金额：</span>{{ totalAmount/100 }}￥</div>
          <div><span>折扣：</span>{{ discountAmount/100 }}￥</div>
          <div><span>实付金额：</span>{{ payAmount/100 }}￥</div>
        </div>
      </div>
      <!-- 操作信息 -->
      <p>操作信息</p>
      <el-table style="width: 100%" border :data="operationList">
        <el-table-column label="操作者" align="center">
          <template slot-scope="{row}">
            <span>
              {{ row.operateName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作时间"
          width="180"
          align="center"
        >
          <template slot-scope="{row}">
            <span>
              {{ row.createTime }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="{ row }">
            <span>
              {{ row.orderStatus.msg }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="付款状态" align="center">
          <template slot-scope="{ row }">
            <span>
              {{ row.payStatus.msg }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <span>
              {{ row.operStatus.msg }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="{ row }">
            <span>
              {{ row.note }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="determineFlag"
      width="15%"
      :close-on-click-modal="false"
      center
    >
      <div class="centent">
        您确定要取消订单吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="determineFlag = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handlerefundflag"
        >确定</el-button>
      </span>
    </el-dialog>
    <!-- 退款 -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="20%"
      :close-on-click-modal="false"
      center
    >
      <div class="centent">
        选择线上退款，您需要承担微信小程序0.06%得手续费
      </div>
      <p class=" reimburse">您确定需要退款吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleno">取 消</el-button>
        <!-- <el-button
          v-if="status===1"
          type="primary"
          @click="handlerefund"
        >确定退款</el-button> -->

        <el-button @click="handleoky">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      tableData: [],
      // 分页
      query: {
        total: 0,
        current: 1,
        size: 10
      },
      flag: true, // 不取消订单
      orderSn: '',
      centerDialogVisible: false,
      determineFlag: false,
      orderstatus: false,
      msg: '',
      many: {
        discountAmount: '',
        payAmount: '',
        totalAmount: ''
      },
      operationList: [],
      status: '',
      code: ''
    }
  },
  created() {
    this.detail()
    console.log(this.$route.query)
    this.operation()
  },
  methods: {
    detail() {
      var data1 = JSON.parse(localStorage.getItem('data'))
      this.code = data1.code
      this.status = data1.status
      console.log(this.code, this.status, '121221')
      this.tableData.push(data1)
      // console.log(this.tableData[0].orderSn)
      console.log(this.tableData[0].skuImg)
      this.orderSn = this.tableData[0].orderSn
      this.msg = this.tableData[0].msg
      this.discountAmount = this.tableData[0].discountAmount
      this.payAmount = this.tableData[0].payAmount
      this.totalAmount = this.tableData[0].totalAmount
    },
    // 确认发货
    operation() {
      request({
        url: '/order-service/app/ordert/detail/oper',
        data: {
          orderSn: this.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.operationList = resp.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handlecanceltt() {
      this.determineFlag = true
    },
    // 取消
    handlecancel() {
      request({
        url: '/order-service/management/check/cancle',
        data: {
          orderSn: this.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.determineFlag = true
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 退款
    handlerefund() {
      request({
        url: '/order-service/management/pay/fallback',
        data: {
          orderSn: this.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.centerDialogVisible = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handletk() {
      this.centerDialogVisible = true
    },
    // 退款弹框
    handlerefundflag() {
      this.orderstatus = true
      this.determineFlag = false
      request({
        url: '/order-service/management/check/cancle',
        data: {
          orderSn: this.orderSn
        },
        method: 'POST'
      })
    },
    // 退款
    handlerefundtwo() {
      request({
        url: '/order-service/management/pay/fallback',
        data: {
          orderSn: this.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.status = ''
            this.code = ''
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 不取消
    handlenocancel() {
      request({
        url: '/order-service/management/check/refused',
        data: {
          orderSn: this.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.$message.success('执行成功')
            this.flag = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 退款取消
    handleno() {
      this.centerDialogVisible = false
    },
    handleoky() {
      request({
        url: '/order-service/management/pay/fallback',
        data: {
          orderSn: this.orderSn
        },
        method: 'POST'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.determineFlag = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang='less'>
.detail {
  width: 90%;
  margin: 0 auto;
  .detail-header {
    display: flex;
    height: 80px;
    background: #ccc;
    line-height: 80px;
    justify-content: space-between;
    .detail-header-left {
      font-size: 20px;
      width: 90%;
    }
    .detail-header-right{
      flex:1;
      display: flex;
      .export{
          margin-left: 20px;
      }
    }
  }
  .detail-header-centent {
    p {
      height: 30px;
      line-height: 30px;
    }
  }
  .detail-header-footer {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    div {
      height: 30px;
    }
  }
}
.many {
  padding: 0 30px;
}
.centent{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}
img{
  height: 100px;
}
.reimburse{
  text-align: center;
  margin-top: 50px;
}
</style>
