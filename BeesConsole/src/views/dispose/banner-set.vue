<!-- 横幅配置 -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="pageForm.optionDate"
        clearable
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="filter-item"
        @change="hangleDate"
      />
      <el-select v-model="pageForm.issue" placeholder="发布对象" clearable class="filter-item">
        <el-option
          v-for="item in issueList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="pageForm.state" placeholder="状态" clearable class="filter-item">
        <el-option
          v-for="item in stateName"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-cascader
        v-model="pageForm.provincesId"
        :options="optionRegion"
        :props="{multiple:true}"
        :value="pageForm.provincesId"
        collapse-tags
        clearable
        style="width: 260px;vertical-align: top;margin-right: 16px;"
        placeholder="请选择省市区"
        @change="handleChange"
      />
      <el-cascader
        v-model="pageForm.channelId"
        :options="opetionChannel"
        :props="{multiple:true}"
        :value="pageForm.channelId"
        collapse-tags
        clearable
        style="width: 200px;vertical-align: top;margin-right: 16px;"
        placeholder="请选择渠道"
        @change="handleChannel"
      />
      <el-button class="filter-item" type="primary" @click="handleSearch(pageForm)">搜索</el-button>
    </div>
    <div>
      <div v-show="activeName==='0'" class="tabcon">该Tab下配置的对应前台商城小程序资源位用户可见数量限制为：5</div>
      <div v-show="activeName==='6'" class="tabcon">为保证前台商城小程序的显示，建议该Tab下配置的资源位每用户可见至少2个</div>
      <div v-show="activeName==='1' || activeName==='2' || activeName==='3' || activeName==='4' || activeName==='5'" class="tabcon">该Tab下配置的对应前台商城小程序资源位用户可见数量限制为：1</div>
      <el-button class="list-add" type="primary" size="mini" plain @click="handleAdd">新增</el-button>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-if="roleId==='2'" label="首页顶部" name="0">
          <Hometop v-if="activeName==='0'" ref="Hometop" />
        </el-tab-pane>
        <el-tab-pane v-if="roleId==='2'" label="首页中部通栏" name="1">
          <Homemiddle v-if="activeName==='1'" ref="Homemiddle" />
        </el-tab-pane>
        <el-tab-pane v-if="roleId==='2'" label="商品列表通栏" name="2">
          <Shoplist v-if="activeName==='2'" ref="Shoplist" />
        </el-tab-pane>
        <el-tab-pane v-if="roleId==='1'" label="注册页资源位" name="3">
          <Register v-if="activeName==='3' || roleId==='1'" ref="Register" />
        </el-tab-pane>
        <el-tab-pane v-if="roleId==='1'" label="登录页资源位" name="4">
          <RegisterLogin v-if="activeName==='4'" ref="RegisterLogin" />
        </el-tab-pane>
        <el-tab-pane v-if="roleId==='1'" label="M1分享图" name="5">
          <Move v-if="activeName==='5'" ref="Move" />
        </el-tab-pane>
        <el-tab-pane v-if="roleId==='2'" label="首页营销位" name="6">
          <Market v-if="activeName==='6'" ref="Market" />
        </el-tab-pane>
        <el-tab-pane v-if="roleId==='2'" label="首页商品位" name="7">
          <Shop v-if="activeName==='7'" ref="Shop" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Hometop from './components/banner-set/home-top'
import Homemiddle from './components/banner-set/home-middle'
import Register from './components/banner-set/register'
import RegisterLogin from './components/banner-set/register-login'
import Move from './components/banner-set/move'
import Market from './components/banner-set/market'
import Shop from './components/banner-set/shop'
import Shoplist from './components/banner-set/shop-list'
import { mapState, mapGetters } from 'vuex'
// import { active } from 'lrz'
// import request from '@/utils/request'
export default {
  components: {
    Hometop,
    Homemiddle,
    Register,
    RegisterLogin,
    Move,
    Market,
    Shop,
    Shoplist
  },
  props: {},
  data() {
    return {
      pageForm: {
        optionDate: '', // 选择日期
        issue: '', // 发布对象
        provincesId: null, // 发布城市
        channelId: null, // 发布渠道
        state: '' // 状态
      },
      index: 0,
      issueList: [{ value: 0, label: '售点' }],
      stateName: [{ value: 0, label: '隐藏' }, { value: 1, label: '显示' }],
      activeName: '0',
      isCompile: false,
      query: {
        current: 1,
        size: 10
      }
    }
  },
  computed: {
    // ...mapState('goods', ['provinceList', 'channelList']),
    ...mapState('dispose', ['pageList', 'activeTab']),
    ...mapGetters('user', ['roleId']),
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'optionRegion'])
  },
  watch: {},
  created() {
  },
  mounted() {
    this.getTab()
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    handleAdd() {
      this.$router.push({
        path: 'banneradd',
        name: 'Banneradd',
        params: {
          activeName: this.activeName
        },
        query: {
          type: 'new'
        }
      })
    },
    getTab() {
      const activeTab = localStorage.getItem('activeName')
      this.activeName = activeTab
      console.log(this.activeTab)
    },
    handleClick(value) {
      console.log(value)
      localStorage.setItem('activeName', value.index)
    },
    // 省市下拉
    handleChange(val) {
      console.log(val)
    },
    // 渠道下拉
    handleChannel(val) {
      console.log(val)
    },
    // 搜索
    handleSearch(val) {
      if (this.activeName === '0') {
        this.$refs.Hometop.handleSearch(val)
      } else if (this.activeName === '1') {
        this.$refs.Homemiddle.handleSearch(val)
      } else if (this.activeName === '2') {
        this.$refs.Shoplist.handleSearch(val)
      } else if (this.activeName === '3') {
        this.$refs.Register.handleSearch(val)
      } else if (this.activeName === '4') {
        this.$refs.RegisterLogin.handleSearch(val)
      } else if (this.activeName === '5') {
        this.$refs.Move.handleSearch(val)
      } else if (this.activeName === '6') {
        this.$refs.Market.handleSearch(val)
      } else if (this.activeName === '7') {
        this.$refs.Shop.handleSearch(val)
      }
    },
    hangleDate(val) {
      console.log(val)
      // console.log(1)
    }
  }
}
</script>

<style lang='less' scoped>
.tabcon{
    font-size: 12px;
    height:50px;
    line-height: 50px;
  }
 .list-add{
    position: absolute;
    right: 20px;
    z-index: 999;
  }
</style>

