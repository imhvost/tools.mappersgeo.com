import { createApp } from 'vue';
import App from './App.vue';

if (import.meta.env.DEV) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${import.meta.env.VITE_WP_URI}/wp-content/themes/mappers/css/styles.css`;
  document.head.appendChild(link);
}

createApp(App).mount('#app');
