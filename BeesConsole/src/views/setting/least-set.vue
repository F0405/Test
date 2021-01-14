<template>
  <div class="app-container">
    <!-- 表单 -->
    <div class="formt">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="城市区县：" prop="region">
          <el-cascader
            v-model="valuet"
            :options="optionRegion"
            :value="valuet"
            :props="{multiple:true}"
            style="width: 200px;vertical-align: top;margin-right: 16px;"
            placeholder="请选择省市区"
            collapse-tags
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="渠道：" prop="channel">
          <el-cascader
            v-model="channelIdd"
            :options="opetionChannel"
            :value="channelIdd"
            :props="{multiple:true}"
            style="width: 200px;vertical-align: top;margin-right: 16px;"
            placeholder="请选择渠道"
            collapse-tags
            @change="handleChangeq"
          />
        </el-form-item>
        <!-- <el-form-item label="子渠道：" prop="region">
          <el-cascader
            v-model="optionRegionId"
            :options="optionArea"
            :value="optionRegionId"
            style="width: 200px;vertical-align: top;margin-right: 16px;"
            placeholder="请选择渠道"
            @change="handleChangez"
          />
        </el-form-item> -->
        <el-form-item label="MOQ:" prop="quantity">
          <el-input v-model="ruleForm.quantity" style="width: 150px" />
          <span class="box">箱</span>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button
          type="primary"
          @click="handleonSubmit"
        >确认</el-button>
        <el-button
          type="primary"
          @click="handlecancel"
        >取消</el-button>
      </div>
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      width="30%"
      center
    >
      <span v-if="rulesflag===false" class="rules">确认创建规则</span>
      <span v-if="rulesflag===true" class="rules">确认编辑规则</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" handlerule">确定</el-button>
        <el-button @click="centerDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      rulesflag: false,
      rulesid: '', // 渠道id
      valuet: [], // 省市区
      optionRegionId: null,
      provincesId: null, // 城市区县
      channelIdd: [], // 渠道
      ruleForm: {
        region: '',
        channel: '',
        quantity: ''
      },
      flag: false, // 编辑开关
      citys: null,
      id: this.$route.query.id,
      centerDialogVisible: false, // 弹框
      rules: {
        region: [{ required: true, message: '请选择省', trigger: 'blur' }],
        channel: [{ required: true, message: '请选择渠道', trigger: 'blur' }],
        quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }]
      },
      subChannelIdsList: [] // 渠道
    }
  },
  computed: {
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'optionRegion'])
  },
  created() {
    this.handledetailInfo()
    this.handleArea()
  },
  methods: {
    // 省市区
    handleChange(value) {
      this.citys = value
      console.log(this.citys, 'city')
    },
    handleChangeq(val) {
      this.subChannelIdsList = val
      console.log(this.subChannelIdsList, 'val')
    },
    handleChangez(val) {
      this.optionRegionId = val
    },
    handledetailInfo() {
      if (!this.$route.query.flag || this.$route.query.flag === 'false') {
        this.flag = true
        request({
          url: `/business-entity-service/order-quantity/${this.id}`,
          data: {
            id: this.$route.query.id
          },
          method: 'GET'
        })
          .then((resp) => {
            if (resp.code === 200) {
              console.log(resp)
              this.ruleForm.quantity = resp.data.quantity
              this.rulesid = resp.data.id
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    handleArea() {
      if (this.flag === true) {
        request({
          url: `/business-entity-service/order-quantity/preview/${this.id}`,
          data: {
            id: this.$route.query.id
          },
          method: 'GET'
        })
          .then((resp) => {
            if (resp.code === 200) {
              const AeaList = resp.data.hierarchyIds
              this.valuet = AeaList
              const channelIddList = resp.data.channelIds
              this.channelIdd = channelIddList
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    // 创建或者编辑
    handleonSubmit() {
      this.centerDialogVisible = true
      if (this.$route.query.flag === false) {
        this.rulesflag = true
      } else {
        this.rulesflag = false
      }
    },
    // 确认创建规则
    handlerule() {
      if (this.$route.query.flag) {
        request({
          url: '/business-entity-service/order-quantity',
          data: {
            quantity: this.ruleForm.quantity,
            hierarchyIds: this.citys,
            channelIds: this.subChannelIdsList
          },
          method: 'POST'
        })
          .then((resp) => {
            if (resp.code === 200) {
              this.centerDialogVisible = false
              this.$router.push('order')
            }
          })
          .catch((err) => {
            this.$message.error(err.response.data.message)
          })
      } else {
        request({
          url: '/business-entity-service/order-quantity',
          data: {
            quantity: this.ruleForm.quantity,
            hierarchyIds: this.valuet,
            channelIds: this.channelIdd,
            id: this.rulesid
          },
          method: 'PUT'
        })
          .then((resp) => {
            if (resp.code === 200) {
              this.centerDialogVisible = false
              this.$router.push('order')
            }
          })
          .catch((err) => {
            this.$message.error(err.response.data.message)
          })
      }
    },
    handlecancel() {
      this.$router.push('order')
    }
  }
}
</script>

<style lang='less'>
.formt{
 .el-form{
 display: flex;
 height: 400px;
  }
 .btn{
    display: flex;
    justify-content: center;
   }
}
.rules{
  display: flex;
  justify-content: center;
}
.box{
  width: 57px;
    height: 35px;
    display: inline-block;
    text-align: center;
    background: #cccc;
    padding: 1px;
}
</style>
