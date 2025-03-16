<script setup>
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  NLayout, 
  NLayoutHeader, 
  NMenu, 
  NButton, 
  NIcon, 
  NDropdown,
  NSpace
} from 'naive-ui'
import { 
  HomeOutlined as Home, 
  ProjectOutlined as Project, 
  MailOutlined as Mail,
  UserOutlined as User,
  SettingOutlined as Setting
} from '@vicons/antd'

// Define props using the defineProps macro
const props = defineProps({
  title: {
    type: String,
    default: 'My Portfolio'
  },
  userName: {
    type: String,
    default: ''
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'light'
  }
})

// Define emits using the defineEmits macro
const emit = defineEmits(['toggle-theme', 'logout', 'login'])

const router = useRouter()
const activeKey = ref(router.currentRoute.value.name)

// Method to handle theme toggle
const handleToggleTheme = () => {
  emit('toggle-theme')
}

// Method to handle logout
const handleLogout = () => {
  emit('logout')
}

// Method to handle login
const handleLogin = () => {
  emit('login')
}

// Menu options
const menuOptions = [
  {
    label: 'Home',
    key: 'home',
    icon: renderIcon(Home),
    onClick: () => router.push({ name: 'home' })
  },
  {
    label: 'Projects',
    key: 'projects',
    icon: renderIcon(Project),
    onClick: () => router.push({ name: 'projects' })
  },
  {
    label: 'Contact',
    key: 'contact',
    icon: renderIcon(Mail),
    onClick: () => router.push({ name: 'contact' })
  }
]

// User dropdown menu options
const userOptions = [
  {
    label: 'Profile',
    key: 'profile',
    icon: renderIcon(User)
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: renderIcon(Setting)
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: 'Logout',
    key: 'logout'
  }
]

// Helper function to render icons
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// Method to handle route changes
const handleUpdateValue = (key) => {
  activeKey.value = key
}

// Method to handle user dropdown selection
const handleSelect = (key) => {
  if (key === 'logout') {
    handleLogout()
  }
}
</script>

<template>
  <NLayoutHeader class="header" bordered>
    <div class="header-content">
      <div class="logo-container">
        <h1 class="logo">{{ props.title }}</h1>
      </div>
      
      <div class="menu-container">
        <NMenu
          v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions"
          @update:value="handleUpdateValue"
        />
      </div>
      
      <div class="actions-container">
        <NSpace>
          <NButton quaternary @click="handleToggleTheme">
            {{ props.theme === 'dark' ? '☀️' : '🌙' }}
          </NButton>
          
          <template v-if="props.isLoggedIn">
            <NDropdown
              trigger="click"
              :options="userOptions"
              @select="handleSelect"
            >
              <NButton>
                <template #icon>
                  <NIcon><UserOutlined /></NIcon>
                </template>
                {{ props.userName || 'User' }}
              </NButton>
            </NDropdown>
          </template>
          
          <template v-else>
            <NButton @click="handleLogin">
              Login
            </NButton>
          </template>
        </NSpace>
      </div>
    </div>
  </NLayoutHeader>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--n-color);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 64px;
}

.logo-container {
  flex: 0 0 auto;
}

.logo {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.menu-container {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
}

.actions-container {
  flex: 0 0 auto;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }
  
  .logo-container, .menu-container, .actions-container {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .menu-container {
    order: 3;
  }
  
  .actions-container {
    display: flex;
    justify-content: flex-end;
    order: 2;
  }
}
</style>
