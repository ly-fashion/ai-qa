<script setup lang="ts">
import {
  Search,
  Download,
  MessageSquare,
  Users,
  Building2,
  DollarSign,
  ChevronDown,
  Check,
  Zap,
  Calendar,
  Database,
  FileText,
  Layers,
  Clock,
  Star,
  ArrowRight,
  Menu,
  X,
} from 'lucide-vue-next';
import {
  notionColors,
  notionTypography,
  notionSpacing,
  notionRounded,
  notionShadows,
} from '~/composables/useNotionDesign';

definePageMeta({
  layout: false, // 禁用布局
});

const isMobileMenuOpen = ref(false);

const navigationLinks = [
  { label: 'Product', hasDropdown: true },
  { label: 'AI', hasDropdown: false },
  { label: 'Solutions', hasDropdown: true },
  { label: 'Resources', hasDropdown: true },
  { label: 'Enterprise', hasDropdown: false },
  { label: 'Pricing', hasDropdown: false },
];

const featureCards = [
  {
    title: 'AI-powered',
    description: 'Built-in AI assistant to help you write, brainstorm, and organize.',
    bgColor: notionColors['card-tint-lavender'],
    icon: Zap,
  },
  {
    title: 'Real-time collaboration',
    description: 'Work together with your team in the same document.',
    bgColor: notionColors['card-tint-sky'],
    icon: Users,
  },
  {
    title: 'Flexible databases',
    description: 'Customize your workspace with powerful databases.',
    bgColor: notionColors['card-tint-peach'],
    icon: Database,
  },
  {
    title: '100+ templates',
    description: 'Start fast with pre-built templates for any workflow.',
    bgColor: notionColors['card-tint-mint'],
    icon: FileText,
  },
];

const pricingTiers = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    description: 'For individuals getting started',
    features: ['5 guests', '1 workspace', 'Unlimited pages', '7-day history'],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Plus',
    price: '15',
    period: 'per user/month',
    description: 'For small teams growing fast',
    features: [
      'Unlimited guests',
      '10 workspaces',
      'Unlimited pages',
      '1-year history',
      'Publish to web',
      'API access',
    ],
    cta: 'Start free trial',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: '45',
    period: 'per user/month',
    description: 'For teams scaling their workflow',
    features: [
      'Everything in Plus',
      'Unlimited workspaces',
      'SAML SSO',
      'Private teamspaces',
      'Bulk PDF export',
      'Advanced permissions',
    ],
    cta: 'Contact sales',
    featured: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: [
      'Everything in Business',
      'Unlimited history',
      'Dedicated success manager',
      'Security review',
      'Custom contracts',
      'SLA guarantee',
    ],
    cta: 'Contact sales',
    featured: false,
  },
];

