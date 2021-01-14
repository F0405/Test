<template>
  <div class="mask">
    <div class="from">
      <div class="from-top">
        <p><i class="el-icon-document" style="color: #00d7b5" />创建品牌</p>
        <span class="el-icon-close" @click="handleRemove" />
      </div>
      <el-form
        ref="brandForm"
        :rules="rules"
        :model="brandForm"
        label-width="150px"
      >
        <el-form-item label="商品名称:" prop="name">
          <el-input v-model="brandForm.name" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit(brandForm)"
          >立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      brandForm: {
        name: '' // 品牌名称
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit(row) {
      if (row.name && row.name !== ' ') {
        request({
          url: `http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/products-service/products/brands`,
          data: { name: row.name },
          method: 'POST'
        })
          .then((resp) => {
            console.log(resp)
            if (resp.code === 0) {
              this.$parent.flag = false
              this.$parent.getpropertyList()
              this.brandForm.name = ' '
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message.error('请输入商品名称')
      }
    },
    // 点击X号删除
    handleRemove() {
      this.$parent.flag = false
      this.brandForm.name = ' '
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
</style>
