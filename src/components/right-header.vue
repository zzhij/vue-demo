<template>
  <div>
    <a-layout-header style="background: #fff; padding: 0">
      <a-row>
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="switchover"
        />
        <a-breadcrumb style="margin: 16px 0; display: inline-block">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
      </a-row>
    </a-layout-header>
  </div>
</template>
<script>
export default {
  name: 'RightHeader',
  data () {
    return {
      collapsed: false,
      crumbs: []
    }
  },
  watch: {
    '$route.path': function (val) {
      console.log('获取到：' + val)
    }
  },
  created () {
    // this.crumbs = this.$route.path
    console.log(this.$route.path.split('/'))
    console.log(this.$route)
  },
  mounted () {
    console.log(this.$route.path.split('/'))
    console.log(this.$route)
  },
  methods: {
    switchover () {
      this.collapsed = !this.collapsed
      this.$emit('switchover', this.collapsed)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
