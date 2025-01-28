// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const account = ref('')
    const email = ref('')
    const role = ref(UserRole)

    const isLoggedIn = computed(() => {
      return token.value.length > 0
    })

    const isAdmin = computed(() => {
      return role.value === UserRole.ADMIN
    })

    const avatar = computed(() => {
      return `http://api.multiavatar.com/${account.value}.png`
    })

    const login = (data) => {
      if (data.token) {
        token.value = data.token
      }
      account.value = data.account
      email.value = data.email
      role.value = data.role
    }

    const logout = () => {
      token.value = ''
      account.value = ''
      email.value = ''
      role.value = UserRole.USER
    }

    return {
      token,
      account,
      email,
      role,
      isLoggedIn,
      isAdmin,
      login,
      logout,
      avatar,
    }
  },
  {
    persist: {
      key: 'group-user',
      pick: ['token'],
    },
  },
)
