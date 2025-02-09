import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import './style.css'

const app = createApp(App)

// Add toast configuration
const toastOptions = {
    position: "top-center",
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    maxToasts: 3,
    
}

// Install the plugin with options
app.use(Toast, toastOptions)
app.mount('#app')
