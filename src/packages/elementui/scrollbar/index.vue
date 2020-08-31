<template>
  <div class='scrollbar'>
    <div class='scrollbar-header'>sdfasfasf</div>
    <div class='scrollbar-content'>
      <el-scrollbar class='scrollbar-wrap' ref="scrollbarBox">
        <div class='scrollbarList'>
          ASFSDA
          asdfasdf
          sadfas
          fad
          sdfasfasfs
          sdfasd
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scrollbarTest',
  mounted () {
    console.log(this.$refs.scrollbarBox.wrap.handleScroll)
    this.handleScroll()
  },
  methods: {
    handleScroll () {
      const scrollbarEl = this.$refs.scrollbarBox.wrap
      scrollbarEl.onscroll = () => {
        console.log(scrollbarEl.scrollTop)
        if (scrollbarEl.scrollTop > 135) {
          this.isFixedTop = true
        } else {
          this.isFixedTop = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollbar-header {
  height: 100px;
  background: #ccc;
}
.scrollbar-content {
  .scrollbar-wrap {
    /deep/ {
      .el-scrollbar__wrap {
        height: 300px;
      }
    }
  }
  .scrollbarList {
    height: 1000px;
    background: #67C23A;
  }
}
</style>
