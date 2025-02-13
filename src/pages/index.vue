<template>
  <!-- 第一區塊 - 輪播圖 -->
  <v-container fluid class="pa-0">
    <div class="position-relative">
      <div class="swiper-background">
        <swiper
          :spaceBetween="30"
          :effect="'fade'"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          class="mySwiper"
          :autoplay="{
            delay: 1000,
          }"
          :loop="true"
        >
          <swiper-slide v-for="slide in slides" :key="slide.id">
            <v-img :src="slide.url" :height="900" cover></v-img>
          </swiper-slide>
        </swiper>
      </div>

      <div class="content-overlay d-flex flex-column justify-center align-center text-white">
        <div class="d-flex flex-column" style="width: 720px">
          <span style="font-size: 32px">Game Togeter</span>
          <span style="font-size: 40px">遊戲揪團平台</span>
          <span style="font-size: 40px">找到一起玩遊戲的夥伴</span>
          <p class="text-h6 mt-6 mb-6" style="width: 525px">
            無論想要玩什麼遊戲，MOBA、射擊還是生存建築，這裡有數萬位玩家隨時等待加入揪團。加入我們，每天都有各式各樣的遊戲揪團等著你來探索，一起暢玩、共創樂趣！
          </p>
        </div>
        <div class="d-flex mb-10">
          <v-btn :width="180" :height="60" style="font-size: 20px" class="rounded-e-0"
            >按關鍵字搜尋</v-btn
          >
          <v-btn
            variant="outlined"
            :width="180"
            :height="60"
            style="font-size: 20px"
            class="rounded-0 custom-button"
            @click="dialog.open = true"
            >按縣市搜尋</v-btn
          >
          <v-btn
            variant="outlined"
            :width="180"
            :height="60"
            style="font-size: 20px"
            class="rounded-0 custom-button"
            >按標籤搜尋</v-btn
          >
          <v-btn
            variant="outlined"
            :width="180"
            :height="60"
            style="font-size: 20px"
            class="rounded-s-0 custom-button"
            >按日期搜尋</v-btn
          >
        </div>
        <div class="d-flex">
          <div style="width: 600px; height: 80px">
            <v-text-field
              placeholder="搜尋關鍵字/縣市區/遊戲類型"
              variant="outlined"
              class="custom-placeholer-color"
              color="black"
              base-color="black"
              bg-color="white"
            ></v-text-field>
          </div>

          <v-btn
            :height="80"
            :width="120"
            style="font-size: 20px"
            class="rounded-s-0"
            base-color="orange"
            >搜尋</v-btn
          >
        </div>
      </div>
    </div>
  </v-container>
  <v-container>
    <!-- 第二區塊 - 揪團 -->
    <section class="w-100">
      <v-row>
        <div class="title w-100 d-flex mt-16 mb-12 align-center">
          <v-col cols="3" offset="1">
            <span class="ml-6" style="font-size: 32px; font-weight: bold">最新的揪團</span></v-col
          >
          <v-col cols="4" offset="2">
            <v-divider class="border-opacity-100"></v-divider>
          </v-col>
        </div>

        <div class="content w-100 d-flex">
          <v-col cols="10" offset="1">
            <div class="d-flex justify-space-between">
              <template v-for="group in newestGroup" :key="group._id">
                <div class="card d-flex flex-column">
                  <v-card width="300" :to="'/group/' + group._id">
                    <v-card-title class="pa-0">
                      <v-img :src="group.image" :width="300" height="260" cover></v-img>
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
        <div class="d-flex justify-center w-100 mt-8 mb-10">
          <v-btn append-icon="mdi-arrow-right" :to="'/group/'">查看最新的揪團</v-btn>
        </div>

        <div class="title w-100 d-flex mt-16 mb-12 align-center">
          <v-col cols="3" offset="1">
            <span class="ml-6" style="font-size: 32px; font-weight: bold"
              >即將到來的揪團</span
            ></v-col
          >
          <v-col cols="4" offset="2">
            <v-divider class="border-opacity-100"></v-divider>
          </v-col>
        </div>

        <div class="content w-100 d-flex">
          <v-col cols="10" offset="1">
            <div class="d-flex justify-space-between">
              <template v-for="group in upcomingGroup" :key="group._id">
                <div class="card d-flex flex-column">
                  <v-card width="300" :to="'/group/' + group._id">
                    <v-card-title class="pa-0">
                      <v-img :src="group.image" :width="300" height="260" cover></v-img>
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
        <div class="d-flex justify-center w-100 mt-8 mb-15">
          <v-btn append-icon="mdi-arrow-right" :to="'/group/'">查看即將到來的揪團</v-btn>
        </div>
      </v-row>
    </section>
    <!-- 第三區塊 - 說明 -->
    <section class="w-100 mt-10" style="height: 570px">
      <v-row>
        <v-col cols="12">
          <p class="text-center mb-3 font-weight-bold" style="font-size: 32px">
            想找人一起玩遊戲嗎? 在遊戲揪團平台，你可以.......
          </p>
        </v-col>
        <v-col cols="11" offset="1">
          <div class="d-flex">
            <v-col cols="4">
              <v-card
                width="480"
                height="370"
                class="d-flex flex-column align-center justify-center"
              >
                <p class="font-weight-bold mb-5" style="font-size: 24px">主辦揪團</p>
                <v-icon icon="mdi-flag-outline" style="font-size: 50px"></v-icon>
                <p class="font-weight-bold mt-10 text-center" style="width: 305px; height: 70px">
                  找不到志同道合的夥伴一起玩遊戲嗎?
                  您可以自己當主揪，自己選擇類型、時間、地點、參與人數，發起您自己的揪團
                </p>
              </v-card>
            </v-col>
            <v-col cols="4" offset="3">
              <v-card
                width="480"
                height="370"
                class="d-flex flex-column align-center justify-center"
              >
                <p class="font-weight-bold mb-5" style="font-size: 24px">加入揪團</p>
                <v-icon icon="mdi-account-group" style="font-size: 50px"></v-icon>
                <p class="font-weight-bold mt-10 text-center" style="width: 305px; height: 50px">
                  找不到志同道合的夥伴一起玩遊戲嗎?
                  您可以自己當主揪，自己選擇類型、時間、地點、參與人數，發起您自己的揪團
                </p>
              </v-card>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </section>
    <section class="w-100" style="height: 830px">
      <v-row>
        <v-col offset="1">
          <div class="info d-flex flex-column font-weight-bold">
            <p style="font-size: 32px">五步驟，立刻主辦揪團</p>
            <div class="d-flex flex-column align-center mt-5" style="width: 320px">
              <p style="font-size: 20px">Step.1 填寫揪團資料</p>
              <div class="divider">
                <v-divider
                  class="border-opacity-100 mt-5 mb-5"
                  vertical
                  style="height: 60px"
                ></v-divider>
              </div>
              <p style="font-size: 20px">Step.2 填寫揪團標籤</p>
              <div class="divider">
                <v-divider
                  class="border-opacity-100 mt-5 mb-5"
                  vertical
                  style="height: 60px"
                ></v-divider>
              </div>
              <p style="font-size: 20px">Step.3 填寫揪團詳情</p>
              <div class="divider">
                <v-divider
                  class="border-opacity-100 mt-5 mb-5"
                  vertical
                  style="height: 60px"
                ></v-divider>
              </div>
              <p style="font-size: 20px">Step.4 預覽揪團頁面</p>
              <div class="divider">
                <v-divider
                  class="border-opacity-100 mt-5 mb-5"
                  vertical
                  style="height: 60px"
                ></v-divider>
              </div>
              <p style="font-size: 20px">Step.5 主辦揪團成功!</p>
            </div>
            <v-col cols="12" offset="4">
              <v-btn
                append-icon="mdi-arrow-right"
                :to="'/creategroup/step1/'"
                width="160"
                height="50"
                class="mt-4"
                >主辦揪團</v-btn
              >
            </v-col>
          </div>
        </v-col>
        <v-img src="@/assets/section-image.jpg" width="700" height="700"></v-img>
      </v-row>
    </section>
  </v-container>
  <group-footer></group-footer>

  <v-dialog v-model="dialog.open" width="1000" scrollable>
    <v-card>
      <v-card-title class="d-flex mb-0 pb-0">
        <div class="d-flex w-100 justify-center align-center">
          <span class="font-weight-bold" style="font-size: 20px">按縣市搜尋</span>
        </div>
        <v-btn icon="mdi-close" variant="text" @click="dialog.open = false"></v-btn>
      </v-card-title>
      <v-divider class="mt-3"></v-divider>

      <v-card-text class="d-flex flex-column align-center pt-0 mb-2 font-weight-bold">
        <template v-for="([city, districts], index) of Object.entries(area_data)">
          <div class="d-flex" style="width: 850px">
            <span class="mt-3 mr-3" style="font-size: 18px">{{
              cityItems.find((item) => item.value === city).text
            }}</span>
            <div class="d-flex flex-wrap custom-input" style="width: 750px">
              <template v-for="district of districts" :key="`${city}-${district}`">
                <v-hover v-slot:default="{ isHovering, props }">
                  <v-checkbox
                    v-bind="props"
                    v-model="selectRegion"
                    :label="district"
                    :value="{ city, district }"
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
        <v-btn :to="'/group/'" class="w-100 font-weight-bold" style="height: 54px" color="white"
          >搜尋</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.custom-input .v-input__control {
  width: 150px;
}

