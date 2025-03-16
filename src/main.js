import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

// Create Pinia instance
const pinia = createPinia()

// Use the persistedstate plugin with Pinia
pinia.use(piniaPluginPersistedstate)

// Create the app instance
const app = createApp(App)

// Use Pinia and Router
app.use(pinia)
app.use(router)

// Mount the app
app.mount('#app')
