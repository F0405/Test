<!-- 创建档案 -->
<template>
  <div class="creation-mngmt">
    <el-steps
      :active="active"
      align-center
      finish-status="finish"
      process-status="finish"
    >
      <el-step title="维护商品基础信息" />
      <el-step title="上传商品图片" />
      <el-step title="确认信息" />
    </el-steps>

    <el-form
      ref="commodity"
      :model="commodity"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <div v-show="active === 0" class="astiveForm">
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="commodity.name" clearable placeholder="请输入商品名称" @change="handleChange" />
        </el-form-item>
        <el-form-item label="商品SKU编码：">
          <el-input v-model="commodity.skuCode" disabled placeholder="自动生成" />
        </el-form-item>
        <el-form-item label="ERP SKU编码：">
          <el-input v-model="commodity.erpSkuCode" clearable placeholder="请输入ERP SKU编码" />
        </el-form-item>
        <el-form-item label="SAP SKU编码：" :prop="roleId==='1' ? 'sapSkuCode' : ''">
          <el-input v-model="commodity.sapSkuCode" clearable placeholder="请输入SAP SKU编码" />
        </el-form-item>
        <el-form-item label="商品品牌：" prop="productsBrandId">
          <div class="active">
            <el-select
              v-model="commodity.productsBrandId"
              placeholder="请选择"
              class="select"
              clearable
              @change="handleChangeBrand"
            >
              <el-option
                v-for="(item, ind) in brandList"
                :key="ind"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="商品子品牌：" prop="subProductsBrandId">
          <div class="active">
            <el-select
              v-model="commodity.subProductsBrandId"
              placeholder="请选择"
              clearable
              class="select"
            >
              <el-option
                v-for="(item, ind) in SubBrandList"
                :key="ind"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label=" 商品规格：" prop="spec">
          <el-input v-model="commodity.spec" clearable placeholder="请输入商品规格" />
        </el-form-item>
        <el-form-item label="商品单位：" prop="productsUnitId">
          <div class="active">
            <el-select
              v-model="commodity.productsUnitId"
              placeholder="请选择"
              clearable
              class="select"
            >
              <el-option
                v-for="(item, ind) in brandUnitList"
                :key="ind"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="建议零售价（PTR）">
          <el-input v-model="commodity.ptr" clearable :onkeyup="handleKey(commodity.ptr)" placeholder="请输入建议零售价" />
        </el-form-item>
      </div>
      <div v-show="active === 1" class="astiveForm">

        <el-form-item
          label="商品主图："
          label-position="right"
          style="marginLeft:15px"
          prop="mainImage"
        >
          <imgUPload
            v-model="commodity.mainImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="3 "
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          />
          <div class="writer">
            {{ imageCon.mainCon }}
          </div>
        </el-form-item>
        <el-form-item
          label="商品详情图："
          label-position="right"
          style="marginLeft:15px"
          prop="detailImage"
        >
          <imgUPload
            v-model="commodity.detailImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="3 "
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload"
          />
          <div class="writer">
            {{ imageCon.detailCon }}
          </div>
        </el-form-item>
        <el-form-item
          label="商品分享图："
          label-position="right"
          style="marginLeft:15px"
          prop="imgList"
        >
          <imgUPload
            v-model="commodity.shareImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="1 "
            :on-success="handleAvatarSucces2"
            :before-upload="beforeAvatarUpload"
          />
          <div class="writer">

            {{ imageCon.shareCon }}
          </div>
        </el-form-item>
      </div>
      <div v-show="active === 2" class="astiveForm">

        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="commodity.name" clearable placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品SKU编码：" prop="skuCode">
          <el-input v-model="commodity.skuCode" disabled placeholder="自动生成" />
        </el-form-item>
        <el-form-item label="ERP SKU编码：" prop="erpSkuCode">
          <el-input v-model="commodity.erpSkuCode" clearable placeholder="请输入ERP SKU编码" />
        </el-form-item>
        <el-form-item label="SAP SKU编码：" :prop="roleId==='1' ? 'sapSkuCode' : ''">
          <el-input v-model="commodity.sapSkuCode" clearable placeholder="请输入SAP SKU编码" />
        </el-form-item>
        <el-form-item label="商品品牌：" prop="productsBrandId">
          <div class="active">
            <el-select
              v-model="commodity.productsBrandId"
              placeholder="请选择"
              clearable
              class="select"
              @change="handleChangeBrand"
            >
              <el-option
                v-for="(item, ind) in brandList"
                :key="ind"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="商品子品牌：" prop="subProductsBrandId">
          <div class="active">
            <el-select
              v-model="commodity.subProductsBrandId"
              placeholder="请选择"
              clearable
              class="select"
            >
              <el-option
                v-for="(item, ind) in SubBrandList"
                :key="ind"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label=" 商品规格：" prop="spec">
          <el-input v-model="commodity.spec" clearable placeholder="请输入商品规格" />
        </el-form-item>
        <el-form-item label="商品单位：" prop="productsUnitId">
          <div class="active">
            <el-select
              v-model="commodity.productsUnitId"
              placeholder="请选择"
              clearable
              class="select"
            >
              <el-option
                v-for="(item, ind) in brandUnitList"
                :key="ind"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="建议零售价（PTR）" prop="ptr">
          <el-input v-model="commodity.ptr" clearable :onkeyup="handleKey(commodity.ptr)" placeholder="请输入建议零售价" />
        </el-form-item>
        <el-form-item
          label="商品主图："
          label-position="right"
          style="marginLeft:15px"
          prop="mainImage"
        >
          <imgUPload
            v-model="commodity.mainImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="3 "
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          />
          <div class="writer">
            {{ imageCon.mainCon }}
          </div>
        </el-form-item>
        <el-form-item
          label="商品详情图："
          label-position="right"
          style="marginLeft:15px"
          prop="detailImage"
        >
          <imgUPload
            v-model="commodity.detailImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="3 "
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload"
          />
          <div class="writer">

            {{ imageCon.detailCon }}
          </div>
        </el-form-item>
        <el-form-item
          label="商品分享图："
          label-position="right"
          style="marginLeft:15px"
          prop="imgList"
        >
          <imgUPload
            v-model="commodity.shareImageUrls"
            name="uploadFile"
            :auto-upload="true"
            :limit="1 "
            :on-success="handleAvatarSucces2"
            :before-upload="beforeAvatarUpload"
          />
          <div class="writer">

            {{ imageCon.shareCon }}
          </div>
        </el-form-item>

      </div>
      <el-form-item>
        <div class="activeBottom">
          <el-button
            v-show="active > 0 && !isActive"
            @click="prev"
          >上一步</el-button>
          <el-button
            v-show="active !== 2 && active !== 3 && !isActive"
            @click="next('commodity')"
          >下一步</el-button>
          <el-button v-show="isActive" @click="getback">返回</el-button>
          <el-button
            v-show="active == 2"
            @click="submit(commodity)"
          >提交</el-button>
        </div>
      </el-form-item>
      <!-- 返回弹框 -->
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="isGetBack"
        width="30%"
        center
        top="35vh"
      >
        <div class="dialog-con">
          <p v-show="isEdit === 'new'">商品档案创建成功</p>
          <p v-show="isEdit === 'edit'">商品档案编辑成功</p>
          <p>{{ Rtime }}秒返回档案列表</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button v-show="isEdit" @click="getback">返回</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="isFlag"
        width="30%"
        center
        top="35vh"
      >
        <div class="dialog-con">
          <p>确定保存并更新此商品档案吗?</p>
          <p style="color:#666">所有引用此档案的商品政策里面的商品基础信息都会变动</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isFlag=false">取消</el-button>
          <el-button @click="handleSure">确定</el-button>
        </span>
      </el-dialog>
    </el-form></div>

