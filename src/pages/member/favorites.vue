<template>
  <v-container>
    <v-row>
      <v-col cols="11" offset="1">
        <h1>{{ $t('member.favorite') }}</h1>
      </v-col>
      <v-col cols="11" offset="1">
        <v-btn @click="handleFilterChange(1)" class="mr-3">將要開始</v-btn>
        <v-btn @click="handleFilterChange(2)">已結束</v-btn>
      </v-col>

      <!-- 依照日期分組顯示區塊 -->
      <template v-if="hasVisibleGroups">
        <template v-for="dateGroup in paginatedGroups" :key="dateGroup.date">
          <v-col cols="8" offset="1">
            <!-- 日期標題 -->
            <div class="text-h6 mb-3">
              {{
                dateGroup.date === new Date().toLocaleDateString()
                  ? '今天'
                  : date.format(dateGroup.date, 'weekday') +
                    ' ' +
                    date.format(dateGroup.date, 'monthAndDate')
              }}
            </div>
            <v-divider class="border-opacity-100 mb-8"></v-divider>
            <div
              v-if="!dateGroup.groups.length && dateGroup.date === new Date().toLocaleDateString()"
              class="text-center"
            >
              今天沒有符合條件的揪團
            </div>
            <!-- 該日期分組的活動列表 -->
            <div v-for="group in dateGroup.groups" :key="group._id">
              <group-card v-bind="group.group_id"></group-card>
            </div>
          </v-col>
        </template>
      </template>

      <v-col v-else cols="12" class="text-center">
        <div class="text-h6 text-grey">沒有符合條件的揪團</div>
      </v-col>

      <v-col cols="12">
        <v-pagination
          v-if="totalGroups > ITEMS_PER_PAGE"
          v-model="currentPage"
          :length="totalPage"
          class="group__pagination"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useDate } from 'vuetify'
import GroupCard from '@/components/GroupCard.vue'

const { apiAuth } = useAxios()

const ITEMS_PER_PAGE = 3
const currentPage = ref(1)
const totalPage = computed(() => Math.ceil(totalGroups.value / ITEMS_PER_PAGE))
const date = useDate()

const groups = ref([])
const isFilterOver = ref(1)

const FilteredGroups = computed(() => {
  // 檢查揪團時間是否過期
  const filteredItems = groups.value.filter((item) => {
    const groupTime = new Date(item.group_id.time)
    const now = new Date()
    switch (isFilterOver.value) {
      case 1:
        return groupTime >= now
      case 2:
        return groupTime < now
      default:
        return true
    }
  })

  // 依日期分組
  const grouped = {}
  // 今天的日期
  const today = new Date().toLocaleDateString()
  grouped[today] = []

  filteredItems.forEach((group) => {
    const dateKey = new Date(group.group_id.time).toLocaleDateString()
    if (!grouped[dateKey]) {
      grouped[dateKey] = []
    }
    grouped[dateKey].push(group)
  })

  // 轉換成陣列格式並排序
  return Object.entries(grouped)
    .map(([date, groups]) => ({
      date,
      groups: groups.sort((a, b) => new Date(a.group_id.time) - new Date(b.group_id.time)),
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
})

// 計算總揪團數
const totalGroups = computed(() => {
  return FilteredGroups.value.reduce((total, group) => total + group.groups.length, 0)
})

// 修改分頁邏輯
const paginatedGroups = computed(() => {
  const allGroups = []
  let currentCount = 0
  const today = new Date().toLocaleDateString()

  // 遍歷所有日期群組
  for (const dateGroup of FilteredGroups.value) {
    const newDateGroup = {
      date: dateGroup.date,
      groups: [],
    }

    // 遍歷該日期的揪團
    for (const group of dateGroup.groups) {
      if (
        currentCount >= (currentPage.value - 1) * ITEMS_PER_PAGE &&
        currentCount < currentPage.value * ITEMS_PER_PAGE
      ) {
        newDateGroup.groups.push(group)
      }
      currentCount++
    }

    // 只加入有揪團的日期群組
    if (
      newDateGroup.groups.length > 0 ||
      (dateGroup.date === today && currentPage.value === 1 && isFilterOver.value === 1)
    ) {
      allGroups.push(newDateGroup)
    }
  }

  return allGroups
})
// 新增切換過濾時重置頁碼
const handleFilterChange = (value) => {
  isFilterOver.value = value
  currentPage.value = 1 // 重置頁碼
}

const hasVisibleGroups = computed(() => {
  return paginatedGroups.value.some(
    (dateGroup) =>
      dateGroup.groups.length > 0 ||
      (dateGroup.date === new Date().toLocaleDateString() && isFilterOver.value === 1),
  )
})

const getGroup = async () => {
  const { data } = await apiAuth.get('/user/favoriteGroup')
  groups.value.push(...data.result)
  console.log(groups.value)
}
getGroup()
</script>

<route lang="yaml">
meta:
  layout: members
  title: 'nav.memberIndex'
  login: true
</route>
