import Layout from '@/layout'

const management = {
  path: '/account',
  component: Layout,
  redirect: '/account/ws',
  name: 'Management',
  meta: {
    title: '账户管理',
    icon: 'shopping'
  },
  children: [
    {
      path: 'ws',
      component: () => import('@/views/management/account'),
      name: 'Account',
      meta: { title: '账户管理' },
      showOnlyOne: true
    },
    {
      path: 'creation',
      component: () => import('@/views/management/create-account'),
      name: '创建新账户',
      meta: { title: '创建新账号', noCache: true, activeMenu: '/account/ws' },
      hidden: true
    },
    {
      path: 'edit',
      component: () => import('@/views/management/create-account'),
      name: '编辑账户',
      meta: { title: '编辑账户', noCache: true, activeMenu: '/account/ws' },
      hidden: true
    },
    {
      path: 'setting',
      name: '账户设置',
      component: () => import('@/views/management/setting'),
      meta: { title: '账户设置', noCache: true, activeMenu: '/account/ws' },
      hidden: true
    },
    {
      path: 'complete',
      name: '账户完善',
      component: () => import('@/views/management/setting'),
      meta: { title: '账户完善', noCache: true },
      hidden: true
    },
    {
      path: 'perfect-information',
      component: () => import('@/views/management/perfect-information')
    }
  ]
}
export default management
