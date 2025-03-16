import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', () => {
  // State properties
  const projects = ref([
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A fully responsive e-commerce platform with product filtering, user authentication, and payment processing.',
      image: '/path/to/ecommerce.jpg',
      date: '2024-02-15',
      tags: ['Vue.js', 'Firebase', 'Stripe', 'Responsive Design'],
      category: 'Web Development',
      features: [
        'User authentication and profiles',
        'Product search and filtering',
        'Shopping cart functionality',
        'Payment processing with Stripe',
        'Order history tracking'
      ],
      githubLink: 'https://github.com/username/ecommerce-platform',
      demoLink: 'https://ecommerce-demo.example.com',
      isFeatured: true,
      viewCount: 0
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A productivity application for managing tasks, projects, and team collaboration with real-time updates.',
      image: '/path/to/task-app.jpg',
      date: '2023-11-10',
      tags: ['Vue.js', 'Pinia', 'Firebase', 'Real-time'],
      category: 'Productivity',
      features: [
        'Drag-and-drop task organization',
        'Team collaboration features',
        'Task priority and status tracking',
        'Due date notifications',
        'Project progress analytics'
      ],
      githubLink: 'https://github.com/username/task-management',
      demoLink: 'https://task-app.example.com',
      isFeatured: true,
      viewCount: 0
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather application that provides current conditions, forecasts, and historical weather data for locations worldwide.',
      image: '/path/to/weather.jpg',
      date: '2023-09-05',
      tags: ['Vue.js', 'API Integration', 'Data Visualization'],
      category: 'Utility',
      features: [
        'Location-based weather forecasts',
        'Interactive weather maps',
        '7-day forecast predictions',
        'Historical weather data charts',
        'Weather alert notifications'
      ],
      githubLink: 'https://github.com/username/weather-dashboard',
      demoLink: 'https://weather-app.example.com',
      isFeatured: false,
      viewCount: 0
    }
  ])
  
  const blogPosts = ref([
    {
      id: 1,
      title: 'Getting Started with Vue 3 Composition API',
      content: 'The Composition API is a set of function-based APIs that allow flexible composition of component logic...',
      excerpt: 'Learn how to leverage the power of Vue 3 Composition API to create more maintainable and scalable applications.',
      date: '2023-12-05',
      author: 'John Doe',
      tags: ['Vue.js', 'JavaScript', 'Web Development'],
      imageUrl: '/path/to/vue-composition.jpg',
      published: true,
      comments: []
    },
    {
      id: 2,
      title: 'Building Reactive UIs with NaiveUI',
      content: 'NaiveUI is a Vue 3 component library that provides a rich set of components and features...',
      excerpt: 'Discover how to build beautiful and responsive user interfaces using the NaiveUI library for Vue 3.',
      date: '2024-01-20',
      author: 'Jane Smith',
      tags: ['UI Design', 'Components', 'Frontend'],
      imageUrl: '/path/to/ui-libraries.jpg',
      published: true,
      comments: []
    }
  ])
  
  const contactSubmissions = ref([])
  
  const webInfo = ref({
    title: 'Vue Portfolio',
    description: 'A modern portfolio website built with Vue 3, Pinia, and NaiveUI',
    author: 'Your Name',
    copyrightYear: new Date().getFullYear(),
    socialLinks: {
      github: 'https://github.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourprofile',
      twitter: 'https://twitter.com/yourhandle',
      email: 'your.email@example.com'
    },
    logoUrl: '/logo.png',
    navLinks: [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'Contact', path: '/contact' }
    ],
    footerLinks: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Sitemap', path: '/sitemap' }
    ],
    companyInfo: {
      name: 'Your Company LLC',
      address: '123 Web Dev Street, Coding City, 12345',
      phone: '+1 (555) 123-4567'
    },
    lastUpdated: new Date().toISOString()
  })
  
  const pageViews = ref({})

  // Computed properties
  const featuredProjects = computed(() => {
    return projects.value.filter(project => project.isFeatured)
  })
  
  const projectCategories = computed(() => {
    const categories = new Set()
    projects.value.forEach(project => categories.add(project.category))
    return Array.from(categories)
  })
  
  const projectTags = computed(() => {
    const tags = new Set()
    projects.value.forEach(project => {
      project.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  })
  
  const publishedBlogPosts = computed(() => {
    return blogPosts.value.filter(post => post.published)
  })
  
  const totalPageViews = computed(() => {
    return Object.values(pageViews.value).reduce((sum, count) => sum + count, 0)
  })

  // Actions
  function addProject(project) {
    const newId = projects.value.length > 0 
      ? Math.max(...projects.value.map(p => p.id)) + 1 
      : 1
    
    projects.value.push({
      ...project,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      viewCount: 0
    })
    
    return newId
  }
  
  function updateProject(id, updates) {
    const index = projects.value.findIndex(p => p.id === id)
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...updates }
      return true
    }
    return false
  }
  
  function removeProject(id) {
    const index = projects.value.findIndex(p => p.id === id)
    if (index !== -1) {
      projects.value.splice(index, 1)
      return true
    }
    return false
  }
  
  function incrementProjectView(id) {
    const project = projects.value.find(p => p.id === id)
    if (project) {
      project.viewCount++
    }
  }
  
  function addBlogPost(post) {
    const newId = blogPosts.value.length > 0 
      ? Math.max(...blogPosts.value.map(p => p.id)) + 1 
      : 1
    
    blogPosts.value.push({
      ...post,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      comments: []
    })
    
    return newId
  }
  
  function addContactSubmission(submission) {
    const newSubmission = {
      id: Date.now(),
      ...submission,
      date: new Date().toISOString(),
      status: 'new'
    }
    
    contactSubmissions.value.push(newSubmission)
    return newSubmission
  }
  
  function updatePageView(path) {
    if (!pageViews.value[path]) {
      pageViews.value[path] = 0
    }
    pageViews.value[path]++
  }
  
  function updateWebInfo(updates) {
    webInfo.value = { 
      ...webInfo.value, 
      ...updates, 
      lastUpdated: new Date().toISOString() 
    }
  }

  return {
    // State
    projects,
    blogPosts,
    contactSubmissions,
    webInfo,
    pageViews,
    
    // Computed
    featuredProjects,
    projectCategories,
    projectTags,
    publishedBlogPosts,
    totalPageViews,
    
    // Actions
    addProject,
    updateProject,
    removeProject,
    incrementProjectView,
    addBlogPost,
    addContactSubmission,
    updatePageView,
    updateWebInfo
  }
}, {
  persist: {
    storage: localStorage,
    paths: ['projects', 'blogPosts', 'contactSubmissions', 'webInfo', 'pageViews']
  }
})
