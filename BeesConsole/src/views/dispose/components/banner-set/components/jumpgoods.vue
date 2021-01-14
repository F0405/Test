<template>
  <div class="jump-goods">
    <div class="goods-content">
      <div class="content-top">
        <p>
          {{ this.$parent.flag ? '选择要跳转的商品' : '选择要跳转的活动' }}
        </p>
        <span class="el-icon-close" @click="handleRemove" />
      </div>
      <div class="jump-con">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item :label="$parent.flag ? '商品名称' : '活动名称'">
            <el-input v-model="form.name" clearable :onkeyup="form.name=form.name.replace(/[, ]/g,'')" :placeholder="$parent.flag ? '商品名称' : '活动名称'" />
          </el-form-item>
          <el-form-item :label="$parent.flag ? '商品政策编码' : '活动编码'">
            <el-input v-model="form.code" clearable :onkeyup="form.code=form.code.replace(/[, ]/g,'')" :placeholder="$parent.flag ? '商品政策编码' : '活动编码'" />
          </el-form-item>
          <el-form-item label="城市区县:">
            <el-cascader
              ref="provincesVal"
              v-model="form.provincesId"
              :options="optionRegion"
              :value="form.provincesId"
              :props="{multiple:true}"
              collapse-tags
              clearable
              style="width:130px"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item label="渠道:">
            <el-cascader
              ref="channelVal"
              v-model="form.channelId"
              :options="opetionChannel"
              :value="form.channelId"
              :props="{multiple:true}"
              collapse-tags
              clearable
              style="width:130px"
              @change="handleChannel"
            />
          </el-form-item>
          <el-form-item style="margin-left: 255px;">
            <el-button @click="handleClear">取消</el-button>
            <el-button type="primary" @click="hahdleSearch(form)">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="jump-table">
        <el-table
          v-show="$parent.flag"
          :data="publish.records"
          border
          height="200"
        >
          <el-table-column
            prop="image"
            label="商品图"
            align="center"
          >
            <template slot-scope="{row}">
              <img :src="row.mainImgs.img1" alt="">
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="name"
            label="商品名称"
            align="center"
          />
          <el-table-column
            show-overflow-tooltip
            prop="productSku"
            label="商品政策编码"
            align="center"
          />
          <el-table-column
            show-overflow-tooltip
            prop="price"
            label="商品售卖价"
            align="center"
          >
            <template slot-scope="{row}">
              {{ '￥' + row.price/100 }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="城市区县"
            align="center"
          >
            <template slot-scope="{row}">
              {{ showRegion(row.provinceCode) }}-
              {{ showRegion(row.cityCode) }}-
              {{ showRegion(row.villageCode) }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="passage"
            label="渠道"
            align="center"
          >
            <template slot-scope="{row}">
              {{ showChannel(row.passageCode) }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="childPassage"
            label="子渠道"
            align="center"
          >
            <template slot-scope="{row}">
              {{ showChannel(row.childPassageCode) }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="stock"
            label="库存"
            align="center"
          />
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="handleSelect(row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-show="!$parent.flag"
          :data="publish.records"
          border
          height="200"
        >
          <el-table-column
            prop="activityCode"
            label="活动编号"
            align="center"
          />
          <el-table-column
            prop="activityType"
            label="活动类型"
            align="center"
          />
          <el-table-column
            prop="activityName"
            label="活动名称"
            align="center"
          />
          <el-table-column
            prop="province"
            label="城市区县"
            align="center"
          >
            <template slot-scope="{row}">
              {{ showRegion(row.provinceCode) }}
              {{ showRegion(row.cityCode) }}
              {{ showRegion(row.villageCode) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="passage"
            label="渠道"
            align="center"
          >
            <template slot-scope="{row}">
              {{ showChannel(row.passageCode) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="childPassage"
            label="子渠道"
            align="center"
          >
            <template slot-scope="{row}">
              {{ showChannel(row.childPassageCode) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="handleaCtivity(row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination
          v-show="publish.total > 0"
          :total="publish.total"
          :page.sync="query.current"
          :limit.sync="query.size"
          @pagination="handlePagin"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapState, mapActions, mapGetters } from 'vuex'
import { ChannelRepeat, RegionRepeat } from '@/utils/structure.js'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      form: {
        name: '',
        code: '',
        channelId: null,
        provincesId: null
      },
      query: {
        current: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapState('goods', ['publish']),
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'optionRegion', 'areaMap', 'channelMap', 'regionMap'])
  },
  created() {
    this.getList()
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
    handleRemove() {
      console.log(111)
      this.$parent.isJump = false
    },
    getList() {
      this.getGoodsList({
        current: this.query.current,
        size: this.query.size
      })
    },
    // 选择商品
    handleSelect(val) {
      console.log(val)
      console.log(this.$parent.bannerForm)
      this.$parent.bannerForm.listData.push(val)
      this.$parent.isActive = false
      this.$parent.isShop = false
      this.$parent.isJump = false
      this.$parent.bannerForm.redirect = 1
      this.form.name = ''
      this.form.code = ''
      this.form.provincesId = null
      this.form.channelId = null
      this.$parent.bannerForm.provincesId = this.edtailProvince(val.buCode, val.provinceCode, val.cityCode, val.villageCode)
      this.$parent.bannerForm.channelId = this.edtailChannel(val.passageCode, val.childPassageCode)
      // this.$parent.bannerForm.issueobj =
    },
    edtailProvince(a, b, c, d) {
      console.log(a, b, c, d)
      const aa = a ? a.split(',') : []
      const bb = b ? b.split(',') : []
      const cc = c ? c.split(',') : []
      const dd = d ? d.split(',') : []
      const arr = []
      for (let i = 0; i < aa.length; i++) {
        arr.push([aa[i], bb[i], cc[i], dd[i]].map(Number))
      }
      console.log(arr)
      return arr
    },
    edtailChannel(a, b) {
      const aa = a ? a.split(',') : []
      const bb = b ? b.split(',') : []
      const arr = []
      for (let i = 0; i < aa.length; i++) {
        arr.push([aa[i], bb[i]].map(Number))
      }
      console.log(arr)
      return arr
    },
    handleaCtivity(val) {
      this.$parent.bannerForm.listData.push(val)
      this.$parent.isActive = false
      this.$parent.isShop = false
      this.$parent.isJump = false
      this.$parent.bannerForm.redirect = 5
    },
    handlePagin(val) {
      console.log(val)
      this.query.current = val.page
      this.query.size = val.limit
      this.getList()
    },
    hahdleSearch(val) {
      console.log(val)
      this.getGoodsList({
        name: val.name,
        productSku: val.code,
        buCode: val.provincesId ? val.provincesId.map(item => item[0]).join(',') : null,
        provinceCode: val.provincesId ? val.provincesId.map(item => item[1]).join(',') : null,
        cityCode: val.provincesId ? val.provincesId.map(item => item[2]).join(',') : null,
        villageCode: val.provincesId ? val.provincesId.map(item => item[3]).join(',') : null,
        passageCode: val.channelId ? val.channelId.map(item => item[0]).join(',') : null,
        childPassageCode: val.channelId ? val.channelId.map(item => item[1]).join(',') : null
      })
    },
    handleClear() {
      this.form.name = ''
      this.form.code = ''
      this.form.provincesId = ''
      this.form.channelId = ''
      this.getList()
    },
    // 省市区
    handleChange(val) {
      console.log(val)
    },
    // 渠道
    handleChannel(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.jump-goods {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
  .goods-content {
    width: 750px;
    height: 600px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .content-top {
      padding: 5px;
      width: 100%;
      height: 50px;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      display: flex;
      p {
        // float: left;
        // margin-left: 20px;
        font-size: 16px;
        color: #6b6b6b;
        text-align: center;
        width:95%;
      }
      .el-icon-close {
        width:5%;
        font-size: 20px;
        margin-top: 10px;
        margin-right: 10px;
      }
    }
    .jump-con{
        width:90%;
        height:200px;
        margin-left:5%;
        margin-top:20px;
        border: solid 1px #333;
        padding-top:20px;
        padding-right:35px;
        .el-form{
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          .el-input{
              width:130px;
          }
        }
    }
    .jump-table{
        width:100%;
        height:300px;
        margin-top:20px;
        padding-top:20px;
        .el-table{
          img{
            width:50px;
            height:50px;
          }
        }
    }
  }
}
</style>
