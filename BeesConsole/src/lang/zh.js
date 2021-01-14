export default {
  route: {
    dashboard: '首页',
    guide: '引导页',
    Table: 'Table',
    inlineEditTable: 'Table 内编辑',
    complexTable: '综合 Table',

    Mall: '商城管理',
    orderMngmt: '订单管理',
    activityMngmt: '活动管理',

    Goods: '商品管理',
    publishMngmt: '商品发布管理',
    archivesMngmt: '商品档案管理',

    Config: '配置',
    homePage: '商城首页配置',
    bannerSet: '横幅配置',

    Operate: '运营',
    commonList: '常购清单管理',

    Customer: '客户管理',
    customerList: '客户列表',
    customerDetail: '客户详情',
    saleCommon: '售点公海池',
    relationAmend: 'M1-POC关系调整',

    Review: '审核',
    saleAudite: '售点审核',
    shopClose: '关店审核',

    Setting: '设置',
    goodsSet: '商品设置',
    orderSet: '订单设置'
  },

  goods: {
    sku: '商品SKU编码',
    brand: '商品品牌',
    name: '商品名称',
    category: '商品分类',
    subBrand: '商品子品牌'
  },

  customer: {
    id: '售点ID',
    name: '售点名称',
    phone: '店主手机号',
    createTime: '注册时间',
    channel: '售点渠道',
    childChannel: '售点子渠道',
    status: '售点状态',
    ERPID: '是否有ERPID'
  },

  audite: { // 客户审核
    id: '售点ID',
    name: '售点名称',
    phone: '手机号',
    city: '城市',
    channel: '售点渠道',
    registeredTimeFrom: '起始时间',
    registeredTimeTo: '终止时间',
    status: '审核状态',
    salePer: '销售员'
  },
  saleCommon: { // 售点公海池
    id: '售点ID/账号',
    name: '售点名称',
    channel: '售点渠道',
    createTime: '注册时间',
    phone: '手机号',
    city: '城市',
    status: '售点状态',
    salePer: '销售员'
  },
  relationAmend: {
    id: '售点ID',
    name: '售点名称',
    channel: '售点渠道',
    phone: '手机号',
    city: '城市',
    status: '审核状态',
    salePer: '销售员'
  },
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: '商城管理后台',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }

}
