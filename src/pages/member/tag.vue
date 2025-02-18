<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ $t('member.tagSetting') }}</h1>
      </v-col>
      <v-col cols="12" offset="2">
        <span class="text-h6">
          {{ $t('member.TagInfo', { variable: tagSelectCount }) }}
        </span>
      </v-col>
      <v-col cols="3" offset="2" class="d-flex align-center">
        <v-text-field
          :disabled="!tagEditState"
          v-model="tagInput"
          :placeholder="tagEditState ? t('member.tagPlaceHolder') : ''"
          @keydown.enter="tagSelectItemsPush({ text: tagInput, value: tagInput })"
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <v-btn v-if="tagEditState" @click="tagSelectItemsPush({ text: tagInput, value: tagInput })"
          >新增</v-btn
        >
        <button v-if="!tagEditState" @click="openTagEdit">
          <v-icon icon="mdi-pencil-outline" size="large"></v-icon>
          {{ t('member.tagEdit') }}
        </button>
      </v-col>
      <v-col cols="12" offset="2">
        <v-chip
          v-for="tags in tagSelectItems"
          :key="tags"
          class="mr-2 mb-2"
          variant="outlined"
          :closable="tagEditState"
          :link="tagEditState"
          @click:close="tagSelectItemsSplice(tags)"
          >{{ tags.text }}
        </v-chip>
        <v-form @submit.prevent="onSubmit">
          <div class="d-flex mt-3 mb-3">
            <v-btn v-if="tagEditState" class="mr-3" type="submit">{{
              $t('member.submitEdit')
            }}</v-btn>
            <v-btn v-if="tagEditState" @click="closedTagEdit">{{ $t('member.cancelEdit') }}</v-btn>
          </div>
        </v-form>

        <h2 v-if="tagEditState">標籤:</h2>
      </v-col>
      <v-col v-if="tagEditState" cols="5" offset="2">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const user = ref([])
const userData = useUserStore()

const tagSelectCount = ref(5)
const tagInput = ref('')
const tagSelectItems = ref([])
const tagSelectTempItems = ref([])
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
// 取得未選擇的標籤
const tagItemsFiltered = computed(() => {
  return tagItems.filter((item) => !tagSelectItems.value.some((tag) => tag.value === item.value))
})
const tagEditState = ref(false)

const openTagEdit = () => {
  tagEditState.value = true
  tagSelectTempItems.value.length = 0
  tagSelectTempItems.value.push(...tagSelectItems.value)
}

const closedTagEdit = () => {
  tagEditState.value = false
  tagSelectItems.value.length = 0
  tagSelectItems.value.push(...tagSelectTempItems.value)
  tagSelectCount.value = 5 - tagSelectItems.value.length
}

const getUser = async () => {
  try {
    const { data } = await apiAuth.get('/user/profile')
    user.value = data.result
    tagSelectCount.value = 5 - user.value.tags.length

    if (user.value?.tags?.length) {
      const tagsWithIndex = user.value.tags.reduce((acc, tag) => {
        acc.push({ text: tag, value: tag })
        return acc
      }, [])
      tagSelectItems.value = tagsWithIndex
    }
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

onMounted(() => {
  getUser()
})

const onSubmit = async (values) => {
  if (tagSelectItems.value.length === 0) {
    createSnackbar({
      text: t('admin.groupTagRequired'),
      snackbarProps: {
        color: 'red',
      },
    })
    return
  }

  try {
    const fd = new FormData()

    // 宣告tags為選擇的標籤，並轉換成array
    const tags = tagSelectItems.value.map((tag) => tag.value)
    // 將tags加入到FormData
    // 如果直接傳送後端接收會是字串，[, , ,]
    for (let tag of tags) {
      fd.append('tags[]', tag) //後端接收為array
    }

    await apiAuth.patch('/user/profile', fd)
    userData.setTags(tags)

    createSnackbar({
      text: t('member.tagEditSuccess'),
      snackbarProps: {
        color: 'success',
      },
    })
    tagEditState.value = false
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

// const tagsWithIndex = user.value.tags.map((tag) => ({ text: tag, value: tag }))
// tagSelectItems.value = tagsWithIndex

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
</script>

<route lang="yaml">
meta:
  layout: members
  title: 'nav.memberTag'
  login: true
</route>
