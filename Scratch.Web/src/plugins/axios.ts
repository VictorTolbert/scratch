import { createApp } from 'vue'
import axios from 'axios'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: typeof axios
    $validate: (data: object, rule: object) => boolean
  }
}

const app = createApp({})
app.config.globalProperties.$http = axios

// Plugin for validating some data
export default {
  // install(app, options) {
  //   app.config.globalProperties.$validate = (data: object, rule: object) => {
  //     // check whether the object meets certain rules
  //   }
  // }
}
