<script setup>
import { ref } from 'vue'

// Define props
const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

// Define emits
const emit = defineEmits(['view-details'])

// Handle view details click
const viewDetails = () => {
  emit('view-details', props.project)
}

// Handle hover animation
const isHovered = ref(false)
</script>

<template>
  <div 
    class="project-card" 
    @mouseenter="isHovered = true" 
    @mouseleave="isHovered = false"
    :class="{ 'is-hovered': isHovered }"
  >
    <div class="card-image">
      <div class="placeholder-image">
        <span>{{ project.title }}</span>
      </div>
    </div>
    
    <div class="card-content">
      <h3 class="project-title">{{ project.title }}</h3>
      
      <div class="project-date">{{ project.date }}</div>
      
      <p class="project-summary">
        {{ project.description.length > 120 ? project.description.substring(0, 120) + '...' : project.description }}
      </p>
      
      <div class="project-tags">
        <span v-for="(tag, index) in project.tags" :key="index" class="tag">
          {{ tag }}
        </span>
      </div>
      
      <div class="card-actions">
        <button @click="viewDetails" class="view-details-btn">
          View Details
        </button>
        <a :href="project.github" target="_blank" class="github-link">
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.project-card.is-hovered {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-image {
  height: 180px;
  background-color: var(--secondary-color);
  position: relative;
  overflow: hidden;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 1.25rem;
  background-color: var(--secondary-color);
  transition: transform 0.5s ease;
}

.project-card.is-hovered .placeholder-image {
  transform: scale(1.05);
}

.card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-title {
  margin: 0 0 0.25rem;
  font-size: 1.25rem;
  color: var(--secondary-color);
}

.project-date {
  color: #777;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.project-summary {
  margin-bottom: 1rem;
  line-height: 1.5;
  color: #444;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.tag {
  background-color: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--secondary-color);
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.view-details-btn, .github-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  text-decoration: none;
}

.view-details-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  flex-grow: 1;
}

.view-details-btn:hover {
  background-color: #3aa876;
}

.github-link {
  background-color: var(--secondary-color);
  color: white;
}

.github-link:hover {
  background-color: #2a3c4d;
}
</style>
