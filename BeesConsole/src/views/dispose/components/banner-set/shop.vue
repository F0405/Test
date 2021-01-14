<!-- 商品位配置 -->
<template>
  <div class="market">
    <el-table
      :data="pageList.records"
      border
      height="500"
      style="width: 100%"
    >
      <el-table-column
        show-overflow-tooltip
        prop="bannerProductListName"
        label="商品列表名称"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="bannerToName"
        label="发布对象"
        align="center"
      >
        <template slot-scope="{row}">
          {{
            row.bannerToId=== '0' ? '售点' : ''
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
          {{ showRegion(row.bannerProId) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerCityName"
        label="城市"
        align="center"
      >
        <template slot-scope="{row}">
          {{ showRegion(row.bannerCityId) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerAreaName"
        label="区县"
        align="center"
      >
        <template slot-scope="{row}">
          {{ showRegion(row.bannerAreaId) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerChannelName"
        label="渠道"
        align="center"
      >
        <template slot-scope="{row}">
          {{ showChannel(row.bannerChannelId) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerSubChannelName"
        label="子渠道"
        align="center"
      >
        <template slot-scope="{row}">
          {{ showChannel(row.bannerSubChannelId) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerContainProductNum"
        label="包含商品数量"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="updatedAt"
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
      v-show="pageList.total > 0"
      :total="pageList.total"
      :page.sync="pageList.current"
      :limit.sync="pageList.size"
      @pagination="handlePage"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { mapActions, mapGetters, mapState } from 'vuex'
import request from '@/utils/request'
import { ChannelRepeat, RegionRepeat } from '@/utils/structure.js'

export default {
  components: { Pagination },
  props: {},
  data() {
    return {
      issueList: [{ value: 0, label: '售点' }],
      query: {
        current: 1,
        size: 10
      }
      // pageList: {
      //   total: 0,
      //   size: 0,
      //   current: 0,
      //   records: []
      // }
    }
  },
  computed: {
    ...mapState('dispose', ['pageList']),
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'areaMap', 'channelMap', 'regionMap'])
  },
  watch: {},
  created() {
    this.getShopList()
    console.log(this.pageList.records)
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
    ...mapActions('dispose', ['getPageList', 'deleteBanner']),
    ...mapActions('detail', ['getHomeToplist']),
    // 渠道
    showChannel(v) {
      return ChannelRepeat(v, this.channelMap)
    },
    // 区域
    showRegion(v) {
      return RegionRepeat(v, this.regionMap)
    },
    // 数据
    getShopList() {
      request({
        url: '/business-entity-service/banner/pageList',
        method: 'POST',
        data: {
          current: this.query.current,
          size: this.query.size,
          bannerLocation: 7
        }
      }).then(resp => {
        console.log(resp)
        if (resp.code === 200) {
          this.pageList.total = resp.data.total
          this.pageList.size = resp.data.size
          this.pageList.current = resp.data.current
          this.pageList.records = resp.data.records
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleSearch(val) {
      if (val.issue === 0 || val.state === 0) {
        request({
          url: '/business-entity-service/banner/pageList',
          method: 'POST',
          data: {
            current: this.query.current,
            size: this.query.size,
            bannerLocation: 7,
            bannerStartTime: val.optionDate[0] ? val.optionDate[0] : '',
            bannerEndTime: val.optionDate[1] ? val.optionDate[1] : '',
            bannerToDTO: {
              bannerToId: val.issue
            },
            bannerDisplayed: val.state,
            bannerRegionDTOS:
            (val.provincesId || []).map(item => {
              return {
                bannerBuId: item[0],
                bannerProId: item[1],
                bannerCityId: item[2],
                bannerAreaId: item[3] }
            }) ? (val.provincesId || []).map(item => {
                return {
                  bannerBuId: item[0],
                  bannerProId: item[1],
                  bannerCityId: item[2],
                  bannerAreaId: item[3] }
              }) : null,
            bannerChannelDTOS:
            (val.channelId || []).map(item => {
              return {
                bannerChannelId: item[0],
                bannerSubChannelId: item[1] }
            }) ? (val.channelId || []).map(item => {
                return {
                  bannerChannelId: item[0],
                  bannerSubChannelId: item[1] }
              }) : null
          }
        }).then(resp => {
          console.log(resp)
          if (resp.code === 200) {
            this.$message.success('查询成功')
            this.pageList.records = resp.data.records
            this.pageList.total = resp.data.total
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 编辑
    handleEdit(row) {
      this.getHomeToplist(row.id)
      this.$router.push({
        path: 'banneradd',
        name: 'Banneradd',
        params: {
          activeName: this.$parent.name
        },
        query: {
          type: 'edit'
        }
      })
    },
    handlePage(val) {
      console.log(val)
      this.query.current = val.page
      this.query.size = val.limit
      this.getShopList()
    },
    // 删除
    handleDelete(row) {
      console.log(row)
      this.$confirm('确定删除品牌?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          request({
            url: `/business-entity-service/banner/${row.id}`,
            method: 'DELETE'
          }).then(resp => {
            console.log(resp)
            if (resp.code === 200) {
              this.$message.success('删除成功')
              this.getShopList()
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
