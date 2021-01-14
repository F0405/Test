<!-- WS账号 -->
<template>
  <div class="app-container">
    <p>WS账号管理</p>
    <!-- <button @click="handleClick('1')">切换身份</button> -->
    <div class="account">
      <!-- 输入框 -->
      <el-input v-model="query.wsAccountName" placeholder="请输入账号" style="width: 200px" class="filter-item" clearable />
      <el-input v-model="query.mainAccountName" placeholder="请输入住户头名称" style="width: 200px" class="filter-item" clearable />
      <el-input v-model="query.wholesalerCode" placeholder="请输入经销商编码" style="width: 200px" class="filter-item" clearable />
      <el-select v-model="query.wholesalerType" placeholder="请选择经销商类型" style="width: 200px" class="filter-item" clearable>
        <el-option v-for="item in channelOptions" :key="item.value" :label="item.name" :value="item.value" />
      </el-select>
      <el-select v-model="query.actived" placeholder="状态" style="width: 200px" class="filter-item" clearable>
        <el-option v-for="item in channelOptionst" :key="item.value" :label="item.name" :value="item.value" />
      </el-select>
      <el-button type="primary" class="filter-item" style="width: 200px" @click="search()">搜索</el-button>
    </div>
    <div class="create">
      <el-button size="mini" icon="el-icon-plus" type="primary" plain @click="onCreateWs">创建新账号</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="wsAccountName" label="账号名" width="180" align="center" />
      <el-table-column prop="mainAccountName" label="主户头名称" align="center" />
      <el-table-column prop="wholesalerType" label="经销商类型" align="center">
        <template slot-scope="{ row }"> <span>{{ row.wholesalerType === '1' ? '一批' : '二批' }}</span></template></el-table-column>
      <el-table-column prop="wholesalerCode" label="经销商编码" align="center" />
      <el-table-column prop="wholesalerStatus" label="状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.actived === 1 ? '已激活' : '未激活' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" style="color: #1890ff" @click="editor(row)">编辑</el-button>
          <el-button type="text" size="small" style="color: #1890ff" @click="handleClick(scope.row)">{{ row.btn === 1 ? '进入工作平台' : '' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination v-show="tableData.length > 0" :total="totalPage" :page.sync="query.current" :limit.sync="query.size" @pagination="paginationList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // 分页
import request from '@/utils/request'
import { mapActions } from 'vuex'
const channelOptions = [
  { name: '一批', value: '1' },
  { name: '二批', value: '2' }
]
const channelOptionst = [
  { name: '已激活', value: 1 },
  { name: '未激活', value: 0 }
]
export default {
  components: {
    Pagination
  },
  data() {
    return {
      channelOptions,
      flag: false,
      channelOptionst,
      tableData: [], // 表格
      totalPage: 0,
      query: {
        wsAccountName: undefined,
        mainAccountName: undefined,
        wholesalerCode: undefined,
        wholesalerType: undefined,
        actived: undefined,
        current: 1,
        size: 10
      },
      // 表单
      form: {
        name: '',
        zname: '',
        page: ''
      }
    }
  },
  created() {
    this.getpropertyList()
  },

  methods: {
    ...mapActions('account', ['managementlist']),
    getpropertyList() {
      console.log('MMHH query', this.query)
      request({
        url: '/business-entity-service/wholesaler/pageList',
        method: 'POST',
        data: this.query
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.tableData = resp.data.records
            this.totalPage = resp.data.total
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 分页
    paginationList(val) {
      this.query.current = val.page
      this.query.size = val.limit
      this.getpropertyList()
    },
    // 搜索
    search() {
      this.query.current = 1
      if (this.query.wsAccountName === '') {
        this.query.wsAccountName = undefined
      }
      if (this.query.mainAccountName === '') {
        this.query.mainAccountName = undefined
      }
      if (this.query.wholesalerCode === '') {
        this.query.wholesalerCode = undefined
      }
      if (this.query.wholesalerType === '') {
        this.query.wholesalerType = undefined
      }
      if (this.query.actived === '') {
        this.query.actived = undefined
      }
      this.getpropertyList()
    },
    // 进入工作平台
    handleClick(row) {
      console.log('切换身份')
      // 拉取菜单,切换身份
      this.$store.dispatch('user/switchRoles')
        .then(() => {
          console.log('成功切换了身份')
        })
        .catch(() => {

        })
    },
    // 创建
    onCreateWs() {
      this.flag = true
      this.$router.push({
        path: 'creation',
        query: {
          flag: this.flag
        }
      })
    },
    // 编辑
    editor(row) {
      this.flag = false
      this.$router.push({
        path: 'edit',
        query: {
          flag: this.flag,
          id: row.id
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.filter-item {
  margin-left: 20px;
}
.create {
  width: 100%;
  background: #f3f3f3;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  margin-top: 15px;
}
.el-table {
  margin-left: 20px;
  margin-top: 20px;
}
</style>
