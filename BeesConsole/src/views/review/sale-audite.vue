<!-- 售点审核 -->
<template>
  <div class="app-container">
    <!-- 条件搜索 -->
    <div class="filter-container">
      <el-input
        v-model="query.id"
        :placeholder="$t('audite.id')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="query.name"
        :placeholder="$t('audite.name')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-cascader
        v-model="query.channelId"
        collapse-tags
        :props="{multiple:true}"
        :placeholder="$t('audite.channel')"
        :options="opetionChannel"
        style="width: 200px"
        clearable
        class="filter-item"
        @change="handleChangeq"
      />
      <!-- <el-input
        v-model="query.cityId"
        :placeholder="$t('audite.city')"
        clearable
        style="width: 200px"
        class="filter-item"
      /> -->
      <el-date-picker
        v-model="query.valueTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="filter-item"
        value-format="yyyy-MM-dd HH:mm:ss"
        clearable
        @change="formatTime"
      />
      <!-- <el-input
        v-model="query.telephone"
        :placeholder="$t('audite.phone')"
        style="width: 200px"
        class="filter-item"
        maxlength="11"
        clearable
      /> -->
      <el-select
        v-model="query.approvalStatus"
        :placeholder="$t('audite.status')"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.type"
          :label="item.description"
          :value="item.type"
        />
      </el-select>
      <el-input
        v-model="query.salesId"
        :placeholder="$t('audite.salePer')"
        clearable
        style="width: 200px"
        class="filter-item"
      />
      <el-button
        type="primary"
        class="filter-item"
        @click="handleFilter(query)"
      >搜索</el-button>
      <el-button
        class="filter-item"
        @click="resetFilter(query)"
      >重置</el-button>
    </div>
    <div class="dataList">
      数据列表
      <!-- <div class="fr">
        <el-button
          icon="el-icon-s-check"
          type="primary"
          size="mini"
          plain
          @click="auditeCheck(selectData)"
        >售点审核</el-button>
      </div> -->
    </div>
    <el-table
      class="sale-Audite"
      :data="auditeList.records"
      border
      stripe
      :height="saleAuditeHeight+'px'"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="售点ID" prop="id" align="center" />
      <el-table-column label="售点名称" prop="name" align="center" />
      <el-table-column label="营业执照照片" prop="businessLicense" align="center">
        <template slot-scope="{row}">
          <img :src="row.businessLicense" alt="">
        </template>
      </el-table-column>
      <el-table-column label="门店外部整体照片" prop="outsidePictures" align="center">
        <template slot-scope="{row}">
          <img :src="row.outsidePictures" alt="">
        </template>
      </el-table-column>
      <el-table-column label="认证状态" prop="certificationStatus.description" align="center" />
      <el-table-column label="审核状态" prop="approvalStatus.description" align="center" />
      <el-table-column label="M1确认状态" prop="confirmStatus.description" align="center" />
      <el-table-column label="销售员" prop="salesmanName" align="center" />
      <el-table-column label="提交时间" prop="submitTime" align="center" />
      <el-table-column label="是否禁用" prop="disable" align="center" :formatter="disFormate" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.confirmStatus.type==2&&row.approvalStatus.type==2"
            type="text"
            size="small"
            @click="authenPass(row)"
          >
            通过
          </el-button>
          <el-button
            v-if="row.confirmStatus.type==2&&row.approvalStatus.type==2"
            type="text"
            size="small"
            @click="authenqQuit(row)"
          >
            退回
          </el-button>
          <!-- <el-button
            type="text"
            size="small"
            @click="detailLook(row)"
          >
            明细
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 审核退回 -->
    <el-dialog
      :visible.sync="quiteShow"
      :before-close="quiteCancel"
      width="43%"
      :close-on-click-modal="false"
      center
    >
      <label for="quite">退回原因备注：</label>
      <el-input id="quite" v-model="quiteReason" type="textarea" maxlength="100" rows="3" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="quiteCancel">取消</el-button>
        <el-button type="primary" @click="quiteConfirm">确认退回</el-button>
      </span>
    </el-dialog>
    <!-- 批量审核 -->
    <!-- <el-dialog
      :visible.sync="auditeShow"
      width="43%"
      :close-on-click-modal="false"
      center
    >
      <div class="audite">批量审批</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="auditeSure">通过</el-button>
        <el-button type="primary" @click="auditeShow = false">退回</el-button>
      </span>
    </el-dialog> -->
    <pagination
      :total="auditeList.total"
      :page.sync="query.page"
      :limit.sync="query.limit"
      @pagination="getList"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: { Pagination },
  props: {},
  data() {
    return {
      saleAuditeHeight: 0,
      query: {
        page: 1,
        limit: 10,
        id: undefined,
        name: undefined,
        channelId: [],
        channelIds: [],
        subChannelIds: [],
        valueTime: undefined,
        telephone: undefined,
        childChannel: undefined,
        cityId: undefined,
        salesId: undefined
      },
      // 时间
      time: {
        createStartTime: '',
        createEndTime: ''
      },
      selectData: [],
      quiteId: '',
      // quiteShow: false,
      quiteReason: '',
      auditeShow: false
    }
  },
  computed: {
    ...mapState('relation-amend', ['statusOptions']),
    ...mapState('sale-audite', ['auditeList', 'quiteShow']),
    ...mapGetters('structure', ['opetionChannel'])
  },
  watch: {},
  created() {
    this.saleAuditeHeight = window.innerHeight - 200
    this.getStatusList()
    this.getAudite({
      current: 1,
      size: 10
    })
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
    ...mapActions('relation-amend', ['getStatusList']),
    ...mapActions('sale-audite', ['getAudite', 'salePass', 'showQuite', 'saleQuite']),
    // 时间
    formatTime(time) {
      if (time && time.length > 0) {
        this.time.createStartTime = time[0]
        this.time.createEndTime = time[1]
      }
    },
    handleChangeq(val) {
      const a = val.map(item => item[0])
      const b = [...new Set(a)]
      this.query.channelIds = b
      this.query.subChannelIds = val.map(item => item[1])
    },
    getList(val) {
      this.query.current = val.page
      this.query.size = val.limit
      this.getAudite({
        current: val.page,
        size: val.limit,
        id: val.id,
        name: val.name,
        channelIds: val.channelIds,
        subChannelIds: val.subChannelIds,
        registeredTimeFrom: this.time.createStartTime,
        registeredTimeTo: this.time.createEndTime,
        telephone: val.telephone,
        cityId: val.cityId,
        approvalStatus: val.approvalStatus,
        salesId: val.salesId
      })
    },
    disFormate(row, column) {
      return row.disable ? '是' : '否'
    },
    authenPass(e) { // 通过
      const id = []
      id.push({ pocId: e.id })
      this.$confirm('此操作将通过该售点的审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.salePass(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
        })
      })
    },
    authenqQuit(e) { // 退回
      this.quiteId = e.id
      this.showQuite(true)
    },
    quiteCancel() {
      this.showQuite(false)
    },
    quiteConfirm() {
      if (this.quiteReason === '') {
        this.$message({
          type: 'warning',
          message: '请输入退回原因！'
        })
      } else {
        this.saleQuite([{ pocId: this.quiteId, remark: this.quiteReason }])
      }
    },
    detailLook(e) {
      console.log('查看详情')
      this.$router.push('/customer/detail')
    },
    selectChange(val) {
      this.selectData = val
      console.log('MMHH', val)
    },
    auditeCheck(e) {
      if (e.length === 0) {
        this.$message({
          message: '未选中任何数据，请选择',
          type: 'warning'
        })
        return
      }
      this.auditeShow = true
    },
    auditeSure() {
      this.auditeShow = false
      console.log('通过')
    },
    handleFilter(val) {
      this.getAudite({
        current: val.current,
        size: val.size,
        id: val.id,
        name: val.name,
        channelIds: val.channelIds,
        subChannelIds: val.subChannelIds,
        registeredTimeFrom: this.time.createStartTime,
        registeredTimeTo: this.time.createEndTime,
        telephone: val.telephone,
        cityId: val.cityId,
        approvalStatus: val.approvalStatus,
        salesId: val.salesId
      })
    },
    resetFilter(e) {
      e.current = 1
      e.size = 10
      e.id = ''
      e.name = ''
      e.channelId = []
      e.subChannelIds = []
      e.channelIds = []
      e.valueTime = ''
      this.time.createStartTime = ''
      this.time.createEndTime = ''
      e.telephone = ''
      e.cityId = ''
      e.approvalStatus = ''
      e.salesId = ''
      this.getAudite({
        current: 1,
        size: 10
      })
    }
  }
}
</script>
<style scoped>
.audite{
  width:170px;
  height:54px;
  line-height: 54px;
  margin: 0 auto;
  text-align: center;
  background-color: rgb(11, 202, 245);
  font-size:16px;
  font-weight: bolder;
}
.sale-Audite{
  width: 100%;
}
.sale-Audite img{
  width:70px;
  height:50px;
}
.el-textarea{
  margin-top: 20px;
}
/* 多行文本框禁止拉伸 */
.el-textarea>>>.el-textarea__inner{
  resize: none;
}
</style>

