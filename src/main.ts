import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { store, key } from './store'

const vuetify = createVuetify({})

const app = createApp(App)
app.use(store, key)
app.use(vuetify)
app.mount('#app')
