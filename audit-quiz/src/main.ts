import { createApp } from 'vue';
import App from './App.vue';
import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css';

if (import.meta.env.DEV) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${import.meta.env.VITE_WP_URI}/wp-content/themes/mappers/css/styles.css`;
  document.head.appendChild(link);
}

const app = createApp(App);
app.use(VueTippy, {
  defaultProps: {
    theme: 'mappers-dark',
    maxWidth: 436,
    trigger: 'click',
    touch: ['click', 0],
    hideOnClick: true,
    allowHTML: true,
  },
});

app.mount('#app');
