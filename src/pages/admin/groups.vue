<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminGroups') }}</h1>
        <v-divider></v-divider>
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between mb-5">
            <v-btn @click="openDialog(null)">{{ $t('admin.groupNew') }}</v-btn>
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
              <v-btn @click="openDialog(item)">{{ $t('admin.groupEdit') }}</v-btn>
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
    <v-form :disable="isSubmitting" @submit.prevent="onSubmit">
      <v-card>
        <v-card-title>{{ $t(dialog.id ? 'adminGroup.edit' : 'adminGroup.new') }}</v-card-title>
        <v-card-text>
          <v-tabs v-model="tabSelect" align-tabs="star" color="deep-purple accent-4">
            <v-tab v-for="tab in tabs" :key="tab.id">{{ tab.title }}</v-tab>
          </v-tabs>
          <v-tabs-window v-model="tabSelect" class="my-8">
            <v-tabs-window-item :value="0">
              <v-container>
                <v-select
                  v-model="organizer_id.value.value"
                  :label="$t('group.organizerName')"
                  :items="organizerNameItems"
                  :error-message="organizer.errorMessage"
                  item-title="text"
                  item-value="value"
                  variant="solo"
                ></v-select>

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
                      :format="formatTime"
                      :error-message="time.errorMessage.value"
                    ></VueDatePicker>
                  </v-col>
                </div>
              </v-container>
            </v-tabs-window-item>

            <v-tabs-window-item :value="1">
              <v-container>
                <h1 class="text-center">{{ $t('admin.groupTag') }}</h1>
                <h2 class="text-center">
                  {{ $t('admin.groupTagInfo', { variable: tagSelectCount }) }}
                </h2>
                <v-row>
                  <v-col cols="11">
                    <v-text-field
                      v-model="tagInput"
                      :placeholder="t('admin.groupPlaceHolder')"
                      @keydown.enter="tagSelectItemsPush({ text: tagInput, value: tagInput })"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-chip
                      v-for="tags in tagSelectItems"
                      :key="tags"
                      class="mr-2 mb-2"
                      variant="outlined"
                      closable
                      link
                      @click:close="tagSelectItemsSplice(tags)"
                      >{{ tags.text }}
                    </v-chip>
                  </v-col>
                  <v-col cols="12">
                    <h2>標籤:</h2>
                  </v-col>
                  <v-col>
                    <v-chip
                      v-for="tags in tagItemsFiltered"
                      :key="tags"
                      class="mr-2 mb-2"
                      variant="outlined"
                      link
                      @click="tagSelectItemsPush(tags)"
                    >
                      {{ tags.text }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-container>
            </v-tabs-window-item>

            <v-tabs-window-item :value="2">
              <v-container>
                <h1 class="text-center">{{ $t('admin.groupContent') }}</h1>
                <VueFileAgent
                  v-model="fileRecords"
                  v-model:raw-model-value="rawFileRecords"
                  accept="image/jpeg,image/png"
                  deletable
                  max-size="1MB"
                  :help-text="$t('fileAgent.helpText')"
                  :error-text="{ type: $t('fileAgent.errorType'), size: $t('fileAgent.errorSize') }"
                  class="mb-3"
                  ref="fileAgent"
                ></VueFileAgent>
                <MyEditor ref="fileAgentRef"></MyEditor>
              </v-container>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">{{ $t('adminGroup.cancel') }}</v-btn>
          <v-btn type="submit" :loading="isSubmitting">{{ $t('adminGroup.submit') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style>
#editor—wrapper {
  border: 1px solid #ccc;
  z-index: 100; /* If you need */
}
#toolbar-container {
  border-bottom: 1px solid #ccc;
}
#editor-container {
  height: 500px;
}
</style>

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
import MyEditor from '@/components/MyEditor.vue'
import { useDate } from 'vuetify'

const { apiAuth } = useAxios()
const { t } = useI18n()
const { area_data } = useAreaData()
const createSnackbar = useSnackbar()
const group = reactive([])
const search = ref('')
const format = "yyyy'-'MM'-'dd'"
const formatTime = "HH':'mm'"
const fileAgentRef = ref(null)
const dateVuetify = useDate()
const fileRecords = ref([])
const rawFileRecords = ref([])
const fileAgent = ref(null)
const organizer = reactive([])

