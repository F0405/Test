<template>
  <div class="goodsadd">
    <div class="goodsadd-content">
      <div class="title">添加商品</div>
      <div class="content">
        <div class="content-left">
          <div>
            <el-form label-width="120px">
              <el-form-item label="商品名称:">
                <el-input v-model="search.name" v-model.trim="search.name" placeholder="请输入商品名称" style="width:200px" />
              </el-form-item>
              <el-form-item label="商品政策编码:">
                <el-input v-model="search.productSku" :oninput="search.productSku=search.productSku.replace(/[^\d]/g,'')" placeholder="请输入商品政策编码" style="width:200px" />
              </el-form-item>
              <el-button type="primary" size="small" class="search" @click="handleSearch(search)">搜索</el-button>
            </el-form>
          </div>
          <div>
            <el-table
              border
              :data="publish.records"
              style="marginTop:20px"
              height="300"
              width="100%"
            >
              <el-table-column label="商品图" align="center">
                <template slot-scope="{row}">
                  <img :src="row.mainImgs.img1" alt="">
                </template>
              </el-table-column>
              <el-table-column label="商品名称" show-overflow-tooltip prop="name" align="center" />
              <el-table-column label="商品政策编码" show-overflow-tooltip prop="productSku" align="center" />
              <el-table-column label="商品售卖价" show-overflow-tooltip align="center">
                <template slot-scope="{row}">
                  {{ '￥' + row.price / 100 }}
                </template>
              </el-table-column>
              <el-table-column label="城市区县" show-overflow-tooltip prop="county" align="center">
                <template slot-scope="{row}">
                  {{ showRegion(row.provinceCode) }}-
                  {{ showRegion(row.cityCode) }}-
                  {{ showRegion(row.villageCode) }}
                </template>
              </el-table-column>
              <el-table-column label="渠道子渠道" show-overflow-tooltip prop="channel" align="center">
                <template slot-scope="{row}">
                  {{ showChannel(row.passageCode) }}-
                  {{ showChannel(row.childPassageCode) }}
                </template>
              </el-table-column>
              <el-table-column label="库存" prop="stock" align="center" />
              <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
                  <el-button type="text" size="small" @click="handleAdd(row)">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="publish.total > 0"
              :total="publish.total"
              :page.sync="query.current"
              :limit.sync="query.size"
              @pagination="handlePage"
            />
          </div>
        </div>
        <div class="content-right">
          <p>已添加商品</p>
          <div style="height:400px;overflow:auto">
            <div v-for="(item, index) in listData1" :key="item.id" class="shop-con">
              <div class="img">
                <img :src="item.mainImgs.img1" alt="">
              </div>
              <div class="con">
                <p>商品名称:{{ item.name }}</p>
                <p> 商品政策编码：{{ item.productSku }} 商品售卖价：{{ '￥' + item.price/100 }} </p>
                <p> 城市区县： {{ showRegion(item.provinceCode) }}
                  {{ showRegion(item.cityCode) }}
                  {{ showRegion(item.villageCode) }}</p>
                <p>
                  渠道：{{ showChannel(item.passageCode) }}
                  子渠道：{{ showChannel(item.childPassageCode) }}
                </p>
                <p>
                  库存：{{ item.stock }}
                </p>
              </div>
              <div class="remove">
                <el-button @click="handleRemove(index)">删除</el-button>
              </div>
            </div>
          </div>
          <div class="right-bottom">
            <el-button @click="handleClear">取消</el-button>
            <el-button type="primary" @click="handleSured">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import request from '@/utils/request'
