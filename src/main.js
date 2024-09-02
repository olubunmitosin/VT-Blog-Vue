import { createApp } from "vue";
import App from './App'
import router from './router'
import store  from './store/index';
import { sync } from 'vuex-router-sync';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'bootstrap/dist/css/bootstrap.css'

sync(store, router);
const app = createApp(App);

const options = {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};

app.use(Toast, options);
app.use(store);
app.use(router);
app.mount("#app");
