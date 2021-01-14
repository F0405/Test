<!-- 模糊分类 -->
<template>
  <div class="app-container">
    <div class="header-center" style="display: flex">
      <ul>
        <!-- 模糊搜素 -->
        <el-input v-model.trim="searchs.code" placeholder="分类编码" clearable />
      </ul>
      <ul>
        <el-input v-model.trim="searchs.id" placeholder="分类级别" clearable />
      </ul>
      <ul>
        <el-input v-model.trim="searchs.name" placeholder="分类名称" clearable />
      </ul>
      <!-- 重置查询按钮 -->
      <div class="header-top">
        <el-button
          type="primary "
          size="medium"
          class="query"
          @click="handleQuery(searchs)"
        >搜索</el-button>
        <el-button class="rest" @click="handleReset()">重置</el-button>
      </div>
    </div>
    <div class="header-list">
      <div class="header-left">
        <span style="fontsize: 14px; color: #000">数据列表</span>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          plain
          @click="handleAdd"
        >创建分类</el-button>
      </div>
    </div>
    <!-- 表格列表 -->
    <div class="header-footer">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        height="500"
        :row-style="{ height: '70px' }"
        :cell-style="{ padding: '10px 0' }"
      >
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
        <el-table-column width="120" label="操作" align="center">
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
      v-show="query.total > 0"
      :total="query.total"
      :page.sync="query.current"
      :limit.sync="query.size"
      @pagination="handlePagination"
    />
    <!-- 编辑 -->
    <el-dialog
      title="编辑商品分类"
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      width="30%"
      center
      top="35vh"
    />
    <!-- 创建分类 -->
    <el-dialog
      :title="flag?'创建分类':'编辑分类'"
      :visible.sync="centerDialogVisibleflag"
      width="30%"
      center
      :close-on-click-modal="false"
      @open="flag && handlereset()"
    >
      <div v-if="flag" class="from">
        <el-form
          ref="filterForm"
          :model="filterForm"
          class="demo-ruleForm"
          :rules="ruless"
        >
          <el-form-item label="分类级别：" label-width="130px" prop="level">
            <el-select
              v-model="filterForm.level"
              style="width:203px"
              placeholder="请选择"
              clearable
              class="filter-item"
              @change="currentSel"
            >
              <el-option
                v-for="item in channelOptionst"
                :key="item.value"
                style="500px"
                :value="item.value"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="分类编码："
            prop="code"
            label-width="130px"
          >
            <el-input
              v-model="filterForm.code"
              :disabled="true"
              placeholder="系统自动生成"
              style="width:203px"
            />
          </el-form-item>
          <el-form-item label="ERP 分类编码：" label-width="130px" prop="filter">
            <el-input
              v-model.number="filterForm.filter"
              type="name"
              autocomplete="off"
              placeholder="请输入ERP分类编码"
              style="width:203px"
            />
          </el-form-item>
          <el-form-item label="分类名称：" label-width="130px" prop="name">
            <el-input
              v-model.number="filterForm.name"
              type="name"
              autocomplete="off"
              style="width:203px"
              placeholder="请输入品牌名称"
            />
          </el-form-item>
          <el-form-item label="上级分类名称" label-width="130px" prop="superior">
            <el-select
              v-model="filterForm.superior"
              style="width:203px"
              placeholder="请选择"
              clearable
              class="filter-item"
              @change="handleclassify"
            >
              <el-option
                v-for="item in filterbrandList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span v-if="flag" slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handlesubmitForm(filterForm)"
        >确认创建</el-button>
      </span>
      <span v-if="!flag" class="from">
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="分类级别：" label-width="150px" prop="level">
            <el-select
              v-model="form.level"
              style="width:203px"
              placeholder="请选择"
              clearable
              class="filter-item"
              @change="currentSel"
            >
              <el-option
                v-for="item in channelOptionst"
                :key="item.value"
                style="500px"
                :value="item.value"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="分类编码：" prop="code">
            <el-input
              v-model="form.code"
              :disabled="true"
              placeholder="请输入分类编码"
            />
          </el-form-item>
          <el-form-item label="ERP 分类编码：" label-width="150px">
            <el-input
              v-model="form.filter"
              type="name"
              autocomplete="off"
              placeholder="请输入ERP分类编码"
              style="width:203px"
            />
          </el-form-item>
          <el-form-item label="分类名称：" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="上级分类名称" label-width="150px" prop="superior">
            <el-select
              v-model="form.superior"
              style="width:203px"
              placeholder="请选择"
              clearable
              class="filter-item"
              @change="handleclassify"
            >
              <el-option
                v-for="item in filterbrandList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span v-if="!flag" slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleflag = false">取 消</el-button>
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
import request from '@/utils/request'
import { mapActions } from 'vuex'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      // 品牌子品牌
      channelOptionst: [
        {
          name: '1级',
          value: 1
        },
        {
          name: '2级',
          value: 2
        }, {
          name: '3级',
          value: 3
        }
      ],
      filterForm: {
        age: '',
        superior: '',
        filter: '',
        level: '',
        code: '',
        id: '',
        name: ''
      },
      ruless: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        superior: [
          { required: true, message: '请选择上级分类名称', trigger: 'change' }
        ],
        code: [{ required: true, message: '请输入分类编码', trigger: 'blur' }],
        level: [
          { required: true, message: '请选择分类级别', trigger: 'change' }
        ]
      },
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入分类编码', trigger: 'blur' }]
      },
      // input框模糊搜素的值
      searchs: {
        code: '',
        id: '',
        name: ''
      },
      centerDialogVisible: false, // 编辑弹框
      centerDialogVisibleflag: false, // 创建
      query: {
        total: 1,
        current: 1,
        size: 10
      },
      // 分页
      tableData: [],
      form: {
        age: '',
        superior: '',
        filter: '',
        level: '',
        code: '',
        id: '',
        name: '',
        erpCode: ''
      },
      flag: true,
      deriveList: [], // input单选框数组
      filterbrandList: null,
      classifyName: '',
      classifyId: ''
    }
  },
  mounted() {},
  created() {
    this.gitFilterList()
    this.currentSel()
  },
  methods: {
    ...mapActions('settings', [
      'classification',
      'selectclassification',
      'deleteclassification',
      'editorclassification'
    ]),

    gitFilterList() {
      request({
        url: '/products-service/products/manager/queryProductsCategoryPage',
        params: {
          size: this.query.size,
          current: this.query.current
        },
        method: 'GET'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.query.total = resp.result.total
            this.tableData = resp.result.list
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
      this.centerDialogVisibleflag = true
      this.filterForm.level = ''
      this.flag = true
    },
    // 查询模糊搜素
    handleQuery(val) {
      request({
        url: '/products-service/products/manager/queryProductsCategory',
        params: {
          id: val.code,
          level: val.id,
          name: val.name,
          size: this.query.size,
          current: this.query.current
        },
        method: 'GET'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.tableData = resp.result
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 重置
    handleReset() {
      this.searchs.code = ''
      this.searchs.id = ''
      this.searchs.name = ''
      this.gitFilterList()
    },
    handlereset() {
      this.$nextTick(() => {
        this.$refs['filterForm'].resetFields()
      })
    },
    // 编辑弹框
    handleUpdate(row) {
      console.log(row, 'row')
      this.form.code = row.id
      this.form.name = row.name
      this.form.erpCode = row.erpCode
      this.form.level = row.level
      this.form.superior = row.parentName
      this.form.id = row.id
      this.form.filter = row.erpCode
      this.centerDialogVisibleflag = true
      this.flag = false
    },
    // 编辑确认按钮
    handlecenterDialogVisible(form) {
      console.log(form.erpCode, 'fom')
      if (form.name !== '' && form.name) {
        request({
          url: '/products-service/products/manager/editProductsCategory',
          data: {
            id: form.id,
            name: form.name,
            parentId: this.classifyId,
            erpCode: form.filter
          },
          method: 'PUT'
        })
          .then((resp) => {
            if (resp.code === 200) {
              this.gitFilterList()
              this.centerDialogVisibleflag = false
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message.error('请输入或者选择必填项')
      }
    },

    // 删除
    handleClick(row) {
      this.$confirm('确定删除此分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          request({
            url: '/products-service/products/manager/delProductsCategory',
            data: {
              id: row.id
            },
            method: 'PUT'
          }).then((resp) => {
            if (resp.code === 200) {
              this.gitFilterList()
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
    // 创建
    handlesubmitForm(row) {
      if (row.name && row.name !== ' ') {
        request({
          url: '/products-service/products/manager/createProductsCategory',
          data: {
            name: row.name,
            parentId: this.classifyId,
            level: row.level,
            erpCode: row.filter
          },
          method: 'POST'
        })
          .then((resp) => {
            if (resp.code === 200) {
              console.log(resp, 'resp')
              this.gitFilterList()
              this.flag = true
              this.centerDialogVisibleflag = false
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message.error('字段不完整')
      }
    },
    // 商品级别
    currentSel(value) {
      this.classifyName = value
      if (this.classifyName === 1) {
        this.filterbrandList = [{
          name: '空',
          value: 123
        }]
      } else if (this.classifyName === 2) {
        request({
          url: '/products-service/products/manager/queryProductsCategory',
          params: {
            level: 1
          },
          method: 'GET'
        })
          .then((resp) => {
            if (resp.code === 200) {
              this.filterbrandList = resp.result
            }
          })
      } else {
        request({
          url: '/products-service/products/manager/queryProductsCategory',
          params: {
            level: 2
          },
          method: 'GET'
        })
          .then((resp) => {
            if (resp.code === 200) {
              this.filterbrandList = resp.result
            }
          })
      }
    },
    handleclassify(value) {
      this.classifyId = value
    }
  }
}
</script>

<style scoped lang='less'>
.app-container {
  width: 100%;
  padding: 0;
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
    box-sizing: border-box;
    height: 70px;
    .el-input {
      margin: 0;
      width: 200px;
    }
  }
  .header-list {
    width: 100%;
    display: flex;
    margin-top: 5px;
    height: 40px;
    font-size: 12px;
    background: #f3f3f3;
    align-items: center;
    padding: 0 10px;
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
.app-container .el-select[data-v-9a08a8f2] {
  margin: 0;
}
.from{
  display: flex;
  justify-content: center;
  margin:  0 auto;
}
</style>
