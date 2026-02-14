<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

const personalizedRecommendation = ref(true)
const showRelatedVideos = ref(true)
const theme = ref('system')
const language = ref('system')

const accountItems = [
  { label: '手机号', value: '188****5662', action: '更换' },
  { label: '微信账号', value: '微信用户', action: '解绑 更换' },
  { label: 'QQ账号', value: '未绑定,绑定后可以通过QQ授权登录', action: '绑定' },
  { label: '数据管理', value: '', arrow: true },
]
</script>

<template>
  <div class="h-full w-full bg-[#212121] flex flex-col items-center py-12 overflow-y-auto">
    <div class="w-full max-w-3xl px-4">
      <!-- Title -->
      <h1 class="text-2xl font-medium text-gray-200 mb-8">设置</h1>

      <!-- User Card -->
      <div
        class="bg-[#2b2b2b] rounded-xl p-4 mb-8 flex items-center justify-between cursor-pointer hover:bg-[#333333] transition-colors border border-gray-800">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-blue-600 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=zm41" alt="Avatar"
              class="w-full h-full object-cover" />
          </div>
          <div>
            <div class="text-base font-medium text-gray-200">用户zm41</div>
            <div class="text-sm text-gray-500">与元宝共度 889 天</div>
          </div>
        </div>
        <ChevronRight class="w-5 h-5 text-gray-500" />
      </div>

      <!-- Account Settings -->
      <div class="mb-8">
        <h2 class="text-sm font-medium text-gray-400 mb-4 px-1">账号设置</h2>
        <div class="bg-[#2b2b2b] rounded-xl border border-gray-800 overflow-hidden">
          <div v-for="(item, index) in accountItems" :key="index"
            class="flex items-center justify-between p-4 border-b border-gray-800 last:border-0 hover:bg-[#333333] transition-colors group cursor-pointer">
            <span class="text-gray-200 text-sm">{{ item.label }}</span>
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-500 group-hover:text-gray-400">{{ item.value }}</span>
              <span v-if="item.action" class="text-sm text-gray-500 hover:text-white cursor-pointer">{{ item.action
                }}</span>
              <ChevronRight v-if="item.arrow" class="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- General Settings -->
      <div>
        <h2 class="text-sm font-medium text-gray-400 mb-4 px-1">通用设置</h2>
        <div class="bg-[#2b2b2b] rounded-xl border border-gray-800 overflow-hidden">
          <!-- Theme -->
          <div class="flex items-center justify-between p-4 border-b border-gray-800">
            <span class="text-gray-200 text-sm">主题设置</span>
            <a-select v-model:value="theme" :bordered="false" class="text-right w-32 custom-select">
              <a-select-option value="system">跟随系统</a-select-option>
              <a-select-option value="light">浅色模式</a-select-option>
              <a-select-option value="dark">深色模式</a-select-option>
            </a-select>
          </div>

          <!-- Language -->
          <div class="flex items-center justify-between p-4 border-b border-gray-800">
            <span class="text-gray-200 text-sm">语言设置</span>
            <a-select v-model:value="language" :bordered="false" class="text-right w-32 custom-select">
              <a-select-option value="system">跟随系统</a-select-option>
              <a-select-option value="zh">简体中文</a-select-option>
              <a-select-option value="en">English</a-select-option>
            </a-select>
          </div>

          <!-- Personalization -->
          <div class="flex items-center justify-between p-4 border-b border-gray-800">
            <div>
              <div class="text-gray-200 text-sm mb-1">允许个性化推荐</div>
              <div class="text-xs text-gray-500">开启后将基于您的浏览记录进行个性化推荐</div>
            </div>
            <a-switch v-model:checked="personalizedRecommendation" />
          </div>

          <!-- Related Videos -->
          <div class="flex items-center justify-between p-4">
            <span class="text-gray-200 text-sm">回答展示相关视频</span>
            <a-switch v-model:checked="showRelatedVideos" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ant-select-selector) {
  background-color: transparent !important;
  color: #9ca3af !important;
}

:deep(.ant-select-arrow) {
  color: #9ca3af !important;
}

:deep(.ant-switch-checked) {
  background-color: #10b981 !important;
}

:deep(.ant-switch) {
  background-color: #4b5563;
}
</style>