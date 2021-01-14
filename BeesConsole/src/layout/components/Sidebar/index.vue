<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <div
        v-if="hasDealer"
        style="
          width:100%;height:40px;
          font-size:14px;color:white;
          margin-top:2px;
          background-color:#2f4256 !important;
          display:flex;
          justify-content: center;
          align-items: center;cursor:pointer;"
        @click="clearDealer"
      >返回</div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.less'
import Cookies from 'js-cookie'
export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      hasDealer: Cookies.get('dealer_id')
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    routers() {
      // 子菜单都是hidden的也不显示父级菜单
      const ret = this.permission_routes.filter(item => {
        if (item.children && item.children.filter(v => !v.hidden).length === 0) {
          return false
        }
        return true
      })
      return ret
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },

  methods: {
    clearDealer() {
      console.log('清除经销商信息')
      this.$store.dispatch('user/logoutByDealer')
    }
  }
}
</script>

