<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12"
        ><h2 class="text-center mb-2 mt-2">{{ $t('group.createStep5') }}</h2>
        <v-progress-linear model-value="100" height="10" color="green-accent-4"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-col cols="12">
      <h1 class="text-center mb-15">主辦揪團成功!</h1>
      <h1 class="text-center mb-15">其他人將可以看到您的揪團</h1>
      <h3 class="text-center mb-15">您可以在會員專區編輯您的揪團</h3>
      <v-divider class="border-opacity-100 my-15"></v-divider>

      <div class="d-flex justify-center mb-16">
        <v-btn :to="'/member/organizer'">返回會員專區</v-btn>
      </div>
    </v-col>
  </v-container>
  <group-footer></group-footer>
</template>

<script setup>
import GroupFooter from '@/components/GroupFooter.vue'
</script>

<route lang="yaml">
meta:
  title: 'nav.groupCreate'
  login: true
</route>
