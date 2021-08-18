import Vue from 'vue';
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import App from './App.vue';

import '@/plugins'

import 'windi.css'
import './assets/css/index.css';

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/,
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')),
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

try {
  window.$ = window.jQuery = require('jquery')
} catch (e) {
  console.log(e)
}

new Vue({
  render: h => h(App)
}).$mount('#app')
