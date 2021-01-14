<!-- 注册 -->
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
        prop="bannerName"
        label="资源位名称"
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
            issueList[row.bannerToId].label
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
        prop="image"
        label="展示图片"
        align="center"
      >
        <template slot-scope="{row}">
          <img :src="row.bannerPicUrl ? row.bannerPicUrl : src" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="innerPageType"
        label="跳转目标类型"
        align="center"
      >
        <template slot-scope="{row}">
          {{ getPageType(row.innerPageType) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="显示/隐藏开关"
        align="center"
      >
        <template slot-scope="{row}">
          <el-switch
            v-model="row.bannerDisplayed"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleShow(row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerStartTime"
        label="开始时间"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="bannerEndTime"
        label="结束时间"
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
      v-show="pageList.records.length > 0"
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
      },
      pageList: {
        total: 0,
        size: 0,
        current: 0,
        records: []
      },
      src: require('@/assets/img/注册.jpg')
    }
  },
  computed: {
    ...mapState('dispose', ['pageType']),
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'areaMap', 'channelMap', 'regionMap'])
  },
  watch: {},
  created() {
    this.getRegister()
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
    getRegister() {
      request({
        url: '/business-entity-service/banner/pageList',
        method: 'POST',
        data: {
          current: this.query.current,
          size: this.query.size,
          bannerLocation: 3
        }
      }).then(resp => {
        // console.log(resp)
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
    // 跳转目标
    getPageType(v) {
      let pageType = null
      this.pageType.findIndex(item => {
        if (item.id === v) {
          pageType = item.name
        }
      })
      return pageType
    },
    handleSearch(val) {
      if (val.issue === 0 || val.state === 0) {
        request({
          url: '/business-entity-service/banner/pageList',
          method: 'POST',
          data: {
            current: this.query.current,
            size: this.query.size,
            bannerLocation: 3,
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
      console.log(row)
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
      this.getRegister()
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
              this.getRegister()
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
    // 开关
    handleShow(val) {
      request({
        url: `/business-entity-service/banner/${val.id}/${val.bannerDisplayed}`,
        method: 'PUT'
      }).then(resp => {
        console.log(resp)
        if (resp.code === 200) {
          this.getRegister()
          if (val.bannerDisplayed) {
            this.$message.success('显示成功')
          } else {
            this.$message.success('隐藏成功')
          }
        }
      }).catch(err => {
        console.log(err)
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
