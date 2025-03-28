<template>
  <v-container class="admin__group" max-width="1440">
    <v-row>
      <v-col cols="11" offset="0" offset-sm="0" offset-md="0" offset-lg="0" offset-xl="1">
        <h1 class="text-center mb-5">{{ $t('nav.adminGroups') }}</h1>

        <v-col cols="12">
          <v-row class="mb-5">
            <v-col cols="3" align-self="center">
              <v-btn @click="openDialog(null)">{{ $t('admin.groupNew') }}</v-btn>
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
              <v-btn @click="openDeleteDialog(item)">{{ $t('admin.groupDelete') }}</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog.open" max-width="800" persistent>
    <v-form :disable="isSubmitting">
      <v-card class="admin__group-form">
        <v-card-title
          >{{ $t(dialog.id ? 'adminGroup.edit' : 'adminGroup.new') }}-{{
            tabs[tabSelect].title
          }}</v-card-title
        >
        <v-card-text class="pb-0">
          <v-tabs
            v-model="tabSelect"
            align-tabs="star"
            color="orange"
            style="border-bottom: 1px solid #eeeeee"
          >
            <v-tab v-for="tab in tabs" :key="tab.id">{{ tab.title }}</v-tab>
          </v-tabs>
          <v-tabs-window v-model="tabSelect" class="my-8">
            <v-tabs-window-item :value="0">
              <v-container>
                <div class="d-flex">
                  <span class="mt-3 mr-9">{{ $t('group.organizerName') }}</span>
                  <v-select
                    v-model="organizer_id.value.value"
                    :items="organizerNameItems"
                    :error-messages="organizer_id.errorMessage.value"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    max-width="600"
                  ></v-select>
                </div>

                <div class="d-flex">
                  <span class="mt-3 mr-5">{{ $t('group.name') }}</span>
                  <v-text-field
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    minLength="1"
                    variant="outlined"
                    max-width="600"
                  ></v-text-field>
                </div>

                <div class="d-flex">
                  <span class="mt-3 mr-5">{{ $t('group.description') }}</span>
                  <v-text-field
                    v-model="description.value.value"
                    :error-messages="description.errorMessage.value"
                    minLength="1"
                    variant="outlined"
                    max-width="600"
                  ></v-text-field>
                </div>

                <div class="d-flex">
                  <span class="mt-3 mr-5">{{ $t('group.createdType') }}</span>
                  <v-select
                    v-model="type.value.value"
                    :items="typeItems"
                    :error-messages="type.errorMessage.value"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    class="mr-5"
                    max-width="100"
                  ></v-select>

                  <span class="mt-3 mr-5">{{ $t('group.memberLimit') }}</span>
                  <v-select
                    v-model="member_limit.value.value"
                    :items="memberLimitItems"
                    :error-messages="member_limit.errorMessage.value"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    max-width="100"
                  ></v-select>
                </div>

                <div class="d-flex">
                  <span class="mt-3 mr-5">{{ $t('group.contactInfo') }}</span>
                  <v-select
                    v-model="contact_method.value.value"
                    :items="['Line', 'Discord', 'Facebook', '其他']"
                    :error-messages="contact_method.errorMessage.value"
                    variant="outlined"
                    max-width="150"
                    class="mr-5"
                  ></v-select>
                  <v-text-field
                    v-model="contact_info.value.value"
                    :error-messages="contact_info.errorMessage.value"
                    variant="outlined"
                    max-width="430"
                  ></v-text-field>
                </div>

                <div class="d-flex" v-if="type.value.value === typeItems[1].value">
                  <span class="mt-3 mr-5">{{ $t('group.createdRegion') }}</span>
                  <v-select
                    v-model="city.value.value"
                    :error-messages="city.errorMessage.value"
                    :items="cityItems"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    max-width="150"
                    class="mr-5"
                  ></v-select>
                  <v-select
                    v-model="region.value.value"
                    :error-messages="region.errorMessage.value"
                    :items="regionItems"
                    item-title="text"
                    item-value="value"
                    variant="outlined"
                    max-width="150"
                    class="mr-5"
                  ></v-select>
                </div>

                <div class="d-flex" v-if="type.value.value === typeItems[1].value">
                  <span class="mt-3 mr-5">{{ $t('group.address') }}</span>
                  <v-text-field
                    v-model="address.value.value"
                    :error-messages="address.errorMessage.value"
                    variant="outlined"
                    max-width="600"
                  ></v-text-field>
                </div>

                <div class="d-flex align-center">
                  <span class="mr-5">{{ $t('group.date') }}</span>
                  <VueDatePicker
                    v-model="date.value.value"
                    auto-apply
                    :enable-time-picker="false"
                    :format-locale="zhTW"
                    hide-input-icon
                    :format="format"
                    :min-date="new Date()"
                    style="max-width: 300px"
                    class="mr-5"
                  ></VueDatePicker>
                  <span class="mr-5">{{ $t('group.time') }}</span>
                  <VueDatePicker
                    v-model="time.value.value"
                    time-picker
                    hide-input-icon
                    :select-text="$t('group.selectSure')"
                    :cancel-text="$t('group.selectCancel')"
                    :format="formatTime"
                    :error-messages="time.errorMessage.value"
                    style="max-width: 140px"
                  ></VueDatePicker>
                </div>
              </v-container>
            </v-tabs-window-item>

            <v-tabs-window-item :value="1">
              <v-container class="admin__group-form">
                <h1 class="text-center">{{ $t('admin.groupTag') }}</h1>
                <h2 class="text-center mb-6">
                  {{ $t('admin.groupTagInfo', { variable: tagSelectCount }) }}
                </h2>
                <v-row>
                  <v-col cols="11">
                    <v-text-field
                      v-model="tagInput"
                      :placeholder="t('admin.groupPlaceHolder')"
                      @keydown.enter="tagSelectItemsPush({ text: tagInput, value: tagInput })"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-chip
                      v-for="tags in tagSelectItems"
                      :key="tags"
                      class="mr-2 mb-2 pt-1"
                      variant="outlined"
                      closable
                      link
                      prepend-icon="mdi-tag"
                      @click="tagSelectItemsSplice(tags)"
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
                      class="mr-2 mb-2 pt-1"
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
                <quill-editor
                  theme="snow"
                  v-model:content="editorContent"
                  :toolbar="editorOptions.modules.toolbar"
                  :options="editorOptions"
                  contentType="html"
                  class="mb-3"
                />
                <span class="text-h6 font-weight-bold">圖片:</span>
                <div style="max-width: 200px">
                  <VueFileAgent
                    v-model="fileRecords"
                    v-model:raw-model-value="rawFileRecords"
                    accept="image/jpeg,image/png"
                    deletable
                    max-size="1MB"
                    :help-text="$t('fileAgent.helpText')"
                    :error-text="{
                      type: $t('fileAgent.errorType'),
                      size: $t('fileAgent.errorSize'),
                    }"
                    ref="fileAgent"
                  ></VueFileAgent>
                </div>
              </v-container>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
        <v-card-actions class="mb-3">
          <v-btn @click="closeDialog">{{ $t('adminGroup.cancel') }}</v-btn>
          <v-btn type="button" :loading="isSubmitting" @click="onSubmit">{{
            $t('adminGroup.submit')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
  <v-dialog v-model="deleteDialog.open" max-width="350">
    <v-card>
      <v-card-text>確定要刪除揪團嗎?</v-card-text>
      <v-card-actions>
        <v-btn @click="deleteDialogAction('cancel')">取消</v-btn>
        <v-btn @click="deleteDialogAction('confirm')">確定</v-btn>
      </v-card-actions>
    </v-card>
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
import { useDate } from 'vuetify'
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter'

const { apiAuth } = useAxios()
const { t } = useI18n()
const { area_data } = useAreaData()
const createSnackbar = useSnackbar()
const group = reactive([])
const search = ref('')
const format = "yyyy'-'MM'-'dd'"
const formatTime = "HH':'mm'"
const dateVuetify = useDate()
const fileRecords = ref([])
const rawFileRecords = ref([])
const fileAgent = ref(null)
const organizer = reactive([])

const editorContent = ref('')
const editorOptions = {
  modules: {
    toolbar: [
      // 粗體 斜體 底線 刪除線 -----['bold', 'italic', 'underline', 'strike']
      ['bold', 'italic', 'underline', 'strike'],
      // 引用  程式碼-----['blockquote', 'code-block']
      ['blockquote', 'code-block'],
      // 1、2 級標題-----[{ header: 1 }, { header: 2 }]
      [{ header: 1 }, { header: 2 }],
      // 有序、無序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
      [{ list: 'ordered' }, { list: 'bullet' }],
      // 上標/下標-----[{ script: 'sub' }, { script: 'super' }]
      [{ script: 'sub' }, { script: 'super' }],
      // 縮排-----[{ indent: '-1' }, { indent: '+1' }]
      [{ indent: '-1' }, { indent: '+1' }],
      // 文本方向-----[{'direction': 'rtl'}]
      [{ direction: 'rtl' }],
      // 字體大小-----[{ size: ['small', false, 'large', 'huge'] }]
      [{ size: ['small', false, 'large', 'huge'] }],
      // 標題-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // 字體顏色、字體背景顏色-----[{ color: [] }, { background: [] }]
      [{ color: [] }, { background: [] }],
      // 字體種類-----[{ font: [] }]
      [{ font: [] }],
      // 對齊方式-----[{ align: [] }]
      [{ align: [] }],
      // 清除文本格式-----['clean']
      ['clean'],
      // 連結、圖片、視頻-----['link', 'image', 'video']
      ['link'],
      // ['table'] // 表格
    ],
    BlotFormatter,
  },
  placeholder: '請輸入內容...',
}
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

// 分頁 dialog 狀態
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
    deleteGroup(deleteDialog.value.data)
    deleteDialog.value.open = false
  }
}

