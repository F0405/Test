<!-- 商品发布管理 -->
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <div class="filter-container">
      <el-form :model="search">
        <el-input
          v-model="search.skuCode"
          v-model.trim="search.skuCode"
          placeholder="商品政策编码"
          style="width: 200px"
          class="filter-item"
          clearable
        />
        <el-input
          v-model="search.name"
          v-model.trim="search.name"
          placeholder="商品名称"
          style="width: 200px"
          class="filter-item"
          clearable
        />
        <el-select
          v-model="search.goodsfilyId"
          placeholder="商品分类"
          clearable
          filterable
          style="width: 200px"
          class="filter-item"
        >
          <el-option
            v-for="item in classifyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-model="search.statusId"
          placeholder="商品状态"
          clearable
          style="width: 200px"
          class="filter-item"
        >
          <el-option
            v-for="item in status"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-model="search.goodsBrandId"
          placeholder="商品品牌"
          clearable
          filterable
          style="width: 200px"
          class="filter-item"
          @change="handleChangeBrand"
        >
          <el-option
            v-for="item in brandList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-model="search.goodssubbrand"
          placeholder="商品子品牌"
          clearable
          filterable
          style="width: 200px"
          class="filter-item"
        >
          <el-option
            v-for="item in SubBrandList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button
          type="primary"
          class="filter-item"
          @click="handleSearch(search)"
        >查询按钮</el-button>
        <el-button class="filter-item" @click="handleReset">重置按钮</el-button>
      </el-form>
    </div>
    <!-- 功能条 -->
    <div class="dataList">
      <span>数据列表</span>
      <el-button
        type="primary"
        size="mini"
        plain
        @click="handleReleased"
      >+商品发布</el-button>
    </div>

    <!-- 表格列表 -->
    <el-table ref="table" :data="publish.records" style="width: 100%" border>
      <el-table-column align="center" label="状态" width="100" prop="status">
        <template slot-scope="{ row }">
          <span v-if="row.status==0" style="background:rgb(255,255,128);display:block;width:100%;height:100%">草稿</span>
          <span v-if="row.status==1" style="background:rgb(158,234,106);display:block;width:100%;height:100%">上架</span>
          <span v-if="row.status===2" style="background:#ccc;display:block;width:100%;height:100%">下架</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="productSku" label="商品政策编码" align="center" />
      <el-table-column show-overflow-tooltip prop="erpSku" label="ERP商品政策编码" align="center" />
      <el-table-column show-overflow-tooltip prop="name" label="商品名称" align="center" />
      <el-table-column show-overflow-tooltip prop="unitName" label="单位" align="center" />
      <el-table-column show-overflow-tooltip prop="price" label="商品售卖价" align="center">
        <template slot-scope="{row}">
          {{ row.price ? '￥' + row.price/100 : '' }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="categoryName" label="商品分类" align="center" />
      <el-table-column show-overflow-tooltip prop="createdAt" label="创建时间" align="center">
        <template slot-scope="{row}">
          {{ row.createdAt }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerProName"
        label="省份"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.provinceCode ? showRegion(row.provinceCode) : null }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerCityName"
        label="城市"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.cityCode ? showRegion(row.cityCode) : null }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerAreaName"
        label="区县"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.villageCode ? showRegion(row.villageCode) : null }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerChannelName"
        label="渠道"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.passageCode ? showChannel(row.passageCode) : null }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bannerSubChannelName"
        label="子渠道"
        align="center"
      >
        <template slot-scope="{row}">
          {{ row.childPassageCode ? showChannel(row.childPassageCode) : null }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="{row}">
          <el-button
            v-show="row.status===2"
            type="text"
            size="small"
            @click="handlePut(row)"
          >上架</el-button>
          <el-button
            v-show="row.status===1"
            type="text"
            size="small"
            @click="handleSold(row)"
          >下架</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleCopy(row)"
          >复制</el-button>
          <el-button
            type="text"
            size="small"
            :disabled="row.status===1 "
            @click="handleComplie(row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :total="publish.total"
      :page.sync="query.current"
      :limit.sync="query.size"
      @pagination="handlePages"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import request from '@/utils/request'
import { mapState, mapActions, mapGetters } from 'vuex'
import { ChannelRepeat, RegionRepeat } from '@/utils/structure.js'
const status = [
  {
    id: 0,
    name: '草稿'
  },
  {
    id: 1,
    name: '上架'
  },
  {
    id: 2,
    name: '下架'
  }
]
export default {
  components: {
    Pagination
  },
  props: {},
  data() {
    return {
      trim: '',
      status,
      SubBrandList: [], // 商品子品牌
      isGrounding: false, // 上架
      search: {
        skuCode: '', // 商品编号
        name: '', // 商品名称
        goodsfilyId: '', // 商品分类
        statusId: '', // 商品状态
        goodsBrandId: '', // 商品品牌
        goodssubbrand: '' // 商品子品牌
      },
      selectList: [], // 表格选中列表
      flag: false,
      flags: false,
      province: [],
      query: {
        current: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapState('goods', ['publish', 'brandList', 'classifyList']),
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'areaMap', 'channelMap', 'optionRegion', 'regionMap'])
  },
  watch: {},
  created() {
    this.getPageList()
    this.getFuBrandList()
    this.getClassify()
    this.getSubBrandList()
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
    ...mapActions('goods', ['getGoodsList', 'getBrandList', 'getClassify', 'getIssueEdit', 'GooodsPutaway', 'GooodsSold']),
    // 渠道
    showChannel(v) {
      return ChannelRepeat(v, this.channelMap)
    },
    // 区域
    showRegion(v) {
      return RegionRepeat(v, this.regionMap)
    },
    getPageList() {
      this.getGoodsList({
        current: this.query.current,
        size: this.query.size
      })
    },
    // 父品牌
    getFuBrandList() {
      this.getBrandList({
        level: 0
      })
    },
    handleChangeBrand(val) {
      console.log(val)
      this.getSubBrandList()
    },
    // 子品牌
    getSubBrandList() {
      request({
        url: '/products-service/products/manager/queryProductsBrand',
        method: 'GET',
        params: {
          level: 1,
          parentId: this.search.goodsBrandId
        }
      }).then(resp => {
        console.log(resp)
        if (resp.code === 200) {
          this.SubBrandList = resp.result
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询
    handleSearch(val) {
      console.log(val)
      request({
        url: '/products-service/products/manager/queryProductsPage',
        method: 'POST',
        data: {
          current: this.query.current,
          size: this.query.size,
          productSku: val.skuCode,
          name: val.name,
          categoryId: val.goodsfilyId,
          status: val.statusId,
          brandId: val.goodsBrandId
        }
      }).then(resp => {
        console.log(resp)
        if (resp.code === 200) {
          this.publish.records = resp.result.list
          this.publish.total = resp.result.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 重置
    handleReset() {
      this.search.skuCode = ''
      this.search.name = ''
      this.search.goodsBrandName = ''
      this.search.statusName = ''
      this.search.goodsbrand = ''
      // this.search.goodssubbrand = ''
      this.getPageList()
    },
    // 分页
    handlePages(val) {
      console.log('aaaaa', val)
      this.query.current = val.page
      this.query.size = val.limit
      this.getGoodsList({
        current: this.query.current,
        size: this.query.size,
        productSku: this.search.skuCode,
        name: this.search.name,
        categoryId: this.search.goodsfilyId,
        status: this.search.statusId,
        brandId: this.search.goodsBrandId
      })
    },
    // 商品发布
    handleReleased() {
      this.$router.push({
        path: 'release',
        query: {
          type: 'new'
        }
      })
    },
    // 上架
    handlePut(val) {
      this.$confirm('此操作将上架该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'primary',
        center: true
      })
        .then(() => {
          this.GooodsPutaway({
            id: val.id
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上架'
          })
        })
    },
    // 下架
    handleSold(val) {
      this.$confirm('此操作将下架该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'primary',
        center: true
      })
        .then(() => {
          this.GooodsSold({
            id: val.id
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架'
          })
        })
    },
    // 复制
    handleCopy(val) {
      this.getIssueEdit(val)
      this.$router.push({
        path: 'release',
        query: {
          type: 'copy'
        }
      })
    },
    // 编辑
    handleComplie(val) {
      this.getIssueEdit(val)
      this.$router.push({
        path: 'release',
        query: {
          type: 'edit'
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.dataList{
  .el-button{
    margin-left: 20px;
  }
}
.el-table .cell{
  padding:0;
}
</style>
