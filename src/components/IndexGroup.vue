<template>
  <section class="w-100 index__groups mx-auto" style="max-width: 1440px">
    <v-row>
      <div class="w-100 index__groups-latest">
        <div class="title d-flex mt-16 mb-12 align-center index__groups-latest-title">
          <v-col
            cols="5"
            offset="1"
            offset-sm="1"
            offset-md="1"
            offset-lg="1"
            offset-xl="1"
            sm="5"
            md="5"
            lg="5"
            xl="5"
          >
            <span class="ml-6" style="font-size: 32px; font-weight: bold">最新的揪團</span></v-col
          >
          <v-col
            cols="3"
            offset="2"
            offset-sm="1"
            offset-md="1"
            offset-lg="1"
            offset-xl="1"
            sm="4"
            md="4"
            lg="4"
            xl="4"
          >
            <v-divider class="border-opacity-100"></v-divider>
          </v-col>
        </div>

        <div class="content w-100 d-flex index__groups-latest-content">
          <v-col
            cols="10"
            offset="1"
            offset-sm="2"
            offset-md="1"
            offset-lg="1"
            offset-xl="1"
            md="10"
            sm="10"
            xs="6"
          >
            <div class="d-flex justify-space-between flex-wrap">
              <template v-for="group in newestGroups" :key="group._id">
                <div class="card d-flex flex-column index__groups-latest-content-card">
                  <v-card height="260" :to="'/group/' + group._id">
                    <v-card-title class="pa-0">
                      <v-img
                        :src="group.image"
                        max-width="600"
                        min-width="250"
                        height="260"
                        cover
                      ></v-img>
                    </v-card-title>
                  </v-card>
                  <span class="text-center mt-5" style="font-size: 18px">
                    {{ group.name }}
                  </span>
                </div>
              </template>
            </div>
          </v-col>
        </div>
        <v-col
          cols="5"
          offset="4"
          offset-sm="5"
          offset-md="5"
          offset-lg="5"
          offset-xl="5"
          md="5"
          sm="5"
          lg="5"
          xl="5"
        >
          <div class="d-flex w-100 mt-8 mb-10 index__groups-latest-content-button">
            <v-btn
              append-icon="mdi-arrow-right"
              max-width="200"
              min-width="125"
              max-height="50"
              min-height="40"
              @click="handleClick(1)"
              >查看最新的揪團</v-btn
            >
          </div>
        </v-col>
      </div>

      <div class="w-100 index__groups-upcoming">
        <div class="title w-100 d-flex mt-16 mb-12 align-center index__groups-upcoming-title">
          <v-col
            cols="5"
            offset="1"
            offset-sm="1"
            offset-md="1"
            offset-lg="1"
            offset-xl="1"
            sm="5"
            md="5"
            lg="5"
            xl="5"
          >
            <span class="ml-6" style="font-size: 32px; font-weight: bold"
              >即將到來的揪團</span
            ></v-col
          >
          <v-col
            cols="3"
            offset="2"
            offset-sm="1"
            offset-md="1"
            offset-lg="1"
            offset-xl="1"
            sm="4"
            md="4"
            lg="4"
            xl="4"
          >
            <v-divider class="border-opacity-100"></v-divider>
          </v-col>
        </div>

        <div class="content w-100 d-flex">
          <v-col
            cols="10"
            offset="1"
            offset-sm="2"
            offset-md="1"
            offset-lg="1"
            offset-xl="1"
            md="10"
            sm="10"
            xs="6"
          >
            <div class="d-flex justify-space-between flex-wrap">
              <template v-for="group in upcomingGroups" :key="group._id">
                <div class="card d-flex flex-column index__groups-upcoming-content-card">
                  <v-card height="260" :to="'/group/' + group._id">
                    <v-card-title class="pa-0">
                      <v-img
                        :src="group.image"
                        max-width="600"
                        min-width="250"
                        height="260"
                        cover
                      ></v-img>
                    </v-card-title>
                  </v-card>
                  <span class="text-center mt-3" style="font-size: 18px">
                    {{ group.name }}
                  </span>
                </div>
              </template>
            </div>
          </v-col>
        </div>
        <v-col
          cols="5"
          offset="4"
          offset-sm="5"
          offset-md="5"
          offset-lg="5"
          offset-xl="5"
          md="5"
          sm="5"
          lg="5"
          xl="5"
        >
          <div class="d-flex w-100 mt-8 mb-15 index__groups-upcoming-content-button">
            <v-btn append-icon="mdi-arrow-right" @click="handleClick(2)">查看即將到來的揪團</v-btn>
          </div>
        </v-col>
      </div>
    </v-row>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  groups: {
    type: Array,
    default: () => [],
  },
})

// 最新揪團
const newestGroups = computed(() => {
  const now = new Date()
  return props.groups
    .filter((item) => new Date(item.time) > now)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
})

// 即將到來的揪團
const upcomingGroups = computed(() => {
  const now = new Date()
  return props.groups
    .filter((item) => new Date(item.time) > now)
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .slice(0, 3)
})

// 處理按鈕點擊
const handleClick = (type) => {
  router.push({
    path: '/group',
    state: {
      type: type === 1 ? 'newest' : 'upcoming',
    },
  })
}
</script>
