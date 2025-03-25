<template>
  <!-- 第一區塊 - 輪播圖 -->
  <v-container fluid class="pa-0">
    <div class="index__hero-content">
      <div class="index__hero-content-swiper">
        <swiper
          :effect="'fade'"
          :modules="modules"
          class="mySwiper"
          :autoplay="{
            delay: 6000,
            disableOnInteraction: false,
          }"
          :speed="2500"
          :crossFade="true"
        >
          <swiper-slide v-for="slide in slides" :key="slide.id">
            <v-img
              :src="slide.url"
              :alt="slide.alt"
              :height="900"
              cover
              class="index__hero-content-zoom-effect"
            ></v-img>
          </swiper-slide>
        </swiper>
      </div>
      <div class="index__hero-content-overlay d-flex flex-column align-center text-white">
        <v-row class="w-100" style="max-width: 1440px">
          <v-col cols="9" offset-sm="2" offset-md="3" offset-lg="3" offset-xl="3" offset="1">
            <div class="index__hero-content-text d-flex flex-column">
              <span style="font-size: 32px">Game Togeter</span>
              <span style="font-size: 40px">遊戲揪團平台</span>
              <span style="font-size: 40px">找到一起玩遊戲的夥伴</span>
              <p class="text-h6 mt-6 mb-6" style="max-width: 525px">
                無論想要玩什麼遊戲，MOBA、射擊還是生存建築，這裡有數萬位玩家隨時等待加入揪團。加入我們，每天都有各式各樣的遊戲揪團等著你來探索，一起暢玩、共創樂趣！
              </p>
            </div>
            <div class="d-flex mb-10 index__search-filters">
              <v-btn
                height="60"
                max-width="180"
                min-width="87.5"
                style="font-size: clamp(14px, 2vw, 20px)"
                class="rounded-e-0"
                >按關鍵字搜尋</v-btn
              >
              <v-btn
                variant="outlined"
                height="60"
                max-width="180"
                min-width="87.5"
                style="font-size: clamp(14px, 2vw, 20px)"
                class="rounded-0"
                @click="clickDialog(1)"
                >按縣市搜尋</v-btn
              >
              <v-btn
                variant="outlined"
                height="60"
                max-width="180"
                min-width="87.5"
                style="font-size: clamp(14px, 2vw, 20px)"
                class="rounded-0"
                @click="clickDialog(2)"
                >按標籤搜尋</v-btn
              >
              <v-menu v-model="datePickerOpen" :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    variant="outlined"
                    height="60"
                    max-width="180"
                    min-width="87.5"
                    style="font-size: clamp(14px, 2vw, 20px)"
                    class="rounded-s-0"
                    >按日期搜尋</v-btn
                  >
                </template>

                <v-date-picker
                  v-model="selectDate"
                  show-adjacent-months
                  @update:model-value="handleDateSelect"
                  landscape
                  hide-header
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="d-flex index__search-bar">
              <v-text-field
                placeholder="搜尋關鍵字/縣市區/遊戲類型"
                variant="solo"
                class="index__search-input"
                color="black"
                base-color="black"
                bg-color="white"
                v-model="search"
              ></v-text-field>

              <v-btn
                :height="80"
                :max-width="120"
                :min-width="58"
                style="flex: 0 1 120px"
                base-color="orange"
                :to="searchRouteParams"
                >搜尋</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
  <!-- 第二區塊 - 揪團 -->
  <v-container fluid class="px-0">
    <index-group :groups="group"></index-group>

    <!-- 說明 -->
    <index-intro></index-intro>

    <!-- 主辦揪團步驟 -->
    <index-step></index-step>
  </v-container>

  <group-footer></group-footer>

  <!-- 搜尋彈出視窗 -->
  <v-dialog v-model="dialog.open" width="1000" scrollable eager>
    <v-card v-if="dialog.type === 1">
      <v-card-title class="d-flex mb-0 pb-0">
        <div class="d-flex w-100 justify-center align-center">
          <span class="font-weight-bold" style="font-size: 20px">按縣市搜尋</span>
        </div>
        <v-btn icon="mdi-close" variant="text" @click="closedDialog"></v-btn>
      </v-card-title>
      <v-divider class="mt-3"></v-divider>

      <v-card-text class="d-flex flex-column align-center pt-0 mb-2 font-weight-bold">
        <template v-for="([city, districts], index) of Object.entries(area_data)" :key="city">
          <div class="d-flex" style="width: 850px">
            <span class="mt-3 mr-3" style="font-size: 18px">{{
              cityItems.find((item) => item.value === city)?.text || city
            }}</span>
            <div class="d-flex flex-wrap index__search-dialog" style="width: 750px">
              <template v-for="district of districts" :key="`${city}-${district}`">
                <v-hover v-slot:default="{ isHovering, props }">
                  <v-checkbox
                    v-bind="props"
                    v-model="selectRegion"
                    :label="district"
                    :value="{ city, district }"
                    hide-details
                    density="compact"
                    :false-icon="
                      isHovering ? ' mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'
                    "
                    true-icon="mdi-checkbox-marked"
                    color="orange"
                  ></v-checkbox>
                </v-hover>
              </template>
            </div>
          </div>
          <v-divider
            v-if="index !== Object.entries(area_data).length - 1"
            style="width: 850px"
          ></v-divider>
        </template>
      </v-card-text>
      <v-card-actions class="bg-orange pa-0">
        <v-btn
          :to="searchRouteParams"
          class="w-100 font-weight-bold"
          style="height: 54px"
          color="white"
          >搜尋</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-card v-if="dialog.type === 2" width="1000">
      <v-card-title class="d-flex mb-0 pb-0">
        <div class="d-flex w-100 justify-center align-center">
          <span class="font-weight-bold" style="font-size: 20px">按標籤搜尋</span>
        </div>
        <v-btn icon="mdi-close" variant="text" @click="dialog.open = false"></v-btn>
      </v-card-title>
      <v-divider class="mt-3"></v-divider>

      <v-card-text class="d-flex flex-column align-center pt-0 mb-2 font-weight-bold">
        <div class="d-flex flex-wrap" style="width: 750px">
          <template v-for="(item, index) of tagItems" :key="index">
            <div style="width: 170px; height: 30px">
              <v-hover v-slot:default="{ isHovering, props }">
                <v-checkbox
                  v-bind="props"
                  v-model="selectTag"
                  :label="item.text"
                  :value="item.value"
                  hide-details
                  density="compact"
                  :false-icon="isHovering ? ' mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'"
                  true-icon="mdi-checkbox-marked"
                  color="orange"
                ></v-checkbox>
              </v-hover>
            </div>
          </template>
        </div>
      </v-card-text>
      <v-card-actions class="bg-orange pa-0">
        <v-btn
          :to="searchRouteParams"
          class="w-100 font-weight-bold"
          style="height: 54px"
          color="white"
          >搜尋</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import { useAxios } from '@/composables/axios'
