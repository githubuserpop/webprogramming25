<script setup>
import { NButton, NSpace, NSwitch, NText } from 'naive-ui'

// Using defineProps macro to define component props
const props = defineProps({
  /**
   * Current theme of the application
   */
  currentTheme: {
    type: String,
    required: true,
    validator: (value) => ['light', 'dark'].includes(value)
  },
  
  /**
   * Label for the theme toggler
   */
  label: {
    type: String,
    default: 'Toggle Theme'
  },
  
  /**
   * Size of the toggle button
   */
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

// Using defineEmits macro to define component events
const emit = defineEmits({
  /**
   * Emitted when theme is toggled
   * @param {string} newTheme - The new theme value ('light' or 'dark')
   */
  'update:theme': (newTheme) => typeof newTheme === 'string',
  
  /**
   * Emitted when toggle action is completed
   * @param {Object} eventData - Data about the toggle event
   */
  'toggle-completed': (eventData) => typeof eventData === 'object'
})

// Toggle theme handler
const handleToggle = () => {
  // Determine the new theme based on the current one
  const newTheme = props.currentTheme === 'light' ? 'dark' : 'light'
  
  // Emit the update event with the new theme
  emit('update:theme', newTheme)
  
  // Emit the completed event with additional data
  emit('toggle-completed', { 
    timestamp: new Date().toISOString(),
    previousTheme: props.currentTheme,
    newTheme: newTheme
  })
}
</script>

<template>
  <div class="theme-toggler">
    <NSpace align="center" :size="20">
      <NText>{{ props.label }}</NText>
      
      <NSwitch 
        :value="props.currentTheme === 'dark'"
        @update:value="handleToggle"
        :size="props.size"
      >
        <template #checked>
          🌙
        </template>
        <template #unchecked>
          ☀️
        </template>
      </NSwitch>
      
      <NText>
        Current theme: {{ props.currentTheme }}
      </NText>
    </NSpace>
    
    <NSpace vertical class="theme-info">
      <NText>Theme Toggler Component Information:</NText>
      <NText depth="3">
        This component demonstrates the use of defineProps and defineEmits macros in Vue 3.
        It receives props from the parent and emits events back to update the application state.
      </NText>
    </NSpace>
  </div>
</template>

<style scoped>
.theme-toggler {
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: rgba(76, 175, 80, 0.05);
  margin-bottom: 24px;
}

.theme-info {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--border-color);
}
</style>
