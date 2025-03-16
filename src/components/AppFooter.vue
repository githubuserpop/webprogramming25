<script setup>
import { h } from 'vue'
import { 
  NLayout, 
  NLayoutFooter, 
  NGrid, 
  NGridItem, 
  NSpace, 
  NButton, 
  NIcon, 
  NDivider,
  NText
} from 'naive-ui'
import { 
  GithubOutlined as Github, 
  LinkedinOutlined as Linkedin, 
  TwitterOutlined as Twitter,
  MailOutlined as Mail,
  HeartFilled as Heart
} from '@vicons/antd'

// Define props using the defineProps macro
const props = defineProps({
  copyright: {
    type: String,
    default: `© ${new Date().getFullYear()} My Portfolio. All rights reserved.`
  },
  socialLinks: {
    type: Object,
    default: () => ({
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'mailto:contact@example.com'
    })
  },
  footerLinks: {
    type: Array,
    default: () => [
      { label: 'Privacy Policy', url: '#privacy' },
      { label: 'Terms of Service', url: '#terms' },
      { label: 'Contact', url: '#contact' }
    ]
  }
})

// Define emits using the defineEmits macro
const emit = defineEmits(['contact-click', 'subscribe'])

// Method to handle contact button click
const handleContactClick = () => {
  emit('contact-click')
}

// Method to handle subscribe
const handleSubscribe = (email) => {
  emit('subscribe', email)
}

// Helper function to render icons
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<template>
  <NLayoutFooter class="footer" bordered>
    <div class="footer-content">
      <NGrid :cols="24" :x-gap="12">
        <!-- About Section -->
        <NGridItem :span="24" :md="8">
          <div class="footer-section">
            <h3 class="footer-title">About</h3>
            <p class="footer-text">
              A modern portfolio website showcasing my web development skills and projects.
              Built with Vue 3, Pinia, and Naive UI.
            </p>
          </div>
        </NGridItem>
        
        <!-- Quick Links -->
        <NGridItem :span="24" :md="8">
          <div class="footer-section">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="footer-links">
              <li v-for="link in props.footerLinks" :key="link.label">
                <a :href="link.url">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </NGridItem>
        
        <!-- Contact Information -->
        <NGridItem :span="24" :md="8">
          <div class="footer-section">
            <h3 class="footer-title">Get in Touch</h3>
            <p class="footer-text">
              Have a question or want to work together?
            </p>
            <NButton type="primary" @click="handleContactClick">
              Contact Me
              <template #icon>
                <NIcon><MailOutlined /></NIcon>
              </template>
            </NButton>
          </div>
        </NGridItem>
      </NGrid>
      
      <NDivider />
      
      <!-- Bottom Footer -->
      <div class="bottom-footer">
        <div class="copyright">
          <NText>{{ props.copyright }}</NText>
        </div>
        
        <div class="social-links">
          <NSpace>
            <NButton quaternary circle tag="a" :href="props.socialLinks.github" target="_blank">
              <template #icon>
                <NIcon><Github /></NIcon>
              </template>
            </NButton>
            
            <NButton quaternary circle tag="a" :href="props.socialLinks.linkedin" target="_blank">
              <template #icon>
                <NIcon><Linkedin /></NIcon>
              </template>
            </NButton>
            
            <NButton quaternary circle tag="a" :href="props.socialLinks.twitter" target="_blank">
              <template #icon>
                <NIcon><Twitter /></NIcon>
              </template>
            </NButton>
            
            <NButton quaternary circle tag="a" :href="props.socialLinks.email">
              <template #icon>
                <NIcon><Mail /></NIcon>
              </template>
            </NButton>
          </NSpace>
        </div>
      </div>
      
      <div class="made-with">
        <NText>Made with</NText>
        <NIcon><Heart /></NIcon>
        <NText>using Vue and Naive UI</NText>
      </div>
    </div>
  </NLayoutFooter>
</template>

<style scoped>
.footer {
  background-color: var(--n-color);
  padding: 2rem 0 1rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-section {
  margin-bottom: 1.5rem;
}

.footer-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-text {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  text-decoration: none;
  color: inherit;
  transition: opacity 0.3s;
}

.footer-links a:hover {
  opacity: 0.7;
}

.bottom-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.copyright {
  font-size: 0.875rem;
}

.made-with {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 1rem;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .bottom-footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .social-links {
    margin-top: 1rem;
  }
}
</style>
