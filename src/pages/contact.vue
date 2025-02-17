<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.contactUs') }}</h1>
      </v-col>
      <v-col cols="6" offset="3">
        <v-form :disabled="isSubmitting" @submit.prevent="onSubmit">
          <v-text-field
            v-model="nickname.value.value"
            :placeholder="t('contact.nickname')"
            :error-messages="nickname.errorMessage.value"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="email.value.value"
            :placeholder="t('contact.email')"
            :error-messages="email.errorMessage.value"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="title.value.value"
            :placeholder="t('contact.title')"
            :error-messages="title.errorMessage.value"
            variant="outlined"
          ></v-text-field>
          <v-textarea
            v-model="description.value.value"
            :placeholder="t('contact.description')"
            variant="outlined"
            no-resize
            :error-messages="description.errorMessage.value"
          ></v-textarea>
          <v-col offset="9">
            <v-btn
              class="mb-15 text-white"
              type="submit"
              :loading="isSubmitting"
              append-icon="mdi-arrow-right"
              width="120"
              height="40"
              color="orange"
              >送出</v-btn
            >
          </v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <group-footer class="mt-15"></group-footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import validator from 'validator'
import GroupFooter from '@/components/GroupFooter.vue'

const { t } = useI18n()
const { api } = useAxios()
const createSnackbar = useSnackbar()

const schema = yup.object({
  nickname: yup.string().required(t('contact.nicknameRequired')),
  email: yup
    // 資料型態是文字
    .string()
    // 必填
    .required(t('api.userEmailRequired'))
    // 自訂驗證(自訂驗證名稱, 錯誤訊息, function)
    .test('isEmail', t('api.userEmailInvalid'), (value) => validator.isEmail(value)),
  title: yup.string().required(t('contact.titleRequired')),
  description: yup.string().required(t('contact.descriptionRequired')),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
})

const nickname = useField('nickname')
const email = useField('email')
const title = useField('title')
const description = useField('description')

const onSubmit = handleSubmit(async (values) => {
  try {
    await api.post('/contactform/', {
      nickname: values.nickname,
      email: values.email,
      title: values.title,
      description: values.description,
    })
    resetForm()

    createSnackbar({
      text: t('contact.success'),
      snackbarProps: {
        color: 'green',
      },
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
})
</script>

<route lang="yaml">
meta:
  title: 'nav.contact'
</route>
