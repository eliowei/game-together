<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-sheet :width="800" :height="800">
        <FullCalendar :options="calendarOptions" @eventClick="handleEventClick" />
      </v-sheet>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
const { apiAuth } = useAxios()
import { useRouter } from 'vue-router'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import zhLocale from '@fullcalendar/core/locales/zh-tw'

const events = ref([])
const router = useRouter()

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  locale: zhLocale,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek',
  },
  events: events.value,
  eventColor: events.value.color,
  eventClick: (info) => {
    handleEventClick(info.event)
  },
}

const handleEventClick = (event) => {
  // console.log('點擊事件:', event)
  router.push('/group/' + event.id)
}

const getGroup = async () => {
  try {
    const [{ data: organizerData }, { data: joinData }] = await Promise.all([
      apiAuth.get('/user/organizerGroup'),
      apiAuth.get('/user/joinGroup'),
    ])
    console.log(organizerData, joinData)
    const organizerGroup = organizerData.result.map((item) => ({
      id: item.group_id._id,
      title: item.group_id.name,
      date: formatDate(item.group_id.time),
      color: '#EA0000',
    }))

    const joinGroup = joinData.result.map((item) => ({
      id: item.group_id._id,
      title: item.group_id.name,
      date: formatDate(item.group_id.time),
      color: '',
    }))
    events.value.push(...organizerGroup, ...joinGroup)
    console.log(events.value)
  } catch (error) {
    console.log(error)
  }
}
getGroup()

const formatDate = (data) => {
  const d = new Date(data)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<route lang="yaml">
meta:
  layout: members
  title: 'nav.memberIndex'
  login: true
</route>
