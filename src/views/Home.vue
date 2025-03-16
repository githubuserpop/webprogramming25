<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCounterStore } from '../stores/counter'
import WelcomeMessage from '../components/WelcomeMessage.vue'
import ClickCounter from '../components/ClickCounter.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { 
  NSpace, 
  NCard, 
  NButton, 
  NIcon, 
  NTag, 
  NDivider, 
  NGrid, 
  NGridItem,
  NRadioGroup,
  NRadioButton,
  NText,
  NTimeline,
  NTimelineItem,
  NImage
} from 'naive-ui'

// Initialize store
const counterStore = useCounterStore()

// State variables
const userName = ref('')
const showWelcome = ref(true)
const count = ref(0)
const showAboutMore = ref(false)
const localTheme = ref('light')

// Computed properties for data from the store
const featuredProjects = computed(() => counterStore.featuredProjects)
const skills = computed(() => counterStore.skills)
const testimonials = computed(() => counterStore.testimonials)
const blogPosts = computed(() => counterStore.blogPosts)

// Handle name update from child component
const handleNameUpdate = (newName) => {
  userName.value = newName
}

// Handle count update from child component
const handleCountUpdate = (newCount) => {
  count.value = newCount
  console.log('Count updated:', newCount)
}

// Toggle more info in About section
const toggleAboutMore = () => {
  showAboutMore.value = !showAboutMore.value
}

// Demonstrate using theme toggler component with props and emits
const handleThemeChange = (newTheme) => {
  localTheme.value = newTheme
  console.log(`Theme changed to: ${newTheme}`)
}

// Handle toggle completed event from ThemeToggler
const handleToggleCompleted = (eventData) => {
  console.log('Toggle completed event received:', eventData)
}

// Simulate view project details
const handleViewProjectDetails = (project) => {
  console.log('View project details:', project.title)
}
</script>

