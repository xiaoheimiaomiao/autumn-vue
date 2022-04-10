import Vue from 'vue'
import App from './App.vue'
import router from '@/router/routers'
import store from './store'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
import '@/style/theme/global/index.less'
import axios from "axios";
import themeSetting from "@/components/themeSetting"
import AutumnButton from "@/components/AutumnButton"
import * as echarts from 'echarts';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Avue, {axios});
Vue.use(ViewUI);
Vue.component("AutumnButton", AutumnButton);
// 原型 js
Vue.prototype.$themeSetting = themeSetting;
Vue.prototype.$echart = echarts;



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
