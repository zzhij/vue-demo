import ellipsis from './ellipsis'

const install = function (Vue) {
  Vue.directive('ellipsis', hasImage)
}

if (window.Vue) {
  window.ellipsis = ellipsis
  Vue.use(install); // eslint-disable-line
}

export default install
