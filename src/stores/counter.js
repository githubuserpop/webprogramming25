import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const visitors = ref(0)
  const showMessage = ref(false)
  const theme = ref('light')
  const projectsList = ref([
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
      isFeatured: true
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
      isFeatured: true
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
      isFeatured: false
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A professional portfolio website showcasing projects, skills, and contact information for a web developer.',
      image: '/path/to/portfolio.jpg',
      date: '2023-07-20',
      tags: ['Vue.js', 'Animation', 'Responsive Design'],
      category: 'Personal',
      features: [
        'Responsive design for all devices',
        'Interactive project showcase',
        'Skill visualization with charts',
        'Contact form with validation',
        'Performance optimization'
      ],
      githubLink: 'https://github.com/username/portfolio',
      demoLink: 'https://portfolio.example.com',
      isFeatured: true
    },
    {
      id: 5,
      title: 'Recipe Finder',
      description: 'A culinary application that helps users discover recipes based on available ingredients, dietary restrictions, and preferences.',
      image: '/path/to/recipe.jpg',
      date: '2023-05-15',
      tags: ['Vue.js', 'API Integration', 'Firebase'],
      category: 'Lifestyle',
      features: [
        'Ingredient-based recipe search',
        'Dietary filter options',
        'Recipe saving and favorites',
        'Nutritional information display',
        'Meal planning calendar'
      ],
      githubLink: 'https://github.com/username/recipe-finder',
      demoLink: 'https://recipe-app.example.com',
      isFeatured: false
    },
    {
      id: 6,
      title: 'Social Media Dashboard',
      description: 'A dashboard for managing and analyzing social media presence across multiple platforms.',
      image: '/path/to/social.jpg',
      date: '2023-03-10',
      tags: ['Vue.js', 'Data Visualization', 'API Integration'],
      category: 'Marketing',
      features: [
        'Multi-platform account management',
        'Post scheduling and automation',
        'Engagement analytics and reports',
        'Audience demographic insights',
        'Content performance tracking'
      ],
      githubLink: 'https://github.com/username/social-dashboard',
      demoLink: 'https://social-dashboard.example.com',
      isFeatured: false
    }
  ])
  const contacts = ref([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '555-123-4567',
      subject: 'Project Inquiry',
      message: 'I would like to discuss a potential web development project for my company.',
      preferredContact: 'email',
      date: '2023-12-10T14:30:00Z'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '555-987-6543',
      subject: 'Collaboration Opportunity',
      message: 'I am interested in collaborating on an open-source project. Please let me know if you would be available for a discussion.',
      preferredContact: 'phone',
      date: '2024-01-15T09:45:00Z'
    }
  ])
  const skills = ref([
    {
      id: 1,
      name: 'Vue.js',
      icon: '⚡',
      category: 'Frontend',
      description: 'Building reactive and component-based user interfaces with Vue.js and its ecosystem.',
      level: 95
    },
    {
      id: 2,
      name: 'JavaScript',
      icon: '🔧',
      category: 'Programming',
      description: 'Modern JavaScript development including ES6+ features, async/await, and functional programming.',
      level: 90
    },
    {
      id: 3,
      name: 'UI/UX Design',
      icon: '🎨',
      category: 'Design',
      description: 'Creating intuitive user interfaces and experiences with focus on accessibility and usability.',
      level: 85
    },
    {
      id: 4,
      name: 'Node.js',
      icon: '🚀',
      category: 'Backend',
      description: 'Server-side JavaScript development with Express, API design, and database integration.',
      level: 80
    },
    {
      id: 5,
      name: 'CSS & Sass',
      icon: '💅',
      category: 'Frontend',
      description: 'Advanced styling with CSS3, Sass/SCSS, animations, and responsive design principles.',
      level: 90
    },
    {
      id: 6,
      name: 'Testing',
      icon: '🧪',
      category: 'Quality Assurance',
      description: 'Unit, integration, and E2E testing with frameworks like Jest, Vitest, and Cypress.',
      level: 75
    }
  ])
  const testimonials = ref([
    {
      id: 1,
      name: 'Michael Brown',
      role: 'CEO at TechCorp',
      content: 'Working with this developer was a fantastic experience. They delivered our e-commerce platform on time and with exceptional quality. The attention to detail and user experience considerations exceeded our expectations.',
      date: '2023-11-15'
    },
    {
      id: 2,
      name: 'Emily Chen',
      role: 'Product Manager',
      content: 'The project management application developed for our team has dramatically improved our productivity. The intuitive interface and thoughtful features showcase a deep understanding of user needs.',
      date: '2023-09-22'
    },
    {
      id: 3,
      name: 'David Wilson',
      role: 'Marketing Director',
      content: 'Our portfolio website has received numerous compliments since the redesign. The developer understood our brand vision perfectly and translated it into a stunning digital experience that has increased user engagement significantly.',
      date: '2024-01-18'
    }
  ])
  const blogPosts = ref([
    {
      id: 1,
      title: 'Mastering Vue 3 Composition API',
      excerpt: 'Learn how to leverage the power of Vue 3 Composition API to create more maintainable and scalable applications.',
      date: '2023-12-05',
      tags: ['Vue.js', 'JavaScript', 'Web Development'],
      imageUrl: '/path/to/vue-composition.jpg'
    },
    {
      id: 2,
      title: 'The Future of UI Component Libraries',
      excerpt: 'Exploring the trends and innovations in UI component libraries that are shaping the future of web development.',
      date: '2024-01-20',
      tags: ['UI Design', 'Components', 'Frontend'],
      imageUrl: '/path/to/ui-libraries.jpg'
    },
    {
      id: 3,
      title: 'Optimizing Web Performance: A Practical Guide',
      excerpt: 'Practical tips and techniques to improve the performance of your web applications and deliver a better user experience.',
      date: '2024-02-10',
      tags: ['Performance', 'Optimization', 'Web Development'],
      imageUrl: '/path/to/web-performance.jpg'
    }
  ])

  // Computed
  const featuredProjects = computed(() => {
    return projectsList.value.filter(project => project.isFeatured)
  })
  
  const projectsByCategory = computed(() => {
    const categories = {}
    projectsList.value.forEach(project => {
      if (!categories[project.category]) {
        categories[project.category] = []
      }
      categories[project.category].push(project)
    })
    return categories
  })
  
  const allTags = computed(() => {
    const tags = new Set()
    projectsList.value.forEach(project => {
      project.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  })

  // Actions
  function incrementCount() {
    count.value++
  }

  function resetCount() {
    count.value = 0
  }

  function registerVisitor() {
    visitors.value++
  }

  function toggleMessage() {
    showMessage.value = !showMessage.value
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function addContact(contact) {
    const newContact = {
      id: contacts.value.length + 1,
      ...contact,
      date: new Date().toISOString()
    }
    contacts.value.push(newContact)
    return newContact
  }

  function getProjectById(id) {
    return projectsList.value.find(project => project.id === id) || null
  }

  function filterProjectsByTags(tags) {
    if (!tags || tags.length === 0) {
      return projectsList.value
    }
    return projectsList.value.filter(project => 
      project.tags.some(tag => tags.includes(tag))
    )
  }

  return { 
    // State
    count, 
    visitors, 
    projectsList, 
    contacts,
    showMessage,
    theme,
    skills,
    testimonials,
    blogPosts,
    
    // Computed
    featuredProjects,
    projectsByCategory,
    allTags,
    
    // Actions
    incrementCount, 
    resetCount, 
    registerVisitor,
    toggleMessage,
    toggleTheme,
    addContact,
    getProjectById,
    filterProjectsByTags
  }
})