.custom-input .v-input__details {
  display: none;
}
.custom-input i {
  font-size: 30px;
}

.position-relative {
  position: relative;
  width: 100%;
  height: 900px;
}

.swiper {
  width: 100%;
  height: 900px;
}

.swiper-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.content-overlay {
  position: relative;
  z-index: 2;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.v-field,
.v-field__input {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  height: 80px;
}

.custom-placeholer-color input::placeholder {
  color: #878787 !important;
}

.custom-button:hover {
  background-color: white;
  color: black;
  border: 0;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { useAxios } from '@/composables/axios'
import GroupFooter from '@/components/GroupFooter.vue'
import { useAreaData } from '@/composables/areaData'
import { useI18n } from 'vue-i18n'

import { EffectFade, Pagination, Autoplay } from 'swiper/modules'

const { area_data } = useAreaData()
const { t } = useI18n()

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

const { api } = useAxios()
const group = ref([])
const modules = [EffectFade, Pagination, Autoplay]
const slides = ref([
  {
    id: 1,
    url: new URL('@/assets/swiper-1.jpg', import.meta.url).href,
  },
  {
    id: 2,
    url: new URL('@/assets/swiper-2.jpg', import.meta.url).href,
  },
  {
    id: 3,
    url: new URL('@/assets/swiper-1.jpg', import.meta.url).href,
  },
  {
    url: new URL('@/assets/swiper-2.jpg', import.meta.url).href,
  },
])

const dialog = ref({
  open: false,
})

const getGroup = async () => {
  try {
    const { data } = await api.get('/group')
    group.value = data.result
  } catch (error) {
    console.log(error)
  }
}
getGroup()

const newestGroup = computed(() => {
  return group.value
    .filter((item) => {
      const now = new Date()
      const date = new Date(item.time)
      return date > now
    })
    .sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt)
    })
    .splice(0, 3)
})

const upcomingGroup = computed(() => {
  return group.value
    .filter((item) => {
      const now = new Date()
      const date = new Date(item.time)
      return date > now
    })
    .sort((a, b) => {
      return new Date(a.time) - new Date(b.time)
    })
    .splice(0, 3)
})

const selectRegion = ref([])
</script>

<route lang="yaml">
meta:
  title: 'nav.home'
</route>
