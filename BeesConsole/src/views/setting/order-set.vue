<!-- 订单设置 -->
<template>
  <div class="app-container">
    <div class="app-container-header-centent">
      <span style="fontsize: 14px; color: #000">规则列表</span>
      <el-button
        type="primary "
        plain
        size="mini"
        style="margin-left: 50px"
        icon="el-icon-plus"
        @click="handleAdd"
      >新建规则</el-button>
    </div>
    <!-- 规则列表 -->
    <div class="app-container-list">
      <el-table
        ref="multipleTable"
        :data="tableData"
        height="450"
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="id" />
        <el-table-column prop="regionName" label="省" align="center" />
        <el-table-column prop="areaName" label="城市" align="center" />
        <el-table-column prop="territoryName" label="区县" align="center" />
        <el-table-column prop="channelZh" label="渠道" align="center" />
        <el-table-column prop="subChannelZh" label="子渠道" align="center" />
        <el-table-column prop="unitName" label="单位" align="center" />
        <el-table-column prop="quantity" label="最小起送量" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              style="color: #1890ff"
              @click="handleRemove(scope.row)"
            >删除</el-button>
            <el-button
              type="text"
              size="small"
              style="color: #1890ff"
              @click="handleRedact(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      v-show="tableData.length > 0"
      :total="query.total"
      :page.sync="query.current"
      :limit.sync="query.size"
      @pagination="getList"
    />
  </div>
</template>
<script>
import request from '@/utils/request'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },

  data() {
    return {
      id: '',
      radio: '1',
      // 编辑
      form: {
        city: '',
        id: ''
      },
      // 分页
      query: {
        total: 0,
        current: 1,
        size: 10
      },
      flag: false,
      // 列表数组
      tableData: [],
      removeVisible: false, // 删除弹框
      regulationVisible: false, // 规则弹框
      ruleForm: {
        region: '',
        region1: '',
        name: ''
      },
      city: '',
      channel: '',
      childChannel: '',
      rules: {
        region: [{ required: true, message: '请选择省', trigger: 'blur' }],
        region1: [{ required: true, message: '请选择省', trigger: 'change' }],
        name: [{ required: true, message: '请输入数量', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getorderlist()
  },
  mounted() {
    console.log(window.name)
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    // 列表
    getorderlist() {
      request({
        url: '/business-entity-service/order-quantity/paging',
        params: {
          page: this.query.size,
          current: this.query.current
        },
        method: 'GET'
      })
        .then((resp) => {
          if (resp.code === 200) {
            console.log(resp)
            this.tableData = resp.data.records
            this.query.total = resp.data.total
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 分页
    getList(val) {
      console.log(val)
      this.query.current = val.page
      this.query.size = val.limit
      this.getorderlist()
    },
    // 编辑
    handleRedact(val) {
      this.$router.push({
        path: 'last',
        query: {
          flag: this.flag,
          id: val.id
        }
      })
    },
    // 删除
    handleRemove(row) {
      this.$confirm('确定删除品牌?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          request({
            url: `/business-entity-service/order-quantity/${row.id}`,
            method: 'DELETE'
          }).then((resp) => {
            if (resp.code === 200) {
              this.getorderlist()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 新建规则
    handleAdd() {
      this.flag = true
      this.$router.push({
        path: 'last',
        query: {
          flag: this.flag
        }
      })
    },
    // 新建规则确定
    handleQd() {
      console.log(this.childChannel.toString(), this.channel)
      this.regulationVisible = false
    },
    // 新建规则取消
    addt(val) {
      this.channel = val
    }
  }
}
</script>
<style lang="less">
.app-container-list {
  margin-top: 30px;
}
.app-container-header-centent {
  width: 100%;
  display: flex;
  margin-top: 5px;
  padding: 0 10px;
  height: 40px;
  font-size: 12px;
  background: #f3f3f3;
  align-items: center;
}
.box {
  width: 50px;
  height: 36px;
  border: 0;
}
.form {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

</style>
