<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <Nav :collapsed='collapsed' />
    <a-layout class="content-right">
      <RightNav @switchover="switchover" />
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Nav from '@/components/nav.vue'
import RightNav from '@/components/right-header.vue'
export default {
  name: 'App',
  data () {
    return {
      collapsed: false
    }
  },
  components: {
    Nav,
    RightNav
  },
  methods: {
    switchover (val) {
      this.collapsed = val
    }
  }
}
</script>
<style>
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .content-right {
  min-height: 100%;
}
#components-layout-demo-custom-trigger .ant-layout-content {
  flex: none;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
