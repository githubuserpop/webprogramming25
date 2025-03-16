<script setup>
import { ref, watch } from 'vue'

// Props from parent
const props = defineProps({
  initialCount: {
    type: Number,
    default: 0
  }
})

// Emit events to parent
const emit = defineEmits(['count-changed'])

const count = ref(props.initialCount)

// Watch for changes in initialCount prop
watch(() => props.initialCount, (newValue) => {
  count.value = newValue
})

const increment = () => {
  count.value++
  emit('count-changed', count.value)
}
</script>

<template>
  <div class="counter">
    <button @click="increment" class="counter-button">
      Click me!
    </button>
  </div>
</template>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.counter-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.counter-button:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
}

.counter-button:active {
  transform: translateY(0);
}
</style>
