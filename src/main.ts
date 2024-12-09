import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";

import FocusTrap from "primevue/focustrap";
import AOS from 'aos'
import 'aos/dist/aos.css'

//import process from "process";

//window.process = process;
import {
  faBitcoinSign,
  faBuildingColumns,
  faChartLine,
  faChartSimple,
  faCircle,
  faCreditCard,
  faEllipsis,
  faF,
  faFlorinSign,
  faMagnifyingGlass,
  faPlus,
  faRightLeft,
  faShuffle,
  faEuroSign,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faArrowRightArrowLeft,
  faChartSimple,
  faCreditCard,
  faMagnifyingGlass,
  faF,
  faChartLine,
  faBitcoinSign,
  faRightLeft,
  faPlus,
  faShuffle,
  faBuildingColumns,
  faEllipsis,
  faFlorinSign,
  faCircle,
  faEuroSign
);
import "./assets/index.css";
import "./assets/styles.scss";
const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(router);
const pinia = createPinia();
app.use(pinia);
app.directive("focustrap", FocusTrap);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(AOS)
app.mount("#app");
