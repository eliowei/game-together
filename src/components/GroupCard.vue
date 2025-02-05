<template>
  <v-card class="d-flex" :to="'/group/' + _id">
    <v-img :src="image" height="200" max-width="200" cover>
      <div class="d-flex flex-column align-start">
        <v-chip v-for="tag of tags" class="mb-1 mt-1" variant="outlined" color="orange">{{
          tag
        }}</v-chip>
      </div>
    </v-img>
    <div class="card-content">
      <v-card-title>
        {{ name }}
      </v-card-title>
      <v-card-text>
        {{ description }}
        <div class="chip-list d-flex mt-2 mb-2">
          <v-chip class="mr-2">{{ type }}</v-chip>
          <v-chip v-if="type === '線下'" class="mr-2">{{ city + region }}</v-chip>
          <v-chip prepend-icon="mdi-clock-time-four-outline">{{ time }}</v-chip>
        </div>
        <div class="d-flex flex-column mr-3 mb-2">
          <template v-for="number in groupMembers">
            <v-avatar>
              <v-img :src="number.user_id.image" />
            </v-avatar>
          </template>
        </div>
        <p>{{ member_count }}位已參加揪團 剩餘{{ member_limit }}空位</p>
      </v-card-text>
    </div>
    <div class="card-end mt-2">
      <v-chip v-if="organizer_id._id === user.id"> 主辦人 </v-chip>
    </div>
  </v-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const user = useUserStore()
defineProps({
  _id: {
    type: String,
    default: '',
  },
  organizer_id: {
    type: Object,
    default: () => ({}),
  },
  name: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  member_count: {
    type: Number,
    default: 0,
  },
  member_limit: {
    type: Number,
    default: 0,
  },
  city: {
    type: String,
    default: '',
  },
  region: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '',
  },
  tags: {
    type: Array,
    default: () => [],
  },
  groupMembers: {
    type: Array,
    default: () => [],
  },
})
</script>