const footerLinks = {
  Product: ['AI Features', 'Templates', 'Integrations', 'Download'],
  Resources: ['Documentation', 'Community', 'Blog', 'Help center'],
  'Notion for': ['Startups', 'Enterprise', 'Education', 'Nonprofits'],
  Company: ['About', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <!-- Top Navigation -->
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                <span class="text-white font-bold text-sm">N</span>
              </div>
              <span class="font-semibold text-gray-900 text-lg">Notion</span>
            </div>

            <!-- Desktop Nav Links -->
            <nav class="hidden lg:flex items-center gap-1">
              <button
                v-for="link in navigationLinks"
                :key="link.label"
                class="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
              >
                {{ link.label }}
                <ChevronDown v-if="link.hasDropdown" class="w-4 h-4" />
              </button>
            </nav>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-3">
            <button
              class="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Search class="w-4 h-4" />
              <span>Search</span>
            </button>
            <button
              class="hidden md:block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
            >
              Log in
            </button>
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-[#5645d4] hover:bg-[#4534b3] rounded-md transition-colors"
            >
              Get Notion free
            </button>
            <button
              class="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
              <X v-else class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="lg:hidden bg-white border-t border-gray-200">
        <div class="px-4 py-4 space-y-2">
          <button
            v-for="link in navigationLinks"
            :key="link.label"
            class="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {{ link.label }}
          </button>
          <div class="pt-4 border-t border-gray-200 space-y-2">
            <button
              class="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Log in
            </button>
            <button
              class="block w-full px-4 py-3 text-sm font-medium text-white bg-[#5645d4] hover:bg-[#4534b3] rounded-lg transition-colors text-center"
            >
              Get Notion free
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-[#0a1530] relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 left-[10%] w-3 h-3 rounded-full bg-[#5645d4] opacity-60"></div>
        <div class="absolute top-32 left-[25%] w-2 h-2 rounded-full bg-[#ff64c8] opacity-50"></div>
        <div class="absolute top-40 right-[15%] w-4 h-4 rounded-full bg-[#f5d75e] opacity-40"></div>
        <div
          class="absolute bottom-40 left-[20%] w-2 h-2 rounded-full bg-[#2a9d99] opacity-50"
        ></div>
        <div class="absolute top-48 right-[30%] w-3 h-3 rounded-full bg-[#dd5b00] opacity-40"></div>
        <div
          class="absolute bottom-32 right-[25%] w-2 h-2 rounded-full bg-[#7b3ff2] opacity-50"
        ></div>
        <!-- Mesh wire decoration -->
        <svg class="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div class="relative max-w-7xl mx-auto px-6 py-32 text-center">
        <h1
          class="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-tight"
          style="letter-spacing: -2px"
        >
          Meet the night shift.
        </h1>
        <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Notion is the connected workspace where better, faster work happens. AI-powered,
          collaborative, and flexible for any team.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            class="px-6 py-3 text-sm font-medium text-white bg-[#5645d4] hover:bg-[#4534b3] rounded-md transition-colors flex items-center gap-2"
          >
            Get Notion free
            <ArrowRight class="w-4 h-4" />
          </button>
          <button
            class="px-6 py-3 text-sm font-medium text-white border border-gray-500 hover:border-gray-400 rounded-md transition-colors"
          >
            Request a demo
          </button>
        </div>

        <!-- Workspace Mockup Card -->
        <div class="max-w-5xl mx-auto">
          <div
            class="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
            style="box-shadow: rgba(15, 15, 15, 0.2) 0px 24px 48px -8px"
          >
            <!-- Mockup Header -->
            <div
              class="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-200"
            >
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div class="text-sm text-gray-500">Ramp HQ</div>
              </div>
              <div class="flex items-center gap-2">
                <div
                  class="px-3 py-1 bg-white rounded-md border border-gray-200 text-xs text-gray-500"
                >
                  Search...
                </div>
              </div>
            </div>

            <!-- Mockup Content - Kanban Board -->
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Column 1 -->
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="font-medium text-gray-700 text-sm">To Do</h4>
                    <span class="text-xs text-gray-400">3</span>
                  </div>
                  <div class="space-y-2">
                    <div class="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                      <div class="text-sm text-gray-700 mb-1">Q4 Marketing Plan</div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full"
                          >Marketing</span
                        >
                      </div>
                    </div>
                    <div class="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                      <div class="text-sm text-gray-700 mb-1">Product Roadmap Review</div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >Product</span
                        >
                      </div>
                    </div>
                    <div class="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                      <div class="text-sm text-gray-700 mb-1">User Research Sessions</div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full"
                          >Research</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Column 2 -->
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="font-medium text-gray-700 text-sm">In Progress</h4>
                    <span class="text-xs text-gray-400">2</span>
                  </div>
                  <div class="space-y-2">
                    <div class="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                      <div class="text-sm text-gray-700 mb-1">Design System Update</div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded-full"
                          >Design</span
                        >
                      </div>
                    </div>
                    <div class="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                      <div class="text-sm text-gray-700 mb-1">API Documentation</div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full"
                          >Engineering</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Column 3 -->
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="font-medium text-gray-700 text-sm">Done</h4>
                    <span class="text-xs text-gray-400">4</span>
                  </div>
                  <div class="space-y-2">
                    <div class="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                      <div class="text-sm text-gray-700 mb-1">Onboarding Flow</div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full"
                          >Marketing</span
                        >
                      </div>
                    </div>
                    <div class="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                      <div class="text-sm text-gray-700 mb-1">Team Offsite Planning</div>
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full"
                          >Operations</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-semibold text-gray-900 mb-4" style="letter-spacing: -0.5px">
            Keep work moving 24/7
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            From startups to enterprises, teams use Notion to document, collaborate, and automate
            their workflows.
          </p>
        </div>

        <!-- Feature Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div
            v-for="(feature, index) in featureCards"
            :key="index"
            class="p-6 rounded-xl border border-gray-200"
            :style="{ backgroundColor: feature.bgColor }"
          >
            <div class="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center mb-4">
              <component :is="feature.icon" class="w-5 h-5 text-gray-700" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-gray-600">{{ feature.description }}</p>
          </div>
        </div>

        <!-- AI Assistant Banner -->
        <div class="bg-[#f9e79f] rounded-xl p-8 md:p-12 mb-16">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span
                class="inline-block px-3 py-1 bg-[#5645d4] text-white text-xs font-semibold rounded-full mb-4"
              >
                NEW
              </span>
              <h3 class="text-3xl font-semibold text-gray-900 mb-4">
                Ask your on-demand assistants
              </h3>
              <p class="text-gray-700 mb-6">
                Meet Notion AI — your AI-powered writing assistant that helps you brainstorm, draft,
                edit, and summarize content instantly.
              </p>
              <button
                class="px-6 py-3 text-sm font-medium text-white bg-[#5645d4] hover:bg-[#4534b3] rounded-md transition-colors flex items-center gap-2"
              >
                Learn more
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
            <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div class="flex items-start gap-3 mb-4">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageSquare class="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">Notion AI</div>
                  <div class="text-xs text-gray-500">Assistant</div>
                </div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 mb-4">
                Hi! I'm Notion AI. I can help you write faster, think bigger, and automate tedious
                tasks. What would you like help with today?
              </div>
              <div class="flex items-center gap-2">
                <div class="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-500">
                  Draft a project brief for...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted By Section -->
    <section class="py-16 bg-gray-50 border-y border-gray-200">
      <div class="max-w-7xl mx-auto px-6">
        <p class="text-center text-sm text-gray-500 mb-8">TRUSTED BY TEAMS AT</p>
        <div class="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div class="text-xl font-semibold text-gray-400">Figma</div>
          <div class="text-xl font-semibold text-gray-400">Stripe</div>
          <div class="text-xl font-semibold text-gray-400">Pinterest</div>
          <div class="text-xl font-semibold text-gray-400">Shopify</div>
          <div class="text-xl font-semibold text-gray-400">Airbnb</div>
          <div class="text-xl font-semibold text-gray-400">Netflix</div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-semibold text-gray-900 mb-4" style="letter-spacing: -0.5px">
            Simple, transparent pricing
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Start for free, upgrade when you need more power.
          </p>
        </div>

        <!-- Pricing Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            v-for="(tier, index) in pricingTiers"
            :key="index"
            class="rounded-xl p-6 border-2 transition-all"
            :class="tier.featured ? 'bg-gray-50 border-[#5645d4]' : 'bg-white border-gray-200'"
          >
            <div
              v-if="tier.badge"
              class="inline-block px-3 py-1 bg-[#5645d4] text-white text-xs font-semibold rounded-full mb-4"
            >
              {{ tier.badge }}
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ tier.name }}</h3>
            <div class="mb-4">
              <span class="text-4xl font-bold text-gray-900">{{ tier.price }}</span>
              <span v-if="tier.period" class="text-gray-500 text-sm ml-2">{{ tier.period }}</span>
            </div>
            <p class="text-sm text-gray-600 mb-6">{{ tier.description }}</p>
            <button
              class="w-full py-3 text-sm font-medium rounded-md transition-colors mb-6"
              :class="
                tier.featured
                  ? 'bg-[#5645d4] hover:bg-[#4534b3] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              "
            >
              {{ tier.cta }}
            </button>
            <ul class="space-y-3">
              <li
                v-for="(feature, fIndex) in tier.features"
                :key="fIndex"
                class="flex items-start gap-2 text-sm text-gray-600"
              >
                <Check class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-semibold text-gray-900 mb-4" style="letter-spacing: -0.5px">
          Try Notion for free
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          Join thousands of teams who use Notion to build better products faster.
        </p>
        <button
          class="px-8 py-4 text-base font-medium text-white bg-[#5645d4] hover:bg-[#4534b3] rounded-md transition-colors"
        >
          Get started for free
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
                <span class="text-white font-bold text-xs">N</span>
              </div>
              <span class="font-semibold text-gray-900">Notion</span>
            </div>
          </div>
          <div v-for="(links, category) in footerLinks" :key="category">
            <h4 class="font-semibold text-gray-900 mb-3">{{ category }}</h4>
            <ul class="space-y-2">
              <li v-for="link in links" :key="link">
                <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p class="text-sm text-gray-500">© 2025 Notion Labs, Inc.</p>
          <div class="flex items-center gap-6">
            <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >Twitter</a
            >
            <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >LinkedIn</a
            >
            <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >GitHub</a
            >
            <a href="#" class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >YouTube</a
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Notion Design System Styles */
.font-sans {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Helvetica,
    sans-serif;
}
</style>
