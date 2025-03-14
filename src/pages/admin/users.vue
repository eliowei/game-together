<template>
  <v-container class="admin__user" max-width="1440">
    <v-row>
      <v-col cols="11" offset="0" offset-sm="0" offset-md="0" offset-lg="0" offset-xl="1">
        <h1 class="text-center mb-5">{{ $t('nav.adminUsers') }}</h1>
        <v-col cols="12">
          <v-row class="mb-5">
            <v-col cols="3" align-self="center">
              <v-btn @click="openDialog(null)">{{ $t('admin.userNew') }}</v-btn>
            </v-col>
            <v-col cols="9" sm="9" md="9" lg="6" xl="6">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                max-width="600"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-data-table :items="user" :headers="headers" :search="search">
            <template #[`item.role`]="{ item }">
              <span>{{ roleName(item.role) }} </span>
            </template>
            <template #[`item.edit`]="{ item }">
              <v-btn @click="openDialog(item)">{{ $t('admin.userEdit') }}</v-btn>
            </template>
            <template #[`item.delete`]="{ item }">
              <v-btn @click="openDeleteDialog(item)">{{ $t('admin.userDelete') }}</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog.open" max-width="500">
    <v-form :disabled="isSubmitting">
      <v-card class="admin__user-form">
        <v-card-title>{{ $t(dialog.id ? 'admin.userEdit' : 'admin.userNew') }}</v-card-title>
        <v-card-text class="pb-0">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex align-center">
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
                <v-btn class="ml-5" @click="avatarFileInput">變更頭像</v-btn>
              </v-col>
              <v-col cols="12">
                <div class="d-flex">
                  <span class="mt-3 mr-5">{{ $t('user.email') }}</span>
                  <v-text-field
                    v-model="email.value.value"
                    :error-messages="email.errorMessage.value"
                    variant="outlined"
                    max-width="300"
                  ></v-text-field>
                </div>

                <div class="d-flex">
                  <span class="mt-3 mr-13">{{ $t('user.name') }}</span>
                  <v-text-field
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    counter
                    variant="outlined"
                    max-width="300"
                  ></v-text-field>
                </div>
                <div class="d-flex">
                  <span class="mt-3 mr-13">{{ $t('user.account') }}</span>
                  <v-text-field
                    v-model="account.value.value"
                    :error-messages="account.errorMessage.value"
                    counter
                    variant="outlined"
                    max-width="300"
                  ></v-text-field>
                </div>
                <div class="d-flex">
                  <span class="mt-3 mr-13">{{ $t('user.password') }}</span>
                  <v-text-field
                    v-model="password.value.value"
                    type="password"
                    :error-messages="password.errorMessage.value"
                    counter
                    variant="outlined"
                    max-width="300"
                  ></v-text-field>
                </div>
                <div class="d-flex">
                  <span class="mt-3 mr-13">{{ $t('user.gender') }}</span>
                  <v-select
                    v-model="gender.value.value"
                    :error-messages="gender.errorMessage.value"
                    :items="genderItems"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    max-width="300"
                  ></v-select>
                </div>
                <div class="d-flex">
                  <span class="mt-3 mr-13">{{ $t('user.age') }}</span>
                  <v-select
                    v-model="age.value.value"
                    :error-messages="age.errorMessage.value"
                    :items="ageItems"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    max-width="300"
                  ></v-select>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mb-3">
          <v-btn @click="closeDialog">{{ $t('user.cancel') }}</v-btn>
          <v-btn type="button" :loading="isSubmitting" @click="onSubmit">{{
            $t('user.submit')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
  <v-dialog v-model="deleteDialog.open" width="350">
    <v-card>
      <v-card-text>確定要刪除成員嗎?</v-card-text>
      <v-card-actions>
        <v-btn @click="deleteDialogAction('cancel')">取消</v-btn>
        <v-btn @click="deleteDialogAction('confirm')">確定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import * as yup from 'yup'
import validator from 'validator'

const search = ref('')
const user = reactive([])
const { t } = useI18n()
const { apiAuth } = useAxios()
const userData = useUserStore()
const createSnackbar = useSnackbar()
const headers = [
  { title: t('admin.userId'), key: '_id', sortable: true },
  { title: t('admin.userName'), key: 'name', sortable: true },
  { title: t('admin.userGender'), key: 'gender', sortable: true },
  { title: t('admin.userAge'), key: 'age', sortable: true },
  { title: t('admin.userEmail'), key: 'email', sortable: true },
  { title: t('admin.userRole'), key: 'role', sortable: true },
  { title: '', key: 'edit', sortable: false },
  { title: '', key: 'delete', sortable: false },
]
const dialog = ref({
  open: false,
  id: '',
})

const deleteDialog = ref({
  open: false,
  data: '',
})
const openDeleteDialog = (item) => {
  deleteDialog.value.open = true
  deleteDialog.value.data = item
}
const deleteDialogAction = (type) => {
  if (type === 'cancel') {
    deleteDialog.value.open = false
  } else if (type === 'confirm') {
    deleteUser(deleteDialog.value.data)
    deleteDialog.value.open = false
  }
}

const openDialog = async (item) => {
  if (item) {
    // console.log(item)

    dialog.value.id = item._id
    name.value.value = item.name
    account.value.value = item.account
    email.value.value = item.email
    password.value.value = '*****'
    age.value.value = item.age
    gender.value.value = item.gender
    userPreviewAvatar.value = item.image || `http://api.multiavatar.com/${account.value.value}.png`
  }
  dialog.value.open = true
}

const closeDialog = () => {
  dialog.value.open = false
  dialog.value.id = ''
  resetForm()
  fileInput.value = null
  image.value = null
}

const userPreviewAvatar = ref('http://api.multiavatar.com/bbb.png')
const fileInput = ref(null)
const image = ref(null)

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

    // 檢查檔案大小 (1MB)
    if (file.size > 1024 * 1024) {
      throw new Error('userImageMaxSize')
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

// 使用者權限名稱
const roleName = (role) => {
  if (role === 0) {
    return t('admin.userRoleUser')
  } else if (role === 1) {
    return t('admin.userRoleMember')
  } else if (role === 2) {
    return t('admin.userRoleAdmin')
  }
}
// 取得使用者資料
const getUser = async () => {
  try {
    const { data } = await apiAuth.get('/user/all')
    user.push(...data.result)

    user.find((item) => {
      if (item._id === userData.id) {
        userData.setAvatar(item.image)
        userData.setNickname(item.name)
      }
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
}
getUser()

const deleteUser = async (item) => {
  try {
    await apiAuth.delete('/user/' + item._id)
    user.length = 0
    await getUser()
    createSnackbar({
      text: t('admin.groupDeleted'),
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
}

const schema = yup.object({
  name: yup
    // 資料型態是文字
    .string()
    // 必填
    .required(t('api.userNameRequired')),
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
  gender: yup.string().required(t('api.userGenderRequired')),
  age: yup.number().required(t('api.userAgeRequired')),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
})
// 建立欄位
const name = useField('name')
const account = useField('account')
const email = useField('email')
const password = useField('password')
const gender = useField('gender')
const age = useField('age')
// 表單送出
const onSubmit = handleSubmit(async (values) => {
  try {
    const fd = new FormData()

    fd.append('name', values.name)
    fd.append('account', values.account)
    fd.append('email', values.email)
    fd.append('age', values.age)
    fd.append('gender', values.gender)
    if (values.password.includes('*')) {
      fd.append('password', '')
    } else {
      fd.append('password', values.password)
    }

    if (image.value) {
      fd.append('image', image.value)
    }

    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/user/profile/' + dialog.value.id, fd)
    } else {
      await apiAuth.post('/user', fd)
    }

    user.splice(0, user.length)
    getUser()

    createSnackbar({
      text: t(dialog.value.id.length > 0 ? 'admin.userEditSuccess' : 'admin.userCreated'),
      snackbarProps: {
        color: 'green',
      },
    })
    closeDialog()
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

const genderItems = computed(() => [
  { text: t('user.genderMale'), value: '男' },
  { text: t('user.genderFemale'), value: '女' },
])

const ageItems = Array.from({ length: 100 }, (_, i) => ({
  text: i + 1,
  value: i + 1,
}))
</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminUsers'
</route>
