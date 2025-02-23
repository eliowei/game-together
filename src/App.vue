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
          <v-progress-circular
            :size="70"
            :width="7"
            color="orange"
            indeterminate
          ></v-progress-circular>
          <span class="text-h6 mt-4 text-orange">載入中...</span>
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
</style>

<script setup>
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false // 模擬 1 秒後載入完成
  }, 1000)
})
</script>
