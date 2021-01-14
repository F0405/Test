 <!-- 创建新账号-->
<template>
  <div class="app-container">
    <div class="create-account">
      <el-form ref="wsForm" :model="wsModel" :rules="ruless" label-width="100px">
        <b>账号信息</b>
        <div style="margin-top: 32px;">
          <el-form-item label="设置账号名" prop="wsAccountName" label-width="130px">
            <el-input v-model="wsModel.wsAccountName" :disabled="!!$route.query.id" style="width: 300px" placeholder="请输入账号名" />
          </el-form-item>
          <!-- <el-form-item label="请设置登录密码" prop="password" label-width="130px">
              <el-input v-model="wsModel.password" type="password" placeholder="请输入密码" style="width: 400px" />
            </el-form-item> -->
        </div>
        <div>
          <b>经销商信息</b>
          <div style="margin-top: 32px;">
            <div class="form-left">
              <el-form-item label="主户头名称" prop="mainAccountName" label-width="130px">
                <el-input v-model="wsModel.mainAccountName" style="width: 300px" placeholder="请输入主户头名称" />
              </el-form-item>
              <el-form-item label="经销商编码" prop="wholesalerCode" label-width="130px">
                <el-input v-model="wsModel.wholesalerCode" style="width: 300px" placeholder="请输入经销商编码" />
              </el-form-item>
              <el-form-item label="付款方编码" prop="payerCode" label-width="130px">
                <el-input v-model="wsModel.payerCode" style="width: 300px" placeholder="请输入付款方编码" />
              </el-form-item>
              <el-form-item label="付款方名称" prop="payerName" label-width="130px">
                <el-input v-model="wsModel.payerName" style="width: 300px" placeholder="请输入付款方名称" />
              </el-form-item>
            </div>
            <div class="form-right">
              <el-form-item label="销售组织架构" prop="regions" label-width="130px">
                <el-cascader v-model="wsModel.regions" :options="optionRegion" style="width: 300px" />
              </el-form-item>
              <el-form-item label="地理区域" prop="areas" label-width="130px">
                <el-cascader v-model="wsModel.areas" :options="optionArea" style="width: 300px" />
              </el-form-item>
              <el-form-item label="经销商类型" prop="wholesalerType" label-width="130px">
                <el-select v-model="wsModel.wholesalerType" placeholder="请选择" style="width: 300px">
                  <el-option v-for="item in wsType" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="经销商商户号" prop="wholesalerMerchantCode" label-width="130px">
                <el-input v-model="wsModel.wholesalerMerchantCode" style="width: 300px" placeholder="请输入经销商商户号" />
              </el-form-item>
              <el-form-item label="子商户关联" prop="subAppId" label-width="130px">
                <el-input v-model="wsModel.subAppId" style="width: 300px" placeholder="请输入" />
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="footer-btn">
      <div class="div" />
      <el-button size="medium" type="primary" plain @click="onBack">取消</el-button>
      <el-button size="medium" type="primary" plain @click="onSubmit(wsModel)">提交</el-button>
    </div>
    <!-- 创建成功 -->
    <el-dialog title="账号创建成功" :show-close="false" :close-on-press-escape="false" :visible.sync="exportShow" width="30%" :close-on-click-modal="false" center top="35vh">
      <div class="create">
        <p>账户：{{ wsModel.wsAccountName }}</p>
        <p>密码：{{ wsModel.password || '123456' }}</p>
        <p style="width: 200px">请将账号密码发送给相关人员</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlecopy">复制</el-button>
        <el-button @click="cancel">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      accountflag: '',
      exportShow: false, // 创建弹框
      wsModel: {
        wsAccountName: undefined, // 用户名
        mainAccountName: undefined, // 主户头名称
        wholesalerCode: undefined, // 经销商编号
        payerCode: undefined, // 付款方编号
        payerName: undefined, // 付款方名称
        // 销售组织架构
        regions: [],
        organizeBuId: undefined,
        organizeRegionId: undefined,
        organizeAreaId: undefined,
        organizeTerritoryId: undefined,
        // 地理区域
        areas: [],
        wholesalerProvinceId: undefined,
        wholesalerCityId: undefined,
        wholesalerAreaId: undefined,
        wholesalerType: undefined, // 经销商类型
        wholesalerMerchantCode: undefined, // 经销商商户号
        subAppId: undefined, // 子商户号

        actived: undefined,

        id: undefined,
        password: undefined,
        wsAccountId: undefined // 经销商账户id

      },

      ruless: {
        // password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        wsAccountName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        mainAccountName: [{ required: true, message: '请输入主户头名称', trigger: 'blur' }],
        wholesalerCode: [{ required: true, message: '请输入经销商编码', trigger: 'blur' }],
        payerCode: [{ required: true, message: '请输入付款方编码', trigger: 'blur' }],
        payerName: [{ required: true, message: '请输入付款方名称', trigger: 'blur' }],
        regions: [{ required: true, message: '请选择销售组织架构', trigger: 'blur' }],
        areas: [{ required: true, message: '请选择地理区域', trigger: 'blur' }],
        wholesalerType: [{ required: true, message: '请选择经销商类型', trigger: 'blur' }],
        wholesalerMerchantCode: [{ required: true, message: '请输入经销商商户号', trigger: 'blur' }],
        subAppId: [{ required: true, message: '请输入经销商商户号', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState('account', ['wsInfo']),
    ...mapState('structure', ['wsType']),
    ...mapGetters('structure', ['optionRegion', 'optionArea', ''])
  },
  created() {
    if ((this.$route.query.flag === false || this.$route.query.flag === 'false') && this.$route.query.id) {
      this.getWsInfo({ id: this.$route.query.id }).then((data) => {
        Object.assign(this.wsModel, data)
        if (data.wholesalerProvinceId && data.wholesalerCityId && data.wholesalerAreaId) {
          this.wsModel.areas = [parseInt(data.wholesalerProvinceId), parseInt(data.wholesalerCityId), parseInt(data.wholesalerAreaId)]
        }
        if (data.organizeBuId && data.organizeRegionId && data.organizeAreaId && data.organizeTerritoryId) {
          this.wsModel.regions = [parseInt(data.organizeBuId), parseInt(data.organizeRegionId), parseInt(data.organizeAreaId), parseInt(data.organizeTerritoryId)]
        }
      })
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('account', ['createWs', 'editWs', 'managementredact', 'managementredactt', 'getWsInfo']),
    // 创建
    onSubmit(val) {
      this.$refs.wsForm.validate(vaild => {
        if (vaild) {
          val.wholesalerProvinceId = val.areas[0]
          val.wholesalerCityId = val.areas[1]
          val.wholesalerAreaId = val.areas[2]

          val.organizeBuId = val.regions[0]
          val.organizeRegionId = val.regions[1]
          val.organizeAreaId = val.regions[2]
          val.organizeTerritoryId = val.regions[3]
          console.log('MMHH', this.$route.query.flag, this.$route.query.id)
          if (this.$route.query.flag === 'true' || this.$route.query.flag === true) {
            // create ws account
            this.createWs(val).then(() => {
              this.exportShow = true
            }).catch(() => {
            })
          } else if ((this.$route.query.flag === 'false' || this.$route.query.flag === false) && this.$route.query.id) {
            // edit ws account
            this.editWs(val).then(() => {
              this.$message.success('经销商信息修改成功')
              this.onBack()
            })
          }
        }
      })
    },
    // 取消
    cancel() {
      this.exportShow = false
      this.onBack()
    },
    onBack() {
      this.$router.push('/account/ws')
    },
    // 复制
    handlecopy() {
      this.copy(`用户名：${this.wsModel.wsAccountName}\n 密码：${this.wsModel.password || 123456}`)
      this.$message.success('复制成功了，快去通知吧～')
      this.onBack()
    },
    copy(text) {
      const textareaEl = document.createElement('textarea')
      textareaEl.setAttribute('readonly', 'readonly')
      textareaEl.value = text
      document.body.appendChild(textareaEl)
      textareaEl.select()
      const res = document.execCommand('copy')
      document.body.removeChild(textareaEl)
      console.log('复制成功')
      return res
    }
  }
}
</script>

<style scoped lang="less">

.create-account {
    .form-left {
      width: 40%;
      display: inline-block;
      vertical-align: top;
    }
    .form-right {
      width: 40%;
      display: inline-block;
    }
}
.footer-btn {
  display: flex;
  .div {
    width: 40%;
  }
  flex: 1;
  margin-top: 40px;
}
.create {
  width: 30%;
  margin: 0 auto;
}
.el-dialog__wrapper {
  .el-dialog,
  .el-dialog--center {
    height: 500px;
  }
}
</style>
