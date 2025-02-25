<template>
  <v-container>
    <v-row>
      <v-col cols="11" offset="1">
        <h1>{{ $t('member.userEdit') }}</h1>

        <v-form :disabled="isSubmitting" @submit.prevent="onSubmit">
          <v-container>
            <v-row>
              <v-col cols="11" offset="1" class="d-flex align-center">
                <v-avatar size="x-large">
                  <v-img alt="John" :src="userPreviewAvatar" :alt="user.name"></v-img>
                </v-avatar>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/jpeg,image/png"
                  minlength="1024"
                  @change="uploadAvatar"
                  class="d-none"
                />
                <v-btn class="ml-5" @click="avatarFileInput" :disabled="!userEdit">變更頭像</v-btn>
              </v-col>
              <v-col cols="11" offset="1">
                <v-col cols="4">
                  <v-text-field
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    :label="$t('user.name')"
                    counter
                    :disabled="!userEdit"
                  ></v-text-field>
                  <v-select
                    v-model="gender.value.value"
                    :error-messages="gender.errorMessage.value"
                    :label="$t('user.gender')"
                    :items="genderItems"
                    item-title="text"
                    item-value="value"
                    :disabled="!userEdit"
                  ></v-select>
                  <v-select
                    v-model="age.value.value"
                    :error-messages="age.errorMessage.value"
                    :label="$t('user.age')"
                    :items="ageItems"
                    item-title="text"
                    item-value="value"
                    :disabled="!userEdit"
                  ></v-select>
                </v-col>
              </v-col>
              <v-col cols="8" offset="4" v-if="!userEdit">
                <button v-if="!userEdit" @click="userEdit = true">
                  <v-icon icon="mdi-pencil-outline" size="large"></v-icon>
                  {{ t('member.userEdit') }}
                </button>
              </v-col>
              <v-col cols="5">
                <div class="d-flex justify-end">
                  <v-btn v-if="userEdit" type="submit" :loading="isSubmitting" class="mr-3">{{
                    $t('member.submitEdit')
                  }}</v-btn>
                  <v-btn v-if="userEdit" @click="userEdit = false">{{
                    $t('member.cancelEdit')
                  }}</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useUserStore } from '@/stores/user'

const { apiAuth } = useAxios()
const { t } = useI18n()
const user = ref([])
const userData = useUserStore()
const createSnackbar = useSnackbar()
const userPreviewAvatar = ref('http://api.multiavatar.com/bbb.png')
const fileInput = ref(null)
const image = ref(null)
const userEdit = ref(false)
const genderItems = computed(() => [
  { text: t('user.genderMale'), value: '男' },
  { text: t('user.genderFemale'), value: '女' },
])
const ageItems = Array.from({ length: 100 }, (_, i) => ({
  text: i + 1,
  value: i + 1,
}))

const avatarFileInput = () => {
  fileInput.value.click()
}

const uploadAvatar = async () => {
  try {
    const file = fileInput.value.files[0]
    if (!file) return

    // 檢查檔案類型
    const validTypes = ['image/jpeg', 'image/png']
    if (!validTypes.includes(file.type)) {
      throw new Error('userImageInvalid')
    }
    userPreviewAvatar.value = URL.createObjectURL(file)
    image.value = file
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('admin.' + (error.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const schema = yup.object({
  name: yup
    // 資料型態是文字
    .string()
    // 必填
    .required(t('api.userNameRequired')),
  gender: yup.string().required(t('api.userGenderRequired')),
  age: yup.number().required(t('api.userAgeRequired')),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
})

const name = useField('name')
const gender = useField('gender')
const age = useField('age')

const onSubmit = handleSubmit(async (values) => {
  try {
    const fd = new FormData()

    fd.append('name', values.name)
    fd.append('age', values.age)
    fd.append('gender', values.gender)

    if (image.value) {
      fd.append('image', image.value)
    }

    await apiAuth.patch('/user/profile', fd)

    createSnackbar({
      text: t('api.userEditSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
    getUser()
    userEdit.value = false
  } catch (error) {
    console.log(error)
  }
})

const getUser = async () => {
  try {
    const { data } = await apiAuth.get('/user/profile')
    user.value = data.result
    console.log(user.value)
    userPreviewAvatar.value = user.value.image
    name.value.value = user.value.name
    age.value.value = user.value.age
    gender.value.value = user.value.gender
    userData.setAvatar(data.result.image)
    userData.setNickname(data.result.name)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

getUser()
</script>

<route lang="yaml">
meta:
  layout: members
  title: 'nav.memberInfo'
  login: true
</route>
