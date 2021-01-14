<!-- 商城首页配置 -->
<template>
  <div class="app-container">
    <div class="page-top">
      <el-form ref="pageForm" :model="pageForm" label-width="150px">
        <div class="pageFormTop">
          <el-form-item label="投放时间：">
            <el-date-picker
              v-model="pageForm.optionDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="发布对象：">
            <el-select
              v-model="pageForm.issue"
              placeholder="请选择"
              class="select"
            >
              <el-option
                v-for="item in issueList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="pageFormBottom">
          <el-form-item label="发布城市区县：">
            <el-select v-model="pageForm.city" placeholder="请选择">
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="发布渠道：">
            <el-select v-model="pageForm.channel" placeholder="请选择">
              <el-option
                v-for="item in channelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="pageForm.state" placeholder="请选择">
              <el-option
                v-for="item in stateName"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleSearch(pageForm)">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="page-tab">
      <div class="tab-left">
        <div
          v-for="(item, ind) in tabList"
          :key="item.id"
          :class="{ active: index === ind }"
          @click="index = ind"
        >
          {{ item.value }}
        </div>
      </div>
      <div tab-right>
        <el-button>新增</el-button>
      </div>
    </div>
    <div class="page-content">
      <!-- <Hometop v-show="index===0" />
      <Register v-show="index===1" />
      <RegisterLogin v-show="index===2" />
      <Move v-show="index===3" />
      <Market v-show="index===4" />
      <Show v-show="index===5" /> -->
    </div>
  </div>
</template>
<script>
// import Hometop from './components/home-page/home-top'
// import Register from './components/home-page/register'
// import RegisterLogin from './components/home-page/register-login'
// import Move from './components/home-page/move'
// import Market from './components/home-page/market'
// import Show from './components/home-page/show'
export default {
  components: {
    // Hometop,
    // Register,
    // RegisterLogin,
    // Move,
    // Market,
    // Show
  },
  props: {},
  data() {
    return {
      pageForm: {
        optionDate: '', // 选择日期
        issue: '', // 发布对象
        city: '', // 发布城市
        channel: '', // 发布渠道
        state: '' // 状态
      },
      index: 0,
      issueList: [{ value: '对象', label: '对象' }],
      cityList: [{ value: '上海', label: '上海' }],
      channelList: [{ value: '门店', label: '门店' }],
      stateName: [
        { value: '显示', label: '显示' },
        { value: '隐藏', label: '隐藏' }
      ],
      tabList: [
        { value: '首页顶部', id: 1 },
        { value: '注册页Banner', id: 2 },
        { value: '登录页Banner', id: 3 },
        { value: 'M1 Banner', id: 4 },
        { value: '营销展示位', id: 5 },
        { value: '商品展示位', id: 6 }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    handleSearch(val) {
      console.log(val)
    }
  }
}
</script>

<style lang='less' scoped>
.app-container {
  width: 100%;
  height: 100%;
  padding-left: 30px;
  .page-top {
    width: 100%;
    height: 140px;
    border: solid 1px #000;
    margin-top: 30px;
    margin-bottom: 30px;
    .el-form {
      display: flex;
      flex-direction: column;
      .pageFormTop {
        width: 100%;
        display: flex;
        margin-top: 20px;
      }
      .pageFormBottom {
        width: 100%;
        display: flex;
      }
    }
  }
  .page-tab {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #000;
    .tab-left {
      display: flex;
      div {
        width: 100px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        background: #ccc;
        margin-right: 10px;
        border-radius: 5px;
        font-size: 14px;
      }
      .active {
        background: chartreuse;
      }
    }
  }
  .page-content {
    width: 100%;
    height: 100px;
    .con {
      display: none;
    }
  }
}
</style>
