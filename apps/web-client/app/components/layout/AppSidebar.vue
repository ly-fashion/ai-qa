<script setup lang="ts">
import {
  PanelLeft,
  SquarePen,
  Search,
  MessageSquare,
  LayoutGrid,
  Bookmark,
  Plus,
  Pin,
  Download,
  User,
  Settings,
  MoreHorizontal,
  Users,
  Check
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCollapsed = useState('sidebarCollapsed', () => false)

const menuItems = [
  { icon: MessageSquare, label: '元宝', active: false },
  { icon: LayoutGrid, label: '全部应用', active: false },
  { icon: Bookmark, label: '全部收藏', active: false },
]

const groups = [
  { id: 1, name: '分组示例', pinned: true },
  { id: 2, name: 'ai-qa', pinned: false, active: true },
]

const recentChats = [
  '帮我生成图片:春节福字小马',
  '帮我生成图片:童趣福过骑马',
  '帮我生成图片:祥云马插画',
  '和元宝聊聊春节话题',
  '体验DeepSeek新技能',
  '帮我生成图片:毛绒春运列车'
]

const handleMenuClick = (e: any) => {
  if (e.key === 'setting') {
    router.push('/setting')
  } else if (e.key === 'profile') {
    router.push('/profile')
  }
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div
    class="flex flex-col h-screen bg-[#1e1e1e] text-gray-400 border-r border-gray-800 shrink-0 transition-all duration-300 ease-in-out"
    :class="[isCollapsed ? 'w-[72px]' : 'w-[260px]']">
    <!-- Header -->
    <div class="flex items-center p-3" :class="[isCollapsed ? 'justify-center' : 'justify-between']">
      <button class="p-2 hover:bg-gray-800 rounded-md transition-colors" @click="toggleCollapse">
        <PanelLeft class="w-5 h-5" />
      </button>
      <button v-if="!isCollapsed" class="p-2 hover:bg-gray-800 rounded-md transition-colors">
        <SquarePen class="w-5 h-5" />
      </button>
    </div>

    <!-- Search -->
    <div class="px-3 mb-2" v-if="!isCollapsed">
      <div class="relative group">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-gray-300" />
        <input type="text" placeholder="搜索"
          class="w-full bg-[#2b2b2b] text-sm text-gray-200 rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-1 focus:ring-gray-600 transition-all placeholder-gray-500" />
      </div>
    </div>
    <div class="px-3 mb-2 flex justify-center" v-else>
      <button class="p-2 hover:bg-[#2b2b2b] rounded-lg transition-colors">
        <Search class="w-5 h-5" />
      </button>
    </div>

    <!-- Main Navigation -->
    <div class="px-2 py-2 space-y-0.5">
      <button v-for="(item, index) in menuItems" :key="index"
        class="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-[#2b2b2b] hover:text-gray-100 transition-colors"
        :class="[
          item.active ? 'bg-[#2b2b2b] text-gray-100' : '',
          isCollapsed ? 'justify-center px-2' : ''
        ]">
        <component :is="item.icon" class="w-4 h-4 shrink-0" />
        <span v-if="!isCollapsed" class="truncate">{{ item.label }}</span>
      </button>
    </div>

    <!-- Groups -->
    <div class="mt-4 px-3">
      <div v-if="!isCollapsed" class="flex items-center justify-between text-xs font-medium text-gray-500 mb-2 px-2">
        <span>分组</span>
        <button class="hover:text-gray-300">
          <Plus class="w-3 h-3" />
        </button>
      </div>
      <div v-else class="flex justify-center mb-2">
        <div class="h-px w-8 bg-gray-800"></div>
      </div>

      <div class="space-y-0.5">
        <button v-for="group in groups" :key="group.id"
          class="w-full flex items-center px-3 py-2 text-sm rounded-lg hover:bg-[#2b2b2b] hover:text-gray-100 transition-colors group"
          :class="[
            group.active ? 'bg-[#2b2b2b] text-gray-100' : '',
            isCollapsed ? 'justify-center' : 'justify-between'
          ]">
          <div class="flex items-center gap-2" :class="{ 'justify-center': isCollapsed }">
            <span v-if="group.active" class="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
            <span v-else class="w-1.5 h-1.5 flex-shrink-0"></span>
            <span v-if="!isCollapsed" class="truncate">{{ group.name }}</span>
          </div>
          <Pin v-if="group.pinned && !isCollapsed" class="w-3 h-3 text-gray-500 rotate-45 flex-shrink-0" />
        </button>
      </div>
    </div>

    <!-- Chat History -->
    <div class="mt-4 flex-1 overflow-y-auto min-h-0 px-2 scrollbar-thin">
      <div v-if="!isCollapsed" class="text-xs font-medium text-gray-500 px-3 mb-2">聊天</div>
      <div class="space-y-0.5">
        <button v-for="(chat, index) in recentChats" :key="index"
          class="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-[#2b2b2b] hover:text-gray-100 transition-colors truncate"
          :class="{ 'text-center': isCollapsed }">
          <span v-if="!isCollapsed">{{ chat }}</span>
          <span v-else class="block w-1.5 h-1.5 rounded-full bg-gray-600 mx-auto"></span>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-3 border-t border-gray-800 mt-auto">
      <button v-if="!isCollapsed"
        class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[#2b2b2b] hover:text-gray-100 transition-colors mb-2">
        <Download class="w-4 h-4" />
        <span>前往下载中心</span>
      </button>
      <button v-else
        class="w-full flex justify-center items-center p-2 rounded-lg hover:bg-[#2b2b2b] hover:text-gray-100 transition-colors mb-2">
        <Download class="w-4 h-4" />
      </button>

      <a-dropdown :trigger="['click']" overlayClassName="custom-dropdown" placement="topLeft">
        <button class="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#2b2b2b] transition-colors group"
          :class="{ 'justify-center': isCollapsed }">
          <div
            class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white overflow-hidden flex-shrink-0">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=zm41" alt="Avatar"
              class="w-full h-full object-cover" />
          </div>
          <div v-if="!isCollapsed" class="flex-1 text-left overflow-hidden">
            <div class="text-sm font-medium text-gray-200 truncate group-hover:text-white">用户zm41</div>
          </div>
        </button>
        <template #overlay>
          <a-menu @click="handleMenuClick"
            class="w-64 bg-[#2b2b2b] border border-gray-700 rounded-xl shadow-xl overflow-hidden py-1">
            <div class="px-2 py-1 space-y-1">
              <a-menu-item key="profile" class="text-gray-200 hover:bg-[#3f3f3f] rounded-lg !p-0">
                <div class="flex items-center gap-3 px-3 py-2">
                  <User class="w-4 h-4" />
                  <span>个人中心</span>
                </div>
              </a-menu-item>
              <a-menu-item key="setting" class="text-gray-200 hover:bg-[#3f3f3f] rounded-lg !p-0">
                <div class="flex items-center gap-3 px-3 py-2">
                  <Settings class="w-4 h-4" />
                  <span>设置</span>
                </div>
              </a-menu-item>
              <a-menu-item key="team" class="text-gray-200 hover:bg-[#3f3f3f] rounded-lg !p-0">
                <div class="flex items-center gap-3 px-3 py-2">
                  <Plus class="w-4 h-4" />
                  <span>创建团队</span>
                </div>
              </a-menu-item>
            </div>

            <div class="h-px bg-gray-700 my-1 mx-2"></div>

            <div class="px-2 py-1">
              <a-menu-item key="user1" class="text-gray-200 hover:bg-[#3f3f3f] rounded-lg !p-0">
                <div class="flex items-center justify-between px-3 py-2 w-full">
                  <div class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-full bg-blue-600 overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=zm41" alt="Avatar" />
                    </div>
                    <span>用户zm41</span>
                  </div>
                  <Check class="w-4 h-4 text-white" />
                </div>
              </a-menu-item>
              <a-menu-item key="user2" class="text-gray-200 hover:bg-[#3f3f3f] rounded-lg !p-0 mt-1">
                <div class="flex items-center gap-3 px-3 py-2">
                  <div class="w-6 h-6 rounded-full bg-gray-600 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=zm41" alt="Avatar" />
                  </div>
                  <span>用户zm41</span>
                </div>
              </a-menu-item>
            </div>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 20px;
}

.scrollbar-thin:hover::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}

:deep(.ant-dropdown-menu) {
  background-color: #2b2b2b !important;
  border: 1px solid #3f3f3f;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

:deep(.ant-dropdown-menu-item) {
  color: #e5e7eb !important;
}

:deep(.ant-dropdown-menu-item:hover) {
  background-color: #3f3f3f !important;
}
</style>