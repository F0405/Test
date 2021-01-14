<template>
  <div class="inventory">
    <el-form
      ref="inventory"
      :model="inventory"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="清单类型" prop="listType">
        <el-select v-model="inventory.listType" placeholder="请选择类型" @change="handleListType">
          <el-option
            v-for="item in listTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="清单名称" prop="name">
        <el-input v-model="inventory.name" v-model.trim="inventory.name" clearable :maxlength="maxLength" placeholder="请输入清单名称" style="width:200px" @input="handleMax" />
      </el-form-item>
      <el-form-item label="发布对象" prop="issue">
        <el-select v-model="inventory.issue" clearable placeholder="请选择对象" @change="handleIssue">
          <el-option
            v-for="item in issueList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发布城市区县" prop="provincesId">
        <el-cascader
          ref="provincesVal"
          v-model="inventory.provincesId"
          clearable
          :options="optionRegion"
          collapse-tags
          :props="{multiple: true}"
          :value="inventory.provincesId"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="发布渠道" prop="channelId">
        <el-cascader
          ref="channelVal"
          v-model="inventory.channelId"
          clearable
          :options="opetionChannel"
          collapse-tags
          :props="{multiple: true}"
          :value="inventory.channelId"
          @change="handleChannel"
        />
      </el-form-item>
      <el-form-item label="选择清单内商品" style="marginTop:80px;" prop="listshop">
        <el-button plain type="primary" @click="handleAddshop('inventory')">添加商品</el-button>
        <el-table
          border
          :data="inventory.detailList"
          style="width:60%;marginTop:20px;"
          height="350"
        >
          <el-table-column label="商品图" align="center" width="180">
            <template slot-scope="{row}">
              <img :src="row.mainImgs.img1" alt="">
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" show-overflow-tooltip align="center" />
          <el-table-column label="商品政策编码" prop="productSku" show-overflow-tooltip align="center" />
          <el-table-column label="商品售卖价" prop="ptr" show-overflow-tooltip align="center">
            <template slot-scope="{row}">
              {{ '￥' + row.price / 100 }}
            </template>
          </el-table-column>
          <el-table-column label="城市区县" prop="county" show-overflow-tooltip align="center">
            <template slot-scope="{row}">
              {{ showRegion(row.provinceCode) }}-
              {{ showRegion(row.cityCode) }}-
              {{ showRegion(row.villageCode) }}
            </template>
          </el-table-column>
          <el-table-column label="渠道子渠道" prop="channel" show-overflow-tooltip align="center">
            <template slot-scope="{row}">
              {{ showChannel(row.passageCode) }}-
              {{ showChannel(row.childPassageCode) }}
            </template>
          </el-table-column>
          <el-table-column label="库存" prop="stock" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleStick(scope.$index)">置顶</el-button>
              <el-button type="text" size="small" @click="handleRemove(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item style="float:right;paddingRight:100px">
        <el-button size="mini" @click="handleClear(inventory)">取消</el-button>
        <el-button size="mini" type="primary" @click="handleSubmit('inventory')">确定</el-button>
      </el-form-item>
    </el-form>
    <div v-show="isMask">
      <Goddsadd ref="Goddsadd" />
    </div>
  </div>
</template>

<script>
import Goddsadd from './goodsadd'
import { mapState, mapActions, mapGetters } from 'vuex'
import request from '@/utils/request'
import { ChannelRepeat, RegionRepeat } from '@/utils/structure.js'

