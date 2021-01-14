<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
      </div>
      <el-tabs v-model="loginType" @tab-click="handleClick">
        <el-tab-pane label="账户密码登录" name="byPwd">
          <el-form-item v-if="loginType === 'byPwd'" prop="userNameOrPhone">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="userNameOrPhone"
              v-model="loginForm.userNameOrPhone"
              placeholder="请输入账号名/手机号"
              name="userNameOrPhone"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item v-if="loginType === 'byPwd'" prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;height:45px;" @click.native.prevent="handleLogin">
            {{ $t('login.logIn') }}
          </el-button>

          <!-- 用户协议 -->
          <div style="margin-bottom:10px;margin-top:-10px;margin-left:0px;font-size:14px;">
            <el-checkbox v-model="checked">
              <div style="color:#eee;">我已阅读并同意</div>
            </el-checkbox>
            <span style="color:#eee;font-size:14px;text-decoration: underline;cursor:pointer;margin-left:10px;" @click="show_userline">《用户使用协议》</span>
            <div style="float:right;color:#eee;font-size:14px;text-decoration: underline;cursor:pointer;" @click="showResetPaw">忘记密码</div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="短信验证码登录" class="tabcolor" name="byCode">
          <el-form-item v-if="loginType === 'byCode'" prop="phone">
            <span class="svg-container">
              <i class="el-icon-phone" />
              <!-- <svg-icon icon-class="phone" /> -->
            </span>
            <el-input
              ref="phone"
              v-model="loginForm.phone"
              placeholder="请输入手机号"
              name="phone"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-row :gutter="24">
              <el-col :span="16">
                <el-form-item v-if="loginType === 'byCode'" prop="smsCode">
                  <el-input
                    ref="smsCode"
                    v-model="loginForm.smsCode"
                    placeholder="请输入验证码"
                    type="text"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button style="width:100%;height:47px;" type="primary" :disabled="smsCodeMessege != '点击发送验证码'" @click.native.prevent="sendSmsCode">{{ smsCodeMessege }}</el-button>
              </el-col>
            </el-row>
          </el-tooltip>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;height:45px;" @click.native.prevent="handleLogin">
            {{ $t('login.logIn') }}
          </el-button>
          <!-- 用户协议 -->
          <div style="margin-bottom:10px;margin-top:-10px;margin-left:0px;font-size:14px;">
            <el-checkbox v-model="checked">
              <div style="color:#eee;">我已阅读并同意</div>
            </el-checkbox>
            <span style="color:#eee;font-size:14px;text-decoration: underline;cursor:pointer;margin-left:10px;" @click="show_userline">《用户使用协议》</span>
            <div style="float:right;color:#eee;font-size:14px;text-decoration: underline;cursor:pointer;" @click="showResetPaw">忘记密码</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <!-- 用户协议内容 -->
    <el-dialog :visible.sync="userAlignVisible">
      <userAlign />
    </el-dialog>
    <!-- 忘记密码 -->
    <div style="text-align:left">
      <el-dialog title="忘记密码" :visible.sync="outerVisible" width="90%" style="margin:0 auto;max-width:500px;">
        <el-dialog
          width="40%"
          title="密码修改成功"
          :show-close="!innerVisible"
          :visible.sync="innerVisible"
          append-to-body
          close="close_forgetPwd"
        >
          <div style="text-align:center;line-height:1.5;">
            <i style="width:100px;height:100px;font-size:70px;color:#409EFF;" class="el-icon-success" />
            <div>密码修改成功！</div>
            <div>{{ close_time }}秒后自动返回登录页</div>
            <el-button style="margin-top:10px;" type="primary" @click="close_forgetPwd">返回</el-button>
          </div>
        </el-dialog>
        <el-form ref="form" style="width:100%;" label-width="25%">
          <el-form-item label="手机号" class="forget_form_item">
            <el-input v-model="phoneInput" class="forget_pwd_input" placeholder="请输入验证码" />
          </el-form-item>
          <el-form-item label="验证码" class="forget_form_item">
            <el-row :gutter="24" style="display:flex;  justify-content: space-between;">
              <el-col :span="12">
                <el-input v-model="smsCodeInput" class="forget_pwd_input" placeholder="请输入验证码" />
              </el-col>
              <el-col :span="12">
                <el-button style="width:100%;height:47px;" type="primary" :disabled="resetCodeMessege != '点击发送验证码'" @click.native.prevent="sendResetSmsCode">{{ resetCodeMessege }}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="输入密码" class="forget_form_item">
            <el-input v-model="pwdInput" class="forget_pwd_input" style="width: 100%;" type="password" placeholder="输入密码" />
          </el-form-item>
          <el-form-item label="再次输入密码" class="forget_form_item">
            <el-input v-model="pwdInputAgain" class="forget_pwd_input" style="width: 100%;" type="password" placeholder="再次输入密码" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel_fun">取 消</el-button>
          <el-button :loading="loading2" type="primary" @click="confirm_fun">确 认</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="hm-bottom">
      <a href="https://www.beianx.cn/info/462EFBD4-A083-4319-BBF5-B9C08CA19137.html">沪ICP备18005170号</a>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import userAlign from './components/userAlign.vue'
