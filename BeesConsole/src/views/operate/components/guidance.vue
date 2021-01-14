<!-- 一键默认 -->
<template>
  <div class="market">
    <el-table
      :data="commonList.records"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="freqPurchaseListName"
        show-overflow-tooltip
        label="清单名称"
        align="center"
      />

      <el-table-column
        show-overflow-tooltip
        prop="bannerToName"
        label="发布对象"
        align="center"
      >
        <template slot-scope="{row}">
          <!-- {{ row.freqPurchaseListTo }} -->
          {{
            issueList[row.freqPurchaseListTo].label
          }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerProName"
        label="省份"
        align="center"
      >
        <template slot-scope="{row}">
          {{
            showRegion(row.freqPurchaseListProId)
          }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerCityName"
        label="城市"
        align="center"
      >
        <template slot-scope="{row}">
          {{
            showRegion(row.freqPurchaseListCityId)
          }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerAreaName"
        label="区县"
        align="center"
      >
        <template slot-scope="{row}">
          {{
            showRegion(row.freqPurchaseListAreaId)
          }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerChannelName"
        label="渠道"
        align="center"
      >
        <template slot-scope="{row}">
          {{
            showChannel(row.freqPurchaseListChannelId)
          }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerSubChannelName"
        label="子渠道"
        align="center"
      >
        <template slot-scope="{row}">
          {{
            showChannel(row.freqPurchaseListChannelId)
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="fpcontainProductNum"
        label="包含商品数量"
        align="center"
      />
      <el-table-column
        prop="updatedAt"
        show-overflow-tooltip
        label="修改时间"
        align="center"
      />
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="commonList.total > 0"
      :total="commonList.total"
      :page.sync="query.current"
      :limit.sync="query.size"
      @pagination="handlePage"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { mapState, mapActions, mapGetters } from 'vuex'
import request from '@/utils/request'
import { ChannelRepeat, RegionRepeat } from '@/utils/structure.js'
export default {
  components: {
    Pagination
  },
  props: {},
  data() {
    return {
      issueList: [{ value: 0, label: '售点' }],
      query: {
        current: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapState('commonlist', ['commonList']),
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'areaMap', 'channelMap', 'regionMap'])
  },
  watch: {},
  created() {
    this.getGuidance()
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    ...mapActions('commonlist', ['getCommonList', 'deleteCommon', 'getTyroCommon']),
    // 渠道
    showChannel(v) {
      return ChannelRepeat(v, this.channelMap)
    },
    // 区域
    showRegion(v) {
      return RegionRepeat(v, this.regionMap)
    },
    // 数据
    getGuidance() {
      this.getCommonList({
        freqPurchaseListType: 1,
        current: this.query.current,
        size: this.query.size
      })
    },
    handleSearch(val) {
      console.log(val)
      if (val.channelId || val.issue === 0 || val.name || val.provincesId) {
        request({
          url: '/business-entity-service/freqPurchaseList/pageList',
          method: 'POST',
          data: {
            current: this.query.current,
            size: this.query.size,
            freqPurchaseListType: 1,
            freqPurchaseListTo: val.issue,
            freqPurchaseListName: val.name,
            freqPurchaseListProId: val.provincesId ? val.provincesId.map(item => item[1]).join(',') : '',
            freqPurchaseListCityId: val.provincesId ? val.provincesId.map(item => item[2]).join(',') : '',
            freqPurchaseListAreaId: val.provincesId ? val.provincesId.map(item => item[3]).join(',') : '',
            freqPurchaseListChannelId: val.channelId ? val.channelId.map(item => item[0]).join(',') : '',
            freqPurchaseListSubChannelId: val.channelId ? val.channelId.map(item => item[1]).join(',') : ''
          }
        }).then(resp => {
          console.log(resp)
          if (resp.code === 200) {
            this.$message.success('查询成功')
            this.commonList.records = resp.data.list
            this.commonList.total = resp.data.total
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.error('请输入要查询的字段')
      }
    },
    // 编辑
    handleEdit(row) {
      this.getTyroCommon(row.id)
      this.$router.push({
        path: 'inventory',
        name: 'Inventory',
        params: {
          activeName: this.$parent.name
        },
        query: {
          type: 'edit'
        }
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确定删除商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          request({
            url: `/business-entity-service/freqPurchaseList/${row.id}`,
            method: 'DELETE'
          }).then(resp => {
            console.log(resp)
            if (resp.code === 200) {
              this.$message.success('删除成功')
              this.getGuidance()
            }
          }).catch(err => {
            console.log(err)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handlePage(val) {
      console.log(val)
      this.query.current = val.page
      this.query.size = val.limit
      this.getGuidance()
    }
  }
}
</script>
<style lang="less" scope>
  .market{
    width:100%;
    img{
      width:100px;
      height:50px;
    }
  }
</style>
