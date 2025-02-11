<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12"
        ><h2 class="text-center mb-2 mt-2">{{ $t('group.createSetp2') }}</h2>
        <v-progress-linear model-value="40" height="10" color="green-accent-4"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <h1 class="text-center">{{ $t('group.groupTag') }}</h1>
    <h2 class="text-center">
      {{ $t('group.groupTagInfo', { variable: tagSelectCount }) }}
    </h2>
    <v-row>
      <v-col cols="6" offset="3">
        <v-text-field
          v-model="tagInput"
          :placeholder="t('group.groupPlaceHolder')"
          @keydown.enter="tagSelectItemsPush({ text: tagInput, value: tagInput })"
        ></v-text-field>
      </v-col>
      <v-col cols="6" offset="3">
        <v-chip
          v-for="tags in tagSelectItems"
          :key="tags"
          class="mr-2 mb-2"
          variant="outlined"
          closable
          link
          @click:close="tagSelectItemsSplice(tags)"
          >{{ tags.text }}</v-chip
        >
      </v-col>
      <v-col cols="6" offset="3">
        <h2>標籤:</h2>
      </v-col>
      <v-col cols="6" offset="3">
        <v-chip
          v-for="tags in tagItemsFiltered"
          :key="tags"
          class="mr-2 mb-2"
          variant="outlined"
          link
          @click="tagSelectItemsPush(tags)"
        >
          {{ tags.text }}
        </v-chip>
        <v-divider class="border-opacity-100 my-12"></v-divider>
      </v-col>
      <v-col offset="3">
        <v-btn width="100" append-icon="mdi-arrow-left" to="/creategroup/setp1">{{
          t('group.previous')
        }}</v-btn>
      </v-col>
      <v-col offset="1">
        <v-btn type="submit" width="100" append-icon="mdi-arrow-right" @click="onSubmit">{{
          t('group.next')
        }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useGroupStore } from '@/stores/group'

const router = useRouter()
const createSnackbar = useSnackbar()
const { t } = useI18n()
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
const group = useGroupStore()
// 增加標籤funciton
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
// 過濾標籤
const tagItemsFiltered = computed(() => {
  return tagItems.filter((item) => !tagSelectItems.value.includes(item))
})

const onSubmit = () => {
  if (tagSelectItems.value.length === 0) {
    createSnackbar({
      text: t('group.tagRequired'),
      snackbarProps: {
        color: 'red',
      },
    })
    return
  }
  const tag = tagSelectItems.value.map((item) => item.value)
  group.setStep2(tag)
  router.push('/creategroup/setp3')
}
</script>

<route lang="yaml">
meta:
  title: 'nav.groupCreate'
  login: true
</route>
