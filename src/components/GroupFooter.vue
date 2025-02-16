<template>
  <v-footer>
    <v-container>
      <v-row class="d-flex justify-space-around">
        <v-col cols="4" class="d-flex align-center">
          <h1>GAME TOGETHER</h1>
        </v-col>
        <v-col cols="3">
          <h1>SITEMAP</h1>
          <v-list>
            <template v-for="nav of navs" :key="nav.to">
              <v-list-item
                v-if="nav.show"
                :to="nav.to"
                :active="false"
                :ripple="false"
                lines="false"
                >{{ nav.text }}
              </v-list-item>
            </template>
          </v-list>
        </v-col>
        <v-col cols="3">
          <div class="d-flex flex-column">
            <h2 class="mb-4">COPYRIGHT</h2>
            <p>
              ©2025 GAME TOGETHER
              <br />
              BY BOWEI LI
              <br />
              All rights reserved.
            </p>
            <div class="d-flex mt-5">
              <button class="mr-5">
                <v-icon icon="mdi-facebook" size="x-large"></v-icon>
              </button>
              <button class="mr-5">
                <v-icon icon="mdi-instagram" size="x-large"></v-icon>
              </button>
              <button>
                <v-icon icon="mdi-twitter" size="x-large"></v-icon>
              </button>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-btn
        icon="mdi-chevron-up"
        rounded="48px"
        :width="48"
        height="48"
        base-color="orange"
        style="font-size: 22px; right: 50px; bottom: 30px"
        @click="scrollToTop"
        class="position-absolute back-to-top-button text-white"
      >
      </v-btn>
    </v-container>
  </v-footer>
</template>

<style scoped>
* {
  background: black;
  color: white;
}

.back-to-top-button:hover {
  box-shadow: 0 0 40px 0 orange;
}
</style>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { useGoTo } from 'vuetify'

const user = useUserStore()
const { t } = useI18n()
const goTo = useGoTo()

const navs = ref([
  { text: t('nav.groupList'), to: '/group', show: user.isLoggedIn || !user.isLoggedIn },
  { text: t('nav.groupCreate'), to: '/group/create', show: user.isLoggedIn || !user.isLoggedIn },
  { text: t('nav.membersSection'), to: '/member', show: user.isLoggedIn },
  { text: t('nav.adminSection'), to: '/admin', show: user.isLoggedIn && user.isAdmin },
  { text: t('nav.contactUs'), to: '/contact', show: user.isLoggedIn || !user.isLoggedIn },
])

const scrollToTop = () => {
  goTo(0, { duration: 700, offset: 0, easing: 'easeOutQuint' })
}
</script>