const tabSelect = ref(0)
const tagSelectCount = ref(5)
const tagInput = ref('')
const tagSelectItems = ref([])
const tagItems = [
  {
    text: t('tag.computer'),
    value: t('tag.computer'),
  },
  {
    text: t('tag.mobile'),
    value: t('tag.mobile'),
  },
  {
    text: t('tag.console'),
    value: t('tag.console'),
  },
  {
    text: t('tag.virtualReality'),
    value: t('tag.virtualReality'),
  },
  {
    text: t('tag.augmentedReality'),
    value: t('tag.augmentedReality'),
  },
  {
    text: t('tag.webGame'),
    value: t('tag.webGame'),
  },
  {
    text: t('tag.Adventure'),
    value: t('tag.Adventure'),
  },
  {
    text: t('tag.RPG'),
    value: t('tag.RPG'),
  },
  {
    text: t('tag.simulation'),
    value: t('tag.simulation'),
  },
  {
    text: t('tag.sportsAndRacing'),
    value: t('tag.sportsAndRacing'),
  },
  {
    text: t('tag.puzzleAndParty'),
    value: t('tag.puzzleAndParty'),
  },
  {
    text: t('tag.musicAndRhythm'),
    value: t('tag.musicAndRhythm'),
  },
  {
    text: t('tag.sandboxAndOpenWorld'),
    value: t('tag.sandboxAndOpenWorld'),
  },
  {
    text: t('tag.scienceFictionAndFantasy'),
    value: t('tag.scienceFictionAndFantasy'),
  },
  {
    text: t('tag.EducationAndExperimental'),
    value: t('tag.EducationAndExperimental'),
  },
  {
    text: t('tag.massiveMultiplayer'),
    value: t('tag.massiveMultiplayer'),
  },
]
// 表格標題
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
// 揪團類型選項
const typeItems = computed(() => [
  { text: t('group.online'), value: '線上' },
  { text: t('group.offline'), value: '線下' },
])
// 取得使用者資料
const getUser = async () => {
  try {
    const { data } = await apiAuth.get('/user/all')
    organizer.push(...data.result)
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
// 將揪團使用者名稱，並轉換成選項
const organizerNameItems = computed(() =>
  organizer.map((item) => ({ text: item.name, value: item._id })),
)
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
// 揪團人數限制選項
const memberLimitItems = Array.from({ length: 19 }, (_, i) => ({
  text: String(i + 2),
  value: i + 2,
}))
// 取得揪團資料
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

// dialog 狀態
const dialog = ref({
  open: false,
  id: '',
})
// 開啟dialog
const openDialog = async (item) => {
  // 有傳入item代表是編輯揪團
  if (item) {
    console.log(item)
    // 等待dialog打開
    await nextTick()
    dialog.value.id = item._id
    organizer_id.value.value = item.organizer_id._id
    name.value.value = item.name
    description.value.value = item.description
    type.value.value = item.type
    member_limit.value.value = item.member_limit
    contact_method.value.value = item.contact_method
    contact_info.value.value = item.contact_info
    city.value.value = item.city
    await nextTick()

    region.value.value = item.region
    address.value.value = item.address
    date.value.value = new Date(item.time)
    time.value.value = {
      hours: new Date(item.time).getHours(),
      minutes: new Date(item.time).getMinutes(),
    }
    const tagsWithIndex = item.tags.map((tag) => ({ text: tag, value: tag }))
    tagSelectItems.value = tagsWithIndex
    tagSelectCount.value = 5 - item.tags.length

    tabSelect.value = 2
    await nextTick()
    // 等待編輯器初始化完成
    const checkEditor = setInterval(() => {
      if (fileAgentRef.value?.editor) {
        fileAgentRef.value.editor.setHtml(item.content || '')
        clearInterval(checkEditor)
      }
    }, 100)

    // 設定檢查超時
    setTimeout(() => clearInterval(checkEditor), 3000)
    tabSelect.value = 0
  }
  dialog.value.open = true
}

// 關閉dialog
const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
  if (fileAgent.value?.deleteFileRecord) {
    fileAgent.value.deleteFileRecord()
  }
  tagSelectItems.value.length = 0
  tagSelectCount.value = 5
}
// 取得未選擇的標籤
const tagItemsFiltered = computed(() => {
  return tagItems.filter((item) => !tagSelectItems.value.includes(item))
})
// 表單驗證
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
  date: yup.date().required(t('group.dateRequired')),
  time: yup
    .object({
      hours: yup.number().required(),
      minutes: yup.number().required(),
    })
    .required(t('group.timeRequired')),
})
// 表單
const { handleSubmit, isSubmitting, resetForm } = useForm({
  // 表單schema驗證
  validationSchema: schema,
  // 表單初始值
  initialValues: {
    organizer_id: '',
    name: '',
    description: '',
    type: t('group.online'),
    member_limit: '5',
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
// 取得地區選項
const regionItems = computed(() => {
  if (!city.value.value || !area_data[city.value.value]) return []
  return area_data[city.value.value].map((item) => ({
    text: item,
    value: item,
  }))
})
// 刪除揪團
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
// 分頁
const tabs = [
  { id: 1, title: t('tab.group') },
  { id: 2, title: t('tab.tag') },
  { id: 3, title: t('tab.content') },
]
// 增加標籤functuin
const tagSelectItemsPush = (item) => {
  if (item.value.trim() === '') return

  if (tagSelectItems.value.length < 5) {
    tagSelectItems.value.push(item)
    tagSelectCount.value -= 1
    console.log(tagSelectItems.value)
  }
  tagInput.value = ''
}
// 刪除標籤function
const tagSelectItemsSplice = (item) => {
  const index = tagSelectItems.value.findIndex((tag) => tag.value === item.value)
  if (index > -1) {
    tagSelectItems.value.splice(index, 1)
  }
  tagSelectCount.value += 1
}
// 表單送出
const onSubmit = handleSubmit(async (values) => {
  // 取得檔案和編輯器內容
  const editorContent = fileAgentRef.value?.getContent()
  console.log('編輯器內容:', editorContent)

  // 檢查是否有上傳檔案
  if (fileRecords.value[0]?.error) return
  if (dialog.value.id.length === 0 && fileRecords.value.length === 0) {
    createSnackbar({
      text: t('admin.groupImageRequired'),
      snackbarProps: {
        color: 'red',
      },
    })
    return
  }

  try {
    // 建立FormData
    const fd = new FormData()
    // fd.append(key,value)
    // key: 後端接收的key
    // value: 傳送的值

    // organizer_id -> 揪團主辦者
    // name -> 揪團名稱
    // description -> 揪團描述
    // type -> 揪團類型
    // member_limit -> 揪團人數限制
    // contact_method -> 聯絡方式
    // contact_info -> 聯絡資訊
    // city -> 縣市
    // region -> 地區
    // address -> 地址
    // time -> 時間
    fd.append('organizer_id', values.organizer_id)
    fd.append('name', values.name)
    fd.append('description', values.description)
    fd.append('type', values.type)
    fd.append('member_limit', values.member_limit)
    fd.append('contact_method', values.contact_method)
    fd.append('contact_info', values.contact_info)
    if (values.type === t('group.online')) {
      fd.append('city', '')
      fd.append('region', '')
      fd.append('address', '')
    } else {
      fd.append('city', values.city)
      fd.append('region', values.region)
      fd.append('address', values.address)
    }
    fd.append(
      'time',
      dateVuetify.format(values.date, 'keyboardDate') +
        ' ' +
        dateVuetify.format(values.time, 'fullTime24h'),
    )
    console.log(
      dateVuetify.format(values.date, 'keyboardDate'),
      dateVuetify.format(values.time, 'fullTime24h'),
    )

    // 宣告tags為選擇的標籤，並轉換成array
    const tags = tagSelectItems.value.map((tag) => tag.value)
    // 將tags加入到FormData
    // 如果直接傳送後端接收會是字串，[, , ,]
    for (let tag of tags) {
      fd.append('tags[]', tag) //後端接收為array
    }
    // content -> 文字編輯器內容
    fd.append('content', editorContent)

    // 如果有上傳檔案，代表fileRecords值會大於0，就加入到FormData
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }
    // 如果有id代表是編輯揪團，就用patch
    // 沒有id代表是新增揪團，就用post
    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/group/' + dialog.value.id, fd)
    } else {
      await apiAuth.post('/group', fd)
    }

    // 清空揪團資料
    group.splice(0, group.length)
    // 重新取得揪團資料
    getGroups()
    // 顯示成功訊息
    createSnackbar({
      text: t(dialog.value.id.length > 0 ? 'adminGroup.editSuccess' : 'adminGroup.newSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
    // 關閉dialog
    closeDialog()
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
</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminGroups'
</route>
