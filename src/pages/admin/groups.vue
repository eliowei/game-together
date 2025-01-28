<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminGroups') }}</h1>
        <v-divider></v-divider>
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between mb-5">
            <v-btn>{{ $t('admin.groupNew') }}</v-btn>
            <div style="height: 60px; width: 80%" class="d-flex align-ceneter mr-3 ml-5">
              <v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                variant="outlined"
                max-width="600px"
              ></v-text-field>
            </div>
          </div>

          <v-data-table :items="group" :headers="headers" :search="search">
            <template #[`item.image`]="{ value }">
              <v-img :src="value" height="50"></v-img>
            </template>
            <template #[`item.time`]="{ value }">
              {{ new Date(value).toLocaleString() }}
            </template>
            <template #[`item.edit`]="{ item }">
              <v-btn>{{ $t('admin.groupEdit') }}</v-btn>
            </template>
            <template #[`item.delete`]="{ item }">
              <v-btn @click="deleteGroup(item)">{{ $t('admin.groupDelete') }}</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog.open" width="800" persistent>
    <v-form>
      <v-card>
        <v-card-title>{{ $t(dialog.id ? 'adminGroup.edit' : 'adminGroup.new') }}</v-card-title>
        <v-card-text>
          <v-tabs v-model="tabSelect" align-tabs="star" color="deep-purple accent-4">
            <v-tab v-for="tab in tabs" :key="tab.id">{{ tab.title }}</v-tab>
          </v-tabs>
          <v-tabs-window v-model="tabSelect" class="my-8">
            <v-tabs-window-item :value="0">
              <v-text-field
                v-model="name.value.value"
                :label="$t('group.name')"
                :error-message="name.errorMessage.value"
                minLength="1"
              ></v-text-field>

              <v-text-field
                v-model="description.value.value"
                :label="$t('group.description')"
                :error-message="description.errorMessage.value"
                minLength="1"
              ></v-text-field>

              <v-select
                v-model="type.value.value"
                :label="$t('group.type')"
                :items="typeItems"
                :error-message="type.errorMessage.value"
                item-title="text"
                item-value="value"
                variant="solo"
              ></v-select>

              <v-select
                v-model="member_limit.value.value"
                :label="$t('group.memberLimit')"
                :items="memberLimitItems"
                :error-message="member_limit.errorMessage.value"
                item-title="text"
                item-value="value"
              ></v-select>

              <v-select
                v-model="contact_method.value.value"
                :label="$t('group.contactMethod')"
                :items="['Line', 'Discord', 'Facebook']"
                :error-message="contact_method.errorMessage.value"
                variant="solo"
              ></v-select>

              <v-text-field
                v-model="contact_info.value.value"
                :label="$t('group.contactInfo')"
                :error-message="contact_info.errorMessage.value"
              ></v-text-field>

              <v-select
                v-model="city.value.value"
                :label="$t('group.city')"
                :error-message="city.errorMessage.value"
                v-if="type.value.value === typeItems[1].value"
                :items="cityItems"
                item-title="text"
                item-value="value"
              ></v-select>

              <v-select
                v-model="region.value.value"
                :label="$t('group.region')"
                :error-message="region.errorMessage.value"
                v-if="type.value.value === typeItems[1].value"
                :items="regionItems"
                item-title="text"
                item-value="value"
              ></v-select>

              <v-text-field
                v-model="address.value.value"
                :label="$t('group.address')"
                :error-message="address.errorMessage.value"
                v-if="type.value.value === typeItems[1].value"
              ></v-text-field>

              <div class="d-flex align-center">
                <v-col cols="2">
                  <span>{{ $t('group.time') }}</span>
                </v-col>

                <v-col cols="5">
                  <VueDatePicker
                    v-model="date.value.value"
                    auto-apply
                    :enable-time-picker="false"
                    :format-locale="zhTW"
                    hide-input-icon
                    :format="format"
                    :min-date="new Date()"
                  ></VueDatePicker
                ></v-col>
                <v-col cols="2">
                  <span>{{ $t('group.startTime') }}</span>
                </v-col>
                <v-col cols="2">
                  <VueDatePicker
                    v-model="time.value.value"
                    time-picker
                    hide-input-icon
                    :select-text="$t('group.selectSure')"
                    :cancel-text="$t('group.selectCancel')"
                  ></VueDatePicker>
                </v-col>
              </div>
            </v-tabs-window-item>

            <v-tabs-window-item :value="1"> 2 </v-tabs-window-item>

            <v-tabs-window-item :value="2"> 3 </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import { reactive, ref, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useAreaData } from '@/composables/areaData'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { zhTW } from 'date-fns/locale'

const { apiAuth } = useAxios()
const { t } = useI18n()
const { area_data } = useAreaData()
const createSnackbar = useSnackbar()
const group = reactive([])
const search = ref('')
const format = "yyyy'-'MM'-'dd'"
const tabSelect = ref(0)

const headers = [
  { title: t('group.name'), key: 'name', sortable: true },
  { title: t('group.organizerName'), key: 'organizer_id.name', sortable: true },
  { title: t('group.time'), key: 'time', sortable: true },
  { title: t('group.memberLimit'), key: 'member_limit', sortable: true },
  { title: t('group.type'), key: 'type', sortable: true },
  { title: t('group.address'), key: 'address', sortable: true },
  { title: '', key: 'edit', sortable: false },
  { title: '', key: 'delete', sortable: false },
  // { title: t('group.image'), key: 'image', sortable: true },
  // { title: t('group.createdAt'), key: 'createdAt', sortable: true },
  // { title: t('group.updatedAt'), key: 'updatedAt', sortable: true },
]

const typeItems = computed(() => [
  { text: t('group.online'), value: '線上' },
  { text: t('group.offline'), value: '線下' },
])

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

const memberLimitItems = Array.from({ length: 19 }, (_, i) => ({
  text: String(i + 2),
  value: i + 2,
}))

const getGroups = async () => {
  try {
    const { data } = await apiAuth.get('/group/all')
    group.push(...data.result)
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
getGroups()

const dialog = ref({
  open: true,
  id: '',
})

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
  city: yup.string().required(t('group.cityRequired')),
  region: yup.string().required(t('group.regionRequired')),
  address: yup.string().required(t('group.addressRequired')),
  date: yup.date().required(t('group.dateRequired')),
  time: yup.date().required(t('group.timeRequired')),
})

const { haldeSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    description: '',
    type: t('group.online'),
    member_limit: '5',
    contact_method: 'Line',
    contact_info: '',
    city: 'taipei',
    region: t('area.taipei_zhongzheng'),
    address: '',
    date: new Date(),
    time: new Date(),
  },
})

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

// 監聽縣市變更
watch(
  () => city.value.value,
  (newCity) => {
    // 當縣市改變時，清空地區選擇
    region.value.value = ''
  },
)

const regionItems = computed(() => {
  if (!city.value.value || !area_data[city.value.value]) return []
  return area_data[city.value.value].map((item) => ({
    text: item,
    value: item,
  }))
})

const deleteGroup = async (item) => {
  console.log(item)
  try {
    await apiAuth.delete('/group/' + item._id)
    group.length = 0
    await getGroups()
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

const tabs = [
  { id: 1, title: t('tab.group') },
  { id: 2, title: t('tab.tag') },
  { id: 3, title: t('tab.content') },
]
</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminGroups'
</route>
