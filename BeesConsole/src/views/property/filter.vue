<!-- 模糊分类 -->
<template>
  <div class="app-container">
    <div class="header-center" style="display: flex">
      <ul>
        <!-- 模糊搜素 -->
        <el-input v-model="searchs.input2" placeholder="分类编码" clearable />
      </ul>
      <ul>
        <el-input v-model="searchs.input1" placeholder="分类级别" clearable />
      </ul>
      <ul>
        <el-input v-model="searchs.input" placeholder="分类名称" clearable />
      </ul>
      <!-- 重置查询按钮 -->
      <div class="header-top">
        <el-button
          type="primary "
          size="medium"
          class="query"
          @click="handleQuery(searchs)"
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
        >+创建分类</el-button>
      </div>
      <div class="header-right">
        <el-button
          v-model="checked"
          class="el-icon-upload2"
          size="mini"
          type="primary"
          plain
          style="width: 100px; height: 35px"
          @click="export2Excel()"
        >导出</el-button>
      </div>
    </div>
    <!-- 表格列表 -->
    <div class="header-footer">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%; dispaly: flex"
        height="500"
        :row-style="{ height: '70px' }"
        :cell-style="{ padding: '10px 0' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="120" align="center" />
        <el-table-column
          label="分类编码"
          style="width: 100px"
          prop="id"
          align="center"
        />
        <el-table-column
          prop="erpCode"
          label="ERP分类编码"
          style="width: 100px"
          align="center"
        />
        <el-table-column
          prop="name"
          label="分类名称"
          show-overflow-tooltip
          style="width: 100px"
          align="center"
        />
        <el-table-column
          prop="level"
          label="级别"
          show-overflow-tooltip
          style="width: 100px"
          align="center"
        />
        <el-table-column
          prop="parentName"
          label="上级分类名称"
          show-overflow-tooltip
          style="width: 100px"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="200" align="center">
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
              @click="handleUpdate(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              style="color: #1890ff"
              @click="handleTop()"
            >置顶</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width: 80px; height: 30px" class="ok">确定</el-button>
    </div>
    <!-- 分页 -->
    <pagination
      v-show="query.total > 0"
      :total="query.total"
      :page.sync="query.current"
      :limit.sync="query.size"
      @pagination="handlePagination"
    />
    <!-- 添加 -->
    <div v-show="flag">
      <filters ref="headerChild" />
    </div>
    <!-- 编辑 -->
    <el-dialog
      title="编辑商品分类"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      top="35vh"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="分类品牌名称：" prop="name">
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
import filters from './components/filter'
import Pagination from '@/components/Pagination'
import request from '@/utils/request'
export default {
  components: {
    filters,
    Pagination
  },
  data() {
    return {
      checked1: false,
      // input框模糊搜素的值
      searchs: {
        input: '',
        input1: '',
        input2: ''
      },
      value: '',
      centerDialogVisible: false, // 编辑弹框
      query: {
        total: 0,
        current: 1,
        size: 10
      }, // 分页
      tableData: [],
      form: {
        // 编辑表单
        id: '', // 商品分类ID
        name: '' // 分类名称
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }]
      },
      checked: false, // 全选
      flag: false, // 创建弹框
      messge: '商品分类设置', // 标题
      deriveList: [] // input单选框数组
    }
  },
  mounted() {},
  created() {
    this.gitFilterList()
  },
  methods: {
    gitFilterList() {
      request({
        url:
          'http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/categories/paging',
        params: {
          size: this.query.size,
          current: this.query.current
        },
        method: 'GET'
      })
        .then((resp) => {
          if (resp.code === 0) {
            // this.$message.success('获取商品分类列表成功')
            this.query.total = resp.data.total
            this.tableData = resp.data.records
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handlePagination(val) {
      this.query.current = val.page
      this.query.size = val.limit
      this.gitFilterList()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 添加
    handleAdd() {
      this.flag = true
    },
    // 查询模糊搜素
    handleQuery(val) {
      console.log(val)
      const newList = this.tableData.filter((item) => {
        return item.name.match(val.input)
      })
      this.tableData = newList
    },
    // 重置
    handleReset() {
      this.searchs.input = ''
      this.searchs.input1 = ''
      this.searchs.input2 = ''
      this.gitFilterList()
    },
    // 编辑弹框
    handleUpdate(row) {
      this.form.id = row.id
      this.form.name = row.name
      this.centerDialogVisible = true
    },
    // 编辑确认按钮
    handlecenterDialogVisible(form) {
      // console.log(form)
      request({
        url: `http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/units`,
        data: { id: form.id, name: form.name },
        method: 'PUT'
      })
        .then((resp) => {
          // console.log(resp)
          if (resp.code === 0) {
            this.$message.success('编辑成功')
            this.centerDialogVisible = false
            this.gitFilterList()
            this.form.name = ' '
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 单选框
    handleSelectionChange(val) {
      console.log(val)
      this.deriveList = val
    },
    // 导出
    export2Excel() {
      if (this.deriveList.length >= 1) {
        request({
          url:
            'http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/categories/expor',
          data: {
            list: this.deriveList
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
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    // 删除
    handleClick(row) {
      this.$confirm('确定删除此分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(row)
          request({
            url: `http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/categories/${row.id}`,
            method: 'DELETE'
          })
            .then((resp) => {
              console.log(resp)
              if (resp.code === 0) {
                this.gitFilterList()
                if (this.tableData.length === 1) {
                  this.handlePagination()
                }
              }
            })
            .catch((err) => {
              console.log(err)
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 置顶
    handleTop() {
      alert('置顶')
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
    .filter {
      width: 90%;
    }
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
    margin-top: 5px;
    height: 60px;
    background: #f3f3f3;
    align-items: center;
    padding: 10px;
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