import { useAreaData } from '@/composables/areaData'
import { useI18n } from 'vue-i18n'

import { EffectFade, Autoplay } from 'swiper/modules'
import { useRouter } from 'vue-router'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import IndexIntro from '@/components/IndexIntro.vue'
import IndexStep from '@/components/IndexStep.vue'
import IndexGroup from '@/components/IndexGroup.vue'

gsap.registerPlugin(ScrollTrigger)

const GroupFooter = defineAsyncComponent(() => import('@/components/GroupFooter.vue'))
const { area_data } = useAreaData()
const { t } = useI18n()
const router = useRouter()
const search = ref('')

// 搜尋導向的路由參數
const searchRouteParams = computed(() => {
  const city = selectRegion.value.map((item) => t('area.' + item.city) + item.district)

  return {
    path: '/group',
    query: {
      search: search.value ? encodeURIComponent(JSON.stringify(search.value)) : undefined,
      city: city.length ? encodeURIComponent(JSON.stringify(city.join(','))) : undefined,
      region: city.length ? encodeURIComponent(JSON.stringify(city.join(','))) : undefined,
      tags: selectTag.value.length
        ? encodeURIComponent(JSON.stringify(selectTag.value))
        : undefined,
      time: selectDate.value ? selectDate.value : undefined,
    },
  }
})

