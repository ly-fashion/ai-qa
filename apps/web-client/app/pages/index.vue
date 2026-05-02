<!-- pages/index.vue -->
<script setup lang="ts">
import {
  ArrowUp,
  Bot,
  BrainCircuit,
  ChevronDown,
  Globe,
  LayoutGrid,
  Paperclip,
} from 'lucide-vue-next';

const quickActions = [
  {
    icon: Bot,
    title: '元宝派红包 新春领不停',
    desc: '抢10亿红包! 万元小马卡天天抽!',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    icon: Bot,
    title: '下载元宝电脑版',
    desc: '快速启动, 划词问答, 多格式全能处理',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  { title: '表格技巧', desc: 'Excel差值分析', simple: true },
  { title: '问题梳理', desc: '多维分析消费者需求画像', simple: true },
  { title: '创作头像', desc: '韩系头像', simple: true },
];
</script>

<template>
  <div class="flex flex-col h-full relative">
    <!-- Top Bar -->
    <div class="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
      <button
        class="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-[#2b2b2b] px-3 py-1.5 rounded-lg transition-colors"
      >
        <span class="font-medium">DeepSeek</span>
        <ChevronDown class="w-4 h-4" />
      </button>
      <button
        class="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
      >
        <Bot class="w-4 h-4 text-green-600" />
        <span>安装电脑版</span>
        <ChevronDown class="w-3 h-3 text-gray-500" />
      </button>
    </div>

    <!-- Main Content Area -->
    <div
      class="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 mt-12"
    >
      <!-- Welcome -->
      <h1 class="text-4xl font-medium text-white mb-12">Hi, 用户zm41</h1>

      <!-- Quick Actions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full mb-8">
        <!-- Featured Cards -->
        <button
          v-for="(action, idx) in quickActions"
          :key="idx"
          class="text-left p-4 rounded-xl border border-gray-800 bg-[#2b2b2b]/50 hover:bg-[#2b2b2b] transition-colors group relative overflow-hidden"
          :class="{ 'col-span-2': idx < 2 }"
        >
          <div class="flex items-start gap-3">
            <div v-if="action.icon" class="mt-0.5">
              <component :is="action.icon" class="w-5 h-5" :class="action.color" />
            </div>
            <div>
              <div class="font-medium text-gray-200 mb-1 group-hover:text-white">
                {{ action.title }}
              </div>
              <div class="text-xs text-gray-500">{{ action.desc }}</div>
            </div>
          </div>
          <div v-if="idx === 1" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
            <ChevronDown class="w-4 h-4 -rotate-90" />
          </div>
        </button>
      </div>

      <!-- Input Area -->
      <div class="w-full bg-[#2f2f2f] rounded-2xl border border-gray-700 shadow-lg relative">
        <textarea
          class="w-full bg-transparent text-white placeholder-gray-500 p-4 min-h-[120px] outline-none resize-none text-base"
          placeholder="有问题，尽管问，shift+enter换行"
        ></textarea>

        <!-- Input Actions -->
        <div class="flex items-center justify-between px-3 pb-3">
          <div class="flex items-center gap-2">
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#212121] border border-green-900/30 text-green-500 text-xs hover:bg-[#1a1a1a] transition-colors"
            >
              <BrainCircuit class="w-3.5 h-3.5" />
              <span>深度思考</span>
            </button>
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#212121] border border-green-900/30 text-green-500 text-xs hover:bg-[#1a1a1a] transition-colors"
            >
              <Globe class="w-3.5 h-3.5" />
              <span>自动搜索</span>
            </button>
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#3f3f3f] transition-colors"
            >
              <LayoutGrid class="w-4 h-4" />
              <span class="text-xs">工具</span>
              <ChevronDown class="w-3 h-3" />
            </button>
          </div>

          <div class="flex items-center gap-3">
            <button
              class="p-2 text-gray-400 hover:text-white hover:bg-[#3f3f3f] rounded-lg transition-colors"
            >
              <Paperclip class="w-5 h-5" />
            </button>
            <button class="p-2 bg-gray-600 text-white rounded-full cursor-not-allowed opacity-50">
              <ArrowUp class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div class="mt-4 text-xs text-gray-500">内容由AI生成，仅供参考</div>
    </div>
  </div>
</template>
