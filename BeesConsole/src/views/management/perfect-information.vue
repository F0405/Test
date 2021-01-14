   <!-- 完善信息 -->
<template>
  <div class="app-container">
    <b>预填经销商信息</b><span
      class="at"
    >请仔细核对一下预填信息，若有错误请联系ABI运营人员修改</span>
    <!-- 预填经销商信息 -->
    <div class="app-container-header">
      <div class="app-container-header-left">
        <p>主户头名称：<span>泉州瑞福祥</span></p>
        <p>经销商编码：<span>WS01312312</span></p>
        <p>付款方编码：<span>30201</span></p>
        <p>付款名称：<span>WS0001</span></p>
      </div>
      <div class="app-container-header-right">
        <p>
          销售组织架构：<span>东南区</span><span>东南区</span><span>东南区</span>
        </p>
        <p>
          地理区域：<span>福建省</span><span>福建省</span><span>福建省</span>
        </p>
        <p>经销商类型：<span>一批</span></p>
      </div>
    </div>
    <b>完善经销商信息</b>
    <!-- 完善经销商信息 -->
    <div class="app-container-content">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="app-container-content-left">
          <el-form-item
            label="账户关联手机号："
            prop="phone"
            label-width="142px"
          >
            <el-input
              v-model="ruleForm.phone"
              style="width: 300px"
              placeholder="请输入手机号"
            />
          </el-form-item>
          <el-form-item label="短信验证码：" prop="page" label-width="142px">
            <el-input v-model="ruleForm.page" style="width: 210px" />
            <span class="page" @click="page">发送验证码</span>
          </el-form-item>
          <el-button class="qd" @click="open2">确定</el-button>
          <el-form-item
            label="营业执照代码："
            prop="business"
            label-width="142px"
          >
            <el-input
              v-model="ruleForm.business"
              placeholder="请统一社会信用代码"
              style="width: 300px"
            />
          </el-form-item>
        </div>
        <div class="app-container-content-right">
          <el-form-item label="收款账号银行：" prop="bank" label-width="200px">
            <el-input
              v-model="ruleForm.bank"
              style="width: 300px"
              placeholder="请输入收款账户银行"
            />
          </el-form-item>
          <el-form-item
            label="收款账号信息："
            prop="information"
            label-width="200px"
          >
            <el-input
              v-model="ruleForm.information"
              style="width: 300px"
              placeholder="请输入收款账号信息"
            />
          </el-form-item>
          <el-form-item label="是否有ERP系统：" prop="erp" label-width="200px">
            <el-radio v-model="ruleForm.radio" label="1">是</el-radio>
            <el-radio v-model="ruleForm.radio" label="2">否</el-radio>
          </el-form-item>
          <el-form-item
            label="ERP系统名称和版本号："
            prop="erpinput"
            label-width="200px"
            placeholder="请输入ERP系统名称和版本号"
          >
            <el-input
              v-model="ruleForm.erpinput"
              style="width: 300px"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <b>店铺信息</b>
    <!-- 店铺信息 -->
    <div class="app-container-shop">
      <el-form
        ref="ruleForm"
        :model="ruleForms"
        :rules="ruless"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="店铺编码：" prop="page" label-width="138px">
          <el-input v-model="ruleForms.page" style="width: 300px" />
        </el-form-item>
        <el-form-item label="店铺名称：" prop="name" label-width="138px">
          <el-input
            v-model="ruleForms.name"
            style="width: 300px"
            placeholder="请输入店铺名称"
          />
        </el-form-item>
        <el-form-item
          label="店铺简介："
          prop="Introduction"
          label-width="138px"
        >
          <el-input
            v-model="ruleForms.Introduction"
            placeholder="请输入店铺简介"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="店铺Logo：" prop="logo" label-width="138px">
          <el-upload
            action="http://bees-console.cf56d21c1bce44dcca3b04d4823848fe4.cn-shanghai.alicontainer.com/basic-service/basic-service/file-upload-oss"
            list-type="picture-card"
            name="uploadFile"
            :auto-upload="true"
            :file-list="ruleForms.fileList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog>
            <img width="100%" :src="ruleForms.dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
    <!-- 确认取消按钮 -->
    <div class="app-container-footer">
      <div />
      <div class="btn">
        <el-button @click="submit(ruleForm,ruleForms)">提交</el-button>
      </div>
    </div>
    <!-- 提交弹框 -->
    <el-dialog
      :visible.sync="dialogFormVisible"
      width="40%"
      :close-on-click-modal="false"
    >
      <div class="centent">
        <p class="complete">您已经完成信息完善,可以开始使用工作台了!</p>
        <el-button @click="dialogFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      dialogFormVisible: false, // 弹框
      // 完善经销商信息表单
      ruleForm: {
        phone: '',
        page: 123,
        business: '',
        bank: '',
        erp: '',
        radio: 1,
        erpinput: ''
      },
      // 店铺信息表单
      ruleForms: {
        page: '',
        name: '',
        Introduction: '',
        logo: '',
        fileList: [{ name: '1.png', url: 'https://icweiliimg6.pstatp.com/weili/l/906739468226003037.webp' }]
      },
      // 完善经销商信息规则
      rules: {
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        page: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ],
        business: [
          { required: true, message: '请输入营业执照代码', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入收款账户银行', trigger: 'blur' }
        ],
        information: [
          { required: true, message: '请输入收款账号信息', trigger: 'blur' }
        ],
        erp: [{ required: true, message: '请选择是否', trigger: 'change' }]
      },
      // 店铺信息规则
      ruless: {
        page: [{ required: true, message: '请输入店铺编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        logo: [{ required: true, message: '请上传图片', trigger: 'change' }]
      }
    }
  },
  methods: {
    ...mapActions('account', [
      'managementinformation'
    ]),
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file)
      this.ruleForms.logo = file.url
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(file) {
      console.log(file)
    },
    // 提交
    submit(ruleForm, ruleForms) {
      console.log(ruleForm, ruleForms)
      this.managementinformation({
        wsTelephoneNum: ruleForm.phone,
        wsBusinessLicenseCode: ruleForm.business,
        wsBankName: ruleForm.bank,
        wsBankAccountNum: ruleForm.information,
        hasERP: ruleForm.radio,
        ERPInfo: ruleForm.erpinput,
        store: {
          storeCode: ruleForms.page,
          storeName: ruleForms.name,
          storeDetails: ruleForms.Introduction,
          storeLogoUrl: ruleForms.logo
        }
      })
      this.dialogFormVisible = true
    },
    // 发送验证码
    page() {
      console.log(1)
    },
    // 验证
    open2() {
      if (this.ruleForm.page === 123) {
        this.$message({
          showClose: true,
          message: '手机号验证成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '手机号验证失败',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.at {
  font-size: 14px;
  margin-top: 50px;
  color: #ccc;
  margin-top: 10px;
}
.app-container-header {
  width: 85%;
  margin: 10px auto;
  display: flex;
  .app-container-header-left {
    width: 40%;
  }
}
.app-container-content {
  width: 86%;
  margin: 20px auto;
  .el-form {
    display: flex;
  }
  .page {
    color: skyblue;
    margin-left: 14px;
  }
  .qd {
    margin-bottom: 15px;
    margin-left: 360px;
  }
  .app-container-content-right {
    margin-left: 100px;
  }
}
.app-container-shop {
  width: 85.5%;
  margin: 20px auto;
}
.app-container-footer {
  display: flex;
  div {
    width: 70%;
  }
  .btn {
    width: 30%;
    flex: 1;
  }
}
.centent {
  width: 80%;
  margin: 0 auto;
  .complete {
    font-size: 25px;
  }
  .ms {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
  }
  .el-button {
    margin-left: 250px;
  }
}
</style>
