import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import Button from 'primevue/button';    // Import Button component
import Avatar from 'primevue/avatar';   // Import Avatar component
import Badge from 'primevue/badge';     // Import Badge component
import Drawer from 'primevue/drawer';   // Import Drawer component
import Ripple from 'primevue/ripple';   // Import Ripple directive
import StyleClass from 'primevue/styleclass'; // Import StyleClass directive


createApp(App)
.use(router)
.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
})
.use(ToastService)

// Register components globally
.component('Button', Button)
.component('Avatar', Avatar)
.component('Badge', Badge)
.component('Drawer', Drawer)

// Register directives globally
.directive('ripple', Ripple)
.directive('styleclass', StyleClass)

.mount('#app')
