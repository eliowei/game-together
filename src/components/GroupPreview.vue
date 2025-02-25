<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <h2>{{ props.name }}</h2>
        <!-- 主辦者 -->
        <div class="d-flex d-wrap align-center">
          <v-avatar>
            <v-img :src="user.image" />
          </v-avatar>
          <div class="d-flex flex-column pl-3 align-center">
            <span>主辦者</span>
            <span>{{ user.nickname }}</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="bg-orange-lighten-5">
    <v-row>
      <v-col cols="10" offset="1">
        <!-- 揪團內容 -->
        <div class="group-content mt-15" style="margin-bottom: 100px">
          <div class="d-flex flex-wrap">
            <v-col cols="12" sm="12" md="5" lg="5" xl="5">
              <v-img
                :src="props.images"
                max-height="400"
                min-width="300"
                max-width="628"
                aspect-ratio="16/9"
                cover
              ></v-img>
            </v-col>
            <v-col
              cols="12"
              offset="1"
              sm="12"
              offset-sm="3"
              md="4"
              offset-md="3"
              lg="4"
              offset-lg="3"
              xl="4"
              offset-xl="2"
            >
              <v-chip
                v-for="tag of props.tags"
                class="mb-2 mt-1 mr-1"
                variant="outlined"
                color="orange"
                >{{ tag }}
              </v-chip>
              <div class="card-content d-flex flex-column">
                <v-card width="260" height="150">
                  <v-card-text class="d-flex flex-column">
                    <span class="mb-1"
                      ><v-icon icon="mdi-calendar-range"></v-icon>{{ props.time }}</span
                    >
                    <span class="mb-1"><v-icon icon="mdi-web"></v-icon> {{ props.type }}</span>
                    <span class="mb-1"
                      ><v-icon icon="mdi-forum"></v-icon> {{ props.contact_method }}</span
                    >
                    <span class="mb-1" v-if="type === '線下'"
                      ><v-icon icon="mdi-map-marker-outline"></v-icon>
                      {{ props.city + props.region }}</span
                    >
                    <span
                      ><v-icon icon="mdi-account-multiple-outline"></v-icon>
                      {{ props.member_limit }}</span
                    >
                  </v-card-text>
                </v-card>
              </div>
              <div class="d-flex flex-column align-center" style="width: 260px">
                <v-btn
                  class="mt-3"
                  prepend-icon="mdi-clipboard-list"
                  style="width: 160px; height: 40px"
                  @click="contactDialog = true"
                  >聯絡資訊</v-btn
                >
              </div>
            </v-col>
          </div>
          <div v-dompurify-html="props.content" class="ml-6 mt-5 mb-5"></div>
          <v-divider class="border-opacity-100"></v-divider>
          <!-- 分頁 -->
          <v-tabs
            v-model="tabSelect"
            align-tabs="star"
            color="orange"
            style="border-bottom: 1px solid #eeeeee"
          >
            <v-tab v-for="tab in tabs" :key="tab.id">{{ tab.title }}</v-tab>
          </v-tabs>
          <v-tabs-window v-model="tabSelect" class="my-8">
            <v-tabs-window-item :value="0">
              <div class="d-flex">
                <div class="d-flex flex-column mr-9 align-center">
                  <v-avatar size="50">
                    <v-img :src="user.image" />
                  </v-avatar>
                  <span class="mt-3 ml-1"> {{ user.nickname }}</span>
                  <span class="mt-1">
                    {{ props.organizer_id === user.id ? '主辦者' : '成員' }}</span
                  >
                </div>
              </div>
            </v-tabs-window-item>
          </v-tabs-window>
          <v-divider class="border-opacity-100"></v-divider>
        </div>

        <div class="d-flex justify-space-between mb-13 mt-4">
          <div class="d-flex flex-column">
            <span>
              {{ props.time }}
            </span>
            <h2>{{ props.name }}</h2>
          </div>
          <div class="d-flex flex-column mr-8 align-center">
            <span>{{ props.member_limit - 1 }}個空位</span>
            <v-btn icon="mdi-bookmark-outline" variant="text"></v-btn>
          </div>
          <div class="d-flex creategroup__step4-preview">
            <v-btn height="50" :disabled="true">主辦者</v-btn>
            <v-btn height="50">取消揪團</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="contactDialog" width="350" opacity="0">
    <v-card>
      <v-card-title class="d-flex align-center mb-0 pb-0">
        <span>{{ t('group.contactInfo') }}</span>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" variant="text" @click="contactDialog = false"></v-btn>
      </v-card-title>
      <v-card-text class="pt-0">
        <v-list class="py-0">
          <v-list-item class="py-0" v-for="(item, index) in contactDialogItems" :key="index">
            {{ item.title }}: <v-icon v-if="item.icon" :icon="item.icon"></v-icon> {{ item.value }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'

const { api, apiAuth } = useAxios()
const route = useRoute()
const router = useRouter()
const tabSelect = ref(0)
const tabs = [
  { id: 0, title: '參與者' },
  { id: 1, title: '留言' },
]

const props = defineProps({
  organizer_id: {
    type: String,
    default: () => ({}),
  },
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  member_limit: {
    type: Number,
    default: 0,
  },
  contact_method: {
    type: String,
    default: '',
  },
  contact_info: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  region: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '',
  },
  tags: {
    type: Array,
    default: () => [],
  },
  content: {
    type: String,
    default: '',
  },
  images: {
    type: String,
    default: '',
  },
})

const contactDialog = ref(false)
const { t } = useI18n()
const user = useUserStore()

const contactDialogItems = computed(() => [
  { title: '聯絡方式', icon: 'mdi-forum', value: props.contact_method },
  { title: '聯絡資訊', icon: '', value: props.contact_info },
])
</script>

<route lang="yaml">
meta:
  title: 'nav.groupDetail'
</route>
