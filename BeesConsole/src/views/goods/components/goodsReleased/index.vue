<template>
  <div class="creation-mngmt">
    <el-steps
      :active="active"
      align-center
      finish-status="finish"
      process-status="finish"
    >
      <el-step title="基本信息" />
      <el-step title="其他信息" />
      <el-step title="确定信息" />
    </el-steps>
    <!-- 第一步 -->
    <el-form
      ref="releasedForm"
      :model="releasedForm"
      :rules="releasedRules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <div v-show="active === 0" class="astiveForm">
        <div class="title">
          <b>商品基本信息</b>
        </div>
        <el-form-item label="关联商品档案：" prop="record">
          <el-select v-model="releasedForm.record" filterable placeholder="请选择" :filter-method="handleSearch" @change="handleChangeShop">
            <el-option
              v-for="(item, ind) in archivesList"
              :key="ind"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品SKU编码：" prop="skuCode">
          <el-input v-model="releasedForm.skuCode" disabled placeholder="选择档案后编码自动获取" />
        </el-form-item>
        <el-form-item label="商品ERP SKU编码：" prop="erpSkuCode">
          <el-input v-model="releasedForm.erpSkuCode" disabled placeholder="选择档案后编码自动获取" />
        </el-form-item>
        <el-form-item label="商品SAP SKU编码：" prop="sapSku">
          <el-input v-model="releasedForm.sapSku" disabled placeholder="选择档案后编码自动获取" />
        </el-form-item>
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="releasedForm.name" disabled placeholder="选择档案后编码自动获取" />
        </el-form-item>
        <el-form-item label="商品规格：" prop="spec">
          <el-input v-model="releasedForm.spec" disabled placeholder="选择档案后自动获取" />
        </el-form-item>
        <el-form-item label="商品品牌：" prop="productsBrandId">
          <el-select
            v-model="releasedForm.productsBrandId"
            placeholder="选择档案后自动获取"
            disabled
          >
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品子品牌：" prop="subProductsBrandId">
          <el-select
            v-model="releasedForm.subProductsBrandId"
            placeholder="选择档案后自动获取"
            disabled
          >
            <el-option
              v-for="item in SubBrandList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label=" 商品单位：" prop="productsUnitId">
          <el-input v-model="releasedForm.productsUnitId" disabled placeholder="选择档案后自动获取" />
        </el-form-item>
        <el-form-item label="商品分类：" prop="goodsClassifyId">
          <div>
            <el-select v-model="releasedForm.goodsClassifyId" placeholder="请选择">
              <el-option
                v-for="(item, ind) in classifyList"
                :key="ind"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <!-- <el-button @click="handleFilter">添加分类</el-button> -->
          </div>
        </el-form-item>
        <el-form-item label="可售库存" prop="stock">
          <el-input v-model="releasedForm.stock" :onkeyup="handleKepStock(releasedForm.stock)" placeholder="可取显示库存充足，设定无限大" />
        </el-form-item>
        <div class="title">
          <b>SAP价格</b>
        </div>
        <el-form-item label="PTR" prop="ptr">
          <div class="active">
            <el-input v-model="releasedForm.ptr" placeholder="选择档案后，规格自动获取" disabled />
          </div>
        </el-form-item>
        <div class="title">
          <b>商品价格设置</b>
        </div>
        <el-form-item label="商品售卖价格" prop="salePrice">
          <div class="active">
            <el-input v-model="releasedForm.salePrice" :oninput="handleKep(releasedForm.salePrice)" placeholder="请输入标准售价" />
          </div>
        </el-form-item>
        <div class="title">
          <b>商品图片</b>
        </div>
        <el-form-item
          label="商品主图："
          label-position="right"
          style="marginLeft:15px"
          prop="mainImageUrls"
        >
          <imgUPload
            v-model="releasedForm.mainImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="3"
          />
          <div class="writer">
            {{ imageCon.mainCon }}
          </div>
        </el-form-item>
        <el-form-item
          label="商品详情图："
          label-position="right"
          style="marginLeft:15px"
          prop="detailImageUrls"
        >
          <imgUPload
            v-model="releasedForm.detailImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="3"
          />
          <div class="writer">
            {{ imageCon.detailCon }}
          </div>
        </el-form-item>
        <el-form-item
          label="商品分享图："
          label-position="right"
          style="marginLeft:15px"
        >
          <imgUPload
            v-model="releasedForm.shareImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="1"
          />
          <div class="writer">
            {{ imageCon.shareCon }}
          </div>
        </el-form-item>
      </div>
      <!-- 第二步 -->
      <div v-show="active === 1" class="astiveForm">

        <div class="title">
          <b>商品渠道</b>
        </div>
        <el-form-item label="省市区县:" prop="provinces">
          <el-cascader
            ref="provincesVal"
            v-model="releasedForm.provincesId"
            :options="optionRegion"
            collapse-tags
            :props="{multiple:true}"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="渠道子渠道：" prop="channel">
          <el-cascader
            ref="channelVal"
            v-model="releasedForm.channelId"
            :options="opetionChannel"
            collapse-tags
            :props="{multiple:true}"
            @change="handleChannel"
          />
        </el-form-item>
        <div class="title">
          <b>其他商品信息</b>
        </div>
        <el-form-item label="保质期：" prop="expiration">
          <div class="active">
            <el-input v-model="releasedForm.expiration" placeholder="请输入保质期" />
            <div style="width:35px;height:35px;textAlign:center;lineHeight:35px;border:solid 1px #ccc">天</div>
          </div>
        </el-form-item>
        <el-form-item label="卖点：" prop="selling">
          <el-input v-model="releasedForm.selling" maxlength="60" placeholder="请输入卖点" @input="handleMax" />
        </el-form-item>
        <p style="color:#666;marginLeft:150px">在商品详情页标题下面展示卖点信息，建议60字以内</p>
      </div>
      <!-- 第三步 -->
      <div v-show="active === 2" class="astiveForm">

        <div class="title">
          <b>商品基本信息</b>
        </div>
        <el-form-item label="关联商品档案：" prop="record">
          <el-select v-model="releasedForm.record" filterable placeholder="请选择" :filter-method="handleSearch" @change="handleChangeShop">
            <el-option
              v-for="(item, ind) in archivesList"
              :key="ind"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品SKU编码：" prop="skuCode">
          <el-input v-model="releasedForm.skuCode" disabled placeholder="选择档案后编码自动获取" />
        </el-form-item>
        <el-form-item label="商品ERP SKU编码：" prop="erpSkuCode">
          <el-input v-model="releasedForm.erpSkuCode" disabled placeholder="选择档案后编码自动获取" />
        </el-form-item>
        <el-form-item label="商品SAP SKU编码：" prop="sapSku">
          <el-input v-model="releasedForm.sapSku" disabled placeholder="选择档案后编码自动获取" />
        </el-form-item>
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="releasedForm.name" disabled placeholder="选择档案后编码自动获取" />
        </el-form-item>
        <el-form-item label="商品规格：" prop="spec">
          <el-input v-model="releasedForm.spec" disabled placeholder="选择档案后自动获取" />
        </el-form-item>
        <el-form-item label="商品品牌：" prop="productsBrandId">
          <el-select
            v-model="releasedForm.productsBrandId"
            placeholder="选择档案后自动获取"
            disabled
          >
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品子品牌：" prop="subProductsBrandId">
          <el-select
            v-model="releasedForm.subProductsBrandId"
            placeholder="选择档案后自动获取"
            disabled
          >
            <el-option
              v-for="item in SubBrandList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label=" 商品单位：" prop="productsUnitId">
          <el-input v-model="releasedForm.productsUnitId" disabled placeholder="选择档案后自动获取" />
        </el-form-item>
        <el-form-item label="商品分类：" prop="goodsClassifyId">
          <div class="active">
            <el-select v-model="releasedForm.goodsClassifyId" placeholder="请选择">
              <el-option
                v-for="(item, ind) in classifyList"
                :key="ind"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <!-- <el-button @click="handleFilter">添加分类</el-button> -->
          </div>
        </el-form-item>
        <el-form-item label="可售库存" prop="stock">
          <el-input v-model="releasedForm.stock" :onkeyup="handleKepStock(releasedForm.stock)" placeholder="可取显示库存充足，设定无限大" />
        </el-form-item>
        <div class="title">
          <b>SAP价格</b>
        </div>
        <el-form-item label="PTR" prop="ptr">
          <div class="active">
            <el-input v-model="releasedForm.ptr" placeholder="选择档案后，规格自动获取" disabled />
            <!-- <el-select v-model="ptrVal" placeholder="箱" class="selects">
              <el-option
                v-for="(item, ind) in brandUnitList"
                :key="ind"
                :label="item.name"
                :value="item.id"
              />
            </el-select> -->
          </div>
        </el-form-item>
        <div class="title">
          <b>商品价格设置</b>
        </div>
        <el-form-item label="商品售卖价格" prop="salePrice">
          <div class="active">
            <el-input v-model="releasedForm.salePrice" :oninput="handleKep(releasedForm.salePrice)" placeholder="请输入标准售价" />
            <!-- <el-select v-model="priceVal" placeholder="箱" class="selects">
              <el-option
                v-for="(item, ind) in brandUnitList"
                :key="ind"
                :label="item.name"
                :value="item.id"
              />
            </el-select> -->
          </div>
        </el-form-item>
        <div class="title">
          <b>商品图片</b>
        </div>
        <el-form-item
          label="商品主图："
          label-position="right"
          style="marginLeft:15px"
          prop="mainImageUrls"
        >
          <imgUPload
            v-model="releasedForm.mainImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="3"
          />
          <div class="writer">
            {{ imageCon.mainCon }}
          </div>
        </el-form-item>
        <el-form-item
          label="商品详情图："
          label-position="right"
          style="marginLeft:15px"
          prop="detailImageUrls"
        >
          <imgUPload
            v-model="releasedForm.detailImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="3"
          />
          <div class="writer">
            {{ imageCon.detailCon }}
          </div>
        </el-form-item>
        <el-form-item
          label="商品分享图："
          label-position="right"
          style="marginLeft:15px"
        >
          <imgUPload
            v-model="releasedForm.shareImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="1"
          />
          <div class="writer">
            {{ imageCon.shareCon }}
          </div>
        </el-form-item>
        <div class="title">
          <b>商品渠道</b>
        </div>
        <el-form-item label="省市区县:" prop="provinces">
          <el-cascader
            ref="provincesVal"
            v-model="releasedForm.provincesId"
            :options="optionRegion"
            collapse-tags
            :props="{multiple:true}"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="渠道子渠道：" prop="channel">
          <el-cascader
            ref="channelVal"
            v-model="releasedForm.channelId"
            :options="opetionChannel"
            collapse-tags
            :props="{multiple:true}"
            @change="handleChannel"
          />
        </el-form-item>
        <div class="title">
          <b>其他商品信息</b>
        </div>
        <el-form-item label="保质期：" prop="expiration">
          <div class="active">
            <el-input v-model="releasedForm.expiration" placeholder="请输入保质期" />
            <div style="width:35px;height:35px;textAlign:center;lineHeight:35px;border:solid 1px #ccc">天</div>
          </div>
        </el-form-item>
        <el-form-item label="卖点：" prop="selling">
          <el-input v-model="releasedForm.selling" maxlength="60" placeholder="请输入卖点" @input="handleMax" />
        </el-form-item>
        <p style="color:#666;marginLeft:150px">在商品详情页标题下面展示卖点信息，建议60字以内</p>

      </div>
      <el-form-item>
        <div class="activeBottom">
          <el-button v-show="!isPrev" @click="prev">上一步</el-button>
          <el-button v-show="isActive" @click="getback">返回</el-button>
          <el-button @click="saveDraft(releasedForm)">保存草稿</el-button>
          <el-button v-show="isNext" @click="next('releasedForm')">下一步</el-button>
          <el-button v-show="isActive" @click="subStore(releasedForm)">发布商城</el-button>
        </div>
      </el-form-item>
    </el-form>

    <el-dialog
      :visible.sync="isGetBack"
      :close-on-click-modal="false"
      width="30%"
      center
      top="35vh"
    >
      <div class="dialog-con">
        <p v-show="isEdit=== 'edit' && isSaveDraft===false">商品档案已发布到商城</p>
        <p v-show="isEdit=== 'new'">商品档案已发布到商城</p>
        <p v-show="isSaveDraft">商品档案已保存为草稿</p>
        <p>{{ Rtime }}秒返回商品列表</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleGetback">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapState, mapActions, mapGetters } from 'vuex'
