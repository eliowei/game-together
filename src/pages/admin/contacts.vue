<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminContacts') }}</h1>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <div style="height: 60px; width: 100%" class="d-flex align-center justify-center mb-5">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            variant="outlined"
            max-width="600px"
          ></v-text-field>
        </div>
        <v-data-table :items="contact" :headers="headers" :search="search">
          <template #[`item.description`]="{ value }">
            <span>
              {{ value.length > 20 ? value.slice(0, 20) + '...' : value }}
            </span>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn @click="openDialog(item)">{{ $t('admin.contactView') }}</v-btn>
          </template>
          <template #[`item.delete`]="{ item }">
            <v-btn @click="deleteContact(item)">{{ $t('admin.contactDelete') }}</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog.open" width="400">
    <v-card>
      <v-card-title class="d-flex align-center mb-0 pb-0">
        <span>{{ t('adminContact.view') }}</span>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" variant="text" @click="dialog.open = false"></v-btn>
      </v-card-title>
      <v-card-text class="pt-0">
        <v-list class="py-0">
          <v-list-item class="py-0" v-for="(item, index) in dialogListItems" :key="index">
            {{ item.title }}: {{ item.value }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const search = ref('')
const contact = reactive([])
const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const headers = [
  { title: t('admin.contactName'), key: 'nickname', sortable: true },
  { title: t('admin.contactEmail'), key: 'email', sortable: true },
  { title: t('admin.contactTitle'), key: 'title', sortable: true },
  { title: t('admin.contactDescription'), key: 'description', sortable: true },
  { title: t('admin.contactDate'), key: 'createdAt', sortable: true },
  { title: '', key: 'action', sortable: false },
  { title: '', key: 'delete', sortable: false },
]

const dialogListItems = computed(() => [
  { title: t('admin.contactName'), value: dialog.value.nickname },
  { title: t('admin.contactEmail'), value: dialog.value.email },
  { title: t('admin.contactTitle'), value: dialog.value.title },
  { title: t('admin.contactDescription'), value: dialog.value.description },
])

const getContact = async () => {
  try {
    const { data } = await apiAuth.get('/contactform/all')
    contact.push(...data.result)
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
getContact()

const deleteContact = async (item) => {
  console.log(item)
  try {
    await apiAuth.delete('/contactform/' + item._id)
    contact.length = 0
    await getContact()
    createSnackbar({
      text: t('admin.contactDeleted'),
      snackbarProps: {
        color: 'green',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const dialog = ref({
  open: false,
  id: '',
  nickname: '',
  email: '',
  title: '',
  description: '',
})

const openDialog = (item) => {
  dialog.value.id = item._id
  dialog.value.nickname = item.nickname
  dialog.value.email = item.email
  dialog.value.title = item.title
  dialog.value.description = item.description
  dialog.value.open = true
}
</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminContacts'
</route>
