<!-- 创建活动 -->
<template>
  <div class="create-activities">
    <!-- 时间 -->
    <div v-if="flag">
      <div class="block">
        <span class="demonstration">带快捷选项</span>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        />
      </div>
    </div>
    <!-- 表单 -->
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动对象：" prop="region">
        <el-select v-model="ruleForm.region">
          <el-option
            v-for="item in payStyleOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="活动类型：" prop="region1">
        <el-select
          v-model="ruleForm.region1"
          placeholder="请选择"
          @change="changeSelect"
        >
          <el-option
            v-for="item in payStyleOptions1"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称：" prop="name">
        <el-input v-model="ruleForm.name" />
        <span>将在前台商城展示,请慎重填写！</span>
      </el-form-item>
      <el-form-item label="活动描述：" prop="desc" label-width="155px">
        <el-input v-model="ruleForm.desc" type="textarea" />
        <span>将在前台商城展示,请慎重填写！</span>
      </el-form-item>
      <el-form-item label="活动生效期：" label-width="153px">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </div>
      </el-form-item>
      <el-form-item label="活动主图">
        <!-- 图片 -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="搭配主图">
        <!-- 图片 -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <!-- 直降 -->
      <div v-if="select.val === '0'">
        <el-form-item
          label="选择直接规则"
          :rules="[{ required: true, message: '请选择直接规则' }]"
        >
          <el-radio-group v-model="radio" @change="change">
            <el-radio :label="1" style="width: 100%">
              <span>所有商品降价</span>
              <span>
                <el-input
                  v-model="gz.name"
                  class="reduce"
                  style="width: 50px; mairgin-left: 30px"
                />元
              </span>
            </el-radio>
            <el-radio :label="2" style="width: 100%">
              <span>所有商品打 </span>
              <span>
                <el-input
                  v-model="gz.namew"
                  class="reduce"
                  style="width: 50px; mairgin-left: 30px"
                />折
              </span>
            </el-radio>
            <el-radio :label="3" style="width: 100%">
              <span>所有商品降至</span>
              <span>
                <el-input
                  v-model="gz.namet"
                  class="reduce"
                  style="width: 50px; mairgin-left: 30px"
                />元
              </span>
            </el-radio>
            <el-radio :label="4" style="width: 100%">
              <span>所有商品自定义设置活动价</span>
              <span />
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <!-- 满赠 -->
      <div v-if="select.val1 === '1'">
        <el-form-item
          label="限购总量"
          :rules="[{ required: true, message: '请选择直接规则' }]"
        >
          <el-radio-group v-model="radio">
            <el-radio
              :label="3"
              style="width: 100%"
              class="radio"
            >不限量
            </el-radio>
            <el-radio :label="3" style="width: 100%">
              <span>总量</span>
              <span class="redio-l"><el-input style="width: 50px" />份</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
    <!-- 设置活动范围直降和商品 -->
    <div v-if="select.val === '0'">
      <div class="centent">
        <div class="centent-header">
          <b>设置商品活动范围和商品</b>
          <el-form
            ref="ruleForm"
            :model="ruleFormsp"
            :rules="rules1"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div class="city">
              <el-form-item label="活动区域" prop="region">
                <el-select v-model="ruleFormsp.region" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
              <el-form-item label="渠道" label-width="57px" prop="region1">
                <el-select v-model="ruleFormsp.region1" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </div>
            <el-form-item
              label="选择直降商品"
              prop="region2"
              label-width="118px"
            >
              <el-button
                size="mini"
                type="primary"
                plain
                @click="handleAdd"
              >添加商品</el-button>
            </el-form-item>
            <div class="sp">
              <div class="sp-left">
                <div src="" alt="" class="img" />
                <p>科罗娜11.3度330ML 4X6纸箱OW瓶装</p>
                <div class="item">
                  <p>商品政策编码:10001313商品售卖价：<span>$142.00</span></p>
                </div>
                <div class="item">
                  <p>
                    城市区县:上海是徐汇区<span>渠道子渠道：TT,NL</span><span>库存:31</span>
                  </p>
                </div>
              </div>
              <div class="sp-right">
                <el-form ref="form" :model="commodity">
                  <el-form-item label="活动名称">
                    <el-input
                      v-model="commodity.name"
                      style="width: 50px"
                    /><span class="yuan">元</span>
                  </el-form-item>
                  <el-form-item label="活动区域">
                    <el-input v-model="commodity.name" style="width: 80px" />
                    <el-button
                      size="mini"
                      type="primary"
                      plain
                      class="remove"
                    >删除</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="sp">
              <div class="sp-left">
                <div src="" alt="" class="img" />
                <p>科罗娜11.3度330ML 4X6纸箱OW瓶装</p>
                <div class="item">
                  <p>商品政策编码:10001313商品售卖价：<span>$142.00</span></p>
                </div>
                <div class="item">
                  <p>
                    城市区县:上海是徐汇区<span>渠道子渠道：TT,NL</span><span>库存:31</span>
                  </p>
                </div>
              </div>
              <div class="sp-right">
                <el-form ref="form" :model="commodity">
                  <el-form-item label="活动名称">
                    <el-input
                      v-model="commodity.name"
                      style="width: 50px"
                    /><span class="yuan">元</span>
                  </el-form-item>
                  <el-form-item label="活动区域">
                    <el-input v-model="commodity.name" style="width: 80px" />
                    <el-button
                      size="mini"
                      type="primary"
                      plain
                      class="remove"
                    >删除</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 设置活动范围买赠和商品 -->
    <div v-if="select.val === '1'">
      <div class="centent">
        <div class="centent-header">
          <b>设置商品活动范围和商品</b>
          <el-form
            ref="ruleForm"
            :model="ruleFormsp"
            :rules="rules1"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div class="city">
              <el-form-item label="城市区县" prop="region">
                <el-select v-model="ruleFormsp.region" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
              <el-form-item label="渠道" label-width="57px" prop="region1">
                <el-select v-model="ruleFormsp.region1" placeholder="请选择">
                  <el-option label="区域一" value="shanghai" />
                  <el-option label="区域二" value="beijing" />
                </el-select>
              </el-form-item>
            </div>
            <el-form-item
              label="选择直降商品"
              prop="region2"
              label-width="118px"
            >
              <el-button
                size="mini"
                type="primary"
                plain
                @click="handleAdd"
              >添加商品</el-button>
            </el-form-item>
            <div class="sp">
              <div class="sp-left">
                <div src="" alt="" class="img" />
                <p>科罗娜11.3度330ML 4X6纸箱OW瓶装</p>
                <div class="item">
                  <p>商品政策编码:10001313商品售卖价：<span>$142.00</span></p>
                </div>
                <div class="item">
                  <p>
                    城市区县:上海是徐汇区<span>渠道子渠道：TT,NL</span><span>库存:31</span>
                  </p>
                </div>
              </div>
              <div class="sp-right">
                <el-form ref="form" :model="commodity">
                  <el-form-item label="购买数量" style="width: 100%">
                    <el-input v-model="commodity.name" style="width: 80px" />
                    <div class="sc">
                      <i class="el-icon-arrow-down" />
                      <i class="el-icon-arrow-up" />
                    </div>
                    <el-button
                      size="mini"
                      type="primary"
                      plain
                      class="remove"
                    >删除</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="sp">
              <div class="sp-left">
                <div src="" alt="" class="img" />
                <p>科罗娜11.3度330ML 4X6纸箱OW瓶装</p>
                <div class="item">
                  <p>商品政策编码:10001313商品售卖价：<span>$142.00</span></p>
                </div>
                <div class="item">
                  <p>
                    城市区县:上海是徐汇区<span>渠道子渠道：TT,NL</span><span>库存:31</span>
                  </p>
                </div>
              </div>
              <div class="sp-right">
                <el-form ref="form" :model="commodity">
                  <el-form-item label="购买数量">
                    <el-input v-model="commodity.name" style="width: 80px" />
                    <!-- 商城加减 -->
                    <div class="sc">
                      <i class="el-icon-arrow-down" />
                      <i class="el-icon-arrow-up" />
                    </div>
                    <div class="removebtn">
                      <el-button
                        size="mini"
                        type="primary"
                        plain
                        class="remove"
                      >删除</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary">取消</el-button>
      <el-button type="primary">提交</el-button>
    </div>
    <!-- 添加商品弹框 -->
    <el-dialog
      title="添加商品"
      :close-on-click-modal="false"
      :visible.sync="centerDialogVisible"
      width="80%"
      center
    >
      <div class="el-dialog-box">
        <div class="el-dialog-box-left">
          <el-form
            ref="form"
            :model="addfrom"
            label-width="80px"
            class="addfrom"
          >
            <el-form-item label="商品名称:">
              <el-input
                v-model="addfrom.name"
                class="input"
                style="width: 50%"
                placeholder="请输入商品名称"
              />
            </el-form-item>
            <div class="page">
              <el-form-item label="商品政策编码:" label-width="90">
                <el-input
                  v-model="addfrom.page"
                  style="width: 50%"
                  placeholder="请输入商品政策编码"
                />
              </el-form-item>
              <el-button type="primary" class="filter">搜索</el-button>
            </div>
          </el-form>
          <!-- 直降添加物品 -->
          <div v-if="select.val === '0'">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="商品图"
                width="100"
                align="center"
              />
              <el-table-column
                prop="name"
                label="商品名称"
                width="100"
                align="center"
              />
              <el-table-column
                prop="address"
                label="商品编码"
                align="center"
                width="100"
              />
              <el-table-column
                prop="address"
                label="商品售卖价"
                align="center"
                width="100"
              />
              <el-table-column
                prop="address"
                label="城市区县"
                align="center"
                width="100"
              />
              <el-table-column
                prop="address"
                label="渠道子渠道"
                align="center"
                width="100"
              />
              <el-table-column
                prop="address"
                label="库存"
                align="center"
                width="100"
              />
              <el-table-column
                fixed="right"
                label="操作"
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    style="color: #1890ff"
                    @click="addshopping(scope.row)"
                  >添加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 买增添加物品 -->
          <div v-if="select.val === '1'">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="date"
                label="商品图"
                width="100"
                align="center"
              />
              <el-table-column
                prop="name"
                label="商品名称"
                width="100"
                align="center"
              />
              <el-table-column
                prop="address"
                label="商品编码"
                align="center"
                width="100"
              />
              <el-table-column
                prop="address"
                label="商品售卖价"
                align="center"
                width="100"
              />
              <el-table-column
                prop="address"
                label="城市区县"
                align="center"
                width="100"
              />
              <el-table-column
                prop="address"
                label="渠道子渠道"
                align="center"
                width="100"
              />
              <el-table-column
                prop="address"
                label="库存"
                align="center"
                width="100"
              />
              <el-table-column
                fixed="right"
                label="操作"
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    style="color: #1890ff"
                    @click="addshopping1(scope.row)"
                  >选则</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--  -->
          <!-- 分页 -->
          <pagination
            :total="tableData.length"
            :page.sync="query.current"
            :limit.sync="query.size"
          />
        </div>
        <!-- 已经添加物品 -->
        <div class="el-dialog-box-right">
          <b>已添加商品</b>
          <div class="spp">
            <div class="sp-leftt">
              <div src="" alt="" class="img" />
              <p>科罗娜11.3度330ML 4X6纸箱OW瓶装</p>
              <div class="itemm">
                <p>商品政策编码:10001313商品售卖价：<span>$142.00</span></p>
              </div>
              <div class="item">
                <p>
                  城市区县:上海是徐汇区<span>渠道子渠道：TT,NL</span><span>库存:31</span>
                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    class="rremove"
                  >删除</el-button>
                </p>
              </div>
            </div>
          </div>
          <div class="spp">
            <div class="sp-leftt">
              <div src="" alt="" class="img" />
              <p>科罗娜11.3度330ML 4X6纸箱OW瓶装</p>
              <div class="itemm">
                <p>商品政策编码:10001313商品售卖价：<span>$142.00</span></p>
              </div>
              <div class="item">
                <p>
                  城市区县:上海是徐汇区<span>渠道子渠道：TT,NL</span><span>库存:31</span>
                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    class="rremove"
                  >删除</el-button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      // 直降满减值
      select: {
        val: '',
        val1: ''
      },
      // 分页
      query: {
        total: 0,
        current: 1,
        size: 10
      }, // 分页
      // 添加商品表格
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市区金'
        }
      ],
      // 添加商品表单
      addfrom: {
        name: '',
        page: ''
      },
      // 添加商品弹框
      centerDialogVisible: false,
      // 商品
      commodity: {
        name: ''
      },
      radio: 3,
      flag: false,
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        region: '',
        region1: '',
        name: '',
        desc: '',
        date1: '',
        date2: '',
        resource: ''
      },
      gz: {
        name: '',
        namew: '',
        namet: ''
      },
      // 活动商品
      ruleFormsp: {
        region: ''
      },
      payStyleOptions: [{ name: '售点', value: '0' }],
      payStyleOptions1: [
        { name: '直降', value: '0' },
        { name: '买赠', value: '1' }
      ],
      rules: {
        region: [
          { required: true, message: '请选择活动对象', trigger: 'change' }
        ],
        region1: [
          { required: true, message: '请选择活动类型', trigger: 'change' }
        ],
        name: [{ required: true, message: '请选择名称', trigger: 'change' }]
      },
      rules1: {
        region: [{ required: true, message: '请选择区县', trigger: 'change' }],
        region1: [{ required: true, message: '请选择渠道', trigger: 'change' }],
        region2: [
          { required: true, message: '请选择直降商品', trigger: 'change' }
        ]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ''
    }
  },
  methods: {
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 上传图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    add() {
      if (this.ruleForm.date1 === '' || this.ruleForm.date2 === '') {
        console.log(123)
        this.flag = true
      }
    },
    // 添加弹框
    handleAdd() {
      this.centerDialogVisible = true
    },
    // 添加商品
    addshopping(row) {
      console.log(row)
    },
    // 直降买增得select值
    changeSelect(val) {
      this.select.val = val // 直降
      this.select.val1 = val // 买赠
      console.log(this.select, this.select.val1)
    },
    // 多选框
    change(value) {
      if (value === 1) {
        alert(1)
      }
    }
  }
}
</script>

