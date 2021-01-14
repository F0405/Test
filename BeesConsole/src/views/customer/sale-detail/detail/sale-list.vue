<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in classifyItems" :key="index" :label="item.text" :name="item.name" />
    </el-tabs>
    <!-- <div class="classifyItems">
      <div v-for="(item,index) in classifyItems" :key="index" :class="{selected:index==showIndex}" class="fl" @click="showIndex=index">{{ item }}</div>
    </div> -->
    <el-table :data="saleData" border stripe :height="saleHeight">
      <el-table-column label="活动编号" prop="number" align="center" />
      <el-table-column label="活动名称" prop="name" align="center" />
      <el-table-column label="类型" prop="type" align="center" />
      <el-table-column label="开始时间" prop="startTime" align="center" />
      <el-table-column label="结束时间" prop="endTime" align="center" />
      <el-table-column label="促销内容" prop="content" align="center" />
      <el-table-column label="状态" prop="status" align="center" />
    </el-table>
  </div>
</template>
<script>
// const classifyItems = ['全部（10）', '未开始（3）', '进行中（15）', '已结束（20）']
const classifyItems = [{
  text: '全部（10）',
  name: 'all'
}, {
  text: '未开始（3）',
  name: 'unstart'
}, {
  text: '进行中（15）',
  name: 'running'
}, {
  text: '已结束（20）',
  name: 'end'
}]
const saleData = [
  { number: '123456789', name: '百威品牌日', type: '买A赠A', startTime: '2019-04-09 12:22', endTime: '2019-04-09 12:22:12', content: '百威买一箱赠一箱', status: '进行中' },
  { number: '123456789', name: '百威品牌日', type: '买A赠A', startTime: '2019-04-09 12:22', endTime: '2019-04-09 12:22:12', content: '百威买一箱赠一箱', status: '进行中' },
  { number: '123456789', name: '百威品牌日', type: '买A赠A', startTime: '2019-04-09 12:22', endTime: '2019-04-09 12:22:12', content: '百威买一箱赠一箱', status: '进行中' },
  { number: '123456789', name: '百威品牌日', type: '买A赠A', startTime: '2019-04-09 12:22', endTime: '2019-04-09 12:22:12', content: '百威买一箱赠一箱', status: '进行中' },
  { number: '123456789', name: '百威品牌日', type: '买A赠A', startTime: '2019-04-09 12:22', endTime: '2019-04-09 12:22:12', content: '百威买一箱赠一箱', status: '进行中' }
]
export default {
  data() {
    return {
      activeName: 'all',
      saleHeight: '',
      classifyItems,
      showIndex: 0,
      saleData
    }
  },
  created() {
    this.saleHeight = window.innerHeight * 0.46
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped>

</style>
