<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
  },
  watch: {},
  mounted() {
    this.getAllStruceture()
    this.getBasicArea()
    this.getAllChannels()
  },
  methods: {
    ...mapActions('structure', ['getAllStruceture', 'getBasicArea', 'getAllChannels'])
  }
}
</script>

