<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12"
        ><h2 class="text-center mb-2 mt-2">{{ $t('group.createStep1') }}</h2>
        <v-progress-linear model-value="20" height="10" color="green-accent-4"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>

  <v-container style="max-width: 1440px">
    <h1 class="text-center mb-15">{{ $t('group.step1Title') }}</h1>
    <v-form :disabled="isSubmitting" @submit.prevent="onSubmit">
      <v-row>
        <v-col cols="6" offset="3">
          <div class="d-flex align-center">
            <span class="mr-12">{{ $t('group.name') }}</span>
            <v-text-field
              v-model="name.value.value"
              :placeholder="$t('group.namePlaceholder')"
              :error-messages="name.errorMessage.value"
              minLength="1"
              variant="outlined"
              class="creategroup__step1-form"
            ></v-text-field>
          </div>

          <div class="d-flex align-center">
            <span class="mr-12">{{ $t('group.description') }}</span>
            <v-text-field
              v-model="description.value.value"
              :placeholder="$t('group.descriptionPlaceholder')"
              :error-messages="description.errorMessage.value"
              minLength="1"
              variant="outlined"
              class="creategroup__step1-form"
            ></v-text-field>
          </div>

          <div class="d-flex align-center">
            <span class="mr-12">{{ $t('group.createdType') }}</span>
            <v-select
              v-model="type.value.value"
              :items="typeItems"
              :error-messages="type.errorMessage.value"
              item-title="text"
              item-value="value"
              variant="outlined"
              class="creategroup__step1-form"
              style="max-width: 100px"
            ></v-select>

            <span class="ml-5 mr-6">{{ $t('group.memberLimit') }}</span>
            <v-select
              v-model="member_limit.value.value"
              :items="memberLimitItems"
              :error-messages="member_limit.errorMessage.value"
              item-title="text"
              item-value="value"
              variant="outlined"
              class="creategroup__step1-form"
              style="max-width: 80px"
            ></v-select>
          </div>

          <div class="d-flex align-center">
            <span class="mr-12">{{ $t('group.contactInfo') }}</span>
            <v-select
              v-model="contact_method.value.value"
              :items="['Line', 'Discord', 'Facebook']"
              :error-messages="contact_method.errorMessage.value"
              variant="outlined"
              class="creategroup__step1-form"
              style="max-width: 150px"
            ></v-select>
            <v-text-field
              v-model="contact_info.value.value"
              :placeholder="$t('group.contactInfoPlaceholder')"
              :error-messages="contact_info.errorMessage.value"
              variant="outlined"
              class="creategroup__step1-form ml-5"
            ></v-text-field>
          </div>

          <div class="d-flex align-center" v-if="type.value.value === typeItems[1].value">
            <span class="mr-12">{{ $t('group.createdRegion') }}</span>
            <v-select
              v-model="city.value.value"
              :error-messages="city.errorMessage.value"
              :items="cityItems"
              item-title="text"
              item-value="value"
              class="creategroup__step1-form mr-4"
              variant="outlined"
              style="max-width: 150px"
            ></v-select>
            <v-select
              v-model="region.value.value"
              :error-messages="region.errorMessage.value"
              :items="regionItems"
              item-title="text"
              item-value="value"
              class="creategroup__step1-form"
              variant="outlined"
              style="max-width: 150px"
            ></v-select>
          </div>

          <div class="d-flex align-center" v-if="type.value.value === typeItems[1].value">
            <span class="mr-12">{{ $t('group.address') }}</span>
            <v-text-field
              v-model="address.value.value"
              :placeholder="$t('group.addressPlaceholder')"
              :error-messages="address.errorMessage.value"
              v-show="type.value.value === typeItems[1].value"
              class="creategroup__step1-form"
              variant="outlined"
            ></v-text-field>
          </div>

          <div class="d-flex align-center">
            <span>{{ $t('group.date') }}</span>

            <v-col cols="4">
              <VueDatePicker
                v-model="date.value.value"
                auto-apply
                :enable-time-picker="false"
                :format-locale="zhTW"
                hide-input-icon
                :format="format"
                :min-date="new Date()"
                class="ml-9"
              ></VueDatePicker
            ></v-col>
            <v-col cols="2" offset="1">
              <span>{{ $t('group.time') }}</span>
            </v-col>
            <v-col cols="3">
              <VueDatePicker
                v-model="time.value.value"
                time-picker
                hide-input-icon
                :select-text="$t('group.selectSure')"
                :cancel-text="$t('group.selectCancel')"
                :format="formatTime"
                :error-messages="time.errorMessage.value"
              ></VueDatePicker>
            </v-col>
          </div>
          <v-divider class="border-opacity-100 my-12"></v-divider>
          <v-col cols="12" offset="10" class="mb-16">
            <v-btn type="submit" width="110" append-icon="mdi-arrow-right">{{
              t('group.next')
            }}</v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  <group-footer></group-footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useAreaData } from '@/composables/areaData'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { zhTW } from 'date-fns/locale'
