<!-- M1和POC关系调整 -->
<template>
  <div class="app-container">
    <!-- 条件搜索 -->
    <div class="filter-container">
      <el-input
        v-model="query.pocId"
        :placeholder="$t('relationAmend.id')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="query.name"
        :placeholder="$t('relationAmend.name')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-cascader
        v-model="query.channelIds"
        collapse-tags
        :props="{multiple:true}"
        :placeholder="$t('relationAmend.channel')"
        :options="opetionChannel"
        style="width: 200px"
        clearable
        class="filter-item"
        @change="handleChangeq"
      />
      <!-- <el-input
        v-model="query.cityName"
        :placeholder="$t('relationAmend.city')"
        value-format="yyyy-MM-dd"
        style="width: 200px"
        class="filter-item"
        clearable
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
      <el-input
        v-model="query.ownerTelephone"
        :placeholder="$t('relationAmend.phone')"
        style="width: 200px"
        class="filter-item"
        maxlength="11"
        clearable
      />
      <el-select
        v-model="query.approvalStatus"
        :placeholder="$t('relationAmend.status')"
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
        v-model="query.salesmanName"
        :placeholder="$t('relationAmend.salePer')"
        style="width: 200px"
        class="filter-item"
        clearable
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
      <div class="fr">
        <el-button
          icon="el-icon-edit"
          type="primary"
          size="mini"
          plain
          @click="principalChange(selectData)"
        >更改负责人</el-button>
      </div>
    </div>
    <el-table
      ref="relationAmendTable"
      :data="saleList.records"
      border
      stripe
      :height="relationAmendHeight+'px'"
      @selection-change="saleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="售点ID" prop="id" align="center" />
      <el-table-column label="售点名称" prop="name" align="center" />
      <el-table-column label="手机号" prop="ownerTelephone" align="center" />
      <el-table-column label="联系人" prop="contactName" align="center" />
      <!-- <el-table-column label="微信公众号ID" prop="wechatOpenId" align="center" /> -->
      <!-- <el-table-column label="小程序ID" prop="miniOpenId" align="center" /> -->
      <el-table-column label="渠道" prop="channel" align="center" />
      <el-table-column label="子渠道" prop="subChannel" align="center" />
      <el-table-column label="地址" prop="detailAddress" align="center" />
      <el-table-column label="销售员" prop="salesmanName" align="center" />
      <el-table-column label="注册时间" prop="registeredTime" align="center" />
      <el-table-column label="认证状态" prop="certificationStatus.description" align="center" />
      <el-table-column label="审核状态" prop="approvalStatus.description" align="center" />
      <el-table-column label="是否禁用" prop="disable" align="center" :formatter="disFormate" />
    </el-table>
    <el-dialog
      :visible.sync="principalShow"
      :before-close="principalCancel"
      title="更改选中售点负责人M1"
      width="43%"
      :close-on-click-modal="false"
      center
    >
      <label for="person" style="margin:0 20px 0 20%">人员</label>
      <el-select v-model="person" filterable placeholder="请选择" :filter-method="querySearch" clearable>
        <el-option
          v-for="item in m1List"
          :key="item.employeeCode"
          :label="item.fullName"
          :value="item.employeeCode"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="principalCancel">取消</el-button>
        <el-button type="primary" @click="principalSure">确认</el-button>
      </span>
    </el-dialog>
    <pagination
      :total="saleList.total"
      :page.sync="query.current"
      :limit.sync="query.size"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import { Message } from 'element-ui'

