    <!-- ABI运营账户设置 WS运营账户设置 -->
<template>
  <div class="app-container">
    {{ $route.query.k==='mh' ? userInfo : '' }}
    <div v-if="!isWsComplete" class="app-container-header">
      <b>账号基础信息</b>
      <div class="message">
        <div class="message-left">
          <span style="margin-right: 32px;">用户名：</span>
          <span class="number">{{ userInfo.userName }}</span>
        </div>
        <div class="message-right">
          <el-button type="text" @click="pwd">修改密码</el-button>
        </div>
      </div>
      <div class="message">
        <div class="message-left">
          <span>关联手机号：</span>
          <span class="number">{{ userInfo.phone }}</span>
        </div>
        <div class="message-right">
          <el-button type="text" @click="showModifyPhone">修改手机号</el-button>
        </div>
      </div>
    </div>
    <!-- ABI员工信息 -->
    <div v-if="roleId === '1'" style="margin-top: 32px;">
      <b>ABI员工信息</b>
      <div class="app-container-content">
        <div class="app-container-content-left">
          <p>员工：<span>{{ userInfo.realName }}</span></p>
          <p>工号：<span>{{ userInfo.empCode }}</span></p>
          <p>邮箱：<span>{{ userInfo.email }}</span></p>
        </div>
        <div class="app-container-content-right">
          <p>请核对员工信息，若需修改请联系Solutions Bees管理员</p>
          <p>联系人：<span>吴钧浩</span></p>
          <p>邮箱：<span>anthony.ng@budweiserapac.com</span></p>
        </div>
      </div>
    </div>
    <div v-else-if="roleId === '2'">
      <div class="message-content">
        <b>经销商信息</b>
        <div :class=" isWsComplete ? 'message-content-content' : 'message-content-content-b'">
          <div class="message-content-left">
            <p>主户头名称：<span>{{ userInfo.mainAccountName }}</span></p>
            <p>经销商编码：<span>{{ userInfo.wholesalerCode }}</span></p>
            <p>付款方编码：<span>{{ userInfo.payerCode }}</span></p>
            <p>付款方名称：<span>{{ userInfo.payerName }}</span></p>
          </div>
          <div class="message-content-right">
            <p>
              销售组织架构：<span>{{ regionMap[userInfo.organizeBuId] }} </span>
              <span>{{ regionMap[userInfo.organizeRegionId] }} </span>
              <span>{{ regionMap[userInfo.organizeAreaId] }} </span>
              <span>{{ regionMap[userInfo.organizeTerritoryId] }}</span>
            </p>
            <p>
              地理区域：<span>{{ areaMap[userInfo.wholesalerProvinceId] }} </span>
              <span>{{ areaMap[userInfo.wholesalerCityId] }} </span>
              <span>{{ areaMap[userInfo.wholesalerAreaId] }} </span>
            </p>
            <p>经销商类型：<span>{{ wsTypeMap[userInfo.wholesalerType] }}</span></p>
            <p>经销商商户号：<span>{{ userInfo.wholesalerMerchantCode }}</span></p>
            <p v-if="!isWsComplete" class="ms">以上为ABI预填信息，若需修改请联系ABI运营人员</p>
          </div>
        </div>
      </div>
      <div style="margin-top: 32px;">
        <b>完善经销商信息</b>
      </div>
      <div class="message-coutentt">
        <el-form
          ref="wsExtraInfoRef"
          :model="wsExtraInfo"
          :rules="wsExtraInfoRules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="message-contentt-left">
            <div v-if="isProfile">
              <el-form-item
                label="账户关联手机号："
                prop="wsTelephoneNum"
                label-width="140px"
              >
                <el-input v-model="wsExtraInfo.wsTelephoneNum" :disabled="verfityCode" style="width: 300px" />
              </el-form-item>
              <el-form-item
                label="短信验证码："
                prop="vcode"
                label-width="140px"
              >
                <el-input v-model="wsExtraInfo.vcode" :disabled="verfityCode" style="width: 170px" />
                <el-button class="code" :loading="sending" :disabled="sendCodeSecond !== 60" @click="onSendVertifyCode(wsExtraInfo.wsTelephoneNum)">{{ sendCodeSecond === 60 ? '发送验证码' : resendText }}</el-button>
              </el-form-item>
            </div>
            <!-- <div style="padding-bottom: 16px;width: 100%;">
              <el-button type="primary" style="margin-left: 370px;" @click="lockPhone()">确定</el-button>
            </div> -->

            <el-form-item label="营业执照代码：" prop="wsBusinessLicenseCode" label-width="140px">
              <el-input v-model="wsExtraInfo.wsBusinessLicenseCode" style="width: 300px" />
            </el-form-item>
            <el-form-item label="收款账号银行：" prop="wsBankName" label-width="140px">
              <el-input v-model="wsExtraInfo.wsBankName" style="width: 300px" />
            </el-form-item>
            <el-form-item label="收款账号信息：" prop="wsBankAccountNum" label-width="140px">
              <el-input v-model="wsExtraInfo.wsBankAccountNum" style="width: 300px" />
            </el-form-item>
          </div>
          <div class="message-contentt-right">
            <el-form-item
              label="是否有ERP系统："
              prop="hasERP"
              label-width="200px"
              class="radio"
            >
              <el-radio v-model="wsExtraInfo.hasERP" :label="1">是</el-radio>
              <el-radio v-model="wsExtraInfo.hasERP" :label="0">否</el-radio>
            </el-form-item>
            <el-form-item
              v-if="wsExtraInfo.hasERP === 1"
              label="ERP系统名称和版本号："
              prop="erpinfo"
              label-width="200px"
            >
              <el-input v-model="wsExtraInfo.erpinfo" style="width: 300px" />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <b>店铺信息</b>
      <div class="shop">
        <el-form
          ref="wsExtraInfoStoreRef"
          :model="wsExtraInfo.store"
          :rules="wsExtraInfoStoreRules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="店铺编码：" prop="storeCode" label-width="132px">
            <el-input v-model="wsExtraInfo.store.storeCode" disabled placeholder="系统自动生成" style="width: 300px" />
          </el-form-item>
          <el-form-item label="店铺名称：" prop="storeName" label-width="130px">
            <el-input v-model="wsExtraInfo.store.storeName" style="width: 300px" />
          </el-form-item>
          <el-form-item
            label="店铺简介："
            prop="Introduction"
            label-width="130px"
          >
            <el-input v-model="wsExtraInfo.store.storeDetails" style="width: 300px" />
          </el-form-item>
          <el-form-item label="店铺Logo：" prop="logos" label-width="130px">
            <imgUpload
              v-model="logos"
              :show-delete="true"
              style="padding-left: 0px"
              name="uploadFile"
              :auto-upload="true"
              :limit="1 "
            />
          </el-form-item>
        </el-form>
      </div>
      <!-- 确认取消按钮 -->
      <div class="app-container-footer">
        <div />
        <div class="btn">
          <el-button v-if="!isProfile" @click="onBackCompleteWs">取消</el-button>
          <el-button @click="onCompleteWsInfo(wsExtraInfo)">{{ !isProfile ? '确定' : '提交' }}</el-button>
        </div>
      </div>
    </div>

    <!-- 修改密码手机号弹框 -->
    <el-dialog
      :title="flagg ? '修改密码' : '修改手机号'"
      :visible.sync="dialogFormVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form v-if="flagg" :model="form">
        <el-form-item label="原密码：" :label-width="formLabelWidth">
          <el-input
            v-model="form.originPwd"
            show-password
            autocomplete="off"
            style="width: 300px"
          />
        </el-form-item>

        <el-form-item label="新密码：" :label-width="formLabelWidth">
          <el-input
            v-model="form.newPwd"
            show-password
            autocomplete="off"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="确认新密码：" :label-width="formLabelWidth">
          <el-input
            v-model="form.confirmPwd"
            show-password
            autocomplete="off"
            style="width: 300px"
          />
        </el-form-item>
      </el-form>
      <el-form v-if="!flagg" :model="form">
        <el-form-item label="新手机号：" :label-width="formLabelWidth">
          <el-input v-model="form.phone" style="width: 62%;" autocomplete="off" />
        </el-form-item>

        <el-form-item label="验证码：" label-width="120px">
          <el-input
            v-model="form.code"
            autocomplete="off"
            style="width: 100px"
          />
          <el-button class="code" :loading="sending" :disabled="sendCodeSecond !== 60" @click="onSendVertifyCode(form.phone)">{{ sendCodeSecond === 60 ? '发送验证码' : resendText }}</el-button>
        </el-form-item>
      </el-form>
      <!-- 取消确定 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="onHidenDialog">取 消</el-button>
        <el-button type="primary" @click="onModifyPwdOrPhone(form)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 密码修改手机号修改 -->
    <el-dialog
      :visible.sync="dialogFormVisiblet"
      width="20%"
      :close-on-click-modal="false"
    >
      <div class="centent">
        <p v-show="flagg">密码修改成功</p>
        <p v-show="flagg" style="height:30px">{{ time }}秒自动返回</p>
        <p v-show="!flagg">手机号修改成功</p>
        <p v-show="!flagg" style="height:30px">{{ timet }}秒自动返回</p>
        <el-button @click="onHidenDialog">返回</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogCompleteFormVisible"
      width="20%"
      :close-on-click-modal="false"
    >
      <div class="centent">
        <p>{{ isProfile ? '您已完成信息完善，可以开始使用工作台了！' : '您已完成信息更新，可以开始使用工作台了！' }}</p>
        <p style="height:30px">{{ time }}秒自动返回</p>
        <el-button @click="onBackCompleteWs()">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import jsCookie from 'js-cookie'
