// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const id = ref('')
    const account = ref('')
    const email = ref('')
    const role = ref(UserRole)
    const image = ref('')

    const isLoggedIn = computed(() => {
      return token.value.length > 0
    })

    const isAdmin = computed(() => {
      return role.value === UserRole.ADMIN
    })

    const avatar = computed(() => {
      if (image.value) {
        return image.value
      } else if (account.value) {
        return `http://api.multiavatar.com/${account.value}.png`
      }
    })

    const setAvatar = (value) => {
      console.log(value)
      image.value = value
    }

    const login = (data) => {
      if (data.token) {
        token.value = data.token
      }
      id.value = data.id
      account.value = data.account
      email.value = data.email
      role.value = data.role
      image.value = data.image
    }

    const logout = () => {
      token.value = ''
      id.value = ''
      account.value = ''
      email.value = ''
      role.value = UserRole.USER
      image.value = ''
    }

    return {
      token,
      id,
      account,
      email,
      role,
      isLoggedIn,
      isAdmin,
      login,
      logout,
      avatar,
      image,
      setAvatar,
    }
  },
  {
    persist: {
      key: 'group-user',
      pick: ['token'],
    },
  },
)
