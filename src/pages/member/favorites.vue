<template>
  <v-container>
    <v-row>
      <v-col cols="11" offset="1">
        <h1>{{ $t('member.favorite') }}</h1>
      </v-col>
      <v-col cols="11" offset="1">
        <v-btn @click="isFilterOver = 1" class="mr-3">將要開始</v-btn>
        <v-btn @click="isFilterOver = 2">已結束</v-btn>
      </v-col>

      <!-- 依照日期分組顯示區塊 -->
      <template v-if="getFilteredGroups.length">
        <template v-for="dateGroup in getFilteredGroups" :key="dateGroup.date">
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
            <div
              v-if="!dateGroup.groups.length && dateGroup.date === new Date().toLocaleDateString()"
              class="text-center"
            >
              今天沒有符合條件的揪團
            </div>
            <!-- 該日期分組的活動列表 -->
            <div v-for="group in dateGroup.groups" :key="group._id">
              <group-card v-bind="group.group_id" class="mb-3"></group-card>
            </div>
          </v-col>
        </template>
      </template>

      <v-col v-else cols="12" class="text-center">
        <div class="text-h6 text-grey">沒有收藏的揪團</div>
      </v-col>

      <v-col cols="12">
        <v-pagination
          v-model="currentPage"
          :length="totalPage"
          class="custom-pagination"
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
const totalPage = computed(() => Math.ceil(getFilteredGroups.value.length / ITEMS_PER_PAGE))
const date = useDate()

const groups = ref([])
const isFilterOver = ref(1)

const getFilteredGroups = computed(() => {
  const grouped = {}
  const today = new Date().toLocaleDateString()
  grouped[today] = []

  groups.value.forEach((group) => {
    const dateKey = new Date(group.group_id.time).toLocaleDateString()
    if (!grouped[dateKey]) {
      grouped[dateKey] = []
    }
    grouped[dateKey].push(group)
  })

  const groupedArray = Object.entries(grouped)
    .map(([date, groups]) => ({
      date,
      groups: groups.sort((a, b) => new Date(a.group_id.time) - new Date(b.group_id.time)),
    }))
    .filter((group) => {
      const groupDate = new Date(group.date)
      const todayDate = new Date(today)

      switch (isFilterOver.value) {
        case 1:
          return groupDate >= todayDate
        case 2:
          return groupDate < todayDate
        default:
          return true
      }
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  console.log(groupedArray.length)

  return groupedArray.slice(
    (currentPage.value - 1) * ITEMS_PER_PAGE,
    currentPage.value * ITEMS_PER_PAGE,
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
