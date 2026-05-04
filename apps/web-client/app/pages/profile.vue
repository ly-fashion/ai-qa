<script setup lang="ts">
import { Code, Link as LinkIcon, MoreHorizontal, Search } from 'lucide-vue-next';

definePageMeta({
  layout: 'default',
});

const activeTab = ref('files');
const searchQuery = ref('');

const tabs = [
  { id: 'files', label: '文件' },
  { id: 'writing', label: '写作' },
  { id: 'agents', label: '智能体' },
];

const recentFiles = [
  {
    id: 1,
    type: 'markdown',
    title: 'ai-qa.md',
    date: '2026/01/26',
    info: '发送给 元宝 14.9 KB',
    icon: Code,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
  },
  {
    id: 2,
    type: 'link',
    title: 'https://google.com',
    date: '2026/01/26',
    info: '发送给 元宝',
    icon: LinkIcon,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
  },
];

const earlierFiles = [
  {
    id: 3,
    type: 'link',
    title: 'https://codeup.aliyun.com/...',
    date: '2025/12/15',
    info: '发送给 元宝',
    icon: LinkIcon,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
  },
  {
    id: 4,
    type: 'link',
    title: 'https://codeup.aliyun.com/...',
    date: '2025/12/15',
    info: '发送给 元宝',
    icon: LinkIcon,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
  },
  {
    id: 5,
    type: 'link',
    title: 'https://registry.npmjs.org/...',
    date: '2025/12/12',
    info: '发送给 元宝',
    icon: LinkIcon,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
  },
  {
    id: 6,
    type: 'link',
    title: 'https://registry.npmjs.org/...',
    date: '2025/12/12',
    info: '发送给 元宝',
    icon: LinkIcon,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
  },
  {
    id: 7,
    type: 'link',
    title: 'https://arco.design/',
    date: '2025/11/25',
    info: '发送给 元宝',
    icon: LinkIcon,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
  },
  {
    id: 8,
    type: 'link',
    title: 'https://github.com/arco-de...',
    date: '2025/11/25',
    info: '发送给 元宝',
    icon: LinkIcon,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10',
  },
];
</script>

<template>
  <div class="flex-1 h-screen overflow-y-auto bg-[#141414] text-gray-200 p-8 sm:p-12">
    <div class="max-w-6xl mx-auto">
      <!-- User Header -->
      <div class="flex items-center gap-6 mb-12">
        <div class="w-24 h-24 rounded-full bg-blue-600 overflow-hidden ring-4 ring-[#1e1e1e]">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=zm41"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">用户zm41</h1>
          <div class="flex items-center gap-4">
            <p class="text-gray-400">与元宝共度 889 天</p>
            <button
              class="px-3 py-1 border border-gray-700 rounded-full text-xs text-gray-400 hover:text-white hover:border-gray-500 hover:bg-[#2b2b2b] transition-all"
            >
              编辑资料
            </button>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex items-center gap-8 mb-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="pb-2 text-lg font-medium transition-colors relative"
          :class="activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
          <div
            v-if="activeTab === tab.id"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
          ></div>
        </button>
      </div>

      <!-- Content Area -->
      <div v-if="activeTab === 'files'">
        <!-- Search -->
        <div class="flex justify-end mb-8">
          <div class="relative w-64">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="输入关键词"
              class="w-full bg-[#1e1e1e] border border-gray-800 text-sm text-gray-200 rounded-lg pl-9 pr-3 py-2 outline-none focus:border-gray-600 transition-colors placeholder-gray-600"
            />
          </div>
        </div>

        <!-- Recent 30 Days -->
        <div class="mb-10">
          <h3 class="text-gray-500 text-sm mb-4">近30天</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="file in recentFiles"
              :key="file.id"
              class="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800/50 hover:border-gray-700 transition-colors group cursor-pointer"
            >
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-lg flex-shrink-0" :class="file.iconBg">
                  <component :is="file.icon" class="w-5 h-5" :class="file.iconColor" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <h4
                      class="text-gray-200 font-medium truncate pr-2 group-hover:text-white transition-colors"
                    >
                      {{ file.title }}
                    </h4>
                    <span class="text-xs text-gray-500 flex-shrink-0">{{ file.date }}</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">{{ file.info }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Earlier -->
        <div>
          <h3 class="text-gray-500 text-sm mb-4">更早</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="file in earlierFiles"
              :key="file.id"
              class="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800/50 hover:border-gray-700 transition-colors group cursor-pointer"
            >
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-lg flex-shrink-0" :class="file.iconBg">
                  <component :is="file.icon" class="w-5 h-5" :class="file.iconColor" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <h4
                      class="text-gray-200 font-medium truncate pr-2 group-hover:text-white transition-colors"
                    >
                      {{ file.title }}
                    </h4>
                    <span class="text-xs text-gray-500 flex-shrink-0">{{ file.date }}</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">{{ file.info }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Info -->
        <div class="mt-12 text-center text-xs text-gray-600">内容由AI生成，仅供参考</div>
      </div>

      <div v-else class="flex flex-col items-center justify-center py-20 text-gray-500">
        <div class="w-16 h-16 bg-[#1e1e1e] rounded-full flex items-center justify-center mb-4">
          <MoreHorizontal class="w-8 h-8 opacity-50" />
        </div>
        <p>暂无内容</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for the page */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #444;
}
</style>
