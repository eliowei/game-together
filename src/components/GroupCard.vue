<template>
  <v-card class="d-flex" :to="'/group/' + _id" style="box-shadow: none">
    <v-img :src="image" height="200" max-width="200" cover>
      <div class="d-flex flex-column align-start">
        <v-chip
          v-for="tag of tags"
          class="mb-1 mt-1"
          style="background-color: #ffce7e; font-size: 14px"
          >{{ tag }}</v-chip
        >
      </div>
    </v-img>
    <div class="card-content">
      <v-card-title>
        {{ name }}
      </v-card-title>
      <v-card-text>
        {{ description }}
        <div class="chip-list d-flex mt-2 mb-2">
          <v-chip class="mr-2" variant="outlined" color="orange">{{ type }}</v-chip>
          <v-chip v-if="type === '線下'" class="mr-2" variant="outlined" color="orange">{{
            t('area.' + city) + region
          }}</v-chip>
          <v-chip prepend-icon="mdi-clock-time-four-outline" variant="outlined" color="orange">{{
            time
          }}</v-chip>
        </div>
        <div class="d-flex mb-1">
          <template v-for="number in groupMembers">
            <div class="d-flex flex-column mr-5">
              <v-avatar>
                <v-img :src="number.user_id.image" />
              </v-avatar>
            </div>
          </template>
        </div>
        <p class="mt-2">{{ member_count }}位已參加揪團 剩餘{{ member_limit - member_count }}空位</p>
      </v-card-text>
    </div>
    <div class="card-end mt-2">
      <v-chip v-if="organizer_id._id === user.id" class="bg-deep-orange-accent-3"> 主辦人 </v-chip>
    </div>
  </v-card>
  <v-divider></v-divider>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
  content: {
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
  contact_method: {
    type: String,
    default: '',
  },
  contact_info: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  region: {
    type: String,
    default: '',
  },
  address: {
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
  createdAt: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: String,
    default: '',
  },
  comments: {
    type: Array,
    default: () => [],
  },
})
</script>
