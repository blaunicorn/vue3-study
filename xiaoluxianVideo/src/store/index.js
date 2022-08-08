import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { useUserStore } from "./user";

// console.log(useUserStore);
const store = createPinia();
store.use(piniaPluginPersist);

export default store;
