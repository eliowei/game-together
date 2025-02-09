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

      <v-avatar border="xs" :image="user.avatar"></v-avatar>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item>
        <div class="d-flex">
          <v-avatar :image="user.avatar" size="50"> </v-avatar>
          <div class="d-flex flex-column ml-3 justify-center">
            <span class="mr-3">{{ user.account }}</span
            ><span>{{ user.email }}</span>
          </div>
        </div>
      </v-list-item>
      <v-list-item>
        <v-chip v-for="item in userTags" :key="item" class="mr-2 mb-1">{{ item }} </v-chip>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-group value="Numbers">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle"
            title="我的揪團"
          ></v-list-item>
        </template>

        <v-list-item
          v-for="nav in groupNavs"
          :key="nav.to"
          :prepend-icon="nav.icon"
          :title="nav.title"
          :to="nav.to"
        ></v-list-item>
      </v-list-group>
    </v-list>

    <v-list>
      <v-list-group value="Users">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle"
            title="我的資訊"
          ></v-list-item>
        </template>

        <v-list-item
          v-for="nav in infoNavs"
          :key="nav.to"
          :prepend-icon="nav.icon"
          :title="nav.title"
          :to="nav.to"
        ></v-list-item>
      </v-list-group>
    </v-list>
    <v-divider></v-divider>
    <v-list-item
      >本周揪團<v-btn class="ml-10" append-icon="mdi-arrow-top-right">詳細月曆</v-btn></v-list-item
    >
    <v-list-item>名稱: 線上/線下 時間</v-list-item>
    <v-list-item>名稱: 線上/線下 時間</v-list-item>
    <v-list-item>名稱: 線上/線下 時間</v-list-item>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
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

const userTags = computed(() => {
  return user.tags
})

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
      to: '/group/create',
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

const groupNavs = computed(() => {
  return [
    { title: '主辦的揪團', icon: 'mdi-cog-outline', to: '/member/organizer' },
    { title: '參加的揪團', icon: 'mdi-cog-outline', to: '/member/participation' },
    { title: '收藏的揪團', icon: 'mdi-cog-outline', to: '/member/favorites' },
  ]
})

const infoNavs = computed(() => {
  return [
    { title: '個人資訊', icon: 'mdi-account-multiple-outline', to: '/member/info' },
    { title: '個人標籤', icon: 'mdi-cog-outline', to: '/member/tag' },
  ]
})

const langs = [
  { text: '繁體中文', value: 'zhHant' },
  { text: 'English', value: 'en' },
]

const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: t('logout.success'),
    snackbarProps: {
      color: 'green',
    },
  })
  router.push('/')
}
</script>
