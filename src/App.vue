<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from './stores/counter'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { 
  NConfigProvider, 
  NLayout, 
  NLayoutContent,
  darkTheme, 
  NMessageProvider,
  useMessage
} from 'naive-ui'

// Initialize store and router
const counterStore = useCounterStore()
const router = useRouter()

// State management
const theme = ref('light')
const userName = ref('')
const isLoggedIn = ref(false)

// Toggle theme function
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Computed property for Naive UI theme
const currentTheme = computed(() => {
  return theme.value === 'dark' ? darkTheme : null
})

// Handle login
const handleLogin = () => {
  userName.value = 'Guest User'
  isLoggedIn.value = true
}

// Handle logout
const handleLogout = () => {
  userName.value = ''
  isLoggedIn.value = false
}

// Handle contact button click from footer
const handleContactClick = () => {
  router.push({ name: 'contact' })
}

// Handle subscribe from footer
const handleSubscribe = (email) => {
  // Could add this information to the store
  console.log('Subscribed with email:', email)
}

// Increment counter when app is mounted - demonstrates store usage
counterStore.registerVisitor()
</script>

<template>
  <NConfigProvider :theme="currentTheme">
    <NMessageProvider>
      <NLayout class="layout">
        <AppHeader 
          title="Vue Portfolio" 
          :user-name="userName" 
          :is-logged-in="isLoggedIn" 
          :theme="theme"
          @toggle-theme="toggleTheme"
          @logout="handleLogout"
          @login="handleLogin"
        />
        
        <NLayoutContent class="content">
          <div class="content-container">
            <router-view />
          </div>
        </NLayoutContent>
        
        <AppFooter 
          :copyright="`&copy; ${new Date().getFullYear()} Vue Portfolio. All rights reserved.`"
          :social-links="{
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            email: 'mailto:contact@example.com'
          }"
          :footer-links="[
            { label: 'Home', url: '/' },
            { label: 'Projects', url: '/projects' },
            { label: 'Contact', url: '/contact' }
          ]"
          @contact-click="handleContactClick"
          @subscribe="handleSubscribe"
        />
      </NLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style>
:root {
  --primary-color: #4CAF50;
  --secondary-color: #34495e;
  --text-color: #333;
  --border-color: #eaeaea;
  --background-color: #f9f9f9;
  --card-background: #ffffff;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background-color);
  color: var(--text-color);
}

.layout {
  min-height: 100vh;
}

.content {
  padding: 0;
  background-color: var(--background-color);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

button {
  font-family: inherit;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  transition: all 0.3s;
}

.placeholder-image {
  background-color: var(--secondary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.section-title {
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: var(--secondary-color);
  display: inline-block;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid var(--primary-color);
}

/* NaiveUI theme overrides */
.n-button {
  --n-color: var(--primary-color);
  --n-color-hover: #3aa876;
  --n-color-pressed: #3aa876;
  --n-color-focus: var(--primary-color);
  --n-ripple-color: rgba(76, 175, 80, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .content-container {
    padding: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
