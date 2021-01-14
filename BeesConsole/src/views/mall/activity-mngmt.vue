<!-- 活动管理 -->
<template>
  <!-- 头部搜索框 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="content.code"
        placeholder="请输入活动编号"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="content.erpCode"
        placeholder="请输入ERP活动编号"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-date-picker
        v-model="value2"
        type="daterange"
        style="width: 400px"
        class="filter-item"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      />
      <el-select
        v-model="content.hd"
        placeholder="请选择是否有ERP活动编号"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in channelOptions1"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="content.hd"
        placeholder="请选择活动类型"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in channelOptions1"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="content.sd"
        placeholder="请选择活动对象"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option value="售点" />
      </el-select>
      <el-select
        v-model="content.cs"
        placeholder="请选择城市区县"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in channelOptions2"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="content.qd"
        placeholder="请选择活动渠道"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in channelOptions2"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="content.qd"
        placeholder="请选择状态"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in channelOptions3"
          :key="item.value"
          :value="item.value"
          :label="item.name"
        />
      </el-select>
      <el-button
        type="primary "
        size="medium"
        style="width: 200px"
      >搜索</el-button>
    </div>
    <div class="dataListt">
      数据列表
      <el-button
        size="mini"
        class="create1"
        icon="el-icon-plus"
        type="primary"
        plain
        @click="create"
      >创建活动</el-button>
      <el-button size="mini" type="primary" plain>复制现有活动</el-button>
      <div class="fr">
        <el-button type="primary" size="mini">选择导出字段</el-button>
        <el-button
          icon="el-icon-upload2"
          type="primary"
          size="mini"
          plain
          @click="dc"
        >导出</el-button>
      </div>
    </div>
    <!-- 表格列表 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      height="450"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        prop="date"
        label="活动编号"
        width="180"
        align="center"
      />
      <el-table-column
        prop="name"
        label="ERP活动编号"
        width="180"
        align="center"
      />
      <el-table-column prop="date" label="活动名称" align="center" />
      <el-table-column prop="address" label="活动类型" align="center" />
      <el-table-column prop="address" label="对象" align="center" />
      <el-table-column prop="address" label="区县" align="center" />
      <el-table-column prop="name" label="渠道" align="center" />
      <el-table-column prop="address" label="子渠道" align="center" />
      <el-table-column prop="address" label="状态" align="center" />
      <el-table-column prop="name" label="开始时间" align="center" />
      <el-table-column prop="address" label="结束时间" align="center" />
      <el-table-column prop="address" label="修改时间" align="center" />
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            style="color: #1890ff"
            @click="handleClick(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            style="color: #1890ff"
            @click="handleUpdate(scope.row)"
            @pagination="pagination"
          >下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="tableData.length"
      :page.sync="query.current"
      :limit.sync="query.size"
      @pagination="pagination"
    />
  </div>
</template>
<script>
import request from '@/utils/request'
import pagination from '@/components/Pagination' // 分页
export default {
  components: {
    pagination
  },
  props: {},
  data() {
    return {
      radio: 3,
      upDataShowFlag: true,
      content: {
        name: '',
        code: '',
        erpCode: '',
        channel: '',
        hd: '',
        sd: '',
        cs: '',
        qd: '',
        zt: ''
      },
      // 请选择活动类型
      channelOptions1: [
        {
          name: '张三1',
          value: 123
        }
      ],
      // 请选择城市区
      channelOptions2: [
        {
          name: '河南省',
          value: '1'
        }
      ],
      // 请选择状态
      channelOptions3: [
        {
          name: '状态',
          value: '1'
        }
      ],
      value2: '',
      // 表格列表
      tableData: [
      ],
      value: '',
      query: {
        total: 0,
        current: 1,
        size: 10
      },
      // 表单
      ruleForm: {
        name: ''
      },
      // 正则
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.pagination()
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    // 分页
    pagination(val) {
      request({
        url: '/activities/paging',
        method: 'GET',
        params: {
          size: this.query.size,
          current: this.query.current
        }
      })
        .then((resp) => {
          if (resp.code === 0) {
            console.log(resp.result.records, '111')
            this.$message.success('获取活动列表成功')
            this.tableData = resp.data.records
            this.query.total = resp.data.total
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 编辑
    handleClick(scope) {
      console.log(scope)
    },
    // 下架
    handleUpdate(scope) {
      console.log(scope)
    },
    // 获取单选框值
    handleSelectionChange(val) {
      console.log(val)
    },
    // 导出
    dc() {
      alert(1)
    },
    // ERP单选框
    add(value) {
      console.log(value)
    },
    // 创建活动
    create() {
      this.$router.push('creation')
    }
  }
}
</script>
<style lang="less">
.dataListt {
  width: 100%;
  background: #f3f3f3;
  font-size: 12px;
  line-height: 40px;
  padding: 0 10px;
}
.el-icon-zoom-in {
  font-size: 16px;
}
.el-radio__input {
  height: 30px;
}
.el-radio__input {
  margin-top: 12px;
}
#upData {
  width: 100%;
  height: 50px;
}
.el-radio {
  width: 100%;
}
.dialog {
  .el-form {
    width: 50%;
    margin: 0 auto;
    .el-input {
      width: 200px;
    }
  }
}
.create1 {
  margin-left: 50px;
}
</style>