import { validPwd } from '@/utils/validate'
import _ from 'lodash'

import { checkSMS, completWsInfo, putWsInfo } from '@/api/user'
import imgUpload from '@/components/imgUpload/imgUpload'
import { decrypt } from '@/utils/auth'

const wsExtraInfoRules = {
  wsTelephoneNum: [{ required: true, message: '请输入账户关联手机号', trigger: 'blur' }],
  vcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  hasERP: [{ required: true, message: '请选择erp信息', trigger: 'blur' }],
  erpinfo: [{ required: true, message: '请输入erp系统名称和版本号', trigger: 'blur' }],
  wsBusinessLicenseCode: [{ required: true, message: '请输入营业执照代码', trigger: 'blur' }],
  wsBankName: [{ required: true, message: '请输入收款账号银行', trigger: 'blur' }],
  wsBankAccountNum: [{ required: true, message: '请输入收款账号信息', trigger: 'blur' }]
}
// const wsExtraInfoStoreRules = {
//   // storeCode: [{ required: true, message: '请输入店铺编码', trigger: 'blur' }],
//   storeName: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
//   logos: [{ required: true, message: '请上传店铺Logo', trigger: 'blur' }]
// }

export default {
  components: {
    imgUpload
  },
  data() {
    const validLogo = (rule, value, callback) => {
      if (this.logos.length > 0) {
        callback()
      } else {
        callback(new Error('请上传店铺Logo'))
      }
    }
    return {
      logos: [],
      wsExtraInfoRules,
      wsExtraInfoStoreRules: {
        storeName: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        logos: [{ required: true, trigger: 'blur', validator: validLogo }]
      },
      verfityCode: false,
      employeesinfo: {
        realName: '',
        abiEmpNo: '',
        email: ''
      },
      // 状态
      status: 1,
      time: 5,
      timet: 5,
      sendCodeSecond: 60,
      sending: false,
      // 上传图片
      img: {
        dialogImageUrl: '',
        dialogVisible: false
      },
      dialogFormVisible: false, // 修改密码弹框
      dialogFormVisiblet: false,
      dialogCompleteFormVisible: false,
      flagg: false,
      val: '',
      val1: '',
      form: {
        originPwd: '',
        newPwd: '',
        confirmPwd: '',
        phone: '',
        code: '',
        region: ''
      },
      formLabelWidth: '120px',
      flag: false,
      // 经销商表单
      ruleForm: {
        name: '',
        gathering: '',
        information: '',
        erp: '',
        radio: '1',
        erpinput: ''
      },
      // 店铺信息表单
      ruleForms: {
        page: '',
        name: '',
        Introduction: '',
        logo: ''
      },
      // 店铺信息规则
      ruless: {
        page: [{ required: true, message: '请输入店铺编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        logo: [{ required: true, message: '请上传图片', trigger: 'change' }]
      },
      // 经销商表单验证
      rules: {
        name: [
          { required: true, message: '请输入营业执照代码', trigger: 'blur' }
        ],
        gathering: [
          { required: true, message: '请输入账号银行', trigger: 'blur' }
        ],
        information: [
          { required: true, message: '请输入收款账号信息', trigger: 'blur' }
        ],
        erp: [{ required: true, message: '请选择是否', trigger: 'change' }]
      },
      wsExtraInfo: {
        erpinfo: undefined,
        hasERP: 1,
        id: undefined,
        store: {
          storeCode: '',
          storeDetails: '',
          storeLogoUrl: undefined,
          // logos: [],
          storeName: ''
        },
        wsBusinessLicenseCode: undefined,
        wsTelephoneNum: undefined,
        vcode: undefined,
        wsBankAccountNum: undefined,
        wsBankName: undefined
      }
    }
  },
  computed: {
    isProfile() {
      return this.$route.path !== '/account/setting'
    },
    token() {
      return jsCookie.get('AuthenToken')
    },
    resendText() {
      return this.sendCodeSecond + 's后可重发'
    },
    isWsComplete() {
      return this.$route.path === '/account/complete'
    },
    ...mapState('account', ['managementemployeesInfo']),
    ...mapGetters('user', ['roleId', 'userInfo']),
    ...mapGetters('structure', ['areaMap', 'regionMap', 'wsTypeMap'])
  },
  mounted() {
  },
  created() {
    if (this.roleId === '1') {
      this.getABIInfo()
    } else if (this.roleId === '2' && !this.isProfile) {
      this.ployess()
    }
  },
  methods: {
    ...mapActions('account', ['modifyPhone', 'modifyPwd', 'sendVerifyCode', 'managementemployees', 'getWsInfo']),
    ...mapActions('user', ['getABIInfo', 'updateUserinfo']),
    // 经销商未激活时，完善信息
    onCompleteWsInfo(ws) {
      // return
      if (this.logos.length) {
        this.wsExtraInfo.store.storeLogoUrl = this.logos[0]
      } else {
        this.wsExtraInfo.store.storeLogoUrl = undefined
      }
      if (ws.store.storeDetails.length > 30) {
        return this.$message.error('店铺简介不超过30个字符')
      }
      if (ws.store.storeName.length > 15) {
        return this.$message.error('店铺名称不超过15个字符')
      }

      ws.id = parseInt(this.userInfo.wsId)
      const copyWs = _.cloneDeep(ws)
      // copyWs.store.logos = undefined
      this.$refs.wsExtraInfoRef.validate(vaild => {
        if (vaild) {
          if (!this.wsExtraInfo.hasERP) {
            this.wsExtraInfo.erpinfo = ''
          }
          this.$refs.wsExtraInfoStoreRef.validate(vaild2 => {
            if (vaild2) {
              if (this.isProfile) {
                completWsInfo(copyWs).then(res => {
                  this.dialogCompleteFormVisible = true
                  const interval = setInterval(() => {
                    this.time--
                    if (this.time === 0) {
                      clearInterval(interval)
                      this.time = 5
                      this.onBackCompleteWs()
                    }
                  }, 1000)
                }).catch(err => {
                  console.log('MMHH', err)
                })
              } else {
                putWsInfo(copyWs).then(res => {
                  this.dialogCompleteFormVisible = true
                  const interval = setInterval(() => {
                    this.time--
                    if (this.time === 0) {
                      clearInterval(interval)
                      this.time = 5
                      this.onBackCompleteWs()
                    }
                  }, 1000)
                }).catch(err => {
                  console.log('MMHH', err)
                })
              }
            }
          })
        }
      })
    },
    onBackCompleteWs() {
      const uinfo = _.cloneDeep(this.userInfo)
      uinfo.actived = 1
      jsCookie.set('user_actived', 1)
      jsCookie.set('user_info', { consoleUserInfo: uinfo })
      this.dialogCompleteFormVisible = false
      this.$router.replace('/dashboard')
      setTimeout(() => {
        location.reload()
      }, 500)
    },
    lockPhone() {
      checkSMS({ phone: this.wsExtraInfo.wsTelephoneNum, code: this.wsExtraInfo.vcode }).then(res => {
        console.log('MMHH checkSMS', res)
        if (res.code === '001_0000' && res.data === true) {
          this.verfityCode = true
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 修改密码
    pwd() {
      this.flagg = true
      this.dialogFormVisible = true
    },
    initForm() {
      this.form = {
        originPwd: '',
        newPwd: '',
        confirmPwd: '',
        phone: '',
        code: '',
        region: ''
      }
    },
    onHidenDialog() {
      this.initForm()
      this.dialogFormVisible = false
      this.dialogFormVisiblet = false
    },
    // 确认
    onModifyPwdOrPhone(form) {
      console.log('MMHH  onModifyPwdOrPhone ', form.newPwd)
      if (this.flagg === true) {
        if (form.originPwd.length === 0) {
          return this.$message.error('请输入原密码')
        }
        if (form.newPwd.length === 0) {
          return this.$message.error('请输入新密码')
        }
        if (form.confirmPwd.length === 0) {
          return this.$message.error('请再次输入新密码')
        }
        if (form.newPwd.length < 6 || form.newPwd.length > 18) {
          return this.$message.error('密码必须为6-18个字符')
        }
        if (form.newPwd !== form.confirmPwd) {
          return this.$message.error('新密码输入不一致')
        }
        if (!validPwd(form.newPwd)) {
          return this.$message.error('密码必须包括大写字母、小写字母、数字、特殊符号')
        }
        const decryptPwd = decrypt(form.newPwd)
        this.modifyPwd({
          originPwd: decrypt(form.originPwd),
          newPwd: decryptPwd,
          confirmPwd: decryptPwd
        }).then(() => {
          this.dialogFormVisiblet = true
          const interval = setInterval(() => {
            this.time--
            if (this.time === 0) {
              this.this.onHidenDialog()
              clearInterval(interval)
              this.time = 5
            }
          }, 1000)
        })
      } else {
        if (form.phone.length === 0) {
          return this.$message.error('请输入新手机号')
        }
        if (!(/^1[3456789]\d{9}$/.test(form.phone))) {
          return this.$message.error('请输入正确的手机号')
        }
        if (this.form.code.length === 0) {
          return this.$message.error('请输入验证码')
        }
        if (this.form.code.length !== 6) {
          return this.$message.error('请输入正确的验证码')
        }
        this.modifyPhone({
          phone: form.phone,
          code: this.form.code
        }).then(() => {
          this.dialogFormVisiblet = true
          const interval = setInterval(() => {
            this.timet--
            if (this.timet === 0) {
              this.onHidenDialog()
              clearInterval(interval)
              this.timet = 5
            }
          }, 1000)
        }).catch(() => {
        })
      }
    },

    // 发送验证码
    onSendVertifyCode(phone) {
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        return this.$message.error('请填写正确手机号!')
      }
      this.sending = true
      this.sendVerifyCode({
        phone: phone
      }).then(() => {
        this.sending = false
        const interval = setInterval(() => {
          this.sendCodeSecond--
          if (this.sendCodeSecond === 0) {
            clearInterval(interval)
            this.sendCodeSecond = 60
          }
        }, 1000)
      }).catch(() => {
        this.sending = false
      })
    },
    // 修改手机号
    showModifyPhone() {
      this.flagg = false
      this.dialogFormVisible = true
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    ployess() {
      this.getWsInfo({ id: this.userInfo.wsId }).then((data) => {
        Object.assign(this.wsExtraInfo, data)
        if (data && data.store && data.store.storeLogoUrl) {
          this.logos = [data.store.storeLogoUrl]
        }
        // if (data.wholesalerProvinceId && data.wholesalerCityId && data.wholesalerAreaId) {
        //   this.wsModel.areas = [parseInt(data.wholesalerProvinceId), parseInt(data.wholesalerCityId), parseInt(data.wholesalerAreaId)]
        // }
        // if (data.organizeBuId && data.organizeRegionId && data.organizeAreaId && data.organizeTerritoryId) {
        //   this.wsModel.regions = [parseInt(data.organizeBuId), parseInt(data.organizeRegionId), parseInt(data.organizeAreaId), parseInt(data.organizeTerritoryId)]
        // }
      })
      // this.managementemployees()
      // this.employeesinfo.realName = this.managementemployeesInfo.realName
      // this.employeesinfo.abiEmpNo = this.managementemployeesInfo.abiEmpNo
      // this.employeesinfo.email = this.managementemployeesInfo.email
    }
  }

}
</script>

<style scoped lang='less'>
.app-container-header {
  .message {
    display: flex;

    height: 36px;
    margin: 0px auto 0px 110px;
    line-height: 36px;
    .message-left {
      width: 420px;
      span:nth-child(2) {
        margin-left: 0px;
      }
    }
    .message-right {
      height: 36px;
      margin-left: 30px;
      span:nth-child(1) {
        color: skyblue;
      }
    }
  }
}
.time{
  display: inline-block;
  height: 30px;
}
.app-container-content {
  display: flex;
  width: 85%;
  height: 200px;
  margin: 0 auto;

  .app-container-content-left {
    width: 40%;
    p {
      height: 20px;
    }
  }
}
.app-container-footer {
  display: flex;
  div {
    width: 40%;
  }
  .btn {
    width: 30%;
    flex: 1;
  }
}
.message-content-content {
  width: 85%;
  margin: 0 auto;
  display: flex;
  .message-content-left {
    width: 40%;
  }
  .message-content-right {
    width: 60%;
  }
  .ms {
    float: right;
    color: #666666;
    // margin-top: 16px;
    margin-top: 0px;
    margin-bottom: 8px;
    font-size: 12px;
  }
}
.message-content-content-b {
  width: 85%;
  margin: 0 auto;
  display: flex;
  border-bottom: 1px solid;
  border-bottom-color: #cccccc;
  .message-content-left {
    width: 40%;
  }
  .message-content-right {
    width: 60%;
  }
  .ms {
    float: right;
    color: #666666;
    // margin-top: 16px;
    margin-top: 0px;
    margin-bottom: 8px;
    font-size: 12px;
  }
}

.message-coutentt {
  width: 86%;
  margin: 20px auto;
  .el-form {
    display: flex;
  }
  .message-contentt-right {
    margin-left: 100px;
  }
}
.shop {
  width: 85.5%;
  margin: 20px auto;
}
.centent {
    text-align: center;
}
.cs {
  margin-left: 40px;
}
.code {
  margin-left: 20px;
}
.el-radio {
  width: 20%;
}
</style>