<template>
  <section class="home-section">
    <h1 class="section-title">Home</h1>
    
    <!-- Demo of ThemeToggler component to showcase defineProps and defineEmits -->
    <div class="props-emits-demo">
      <NCard title="defineProps & defineEmits Demonstration" bordered>
        <p>
          This demonstrates communication between parent and child components using 
          Vue 3's <code>defineProps</code> and <code>defineEmits</code> macros:
        </p>
        
        <ThemeToggler 
          :current-theme="localTheme"
          label="Try changing the theme"
          size="medium"
          @update:theme="handleThemeChange"
          @toggle-completed="handleToggleCompleted"
        />
        
        <NText depth="3">
          Notes about this component:
          <ul>
            <li>Parent passes data down via props (currentTheme, label, size)</li>
            <li>Child emits events back up (update:theme, toggle-completed)</li>
            <li>This follows Vue 3's Composition API pattern</li>
          </ul>
        </NText>
      </NCard>
    </div>
    
    <NDivider />
    
    <!-- Welcome Message Section -->
    <WelcomeMessage 
      v-if="showWelcome" 
      :userName="userName" 
      @update-name="handleNameUpdate" 
    />
    
    <NButton v-else @click="showWelcome = true">Show Welcome</NButton>
    
    <!-- Counter Section -->
    <div v-if="showWelcome" class="counter-section">
      <NCard title="Interactive Counter" bordered>
        <ClickCounter 
          :initial-count="count" 
          @count-changed="handleCountUpdate" 
        />
        <p>Current count: {{ count }}</p>
      </NCard>
    </div>
    
    <NDivider />
    
    <!-- About Me Section -->
    <div class="about-section">
      <h2>About Me</h2>
      
      <NGrid :cols="24" :x-gap="12">
        <NGridItem :span="24" :md="8">
          <div class="profile-image">
            <div class="placeholder-image">Profile Image</div>
          </div>
        </NGridItem>
        
        <NGridItem :span="24" :md="16">
          <div class="profile-content">
            <p>
              I'm a passionate web developer with experience in building modern, 
              responsive web applications using Vue.js, React, and other frontend technologies.
            </p>
            
            <div v-if="showAboutMore">
              <p>
                My journey in web development started 5 years ago when I discovered my 
                passion for creating intuitive user interfaces. Since then, I've worked 
                on a variety of projects ranging from small business websites to complex 
                enterprise applications.
              </p>
              
              <p>
                I specialize in Vue.js development and have extensive experience with 
                its ecosystem, including Vuex/Pinia for state management, Vue Router 
                for navigation, and tools like Vite for building optimized applications.
              </p>
            </div>
            
            <NButton @click="toggleAboutMore">
              {{ showAboutMore ? 'Show Less' : 'Read More' }}
            </NButton>
          </div>
        </NGridItem>
      </NGrid>
    </div>
    
    <!-- Skills Section -->
    <div class="skills-section">
      <h2>Skills</h2>
      
      <NGrid :cols="24" :x-gap="12" :y-gap="16">
        <NGridItem v-for="skill in skills" :key="skill.id" :span="24" :md="8">
          <NCard :title="skill.name" bordered>
            <template #header-extra>
              <span class="skill-icon">{{ skill.icon }}</span>
            </template>
            
            <p>{{ skill.description }}</p>
            
            <div class="skill-level">
              <div 
                class="skill-level-bar" 
                :style="{ width: `${skill.level}%` }"
              ></div>
              <span class="skill-level-text">{{ skill.level }}%</span>
            </div>
          </NCard>
        </NGridItem>
      </NGrid>
    </div>
    
    <!-- Featured Projects Section -->
    <div class="featured-projects-section">
      <h2>Featured Projects</h2>
      
      <NGrid :cols="24" :x-gap="12" :y-gap="16">
        <NGridItem v-for="project in featuredProjects" :key="project.id" :span="24" :md="8">
          <ProjectCard 
            :project="project" 
            @view-details="handleViewProjectDetails"
          />
        </NGridItem>
      </NGrid>
    </div>
    
    <!-- Testimonials Section -->
    <div class="testimonials-section">
      <h2>Testimonials</h2>
      
      <NGrid :cols="24" :x-gap="12" :y-gap="16">
        <NGridItem v-for="testimonial in testimonials" :key="testimonial.id" :span="24" :md="8">
          <NCard bordered class="testimonial-card">
            <div class="testimonial-content">
              <p class="testimonial-text">
                "{{ testimonial.content }}"
              </p>
              
              <div class="testimonial-author">
                <div class="avatar placeholder-image">
                  {{ testimonial.name[0] }}
                </div>
                <div class="author-info">
                  <h4>{{ testimonial.name }}</h4>
                  <p>{{ testimonial.role }}</p>
                </div>
              </div>
            </div>
          </NCard>
        </NGridItem>
      </NGrid>
    </div>
  </section>
</template>

<style scoped>
.home-section {
  margin-bottom: 2rem;
}

.props-emits-demo {
  margin-bottom: 2rem;
}

.counter-section {
  margin: 2rem 0;
}

.about-section,
.skills-section,
.featured-projects-section,
.testimonials-section {
  margin: 3rem 0;
}

.about-section h2,
.skills-section h2,
.featured-projects-section h2,
.testimonials-section h2 {
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
  font-size: 1.75rem;
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.about-section h2::after,
.skills-section h2::after,
.featured-projects-section h2::after,
.testimonials-section h2::after {
  content: '';
  position: absolute;
  width: 50%;
  height: 3px;
  background-color: var(--primary-color);
  bottom: 0;
  left: 0;
}

.profile-image {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.skill-level {
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-top: 1rem;
  position: relative;
}

.skill-level-bar {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 4px;
}

.skill-level-text {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 0.875rem;
  color: var(--primary-color);
}

.testimonial-card {
  height: 100%;
}

.testimonial-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.25rem;
  font-weight: bold;
}

.author-info h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.author-info p {
  margin: 0;
  font-size: 0.875rem;
  color: #777;
}

@media (max-width: 768px) {
  .profile-image {
    height: 200px;
    margin-bottom: 1.5rem;
  }
}
</style>
