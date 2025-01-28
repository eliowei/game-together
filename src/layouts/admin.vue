<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item :prepend-avatar="user.avatar" :title="user.account"></v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="nav of navs" :key="nav.to" :to="nav.to">{{ nav.text }}</v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const user = useUserStore()
const navs = computed(() => [
  { to: '/admin/groups', text: t('nav.adminGroups') },
  { to: '/admin/users', text: t('nav.adminUsers') },
  { to: '/admin/contacts', text: t('nav.adminContacts') },
])
</script>
