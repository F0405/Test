<!-- 售点公海池 -->
<template>
  <div class="app-container">
    <!-- 条件搜索 -->
    <div class="filter-container">
      <el-input
        v-model="query.name"
        :placeholder="$t('saleCommon.name')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="query.phone"
        :placeholder="$t('saleCommon.phone')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-select
        v-model="query.city"
        :placeholder="$t('saleCommon.city')"
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
        v-model="query.contactPer"
        :placeholder="$t('saleCommon.channel')"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in contactPerOptions"
          :key="item"
          :value="item"
        />
      </el-select>
      <el-date-picker
        v-model="query.createTime"
        type="date"
        :placeholder="$t('saleCommon.createTime')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-select
        v-model="query.status"
        :placeholder="$t('saleCommon.status')"
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
      <div class="fr">
        <el-button
          icon="el-icon-s-check"
          type="primary"
          size="mini"
          plain
          @click="allotSale(selectData)"
        >分配售点</el-button>
      </div>
    </div>
    <el-table
      :data="allData"
      border
      stripe
      max-height="265"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="售点ID" prop="ID" align="center" />
      <el-table-column label="售点名称" prop="name" align="center" />
      <el-table-column label="手机号" prop="phone" align="center" />
      <el-table-column label="城市" prop="city" align="center" />
      <el-table-column label="售点联系人" prop="contactPer" align="center" />
      <el-table-column label="地址" prop="address" align="center" />
      <el-table-column label="来源" prop="origin" align="center" />
      <el-table-column label="快速注册时间" prop="createTime" align="center" />
    </el-table>
    <!-- 分配售点 -->
    <el-dialog
      :visible.sync="allotShow"
      width="43%"
      :close-on-click-modal="false"
      center
    >
      <label for="person" style="margin:0 20px 0 20%">人员</label>
      <el-select
        id="person"
        v-model="person"
        placeholder="请选择"
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in personOptions"
          :key="item"
          :value="item"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allotShow=false">取消</el-button>
        <el-button type="primary" @click="allotSure">确认</el-button>
      </span>
    </el-dialog>
    <pagination
      v-show="allData.length > 0"
      :total="allData.length"
      :page.sync="query.page"
      :limit.sync="query.limit"
      @pagination="getList"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'

const cityOptions = [
  { name: '北京', value: 'beijing' },
  { name: '上海', value: 'shanghai' },
  { name: '广州', value: 'guangzhou' },
  { name: '深圳', value: 'shenzhen' }
]
const contactPerOptions = ['风', '花', '雪', '月']
const statusOptions = [
  { name: '售罄', value: '1' },
  { name: '有余量', value: '0' }
]
const allData = [
  {
    ID: '1000003232',
    name: '上海大时代',
    phone: '15959261926',
    city: '上海',
    contactPer: '刘先生',
    address: '上海市黄浦区来福士',
    origin: '售点自助注册',
    createTime: '2019-04-09 12:22:12'
  },
  {
    ID: '1000003232',
    name: '上海好莱坞',
    phone: '15959261926',
    city: '上海',
    contactPer: '钟先生',
    address: '上海市黄浦区来福士',
    origin: '售点自助注册',
    createTime: '2019-04-19 12:22:12'
  },
  {
    ID: '1000003232',
    name: '影视城',
    phone: '15959261926',
    city: '上海',
    contactPer: '刘先生',
    address: '上海市黄浦区来福士',
    origin: '售点自助注册',
    createTime: '2019-04-19 12:22:12'
  }
]
const personOptions = ['spring', 'summer', 'autumn', 'winter']
export default {
  components: { Pagination },
  props: {},
  data() {
    return {
      cityOptions,
      contactPerOptions,
      statusOptions,
      query: {
        page: 1,
        limit: 10,
        name: undefined,
        phone: undefined,
        city: undefined,
        contactPer: undefined,
        status: undefined,
        creatTime: undefined
      },
      allData,
      selectData: [],
      allotShow: false,
      person: '',
      personOptions
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
      console.log('MMHH handleFilter', this.query)
    },
    resetFilter(e) {
      e.name = ''
      e.phone = ''
      e.city = ''
      e.contactPer = ''
      e.createTime = ''
      e.status = ''
    },
    getList() {
      console.log('MMHH')
    },
    selectChange(val) {
      this.selectData = val
      console.log('MMHH', val)
    },
    allotSale(e) {
      if (e.length === 0) {
        this.$message({
          message: '未选中任何数据，请选择',
          type: 'warning'
        })
        return
      }
      this.allotShow = true
    },
    allotSure() {
      if (this.person === '') {
        this.$message({
          message: '未选中任何人员，请选择',
          type: 'warning'
        })
        return
      }
      this.allotShow = false
      console.log('售点分配成功')
    }
  }
}
</script>
<style lang='less' scoped>

</style>

