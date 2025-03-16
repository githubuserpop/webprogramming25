<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCounterStore } from '../stores/counter'
import ProjectCard from '../components/ProjectCard.vue'

const counterStore = useCounterStore()
const projects = computed(() => counterStore.projectsList)
const hasProjects = computed(() => counterStore.hasProjects)
const totalProjects = computed(() => counterStore.totalProjects)

// Categories based on project tags
const categories = computed(() => {
  const allTags = projects.value.flatMap(project => project.tags)
  return [...new Set(allTags)].sort()
})

// Active category filter
const activeCategory = ref('All')

// Filtered projects
const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects.value
  }
  return projects.value.filter(project => 
    project.tags.includes(activeCategory.value)
  )
})

// Handle category change
const changeCategory = (category) => {
  activeCategory.value = category
}

// Handle view project details
const handleViewProjectDetails = (project) => {
  selectedProject.value = project
  showProjectDetails.value = true
}

// Selected project for detail view
const selectedProject = ref(null)
const showProjectDetails = ref(false)

// Close project details
const closeProjectDetails = () => {
  showProjectDetails.value = false
  setTimeout(() => {
    selectedProject.value = null
  }, 300)
}
</script>

<template>
  <section class="projects-section">
    <h1 class="section-title">Projects</h1>
    
    <div class="projects-summary">
      <p>Total Projects: {{ totalProjects }}</p>
    </div>
    
    <div class="filters">
      <h3>Filter by Category:</h3>
      <div class="category-filters">
        <button 
          class="category-btn" 
          :class="{ active: activeCategory === 'All' }"
          @click="changeCategory('All')"
        >
          All
        </button>
        <button 
          v-for="category in categories" 
          :key="category"
          class="category-btn"
          :class="{ active: activeCategory === category }"
          @click="changeCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>
    
    <div v-if="hasProjects && filteredProjects.length > 0" class="projects-grid">
      <ProjectCard 
        v-for="project in filteredProjects" 
        :key="project.id" 
        :project="project"
        @view-details="handleViewProjectDetails"
      />
    </div>
    
    <div v-else-if="hasProjects && filteredProjects.length === 0" class="no-projects">
      <p>No projects found in the "{{ activeCategory }}" category</p>
      <button @click="changeCategory('All')" class="reset-btn">Show All Projects</button>
    </div>
    
    <div v-else class="no-projects">
      <p>No projects available</p>
    </div>
    
    <!-- Project Details Modal -->
    <div v-if="showProjectDetails && selectedProject" class="project-modal" :class="{ 'show': showProjectDetails }">
      <div class="modal-backdrop" @click="closeProjectDetails"></div>
      <div class="modal-content">
        <button class="close-btn" @click="closeProjectDetails">&times;</button>
        
        <div class="project-header">
          <h2>{{ selectedProject.title }}</h2>
          <span class="project-date">{{ selectedProject.date }}</span>
        </div>
        
        <div class="project-detail-image">
          <div class="placeholder-image">{{ selectedProject.title }} Screenshot</div>
        </div>
        
        <div class="project-description">
          <p>{{ selectedProject.description }}</p>
        </div>
        
        <div class="project-tags">
          <span v-for="(tag, index) in selectedProject.tags" :key="index" class="tag">
            {{ tag }}
          </span>
        </div>
        
        <div class="project-features">
          <h3>Key Features</h3>
          <ul>
            <li v-for="(feature, index) in selectedProject.features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>
        
        <div class="project-links">
          <a :href="selectedProject.github" target="_blank" class="github-link">
            View on GitHub
          </a>
          <button class="demo-link">Live Demo</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  margin-bottom: 2rem;
  position: relative;
}

.projects-summary {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f5f9f7;
  border-radius: 8px;
  display: inline-block;
}

.filters {
  margin-bottom: 2rem;
}

.filters h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: var(--secondary-color);
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-btn {
  background-color: #f0f0f0;
  color: var(--secondary-color);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s;
}

.category-btn:hover {
  background-color: #e0e0e0;
}

.category-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.no-projects {
  padding: 2rem;
  text-align: center;
  background-color: #f5f9f7;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.reset-btn {
  margin-top: 1rem;
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

/* Modal */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.project-modal.show {
  opacity: 1;
  pointer-events: auto;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  z-index: 1001;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: modalIn 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #777;
}

.project-header {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.project-date {
  color: #777;
  font-size: 0.875rem;
}

.project-detail-image {
  margin-bottom: 1.5rem;
  height: 300px;
}

.project-detail-image .placeholder-image {
  height: 100%;
  border-radius: 8px;
}

.project-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  background-color: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--secondary-color);
}

.project-features {
  margin-bottom: 1.5rem;
}

.project-features h3 {
  margin-bottom: 0.75rem;
  color: var(--secondary-color);
}

.project-features ul {
  padding-left: 1.25rem;
}

.project-features li {
  margin-bottom: 0.5rem;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.github-link, .demo-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s;
}

.github-link {
  background-color: var(--secondary-color);
  color: white;
}

.github-link:hover {
  background-color: #2a3c4d;
}

.demo-link {
  background-color: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
}

.demo-link:hover {
  background-color: #3aa876;
}

@keyframes modalIn {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .project-links {
    flex-direction: column;
  }
  
  .github-link, .demo-link {
    width: 100%;
  }
}
</style>