const listTypes = [
  { name: '新手引导常购清单', id: 0 },
  { name: '一键下单默认清单', id: 1 }
]
export default {
  components: {
    Goddsadd
  },
  data() {
    return {
      isPosting: false, // 防止确认按钮重复提交
      inventory: {
        listType: '',
        name: '',
        issue: '',
        provincesId: [],
        channelId: [],
        listData: [],
        detailList: []
      },
      issueList: [{ value: 0, label: '售点' }],
      listTypes,
      index: 1,
      rules: {
        listType: [{ required: true, message: '请选择清单类型', trigger: 'blur' }],
        name: [{ required: true, message: '请输入清单名称', trigger: 'blur' }],
        issue: [{ required: true, message: '请选择发布对象', trigger: 'blur' }],
        provincesId: [{ required: true, message: '请选择发布城市区县', trigger: 'blur' }],
        channelId: [{ required: true, message: '请选择发布渠道', trigger: 'blur' }]
        // listshop: [{ required: true, message: '请选择清单内商品', trigger: 'blur' }]
      },
      isMask: false,
      maxLength: 15
    }
  },
  computed: {
    ...mapState('commonlist', ['tyroCommon']),
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'areaMap', 'channelMap', 'optionRegion', 'regionMap']),
    isEdit() {
      return this.$route.query.type
    }
  },
  watch: {
    // 'inventory.provincesId'(v, o) {
    //   console.log(111, v)
    // }
  },
  created() {
    this.deatilTro()
    this.listType()
  },
  mounted() {
    if (this.isEdit === 'edit' && !this.tyroCommon.id) {
      this.$router.push('/operate/list')
    }
    console.log(this.tyroCommon)
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    ...mapActions('commonlist', ['postCommonList', 'detailCommonList']),
    Onload() {
      alert('刷新')
    },
    // 渠道
    showChannel(v) {
      return ChannelRepeat(v, this.channelMap)
    },
    // 区域
    showRegion(v) {
      return RegionRepeat(v, this.regionMap)
    },
    isActive() {
      if (this.$route.params.avtiveName === '0') {
        this.inventory.listType = 0
      } else if (this.$route.params.avtiveName === '1') {
        this.inventory.listType = 1
      }
    },
    listType() {
      // console.log(this.$route.params)
      if (this.$route.params.activeName === '0' || this.$route.params.name === '0') {
        this.inventory.listType = 0
      } else if (this.$route.params.activeName === '1' || this.$route.params.name === '1') {
        this.inventory.listType = 1
      }
    },
    handleListType(val) {
      // console.log(val)
    },
    handleIssue(val) {
      // console.log(val)
      // this.issue = val
    },
    // 添加商品
    handleAddshop(inventory) {
      this.$refs[inventory].validate((valid) => {
        if (valid) {
          this.$refs.Goddsadd.getPageList(this.inventory)
          this.isMask = true
        } else {
          return false
        }
      })
    },
    // 省市区县
    handleChange(val) {
      console.log(val)
    },
    // 渠道
    handleChannel(val) {
      console.log(val)
    },
    handleMax(val) {
      // console.log(val.length)
      if (val.length >= this.maxLength) {
        this.$message.error('清单名称不超过15个字符')
      }
    },
    // 编辑的数据
    deatilTro() {
      const val = this.tyroCommon
      console.log(val)
      if (this.isEdit === 'edit') {
        this.inventory.name = val.freqPurchaseListName
        this.inventory.issue = Number(val.freqPurchaseListTo)
        this.inventory.provincesId = this.edtailProvince(val.freqPurchaseListBuId, val.freqPurchaseListProId, val.freqPurchaseListCityId, val.freqPurchaseListAreaId)
        this.inventory.channelId = this.edtailChannel(val.freqPurchaseListChannelId, val.freqPurchaseListSubChannelId)
        // this.inventory.detailList = val.freqPurchaseListProductVOs
        const aa = this.getAddGoods(val.freqPurchaseListProductVOs)
        console.log(aa)
        this.getListData(aa)
      }
    },
    // 编辑的数据
    getAddGoods(v) {
      const arr = []
      v.map(item => {
        arr.push(Number(item.freqPurchaseListProductId))
      })
      return arr
    },
    edtailProvince(a, b, c, d) {
      // console.log(a, b, c, d)
      const aa = a ? a.split(',') : []
      const bb = b ? b.split(',') : []
      const cc = c ? c.split(',') : []
      const dd = d ? d.split(',') : []
      const arr = []
      for (let i = 0; i < aa.length; i++) {
        arr.push([aa[i], bb[i], cc[i], dd[i]].map(Number))
      }
      return arr
    },
    edtailChannel(a, b) {
      const aa = a ? a.split(',') : []
      const bb = b ? b.split(',') : []
      const arr = []
      for (let i = 0; i < aa.length; i++) {
        arr.push([aa[i], bb[i]].map(Number))
      }
      return arr
    },
    getListData(aa) {
      request({
        url: '/products-service/products/manager/queryByskus',
        method: 'POST',
        data: aa
      }).then(resp => {
        console.log(resp)
        if (resp.code === 200) {
          this.inventory.detailList = resp.result
          this.$refs.Goddsadd.listData1 = resp.result
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 置顶
    handleStick(index) {
      const returnTop = this.inventory.detailList[index]
      this.inventory.detailList.splice(index, 1)
      this.inventory.detailList.unshift(returnTop)
    },
    // 删除
    handleRemove(index) {
      this.inventory.detailList.splice(index, 1)
    },
    handleClear(val) {
      localStorage.setItem('inventory', val.listType)
      this.$router.push({
        path: '/operate/list',
        query: {
          v: 1
        }
      })
    },
    // 确定
    handleSubmit(inventory) {
      const val = this.inventory
      this.$refs[inventory].validate((valid) => {
        if (valid) {
          if (val.detailList.length >= 1) {
            // 防止重复提交
            if (this.isPosting) return
            this.isPosting = true
            if (this.isEdit === 'new') {
              console.log('添加')
              request({
                url: '/business-entity-service/freqPurchaseList',
                method: 'POST',
                data: {
                  freqPurchaseListType: val.listType,
                  freqPurchaseListName: val.name,
                  freqPurchaseListTo: val.issue,
                  freqPurchaseListBuId: val.provincesId.map(item => item[0]).join(','),
                  freqPurchaseListProId: val.provincesId.map(item => item[1]).join(','),
                  freqPurchaseListCityId: val.provincesId.map(item => item[2]).join(','),
                  freqPurchaseListAreaId: val.provincesId.map(item => item[3]).join(','),
                  freqPurchaseListChannelId: val.channelId.map(item => item[0]).join(','),
                  freqPurchaseListSubChannelId: val.channelId.map(item => item[1]).join(','),
                  freqPurchaseListProductVOs:
              val.detailList.map(item => {
                return {
                  freqPurchaseListProductId: item.productSku,
                  freqPurchaseListProductName: item.name,
                  freqPurchaseListProductOrder: val.detailList.findIndex(it => it.id === item.id)
                }
              })
                }
              }).then(resp => {
                console.log(resp)
                localStorage.setItem('inventory', val.listType)
                if (resp.code === 200) {
                  this.$router.push({
                    path: '/operate/list',
                    query: {
                      v: 1
                    }
                  })
                  this.$message.success('清单创建成功')
                }
              }).catch(err => {
                console.log(err)
              })
            } else if (this.isEdit === 'edit') {
              console.log('编辑')
              request({
                url: '/business-entity-service/freqPurchaseList',
                method: 'PUT',
                data: {
                  id: this.tyroCommon.id,
                  freqPurchaseListType: val.listType,
                  freqPurchaseListName: val.name,
                  freqPurchaseListTo: val.issue,
                  freqPurchaseListBuId: val.provincesId.map(item => item[0]).join(','),
                  freqPurchaseListProId: val.provincesId.map(item => item[1]).join(','),
                  freqPurchaseListCityId: val.provincesId.map(item => item[2]).join(','),
                  freqPurchaseListAreaId: val.provincesId.map(item => item[3]).join(','),
                  freqPurchaseListChannelId: val.channelId.map(item => item[0]).join(','),
                  freqPurchaseListSubChannelId: val.channelId.map(item => item[1]).join(','),
                  freqPurchaseListProductVOs:
              val.detailList.map(item => {
                return {
                  id: item.id,
                  freqPurchaseListProductId: item.productSku,
                  freqPurchaseListProductName: item.name,
                  freqPurchaseListProductOrder: val.detailList.findIndex(it => it.id === item.id)
                }
              })
                }
              }).then(resp => {
                console.log(resp)
                localStorage.setItem('inventory', val.listType)
                if (resp.code === 200) {
                  this.$router.push({
                    path: '/operate/list',
                    query: {
                      v: 1
                    }
                  })
                  this.$message.success('更新成功')
                }
              }).catch(err => {
                console.log(err)
              })
            }
          } else {
            this.$message.error('请选择商品')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.inventory{
    padding:50px;
}
.el-table{
    img{
        width:100px;
        height:60px;
    }
td.gutter{
  width:100px !important;
display:block !important;
}
}

</style>
