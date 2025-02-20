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
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <div class="loading-overlay">
          <v-overlay
            :model-value="true"
            class="d-flex align-center justify-center"
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
      </template>
    </Suspense>
  </v-main>
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
      to: '/creategroup/step1',
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
