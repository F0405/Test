<template>
  <div class="banneradd">
    <el-form
      ref="bannerForm"
      :model="bannerForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="资源位位置:" prop="place">
        <el-select v-model="bannerForm.place" placeholder="请选择资源位置" @change="handlePlace">
          <el-option
            v-for="(item, index) in placeList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-show="isShopShow" label="商品列表名称" prop="product">
        <el-input v-model="bannerForm.product" v-model.trim="bannerForm.product" placeholder="请输入商品列表名称" style="width:200px" />
      </el-form-item>
      <el-form-item v-show="!isActiveName && !isShopShow" label="资源位名称:" prop="name">
        <el-input v-model="bannerForm.name" v-model.trim="bannerForm.name" placeholder="请输入资源位名称" style="width:200px" />
      </el-form-item>
      <el-form-item v-show="!isShopShow" label="资源位投放时间:" prop="marketTime">
        <el-date-picker
          v-model="bannerForm.marketTime"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="timeChange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00','23:59:59']"
        />
      </el-form-item>
      <el-form-item v-show="!isActiveName && !isShopShow" label="图片:" prop="image">
        <imgUPload
          v-model="fileList"
          name="uploadFile"
          :auto-upload="true"
          :limit="1"
        />
        <div style="color:#999;marginLeft:35px">
          只能上传jpg/png文件，且不超过1MB
        </div>
      </el-form-item>
      <div v-show="!isShopShow">跳转设置</div>
      <div v-show="!isShopShow" style="paddingLeft: 30px" class="radioSele">
        <el-radio-group v-model="bannerForm.radio" @change="handleRadio">
          <el-radio
            v-show="!isActiveName"
            :label="1"
          >小程序内页面:
            <el-select
              v-show="isRadio"
              v-model="bannerForm.redirect"
              placeholder="请选择"
              @change="handleSelect"
            >
              <el-option
                v-for="(item, index) in pageType"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <el-button v-show="isShop && !bannerForm.listData.length" style="marginLeft:10px" @click="handleJump">选择要跳转的商品</el-button>
            <el-button v-show="isActive" @click="handleActivity">选择要跳转的活动</el-button>
          </el-radio>
          <el-radio v-show="!isActiveName" :label="0">不可跳转</el-radio>
          <el-radio v-show="isActiveName" :label="3">选择展示商品：
            <el-button :disabled="isDisableOne && bannerForm.redirect===3 " @click="handleJump">选择要跳转的商品</el-button>
            <div class="putaway">
              <el-radio-group v-model="putaway" :disabled="disabledSelect" class="putaway-redio" @change="handlePutaway">
                <el-radio label="1">上架</el-radio>
                <el-radio label="0">正在上架</el-radio>
              </el-radio-group>
            </div>
          </el-radio>
          <el-radio v-show="isActiveName" :label="2">选择展示活动：
            <el-button :disabled="isDisableTwo" @click="handleActivity">选择要跳转的活动</el-button>
            <div class="putaway">
              <el-radio-group v-model="putaway" :disabled="disabledActivity" class="putaway-redio" @change="handlePutaway">
                <el-radio label="1">上架</el-radio>
                <el-radio label="0">正在上架</el-radio>
              </el-radio-group>
            </div>
          </el-radio>
        </el-radio-group>
        <div v-if="bannerForm.listData.length > 0 && (bannerForm.redirect===1 || bannerForm.radio===3)" class="shopSele">
          <div>
            <img :src="bannerForm.listData[0].mainImgs.img1" alt="">
          </div>
          <div>
            <p>商品名称:{{ bannerForm.listData[0].name }}</p>
            <p>
              <span>商品政策编码:{{ bannerForm.listData[0].productSku }}</span>
              <span>商品售卖价:{{ '￥' + bannerForm.listData[0].price/100 }}</span>
            </p>
            <p>
              <span>城市区县: {{ showRegion(bannerForm.listData[0].provinceCode) }}
                {{ showRegion(bannerForm.listData[0].cityCode) }}
                {{ showRegion(bannerForm.listData[0].villageCode) }}</span>
              <span>渠道:{{ showChannel(bannerForm.listData[0].passageCode) }}</span>
              <span>子渠道:{{ showChannel(bannerForm.listData[0].childPassageCode) }}</span>
            </p>
          </div>
          <div>
            <el-button size="small" @click="handleAnew">重新选择</el-button>
          </div>
        </div>
        <div v-if="bannerForm.listData[0] && bannerForm.redirect===5" class="shopSeles">
          <div>
            <p>活动名称：{{ bannerForm.listData[0].activityName }}</p>
            <p>
              <span>活动编号：{{ bannerForm.listData[0].activityCode }}</span>
              <span>活动类型：{{ bannerForm.listData[0].activityType }}</span>
            </p>
            <p>
              <span>城市区县: {{ showRegion(bannerForm.listData[0].provinceCode) }}
                {{ showRegion(bannerForm.listData[0].cityCode) }}
                {{ showRegion(bannerForm.listData[0].villageCode) }}</span>
              <span>渠道:{{ showChannel(bannerForm.listData[0].passageCode) }}</span>
              <span>子渠道:{{ showChannel(bannerForm.listData[0].childPassageCode) }}</span>
            </p>
          </div>
          <div>
            <el-button size="small" @click="handleAnew">重新选择</el-button>
          </div>
        </div>
      </div>
      <div v-show="!isShopShow">发布设置</div>
      <el-form-item label="发布对象:" prop="issueobj">
        <el-select v-model="bannerForm.issueobj" placeholder="请选择">
          <el-option
            v-for="(item, index) in issueList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发布城市区县:" prop="county">
        <el-cascader
          ref="provincesVal"
          v-model="bannerForm.provincesId"
          collapse-tags
          :options="optionRegion"
          :props="{multiple:true}"

          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="发布渠道:" prop="channel">
        <el-cascader
          ref="channelVal"
          v-model="bannerForm.channelId"
          collapse-tags
          :options="opetionChannel"
          :props="{multiple:true}"

          @change="handleChannel"
        />
      </el-form-item>
      <el-form-item v-show="isShopShow" label="选择清单内商品" style="marginTop:80px" prop="listshop">
        <el-button plain type="primary" @click="handleGoodsAdd('bannerForm')">添加商品</el-button>
        <el-table
          border
          :data="bannerForm.listData"
          style="width:60%;marginTop:20px"
          height="350"
        >
          <el-table-column label="商品图" align="center">
            <template slot-scope="{row}">
              <img :src="row.mainImgs.img1" alt="">
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name" show-overflow-tooltip align="center" />
          <el-table-column label="商品政策编码" prop="productSku" show-overflow-tooltip align="center" />
          <el-table-column label="商品售卖价" prop="price" show-overflow-tooltip align="center">
            <template slot-scope="{row}">
              {{ '￥' + row.price/100 }}
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

      <el-form-item>
        <div class="banner-bottom">
          <el-button @click="handleCancel(bannerForm)">取消</el-button>
          <el-button type="primary" @click="handleSubmit(bannerForm)">提交</el-button>
        </div>
      </el-form-item>
    </el-form>
    <!-- 选择要跳转的商品 -->
    <div v-show="isJump">
      <Jumpgoods ref="Jumpgoods" />
    </div>
    <div v-show="isMask">
      <Goodsadd ref="Goodsadd" />
    </div>
    <el-dialog
      :visible.sync="isGetBack"
      :close-on-click-modal="false"
      width="30%"
      center
      top="35vh"
    >
      <div class="dialog-con">
        <p v-show="isEdit==='new'">资源位创建成功</p>
        <p v-show="isEdit==='edit'">资源位编辑成功</p>
        <p>{{ Rtime }}秒后返回资源位配置</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleGetback">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Jumpgoods from './jumpgoods.vue'
