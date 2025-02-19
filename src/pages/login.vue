<template>
  <v-container fluid class="px-0" style="max-width: 1440px">
    <v-row>
      <v-col cols="6" class="pa-0 mt-16 pt-16">
        <v-img src="@/assets/swiper-2.jpg" :width="720" :height="744" cover></v-img>
      </v-col>
      <v-col cols="6" class="pa-0 mt-16 pt-3 mb-16 pb-9">
        <v-sheet
          :height="850"
          :width="650"
          :elevation="9"
          rounded
          :class="[
            'd-flex',
            'flex-column',
            'justify-center',
            'bg-black',
            {
              'align-center': user.token,
            },
          ]"
        >
          <v-form
            :disabled="isSubmitting"
            @submit.prevent="submit"
            class="px-12"
            v-if="!user.token"
          >
            <h1 class="mb-9">{{ $t('nav.login') }}</h1>
            <span style="font-size: 20px; font-weight: bold">Email</span>
            <v-text-field
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              :placeholder="$t('user.loginPlaceholder')"
              counter
              variant="outlined"
              class="mb-2 mt-3"
            ></v-text-field>
            <span style="font-size: 20px; font-weight: bold">Password</span>
            <v-text-field
              v-model="password.value.value"
              type="password"
              :error-messages="password.errorMessage.value"
              :placeholder="$t('user.passwordPlaceholder')"
              minlength="4"
              maxlength="20"
              counter
              variant="outlined"
              class="mb-5 mt-3"
            ></v-text-field>
            <v-btn
              :loading="isSubmitting"
              type="submit"
              color="orange"
              class="w-100 login__form-button"
              variant="outlined"
              height="58"
              >{{ t('login.submit') }}</v-btn
            >
          </v-form>
          <div v-if="user.token" class="login__content-success">
            <h1 class="mb-9">{{ $t('login.success') }}</h1>
            <v-icon
              class="mb-5 login__content-success-icon"
              color="success"
              icon="mdi-check-circle"
              size="112"
            ></v-icon>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <group-footer></group-footer>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import GroupFooter from '@/components/GroupFooter.vue'

const { t } = useI18n()
const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

const schema = yup.object({
  email: yup
    // 資料型態是文字
    .string()
    // 必填
    .required(t('api.userEmailRequired'))
    // 自訂驗證(自訂驗證名稱, 錯誤訊息, function)
    .test('isEmail', t('api.userEmailInvalid'), (value) => validator.isEmail(value)),
  password: yup
    .string()
    .required(t('api.userPasswordRequired'))
    .min(4, t('api.userPasswordTooShort'))
    .max(20, t('api.userPasswordTooLong')),
})

// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

// 建立欄位
const email = useField('email')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    const { data } = await api.post('/user/login', {
      email: values.email,
      password: values.password,
    })
    user.login(data.result)
    createSnackbar({
      text: t('login.success'),
      snackbarProps: {
        color: 'green',
      },
    })
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
})
</script>

<route lang="yaml">
meta:
  title: 'nav.login'
</route>
