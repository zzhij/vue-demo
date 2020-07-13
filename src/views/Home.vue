<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// 在以 .vue 结尾的vue文件中 没有 template 模板也是可以的

/* export default {
  name: 'Home',
  render: function (createElement) {
    return createElement('div',
      Array.apply(null, { length: 20 }).map(function () {
        return createElement('p', 'hi')
      })
    )
  }
} */
</script>
