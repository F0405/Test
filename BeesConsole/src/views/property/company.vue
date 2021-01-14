<!-- 商品设置 -->
<template>
  <div class="app-container">
    <div class="header-center">
      <ul class="company">
        <!-- 模糊搜素 -->
        <el-input v-model="searchs.input" placeholder="单位编码：" clearable style="width:203px" />
      </ul>
      <ul>
        <el-input v-model="searchs.input1" placeholder="单位名称" clearable style="width:203px" />
      </ul>
      <!-- 重置查询按钮 -->
      <div class="header-top">
        <el-button
          type="primary"
          class="query"
          size="medium"
          @click="handlequery(searchs)"
        >查询按钮</el-button>
        <el-button class="rest" @click="handleReset()">重置按钮</el-button>
      </div>
    </div>
    <div class="header-list">
      <div class="header-left">
        <span style="fontsize: 14px; color: #666">数据列表</span>
        <el-button
          size="medium"
          type="primary"
          plain
          @click="handleAdd"
        >+创建单位</el-button>
      </div>
      <div class="header-right">
        <el-button
          v-model="checked"
          class="el-icon-upload2"
          style="width: 100px; height: 35px"
          size="mini"
          type="primary"
          plain
          @click="handleExport()"
        >导出</el-button>
      </div>
    </div>
    <!-- 表格列表 -->
    <div class="header-footer">
      <el-table
        ref="multipleTable"
        height="500"
        :row-style="{ height: '70px' }"
        :cell-style="{ padding: '10px 0' }"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%; dispaly: flex"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="120"
          style="flex: 1"
          align="center"
        />
        <el-table-column prop="id" label="单位编码" align="center" />
        <el-table-column prop="name" label="单位名称" align="center" />
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              style="color: #1890ff"
              @click="handleClick(scope.row)"
            >删除</el-button>
            <el-button
              type="text"
              size="small"
              style="color: #1890ff"
              @click="handleupdate(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <pagination
      v-show="tableData.length > 0"
      :total="query.total"
      :page.sync="query.current"
      :limit.sync="query.size"
      @pagination="handlePagination"
    />
    <div v-show="flag">
      <company ref="headerChild" />
    </div>
    <el-dialog
      title="编辑商品单位"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      top="35vh"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="商品单位名称：" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handlecenterDialogVisible(form)"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import company from './components/company'
import Pagination from '@/components/Pagination'
import request from '@/utils/request'
export default {
  components: {
    company,
    Pagination
  },
  data() {
    return {
      // 模糊搜素input框值
      searchs: {
        input: '',
        input1: ''
      },
      value: '',
      query: {
        total: 0,
        current: 1,
        size: 10
      },
      messg: '商品单位设置',
      centerDialogVisible: false, // 编辑弹框
      tableData: [],
      form: {
        // 编辑表单
        id: '', // 商品单位ID
        name: '' // 商品单位名称
      },
      rules: {
        name: [{ required: true, message: '请输入商品单位', trigger: 'blur' }]
      },
      checked: false,
      flag: false,
      deriveList: []
    }
  },
  mounted() {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      request({
        url:
          'http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/units/paging',
        params: {
          size: this.query.size,
          current: this.query.current
        },
        method: 'GET'
      })
        .then((resp) => {
          if (resp.code === 0) {
            this.$message.success('获取商品单位列表成功')
            this.tableData = resp.data.records
            this.query.total = resp.data.total
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 分页
    handlePagination(val) {
      console.log(val)
      this.query.current = val.page
      this.query.size = val.limit
      this.getList()
    },
    handleSelectionChange(val) {
      console.log(val)
      this.deriveList = val
    },
    handleAdd() {
      this.flag = true
    },
    // 模糊搜素查询
    handlequery(val) {
      console.log(val)
      const newList = this.tableData.filter((item) => {
        return item.name.match(val.input1)
      })
      this.tableData = newList
    },
    // 重置
    handleReset() {
      this.searchs.input = ''
      this.searchs.input1 = ''
      this.getList()
    },
    // 导出
    handleExport() {
      if (this.deriveList.length >= 0) {
        request({
          url:
            'http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/units/export',
          data: {
            data: this.deriveList
          },
          method: 'GET'
        })
          .then((resp) => {
            console.log(resp)
            if (resp.code === 0) {
              this.$message.success('导出成功')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message.error('请选择要导出的数据')
      }
    },
    handleClick(row) {
      this.$confirm('确定删除此单位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(row)
          request({
            url: `http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/units/${row.id}`,
            method: 'DELETE'
          })
            .then((resp) => {
              if (resp.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getList()
                console.log(this.tableData)
              }
              if (this.tableData.length === 0) {
                console.log(1)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 刷新
    handlefresh() {
      this.$router.go(0)
    },
    // 编辑弹框
    handleupdate(row) {
      this.centerDialogVisible = true
      this.form.id = row.id
      this.form.name = row.name
    },
    // 编辑确定
    handlecenterDialogVisible(form) {
      console.log(form)
      request({
        url: `http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/units`,
        data: { id: form.id, name: form.name },
        method: 'PUT'
      })
        .then((resp) => {
          console.log(resp)
          if (resp.code === 0) {
            this.$message.success('编辑成功')
            this.centerDialogVisible = false
            this.getList()
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
.app-container {
  width: 100%;
  .header-top {
    margin-top: 15px;
    margin-left: 30px;
    .query {
      width: 180px;
      height: 37px;
      margin-right: 20px;
      text-align: center;
    }
    .rest {
      width: 180px;
      height: 37px;
      text-align: center;
    }
  }
  .header-center {
    .el-input {
      margin: 0;
      width: 200px;
    }
  }
  .header-list {
    width: 100%;
    display: flex;
    height: 60px;
    background: #f3f3f3;
    align-items: center;
    padding: 10px;
    margin-top: 5px;
    justify-content: space-between;
    .header-left {
      width: 88.5%;
      .el-button {
        margin-left: 50px;
        border: 1px solid #409eff;
      }
    }
    .el-icon-upload2 {
      border: 1px solid #409eff;
    }
  }
  .ok {
    margin-left: 50px;
    margin-top: 10px;
    background: none;
    span {
      color: #000;
    }
  }
  .el-select {
    margin-left: 20px;
  }
  .el-checkbox {
    margin-left: 50px;
  }
}
</style>
