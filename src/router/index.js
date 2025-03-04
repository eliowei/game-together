/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18N'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

// beforeEach = 進到每頁之前執行funciton
// to = 進到的頁面
// from = 從哪個頁面進來
// next = 繼續執行下一個function

router.beforeEach(async (to, from, next) => {
  const { apiAuth } = useAxios()
  const user = useUserStore()

  if (!to.matched.length) {
    next('/404')
  }
  //START_LOCATION = 初始導航，重新整理後導航過去的頁面
  else if (from === START_LOCATION && user.isLoggedIn) {
    try {
      const { data } = await apiAuth.get('./user/profile')
      user.login(data.result)
      next()
    } catch (error) {
      console.log(error)
      user.logout()
      next()
    }
  }
  // 如果是登入，跳頁到/login或 /register 則導向首頁
  else if (user.isLoggedIn && ['/login', '/register'].includes(to.path)) {
    next({ path: '/' })
  }
  // 如果是設定需要登入的頁面，並且沒有登入，則導向登入頁面
  else if (to.meta.login && !user.isLoggedIn) {
    next('/login')
  }
  // 如果是設定需要管理員的頁面，並且不是管理員，則導向首頁
  else if (to.meta.admin && !user.isAdmin) {
    next('/')
  }
  // 如果是主辦揪團頁面，並未依照指定的路徑進入，則導向第一步
  else if (user.isLoggedIn && to.path.startsWith('/creategroup/')) {
    const step = to.path.split('/').pop()
    const validPaths = {
      step2: ['/creategroup/step1', '/creategroup/step3', '/creategroup/step4'],
      step3: ['/creategroup/step2', '/creategroup/step4'],
      step4: ['/creategroup/step3'],
      step5: ['/creategroup/step4'],
    }
    if (validPaths[step] && !validPaths[step].includes(from.path)) {
      return next('/creategroup/step1')
    } else {
      next()
    }
  } else {
    next()
  }
})
// 進到每頁之後執行function
router.afterEach((to) => {
  document.title = i18n.global.t(to.meta.title) + ' | 遊戲揪團平台'
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
