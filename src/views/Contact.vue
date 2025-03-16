<script setup>
import { ref, watch, computed } from 'vue'
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  preferredContact: 'email'
})

const subjects = [
  'General Inquiry',
  'Project Collaboration',
  'Job Opportunity',
  'Feedback',
  'Other'
]

const formSubmitted = ref(false)
const isSubmitting = ref(false)
const formErrors = ref({})
const showSavedContacts = ref(false)

// Computed property for saved contacts
const savedContacts = computed(() => counterStore.contacts)

// Using watch to detect changes in form inputs and log them to the console
watch(formData, (newValue) => {
  console.log('Form data changed:', newValue)
  validateForm() // Validate on change
}, { deep: true })

// Form validation
const validateForm = () => {
  const errors = {}
  
  if (!formData.value.name.trim()) {
    errors.name = 'Name is required'
  }
  
  if (!formData.value.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (formData.value.preferredContact === 'phone' && !formData.value.phone) {
    errors.phone = 'Phone number is required when selected as preferred contact method'
  }
  
  if (!formData.value.message.trim()) {
    errors.message = 'Message is required'
  } else if (formData.value.message.length < 10) {
    errors.message = 'Message should be at least 10 characters'
  }
  
  formErrors.value = errors
  return Object.keys(errors).length === 0
}

const toggleSavedContacts = () => {
  showSavedContacts.value = !showSavedContacts.value
}

const submitForm = () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    counterStore.addContact({
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      subject: formData.value.subject,
      message: formData.value.message,
      preferredContact: formData.value.preferredContact,
      date: new Date().toISOString()
    })
    
    isSubmitting.value = false
    formSubmitted.value = true
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      preferredContact: 'email'
    }
    
    // Clear errors
    formErrors.value = {}
  }, 1000)
}

const sendAnotherMessage = () => {
  formSubmitted.value = false
}
</script>