// 開啟dialog
const openDialog = async (item) => {
  // 有傳入item代表是編輯揪團
  if (item) {
    // console.log(item)
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
    editorContent.value = item.content
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
  editorContent.value = ''
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
    .oneOf(['Line', 'Discord', 'Facebook', '其他'], t('group.contactMethodRequired')),
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
const { handleSubmit, isSubmitting, resetForm, errors } = useForm({
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

watch(
  errors,
  (newErrors) => {
    if (Object.keys(newErrors).length > 0) {
      tabSelect.value = 0
    }
  },
  {
    deep: true,
  },
)

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
  // console.log(item)
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
    // console.log(tagSelectItems.value)
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
  // 檢查是否有上傳檔案
  if (fileRecords.value[0]?.error) return
  if (tagSelectItems.value.length === 0) {
    tabSelect.value = 1
    await nextTick()

    createSnackbar({
      text: t('admin.groupTagRequired'),
      snackbarProps: {
        color: 'red',
      },
    })
    return
  } else if (dialog.value.id.length === 0 && fileRecords.value.length === 0) {
    tabSelect.value = 2
    await nextTick()

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
      `${dateVuetify.format(values.date, 'keyboardDate')} ${String(values.time.hours).padStart(2, '0')}:${String(values.time.minutes).padStart(2, '0')}:00`,
    )
    // console.log(
    //   `${dateVuetify.format(values.date, 'keyboardDate')} ${String(values.time.hours).padStart(2, '0')}:${String(values.time.minutes).padStart(2, '0')}:00`,
    // )

    // 宣告tags為選擇的標籤，並轉換成array
    const tags = tagSelectItems.value.map((tag) => tag.value)
    // 將tags加入到FormData
    // 如果直接傳送後端接收會是字串，[, , ,]
    for (let tag of tags) {
      fd.append('tags[]', tag) //後端接收為array
    }
    // console.log(editorContent.value)
    // content -> 文字編輯器內容
    fd.append('content', editorContent.value)

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
