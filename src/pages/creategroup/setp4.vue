<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12"
        ><h2 class="text-center mb-2 mt-2">{{ $t('group.createSetp4') }}</h2>
        <v-progress-linear model-value="80" height="10" color="green-accent-4"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <group-preview v-bind="data"></group-preview>
    <v-divider class="border-opacity-100 my-12"></v-divider>
    <v-col class="d-flex justify-space-between">
      <v-btn width="100" append-icon="mdi-arrow-left" to="/creategroup/setp3">{{
        t('group.previous')
      }}</v-btn>

      <v-btn type="submit" width="100" append-icon="mdi-arrow-right" @click="onSubmit">{{
        t('group.next')
      }}</v-btn>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useGroupStore } from '@/stores/group'
import GroupPreview from '@/components/GroupPreview.vue'
import { useDate } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useAxios } from '@/composables/axios'

const userStore = useUserStore()
const groupStore = useGroupStore()
const dateVuetify = useDate()
const { t } = useI18n()
const router = useRouter()
const createSnackbar = useSnackbar()
const { apiAuth } = useAxios()

const data = ref({
  organizer_id: userStore.id,
  name: groupStore.step1.name,
  description: groupStore.step1.description,
  type: groupStore.step1.type,
  member_limit: groupStore.step1.member_limit,
  contact_method: groupStore.step1.contact_method,
  contact_info: groupStore.step1.contact_info,
  city: groupStore.step1.city,
  region: groupStore.step1.region,
  address: groupStore.step1.address,
  time: `${dateVuetify.format(groupStore.step1.date, 'keyboardDate')} ${String(groupStore.step1.time.hours).padStart(2, '0')}:${String(groupStore.step1.time.minutes).padStart(2, '0')}:00`,
  tags: groupStore.step2.tags,
  content: groupStore.step3.content,
  images: groupStore.step3.image,
})

const onSubmit = async () => {
  console.log(123)

  try {
    if (data.value.type === t('group.online')) {
      data.value.city = ''
      data.value.region = ''
      data.value.address = ''
    }

    await apiAuth.post('/user/organizerGroup', {
      organizer_id: data.value.organizer_id,
      name: data.value.name,
      description: data.value.description,
      type: data.value.type,
      member_limit: data.value.member_limit,
      contact_method: data.value.contact_method,
      contact_info: data.value.contact_info,
      city: data.value.city,
      region: data.value.region,
      address: data.value.address,
      time: data.value.time,
      tags: data.value.tags,
      content: data.value.content,
      image: data.value.images,
    })

    groupStore.restData()

    // 顯示成功訊息
    createSnackbar({
      text: t('group.createSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
    router.push('/creategroup/setp5')
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

console.log(data.value)
</script>

<route lang="yaml">
meta:
  title: 'nav.groupCreate'
  login: true
</route>