import imgUPload from '@/components/imgUpload/imgUpload'
export default {
  components: {
    imgUPload
  },
  data() {
    return {
      active: 0,
      Rtime: 5,
      releasedForm: {
        id: '',
        record: '',
        skuCode: '',
        erpSkuCode: '',
        sapSku: '',
        name: '',
        spec: '',
        productsBrandId: '',
        subProductsBrandId: '',
        productsUnitId: '',
        goodsClassifyId: '',
        stock: null,
        ptr: null,
        salePrice: null,
        mainImageUrls: [], // 商品主图
        detailImageUrls: [], // 商品详情图
        shareImageUrls: [], // 商品分享图
        expiration: '',
        selling: '',
        sortord: '',
        provincesId: [],
        channelId: []
      },
      img1: {},
      img2: {},
      img3: {},
      ptrVal: '',
      priceVal: '',
      recordList: [],
      imgActive: 0,
      mainImageUrl: '',
      detailImageUrl: '',
      shareImageUrl: '',
      mainDialogVisible: false,
      detailDialogVisible: false,
      shareDialogVisible: false,
      releasedRules: {
        record: [{ required: true, message: '请选择关联档案', trigger: 'blur' }],
        mainImageUrls: [{ required: true, message: '请至少上传一张商品主图', trigger: 'blur' }],
        detailImageUrls: [{ required: true, message: '请至少上传一张商品详情图', trigger: 'blur' }],
        goodsClassifyId: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
        salePrice: [{ required: true, message: '请输入标准售价', trigger: 'blur' }],
        stock: [{ required: true, message: '请输入可售库存', trigger: 'blur' }]
        // provinces: [{ required: true, message: '请选择省市区', trigger: 'blur' }],
        // channel: [{ required: true, message: '请选择渠道', trigger: 'blur' }]
      },
      isSave: true,
      isPrev: true,
      isNext: true,
      isActive: false,
      disabled: false,
      isGetBack: false,
      isSaveDraft: false,
      query: {
        current: 1,
        size: 10
      },
      archivesList: [],
      SubBrandList: []
    }
  },
  computed: {
    ...mapGetters('structure', ['optionArea', 'opetionChannel', 'optionRegion', 'regionMap']),
    ...mapState('goods', ['archives', 'brandList', 'brandUnitList', 'classifyList', 'detailBrand', 'publishEdit', 'imageCon']),
    isEdit() {
      return this.$route.query.type
    }
  },
  created() {
    this.getarChivesList({
      current: this.query.current,
      size: this.query.size
    })
    this.getBrandUnit()
    this.getClassify()
    this.getIssue()
    this.getArchives()
    this.getCopyGoods()
  },
  mounted() {
    if ((this.isEdit === 'edit' && !this.publishEdit.id) || (this.isEdit === 'copy' && !this.publishEdit.id)) {
      this.$router.push('/products/publish')
    }
  },
  methods: {
    ...mapActions('goods', ['getarChivesList', 'getBrandUnit', 'getClassify', 'GoodsReleased', 'GoodsEditor', 'getProvinces', 'getChannel']),
    handleMax(val) {
      if (val.length >= 60) {
        this.$message.error('卖点详情不可以超过60个字符')
      }
    },
    // 价格输入限制
    handleKep(val) {
      var reg = /^\d+(\.\d{0,2})?$/
      if (val) {
        if (!reg.test(val)) {
          this.$message.error('只能输入数字和两位小数')
          this.releasedForm.salePrice = ''
        }
      }
    },
    handleKepStock(v) {
      var reg = /^(0|\+?[1-9][0-9]*)$/
      if (v) {
        if (!reg.test(v)) {
          this.$message.error('只能输入正整数')
          this.releasedForm.stock = ''
        }
      }
    },
    getSubBrandList() {
      request({
        url: '/products-service/products/manager/queryProductsBrand',
        method: 'GET',
        params: {
          level: 1
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
    // 编辑详情
    getIssue() {
      const row = this.publishEdit
      console.log(row)
      if (this.isEdit === 'edit') {
        this.active = 2
        this.isActive = true
        this.isPrev = true
        this.isNext = false
        this.isSave = false
        this.releasedForm.id = row.id
        this.releasedForm.record = row.baseId
        this.releasedForm.skuCode = row.baseSku
        this.releasedForm.erpSkuCode = row.erpSku
        this.releasedForm.sapSku = row.sapSku
        this.releasedForm.name = row.name
        this.releasedForm.spec = row.spec
        this.releasedForm.productsBrandId = row.brandName
        this.releasedForm.subProductsBrandId = row.childBrandName
        this.releasedForm.productsUnitId = row.unitName
        this.releasedForm.ptr = row.ptr ? (row.ptr * 1) / 100 : ''
        this.releasedForm.mainImageUrls = this.pictureImg(Object.values(row.mainImgs))
        this.releasedForm.detailImageUrls = this.pictureImg(Object.values(row.detailImgs))
        this.releasedForm.shareImageUrls = this.pictureImg(Object.values(row.shareImgs))[0] ? [row.shareImgs.img1] : []
        this.releasedForm.goodsClassifyId = row.categoryId
        this.releasedForm.stock = row.stock ? row.stock : ''
        this.releasedForm.salePrice = row.price ? (row.price * 1) / 100 : ''
        this.releasedForm.provincesId = this.edtailProvince(row.buCode, row.provinceCode, row.cityCode, row.villageCode)
        this.releasedForm.channelId = this.edtailChannel(row.passageCode, row.childPassageCode)
        this.releasedForm.expiration = row.validDay ? row.validDay : null
        this.releasedForm.selling = row.salePoint ? row.salePoint : null
      }
    },
    getCopyGoods() {
      const row = this.publishEdit
      if (this.isEdit === 'copy') {
        this.active = 2
        this.isActive = true
        this.isPrev = true
        this.isNext = false
        this.isSave = false
        this.releasedForm.id = row.id
        this.releasedForm.record = row.baseId
        this.releasedForm.skuCode = row.baseSku
        this.releasedForm.erpSkuCode = row.erpSku
        this.releasedForm.sapSku = row.sapSku
        this.releasedForm.name = row.name
        this.releasedForm.spec = row.spec
        this.releasedForm.productsBrandId = row.brandName
        this.releasedForm.subProductsBrandId = row.childBrandName
        this.releasedForm.productsUnitId = row.unitName
        this.releasedForm.ptr = row.ptr ? (row.ptr * 1) / 100 : ''
        this.releasedForm.mainImageUrls = this.pictureImg(Object.values(row.mainImgs))
        this.releasedForm.detailImageUrls = this.pictureImg(Object.values(row.detailImgs))
        this.releasedForm.shareImageUrls = this.pictureImg(Object.values(row.shareImgs))[0] ? [row.shareImgs.img1] : []
        this.releasedForm.goodsClassifyId = row.categoryId
        this.releasedForm.stock = row.stock ? row.stock : ''
        this.releasedForm.salePrice = row.price ? (row.price * 1) / 100 : ''
        this.releasedForm.provincesId = this.edtailProvince(row.buCode, row.provinceCode, row.cityCode, row.villageCode)
        this.releasedForm.channelId = this.edtailChannel(row.passageCode, row.childPassageCode)
        this.releasedForm.expiration = row.validDay ? row.validDay : null
        this.releasedForm.selling = row.salePoint ? row.salePoint : null
      }
    },
    edtailProvince(a, b, c, d) {
      const aa = a.split(',')
      const bb = b.split(',')
      const cc = c.split(',')
      const dd = d.split(',')
      const arr = []
      for (let i = 0; i < aa.length; i++) {
        arr.push([aa[i], bb[i], cc[i], dd[i]].map(Number))
      }
      return arr
      // console.log(arr)
    },
    edtailChannel(a, b) {
      const aa = a.split(',')
      const bb = b.split(',')
      const arr = []
      for (let i = 0; i < aa.length; i++) {
        arr.push([aa[i], bb[i]].map(Number))
      }
      return arr
    },
    // 关联的商品档案
    getArchives() {
      request({
        url: '/products-service/products/manager/queryProductsBase',
        method: 'GET'
      }).then(resp => {
        // console.log(resp)
        if (resp.code === 200) {
          this.archivesList = resp.result
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 关联商品档案
    handleChangeShop(row) {
      console.log(row)
      // this.getDetailBrand(row)
      request({
        url: '/products-service/products/manager/queryProductsBase',
        method: 'GET',
        params: {
          id: row
        }
      }).then(resp => {
        console.log(resp)
        if (resp.code === 200) {
          const val = resp.result[0]
          console.log(val.shareImgs)
          this.releasedForm.id = val.id
          this.releasedForm.skuCode = val.baseSku
          this.releasedForm.erpSkuCode = val.erpSku ? val.erpSku : ' '
          this.releasedForm.sapSku = val.sapSku ? val.sapSku : ' '
          this.releasedForm.name = val.name
          this.releasedForm.spec = val.spec
          this.releasedForm.productsBrandId = val.brandName
          this.releasedForm.subProductsBrandId = val.childBrandName
          this.releasedForm.productsUnitId = val.unitName
          this.releasedForm.ptr = val.ptr ? (val.ptr * 1) / 100 : ' '
          this.releasedForm.mainImageUrls = this.pictureImg(Object.values(val.mainImgs))
          this.releasedForm.detailImageUrls = this.pictureImg(Object.values(val.detailImgs))
          this.releasedForm.shareImageUrls = this.pictureImg(Object.values(val.shareImgs))[0] ? [val.shareImgs.img1] : []
        }
      }).catch(err => {
        console.log(err)
      })
    },
    pictureImg(v) {
      const arr = []
      for (let i = 0; i < v.length; i++) {
        if (v[i] !== '') {
          // console.log(v[i])
          arr.push(v[i])
        }
      }
      // console.log(arr)
      return arr
    },
    handleSearch(el) {
      // console.log(el)
      request({
        url: '/products-service/products/manager/queryProductsBase',
        method: 'GET',
        params: {
          name: el,
          current: this.query.current,
          size: this.query.size
        }
      }).then(resp => {
        console.log(resp)
        if (resp.code === 200) {
          this.archives.records
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //  添加分类
    // handleFilter() {
    //   this.$router.push('/setting/goods-set')
    // },
    // 省市下拉
    handleChange(value) {
      // console.log(value)
    },
    // 渠道下拉
    handleChannel(val) {
      // console.log(val)
    },

    // 下一步
    next(releasedForm) {
      // const { record, goodsClassifyId, stock, salePrice, mainImageUrls, detailImageUrls } = this.releasedForm
      switch (this.active + 1) {
        case 1:
          this.$refs[releasedForm].validate((valid) => {
            if (valid) {
              this.isSave = false
              this.isPrev = false
              this.active += 1
            } else {
              return false
            }
          })
          break
        case 2:
          // if (this.active === 1 && this.releasedForm.provincesId.length >= 1 && this.releasedForm.channelId.length >= 1) {
          //   this.isActive = true
          //   this.isPrev = true
          //   this.isNext = false
          //   this.active = 2
          // } else {
          //   this.$message.error('请填写*号必填的信息')
          // }
          if (this.releasedForm.provincesId.length >= 1) {
            if (this.releasedForm.channelId.length >= 1) {
              this.isActive = true
              this.isPrev = true
              this.isNext = false
              this.active = 2
            } else {
              this.$message.error('请选择渠道')
            }
          } else {
            this.$message.error('请选择省市区县')
          }
      }
    },
    // 上一步
    prev() {
      console.log('上一步')
      if (this.active--) {
        this.isPrev = true
        this.isSave = true
      }
    },

    // 返回
    getback() {
      this.active--
      this.isActive = false
      this.isNext = true
      this.isPrev = false
    },
    handleGetback() {
      this.$router.push('/products/publish')
    },
    // 保存草稿
    saveDraft(val) {
      console.log(val)
      if (val.goodsClassifyId && val.id) {
        request({
          url: '/products-service/products/manager/draftProduct',
          method: 'POST',
          data: {
            // id: (this.isEdit === 'new' || this.isEdit === 'copy') ? null : val.id,
            baseId: val.record,
            categoryId: val.goodsClassifyId,
            stock: val.stock ? (val.stock * 1) : null,
            ptr: (val.ptr * 1) * 100,
            price: (val.salePrice * 1) * 100,
            mainImgs: {
              img1: val.mainImageUrls[0] ? val.mainImageUrls[0] : '',
              img2: val.mainImageUrls[1] ? val.mainImageUrls[1] : '',
              img3: val.mainImageUrls[2] ? val.mainImageUrls[2] : ''
            },
            detailImgs: {
              img1: val.detailImageUrls[0] ? val.detailImageUrls[0] : '',
              img2: val.detailImageUrls[1] ? val.detailImageUrls[1] : '',
              img3: val.detailImageUrls[2] ? val.detailImageUrls[2] : ''
            },
            shareImgs: {
              img1: val.shareImageUrls[0] ? val.shareImageUrls[0] : ''
            },
            buCode: val.provincesId.map(item => item[0] ? item[0] : '').join(','),
            provinceCode: val.provincesId.map(item => item[1] ? item[1] : '').join(','),
            cityCode: val.provincesId.map(item => item[2] ? item[2] : '').join(','),
            villageCode: val.provincesId.map(item => item[3] ? item[3] : '').join(','),
            passageCode: val.channelId.map(item => item[0] ? item[0] : '').join(','),
            childPassageCode: val.channelId.map(item => item[0] ? item[0] : '').join(','),
            validDay: val.expiration,
            salePoint: val.selling
          }
        }).then(resp => {
          console.log(resp)
          if (resp.code === 200) {
            this.isGetBack = true
            this.isSaveDraft = true
            setInterval(() => {
              this.Rtime--
              if (this.Rtime === 0) {
                this.isGetBack = false
                this.isSaveDraft = false
                this.$router.push('/products/publish')
              }
            }, 1000)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.error('请选择档案或商品分类')
      }
    },
    // 发布商城
    subStore(val) {
      console.log(val)
      if (this.isEdit === 'new') {
        request({
          url: '/products-service/products/manager/releaseProduct',
          method: 'POST',
          data: {
            baseId: val.id,
            categoryId: val.goodsClassifyId,
            stock: val.stock ? (val.stock * 1) : null,
            ptr: (val.ptr * 1) * 100 ? (val.ptr * 1) * 100 : null,
            price: (val.salePrice * 1) * 100 ? (val.salePrice * 1) * 100 : null,
            mainImgs: {
              img1: val.mainImageUrls[0] ? val.mainImageUrls[0] : '',
              img2: val.mainImageUrls[1] ? val.mainImageUrls[1] : '',
              img3: val.mainImageUrls[2] ? val.mainImageUrls[2] : ''
            },
            detailImgs: {
              img1: val.detailImageUrls[0] ? val.detailImageUrls[0] : '',
              img2: val.detailImageUrls[1] ? val.detailImageUrls[1] : '',
              img3: val.detailImageUrls[2] ? val.detailImageUrls[2] : ''
            },
            shareImgs: {
              img1: val.shareImageUrls[0] ? val.shareImageUrls[0] : ''
            },
            buCode: val.provincesId.map(item => item[0] ? item[0] : '').join(','),
            provinceCode: val.provincesId.map(item => item[1] ? item[1] : '').join(','),
            cityCode: val.provincesId.map(item => item[2] ? item[2] : '').join(','),
            villageCode: val.provincesId.map(item => item[3] ? item[3] : '').join(','),
            passageCode: val.channelId.map(item => item[0] ? item[0] : '').join(','),
            childPassageCode: val.channelId.map(item => item[0] ? item[1] : '').join(','),
            validDay: val.expiration,
            salePoint: val.selling
          }
        }).then(resp => {
          console.log(resp)
          if (resp.code === 200) {
            this.isGetBack = true
            this.isSaveDraft = false
            setInterval(() => {
              this.Rtime--
              if (this.Rtime === 0) {
                this.isGetBack = false
                this.$router.push('/products/publish')
              }
            }, 1000)
          }
        }).catch(err => {
          console.log(err)
        })
      } else if (this.isEdit === 'edit') {
        console.log('编辑')
        request({
          url: '/products-service/products/manager/releaseProduct',
          method: 'POST',
          data: {
            id: this.publishEdit.id,
            baseId: val.record,
            categoryId: val.goodsClassifyId,
            stock: val.stock ? (val.stock * 1) : null,
            ptr: (val.ptr * 1) * 100 ? (val.ptr * 1) * 100 : null,
            price: (val.salePrice * 1) * 100 ? (val.salePrice * 1) * 100 : null,
            mainImgs: {
              img1: val.mainImageUrls[0] ? val.mainImageUrls[0] : '',
              img2: val.mainImageUrls[1] ? val.mainImageUrls[1] : '',
              img3: val.mainImageUrls[2] ? val.mainImageUrls[2] : ''
            },
            detailImgs: {
              img1: val.detailImageUrls[0] ? val.detailImageUrls[0] : '',
              img2: val.detailImageUrls[1] ? val.detailImageUrls[1] : '',
              img3: val.detailImageUrls[2] ? val.detailImageUrls[2] : ''
            },
            shareImgs: {
              img1: val.shareImageUrls[0] ? val.shareImageUrls[0] : ''
            },
            buCode: val.provincesId.map(item => item[0] ? item[0] : '').join(','),
            provinceCode: val.provincesId.map(item => item[1] ? item[1] : '').join(','),
            cityCode: val.provincesId.map(item => item[2] ? item[2] : '').join(','),
            villageCode: val.provincesId.map(item => item[3] ? item[3] : '').join(','),
            passageCode: val.channelId.map(item => item[0] ? item[0] : '').join(','),
            childPassageCode: val.channelId.map(item => item[0] ? item[1] : '').join(','),
            validDay: val.expiration,
            salePoint: val.selling
          }
        }).then(resp => {
          console.log(resp)
          if (resp.code === 200) {
            this.isGetBack = true
            this.isSaveDraft = false
            setInterval(() => {
              this.Rtime--
              if (this.Rtime === 0) {
                this.isGetBack = false
                this.$router.push('/products/publish')
              }
            }, 1000)
          }
        }).catch(err => {
          console.log(err)
        })
      } else if (this.isEdit === 'copy') {
        if (val.stock === 0 || val.stock) {
          request({
            url: '/products-service/products/manager/releaseProduct',
            method: 'POST',
            data: {
              baseId: val.record,
              categoryId: val.goodsClassifyId,
              erpSku: val.erpSkuCode,
              name: val.name,
              unitName: val.unitName,
              stock: val.stock ? (val.stock * 1) : 0,
              ptr: (val.ptr * 1) * 100 ? (val.ptr * 1) * 100 : null,
              price: (val.salePrice * 1) * 100 ? (val.salePrice * 1) * 100 : null,
              mainImgs: {
                img1: val.mainImageUrls[0] ? val.mainImageUrls[0] : '',
                img2: val.mainImageUrls[1] ? val.mainImageUrls[1] : '',
                img3: val.mainImageUrls[2] ? val.mainImageUrls[2] : ''
              },
              detailImgs: {
                img1: val.detailImageUrls[0] ? val.detailImageUrls[0] : '',
                img2: val.detailImageUrls[1] ? val.detailImageUrls[1] : '',
                img3: val.detailImageUrls[2] ? val.detailImageUrls[2] : ''
              },
              shareImgs: {
                img1: val.shareImageUrls[0] ? val.shareImageUrls[0] : ''
              },
              buCode: val.provincesId.map(item => item[0] ? item[0] : '').join(','),
              provinceCode: val.provincesId.map(item => item[1] ? item[1] : '').join(','),
              cityCode: val.provincesId.map(item => item[2] ? item[2] : '').join(','),
              villageCode: val.provincesId.map(item => item[3] ? item[3] : '').join(','),
              passageCode: val.channelId.map(item => item[0] ? item[0] : '').join(','),
              childPassageCode: val.channelId.map(item => item[0] ? item[1] : '').join(','),
              validDay: val.expiration,
              salePoint: val.selling
            }
          }).then(resp => {
            console.log(resp)
            if (resp.code === 200) {
              this.isSaveDraft = false
              this.$message.success('复制商品成功')
              this.$router.push('/products/publish')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message.error('请输入库存')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.creation-mngmt {
  width: 100%;
  padding-top: 30px;
  padding-bottom: 50px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  .el-steps--horizontal{
    width: 100%;
  }
  .astiveForm {
    width: 830px;
    padding: 20px;
    .title{
      height:60px;
      line-height: 50px;
    }
    .active{
      display: flex;
    }
    .selects{
      width:100px;
    }
    .writer{
      width:500px;
      color:#ccc;
    }
  }

  .activeBottom {
    width: 500px;
    height: 50px;
    display: flex;
    justify-content: space-around;
  }
  .el-select {
    width: 50%;
  }
  .el-input{
    width:50%;
  }
  .dialogCont{
    width:100%;
    // display: flex;
    // flex-direction: column;
    p{
      width:100%;
      text-align: center;
    }
  }
  .dialog-footer{
    width:100%;
    display:flex;
    justify-content: space-around;
  }
}
.dialog-con{
 p{
   text-align: center;
 }
}
</style>
