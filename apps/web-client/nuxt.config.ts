// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // 3. 配置 CSS
  css: [
    // 引入 Tailwind CSS 样式文件
    '~/assets/css/main.css',
    // 引入 Ant Design Vue 的样式
    'ant-design-vue/dist/reset.css'
  ],
  // 2. PostCSS 配置
  postcss: {
    plugins: {
      // Tailwind CSS
      '@tailwindcss/postcss': {},

      // 自动添加浏览器前缀
      autoprefixer: {},

      // 生产环境压缩
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
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
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api'
    }
  }
})
