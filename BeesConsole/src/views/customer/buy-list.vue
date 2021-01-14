<!-- 售点买家列表 -->
<template>
  <div class="app-container">
    <!-- 条件搜索 -->
    <div class="filter-container">
      <el-input
        v-model="query.id"
        :placeholder="$t('customer.id')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="query.name"
        :placeholder="$t('customer.name')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="query.phone"
        :placeholder="$t('customer.phone')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-date-picker
        v-model="query.createTime"
        type="date"
        :placeholder="$t('customer.createTime')"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-select
        v-model="query.channel"
        :placeholder="$t('customer.channel')"
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
      <el-select
        v-model="query.childChannel"
        :placeholder="$t('customer.childChannel')"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in childChannelOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="query.status"
        :placeholder="$t('customer.status')"
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
        v-model="query.ERPID"
        :placeholder="$t('customer.ERPID')"
        clearable
        style="width: 200px"
        class="filter-item"
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
          icon="el-icon-upload2"
          type="primary"
          size="mini"
          plain
          @click="exportShow = true"
        >导出</el-button>
        <el-button
          type="primary"
          size="mini"
          plain
          @click="selectShow = true"
        >选择字段</el-button>
        <el-button
          type="primary"
          size="mini"
          plain
          @click="upDataShow = true"
        >上传维护ERP ID</el-button>
      </div>
    </div>
    <el-table
      :data="saleListData"
      border
      stripe
      max-height="265"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="售点ID" prop="ID" align="center" />
      <el-table-column label="售点名称" prop="name" align="center" />
      <el-table-column label="ERP客户ID" prop="erpId" align="center" />
      <el-table-column label="店主手机号" prop="ownerPhone" align="center" />
      <el-table-column label="店主姓名" prop="ownerName" align="center" />
      <el-table-column label="渠道" prop="channel" align="center" />
      <el-table-column label="子渠道" prop="childChannel" align="center" />
      <el-table-column label="售点地址" prop="address" align="center" />
      <el-table-column label="销售负责人角色" prop="chargeRole" align="center" />
      <el-table-column label="销售负责人姓名" prop="chargeName" align="center" />
      <el-table-column label="注册时间" prop="createTime" align="center" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="text"
            @click="handleCheck(row)"
          >
            查看
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 导出 -->
    <el-dialog
      :visible.sync="exportShow"
      width="43%"
      :close-on-click-modal="false"
      center
    >
      <div>此操作将导出字段, 是否继续?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportShow = false">取 消</el-button>
        <el-button type="primary" @click="exportSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑ERP -->
    <el-dialog
      :visible.sync="editShow"
      width="50%"
      center
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div>
          <!-- <i
            class="el-icon-tickets"
            style="color: #13ce66; margin-right: 3px"
          /> -->
          <span>维护ERP ID</span>
        </div>
      </template>
      <el-form
        ref="erp"
        :model="erpForm"
        label-width="120px"
        class="demo-ruleForm"
        :rules="erpRule"
      >
        <el-form-item label="售点名称：">
          <el-input v-model="erpForm.name" disabled />
        </el-form-item>
        <el-form-item label="售点ID：">
          <el-input v-model="erpForm.ID" disabled />
        </el-form-item>
        <el-form-item label="ERP 售点ID：" prop="ERPID">
          <el-input v-model="erpForm.ERPID" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary" @click="editSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选择字段 -->
    <el-dialog
      :visible.sync="selectShow"
      width="36%"
      center
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div>
          <!-- <i
            class="el-icon-tickets"
            style="color: #13ce66; margin-right: 3px"
          /> -->
          <span>维护ERP ID</span>
        </div>
      </template>
      <el-tree ref="selectTree" show-checkbox :data="allData" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectShow = false">取 消</el-button>
        <el-button type="primary" @click="selectSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传ERP售点信息 -->
    <el-dialog
      :visible.sync="upDataShow"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div>
          <!-- <i
            class="el-icon-tickets"
            style="color: #13ce66; margin-right: 3px"
          /> -->
          <span>维护ERP ID</span>
        </div>
      </template>
      <label for="upData">选择上传文件：</label>
      <a
        href="javascript:;"
        class="file"
      >选择文件
        <input id="upData" type="file">
      </a>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upDataShow = false">取 消</el-button>
        <el-button type="primary" @click="upDataSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传结果 -->
    <el-dialog
      :visible.sync="upResShow"
      width="50%"
      :close-on-click-modal="false"
    >
      <div>
        已成功更新X条客户信息，X条更新失败，请重新上传或者选择点击“编辑”维护ERP客户ID
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upResShow = false">取 消</el-button>
        <el-button type="primary" @click="upResShow = false">确 定</el-button>
      </span>
    </el-dialog>
    <pagination
      v-show="saleListData.length > 0"
      :total="saleListData.length"
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
const childChannelOptions = [
  { name: '排档', value: '1' },
  { name: '排档', value: '0' }
]
const statusOptions = [
  { name: '售罄', value: '1' },
  { name: '有余量', value: '0' }
]
const ERPIDOptions = [
  { name: '是', value: '1' },
  { name: '否', value: '0' }
]
const saleListData = [
  {
    ID: '1000003232',
    name: '上海大时代',
    erpId: 'XXXXX',
    ownerPhone: '15959261926',
    ownerName: '刘先生',
    channel: 'CR',
    childChannel: '排档',
    address: '上海市黄浦区来福士',
    chargeRole: '经销商',
    chargeName: '刘威',
    createTime: '2019-04-09 12:22:12'
  },
  {
    ID: '1000003232',
    name: '上海大时代',
    erpId: 'XXXXX',
    ownerPhone: '15959261926',
    ownerName: '刘先生',
    channel: 'CR',
    childChannel: '排档',
    address: '上海市黄浦区来福士',
    chargeRole: '经销商',
    chargeName: '刘威',
    createTime: '2019-04-09 12:22:12'
  },
  {
    ID: '1000003232',
    name: '上海大时代',
    erpId: 'XXXXX',
    ownerPhone: '15959261926',
    ownerName: '刘先生',
    channel: 'CR',
    childChannel: '排档',
    address: '上海市黄浦区来福士',
    chargeRole: '经销商',
    chargeName: '刘威',
    createTime: '2019-04-09 12:22:12'
  },
  {
    ID: '1000003232',
    name: '上海大时代',
    ERP: 'XXXXX',
    ownerPhone: '15959261926',
    ownerName: '刘先生',
    channel: 'CR',
    childChannel: '排档',
    address: '上海市黄浦区来福士',
    chargeRole: '经销商',
    chargeName: '刘威',
    createTime: '2019-04-09 12:22:12'
  }
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
export default {
  components: { Pagination },
  props: {},
  data() {
    return {
      channelOptions,
      childChannelOptions,
      statusOptions,
      ERPIDOptions,
      saleListData,
      step: 2,
      query: {
        page: 1,
        limit: 10,
        id: undefined,
        name: undefined,
        phone: undefined,
        createTime: undefined,
        channel: undefined,
        childChannel: undefined,
        status: undefined,
        ERPID: undefined
      },
      exportShow: false,
      editShow: false,
      erpForm: {
        name: undefined,
        ID: undefined,
        ERPID: undefined
      },
      erpRule: {
        ERPID: [{ required: true, message: '请输入ERPID', trigger: 'blur' }]
      },
      selectShow: false,
      allData,
      upDataShow: false,
      upResShow: false
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
    getList() {
      console.log('MMHH')
    },
    exportSure() {
      console.log('导出')
      this.exportShow = false
    },
    handleFilter() {
      console.log('MMHH handleFilter', this.query)
    },
    resetFilter(e) {
      e.id = ''
      e.name = ''
      e.phone = ''
      e.createTime = ''
      e.channel = ''
      e.childChannel = ''
      e.status = ''
      e.ERPID = ''
    },
    handleEdit(e) {
      console.log('编辑', e)
      this.erpForm.name = e.name
      this.erpForm.ID = e.ID
      this.editShow = true
    },
    editSure() {
      console.log('ERPs售点id')
      this.editShow = false
    },
    handleCheck(e) {
      console.log(e)
      this.$router.push('detail')
    },
    handleSelectionChange(val) {
      console.log('MMHH', val)
    },
    selectSure() {
      console.log(this.$refs.selectTree.getCheckedNodes())
      this.selectShow = false
    },
    upDataSure() {
      console.log('上传ERP售点信息')
      this.upDataShow = false
      this.upResShow = true
    }
  }
}
</script>
<style scoped>
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
/* 弹框内input宽度 */
.demo-ruleForm{
  margin-left: 12%;
}
.demo-ruleForm .el-input--medium{
  width: 300px;
}
</style>