// 台灣縣市選項
const cityItems = computed(() => [
  { text: t('area.taipei'), value: 'taipei' },
  { text: t('area.newTaipei'), value: 'newTaipei' },
  { text: t('area.keeLung'), value: 'keeLung' },
  { text: t('area.taoyuan'), value: 'taoyuan' },
  { text: t('area.hsinchuCounty'), value: 'hsinchuCounty' },
  { text: t('area.hsinchu'), value: 'hsinchu' },
  { text: t('area.miaoli'), value: 'miaoli' },
  { text: t('area.taichung'), value: 'taichung' },
  { text: t('area.nantou'), value: 'nantou' },
  { text: t('area.changhua'), value: 'changhua' },
  { text: t('area.yunlin'), value: 'yunlin' },
  { text: t('area.chiayi'), value: 'chiayi' },
  { text: t('area.chiayiCounty'), value: 'chiayiCounty' },
  { text: t('area.tainan'), value: 'tainan' },
  { text: t('area.kaohsiung'), value: 'kaohsiung' },
  { text: t('area.pingtung'), value: 'pingtung' },
  { text: t('area.yilan'), value: 'yilan' },
  { text: t('area.hualien'), value: 'hualien' },
  { text: t('area.taitung'), value: 'taitung' },
  { text: t('area.penghu'), value: 'penghu' },
  { text: t('area.kinmen'), value: 'kinmen' },
  { text: t('area.lienchiang'), value: 'lienchiang' },
])

// 標籤選項
const tagItems = [
  {
    text: t('tag.computer'),
    value: t('tag.computer'),
  },
  {
    text: t('tag.mobile'),
    value: t('tag.mobile'),
  },
  {
    text: t('tag.console'),
    value: t('tag.console'),
  },
  {
    text: t('tag.virtualReality'),
    value: t('tag.virtualReality'),
  },
  {
    text: t('tag.augmentedReality'),
    value: t('tag.augmentedReality'),
  },
  {
    text: t('tag.webGame'),
    value: t('tag.webGame'),
  },
  {
    text: t('tag.Adventure'),
    value: t('tag.Adventure'),
  },
  {
    text: t('tag.RPG'),
    value: t('tag.RPG'),
  },
  {
    text: t('tag.simulation'),
    value: t('tag.simulation'),
  },
  {
    text: t('tag.sportsAndRacing'),
    value: t('tag.sportsAndRacing'),
  },
  {
    text: t('tag.puzzleAndParty'),
    value: t('tag.puzzleAndParty'),
  },
  {
    text: t('tag.musicAndRhythm'),
    value: t('tag.musicAndRhythm'),
  },
  {
    text: t('tag.sandboxAndOpenWorld'),
    value: t('tag.sandboxAndOpenWorld'),
  },
  {
    text: t('tag.scienceFictionAndFantasy'),
    value: t('tag.scienceFictionAndFantasy'),
  },
  {
    text: t('tag.EducationAndExperimental'),
    value: t('tag.EducationAndExperimental'),
  },
  {
    text: t('tag.massiveMultiplayer'),
    value: t('tag.massiveMultiplayer'),
  },
]

const { api } = useAxios()
const group = ref([])
const modules = [EffectFade, Autoplay]
// 輪播圖片
const slides = ref([
  {
    id: 1,
    url: new URL('@/assets/swiper-1.jpg', import.meta.url).href,
    alt: 'swiper-1',
    loading: 'lazy',
  },
  {
    id: 2,
    url: new URL('@/assets/swiper-2.jpg', import.meta.url).href,
    alt: 'swiper-2',
    loading: 'lazy',
  },
  {
    id: 3,
    url: new URL('@/assets/swiper-3.jpg', import.meta.url).href,
    alt: 'swiper-3',
    loading: 'lazy',
  },
  {
    url: new URL('@/assets/swiper-4.jpg', import.meta.url).href,
    alt: 'swiper-4',
    loading: 'lazy',
  },
])

