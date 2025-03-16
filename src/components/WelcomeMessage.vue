<script setup>
import { ref, watch } from 'vue'

// Props from parent
const props = defineProps({
  userName: {
    type: String,
    default: ''
  }
})

// Emit events to parent
const emit = defineEmits(['update-name'])

const localName = ref(props.userName)

// Update parent when name changes
const updateName = () => {
  emit('update-name', localName.value)
}

// Watch for changes in userName prop
watch(() => props.userName, (newValue) => {
  localName.value = newValue
})
</script>

<template>
  <div class="welcome-message">
    <h2>Welcome to My Personal Website!</h2>
    
    <div v-if="userName" class="personalized-message">
      <p>Hello, {{ userName }}! Thank you for visiting my website.</p>
    </div>
    
    <div v-else class="name-input">
      <p>Enter your name for a personalized experience:</p>
      <div class="input-group">
        <input 
          type="text" 
          v-model="localName" 
          placeholder="Your name"
          @input="updateName"
        >
      </div>
    </div>
    
    <p class="intro-text">
      This website showcases my projects and skills as a web developer.
      Feel free to explore and get in touch if you'd like to collaborate!
    </p>
  </div>
</template>

<style scoped>
.welcome-message {
  margin-top: 1rem;
  animation: fadeIn 0.5s ease-in-out;
}

.personalized-message {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #e6f7ef;
  border-radius: 8px;
}

.name-input {
  margin: 1rem 0;
}

.input-group {
  margin-top: 0.5rem;
}

.intro-text {
  margin-top: 1rem;
  line-height: 1.6;
}

input {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
}

input:focus {
  border-color: var(--primary-color);
  outline: none;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
