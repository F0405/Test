<!-- 商品设置 -->
<template>
  <div class="app-container">
    <div class="header-center" style="display: flex">
      <ul>
        <!-- 模糊搜素 -->
        <el-input v-model.trim="searchs.code" placeholder="单位编码：" clearable />
      </ul>
      <ul>
        <el-input v-model.trim="searchs.name" placeholder="单位名称" clearable />
      </ul>
      <!-- 重置查询按钮 -->
      <div class="header-top">
        <el-button
          type="primary"
          class="query"
          size="medium"
          @click="handlequery(searchs)"
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
        >创建单位</el-button>
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
        style="width: 100%"
      >
        <el-table-column prop="id" label="单位编码" align="center" />
        <el-table-column prop="name" label="单位名称" align="center" />
        <el-table-column label="操作" width="100" align="center">
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
      @pagination="getList"
    />
    <!-- 创建单位 -->
    <el-dialog
      :title="flag ? '创建单位' : '编辑单位'"
      :visible.sync="createFlag"
      width="30%"
      center
      :close-on-click-modal="false"
      @open="flag && handlereset()"
      @close="closeDialog"
    >
      <div v-if="flag" class="from">
        <el-form
          ref="companyForm"
          autocomplete="off"
          :model="companyForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="单位编码："
            prop="code"
            :rules="[{ required: true, message: '单位编码不能为空' }]"
          >
            <el-input
              v-model.number="companyForm.code"
              disabled
              placeholder="系统自动生成"
              type="name"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="单位名称："
            prop="name"
            :rules="[{ required: true, message: '请输入单位名称' }]"
            placeholder="请输入单位名称"
          >
            <el-input
              v-model.number="companyForm.name"
              type="name"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
      </div>
      <span v-if="!flag" class="from">
        <el-form ref="form" :model="form" label-width="140px">
          <el-form-item label="商品单位编码：" prop="id">
            <el-input v-model="form.id" :disabled="true" />
          </el-form-item>
          <el-form-item label="商品单位名称：" prop="namet">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-form>
      </span>
      <span v-if="flag" slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handlesubmitForm(companyForm)"
        >确认创建</el-button>
      </span>
      <span v-if="!flag" slot="footer" class="dialog-footer">
        <el-button @click="createFlag = false">取 消</el-button>
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
      queryBrand: {
        current: 1,
        size: 10
      },
      flag: true,
      companyForm: {
        code: '',
        name: '' // 单位名称
      },
      // 模糊搜素input框值
      searchs: {
        code: '',
        name: ''
      },
      value: '',
      messg: '商品单位设置',
      centerDialogVisible: false, // 编辑弹框
      createFlag: false, // 创建
      tableData: [], // 表格数组
      form: {
        id: '', // 商品单位ID
        name: '' // 商品单位名称
      },

      deriveList: [],
      query: {
        total: 1,
        current: 1,
        size: 10
      }
    }
  },
  computed: {},
  mounted() {},
  created() {
    this.getUnits()
  },
  methods: {
    ...mapActions('settings', [
      'removeunit',
      'addunit',
      'selectunit',
      'editorunit',
      'unitList'
    ]),
    getUnits() {
      request({
        url: '/products-service/products/manager/queryProductsUnitPage',
        params: {
          size: this.query.size,
          current: this.query.current
        },
        method: 'GET'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.tableData = resp.result.list
            this.query.total = resp.result.total
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getList(val) {
      this.query.current = val.page
      this.query.size = val.limit
      this.getUnits()
    },
    handleAdd() {
      this.createFlag = true
      this.flag = true
      this.$nextTick(function() {
        this.$refs['companyForm'].clearValidate()
      })
      for (const key in this.companyForm) {
        this.companyForm[key] = ''
      }
    },
    handlereset() {
      this.$nextTick(() => {
        this.$refs['companyForm'].resetFields()
      })
    },
    // 模糊搜素查询
    handlequery(val) {
      request({
        url: '/products-service/products/manager/queryProductsUnitPage',
        params: {
          id: val.code,
          name: val.name,
          size: this.query.size,
          current: this.query.current
        },
        method: 'GET'
      }).then((resp) => {
        if (resp.code === 200) {
          this.tableData = resp.result.list
        }
      })
        .catch((err) => {
          console.log(err)
        })
    },
    // 重置
    handleReset() {
      this.searchs.code = ''
      this.searchs.name = ''
      this.getUnits()
    },

    // 刷新
    handlefresh() {
      this.$router.go(0)
    },
    // 编辑弹框
    handleupdate(row) {
      this.createFlag = true
      this.form.id = row.id
      this.form.name = row.name
      this.flag = false
    },
    // 编辑确定
    handlecenterDialogVisible(form) {
      request({
        url: '/products-service/products/manager/editProductsUnit',
        data: {
          id: form.id,
          name: form.name
        },
        method: 'PUT'
      }).then((resp) => {
        if (resp.code === 200) {
          this.getUnits()
          this.createFlag = false
        }
      })
        .catch((err) => {
          console.log(err)
        })
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
            url: '/products-service/products/manager/delProductsUnit',
            data: {
              id: row.id
            },
            method: 'PUT'
          }).then((resp) => {
            if (resp.code === 200) {
              this.getUnits()
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

    // 创建
    handlesubmitForm(row) {
      if (row.name && row.name !== ' ') {
        request({
          url: '/products-service/products/manager/createProductsUnit',
          data: {
            name: row.name,
            code: row.sapCode
          },
          method: 'POST'
        }).then((resp) => {
          if (resp.code === 200) {
            this.getUnits()
            this.createFlag = false
          }
        })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message.error('请输入必填项')
      }
    },
    closeDialog() {

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
    .query {
      width: 180px;
      height: 37px;
      margin-right: 20px;
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
    height: 70px;
    .el-input {
      margin: 0;
      width: 200px;
    }
  }
  .header-list {
    width: 100%;
    display: flex;
    height: 60px;
    margin-top: 5px;
    background: #f3f3f3;
    align-items: center;
    padding: 0 10px;
    font-size: 12px;
    height: 40px;
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
.el-form {
  margin-left: 20px;
}
.from{
  display: flex;
  justify-content: center;
  margin:  0 auto;
}
</style>
