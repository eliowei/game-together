<template>
  <v-app>
    <!-- 讀取畫面 -->

    <div class="loading-overlay" v-if="isFirstLoad || !isPageReady">
      <v-overlay
        :model-value="true"
        class="d-flex align-center justify-center bg-black custom-overlay"
        persistent
        scrim="black"
      >
        <v-card color="transparent" class="d-flex flex-column align-center" elevation="0">
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

    <router-view v-if="!isFirstLoad && isPageReady" />
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

const isFirstLoad = ref(true)
const isPageReady = ref(false)
const loadingImage = ref(new URL('@/assets/loading.svg', import.meta.url).href)

onMounted(() => {
  if (isFirstLoad.value) {
    gsap.from('.loading-char', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      repeat: -1,
    })

    // 使用 window.load 來確保所有資源載入完成
    window.addEventListener('load', () => {
      setTimeout(() => {
        isPageReady.value = true
        // 延遲設定 isFirstLoad 為 false，讓 loading 動畫有時間消失
        setTimeout(() => {
          isFirstLoad.value = false
        }, 500) // 這裡可以根據需要調整時間
      }, 500) // 這個 timeout 可以根據需要調整，確保加載資源有足夠時間
    })
  }
})
</script>
