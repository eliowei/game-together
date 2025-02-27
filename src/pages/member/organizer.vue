<template>
  <v-container max-width="1440">
    <v-row>
      <v-col cols="11" offset-sm="1" offset-md="1" offset-lg="1">
        <h1 class="mb-11">{{ $t('member.organizer') }}</h1>
        <v-col cols="12">
          <v-data-table
            v-model:page="currentPage"
            v-model:items-per-page="itemsPerPage"
            :items="group"
            :headers="headers"
            :search="search"
            :total-items="group.length"
            hide-default-footer
            @update:options="handlePageChange"
          >
            <template #[`item.group_id.address`]="{ value }">
              {{ value ? value : '無' }}
            </template>
            <template #[`item.group_id.time`]="{ value }">
              {{ new Date(value).toLocaleDateString() }}
            </template>
            <template #[`item.edit`]="{ item }">
              <v-btn @click="openDialog(item)">{{ $t('member.groupEdit') }}</v-btn>
            </template>
            <template #[`item.page`]="{ item }">
              <v-btn @click="viewGroup(item)">{{ $t('member.groupView') }}</v-btn>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12" v-if="totalPage > 1">
          <v-pagination
            v-model="currentPage"
            :length="totalPage"
            class="mt-8 mb-8 group__pagination"
          ></v-pagination>
        </v-col>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog.open" max-width="800" persistent>
    <v-form :disable="isSubmitting">
      <v-card class="member__organizer-info">
        <v-card-title
          >{{ $t(dialog.id ? 'adminGroup.edit' : 'adminGroup.new') }}-{{
            tabs[tabSelect].title
          }}</v-card-title
        >
        <v-card-text>
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
                    :items="['Line', 'Discord', 'Facebook']"
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
              <v-container class="member__organizer">
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
                      @click:close="tagSelectItemsSplice(tags)"
                      @click="tagSelectItemsSplice(tags)"
                      prepend-icon="mdi-tag"
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
          <v-divider></v-divider>
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
import { useRouter } from 'vue-router'

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
const router = useRouter()

// 每頁顯示筆數
const itemsPerPage = ref(10)

// 目前頁數
const currentPage = ref(1)

// 總頁數
const totalPage = computed(() => {
  return Math.ceil(group.length / itemsPerPage.value)
})

const handlePageChange = (options) => {
  console.log(options)
  currentPage.value = options.page
  itemsPerPage.value = options.itemsPerPage
}

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
  { title: t('group.name'), key: 'group_id.name', sortable: true },
  { title: t('group.time'), key: 'group_id.time', sortable: true },
  { title: t('group.memberLimit'), key: 'group_id.member_limit', sortable: true },
  { title: t('group.type'), key: 'group_id.type', sortable: true },
  { title: t('group.address'), key: 'group_id.address', sortable: true },
  { title: t('group.contactMethod'), key: 'group_id.contact_method', sortable: true },
  { title: '', key: 'page', sortable: false },
  { title: '', key: 'edit', sortable: false },
  // { title: t('group.image'), key: 'image', sortable: true },
  // { title: t('group.createdAt'), key: 'createdAt', sortable: true },
  // { title: t('group.updatedAt'), key: 'updatedAt', sortable: true },
]
// 揪團類型選項
const typeItems = computed(() => [
  { text: t('group.online'), value: '線上' },
  { text: t('group.offline'), value: '線下' },
])
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
    const { data } = await apiAuth.get('/user/organizerGroup')
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
    dialog.value.id = item.group_id._id
    name.value.value = item.group_id.name
    description.value.value = item.group_id.description
    type.value.value = item.group_id.type
    member_limit.value.value = item.group_id.member_limit
    contact_method.value.value = item.group_id.contact_method
    contact_info.value.value = item.group_id.contact_info
    city.value.value = item.group_id.city
    await nextTick()

    region.value.value = item.group_id.region
    address.value.value = item.group_id.address
    date.value.value = new Date(item.group_id.time)
    time.value.value = {
      hours: new Date(item.group_id.time).getHours(),
      minutes: new Date(item.group_id.time).getMinutes(),
    }
    const tagsWithIndex = item.group_id.tags.map((tag) => ({ text: tag, value: tag }))
    tagSelectItems.value = tagsWithIndex
    tagSelectCount.value = 5 - item.group_id.tags.length

    tabSelect.value = 2
    await nextTick()
    editorContent.value = item.group_id.content
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
const { handleSubmit, isSubmitting, resetForm, errors } = useForm({
  // 表單schema驗證
  validationSchema: schema,
  // 表單初始值
  initialValues: {
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

const viewGroup = async (item) => {
  try {
    console.log(item.group_id)
    await router.push('/group/' + item.group_id._id)
  } catch (error) {
    console.log(error)
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
    console.log(
      `${dateVuetify.format(values.date, 'keyboardDate')} ${String(values.time.hours).padStart(2, '0')}:${String(values.time.minutes).padStart(2, '0')}:00`,
    )

    // 宣告tags為選擇的標籤，並轉換成array
    const tags = tagSelectItems.value.map((tag) => tag.value)
    // 將tags加入到FormData
    // 如果直接傳送後端接收會是字串，[, , ,]
    for (let tag of tags) {
      fd.append('tags[]', tag) //後端接收為array
    }
    console.log(editorContent.value)
    // content -> 文字編輯器內容
    fd.append('content', editorContent.value)

    // 如果有上傳檔案，代表fileRecords值會大於0，就加入到FormData
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }
    // 如果有id代表是編輯揪團，就用patch
    // 沒有id代表是新增揪團，就用post
    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/user/organizerGroup/' + dialog.value.id, fd)
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

<style>
.ql-editor {
  min-height: 150px;
}
</style>

<route lang="yaml">
meta:
  layout: members
  title: 'nav.memberIndex'
  login: true
</route>
