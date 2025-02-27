<template>
  <v-app>
    <!-- 讀取畫面 -->

    <div class="loading-overlay" v-if="isLoading">
      <v-overlay
        :model-value="true"
        class="d-flex align-center justify-center bg-black custom-overlay"
        persistent
        scrim="black"
      >
        <v-card color="transparent" class="d-flex flex-column align-center" elevation="0">
          <!-- <v-progress-circular
            :size="70"
            :width="7"
            color="orange"
            indeterminate
          ></v-progress-circular> -->
          <div class="text-h6 mt-4 text-orange loading-text d-flex flex-column align-center">
            <v-img :src="loadingImage" aspect-ratio="1" width="150"></v-img>
            <div class="d-flex">
              <span v-for="(char, index) in 'Loading...'" :key="index" class="loading-char">{{
                char
              }}</span>
            </div>
          </div>
        </v-card>
      </v-overlay>
    </div>

    <router-view v-if="!isLoading" />
  </v-app>
</template>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}
.v-overlay__content {
  z-index: 10000;
}
.loading-char {
  display: inline-block;
  transform-origin: center;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const isLoading = ref(true)
const loadingImage = ref(new URL('@/assets/loading.svg', import.meta.url).href)
console.log(loadingImage.value)

onMounted(() => {
  gsap.from('.loading-char', {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5,
    ease: 'back.out(1.7)',
    repeat: -1,
  })

  setTimeout(() => {
    isLoading.value = false // 模擬 1 秒後載入完成
  }, 1500)
})
</script>