import { mapState, mapActions, mapGetters } from 'vuex'
import { ChannelRepeat, RegionRepeat } from '@/utils/structure.js'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      listData1: [],
      query: {
        current: 1,
        size: 10
      },
      search: {
        name: '',
        productSku: ''
      }
    }
  },
  computed: {
    ...mapState('goods', ['publish']),
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'areaMap', 'channelMap', 'regionMap'])
  },
  created() {
  },
  methods: {
    ...mapActions('goods', ['getGoodsList']),
    // 渠道
    showChannel(v) {
      return ChannelRepeat(v, this.channelMap)
    },
    // 区域
    showRegion(v) {
      return RegionRepeat(v, this.regionMap)
    },
    getPageList(val) {
      console.log(val)
      this.getGoodsList({
        current: this.query.current,
        size: this.query.size,
        status: 1,
        buCode: val.provincesId ? val.provincesId.map(item => item[0]).join(',') : null,
        provinceCode: val.provincesId ? val.provincesId.map(item => item[1]).join(',') : null,
        cityCode: val.provincesId ? val.provincesId.map(item => item[2]).join(',') : null,
        villageCode: val.provincesId ? val.provincesId.map(item => item[3]).join(',') : null,
        passageCode: val.channelId ? val.channelId.map(item => item[0]).join(',') : null,
        childPassageCode: val.channelId ? val.channelId.map(item => item[1]).join(',') : null
      })
    },
    // 搜索
    handleSearch(val) {
      console.log(val)
      request({
        url: '/products-service/products/manager/queryProductsPage',
        method: 'POST',
        data: {
          current: this.query.current,
          size: this.query.size,
          name: val.name,
          productSku: val.productSku
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
    // 分页
    handlePage(val) {
      const row = this.$parent.inventory
      this.query.current = val.page
      this.query.size = val.limit
      this.getGoodsList({
        current: this.query.current,
        size: this.query.size,
        status: 1,
        buCode: row.provincesId ? row.provincesId.map(item => item[0]).join(',') : null,
        provinceCode: row.provincesId ? row.provincesId.map(item => item[1]).join(',') : null,
        cityCode: row.provincesId ? row.provincesId.map(item => item[2]).join(',') : null,
        villageCode: row.provincesId ? row.provincesId.map(item => item[3]).join(',') : null,
        passageCode: row.channelId ? row.channelId.map(item => item[0]).join(',') : null,
        childPassageCode: row.channelId ? row.channelId.map(item => item[1]).join(',') : null
      })
    },
    // 添加商品
    handleAdd(val) {
      console.log(val)
      const index = this.listData1.findIndex(item => item.id === val.id)
      if (index === -1) {
        this.listData1.push(val)
      } else {
        this.$message.error('不能重复选择商品')
      }
      console.log(index)
    },
    // 删除
    handleRemove(index) {
      this.listData1.splice(index, 1)
    },
    handleClear() {
      this.$parent.isMask = false
      this.search.name = ''
      this.search.productSku = ''
      this.$parent.inventory.detailList = this.listData1 = []
    },
    handleSured() {
      this.$parent.isMask = false
      this.$parent.inventory.detailList = this.listData1
    }
  }
}
</script>

<style lang="less" scoped>
.goodsadd{
     position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  .goodsadd-content{
      width:1200px;
      height:600px;
      background: #fff;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-45%,-50%);
      margin-left: 100px;
      .title{
          width:100%;
          height:10%;
          padding:20px;

      }
     .content{
         width:100%;
         height:90%;
          display: flex;
          justify-content: space-between;
      .content-left{
          width:50%;
          border-right:solid 1px #ccc;
          .search{
              float: right;
              margin-right:50px;
              width:100px;
          }
          .el-table{
              font-size: 12px;
              img{
                  width:100px;
                  height: 60px;
              }
          }
      }
      .content-right{
          width:50%;
          position: relative;
          padding-left:20px;

          .shop-con{
              margin-right: 10px;
              height:auto;
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              background: #ccc;
              margin-bottom: 5px;

          .img{
            justify-content: center;
            align-items: center;
            width:20%;
              img{
                width:100%;
                height:100px;
                padding: 10px;
              }
          }
          .con{
            width:65%;
            overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap
          }
              .remove{
                // width:10%;
                  height: 40px;
                  margin-top:50px;
                  margin-right: 10px;
              }
              p{
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap
              }
          }
          .right-bottom{
              width:100%;
              position: absolute;
              bottom: 10px;
              text-align: center;
              .el-button{
                  margin-right: 10px;
                  z-index: 999;
              }
          }
      }
     }
  }
}
</style>
