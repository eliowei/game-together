<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12"
        ><h2 class="text-center mb-2 mt-2">{{ $t('group.createStep4') }}</h2>
        <v-progress-linear model-value="80" height="10" color="green-accent-4"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <group-preview v-bind="data"></group-preview>
    <v-divider class="border-opacity-100 my-12"></v-divider>
    <v-col class="d-flex justify-space-between">
      <v-btn width="100" append-icon="mdi-arrow-left" to="/creategroup/step3">{{
        t('group.previous')
      }}</v-btn>

      <v-btn
        type="submit"
        width="100"
        append-icon="mdi-arrow-right"
        @click="onSubmit"
        :loading="isSubmitting"
        :disabled="isSubmitting"
        >{{ t('group.next') }}</v-btn
      >
    </v-col>
  </v-container>
  <group-footer></group-footer>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useGroupStore } from '@/stores/group'
import GroupPreview from '@/components/GroupPreview.vue'
import { useDate } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useAxios } from '@/composables/axios'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import GroupFooter from '@/components/GroupFooter.vue'

const userStore = useUserStore()
const groupStore = useGroupStore()
const dateVuetify = useDate()
const { t } = useI18n()
const router = useRouter()
const createSnackbar = useSnackbar()
const { apiAuth } = useAxios()

// 建立表單驗證
const schema = yup.object({
  organizer_id: yup.string().required(t('group.organizerNameRequired')),
  name: yup.string().required(t('group.nameRequired')),
  description: yup.string().required(t('group.descriptionRequired')),
  type: yup.string().required(t('group.typeRequired')),
  member_limit: yup.number().required(t('group.memberLimitRequired')),
  contact_method: yup
    .string()
    .required()
    .oneOf(['Line', 'Discord', 'Facebook'], t('group.contactMethodRequired')),
  contact_info: yup.string().required(t('group.contactInfoRequired')),
  city: yup.string().when('type', {
    is: (val) => val === t('group.offline'),
    then: () => yup.string().required(t('group.cityRequired')),
    otherwise: () => yup.string(),
  }),
  region: yup.string().when('type', {
    is: (val) => val === t('group.offline'),
    then: () => yup.string().required(t('group.regionRequired')),
    otherwise: () => yup.string(),
  }),
  address: yup.string().when('type', {
    is: (val) => val === t('group.offline'),
    then: () => yup.string().required(t('group.addressRequired')),
    otherwise: () => yup.string(),
  }),
  time: yup.string().required(t('group.timeRequired')),
  tags: yup.array().required(t('group.tagRequired')),
  content: yup.string().required(t('group.contentRequired')),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
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
    time: groupStore.step1.date,
    tags: groupStore.step2.tags,
    content: groupStore.step3.content,
  },
})

const organizer_id = useField('organizer_id')
const name = useField('name')
const description = useField('description')
const type = useField('type')
const member_limit = useField('member_limit')
const contact_method = useField('contact_method')
const contact_info = useField('contact_info')
const city = useField('city')
const region = useField('region')
const address = useField('address')
const time = useField('time')
const tags = useField('tags')
const content = useField('content')

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

// 將 base64 轉為 File 物件
const base64ToFile = (base64String, filename) => {
  // 1. 移除 base64 的前綴（例如：data:image/jpeg;base64,）
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  // 2. 轉換為 ArrayBuffer
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  // 3. 建立 File 物件
  return new File([u8arr], filename, { type: mime })
}
const fileImage = base64ToFile(data.value.images, 'image.jpg')

const onSubmit = handleSubmit(async () => {
  if (!fileImage) {
    createSnackbar({
      text: t('group.imageRequired'),
      snackbarProps: {
        color: 'red',
      },
    })
    router.push('/creategroup/step3')
    return
  }

  try {
    time.value.value = `${dateVuetify.format(groupStore.step1.date, 'keyboardDate')} ${String(groupStore.step1.time.hours).padStart(2, '0')}:${String(groupStore.step1.time.minutes).padStart(2, '0')}:00`

    const fd = new FormData()
    fd.append('organizer_id', organizer_id.value.value)
    fd.append('name', name.value.value)
    fd.append('description', description.value.value)
    fd.append('type', type.value.value)
    fd.append('member_limit', member_limit.value.value)
    fd.append('contact_method', contact_method.value.value)
    fd.append('contact_info', contact_info.value.value)

    if (type.value.value === t('group.online')) {
      fd.append('city', '')
      fd.append('region', '')
      fd.append('address', '')
    } else {
      fd.append('city', city.value.value)
      fd.append('region', region.value.value)
      fd.append('address', address.value.value)
    }
    fd.append('time', time.value.value)

    for (let tag of tags.value.value) {
      fd.append('tags[]', tag) //後端接收為array
    }
    fd.append('content', content.value.value)
    fd.append('image', fileImage)

    await apiAuth.post('/group', fd)

    groupStore.restData()

    // 顯示成功訊息
    createSnackbar({
      text: t('group.createSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
    groupStore.restData()
    router.push('/creategroup/step5')
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

onMounted(() => {
  checkStoreData()
})

const checkStoreData = () => {
  // 直接從 localStorage 讀取並驗證
  const storedData = JSON.parse(localStorage.getItem('createGroupData'))

  // 檢查資料結構
  const requiredFields = {
    step1: [
      'name',
      'description',
      'type',
      'member_limit',
      'contact_method',
      'contact_info',
      'city',
      'region',
      'address',
      'time',
    ],
    step2: ['tags'],
    step3: ['content', 'image'],
  }

  try {
    for (const [step, fields] of Object.entries(requiredFields)) {
      for (const field of fields) {
        if (!(field in storedData[step])) {
          if (step === 'step1') {
            groupStore.step1[field] = ''
          } else if (step === 'step2') {
            groupStore.step2[field] = []
          } else if (step === 'step3') {
            groupStore.step3[field] = ''
          }
          createSnackbar({
            text: `${step} 的 ${t(`group.${field}`)}資料有誤，已重置`,
            snackbarProps: { color: 'red' },
          })

          router.push(`/creategroup/${step}`)
          return
        }
      }
    }
  } catch (error) {
    createSnackbar({
      text: error.message,
      snackbarProps: { color: 'red' },
    })
  }
}

// 修改 storage 事件監聽
window.addEventListener('storage', () => {
  checkStoreData()
})
</script>

<route lang="yaml">
meta:
  title: 'nav.groupCreate'
  login: true
</route>
