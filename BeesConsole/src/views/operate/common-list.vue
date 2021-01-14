<!-- 常购清单管理 -->
<template>
  <div class="app-container">
    <!-- 条件搜索 -->
    <div class="filter-container">
      <el-input
        v-model="listForm.name"
        placeholder="请输入清单名称"
        style="width: 200px"
        class="filter-item"
        clearable
      />
      <el-select
        v-model="listForm.issue"
        placeholder="请选择对象"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in issueList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-cascader
        ref="provincesVal"
        v-model="listForm.provincesId"
        :options="optionRegion"
        :props="{multiple: true}"
        :value="listForm.provincesId"
        clearable
        style="width: 200px;vertical-align: top;margin-right: 16px;"
        placeholder="请选择省市区"
        collapse-tags
        @change="handleChange"
      />
      <el-cascader
        ref="channelVal"
        v-model="listForm.channelId"
        :options="opetionChannel"
        :props="{multiple: true}"
        clearable
        :value="listForm.channelId"
        style="width: 200px;vertical-align: top;margin-right: 16px;"
        placeholder="请选择渠道"
        collapse-tags
        @change="handleChannel"
      />
      <el-button
        type="primary"
        class="filter-item"
        @click="handleFilter(listForm)"
      >搜索</el-button>
    </div>
    <div>
      <div v-show="activeName==='0'" class="tabcon">该Tab下配置的对应前台商城小程序页面用户可见商品数量限制为：45</div>
      <div v-show="activeName==='1'" class="tabcon">该Tab下配置的对应前台商城小程序页面用户可见商品数量限制为：10</div>
      <el-button
        class="list-add"
        type="primary"
        size="mini"
        plain
        @click="handleAddList"
      >新增</el-button>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="新手引导常购清单" name="0">
          <Tolerant v-if="activeName==='0'" ref="Tolerant" />
        </el-tab-pane>
        <el-tab-pane label="一键下单默认清单" name="1">
          <Guidance v-if="activeName==='1'" ref="Guidance" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>

import Tolerant from './components/tolerant'
import Guidance from './components/guidance'
import { mapActions, mapGetters, mapState } from 'vuex'
// import request from '@/utils/request'
// import { map } from 'mock/abi-mock'
export default {
  components: {
    Tolerant,
    Guidance
  },
  props: {},
  data() {
    return {
      listForm: {
        name: '',
        issue: '',
        provincesId: '',
        channelId: ''
      },
      issueList: [{ value: 0, label: '售点' }],
      activeName: '0',
      flag: false,
      query: {
        current: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'optionRegion']),
    ...mapState('commonlist', ['commonList'])
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
    ...mapActions('commonlist', ['getCommonList']),
    ...mapActions('dispose', ['getPageList']),
    getTab() {
      const activeTab = localStorage.getItem('inventory')
      this.activeName = activeTab
      console.log(this.activeName)
    },
    // 搜索
    handleFilter(val) {
      if (this.activeName === '0') {
        this.$refs.Tolerant.handleSearch(val)
      } else if (this.activeName === '1') {
        this.$refs.Guidance.handleSearch(val)
      }
    },
    // 添加
    handleAddList() {
      this.$router.push({
        path: 'inventory',
        name: 'Inventory',
        params: {
          activeName: this.activeName
        },
        query: {
          type: 'new'
        }
      })
    },
    handleClick(value) {
      localStorage.setItem('inventory', value.index)
    },
    // 省市下拉
    handleChange(value) {
      console.log(value)
      this.listForm.provincesVal = this.$refs['provincesVal'].getCheckedNodes()[0].pathLabels
    },
    // 渠道下拉
    handleChannel(val) {
      console.log(val)
      this.listForm.channelVal = this.$refs['channelVal'].getCheckedNodes()[0].pathLabels
    }
  }
}
</script>
<style lang="less" scope>
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
