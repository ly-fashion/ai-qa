// apps/web-client/app/plugins/antd.ts
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Antd);
});