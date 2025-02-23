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
          <v-avatar border="xs" :image="user.avatar"></v-avatar>
        </div>
      </v-container>
    </template>
    <!-- 手機板型 -->
    <template v-else-if="!mdAndUp">
      <v-container class="d-flex justify-space-between align-center" fluid>
        <v-btn to="/" :active="false" class="ml-2">Game Together</v-btn>
        <v-app-bar-nav-icon @click="dialog = !dialog" class="mr-6"></v-app-bar-nav-icon>
      </v-container>
    </template>
  </v-app-bar>
  <!-- 手機板型展開選單 -->
  <v-navigation-drawer v-model="dialog" temporary location="top" v-if="!mdAndUp">
    <v-list>
      <template v-for="nav of navs">
        <v-list-item v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon">{{
          nav.text
        }}</v-list-item>
      </template>
      <v-list-item
        v-if="user.isLoggedIn"
        @click="
          () => {
            logout()
            dialog = false
          }
        "
        prepend-icon="mdi-account-arrow-right"
        >{{ $t('nav.logout') }}</v-list-item
      >
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item>
        <div class="d-flex">
          <v-avatar :image="user.avatar" size="50"> </v-avatar>
          <div class="d-flex flex-column ml-3 justify-center">
            <span class="mr-3">{{ user.nickname }}</span
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
    <v-list-item class="w-100">
      <div class="d-flex justify-space-between align-center">
        <span class="font-weight-bold">本周揪團</span>
        <v-btn
          :to="'/member/date'"
          append-icon="mdi-arrow-top-right"
          variant="text"
          :ripple="false"
          :active="false"
        >
          詳細月曆
        </v-btn>
      </div>
    </v-list-item>
    <template v-for="group of groupFilter">
      <v-divider></v-divider>
      <v-list-item style="font-size: 14px"
        >{{ group.group_id.name }} {{ group.group_id.type }}
        <v-chip class="ml-1" prepend-icon="mdi-clock-time-four-outline">{{
          new Date(group.group_id.time).toLocaleDateString()
        }}</v-chip>
      </v-list-item>
    </template>
    <v-divider></v-divider>
    <v-list-item v-if="groupFilter.length === 0">本周無揪團</v-list-item>
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
import { useDate } from 'vuetify'
import { useDisplay } from 'vuetify'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const group = ref([])
const date = useDate()
const { mdAndUp } = useDisplay()

const userTags = computed(() => {
  return user.tags
})

const dialog = ref(false)

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

const groupNavs = computed(() => {
  return [
    { title: '主辦的揪團', icon: '', to: '/member/organizer' },
    { title: '參加的揪團', icon: '', to: '/member/participation' },
    { title: '收藏的揪團', icon: '', to: '/member/favorites' },
  ]
})

const infoNavs = computed(() => {
  return [
    { title: '個人資訊', icon: '', to: '/member/info' },
    { title: '個人標籤', icon: '', to: '/member/tag' },
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
  dialog.value = false
  router.push('/')
}

const getGroup = async () => {
  try {
    const res = await Promise.all([
      apiAuth.get('/user/organizerGroup'),
      apiAuth.get('/user/joinGroup'),
    ])

    for (let i = 0; i < res.length; i++) {
      group.value.push(...res[i].data.result)
    }
  } catch (error) {
    console.log(error)
  }
}
getGroup()

const groupFilter = computed(() => {
  const startOfWeek = date.startOfWeek(new Date())
  const endOfWeek = date.endOfWeek(new Date())

  return group.value
    .filter((item) => {
      const groupDate = new Date(item.group_id.time)

      const isInCurrentWeek = groupDate >= startOfWeek && groupDate <= endOfWeek

      const isInFuture = groupDate >= new Date()

      return isInCurrentWeek && isInFuture
    })
    .sort((a, b) => new Date(a.group_id.time) - new Date(b.group_id.time))
    .slice(0, 3)
})
// 如果超過960px，則關閉手機板型的導覽列
watch(mdAndUp, () => {
  if (mdAndUp && dialog) {
    dialog.value = false
  }
})
</script>