const dialog = ref({
  open: false,
  type: 1,
})
// 點擊彈出視窗
const clickDialog = async (type) => {
  dialog.value.type = type
  dialog.value.open = true
}
// 關閉彈出視窗
const closedDialog = () => {
  dialog.value.open = false
  selectRegion.value = []
  selectTag.value = []
}
// 取得揪團資料
const getGroup = async () => {
  try {
    const { data } = await api.get('/group')
    group.value = data.result
  } catch (error) {
    console.log(error)
  }
}
getGroup()
// 最新的揪團
const newestGroup = computed(() => {
  const now = new Date()
  return group.value
    .filter((item) => new Date(item.time) > now)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .splice(0, 3)
})
// 即將到來的揪團
const upcomingGroup = computed(() => {
  const now = new Date()
  return group.value
    .filter((item) => new Date(item.time) > now)
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .splice(0, 3)
})

const selectRegion = ref([])
const selectTag = ref([])
const datePickerOpen = ref(false)
const selectDate = ref(null)
// 選擇日期
const handleDateSelect = (date) => {
  try {
    if (!date) return

    selectDate.value = date
    datePickerOpen.value = false

    const displayDate = new Date(date).toLocaleDateString()
    // console.log(displayDate)

    router.push({
      path: '/group',
      query: {
        time: displayDate,
      },
    })
  } catch (error) {
    console.log('日期格式錯誤:', error)
  }
}

onMounted(() => {
  // 首頁標題動畫
  gsap.from('.index__hero-content-text span, .index__hero-content-text p', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out',
  })
  gsap.from('.index__search-filters', {
    delay: 0.5,
    opacity: 0,
    duration: 1,
    y: 50,
    ease: 'power2.out',
  })
  gsap.from('.index__search-bar', {
    delay: 0.7,
    opacity: 0,
    duration: 1,
    y: 50,
    ease: 'power2.out',
  })

  // 使用 IntersectionObserver 來監聽元素進入視窗
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target

          if (target.classList.contains('index__groups-latest')) {
            const groupTl = gsap.timeline()
            groupTl
              .from('.index__groups-latest-title', {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
              })
              .from(
                '.index__groups-latest-content-card',
                {
                  x: -100,
                  opacity: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  stagger: 0.2,
                },
                '-=0.5',
              )
              .from(
                '.index__groups-latest-content-button',
                {
                  x: -100,
                  opacity: 0,
                  duration: 1,
                  ease: 'power2.out',
                },
                '-=0.5',
              )
          }

          if (target.classList.contains('index__groups-upcoming')) {
            const groupTl2 = gsap.timeline()
            groupTl2
              .from('.index__groups-upcoming-title', {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
              })
              .from(
                '.index__groups-upcoming-content-card',
                {
                  x: 100,
                  opacity: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  stagger: 0.2,
                },
                '-=0.5',
              )
              .from(
                '.index__groups-upcoming-content-button',
                {
                  x: 100,
                  opacity: 0,
                  duration: 1,
                  ease: 'power2.out',
                },
                '-=0.5',
              )
          }

          if (target.classList.contains('index__introduction')) {
            const cardTl = gsap.timeline()
            cardTl
              .from('.index__introduction-title', {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
              })
              .from(
                '.index__introduction-card-left',
                {
                  scale: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: 'power2.out',
                },
                '-=0.5',
              )
              .from(
                '.index__introduction-card-right',
                {
                  scale: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: 'power2.out',
                },
                '-=0.5',
              )
          }

          if (target.classList.contains('index__steps')) {
            const cardTl = gsap.timeline()
            cardTl
              .from('.index__steps-content', {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
              })
              .from(
                '.index__steps-img',
                {
                  x: 100,
                  opacity: 0,
                  duration: 1,
                  ease: 'power2.out',
                },
                '-=0.5',
              )
          }

          // 觸發一次後取消觀察
          observer.unobserve(target)
        }
      })
    },
    {
      threshold: 0, // 當元素0%進入視窗時觸發
    },
  )

  // 觀察需要動畫的元素
  observer.observe(document.querySelector('.index__groups-latest'))
  observer.observe(document.querySelector('.index__groups-upcoming'))
  observer.observe(document.querySelector('.index__introduction'))
  observer.observe(document.querySelector('.index__steps'))
})

const handleClick = (type) => {
  if (type === 1) {
    router.push({
      path: '/group',
      state: {
        type: 'newest',
      },
    })
  } else if (type === 2) {
    router.push({
      path: '/group',
      state: {
        type: 'upcoming',
      },
    })
  }
}
</script>

<route lang="yaml">
meta:
  title: 'nav.home'
</route>
