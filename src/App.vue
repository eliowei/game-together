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
import { useRouter } from 'vue-router'

const router = useRouter()
const isFirstLoad = ref(true)
const isPageReady = ref(false)
const loadingImage = ref(new URL('@/assets/loading.svg', import.meta.url).href)

onMounted(async () => {
  if (isFirstLoad.value) {
    gsap.from('.loading-char', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      repeat: -1,
    })
    // 等待路由載入完成
    await router.isReady()

    // 確保 DOM 更新完成
    await nextTick()

    isPageReady.value = true

    setTimeout(() => {
      isFirstLoad.value = false
    }, 1000)
  }
})
</script>
