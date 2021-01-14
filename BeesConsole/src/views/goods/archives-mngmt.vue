<!-- 商品档案管理 -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-input
          v-model="search.sku"
          v-model.trim="search.sku"
          :placeholder="$t('goods.sku')"
          style="width: 200px"
          class="filter-item"
          clearable
          filterable
          @keyup.enter.native="handleFilter"
        />
        <el-select
          v-model="search.brand"
          :placeholder="$t('goods.brand')"
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
        <el-input
          v-model="search.name"
          v-model.trim="search.name"
          :placeholder="$t('goods.name')"
          style="width: 200px"
          class="filter-item"
          clearable
          filterable
          @keyup.enter.native="handleFilter"
        />
        <!-- <el-select
          v-model="search.category"
          :placeholder="$t('goods.category')"
          style="width: 200px"
          class="filter-item"
          clearable
          filterable
        >
          <el-option
            v-for="(item, ind) in classifyList"
            :key="ind"
            :label="item.name"
            :value="item.id"
          />
        </el-select> -->
        <el-select
          v-model="search.subBrand"
          :placeholder="$t('goods.subBrand')"
          style="width: 200px"
          class="filter-item"
          clearable
          filterable
        >
          <el-option
            v-for="(item, ind) in SubBrandList"
            :key="ind"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button
          type="primary"
          class="filter-item"
          @click="handleInput(search)"
        >查询按钮</el-button>
        <el-button
          class="filter-item"
          @click="handleReset"
        >重置按钮</el-button>
      </el-form>
    </div>
    <!-- 功能条 -->

    <div class="dataList">
      <span>数据列表</span>
      <el-button type="primary" plain size="mini" @click="handleAdd">手动创建档案</el-button>
    </div>

    <el-table
      :data="archives.records"
      border
    >
      <el-table-column show-overflow-tooltip align="center" label="商品SKU编码" prop="baseSku" />
      <el-table-column show-overflow-tooltip align="center" label="SAP SKU编码" prop="sapSku" />
      <el-table-column show-overflow-tooltip align="center" label="ERP SKU编码" prop="erpSku" />
      <el-table-column show-overflow-tooltip align="center" label="商品名称" prop="name" />
      <el-table-column show-overflow-tooltip align="center" label="商品规格" prop="spec" />
      <el-table-column show-overflow-tooltip align="center" label="商品品牌" prop="brandName" />
      <el-table-column show-overflow-tooltip align="center" label="商品子品牌" prop="childBrandName" />
      <el-table-column show-overflow-tooltip align="center" label="建议零售价" prop="ptr">
        <template slot-scope="{row}">
          {{ row.ptr ? '￥' + row.ptr / 100 : '' }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="单位" prop="unitName" />
      <el-table-column width="200" label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      :total="archives.total"
      :page.sync="query.current"
      :limit.sync="query.size"
      @pagination="handlePage"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import request from '@/utils/request'
import { mapState, mapActions } from 'vuex'
const brandOptions = [
  { name: '百威1', value: 'bd1' },
  { name: '百威2', value: 'bd2' },
  { name: '百威3', value: 'bd3' }
]
export default {
  components: { Pagination },
  props: {},
  data() {
    return {
      trim: '',
      brandOptions,
      search: {
        sku: undefined,
        brand: undefined,
        name: undefined,
        category: undefined,
        subBrand: undefined
      },
      detail: false,
      query: {
        current: 1,
        size: 10
      },
      SubBrandList: []
    }
  },
  computed: {
    ...mapState('goods', ['archives', 'brandList', 'classifyList'])
  },
  watch: {},
  created() {
    this.getPageList()
    this.getFuBrandList()
    this.getSubBrandList()
    this.getClassify({
      current: 1,
      size: 20
    })
  },
  mounted() {
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    ...mapActions('goods', ['getarChivesList', 'getBrandList', 'getClassify', 'deleteBrand', 'getEditDetail']),

    handleFilter() {
      console.log('MMHH handleFilter', this.search)
    },
    getPageList() {
      this.getarChivesList({
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
    getSubBrandList() {
      request({
        url: '/products-service/products/manager/queryProductsBrand',
        method: 'GET',
        params: {
          level: 1,
          parentId: this.search.brand
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
    // 分页
    handlePage(val) {
      console.log(val)
      this.query.current = val.page
      this.query.size = val.limit
      this.getarChivesList({
        current: this.query.current,
        size: this.query.size,
        baseSku: this.search.sku ? this.search.sku * 1 : '',
        name: this.search.name,
        brandId: this.search.brand,
        childBrandId: this.search.subBrand
      })
    },
    // 编辑
    handleEdit(row) {
      console.log([row.detailImgs.img1, row.detailImgs.img2, row.detailImgs.img3].map(item => ({ url: item })))
      this.getEditDetail(row).then(() => {
        this.$router.push({
          path: 'creation',
          query: {
            type: 'edit'
          }
        })
      })
    },
    // 删除
    handleDelete(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'primary',
        center: true
      })
        .then(() => {
          request({
            url: '/products-service/products/manager/delProductsBase',
            method: 'PUT',
            data: {
              id: row.id
            }
          }).then(resp => {
            console.log(resp)
            if (resp.code === 200) {
              this.getPageList()
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
    // 重置
    handleReset() {
      this.search.sku = ''
      this.search.brand = ''
      this.search.name = ''
      this.search.category = ''
      this.search.subBrand = ''
      this.getPageList()
    },
    handleSearchBrand(val) {
      console.log(val)
    },
    // 添加
    handleAdd() {
      this.$router.push({
        path: 'creation',
        query: {
          type: 'new'
        }
      })
    },

    // 查询
    handleInput(val) {
      console.log(val)
      request({
        url: '/products-service/products/manager/queryProductsBasePage',
        method: 'POST',
        data: {
          current: this.query.current,
          size: this.query.size,
          baseSku: val.sku ? val.sku * 1 : '',
          name: val.name,
          brandId: val.brand,
          childBrandId: val.subBrand
        }
      }).then(resp => {
        if (resp.code === 200) {
          console.log(resp.result)
          this.archives.records = resp.result.list
        }
      }).catch(err => {
        console.log(err)
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
.statusY,.statusX{
  width:15px;
  height:15px;
  border-radius: 50%;
  background: chartreuse;
  display: inline-block
}
.statusX{
  background: coral;
}
</style>