import { useGroupStore } from '@/stores/group'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import GroupFooter from '@/components/GroupFooter.vue'

const { t } = useI18n()
const format = "yyyy'-'MM'-'dd'"
const formatTime = "HH':'mm'"
const group = useGroupStore()
const { area_data } = useAreaData()
const router = useRouter()

// 揪團人數限制選項
const memberLimitItems = Array.from({ length: 19 }, (_, i) => ({
  text: String(i + 2),
  value: i + 2,
}))
const typeItems = computed(() => [
  { text: t('group.online'), value: '線上' },
  { text: t('group.offline'), value: '線下' },
])
const schema = yup.object({
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
  date: yup.date().required(t('group.dateRequired')),
  time: yup
    .object({
      hours: yup.number().required(),
      minutes: yup.number().required(),
    })
    .required(t('group.timeRequired')),
})
// 表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    description: '',
    type: t('group.online'),
    member_limit: 5,
    contact_method: 'Line',
    contact_info: '',
    city: 'taipei',
    region: t('area.taipei_zhongzheng'),
    address: '台北市中正區',
    date: new Date(),
    time: {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    },
  },
})

// 表單欄位
const name = useField('name')
const description = useField('description')
const type = useField('type')
const member_limit = useField('member_limit')
const contact_method = useField('contact_method')
const contact_info = useField('contact_info')
const city = useField('city')
const region = useField('region')
const address = useField('address')
const date = useField('date')
const time = useField('time')

const onSubmit = handleSubmit((values) => {
  group.setStep1(values)
  // console.log(values)
  router.push('/creategroup/step2')
})

onMounted(() => {
  // console.log(group.step1)
  if (group.hasData.resotre.step1) {
    name.value.value = group.step1.name
    description.value.value = group.step1.description
    type.value.value = group.step1.type
    member_limit.value.value = group.step1.member_limit
    contact_method.value.value = group.step1.contact_method
    contact_info.value.value = group.step1.contact_info
    city.value.value = group.step1.city
    region.value.value = group.step1.region
    address.value.value = group.step1.address
    date.value.value = new Date(group.step1.date)
    time.value.value = group.step1.time
  }
})

// 台灣縣市選項
const cityItems = computed(() => [
  { text: t('area.taipei'), value: 'taipei' },
  { text: t('area.newTaipei'), value: 'newTaipei' },
  { text: t('area.keeLung'), value: 'keeLung' },
  { text: t('area.taoyuan'), value: 'taoyuan' },
  { text: t('area.hsinchuCounty'), value: 'hsinchuCounty' },
  { text: t('area.hsinchu'), value: 'hsinchu' },
  { text: t('area.miaoli'), value: 'miaoli' },
  { text: t('area.taichung'), value: 'taichung' },
  { text: t('area.nantou'), value: 'nantou' },
  { text: t('area.changhua'), value: 'changhua' },
  { text: t('area.yunlin'), value: 'yunlin' },
  { text: t('area.chiayi'), value: 'chiayi' },
  { text: t('area.chiayiCounty'), value: 'chiayiCounty' },
  { text: t('area.tainan'), value: 'tainan' },
  { text: t('area.kaohsiung'), value: 'kaohsiung' },
  { text: t('area.pingtung'), value: 'pingtung' },
  { text: t('area.yilan'), value: 'yilan' },
  { text: t('area.hualien'), value: 'hualien' },
  { text: t('area.taitung'), value: 'taitung' },
  { text: t('area.penghu'), value: 'penghu' },
  { text: t('area.kinmen'), value: 'kinmen' },
  { text: t('area.lienchiang'), value: 'lienchiang' },
])
// 監聽縣市變更
watch(
  () => city.value.value,
  (newCity) => {
    // 當縣市改變時，清空地區選擇
    region.value.value = ''
  },
)
const regionItems = computed(() => {
  // console.log(city.value.value)
  // console.log(area_data.taipei)
  if (!city.value.value || !area_data[city.value.value]) return []
  return area_data[city.value.value].map((item) => ({
    text: item,
    value: item,
  }))
})
</script>

<route lang="yaml">
meta:
  title: 'nav.groupCreate'
  login: true
</route>
