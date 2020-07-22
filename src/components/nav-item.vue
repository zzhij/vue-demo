<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon type="mail" />
      <span>{{ props.menuInfo.showName }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.path">
        <router-link :to="item.path">
          <a-icon type="pie-chart" />
          <span>{{ item.showName }}</span>
        </router-link>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  name: 'SubMenu',
  props: ['menuInfo']
}
</script>
