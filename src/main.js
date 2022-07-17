import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';

import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.axios = axios;

app.mount('#app')