<!-- 关店审核 -->
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
      <el-select
        v-model="query.channel"
        :placeholder="$t('audite.channel')"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in channelOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="query.createTime"
        type="date"
        :placeholder="$t('audite.createTime')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="query.phone"
        :placeholder="$t('audite.phone')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-select
        v-model="query.city"
        :placeholder="$t('audite.city')"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in cityOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="query.status"
        :placeholder="$t('audite.status')"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="query.salePer"
        :placeholder="$t('audite.salePer')"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in salePerOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="primary"
        class="filter-item"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        @click="resetFilter(query)"
      >重置</el-button>
    </div>
    <div class="dataList">
      数据列表
    </div>
    <el-table
      :data="shopListData"
      border
      stripe
      max-height="265"
    >
      <el-table-column label="申请原因" prop="reason" align="center" />
      <el-table-column label="门店外部整体照片" prop="outPicture" align="center" />
      <el-table-column label="备注" prop="extra" align="center" />
      <el-table-column label="售点ID" prop="ID" align="center" />
      <el-table-column label="售点名称" prop="name" align="center" />
      <el-table-column label="渠道" prop="channel" align="center" />
      <el-table-column label="地址" prop="address" align="center" />
      <el-table-column label="销售员" prop="salePer" align="center" />
      <el-table-column label="注册时间" prop="creatTime" align="center" />
      <el-table-column label="认证状态" prop="authen" align="center" />
      <el-table-column label="审核状态" prop="check" align="center" />
      <el-table-column label="是否禁用" prop="forbit" align="center" />
      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            @click="applyPass(row)"
          >
            通过
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="applyQuit(row)"
          >
            退回
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="detailLook(row)"
          >
            明细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="shopListData.length > 0"
      :total="shopListData.length"
      :page.sync="query.page"
      :limit.sync="query.limit"
      @pagination="getList"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'

const channelOptions = [
  { name: 'CR', value: '1' },
  { name: '线下', value: '0' }
]
const cityOptions = [
  { name: '北京', value: 'beijing' },
  { name: '上海', value: 'shanghai' },
  { name: '广州', value: 'guangzhou' },
  { name: '深圳', value: 'shenzhen' }
]
const statusOptions = [
  { name: '售罄', value: '1' },
  { name: '有余量', value: '0' }
]
const salePerOptions = [
  { name: '梅花', value: '1' },
  { name: '兰花', value: '2' },
  { name: '松芝', value: '3' },
  { name: '金桔', value: '4' }
]
const shopListData = [
  {
    reason: '售点已关店',
    outPicture: '',
    extra: 'XXXXX',
    ID: '1000003232',
    name: '上海大时代',
    channel: 'TT',
    address: '上海市黄浦区来福士',
    salePer: '李梅',
    creatTime: '2019-04-09 12:22:12',
    authen: '未通过',
    check: '待审核',
    forbit: '否'
  },
  {
    reason: '售点已关店',
    outPicture: '',
    extra: 'XXXXX',
    ID: '1000003232',
    name: '上海大时代',
    channel: 'TT',
    address: '上海市黄浦区来福士',
    salePer: '王振国',
    creatTime: '2019-04-09 12:22:12',
    authen: '未通过',
    check: '待审核',
    forbit: '否'
  },
  {
    reason: '售点已关店',
    outPicture: '',
    extra: 'XXXXX',
    ID: '1000003232',
    name: '上海大时代',
    channel: 'TT',
    address: '上海市黄浦区来福士',
    salePer: '李佳邦',
    creatTime: '2019-04-09 12:22:12',
    authen: '未通过',
    check: '待审核',
    forbit: '否'
  }
]
export default {
  components: { Pagination },
  props: {},
  data() {
    return {
      channelOptions,
      cityOptions,
      statusOptions,
      salePerOptions,
      query: {
        page: 1,
        limit: 10,
        id: undefined,
        name: undefined,
        channel: undefined,
        createTime: undefined,
        phone: undefined,
        childChannel: undefined,
        city: undefined,
        salePer: undefined
      },
      shopListData
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    handleFilter() {
    },
    resetFilter(e) {
      e.id = ''
      e.name = ''
      e.channel = ''
      e.createTime = ''
      e.phone = ''
      e.city = ''
      e.status = ''
      e.salePer = ''
    },
    getList() {
      console.log('MMHH')
    },
    applyPass(e) { // 通过
      this.$confirm('此操作将通过申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '请求成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    applyQuit(e) { // 退回
      this.$confirm('此操作将退回申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退回成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    detailLook(e) {
      console.log('查看详情')
      this.$router.push('/customer/detail')
    }
  }
}
</script>
<style lang='less' scoped>

</style>

