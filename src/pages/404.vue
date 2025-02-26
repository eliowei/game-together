<template>
  <v-container fluid style="max-width: 1440px">
    <v-row>
      <v-col cols="12">
        <p class="d-flex justify-center">
          <strong style="font-size: 304px">4</strong>
          <strong style="font-size: 304px">0</strong>
          <strong style="font-size: 304px">4</strong>
        </p>
      </v-col>
      <v-col cols="12">
        <p style="font-size: 80px" class="text-center">Page Not Found</p>
        <p style="font-size: 40px" class="text-center">找不到該頁面，可能已被移動或刪除</p>
      </v-col>
      <v-col cols="12" class="w-100 d-flex justify-center mb-16">
        <v-btn
          :to="'/'"
          style="background-color: orange; color: white; font-size: 16px; border-radius: 8px"
          width="200"
          height="54"
          >回首頁</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
  <group-footer></group-footer>
</template>

<script setup>
import GroupFooter from '@/components/GroupFooter.vue'
</script>

<route lang="yaml">
meta:
  title: Page Not Found
</route>
