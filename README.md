# Vue 3 Personal Portfolio

## Features

- **Theme Toggling**: Switch between light and dark themes
- **Persistent State**: User preferences and content are saved in local storage
- **Pinia State Management**: Centralized state management with persistence
- **Modern UI**: Clean and attractive interface using NaiveUI components

## Project Structure

```
webprogramming25/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable Vue components
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   └── ThemeToggler.vue
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia stores
│   │   ├── preferences.js  # User preferences store
│   │   └── content.js      # Website content store
│   ├── views/           # Page components
│   │   ├── Home.vue
│   │   ├── Projects.vue
│   │   └── Contact.vue
│   ├── App.vue          # Root component
│   └── main.js          # Entry point
├── index.html
└── package.json         # Dependencies and scripts
```

## Technology Stack

- [Vue.js 3](https://vuejs.org/): Progressive JavaScript framework
- [Vite](https://vitejs.dev/): Next generation frontend tooling
- [Pinia](https://pinia.vuejs.org/): State management for Vue
- [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate): Local storage persistence
- [NaiveUI](https://www.naiveui.com/en-US/dark): Vue 3 component library
- [Vue Router](https://router.vuejs.org/): Official router for Vue.js

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd webprogramming25
   ```

2. Install dependencies
   ```bash
   npm install
   # or 
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

## State Management

This project uses Pinia for state management with two main stores:

1. **Preferences Store**: Manages user preferences such as theme, user information, and site settings.
2. **Content Store**: Manages website content like projects, blog posts, and contact submissions.

Both stores utilize the `pinia-plugin-persistedstate` to save state in local storage, ensuring user preferences and content persist between sessions.

## License

[MIT](LICENSE)
