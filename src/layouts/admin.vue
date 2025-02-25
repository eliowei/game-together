<template>
  <v-app-bar>
    <!-- 桌面板型 MD 960px -->
    <template v-if="mdAndUp">
      <v-container class="d-flex justify-space-between align-center" fluid>
        <v-btn to="/" :active="false" class="ml-2">Game Together</v-btn>
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
    <template v-if="!mdAndUp">
      <v-container class="d-flex justify-space-between align-center" fluid>
        <v-btn to="/" :active="false" class="ml-2">Game Together</v-btn>
        <v-app-bar-nav-icon @click="dialog = !dialog"></v-app-bar-nav-icon>
      </v-container>
    </template>
  </v-app-bar>
  <!-- 手機板型展開選單 -->
  <v-navigation-drawer v-model="dialog" temporary location="top" v-if="!mdAndUp">
    <v-list>
      <template v-for="nav of navs">
        <v-list-item v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">
          {{ nav.text }}</v-list-item
        >
      </template>
      <v-list-item
        v-if="user.isLoggedIn"
        prepend-icon="mdi-account-arrow-right"
        @click="
          () => {
            logout()
            dialog = false
          }
        "
        >{{ $t('nav.logout') }}</v-list-item
      >
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    permanent
    :rail="rail"
    rail-width="90"
    drawer="drawer"
    @click="!mdAndUp ? (rail = false) : null"
    width="260"
    :class="{ 'cursor-pointer': rail }"
  >
    <v-list v-if="rail">
      <v-list-item>
        <v-avatar :image="user.avatar" size="40"></v-avatar>
      </v-list-item>
    </v-list>

    <v-list v-if="!rail">
      <div class="d-flex justify-space-between align-center">
        <v-list-item :prepend-avatar="user.avatar" :title="user.nickname"> </v-list-item>
        <v-btn
          v-if="!mdAndUp"
          icon="mdi-chevron-left"
          size="40"
          variant="text"
          @click.stop="rail = true"
        ></v-btn>
      </div>

      <v-divider></v-divider>
      <v-list-item v-for="sidebar of sidebars" :key="sidebar.to" :to="sidebar.to">{{
        sidebar.text
      }}</v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { useSnackbar } from 'vuetify-use-dialog'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const user = useUserStore()
const createSnackbar = useSnackbar()
const { mdAndUp } = useDisplay()
const router = useRouter()

const dialog = ref(false)
const rail = ref(false)

// 導覽列項目
const navs = computed(() => {
  return [
    {
      to: '/group',
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

const sidebars = computed(() => [
  { to: '/admin/groups', text: t('nav.adminGroups') },
  { to: '/admin/users', text: t('nav.adminUsers') },
  { to: '/admin/contacts', text: t('nav.adminContacts') },
])

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

  if (mdAndUp && rail) {
    rail.value = false
  }
})
</script>