import { resetPwd, sendVerifyCode2 } from '@/api/user'
import { decrypt } from '@/utils/auth'
import { validPwd } from '@/utils/validate'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    userAlign
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (this.loginType === 'byPwd') {
        if (value.length === 0) {
          callback(new Error('请输入账号名/手机号'))
        } else if (value.length > 15) {
          callback(new Error('请输入正确的账号名/手机号'))
        } else {
          callback()
        }
      } else { // by code
        if (value.length === 0) {
          callback(new Error('请输入手机号'))
        } else if (value.length !== 11) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (this.loginType === 'byPwd') {
        if (value.length === 0) {
          callback(new Error('请输入密码'))
        } else if (value.length < 6 || value.length > 18) {
          callback(new Error('请输入正确的密码'))
        } else {
          callback()
        }
      } else { // by code
        if (value.length === 0) {
          callback(new Error('请输入验证码'))
        } else if (value.length !== 6) {
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      }
    }
    return {
      timer: 0, // 倒计时
      close_time: 5, // 多少秒关闭
      smsCodeInput: '',
      pwdInput: '',
      pwdInputAgain: '',
      phoneInput: '',
      userAlignVisible: false,
      outerVisible: false, // 忘记密码浮层
      innerVisible: false,
      checked: false, // 用户协议勾选
      smsCodeMessege: '点击发送验证码',
      resetCodeMessege: '点击发送验证码',
      isSendingSmsCode: 0,
      isSendingResetSmsCode: 0, // 重置密码的验证码
      smsCode: '',
      loginType: 'byPwd',
      loginForm: {
        userNameOrPhone: '',
        password: '',
        phone: '',
        smsCode: ''
      },
      loginRules: {
        userNameOrPhone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        smsCode: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      loading2: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    this.erasureUserInfo()
    localStorage.removeItem('tag')
  },
  mounted() {
    this.$refs.userNameOrPhone.focus()
    // if (this.loginForm.username === '') {
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
  },
  destroyed() {
  },
  methods: {
    ...mapActions('user', ['erasureUserInfo']),

    // 发送登录手机验证码
    sendSmsCode() {
      // 验证手机号
      if (!(/^1[3456789]\d{9}$/.test(this.loginForm.phone))) {
        return this.$message('请填写正确手机号!')
      }
      if (this.isSendingSmsCode > 0) return

      // 发送验证码
      const _this = this
      sendVerifyCode2({ phone: this.loginForm.phone, type: 1 }).then((e) => {
        _this.isSendingSmsCode = 60
        _this.smsCodeMessege = _this.isSendingSmsCode + 's后可重发'
        const timer = setInterval(function() {
          _this.isSendingSmsCode = Number(_this.isSendingSmsCode) - 1
          _this.smsCodeMessege = _this.isSendingSmsCode + 's后可重发'
          if (_this.isSendingSmsCode <= 0) {
            clearInterval(timer)
            _this.smsCodeMessege = '点击发送验证码'
          }
        }, 1000)
      })
    },
    // 重置密码时，发送验证码
    sendResetSmsCode() {
      // 验证手机号
      if (!(/^1[3456789]\d{9}$/.test(this.phoneInput))) {
        return this.$message('请填写正确手机号!')
      }
      if (this.isSendingResetSmsCode > 0) return
      const _this = this
      sendVerifyCode2({ phone: this.phoneInput, type: 1 }).then((e) => {
        _this.isSendingResetSmsCode = 60
        // 成功发送验证码
        _this.resetCodeMessege = _this.isSendingResetSmsCode + 's后可重发'
        const timer = setInterval(function() {
          _this.isSendingResetSmsCode = Number(_this.isSendingResetSmsCode) - 1
          _this.resetCodeMessege = _this.isSendingResetSmsCode + 's后可重发'
          if (_this.isSendingResetSmsCode <= 0) {
            clearInterval(timer)
            _this.resetCodeMessege = '点击发送验证码'
          }
        }, 1000)
      })
    },
    handleClick(tab, event) {
      // console.log(this.loginType);
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      if (!this.checked) {
        return this.$message({
          showClose: true,
          message: '请先勾选我已阅读并同意《用户使用协议》',
          duration: 2000
        })
      }

      this.$refs.loginForm.validate(valid => {
        // console.log('MMHH', this.loginForm.password, decrypt(this.loginForm.password))
        if (valid) {
          this.loading = true
          if (this.loginType === 'byCode') {
            this.$store.dispatch('user/loginBySmscode', this.loginForm)
              .then(() => {
                // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.$router.push({ path: '/' })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            this.$store.dispatch('user/login', {
              userNameOrPhone: this.loginForm.userNameOrPhone,
              password: decrypt(this.loginForm.password)
            })
              .then(() => {
                // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.$router.push({ path: '/' })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          }
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 显示用户使用协议
    show_userline() {
      this.userAlignVisible = true
      // this.$alert('用户协议', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //   }
      // })
    },
    // 显示忘记密码
    showResetPaw() {
      this.outerVisible = true
    },
    cancel_fun() {
      this.outerVisible = false
      this.innerVisible = false
      this.phoneInput = ''
      this.smsCodeInput = ''
      this.pwdInput = ''
      this.pwdInputAgain = ''
    },
    confirm_fun() {
      // 确认按钮
      if (this.phoneInput.length === 0) {
        return this.$message.error('请输入手机号')
      }
      if (!(/^1[3456789]\d{9}$/.test(this.phoneInput))) {
        return this.$message.error('请输入正确的手机号')
      }
      if (this.smsCodeInput.length === 0) {
        return this.$message.error('请输入验证码')
      }
      if (this.smsCodeInput.length !== 6) {
        return this.$message.error('请输入正确的验证码')
      }
      if (this.pwdInput.length === 0) {
        return this.$message.error('请输入密码')
      }
      if (this.pwdInput.length < 6 || this.pwdInput.length > 18) {
        return this.$message.error('密码必须为6-18个字符')
      }
      if (!validPwd(this.pwdInput)) {
        return this.$message.error('密码必须包括大写字母、小写字母、数字、特殊符号')
      }
      if (this.pwdInput !== this.pwdInputAgain) {
        return this.$message.error('两次密码输入不一致')
      }
      const _this = this
      _this.loading2 = true
      const decryptPwd = decrypt(this.pwdInput)
      // 开始发送请求
      resetPwd({
        'code': this.smsCodeInput,
        'confirmNewPwd': decryptPwd,
        'newPassword': decryptPwd,
        'phone': this.phoneInput
      }).then((e) => {
        _this.loading2 = false
        if (e.code === 200) {
          _this.innerVisible = true
          _this.close_time = 5
          _this.timer = setInterval(function() {
            _this.close_time = _this.close_time - 1
            if (_this.close_time <= 0) {
              _this.cancel_fun()
              clearInterval(_this.timer)
            }
          }, 1000)
        } else {
          return this.$message.error(e.message)
        }
      }).catch((e) => {
        _this.loading2 = false
        // return this.$message(e.message)
      })
    },
    close_forgetPwd() {
      this.cancel_fun()
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="less" scope>
/* 修复input 背景不协调 和光标变色 */
@bg:#283443;
@light_gray:#fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-form-item__label {
    line-height: 46px;
    white-space: nowrap;
  }
  .el-tabs__item.is-active{
    color: #1890ff !important;
  }
  .el-tabs__item{
    color: #999;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      caret-color: @cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }
  .forget_form_item{
    // display: flex;
    // align-items: center;
    // justify-content: flex-start;
    margin-left: 0;
  }
  .forget_pwd_input {
    input{
      color: black !important;
    }
    display: inline-block;
    height: auto !important;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="less" scoped>
@bg:#2d3a4b;
@dark_gray:#889aa4;
@light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.hm-bottom {
  a{
    font-size: 12px;
  }
    vertical-align: middle;
    padding-top: 13px;
    text-align: center;
    position: absolute;
    bottom: 0px;
    color: #fbfbfb;
    width: 100%;
    height: 44px;
  }
</style>
