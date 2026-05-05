// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // typescript: {
  //   strict: true,
  // },
  // 3. 配置 CSS
  css: [
    // 引入 Tailwind CSS 样式文件
    '~/assets/css/main.css',
    // 引入 Ant Design Vue 的样式
    'ant-design-vue/dist/reset.css',
  ],
  // 静态站点部署到子路径（GitHub Pages）
  app: {
    baseURL: '/ai-qa/',
    head: {
      title: 'AI QA 智能问答平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AI驱动的智能问答平台' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/ai-qa/favicon.ico' }],
    },
  },
  // 2. PostCSS 配置
  postcss: {
    plugins: {
      // Tailwind CSS
      '@tailwindcss/postcss': {},

      // 自动添加浏览器前缀
      autoprefixer: {},

      // 生产环境压缩
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
  },
  // 4. 配置模块
  modules: [
    // 配置 Pinia
    // '@pinia/nuxt',
    // '@ant-design-vue/nuxt'
  ],
  // 5. 配置运行时变量（例如，后端 API 的基础地址）
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api',
    },
  },
});
