<template>
  <v-container style="min-height: 100vh" class="mt-13">
    <v-row>
      <v-col cols="2" offset="3">
        <v-text-field
          append-inner-icon="mdi-plus-circle"
          variant="solo"
          placeholder="選擇"
          class="custom-search-input click-input"
          persistent-placeholder
          prefix="地區"
          readonly
          @click="clickDialog(1)"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          append-inner-icon="mdi-plus-circle"
          variant="solo"
          placeholder="選擇"
          class="custom-search-input click-input"
          persistent-placeholder
          prefix="標籤"
          readonly
          @click="clickDialog(2)"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-menu v-model="datePickerOpen" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-bind="props"
              append-inner-icon="mdi-plus-circle"
              variant="solo"
              placeholder="選擇"
              class="custom-search-input click-input"
              persistent-placeholder
              prefix="日期"
              readonly
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="selectDate"
            show-adjacent-months
            @update:model-value="handleDateSelect"
            landscape
            hide-header
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="5" offset="3">
        <v-text-field
          v-model="search"
          variant="solo"
          placeholder="縣市區、遊戲類型等"
          class="custom-search-input"
          persistent-placeholder
          prefix="關鍵字"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn
          :height="50"
          style="font-size: 18px; border-radius: 8px"
          class="custom-search-button"
          base-color="orange"
          @click="searchClick"
          block
          prepend-icon="mdi-magnify"
          >搜尋</v-btn
        >
      </v-col>
      <v-col cols="6" offset="3" class="d-flex justify-space-between align-center">
        <span style="font-size: 20px">{{ searchResult }} 搜尋結果</span>
        <div class="d-flex align-center">
          <span class="font-weight-bold">排序:</span>
          <v-select
            :items="groupOrderItems"
            item-title="title"
            item-value="value"
            v-model="groupOrder"
            variant="solo"
            flat
            class="custom-order-select"
          ></v-select>
        </div>
      </v-col>

      <v-col cols="6" offset="3" v-for="group of filteredGroups" :key="group._id">
        <group-card v-bind="group"></group-card>
      </v-col>
      <v-col cols="6" offset="3" v-if="filteredGroups.length === 0">
        <v-card height="200" style="box-shadow: none">
          <v-card-text width="576" class="d-flex justify-center align-center flex-column h-100">
            <p class="font-weight-bold text-h5">未找到符合條件的搜尋</p>
            <p class="font-weight-bold text-h5">請更改您的搜尋條件並重新搜尋</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-pagination
          v-model="currentPage"
          :length="totalPage"
          @update:model-value="changePage"
          class="mt-8 mb-8"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
  <group-footer></group-footer>

  <v-dialog v-model="dialog.open" width="1000" scrollable eager>
    <v-card v-show="dialog.type === 1">
      <v-card-title class="d-flex mb-0 pb-0">
        <div class="d-flex w-100 justify-center align-center">
          <span class="font-weight-bold" style="font-size: 20px">按縣市搜尋</span>
        </div>
        <v-btn icon="mdi-close" variant="text" @click="closedDialog"></v-btn>
      </v-card-title>
      <v-divider class="mt-3"></v-divider>

      <v-card-text class="d-flex flex-column align-center pt-0 mb-2 font-weight-bold">
        <template v-for="([city, districts], index) of Object.entries(area_data)" :key="city">
          <div class="d-flex" style="width: 850px">
            <span class="mt-3 mr-3" style="font-size: 18px">{{
              cityItems.find((item) => item.value === city)?.text || city
            }}</span>
            <div class="d-flex flex-wrap custom-input" style="width: 750px">
              <template v-for="district of districts" :key="`${city}-${district}`">
                <v-hover v-slot:default="{ isHovering, props }">
                  <v-checkbox
                    v-bind="props"
                    v-model="selectRegion"
                    :label="district"
                    :value="{ city, district }"
                    hide-details
                    density="compact"
                    :false-icon="
                      isHovering ? ' mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'
                    "
                    true-icon="mdi-checkbox-marked"
                    color="orange"
                  ></v-checkbox>
                </v-hover>
              </template>
            </div>
          </div>
          <v-divider
            v-if="index !== Object.entries(area_data).length - 1"
            style="width: 850px"
          ></v-divider>
        </template>
      </v-card-text>
      <v-card-actions class="bg-orange pa-0">
        <v-btn
          @click="searchClick"
          class="w-100 font-weight-bold"
          style="height: 54px"
          color="white"
          >搜尋</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-card v-show="dialog.type === 2" width="1000">
      <v-card-title class="d-flex mb-0 pb-0">
        <div class="d-flex w-100 justify-center align-center">
          <span class="font-weight-bold" style="font-size: 20px">按標籤搜尋</span>
        </div>
        <v-btn icon="mdi-close" variant="text" @click="dialog.open = false"></v-btn>
      </v-card-title>
      <v-divider class="mt-3"></v-divider>

      <v-card-text class="d-flex flex-column align-center pt-0 mb-2 font-weight-bold">
        <div class="d-flex flex-wrap" style="width: 750px">
          <template v-for="(item, index) of tagItems" :key="index">
            <div style="width: 170px; height: 30px">
              <v-hover v-slot:default="{ isHovering, props }">
                <v-checkbox
                  v-bind="props"
                  v-model="selectTag"
                  :label="item.text"
                  :value="item.value"
                  hide-details
                  density="compact"
                  :false-icon="isHovering ? ' mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'"
                  true-icon="mdi-checkbox-marked"
                  color="orange"
                ></v-checkbox>
              </v-hover>
            </div>
          </template>
        </div>
      </v-card-text>
      <v-card-actions class="bg-orange pa-0">
        <v-btn
          @click="searchClick"
          class="w-100 font-weight-bold"
          style="height: 54px"
          color="white"
          >搜尋</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.custom-search-input .v-input__details {
  display: none;
}

