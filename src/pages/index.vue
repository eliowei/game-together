<template>
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
            <v-img :src="slide.url" cover></v-img>
          </swiper-slide>
        </swiper>
      </div>

      <div class="content-overlay"></div>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

import { EffectFade, Pagination, Autoplay } from 'swiper/modules'
const modules = [EffectFade, Pagination, Autoplay]
const slides = ref([
  {
    id: 1,
    url: 'https://swiperjs.com/demos/images/nature-1.jpg',
  },
  {
    id: 2,
    url: 'https://swiperjs.com/demos/images/nature-2.jpg',
  },
  {
    id: 3,
    url: 'https://swiperjs.com/demos/images/nature-3.jpg',
  },
  {
    id: 4,
    url: 'https://swiperjs.com/demos/images/nature-4.jpg',
  },
])
</script>

<style>
.position-relative {
  position: relative;
  width: 100%;
  height: 900px;
}

.swiper {
  width: 100%;
  height: 900px;
  backdrop-filter: blur(10px);
}

.swiper-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.content-overlay {
  position: relative;
  z-index: 1;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}
</style>

<route lang="yaml">
meta:
  title: 'nav.home'
</route>
