<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col cols="12" v-for="group of filteredGropus" :key="group._id">
        <group-card v-bind="group"></group-card>
      </v-col>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
  <group-footer></group-footer>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import GroupCard from '@/components/GroupCard.vue'
import GroupFooter from '@/components/GroupFooter.vue'

const { api } = useAxios()

const ITEMS_PER_PAGE = 3
const currentPage = ref(1)
const totalPage = computed(() => Math.ceil(groups.value.length / ITEMS_PER_PAGE))

const groups = ref([])
const search = ref('')
const filteredGropus = computed(() => {
  return (
    groups.value
      .filter((group) => group.name.toLowerCase().includes(search.value.toLowerCase()))
      // 一頁兩筆
      // 第 1 頁: 0, 1
      // 第 2 頁: 2, 3
      // 第 3 頁: 4, 5
      // .slice(開始索引, 結束索引)
      .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
  )
})

const getGroup = async () => {
  const { data } = await api.get('/group')
  groups.value.push(...data.result)
  console.log(groups.value)
}
getGroup()
</script>

<route lang="yaml">
meta:
  title: 'nav.groupList'
</route>
