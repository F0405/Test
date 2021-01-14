<!-- 商品设置 -->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品品牌设置" name="brand">
        <brand />
      </el-tab-pane>
      <el-tab-pane label="商品单位设置" name="second">
        <company />
      </el-tab-pane>
      <el-tab-pane label="商品分类设置" name="filter">
        <pass />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import brand from './content/brand' // 商品品牌设置
import company from './content/company' // 商品单位设置
import pass from './content/filter' // 商品分类设置
export default {
  components: { brand, company, pass },
  props: {},
  data() {
    return {
      activeName: 'brand'
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
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
