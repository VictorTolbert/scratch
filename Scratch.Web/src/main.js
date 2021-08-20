import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'
import 'windi.css'

// import { sync } from 'vuex-router-sync'
// sync(store, router)

const app = createApp(App)
app.use(store)
app.mount('#app')
