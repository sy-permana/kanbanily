import Vue from 'vue';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import GoogleSignInButton from 'vue-google-signin-button-directive';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

new Vue({
  render: h => h(App),
  GoogleSignInButton,
}).$mount('#app');