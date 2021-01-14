<template>
  <div class="from">
    <div class="from-top">
      <p><i class="el-icon-document" style="color: #00d7b5" />创建分类</p>
      <span class="el-icon-close" @click="handleRemove" />
    </div>
    <el-form
      ref="filterForm"
      :model="filterForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="分类名称："
        prop="name"
        placeholder="请输入品牌名称"
        :rules="[{ required: true, message: '品牌名称不能为空' }]"
      >
        <el-input
          v-model.number="filterForm.name"
          type="name"
          autocomplete="off"
          placeholder="请输入品牌名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="el-icon-s-order"
          @click="submitForm(filterForm)"
        >确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  // props: ['flag'],
  data() {
    return {
      filterForm: {
        age: '',
        code: 'B1002', // 分类编码
        name: '', // 分类名称
        erpCode: 'E1002', // erp分类编码
        parentName: '百威啤酒',
        parentId: '' // 父分类ID
      }
    }
  },
  methods: {
    submitForm(row) {
      if (row.name && row.name !== ' ') {
        request({
          url:
            'http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/categories',
          data: { name: row.name },
          method: 'POST'
        })
          .then((resp) => {
            console.log(resp)
            if (resp.code === 0) {
              this.$message.success('添加分类成功')
              this.$parent.gitFilterList()
              this.$parent.flag = false
              this.filterForm.name = ' '
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    handleRemove() {
      this.$parent.flag = false
    }
  }
}
</script>

<style lang='less' scoped>
.from {
  box-sizing: border-box;
  position: absolute;
  width: 500px;
  height: 350px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 1px solid #ccc;
  z-index: 99;
  .el-select {
    width: 100%;
  }
}
.el-input {
  width: 80%;
}
.from-top {
  padding: 5px;
  width: 100%;
  height: 50px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  p {
    float: left;
    margin-left: 20px;
    font-size: 16px;
    color: #6b6b6b;
    .el-icon-document {
      margin-right: 10px;
    }
  }
  span {
    float: right;
  }
  .el-icon-close {
    font-size: 20px;
    margin-top: 10px;
    margin-right: 10px;
  }
}
.el-form {
  margin-top: 20px;
}
.center {
  width: 100%;
  display: flex;
  p {
    margin-left: 20px;
  }
}
.el-button {
  position: fixed;
  left: 50%;
  top: 90%;
  transform: (translate(-50%, -50%));
  background: yellow;
  color: #000;
  border: 0;
}
.el-form {
  margin-top: 60px;
}
.el-form-item {
  margin: 20px;
  color: #949494;
  font-size: 14px;
  .el-input {
    width: 100%;
  }
  .el-form-item--medium .el-form-item__label,
  .el-form-item--medium .el-form-item__content {
    line-height: 0px;
  }
}
.center {
  p {
    font-size: 14px;
    color: #333;
    margin-left: 90px;
  }
  .el-select {
    width: 72%;
    margin-left: 13px;
  }
}
.center-top {
  margin-left: 90px;
  span {
    vertical-align: middle;
    font-size: 14px;
    font-weight: 800;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
  }
  .el-input {
    width: 81%;
  }
}
</style>
