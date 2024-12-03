import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia} from "pinia"
//import process from "process";

//window.process = process;
import { faBitcoinSign, faBuildingColumns, faChartLine, faChartSimple, faCircle, faCreditCard, faEllipsis, faF, faFlorinSign, faMagnifyingGlass, faPlus, faRightLeft, faShuffle, faEuroSign } from "@fortawesome/free-solid-svg-icons";
library.add(faChartSimple, faCreditCard, faMagnifyingGlass, faF, faChartLine, faBitcoinSign, faRightLeft, faPlus, faShuffle, faBuildingColumns, faEllipsis, faFlorinSign, faCircle, faEuroSign);
import "./assets/index.css";
import "./assets/styles.scss"
const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(router)
const pinia = createPinia()
app.use(pinia)
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
