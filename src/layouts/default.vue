<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">Game Together</v-btn>
      <v-spacer></v-spacer>
      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">{{ nav.text }} </v-btn>
      </template>
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">{{
        $t('nav.logout')
      }}</v-btn>

      <v-avatar border="xs" :image="user.avatar"> </v-avatar>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

// 導覽列項目
const navs = computed(() => {
  return [
    {
      to: '/group/',
      text: t('nav.groupList'),
      icon: 'mdi-invoice-list-outline',
      show: user.isLoggedIn || !user.isLoggedIn,
    },
    {
      to: '/creategroup/setp1',
      text: t('nav.groupCreate'),
      icon: 'mdi-flag-outline',
      show: user.isLoggedIn || !user.isLoggedIn,
    },
    {
      to: '/member',
      text: t('nav.membersSection'),
      icon: 'mdi-account-group',
      show: user.isLoggedIn,
    },
    {
      to: '/admin',
      text: t('nav.adminSection'),
      icon: 'mdi-cog',
      show: user.isLoggedIn && user.isAdmin,
    },
    {
      to: '/contact',
      text: t('nav.contactUs'),
      icon: 'mdi-chat',
      show: user.isLoggedIn || !user.isLoggedIn,
    },
    { to: '/login', text: t('nav.login'), icon: 'mdi-account-arrow-left', show: !user.isLoggedIn },
    { to: '/register', text: t('nav.register'), icon: 'mdi-account-plus', show: !user.isLoggedIn },
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: t('logout.success'),
    snackbarProps: { color: 'green' },
  })
  router.push('/')
}
</script>
