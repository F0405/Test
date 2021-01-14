<!-- 商品品牌 -->
<template>
  <div class="app-container">
    <div class="header-center" style="display: flex">
      <ul>
        <!-- 模糊搜素 -->
        <el-input
          v-model.trim="searchs.skuCode"
          placeholder="品牌编码："
          clearable
        />
      </ul>
      <ul>
        <el-input v-model.trim="searchs.name" placeholder="品牌名称：" clearable />
      </ul>
      <ul>
        <el-input
          v-model.trim="searchs.parentName"
          placeholder="父品牌名称："
          clearable
        />
      </ul>
      <div class="header-top">
        <!-- 重置查询按钮 -->
        <el-button
          type="primary"
          class="query"
          size="medium"
          @click="handleQuery(searchs)"
        >搜索</el-button>
        <el-button class="rest" @click="handleReset()">重置</el-button>
      </div>
    </div>
    <div class="header-list">
      <div class="header-left">
        <span style="fontsize: 14px; color: #000">数据列表</span>
        <el-button
          type="primary "
          plain
          size="mini"
          icon="el-icon-plus"
          @click="handleAdd"
        >创建品牌</el-button>
      </div>
      <div class="header-right" />
    </div>
    <!-- 表格列表     -->
    <div class="header-footer">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        height="500"
        :row-style="{ height: '70px' }"
        :cell-style="{ padding: '10px 0' }"
      >
        <el-table-column prop="id" label="品牌编码" align="center" />
        <el-table-column prop="name" label="品牌名称" align="center" />
        <el-table-column
          prop="parentName"
          label="父品牌名称"
          show-overflow-tooltip
          align="center"
        />
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
    <!-- 创建品牌 -->
    <el-dialog
      :title="flag?'创建品牌':'编辑品牌'"
      :visible.sync="centerDialogVisibletk"
      width="30%"
      center
      :close-on-click-modal="false"
      @open="flag && handlereset()"
    >
      <div v-if="flag" class="from">
        <el-form
          ref="brandForm"
          class="demo-ruleForm"
          :model="brandForm"
        >
          <el-form-item
            label-width="130px"
            label="品牌级别:"
            prop="level"
            :rules="[{ required: true, message: '请输入品牌级别' }]"
          >
            <el-select
              v-model="brandForm.level"
              placeholder="可选择品牌或者子品牌"
              clearable
              class="filter-item"
              style="width:203px"
              @change="currentSel"
            >
              <el-option
                v-for="item in channelOptions"
                :key="item.value"
                :value="item.value"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="品牌编码:"
            prop="sapCode"
            label-width="130px"
            :rules="[{ required: true, message: '请输入品牌编码' }]"
          >
            <el-input
              v-model="brandForm.sapCode"
              :disabled="true"
              placeholder="系统自动生成"
              style="width:203px"
            />
          </el-form-item>
          <el-form-item label="品牌名称:" prop="name" label-width="130px" :rules="[{ required: true, message: '请输入品牌名称' }]">
            <el-input
              v-model.trim="brandForm.name"
              placeholder="请输入品牌名称"
              style="width:203px"
            />
          </el-form-item>
          <el-form-item label="品牌所属上级:" prop="superior" label-width="130px">
            <el-select
              v-model="brandForm.brand"
              style="width:203px"
              placeholder="请选择分类"
              clearable
              @change="handleclassify"
            >
              <el-option
                v-for="item in brandList"
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
          @click="handleonSubmit(brandForm)"
        >确认创建</el-button>
      </span>
      <div v-if="!flag" class="from">
        <el-form ref="form" :model="form">
          <el-form-item
            label="品牌级别:"
            prop="level"
            label-width="130px"
            :rules="[{ required: true, message: '请输入品牌级别' }]"
          >
            <el-select
              v-model="form.level"
              placeholder="请选择分类"
              clearable
              class="filter-item"
              style="width:203px"
              @change="handleUpdata"
            >
              <el-option
                v-for="item in channelOptions"
                :key="item.value"
                :value="item.value"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌编码：" prop="id" label-width="130px" :rules="[{ required: true, message: '请输入品牌编码' }]">
            <el-input v-model="form.id" style="width:203px" disabled />
          </el-form-item>
          <el-form-item label="品牌名称：" prop="name" label-width="130px" :rules="[{ required: true, message: '请输入品牌名称' }]">
            <el-input v-model="form.name" style="width:203px" />
          </el-form-item>
          <el-form-item label="品牌所属上级:" prop="superior" label-width="130px">
            <el-select
              v-model="form.parentName"
              style="width:203px"
              placeholder="请选择商品级别"
              clearable
              @change="handleclassify"
            >
              <el-option
                v-for="item in brandList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span v-if="!flag" slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibletk = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handlecompilesubmit(form)"
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
      brandoption: [],
      channelOptions: [
        {
          name: '品牌',
          value: 0
        },
        {
          name: '子品牌',
          value: 1
        }
      ],
      query: {
        total: 1,
        current: 1,
        size: 10
      },
      flag: true,
      dialogFlag: false,
      brandForm: {
        name: '', // 品牌创建名称
        level: '',
        sapCode: '',
        parentId: '',
        parentName: '',
        brand: ''
      },
      classifyId: '',
      Updatalevel: '',
      // 模糊搜素input框值
      searchs: {
        skuCode: '',
        name: '',
        parentName: ''
      },
      tableData: [], // 分页
      visible: true,
      centerDialogVisibletk: false, // 创建弹框
      centerDialogVisible: false, // 弹框
      form: {
        name: '', // 品牌创建名称
        level: '',
        sapCode: '',
        parentId: '',
        parentName: '',
        brand: ''
      },
      deriveList: [],
      brandList: []
    }
  },
  computed: {

  },
  created() {
    this.commodity()
    this.currentSel()
    this.handleUpdata()
  },
  methods: {
    ...mapActions('settings', [
      'getFileList',
      'brandRemove',
      'createBrand',
      'editorBrand'
    ]),
    commodity() {
      request({
        url: '/products-service/products/manager/queryProductsBrandPage',
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
      this.commodity()
    },
    // 编辑弹框
    handleUpdate(val) {
      console.log(val, '21')
      this.form.name = val.name
      this.form.id = val.id
      this.form.level = val.level
      this.form.parentName = val.parentName
      this.centerDialogVisibletk = true
      this.flag = false
    },
    // 编辑确定
    handlecompilesubmit(form) {
      request({
        url: '/products-service/products/manager/editProductsBrand',
        data: {
          id: form.id,
          name: form.name,
          sapCode: form.sapCode,
          level: this.Updatalevel,
          parentId: this.classifyId
        },
        method: 'PUT'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.centerDialogVisibletk = false
            this.commodity()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 添加
    handleAdd() {
      this.flag = true
      this.centerDialogVisibletk = true
      this.brandForm.brand = ''
      this.brandForm.name = ''
      this.brandForm.level = ''
      this.brandForm.sapCode = ''
      this.brandForm.parentId = ''
      this.brandForm.parentName = ''
    },
    // 查询模糊搜素
    handleQuery(val) {
      request({
        url: '/products-service/products/manager/queryProductsBrandPage',
        params: {
          size: this.query.size,
          current: this.query.current,
          name: val.name,
          id: val.skuCode,
          parentName: val.parentName
        },
        method: 'GET'
      })
        .then((resp) => {
          if (resp.code === 200) {
            this.tableData = resp.result.list
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 重置按钮
    handleReset() {
      this.searchs.skuCode = ''
      this.searchs.name = ''
      this.searchs.parentName = ''
      this.commodity()
    },
    // 删除
    handleClick(row) {
      this.$confirm('确定删除品牌?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          request({
            url: '/products-service/products/manager/deleteProductsBrand',
            data: {
              id: row.id
            },
            method: 'PUT'
          }).then((resp) => {
            if (resp.code === 200) {
              this.commodity()
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
    handleonSubmit(row) {
      if (this.level !== '' && this.level || this.level === 0 || this.level === 1) {
        request({
          url: '/products-service/products/manager/createProductsBrand',
          data: {
            name: row.name,
            level: row.level,
            parentId: this.classifyId
          },
          method: 'POST'
        })
          .then((resp) => {
            if (resp.code === 200) {
              this.commodity()()
            }
          })
          .catch((err) => {
            console.log(err)
          })

        this.centerDialogVisibletk = false
      } else {
        this.$message.error('请输入或者选择必填项')
      }
    },
    handlereset() {
      this.$nextTick(() => {
        this.$refs['brandForm'].resetFields()
      })
    },
    handleclassify(value) {
      this.classifyId = value
    },
    // 编辑
    handleUpdata(value) {
      this.Updatalevel = value

      if (this.Updatalevel === 0) {
        request({
          url: '/products-service/products/manager/queryProductsBrand',
          params: {
            level: -1
          },
          method: 'GET'
        })
          .then((resp) => {
            if (resp.code === 200) {
              this.brandList = resp.result
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        request({
          url: '/products-service/products/manager/queryProductsBrand',
          params: {
            level: 0
          },
          method: 'GET'
        })
          .then((resp) => {
            if (resp.code === 200) {
              this.brandList = resp.result
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    // 商品级别
    currentSel(value) {
      this.level = value
      if (this.level === 0) {
        this.brandList = [{
          name: '空',
          value: 1
        }]
      } else {
        request({
          url: '/products-service/products/manager/queryProductsBrand',
          params: {
            level: 0
          },
          method: 'GET'
        })
          .then((resp) => {
            if (resp.code === 200) {
              this.brandList = resp.result
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }

  }

}
</script>

<style scoped lang='less'>
.app-container {
  padding: 0;
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
    padding: 0 10px;
    height: 40px;
    font-size: 12px;
    background: #f3f3f3;
    align-items: center;
    justify-content: space-between;
    .header-left {
      width: 86.5%;
      .el-button {
        margin-left: 50px;
        border: 1px solid #409eff;
      }
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
.app-container .el-select[data-v-8e86a370] {
  margin: 0;
}
.from{
  display: flex;
  justify-content: center;
  margin:  0 auto;
.app-container .el-select[data-v-4afc8a8d]{
  margin: 0;
}
}
</style>