<style lang='less'>
.sp {
  width: 100%;
  height: 130px;
  padding: 0 30px;
  margin-left: 20px;
  display: flex;
  background: #ccc;
  justify-content: space-around;
  .sp-left {
    width: 200px;
    .img {
      width: 80px;
      height: 93px;
      margin: 10px 0;
      background: skyblue;
      float: left;
    }
    p {
      width: 400px;
      height: 20px;
      margin-left: 95px;
    }
    .item {
      font-size: 14px;
      margin-left: 2px;
    }
  }
  .sp-right {
    width: 30%;
    .el-form-item {
      margin-top: 15px;
    }
    .el-form-item--medium .el-form-item__content {
      display: flex;
    }
    .yuan {
      width: 30px;
      height: 30px;
      line-height: 30px;
      margin-top: 5px;
      display: inline-block;
    }
    .remove {
      margin-left: 20px;
    }
  }
}
.create-activities {
  width: 70%;
  height: 100%;
  margin: 0 auto;
  margin-top: 20px;
}
.el-form {
  .el-input {
    margin: 0;
    width: 200px;
  }
}
.el-form-item__label {
  text-align: center;
}
.el-textarea__inner {
  width: 200px;
  height: 100px;
}
.el-form-item--medium .el-form-item__label {
  line-height: 39px;
}
.el-textarea {
  width: 19.3%;
}
.footer {
  width: 50%;
  margin: 100px auto;
}
.el-radio {
  width: 500px;
  .el-radio__inner {
    position: absolute;
    top: 16px;
  }
  .el-radio__label {
    width: 180px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
    .redio-l {
      margin-right: 100px;
    }
  }
}
.el-col-2 {
  margin-top: 8px;
  width: 30px;
  height: 30px;
  text-align: center;
}
.el-upload--picture-card {
  width: 108px;
  height: 90px;
}
.el-upload--picture-card i {
  font-size: 28px;
  color: #8c939d;
  position: absolute;
  left: 39px;
  top: 33px;
}
.centent {
  .centent-header {
    b {
      height: 30px;
      display: inline-block;
    }
  }
}
.city {
  width: 50%;
  display: flex;
}
.spp {
  width: 100%;
  height: 130px;
  padding: 0 30px;
  margin-left: 20px;

  .sp-leftt {
    width: 70%;

    .img {
      width: 80px;
      height: 93px;
      margin: 10px 0;
      background: skyblue;
      float: left;
    }
    p {
      width: 400px;
      height: 20px;
      margin-left: 95px;
    }
    .itemm {
      font-size: 14px;
      margin-left: 2px;
    }
  }
  .sp-right {
    width: 30%;
    .el-form-item {
      margin-top: 15px;
    }
    .el-form-item--medium .el-form-item__content {
      display: flex;
    }
    .yuan {
      width: 30px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
    }
    .remove {
      position: relative;
      margin-left: 20px;
    }
  }
}
.el-input .el-input--medium {
  margin-left: 20px;
}
.addfrom {
  .input {
    margin-left: 21px;
  }
}
.page {
  .filter {
    position: absolute;
    right: 0;
    bottom: 22px;
  }
}
.el-dialog-box {
  width: 100%;
  display: flex;
}

.radio {
  height: 30px;
}
.jj {
  .el-icon-arrow-down {
    width: 10px;
    height: 10px;
  }
}
.sc {
  position: relative;
  i:nth-child(1) {
    position: absolute;
    left: 0;
    font-size: 22px;
    top: 22px;
  }
  i:nth-child(2) {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 22px;
  }
}
</style>