.custom-search-input > .v-input__control > .v-field,
.custom-search-input > .v-input__control > .v-field > .v-field__field > .v-field__input {
  border-radius: 8px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
}

.custom-search-input > .v-input__control > .v-field {
  outline: 3px solid #eeeeee;
}

.click-input > .v-input__control > .v-field {
  .v-field__field {
    .v-field__input,
    .v-text-field__prefix {
      cursor: pointer;
    }
  }

  .v-field__append-inner {
    cursor: pointer;
  }
}
/* icon */
.custom-search-input > .v-input__control > .v-field > .v-field__append-inner {
  font-size: 20px;
}
/* prefix */
.v-text-field__prefix {
  font-size: 12px;
  font-weight: bold;
  color: orange;
}

.v-pagination__prev {
  background: white;
  color: black;
}

.v-pagination__next {
  background: white;
  color: black;
}

.v-pagination__item {
  background: white;
  color: black;
}

.v-pagination__prev,
.v-pagination__next,
.v-pagination__item {
  border-radius: 4px;
  box-shadow:
    0 1px 1px rgba(170, 164, 164, 0.8),
    0 2px 2px rgba(170, 164, 164, 0.76),
    0 1px 5px rgba(170, 164, 164, 0.88);
}

.v-pagination__item--is-active {
  background: black;
  color: white;
  border-radius: 4px;
  box-shadow:
    0 5px 5px rgba(170, 164, 164, 0.8),
    0 9px 10px rgba(170, 164, 164, 0.76),
    0 5px 14px rgba(170, 164, 164, 0.88);
  transition: 0.7s;
}

.custom-order-select .v-select__selection-text {
  font-size: 15px;
}

.custom-order-select .v-input__details {
  display: none;
}
.custom-order-select .v-field__input {
  padding: 0;
  padding-left: 4px;
}
</style>

<script setup>
import { useAxios } from '@/composables/axios'
import GroupCard from '@/components/GroupCard.vue'
import GroupFooter from '@/components/GroupFooter.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAreaData } from '@/composables/areaData'
import { useI18n } from 'vue-i18n'

const { api } = useAxios()
const route = useRoute()
const router = useRouter()
const { area_data } = useAreaData()
const { t } = useI18n()

const ITEMS_PER_PAGE = 3
const currentPage = ref(1)
const totalPage = computed(() => {
  const activeGroups = groups.value.filter((group) => {
    const now = new Date()
    const groupDate = new Date(group.time)
    return groupDate > now
  })
  return Math.ceil(activeGroups.length / ITEMS_PER_PAGE)
})
const changePage = () => {
  router.replace({
    path: route.path,
    query: {
      page: currentPage.value,
    },
  })
}