<template>
  <section class="contact-section">
    <h1 class="section-title">Contact</h1>
    
    <div class="contact-container">
      <div class="contact-form-container">
        <div v-if="formSubmitted" class="success-message">
          <div class="success-icon">✓</div>
          <h3>Thank you for your message!</h3>
          <p>We'll get back to you as soon as possible.</p>
          <button @click="sendAnotherMessage" class="reset-btn">Send another message</button>
        </div>
        
        <form v-else @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="name">Name <span class="required">*</span></label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              :class="{'error-input': formErrors.name}"
              placeholder="Enter your name"
            >
            <p v-if="formErrors.name" class="error-message">{{ formErrors.name }}</p>
          </div>
          
          <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              :class="{'error-input': formErrors.email}"
              placeholder="Enter your email"
            >
            <p v-if="formErrors.email" class="error-message">{{ formErrors.email }}</p>
          </div>
          
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="formData.phone"
              :class="{'error-input': formErrors.phone}" 
              placeholder="Enter your phone number"
            >
            <p v-if="formErrors.phone" class="error-message">{{ formErrors.phone }}</p>
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <select 
              id="subject" 
              v-model="formData.subject"
            >
              <option value="" disabled selected>Select a subject</option>
              <option v-for="subject in subjects" :key="subject" :value="subject">
                {{ subject }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Preferred Contact Method</label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="formData.preferredContact" 
                  value="email"
                >
                Email
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="formData.preferredContact" 
                  value="phone"
                >
                Phone
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label for="message">Message <span class="required">*</span></label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              rows="5" 
              :class="{'error-input': formErrors.message}"
              placeholder="Your message"
            ></textarea>
            <p v-if="formErrors.message" class="error-message">{{ formErrors.message }}</p>
          </div>
          
          <button type="submit" :disabled="isSubmitting" class="submit-btn">
            <span v-if="isSubmitting" class="spinner"></span>
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
      
      <div class="contact-info-container">
        <div class="contact-details">
          <h3>Get in Touch</h3>
          <p>Have a question or want to work together? Feel free to reach out through any of the following channels:</p>
          
          <div class="contact-method">
            <div class="contact-icon">✉️</div>
            <div class="contact-text">
              <h4>Email</h4>
              <p>contact@example.com</p>
            </div>
          </div>
          
          <div class="contact-method">
            <div class="contact-icon">📱</div>
            <div class="contact-text">
              <h4>Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div class="contact-method">
            <div class="contact-icon">📍</div>
            <div class="contact-text">
              <h4>Location</h4>
              <p>San Francisco, CA</p>
            </div>
          </div>
          
          <div class="social-links">
            <h4>Follow Me</h4>
            <div class="social-icons">
              <a href="#" class="social-icon">GitHub</a>
              <a href="#" class="social-icon">LinkedIn</a>
              <a href="#" class="social-icon">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="saved-contacts-section">
      <div class="saved-contacts-header">
        <h3>Saved Messages</h3>
        <button @click="toggleSavedContacts" class="toggle-btn">
          {{ showSavedContacts ? 'Hide Messages' : 'Show Messages' }}
        </button>
      </div>
      
      <div v-if="showSavedContacts" class="saved-contacts-list">
        <div v-if="savedContacts.length === 0" class="no-contacts">
          <p>No messages have been submitted yet.</p>
        </div>
        
        <div v-else class="contacts-grid">
          <div v-for="contact in savedContacts" :key="contact.id" class="contact-card">
            <div class="contact-card-header">
              <h4>{{ contact.name }}</h4>
              <span class="contact-date">{{ new Date(contact.date).toLocaleDateString() }}</span>
            </div>
            <div class="contact-card-body">
              <p><strong>Email:</strong> {{ contact.email }}</p>
              <p v-if="contact.phone"><strong>Phone:</strong> {{ contact.phone }}</p>
              <p v-if="contact.subject"><strong>Subject:</strong> {{ contact.subject }}</p>
              <p><strong>Message:</strong> {{ contact.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  margin-bottom: 2rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.contact-form-container {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.contact-form {
  max-width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.required {
  color: #e74c3c;
}

input, textarea, select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

input:focus, textarea:focus, select:focus {
  border-color: var(--primary-color);
  outline: none;
}

.error-input {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.radio-label input {
  width: auto;
  margin: 0;
}

.submit-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.submit-btn:hover {
  background-color: #3aa876;
}

.submit-btn:disabled {
  background-color: #78c2a4;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
}

.success-message {
  background-color: #e6f7ef;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

.success-icon {
  width: 50px;
  height: 50px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
}

.reset-btn {
  margin-top: 1rem;
  background-color: #fff;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.reset-btn:hover {
  background-color: #f5f9f7;
}

/* Contact info styles */
.contact-info-container {
  background-color: var(--secondary-color);
  color: white;
  border-radius: 8px;
  padding: 2rem;
}

.contact-details h3 {
  margin-bottom: 1rem;
  color: white;
}

.contact-method {
  display: flex;
  margin-bottom: 1.5rem;
  align-items: flex-start;
  gap: 1rem;
}

.contact-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.contact-text h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.contact-text p {
  margin: 0;
  opacity: 0.9;
}

.social-links {
  margin-top: 2rem;
}

.social-links h4 {
  margin-bottom: 0.75rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  transition: background-color 0.3s;
}

.social-icon:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Saved contacts section */
.saved-contacts-section {
  margin-top: 3rem;
}

.saved-contacts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.toggle-btn {
  background-color: var(--secondary-color);
  color: white;
}

.saved-contacts-list {
  animation: fadeIn 0.5s ease;
}

.no-contacts {
  text-align: center;
  padding: 2rem;
  background-color: #f5f9f7;
  border-radius: 8px;
}

.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.contact-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.contact-card-header {
  background-color: var(--secondary-color);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-card-header h4 {
  margin: 0;
}

.contact-date {
  font-size: 0.75rem;
  opacity: 0.8;
}

.contact-card-body {
  padding: 1rem;
}

.contact-card-body p {
  margin: 0.5rem 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
