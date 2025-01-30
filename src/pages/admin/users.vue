<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminUsers') }}</h1>
        <v-divider></v-divider>
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between mb-5">
            <v-btn>{{ $t('admin.userNew') }}</v-btn>
            <div style="height: 60px; width: 80%" class="d-flex align-ceneter mr-3 ml-5">
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
              <v-btn @click="">{{ $t('admin.userEdit') }}</v-btn>
            </template>
            <template #[`item.delete`]="{ item }">
              <v-btn @click="deleteUser(item)">{{ $t('admin.userDelete') }}</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const search = ref('')
const user = reactive([])
const { t } = useI18n()
const { apiAuth } = useAxios()
const { createSnackbar } = useSnackbar()
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
    const { data } = await apiAuth.delete('/user/' + item._id)


  } catch (error) {
    console.log(error)
  }
}
</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminUsers'
</route>