export default {
  components: { Pagination },
  props: {},
  data() {
    return {
      relationAmendHeight: 0,
      m1List: [],
      query: {
        current: 1,
        size: 10,
        pocId: undefined,
        name: undefined,
        channelIds: [],
        channelId: '',
        subChannelIds: [],
        valueTime: '',
        // registeredTimeFrom: undefined,
        // registeredTimeTo: undefined,
        ownerTelephone: undefined,
        cityName: undefined,
        approvalStatus: undefined,
        salesmanName: undefined
      },
      // 时间
      time: {
        createStartTime: '',
        createEndTime: ''
      },
      principalShow: false,
      selectData: [],
      person: '',
      restaurants: []
    }
  },
  computed: {
    ...mapState('relation-amend', ['statusOptions', 'saleList']),
    ...mapGetters('structure', ['opetionChannel'])
  },
  watch: {},
  created() {
    // this.$refs.relationAmendTable.offsetTop
    this.relationAmendHeight = window.innerHeight - 200
    this.getPocList(
      {
        current: 1,
        size: 10
      }
    )
    this.getStatusList()
  },
  mounted() {
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    ...mapActions('relation-amend', ['getStatusList', 'getPocList', 'getM1List', 'M1change']),
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
      this.query.channelId = b[b.length - 1]
      this.query.subChannelIds = val.map(item => item[1])
    },
    querySearch(v) {
      if (v === '') {
        this.$message({
          message: '请输入姓名或者工号'
        })
      } else {
        this.getM1List({ key: v }).then(res => {
          const data = res.data
          if (data.length === 0) {
            this.$message({
              message: '请输入姓名或者工号'
            })
            this.m1List = []
          } else {
            data.forEach(vm => {
              vm.fullName = vm.fullName + vm.employeeCode
            })
            this.m1List = data
          }
        }).catch(() => {
        })
      }
    },
    disFormate(row, column) {
      return row.disable === 1 ? '是' : '否'
    },
    getList(val) {
      this.query.current = val.page
      this.query.size = val.limit
      this.getPocList({
        current: val.page,
        size: val.limit,
        pocId: val.pocId,
        name: val.name,
        channelId: val.channelId,
        subChannelIds: val.subChannelIds,
        registeredTimeFrom: this.time.createStartTime,
        registeredTimeTo: this.time.createEndTime,
        ownerTelephone: val.ownerTelephone,
        cityName: val.cityName,
        approvalStatus: val.approvalStatus,
        salesmanName: val.salesmanName
      })
    },
    handleFilter(val) {
      this.getPocList({
        current: val.current,
        size: val.size,
        pocId: val.pocId,
        name: val.name,
        channelId: val.channelId,
        subChannelIds: val.subChannelIds,
        registeredTimeFrom: this.time.createStartTime,
        registeredTimeTo: this.time.createEndTime,
        ownerTelephone: val.ownerTelephone,
        cityName: val.cityName,
        approvalStatus: val.approvalStatus,
        salesmanName: val.salesmanName
      })
    },
    resetFilter(e) {
      e.current = 1
      e.size = 10
      e.pocId = ''
      e.name = ''
      e.channelIds = []
      e.channelId = ''
      e.subChannelIds = []
      e.valueTime = ''
      this.time.createStartTime = ''
      this.time.createEndTime = ''
      e.ownerTelephone = ''
      e.cityName = ''
      e.approvalStatus = ''
      e.salesmanName = ''
      this.getPocList()
    },
    principalChange(e) {
      if (e.length === 0) {
        this.$message({
          message: '未选中任何售点，请选择',
          type: 'warning'
        })
        return
      }
      this.m1List = []
      this.person = ''
      this.principalShow = true
    },
    saleSelectionChange(val) {
      this.selectData = val
    },
    principalCancel() {
      this.principalShow = false
    },
    principalSure() {
      if (this.person === '') {
        this.$message({
          message: '未选中任何人员，请选择',
          type: 'warning'
        })
        return
      }
      var data = []
      this.selectData.forEach((vm, index) => {
        data.push(vm.id)
      })
      const saveData = {
        pocIds: data,
        salesmanId: Number(this.person)
      }
      this.M1change(saveData).then(response => {
        if (response.code === 200) {
          this.getPocList({
            current: this.query.current,
            size: this.query.size
          })
          this.principalShow = false
          Message.success('批量更新成功')
        } else {
          Message.success('批量更新失败')
        }
      })
    },
    detailLook() {
      console.log('查看明细')
    }
  }
}
</script>
<style lang='less' scoped>

</style>

