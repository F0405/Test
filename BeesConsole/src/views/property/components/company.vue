<template>
  <div class="from">
    <div class="from-top">
      <p><i class="el-icon-document" style="color: #00D7B5" />创建单位</p>
      <span class="el-icon-close" @click="handleRemove" />
    </div>
    <el-form
      ref="companyForm"
      :model="companyForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="单位名称："
        prop="name"
        :rules="[{ required: true, message: '单位名称不能为空' }]"
        placeholder="请输入单位名称"
      >
        <el-input
          v-model.number="companyForm.name"
          type="name"
          autocomplete="off"
          style="mairgin-left: 100px"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="el-icon-s-order"
          @click="submitForm(companyForm)"
        >确认创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      companyForm: {
        name: '' // 单位名称
      }
    }
  },
  methods: {
    submitForm(row) {
      if (row.name && row.name !== ' ') {
        request({
          url: 'http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/units',
          data: { name: row.name },
          method: 'POST'
        }).then(resp => {
          console.log(resp)
          if (resp.code === 0) {
            this.$parent.flag = false
            this.$parent.getList()
            this.companyForm.name = ' '
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.error('请输入单位名称')
      }
    },
    handleRemove() {
      this.$parent.flag = false
      this.companyForm.name = ' '
    }
  }
}
</script>

<style lang='less' scoped>
.from {
  position: absolute;
  width: 500px;
  height: 350px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 1px solid #ccc;
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
}
.center {
  p {
    font-size: 14px;
    color: #333;
    margin-left: 80px;
  }
  .el-select {
    width: 72%;
    margin-left: 10px;
  }
}
</style>
