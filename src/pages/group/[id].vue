<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>{{ group.name }}</h2>
        <!-- 主辦者 -->
        <div class="d-flex d-wrap align-center">
          <v-avatar>
            <v-img :src="group.image" />
          </v-avatar>
          <div class="d-flex flex-column">
            <span>主辦者</span>
            <span>{{ group.organizer_id.name }}</span>
          </div>
        </div>
        <!-- 揪團內容 -->
        <div class="group-content">
          <div class="d-flex">
            <v-col cols="5">
              <v-img
                :src="group.image"
                max-height="400"
                max-width="628"
                aspect-ratio="16/9"
                cover
              ></v-img>
            </v-col>
            <v-col cols="3">
              <v-chip
                v-for="tag of group.tags"
                class="mb-2 mt-1 mr-1"
                variant="outlined"
                color="orange"
                >{{ tag }}
              </v-chip>
              <div class="card-content d-flex flex-column">
                <v-card width="260" height="180">
                  <v-card-text class="d-flex flex-column">
                    <span class="mb-1"
                      ><v-icon icon="mdi-calendar-range"></v-icon>{{ group.time }}</span
                    >
                    <span class="mb-1"><v-icon icon="mdi-web"></v-icon> {{ group.type }}</span>
                    <span class="mb-1"
                      ><v-icon icon="mdi-forum"></v-icon> {{ group.contact_method }}</span
                    >
                    <span class="mb-1"
                      ><v-icon icon="mdi-map-marker-outline"></v-icon>
                      {{ group.city + group.region }}</span
                    >
                    <span
                      ><v-icon icon="mdi-account-multiple-outline"></v-icon>
                      {{ group.member_limit }}</span
                    >
                  </v-card-text>
                </v-card>
              </div>
              <div class="d-flex flex-column align-center" style="width: 260px">
                <v-btn
                  class="mt-3"
                  prepend-icon="mdi-clipboard-list"
                  style="width: 160px; height: 40px"
                  >聯絡資訊</v-btn
                >
              </div>
            </v-col>
          </div>
          <div v-dompurify-html="group.content" class="ml-6 mt-5 mb-5"></div>
          <v-divider class="border-opacity-100"></v-divider>
          <!-- 分頁 -->
          <v-tabs v-model="tabSelect" align-tabs="star" color="deep-purple accent-4">
            <v-tab v-for="tab in tabs" :key="tab.id">{{ tab.title }}</v-tab>
          </v-tabs>
          <v-tabs-window v-model="tabSelect" class="my-8">
            <v-tabs-window-item :value="0">
              <div class="d-flex flex-column mr-3 ml-5">
                <template v-for="number in group.groupMembers">
                  <v-avatar>
                    <v-img :src="number.user_id.image" />
                  </v-avatar>
                  <span class="mt-1 ml-1"> {{ number.user_id.name }}</span>
                </template>
              </div>
            </v-tabs-window-item>
            <v-tabs-window-item :value="1">
              <template v-for="(comment, keys) of group.comments">
                <div
                  :class="[
                    'd-flex',
                    'mb-5',
                    'mt-3',
                    keys === 0 ? 'justify-start' : 'justify-end',
                    'w-100',
                  ]"
                >
                  <div class="d-flex flex-column mr-3 ml-5 order-1">
                    <v-avatar>
                      <v-img :src="comment.user_id.image"></v-img>
                    </v-avatar>
                    <span class="mt-1 ml-1">{{ comment.user_id.name }}</span>
                  </div>
                  <v-card :class="[keys === 0 ? 'order-2' : '', '']" style="width: 600px">
                    <v-card-text>{{ comment.content }}</v-card-text>
                  </v-card>
                </div>
              </template>
              <p class="font-weight-bold ml-5 mb-3">發佈留言</p>
              <v-textarea
                placeholder="Write a comment..."
                variant="outlined"
                max-width="600"
                no-resize
                class="ml-5"
              ></v-textarea>
              <div class="d-flex justify-end mb-5" style="max-width: 600px">
                <v-btn height="50">確定送出</v-btn>
              </div>
            </v-tabs-window-item>
          </v-tabs-window>
          <v-divider class="border-opacity-100"></v-divider>
        </div>
        <div class="d-flex justify-space-between mt-5">
          <div class="d-flex flex-column">
            <span>
              {{ group.time }}
            </span>
            <h2>{{ group.name }}</h2>
          </div>
          <div class="d-flex">
            <div class="d-flex flex-column mr-8 align-center">
              <span>{{ group.member_limit - group.member_count }}個空位</span>
              <v-btn
                v-model="favorite"
                @click="favorite = !favorite"
                :icon="favorite ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
                variant="text"
              ></v-btn>
            </div>
            <v-btn class="mr-5" height="50" width="200">主辦者</v-btn>
            <v-btn height="50" width="200">取消此次揪團</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <group-footer></group-footer>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'
import GroupFooter from '@/components/GroupFooter.vue'

const { api } = useAxios()
const route = useRoute()
const router = useRouter()
const tabSelect = ref(0)
const tabs = [
  { id: 0, title: '參與者' },
  { id: 1, title: '留言' },
]

const favorite = ref(false)

const group = ref({
  _id: '',
  organizer_id: {},
  name: '',
  image: '',
  description: '',
  content: '',
  type: '',
  member_count: 0,
  member_limit: 0,
  contact_method: '',
  contact_info: '',
  city: '',
  region: '',
  time: '',
  tags: [],
  groupMembers: [],
  comments: [],
})

const getGroup = async () => {
  try {
    const { data } = await api.get('/group/' + route.params.id)
    group.value = data.result
    console.log(group.value)
  } catch (error) {
    console.log(error)
  }
}

getGroup()
</script>
