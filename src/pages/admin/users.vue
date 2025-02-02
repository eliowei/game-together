<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminUsers') }}</h1>
        <v-divider></v-divider>
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between mb-5">
            <v-btn @click="openDialog(null)">{{ $t('admin.userNew') }}</v-btn>
            <div style="height: 60px; width: 80%" class="d-flex mr-3 ml-5">
              <v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                variant="outlined"
                max-width="600px"
              ></v-text-field>
            </div>
          </div>

          <v-data-table :items="user" :headers="headers" :search="search">
            <template #[`item.role`]="{ item }">
              <span>{{ roleName(item.role) }} </span>
            </template>
            <template #[`item.edit`]="{ item }">
              <v-btn @click="openDialog(item)">{{ $t('admin.userEdit') }}</v-btn>
            </template>
            <template #[`item.delete`]="{ item }">
              <v-btn @click="deleteUser(item)">{{ $t('admin.userDelete') }}</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog.open" width="500">
    <v-form :disabled="isSubmitting" @submit.prevent="onSubmit">
      <v-card>
        <v-card-title>{{ $t(dialog.id ? 'admin.userEdit' : 'admin.userNew') }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex align-center">
                <v-avatar size="x-large">
                  <v-img alt="John" :src="userData.avatar"></v-img>
                </v-avatar>
                <v-btn class="ml-5">變更頭像</v-btn>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email.value.value"
                  :error-messages="email.errorMessage.value"
                  :label="$t('user.email')"
                ></v-text-field>
                <v-text-field
                  v-model="name.value.value"
                  :error-messages="name.errorMessage.value"
                  :label="$t('user.name')"
                  counter
                ></v-text-field>
                <v-text-field
                  v-model="account.value.value"
                  :error-messages="account.errorMessage.value"
                  :label="$t('user.account')"
                  counter
                ></v-text-field>
                <v-text-field
                  v-model="password.value.value"
                  type="password"
                  :error-messages="password.errorMessage.value"
                  :label="$t('user.password')"
                  counter
                ></v-text-field>
                <v-select
                  v-model="gender.value.value"
                  :error-messages="gender.errorMessage.value"
                  :label="$t('user.gender')"
                  :items="genderItems"
                  item-title="text"
                  item-value="value"
                ></v-select>
                <v-select
                  v-model="age.value.value"
                  :error-messages="age.errorMessage.value"
                  :label="$t('user.age')"
                  :items="ageItems"
                  item-title="text"
                  item-value="value"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">{{ $t('user.cancel') }}</v-btn>
          <v-btn type="submit" :loading="isSubmitting">{{ $t('user.submit') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useUserStore } from '@/stores/user'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'

const search = ref('')
const user = reactive([])
const { t } = useI18n()
const { apiAuth } = useAxios()
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
const openDialog = async (item) => {
  if (item) {
    console.log(item)

    dialog.value.id = item._id
    name.value.value = item.name
    account.value.value = item.account
    email.value.value = item.email
    password.value.value = ''
    age.value.value = item.age
    gender.value.value = item.gender
  }
  dialog.value.open = true
}

const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
}

const userData = useUserStore()

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
    fd.append('password', values.password)

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
