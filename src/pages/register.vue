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
              'align-center': complateState,
            },
          ]"
        >
          <v-form
            :disabled="isSubmitting"
            @submit.prevent="submit"
            class="px-12"
            v-if="!complateState"
          >
            <h1 class="mb-4">{{ $t('nav.register') }}</h1>
            <span style="font-size: 20px; font-weight: bold">Nickname</span>
            <v-text-field
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
              :placeholder="$t('user.namePlaceholder')"
              counter
              variant="outlined"
              class="mt-3"
            ></v-text-field>
            <span style="font-size: 20px; font-weight: bold">Account</span>
            <v-text-field
              v-model="account.value.value"
              :error-messages="account.errorMessage.value"
              :placeholder="$t('user.accountPlaceholder')"
              minlength="4"
              maxlength="20"
              counter
              variant="outlined"
              class="mt-3"
            ></v-text-field>
            <span style="font-size: 20px; font-weight: bold">Email</span>
            <v-text-field
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              :placeholder="$t('user.loginPlaceholder')"
              counter
              variant="outlined"
              class="mt-3"
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
              class="mt-3"
            ></v-text-field>
            <span style="font-size: 20px; font-weight: bold">Confrim Password</span>
            <v-text-field
              v-model="passwordConfirm.value.value"
              type="password"
              :error-messages="passwordConfirm.errorMessage.value"
              :placeholder="$t('user.passwordConfirmPlaceholder')"
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
              class="w-100 register__form-button"
              variant="outlined"
              height="58"
              >{{ t('register.submit') }}</v-btn
            >
          </v-form>
          <div v-if="complateState" class="register__content-success">
            <h1 class="mb-9">{{ $t('register.success') }}</h1>
            <v-icon
              class="mb-5 register__content-success-icon"
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
import { ref } from 'vue'
import GroupFooter from '@/components/GroupFooter.vue'

const { t } = useI18n()
const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const complateState = ref(false)

const schema = yup.object({
  name: yup
    // 資料型態是文字
    .string()
    // 必填
    .required(t('api.userNameRequired'))
    // 自訂驗證(自訂驗證名稱, 錯誤訊息, function)
    .test('isAlphanumeric', t('api.userNameInvalid'), (value) => validator.isAlphanumeric(value)),
  account: yup
    // 資料型態是文字
    .string()
    // 必填
    .required(t('api.userAccountRequired'))
    // 最短長度
    .min(4, t('api.userAccountTooShort'))
    // 最長長度
    .max(20, t('api.userAccountTooLong'))
    // 自訂驗證(自訂驗證名稱, 錯誤訊息, function)
    .test('isAlphanumeric', t('api.userAccountInvalid'), (value) =>
      validator.isAlphanumeric(value),
    ),
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
  passwordConfirm: yup
    .string()
    // .oneOf(陣列,訊息)  必須要是陣列內其中一個值
    // .ref(欄位名稱)     取得欄位的值
    // .ref('password')   password 欄位的值
    .oneOf([yup.ref('password')], t('api.userPasswordNotMatch')),
})

// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

// 建立欄位
const name = useField('name')
const account = useField('account')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/user', {
      name: values.name,
      account: values.account,
      email: values.email,
      password: values.password,
    })
    createSnackbar({
      text: t('register.success'),
      snackbarProps: {
        color: 'green',
      },
    })

    complateState.value = true
    setTimeout(() => {
      router.push('/login')
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
  title: 'nav.register'
</route>