const groupOrder = ref(0)
const groups = ref([])
const search = ref('')
const searchResult = ref('')
const groupOrderItems = computed(() => [
  {
    title: '揪團時間: 由近到遠',
    value: 0,
  },
  {
    title: '揪團時間: 由遠到近',
    value: 1,
  },
  {
    title: '建立時間: 由舊到新',
    value: 2,
  },
  {
    title: '建立時間: 由新到舊',
    value: 3,
  },
  {
    title: '人數上限: 由少到多',
    value: 4,
  },
  {
    title: '人數上限: 由多到少',
    value: 5,
  },
  {
    title: '參加人數: 由少到多',
    value: 6,
  },
  {
    title: '參加人數: 由多到少',
    value: 7,
  },
])

const sortFunction = {
  0: (a, b) => new Date(a.time) - new Date(b.time), // 揪團時間: 由近到遠
  1: (a, b) => new Date(b.time) - new Date(a.time), // 揪團時間: 由遠到近
  2: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), // 建立時間: 由舊到新
  3: (a, b) => new Date(b.createdAt) - new Date(a.createdAt), // 建立時間: 由新到舊
  4: (a, b) => a.member_limit - b.member_limit, // 人數上限: 由少到多
  5: (a, b) => b.member_limit - a.member_limit, // 人數上限: 由多到少
  6: (a, b) => a.member_count - b.member_count, // 參加人數: 由少到多
  7: (a, b) => b.member_count - a.member_count, // 參加人數: 由多到少
}

const filteredGroups = computed(() => {
  const activeGroups = groups.value
    .filter((group) => {
      const now = new Date()
      const groupDate = new Date(group.time)
      return groupDate > now
    })
    .sort(sortFunction[groupOrder.value])

  return activeGroups.slice(
    (currentPage.value - 1) * ITEMS_PER_PAGE,
    currentPage.value * ITEMS_PER_PAGE,
  )
})

const getGroup = async () => {
  try {
    console.log(route.query)
    const { data } = await api.post('/group/search', {
      search: route.query.search ? JSON.parse(decodeURIComponent(route.query.search)) : undefined,
      city: route.query.city ? JSON.parse(decodeURIComponent(route.query.city)) : undefined,
      region: route.query.region ? JSON.parse(decodeURIComponent(route.query.region)) : undefined,
      tags: route.query.tags ? JSON.parse(decodeURIComponent(route.query.tags)) : undefined,
      time: route.query.time || undefined,
    })
    groups.value = data.result

    router.replace({
      path: route.path,
      query: {
        page: currentPage.value,
      },
    })

    console.log(groups.value)
  } catch (error) {
    console.log(error)
    groups.value = [] // 錯誤時清空資料
  }
}
getGroup()

const searchClick = async () => {
  try {
    const city = selectRegion.value.map((item) => t('area.' + item.city) + item.district)
    const date = selectDate.value ? new Date(selectDate.value).toLocaleDateString() : undefined
    console.log(search.value.length)
    searchResult.value = search.value

    const { data } = await api.post('/group/search', {
      search: search.value ? search.value : undefined,
      city: city.length ? city.join(',') : undefined,
      region: city.length ? city.join(',') : undefined,
      tags: selectTag.value.length ? selectTag.value : undefined,
      time: date,
    })
    console.log(data)
    groups.value = data.result

    router.replace({
      path: route.path,
      query: {
        page: currentPage.value,
      },
    })
    closedDialog()
  } catch (error) {
    console.log(error)
  }
}

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

const dialog = ref({
  open: false,
  type: 1,
})
const clickDialog = async (type) => {
  dialog.value.type = type
  dialog.value.open = true
}

const closedDialog = () => {
  dialog.value.open = false
  selectRegion.value = []
  selectTag.value = []
}

const selectRegion = ref([])
const selectTag = ref([])
const datePickerOpen = ref(false)
const selectDate = ref(null)

const handleDateSelect = (date) => {
  try {
    if (!date) return

    selectDate.value = date
    datePickerOpen.value = false

    const displayDate = new Date(date).toLocaleDateString()
    console.log(displayDate)
    searchClick()
    selectDate.value = null
  } catch (error) {
    console.log('日期格式錯誤:', error)
  }
}
</script>

<route lang="yaml">
meta:
  title: 'nav.groupList'
</route>
