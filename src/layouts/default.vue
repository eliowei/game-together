<template>
  <v-app-bar>
    <!-- 桌面板型 MD 960px -->
    <template v-if="mdAndUp">
      <v-container
        class="d-flex justify-space-between align-center"
        fluid
        style="max-width: 1440px"
      >
        <!-- <v-avatar :image="logo" rounded="0" size="60"></v-avatar> -->
        <v-btn to="/" :active="false" class="ml-2" height="60" :ripple="false">
          <v-avatar :image="logo" rounded="0" size="65"></v-avatar>
        </v-btn>

        <div class="d-flex mr-6">
          <template v-for="nav of navs" :key="nav.to">
            <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">{{ nav.text }} </v-btn>
          </template>
          <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">{{
            $t('nav.logout')
          }}</v-btn>
          <v-avatar border="xs" :image="user.avatar"> </v-avatar>
        </div>
      </v-container>
    </template>
    <!-- 手機板型 -->
    <template v-else-if="!mdAndUp">
      <v-container class="d-flex justify-space-between align-center" fluid>
        <v-btn to="/" :active="false" class="ml-2" height="60" :ripple="false">
          <v-avatar :image="logo" rounded="0" size="65"></v-avatar>
        </v-btn>
        <v-app-bar-nav-icon @click="dialog = !dialog" class="mr-6"></v-app-bar-nav-icon>
      </v-container>
    </template>
  </v-app-bar>
  <!-- 手機板型展開選單 -->
  <v-navigation-drawer v-model="dialog" temporary location="top" v-if="!mdAndUp">
    <v-list>
      <template v-for="nav of navs">
        <v-list-item
          :key="nav.to"
          :to="nav.to"
          :prepend-icon="nav.icon"
          @click="dialog = false"
          v-if="nav.show"
          >{{ nav.text }}
        </v-list-item>
      </template>
      <v-list-item v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">{{
        $t('nav.logout')
      }}</v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <router-view />
  </v-main>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const { mdAndUp } = useDisplay()
const logo = ref(new URL('@/assets/logo.png', import.meta.url).href)

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
      to: '/member/organizer',
      text: t('nav.membersSection'),
      icon: 'mdi-account-group',
      show: user.isLoggedIn,
    },
    {
      to: '/admin/groups',
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

const dialog = ref(false)

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
  dialog.value = false
  router.push('/')
}
// 如果超過960px，則關閉手機板型的導覽列
watch(mdAndUp, () => {
  if (mdAndUp && dialog) {
    dialog.value = false
  }
})
</script>
