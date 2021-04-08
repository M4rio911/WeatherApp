import { createApp } from "vue";

// COMPONENTS:
import BaseMessage from "./components/BaseMessage.vue";
import BaseSpinner from "./components/BaseSpinner.vue";
import BaseSuccessToast from "./components/BaseSuccessToast.vue";

// APP
import App from "./App.vue";
const app = createApp(App);
// ROUTER
import router from "./router/index";
app.use(router);
// STORE
import store from "./store/index";
app.use(store);

app.component("base-message", BaseMessage);
app.component("base-spinner", BaseSpinner);
app.component("base-success", BaseSuccessToast);


app.mount("#app");
