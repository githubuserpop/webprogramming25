import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePreferencesStore = defineStore('preferences', () => {
  // State properties
  const theme = ref('light')
  const userName = ref('')
  const userEmail = ref('')
  const isLoggedIn = ref(false)
  const lastLoginDate = ref(null)
  const visitsCount = ref(0)
  const favoriteProjects = ref([])
  const siteSettings = ref({
    enableNotifications: true,
    showFeaturedProjectsOnHome: true,
    defaultProjectCategory: 'all',
    fontSize: 'medium', // small, medium, large
    rememberLastVisitedPage: true
  })

  // Computed properties
  const isDarkMode = computed(() => theme.value === 'dark')
  const userInitials = computed(() => {
    if (!userName.value) return 'G'
    const names = userName.value.split(' ')
    return names.map(name => name.charAt(0).toUpperCase()).join('')
  })

  // Actions
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function setTheme(newTheme) {
    if (['light', 'dark'].includes(newTheme)) {
      theme.value = newTheme
    }
  }

  function login(user) {
    userName.value = user.name
    userEmail.value = user.email
    isLoggedIn.value = true
    lastLoginDate.value = new Date().toISOString()
    visitsCount.value++
  }

  function logout() {
    isLoggedIn.value = false
  }

  function toggleFavoriteProject(projectId) {
    const index = favoriteProjects.value.indexOf(projectId)
    if (index === -1) {
      favoriteProjects.value.push(projectId)
    } else {
      favoriteProjects.value.splice(index, 1)
    }
  }

  function updateSiteSettings(newSettings) {
    siteSettings.value = { ...siteSettings.value, ...newSettings }
  }

  function resetPreferences() {
    theme.value = 'light'
    siteSettings.value = {
      enableNotifications: true,
      showFeaturedProjectsOnHome: true,
      defaultProjectCategory: 'all',
      fontSize: 'medium',
      rememberLastVisitedPage: true
    }
  }

  return {
    // State
    theme,
    userName,
    userEmail,
    isLoggedIn,
    lastLoginDate,
    visitsCount,
    favoriteProjects,
    siteSettings,
    
    // Computed
    isDarkMode,
    userInitials,
    
    // Actions
    toggleTheme,
    setTheme,
    login,
    logout,
    toggleFavoriteProject,
    updateSiteSettings,
    resetPreferences
  }
}, {
  persist: {
    storage: localStorage,
    paths: [
      'theme', 
      'userName', 
      'userEmail', 
      'isLoggedIn', 
      'lastLoginDate', 
      'visitsCount', 
      'favoriteProjects', 
      'siteSettings'
    ]
  }
})
