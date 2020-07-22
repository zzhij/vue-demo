<template>
  <div class="sider-nav">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="defaultSelected">
        <template v-for="item in routers">
          <a-menu-item v-if="!item.children" :key="item.path">
            <router-link :to="item.path">
              <a-icon type="pie-chart" />
              <span>{{ item.showName }}</span>
            </router-link>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>
<script>
import SubMenu from './nav-item'
export default {
  name: 'Nav',
  props: ['collapsed'],
  components: {
    SubMenu
  },
  watch: {
    '$route.path': function (val) {
      console.log('获取到：' + val)
      /* this.defaultSelected = ['']
      this.defaultSelected = [val] */
      if (this.defaultSelected.length) {
        this.defaultSelected.pop()
      }
      this.defaultSelected.push(val)
      console.log(this.defaultSelected)
    }
  },
  data () {
    return {
      routers: [
      ],
      defaultSelected: []
    }
  },
  created () {
    console.log(this.$router.options.routes)
    console.log(this.$route)
    this.routers = this.$router.options.routes
    // const path = this.$route.path
    // this.defaultSelected = [path]
  }
}
</script>
<style lang="scss" scoped>
.sider-nav {
  .ant-layout-sider {
    height: 100%;
  }
}
</style>
