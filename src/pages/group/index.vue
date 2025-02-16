<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col cols="12" v-for="group of filteredGroups" :key="group._id">
        <group-card v-bind="group"></group-card>
      </v-col>
      <v-col cols="12" v-if="filteredGroups.length === 0">
        <h3>查無符合資料</h3>
      </v-col>
      <v-col cols="12">
        <v-pagination
          v-model="currentPage"
          :length="totalPage"
          @update:model-value="changePage"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
  <group-footer></group-footer>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import GroupCard from '@/components/GroupCard.vue'
import GroupFooter from '@/components/GroupFooter.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const { api } = useAxios()
const route = useRoute()
const router = useRouter()

const ITEMS_PER_PAGE = 3
const currentPage = ref(1)
const totalPage = computed(() => {
  const activeGroups = groups.value.filter((group) => {
    const now = new Date()
    const groupDate = new Date(group.time)
    return groupDate > now
  })
  const searchedGroups = activeGroups.filter((group) => {
    return group.name.toLowerCase().includes(search.value.toLowerCase())
  })
  return Math.ceil(searchedGroups.length / ITEMS_PER_PAGE)
})
const changePage = () => {
  router.replace({
    path: route.path,
    query: {
      page: currentPage.value,
    },
  })
}

const groups = ref([])
const search = ref('')
const filteredGroups = computed(() => {
  const activeGroups = groups.value.filter((group) => {
    const now = new Date()
    const groupDate = new Date(group.time)
    return groupDate > now
  })

  const searchedGroups = activeGroups
    .filter((group) => {
      return group.name.toLowerCase().includes(search.value.toLowerCase())
    })
    .sort((a, b) => {
      return new Date(a.time) - new Date(b.time)
    })

  return searchedGroups.slice(
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
    console.log()
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
</script>

<route lang="yaml">
meta:
  title: 'nav.groupList'
</route>