import Goodsadd from './goodsAdd.vue'
import { mapState, mapGetters } from 'vuex'
import request from '@/utils/request'
import imgUPload from '@/components/imgUpload/imgUpload'
import { ChannelRepeat, RegionRepeat } from '@/utils/structure.js'
const placeList = [
  {
    id: 0,
    name: '首页顶部'
  },
  {
    id: 1,
    name: '首页中部通栏'
  },
  {
    id: 2,
    name: '商品列表通栏'
  },
  {
    id: 3,
    name: '注册页资源位'
  },
  {
    id: 4,
    name: '登录页资源位'
  },
  {
    id: 5,
    name: 'M1分享图'
  },
  {
    id: 6,
    name: '首页营销位'
  },
  {
    id: 7,
    name: '首页商品位'
  }]

export default {
  components: {
    Jumpgoods,
    Goodsadd,
    imgUPload
  },
  data() {
    return {
      bannerForm: {
        place: '',
        name: '',
        marketTime: '',
        redirect: '',
        url: '',
        radio: '',
        issueobj: '',
        provincesId: '',
        channelId: '',
        product: '',
        listData: []
      },
      isRadio: false,
      isShop: false,
      isActive: false,
      isMask: false,
      disabledSelect: true,
      disabledActivity: true,
      placeList,
      putaway: '',
      nowputaway: '',
      issueList: [{ value: 0, label: '售点' }],
      fileList: [],
      rules: {
        product: [
          { required: true, message: '请输入商品列表名称', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '请选择资源位位置', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入资源位名称', trigger: 'blur' }
        ],
        marketTime: [
          { required: true, message: '请选择资源位投放时间', trigger: 'blur' }
        ],
        // image: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        issueobj: [
          { required: true, message: '请选择发布对象', trigger: 'blur' }
        ],
        county: [
          { required: true, message: '请选择发布对象', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择渠道', trigger: 'blur' }
        ],
        shoplist: [
          { required: true, message: '请输入商品列表名称', trigger: 'blur' }
        ],
        listshop: [
          { required: true, message: '请选择商品清单', trigger: 'blur' }
        ]
      },
      isJump: false,
      flag: true,
      isDailog: false,
      isActiveName: false,
      isDisableOne: true,
      isDisableTwo: true,
      isShopShow: false,
      isGetBack: false,
      Rtime: 5,
      timeChange: {
        disabledDate(date) {
          // 当天可选：date.getTime() < Date.now() - 24 * 60 * 60 * 1000 //date.getTime() < Date.now()
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      }
    }
  },
  computed: {
    ...mapState('detail', ['homeToplist']),
    ...mapState('dispose', ['pageType', 'activeTab']),
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'areaMap', 'channelMap', 'optionRegion', 'regionMap']),
    isEdit() {
      return this.$route.query.type
    }
  },
  created() {
    this.isActives()
    this.handleIsComplie()
  },
  mounted() {
    if (this.isEdit === 'edit' && !this.homeToplist.id) {
      this.$router.push('/config/resource')
    }
    console.log(this.isEdit)
  },
  methods: {
    // 渠道
    showChannel(v) {
      return ChannelRepeat(v, this.channelMap)
    },
    // 区域
    showRegion(v) {
      return RegionRepeat(v, this.regionMap)
    },
    isActives() {
      if (this.$route.params.activeName === '0') {
        this.bannerForm.place = 0
        this.isActiveName = false
      } else if (this.$route.params.activeName === '1') {
        this.isActiveName = false
        this.bannerForm.place = 1
      } else if (this.$route.params.activeName === '2') {
        this.isActiveName = false
        this.bannerForm.place = 2
      } else if (this.$route.params.activeName === '3') {
        this.isActiveName = false
        this.bannerForm.place = 3
      } else if (this.$route.params.activeName === '4') {
        this.isActiveName = false
        this.bannerForm.place = 4
      } else if (this.$route.params.activeName === '5') {
        this.bannerForm.place = 5
        this.isActiveName = false
      } else if (this.$route.params.activeName === '6') {
        this.bannerForm.place = 6
        this.isActiveName = true
        this.isShopShow = false
      } else if (this.$route.params.activeName === '7') {
        this.bannerForm.place = 7
        this.isActiveName = false
        this.isShopShow = true
      }
    },
    handlePlace(val) {
      if (val === 0 || val === 1 || val === 2 || val === 3 || val === 4 || val === 5) {
        this.isActiveName = false
        this.isShopShow = false
        this.bannerForm.listData = []
        this.bannerForm.redirect = ''
        this.bannerForm.radio = ''
        this.bannerForm.provincesId = ''
        this.bannerForm.channelId = ''
      } else if (val === 6) {
        this.isActiveName = true
        this.isShopShow = false
        this.bannerForm.listData = []
        this.bannerForm.redirect = ''
        this.bannerForm.radio = ''
        this.bannerForm.provincesId = ''
        this.bannerForm.channelId = ''
      } else if (val === 7) {
        this.isShopShow = true
        this.isActiveName = false
        this.bannerForm.listData = []
        this.bannerForm.redirect = ''
        this.bannerForm.radio = ''
        this.bannerForm.provincesId = ''
        this.bannerForm.channelId = ''
      }
    },
    // 编辑数据
    handleIsComplie() {
      const val = this.homeToplist
      console.log(val)
      // console.log(val.bannerToDTOS)
      if (this.isEdit === 'edit') {
        this.bannerForm.name = val.bannerName
        this.bannerForm.marketTime = val.bannerStartTime ? [val.bannerStartTime, val.bannerEndTime] : null
        this.bannerForm.issueobj = this.edtailIssue(val.bannerToDTOS)
        this.bannerForm.provincesId = this.edtailProvince(val.bannerRegionDTOS)
        this.bannerForm.channelId = this.edtailChannel(val.bannerChannelDTOS)
        this.bannerForm.product = val.bannerProductListName
        this.fileList = val.bannerPicUrl ? val.bannerPicUrl.split(',') : []
        // this.handleRadio()
        const aa = this.getJumpGoods(val.bannerProductId)
        this.getListData(aa)
        this.bannerForm.redirect = val.innerPageType
        this.bannerForm.radio = val.bannerForwardType
        this.bannerForm.isActiveName = false
        this.isRadio = true
      }
    },
    edtailProvince(v) {
      const aa = []
      const bb = []
      const cc = []
      const dd = []
      const arr = []
      v.map(item => {
        aa.push(item.bannerBuId)
        bb.push(item.bannerProId)
        cc.push(item.bannerCityId)
        dd.push(item.bannerAreaId)
      })
      for (let i = 0; i < aa.length; i++) {
        arr.push([aa[i], bb[i], cc[i], dd[i]].map(Number))
      }
      // console.log(arr)
      return arr
    },
    edtailChannel(v) {
      const aa = []
      const bb = []
      const arr = []
      v.map(item => {
        aa.push(item.bannerChannelId)
        bb.push(item.bannerSubChannelId)
      })
      for (let i = 0; i < aa.length; i++) {
        arr.push([aa[i], bb[i]].map(Number))
      }
      return arr
    },
    edtailIssue(v) {
      let iss = null
      v.map(item => {
        iss = item.bannerToId
      })
      return Number(iss)
    },
    getJumpGoods(v) {
      const arr = []
      v.split(',').map(item => {
        arr.push(item.split('-')[0] * 1)
      })
      console.log(arr)
      return arr
    },
    // 查询编辑商品
    getListData(aa) {
      request({
        url: '/products-service/products/manager/queryByskus',
        method: 'POST',
        data: aa
      }).then(resp => {
        // console.log(resp)
        if (resp.code === 200) {
          this.bannerForm.listData = resp.result
          this.$refs.Goodsadd.listData1 = resp.result
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 跳转小程序内
    handleRadio(val) {
      // console.log(val)
      if (this.bannerForm.radio === 1) {
        this.isRadio = true
        // this.isShop = true
        // this.isDisableOne = true
        // this.bannerForm.redirect = 1
      } else if (this.bannerForm.radio === 3) {
        this.disabledSelect = false
        this.disabledActivity = true
        this.isDisableOne = false
        this.isDisableTwo = true
        this.flag = true
      } else if (this.bannerForm.radio === 2) {
        this.disabledSelect = true
        this.disabledActivity = false
        this.isDisableOne = true
        this.isDisableTwo = false
        this.flag = false
      } else {
        this.isRadio = false
        this.isShop = false
        this.isActive = false
        this.bannerForm.redirect = ''
        this.disabledSelect = true
        this.disabledActivity = true
      }
    },
    handlePutaway(val) {
      console.log(val)
    },
    handleSelect(val) {
      console.log(val)
      if (val === 1) {
        this.isShop = true
        this.isActive = false
      } else if (val === 5) {
        this.isShop = false
        this.isActive = true
      } else {
        this.isShop = false
        this.isActive = false
      }
    },
    // 添加商品
    handleGoodsAdd() {
      // this.isMask = true
      this.$refs.Goodsadd.getPageList(this.bannerForm)
      console.log(this.bannerForm)
      const val = this.bannerForm
      if (val.product) {
        if (val.issueobj === 0) {
          if (val.provincesId.length > 0) {
            if (val.channelId.length > 0) {
              this.isMask = true
            } else {
              this.$message.error('请选择发布渠道')
            }
          } else {
            this.$message.error('请选择发布城市区县')
          }
        } else {
          this.$message.error('请选择商品对象')
        }
      } else {
        this.$message.error('请输入商品列表名称')
      }
    },
    // 置顶
    handleStick(index) {
      const returnTop = this.bannerForm.listData[index]
      this.bannerForm.listData.splice(index, 1)
      this.bannerForm.listData.unshift(returnTop)
    },
    // 删除
    handleRemove(index) {
      this.bannerForm.listData.splice(index, 1)
    },
    // 取消
    handleCancel(val) {
      localStorage.setItem('activeName', val.place.toString())
      this.$router.push({
        path: '/config/resource',
        query: {
          v: 1
        }
      })
    },
    // 添加提交
    submitNew(val) {
      request({
        url: '/business-entity-service/banner',
        method: 'POST',
        data: {
          bannerLocation: val.place,
          bannerName: val.name,
          bannerPicUrl: this.fileList[0] ? this.fileList[0] : '',
          bannerForwardType: val.radio,
          innerPageType: val.redirect,
          bannerStartTime: val.marketTime[0],
          bannerEndTime: val.marketTime[1],
          bannerActivityName: 1,
          bannerProductListName: val.product,
          bannerProductId:
            (val.listData.length > 0 ? val.listData : []).map(item => {
              let str = ''
              const aa = `${item.productSku}-${val.listData.findIndex(it => it.id === item.id)}`
              for (var i = 0; i < aa.length; i++) {
                str += aa[i]
              }
              return str
            }).join(','),
          bannerChannelDTOS:
              (val.channelId.length > 0 ? val.channelId : []).map(item => {
                return {
                  bannerChannelId: item[0],
                  bannerSubChannelId: item[1] }
              }),
          bannerRegionDTOS:
              (val.provincesId.length > 0 ? val.provincesId : []).map(item => {
                return {
                  bannerBuId: item[0],
                  bannerProId: item[1],
                  bannerCityId: item[2],
                  bannerAreaId: item[3] }
              }),
          bannerToDTOS: [{
            bannerToId: val.issueobj
          }],
          bannerProductName: (val.place === 6 && val.radio === 3)
            ? (val.listData.length > 0 ? val.listData : []).map(item => {
              return item.name
            }).join(',') : null
        }
      }).then(resp => {
        console.log(resp)
        localStorage.setItem('activeName', val.place.toString())

        if (resp.code === 200) {
          this.isGetBack = true
          setInterval(() => {
            this.Rtime--
            if (this.Rtime === 0) {
              this.isGetBack = false
              this.$router.push({
                path: '/config/resource',
                query: {
                  v: 1
                }
              })
            }
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 提交
    handleSubmit(val) {
      // this.isDailog = true
      // console.log(this.$route.params.activeName)
      console.log(val.place)
      if (this.isEdit === 'new') {
        console.log(val.place)
        if (val.place === 0 || val.place === 1 || val.place === 2 || val.place === 3 || val.place === 4 || val.place === 5) {
          if (val.name) {
            if (val.marketTime.length > 0) {
              if (val.radio === 0 || val.radio) {
                if (val.redirect === 0 || val.redirect) {
                  this.submitNew(val)
                } else {
                  this.$message.error('请选择跳转目标类型')
                }
              } else {
                this.$message.error('请设置跳转')
              }
            } else {
              this.$message.error('请选择投放时间')
            }
          } else {
            this.$message.error('请输入资源位名称')
          }
        } else {
          if (val.place === 6) {
            if (val.marketTime.length > 0) {
              if (val.radio === 0 || val.radio) {
                this.submitNew(val)
              } else {
                this.$message.error('请设置跳转')
              }
            } else {
              this.$message.error('请选择投放时间')
            }
          } else {
            // this.$message.error('请选择资源位位置')
          }
        }
        if (val.place === 7) {
          if (val.product) {
            if (val.issueobj === 0) {
              if (val.provincesId.length > 0) {
                if (val.channelId.length > 0) {
                  this.submitNew(val)
                } else {
                  this.$message.error('请选择发布渠道')
                }
              } else {
                this.$message.error('请选择发布城市区县')
              }
            } else {
              this.$message.error('请选择商品对象')
            }
          } else {
            this.$message.error('请输入商品列表名称')
          }
        }
      } else if (this.isEdit === 'edit') {
        console.log('编辑')
        request({
          url: '/business-entity-service/banner',
          method: 'PUT',
          data: {
            id: this.homeToplist.id,
            bannerLocation: val.place,
            bannerName: val.name,
            bannerPicUrl: this.fileList[0] ? this.fileList[0] : (val.listData.length > 0 ? val.listData[0].mainImgs.img1 : ''),
            bannerForwardType: val.radio,
            innerPageType: val.redirect,
            bannerStartTime: val.marketTime ? val.marketTime[0] : null,
            bannerEndTime: val.marketTime ? val.marketTime[1] : null,
            bannerActivityName: 1,
            bannerProductListName: val.product,
            bannerProductId:
            (val.listData.length > 0 ? val.listData : []).map(item => {
              let str = ''
              const aa = `${item.productSku}-${val.listData.findIndex(it => it.id === item.id)}`
              for (var i = 0; i < aa.length; i++) {
                str += aa[i]
              }
              return str
            }).join(','),
            bannerChannelDTOS:
              val.channelId.map(item => {
                return {
                  bannerChannelId: item[0],
                  bannerSubChannelId: item[1] }
              }),
            bannerRegionDTOS:
              val.provincesId.map(item => {
                return {
                  bannerBuId: item[0],
                  bannerProId: item[1],
                  bannerCityId: item[2],
                  bannerAreaId: item[3] }
              }),
            bannerToDTOS: [{
              bannerToId: val.issueobj
            }],
            bannerProductName: (val.place === 6 && val.radio === 3)
              ? (val.listData.length > 0 ? val.listData : []).map(item => {
                return item.name
              }).join(',') : null

          }
        }).then(resp => {
          console.log(resp)
          this.isGetBack = true
          localStorage.setItem('activeName', val.place.toString())
          if (resp.code === 200) {
            setInterval(() => {
              this.Rtime--
              if (this.Rtime === 0) {
                this.isGetBack = false
                this.$router.push({
                  path: '/config/resource',
                  query: {
                    v: 1
                  }
                })
              }
            }, 1000)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 选择跳转商品
    handleJump() {
      console.log('商品')
      this.isJump = true
      this.flag = true
    },
    handleActivity() {
      console.log('活动')
      this.isJump = true
      this.flag = false
    },
    handleAnew() {
      this.bannerForm.listData = []
      this.isJump = true
    },
    // 返回
    handleGoback() {
      this.isDailog = false
      this.$router.push('/config/resource')
    },
    // 返回页面
    handleGetback() {
      this.isGetBack = false
      this.$router.push('/config/resource')
    },
    // 省市区县
    handleChange(val) {
      console.log(val)
      this.bannerForm.provincesId = val
      console.log(val.map(item => item[0]))
      // this.$refs['provincesVal'].getCheckedNodes().map(item => item.data)
    },
    // 渠道
    handleChannel(val) {
      console.log(val)
      this.bannerForm.channelId = val
      // this.bannerForm.channelVal = this.$refs['channelVal'].getCheckedNodes()[0].pathLabels
      // console.log(this.bannerForm.channelVal)
    }

  }
}
</script>

<style lang="less" scoped>
.banneradd {
  width: 100%;
  padding-left: 50px;
  padding-top: 50px;
  .el-form {
    width: 100%;
    .upload-demo {
      width: 200px;
    }
    .el-input {
      width: 400px;
    }
  }
}
.el-radio-group {
  position: relative;
  display: flex;
  flex-direction: column;
  .el-radio {
    height: 100px;
    line-height: 50px;
  }
  .putaway{
    position: absolute;
    .putaway-redio{
      display: flex;
      justify-content: space-around;
       .el-radio {
          height: 50px;
          line-height: 50px;
          float: right;
          position: absolute;
          margin-left:100px;
          top: 0px;
          &:nth-child(2){
            margin-left:200px;
          }
        }
    }
  }
}
.radioSele {
  display: flex;
  .shopSele {
    img {
      width: 120px;
      height: 100px;
      padding:10px;
    }
    width: 600px;
    height: 100px;
    border: solid 1px #ccc;
    display: flex;
    justify-content: space-between;
    div {
      &:nth-child(1){
        width:100px;
      }
      &:nth-child(2){
        width:400px;
        p {
          font-size: 12px;
          span{
            display: inline-block;
            margin-right:30px;
          }
        }
      }
      &:nth-child(3){
        position: relative;
        .el-button{
          position: absolute;
          bottom:10px;
          right: 10px;
          z-index: 99;
        }
      }
    }
  }
}
.shopSeles{
   width: 600px;
    height: 100px;
    border: solid 1px #ccc;
    display: flex;
    justify-content: space-between;
    padding:0 20px;
    div{
      &:nth-child(1){
        width:90%;
        p{
          font-size: 12px;
          span{
            display: inline-block;
            margin-right:30px;
          }
        }
      }
      &:nth-child(2){
        flex: 1;
        position: relative;
        .el-button{
          position: absolute;
          bottom:10px;
          right: 10px;
          z-index: 99;
        }
      }
    }
}
.maskJump {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.banner-bottom{
  // position: absolute;
  // bottom:20px;
  // right:40%;
  margin-top: 50px;
  margin-left: 40%;
}
.el-table{
    img{
        width:100px;
        height:60px;
    }
}
.dialog-con{
 p{
   text-align: center;
 }
}
</style>
