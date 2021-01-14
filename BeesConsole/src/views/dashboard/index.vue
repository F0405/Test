<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <div class="abi_home">欢迎使用BEES商城</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'

export default {
  name: 'Dashboard',
  // components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo'])
  },
  mounted() {
    if (this.userInfo && this.userInfo.roleId === '2' && this.userInfo.actived !== 1) {
      const tag = parseInt(localStorage.getItem('tag') || '0')
      if (tag % 2 !== 1) {
        this.$alert('首次登录，使用前请先完成信息完善', '欢迎进入BEES工作台', {
          showClose: false,
          center: true,
          closeOnHashChange: false,
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/account/complete')
          }
        })
      }
    }
  },

  created() {
    const tag = parseInt(localStorage.getItem('tag') || '0')
    if (tag % 2 !== 1) {
      location.reload()
    }
    localStorage.setItem('tag', tag + 1)
  }
}
</script>

<style scoped>
.abi_home {
  font-size: 32px;
}
</style>

