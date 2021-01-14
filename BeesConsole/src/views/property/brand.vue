<!-- 商品品牌 -->
<template>
  <div class="app-container">
    <div class="header-center" style="display: flex">
      <ul>
        <!-- 模糊搜素 -->
        <el-input v-model="searchs.input" placeholder="品牌编码：" clearable />
      </ul>
      <ul>
        <el-input v-model="searchs.input1" placeholder="品牌名称：" clearable />
      </ul>
      <ul>
        <el-input
          v-model="searchs.input2"
          placeholder="子品牌名称："
          clearable
        />
      </ul>
      <div class="header-top">
        <!-- 重置查询按钮 -->
        <el-button class="rest" @click="handleReset()">重置按钮</el-button>
        <el-button
          type="primary"
          class="query"
          size="medium"
          @click="handleQuery(searchs)"
        >查询按钮</el-button>
      </div>
    </div>
    <div class="header-list">
      <div class="header-left">
        <span style="fontsize: 14px; color: #666">数据列表</span>
        <el-button
          type="primary "
          plain
          size="medium"
          style=""
          @click="handleAdd"
        >+创建品牌</el-button>
      </div>
      <div class="header-right">
        <el-button
          v-model="checked"
          class="el-icon-upload2"
          style="width: 100px; height: 35px"
          type="primary "
          size="mini"
          plain
          @click="handleExport()"
        >导出</el-button>
      </div>
    </div>
    <!-- 表格列表     -->
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
        <el-table-column
          type="selection"
          width="120"
          style="flex: 1"
          align="center"
        />
        <el-table-column prop="id" label="品牌编码" align="center" />
        <el-table-column prop="name" label="品牌名称" align="center" />
        <el-table-column
          prop="cname"
          label="子品牌名称"
          show-overflow-tooltip
          align="center"
        />
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
              @click="handleUpdate(scope.row)"
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
      @pagination="getList"
    />
    <div v-show="flag">
      <brand ref="headerChild" />
    </div>
    <!-- 编辑 -->
    <el-dialog
      title="编辑商品品牌"
      :visible.sync="centerDialogVisible"
      center
      width="30%"
      top="35vh"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <el-form-item label="商品品牌名称：" prop="name">
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
import Pagination from '@/components/Pagination'
import brand from './components/brand'
import request from '@/utils/request'
export default {
  components: {
    brand,
    Pagination
  },
  data() {
    return {
      // 模糊搜素input框值
      searchs: {
        input: '',
        input1: '',
        input2: ''
      },
      tableData: [], // 分页
      visible: true,
      query: {
        total: 0,
        current: 1,
        size: 10
      },
      centerDialogVisible: false, // 弹框
      form: {
        // 编辑表单
        id: '',
        name: '' // 商品品牌名称
      },
      checked: false,
      flag: false,
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }]
      },
      deriveList: []
    }
  },
  created() {
    this.getpropertyList()
  },
  methods: {
    // 获取数据分页
    getpropertyList() {
      request({
        url:
          'http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/brands/paging',
        method: 'GET',
        params: {
          size: this.query.size,
          current: this.query.current
        }
      })
        .then((resp) => {
          if (resp.code === 0) {
            this.$message.success('获取商品品牌列表成功')
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
      this.getpropertyList()
    },
    // 编辑弹框
    handleUpdate(val) {
      console.log(val)
      this.form.name = val.name
      this.form.id = val.id
      this.centerDialogVisible = true
    },
    // 编辑确定
    handlecenterDialogVisible(form) {
      console.log(form)
      request({
        url: `http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/brands`,
        data: { id: form.id, name: form.name },
        method: 'PUT'
      })
        .then((resp) => {
          console.log(resp)
          if (resp.code === 0) {
            this.$message.success('编辑成功')
            this.centerDialogVisible = false
            this.getpropertyList()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 表格多选框
    handleSelectionChange(val) {
      console.log(val)
      this.deriveList = val
    },
    // 添加
    handleAdd() {
      this.flag = true
    },
    // 查询模糊搜素
    handleQuery(val) {
      console.log(val)
      this.tableData = this.tableData.filter((item) => {
        return item.name.match(val.input1)
      })
    },
    // 重置按钮
    handleReset() {
      this.searchs.input = ''
      this.searchs.input1 = ''
      this.searchs.input2 = ''
      this.getpropertyList()
    },

    add() {
      this.isRead = !this.isRead
      this.isBlue = !this.isBlue
    },
    // 导出
    handleExport() {
      if (this.deriveList.length >= 1) {
        request({
          url:
            'http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/brands/expor',
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
    // 删除
    handleClick(row) {
      this.$confirm('确定删除品牌?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(row)
          request({
            url: `http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/brands/${row.id}`,
            method: 'DELETE'
          })
            .then((resp) => {
              console.log(resp)
              if (resp.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getpropertyList()
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
    }
  }
}
</script>

<style scoped lang='less'>
.app-container {
  width: 100%;
  .header {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background: #f3f3f3;
    padding: 10px;
    span {
      width: 95%;
      display: inline-block;
      font-size: 15px;
      color: #9999;
      margin-left: 6px;
    }
    .button {
      width: 100px;
    }
  }
  .header-top {
    margin-top: 15px;
    margin-left: 30px;
    .query {
      width: 180px;
      height: 37px;
      text-align: center;
    }
    .rest {
      width: 180px;
      height: 37px;
      margin-right: 20px;
      text-align: center;
    }
  }
  .header-center {
    box-sizing: border-box;
    .el-input {
      margin: 0;
      width: 200px;
    }
  }
  .header-list {
    width: 100%;
    display: flex;
    margin-top: 5px;
    padding: 0 20px;
    height: 60px;
    background: #f3f3f3;
    align-items: center;
    justify-content: space-between;
    .header-left {
      width: 86.5%;
      margin-left: 20px;
      .el-button {
        margin-left: 50px;
        border: 1px solid #409eff;
      }
    }
    .el-icon-upload2 {
      width: 200px;
      height: 100px;
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