</template>
<script>
// import request from '@/utils/request'
import { mapState, mapActions, mapGetters } from 'vuex'
import imgUPload from '@/components/imgUpload/imgUpload'
import request from '@/utils/request'
export default {
  components: {
    imgUPload
  },
  data() {
    return {
      active: 0, // 0:维护商品基础信息  1:  维护商品基础信息  2:确认信息
      isActive: false,
      isGetBack: false,
      isFlag: false,
      Rtime: 5,
      imgList: [],
      SubBrandList: [],
      commodity: {
        name: '',
        skuCode: '',
        erpSkuCode: '',
        sapSkuCode: '',
        subProductsBrandId: '',
        spec: '',
        productsBrandId: '',
        productsUnitId: '',
        ptr: '',
        mainImageUrls: [], // 商品主图
        detailImageUrls: [], // 商品详情图
        shareImageUrls: [] // 商品分享图
      },
      imgActive: 0,
      mainDialogVisible: false,
      detailDialogVisible: false,
      shareDialogVisible: false,
      mainImageUrl: '',
      detailImageUrl: '',
      shareImageUrl: '',
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        productsBrandId: [{ required: true, message: '请选择商品品牌', trigger: 'blur' }],
        subProductsBrandId: [{ required: true, message: '请选择商子品品牌', trigger: 'blur' }],
        spec: [{ required: true, message: '请输入商品规格', trigger: 'blur' }],
        productsUnitId: [{ required: true, message: '请选择商品单位', trigger: 'blur' }],
        sapSkuCode: [{ required: true, message: '请输入SAP SKU编码', trigger: 'blur' }]
        // mainImage: [{ required: true, message: '请添加商品主图', trigger: 'blur' }],
        // detailImage: [{ required: true, message: '请添加商品分享图', trigger: 'blur' }]
      },
      disabled: false,
      brandSubList: [], // 商品子品牌
      gooodsAbi: [
        {
          name: 'ABI',
          id: 0
        },
        {
          name: '三方',
          id: 1
        }
      ],
      compile: '',
      repetition: false
    }
  },
  computed: {
    ...mapState('goods', ['brandList', 'brandUnitList', 'creationDetail', 'imageCon']),
    ...mapGetters('user', ['roleId']),
    isEdit() {
      return this.$route.query.type
    }
  },
  created() {
    this.getFuBrandList()
    this.getSubBrandList()
    this.getBrandUnit()
    this.handleCompile()
    console.log(this.roleId)
  },
  mounted() {
    if (this.isEdit === 'edit' && !this.creationDetail.id) {
      this.$router.push('/products/archive')
    }
  },

  methods: {
    ...mapActions('goods', ['getBrandList', 'getBrandUnit', 'newGooodsRecord', 'GooodsRecordEditor']),
    handleChange(val) {
      console.log(val)
    },
    // 父品牌
    getFuBrandList() {
      this.getBrandList({
        level: 0
      })
    },
    handleChangeBrand() {
      this.getSubBrandList()
    },
    handleKey(val) {
      var reg = /^\d+(\.\d{0,2})?$/
      if (val) {
        if (!reg.test(val)) {
          this.$message.error('只能输入数字和两位小数')
          this.releasedForm.salePrice = ''
        }
      }
    },
    getSubBrandList() {
      console.log(this.commodity.productsBrandId)
      request({
        url: '/products-service/products/manager/queryProductsBrand',
        method: 'GET',
        params: {
          level: 1,
          parentId: this.commodity.productsBrandId
        }
      }).then(resp => {
        // console.log(resp)
        if (resp.code === 200) {
          this.SubBrandList = resp.result
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 价格输入限制
    handleKep(val) {
      var reg = /^\d+(\.\d{0,2})?$/
      if (val) {
        if (!reg.test(val)) {
          this.$message.error('只能输入数字和两位小数')
          this.commodity.ptr = ''
        }
      }
    },
    // 编辑，
    handleCompile() {
      const val = this.creationDetail
      if (this.isEdit === 'edit') {
        this.active = 2
        this.commodity.id = val.id
        this.commodity.name = val.name
        this.commodity.skuCode = val.baseSku
        this.commodity.erpSkuCode = val.erpSku ? val.erpSku : ' '
        this.commodity.sapSkuCode = val.sapSku ? val.sapSku : ' '
        this.commodity.productsBrandId = val.brandId
        this.commodity.subProductsBrandId = val.childBrandId
        this.commodity.spec = val.spec
        this.commodity.ptr = val.ptr ? val.ptr / 100 : ''
        this.commodity.productsUnitId = val.unitId
        this.commodity.mainImageUrls = this.pictureImg(Object.values(val.mainImgs))
        this.commodity.detailImageUrls = this.pictureImg(Object.values(val.detailImgs))
        this.commodity.shareImageUrls = this.pictureImg(Object.values(val.shareImgs))[0] ? [val.shareImgs.img1] : []
      }
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
    handlePictureCardPreview(file) {
      if (this.imgActive === 0) {
        this.mainImageUrl = file.url
        this.mainDialogVisible = true
      } else if (this.imgActive === 2) {
        this.detailImageUrl = file.url
        this.detailDialogVisible = true
      } else {
        this.shareImageUrl = file.url
        this.shareDialogVisible = true
      }
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res, file) {
      // console.log(res, file)
      this.commodity.mainImageUrls.push({ name: file.name, url: file.url })
      this.img1.push(res.data)
    },
    handleAvatarSuccess1(res, file) {
      // console.log(res)
      this.commodity.detailImageUrls.push({ name: file.name, url: file.url })
      this.img2.push(res.data)
    },
    handleAvatarSucces2(res, file) {
      // console.log(res)
      this.commodity.shareImageUrls.push({ name: file.name, url: file.url })
      this.img3.push(res.data)
    },
    exceed(file, imgList) {
      if (imgList.length >= 3) {
        this.$message.error('最多可以上传三张图片')
      }
    },
    exceedLast(file, imgList) {
      if (imgList.length >= 1) {
        this.$message.error('最多可以上传一张图片')
      }
    },
    // 下一步
    next(commodity) {
      const { mainImageUrls, detailImageUrls } = this.commodity
      switch (this.active + 1) {
        case 1:
          this.$refs[commodity].validate((valid) => {
            console.log(valid)
            if (valid) {
              this.active += 1
            } else {
              return false
            }
          })
          break
        case 2:
          if (mainImageUrls.length >= 1 && detailImageUrls.length >= 1) {
            this.active = 2
          } else {
            this.$message.error('商品主图和商品详情图至少上传一张')
          }
      }
    },
    // 上一步
    prev() {
      console.log('上一步')
      if (this.active-- <= 0) {
        return
      }
    },
    // 提交
    submit(val) {
      this.repetition = true
      console.log(this.isEdit)
      if (this.isEdit === 'new') {
        request({
          url: '/products-service/products/manager/createProductsBase',
          method: 'POST',
          data: {
            brandId: val.productsBrandId,
            childBrandId: val.subProductsBrandId,
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
            name: val.name,
            ptr: val.ptr ? val.ptr * 100 : '',
            sapSku: val.sapSkuCode,
            erpSku: val.erpSkuCode,
            spec: val.spec,
            unitId: val.productsUnitId
          }
        }).then(resp => {
          console.log(resp)
          if (resp.code === 200) {
            this.isActive = true
            this.isGetBack = true
            setInterval(() => {
              this.Rtime--
              if (this.Rtime === 0) {
                this.isGetBack = false
                this.$router.push('/products/archive')
              }
            }, 1000)
          }
        }).catch(err => {
          console.log(err)
        })
      } else if (this.isEdit === 'edit') {
        request({
          url: '/products-service/products/manager/editProductsBase',
          method: 'PUT',
          data: {
            id: val.id,
            brandId: val.productsBrandId,
            childBrandId: val.subProductsBrandId,
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
            name: val.name,
            ptr: val.ptr ? val.ptr * 100 : '',
            sapSku: val.sapSkuCode,
            erpSku: val.erpSkuCode,
            spec: val.spec,
            unitId: val.productsUnitId
          }
        }).then(resp => {
          console.log(resp)
          if (resp.code === 200) {
            this.isFlag = true
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 返回
    getback() {
      this.$router.push('/products/archive')
    },
    handleSure() {
      this.isGetBack = true
      setInterval(() => {
        this.Rtime--
        if (this.Rtime === 0) {
          this.isGetBack = false
          this.$router.push('/products/archive')
        }
      }, 1000)
    },
    handleRemove(file, imgList) {
      console.log(file, imgList)
    },
    handleDownload(file) {
      console.log(file)
    }
  }
}
</script>

<style lang="less" scoped>

.creation-mngmt {
  width: 100%;
  padding-top: 30px;
  //   position: relative;
  padding-bottom: 50px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  .el-steps--horizontal{
    width: 100%;
  }
  .astiveForm {
    width: 825px;
    padding: 20px;
    .writer{
      width:500px;
      color:#ccc;
    }
  }
  .activeBottom {
    width: 450px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    z-index: 99;
  }
  .select {
    width: 100%;
  }
  .el-input ,.el-select{
    width:65%;
  }
  .el-form-item--medium{
  width:800px;
}
.el-form-item--mini .el-form-item__label{
  margin-top:20px;
}
.uploadBox{
  width:100px;
  height:100px;
}

}
.dialog-con{
 p{
   text-align: center;
 }

}
</style>
