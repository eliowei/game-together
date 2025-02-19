<template>
  <v-container>
    <v-row>
      <v-col cols="10" offset="2">
        <h2>{{ group.name }}</h2>
        <!-- 主辦者 -->
        <div class="d-flex d-wrap align-center mb-10">
          <v-avatar>
            <v-img :src="group.organizer_id.image" />
          </v-avatar>
          <div class="d-flex flex-column pl-3 align-center">
            <span>主辦者</span>
            <span>{{ group.organizer_id.name }}</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid class="bg-orange-lighten-5">
    <v-row>
      <v-col cols="10" offset="2">
        <!-- 揪團內容 -->
        <div class="group-content mt-15" style="margin-bottom: 100px">
          <div class="d-flex">
            <v-col cols="5">
              <v-img
                :src="group.image"
                min-height="400"
                min-width="628"
                aspect-ratio="16/9"
                cover
              ></v-img>
            </v-col>
            <v-col cols="4" offset="2">
              <v-chip
                v-for="tag of group.tags"
                class="mb-2 mt-1 mr-1"
                variant="outlined"
                color="orange"
                >{{ tag }}
              </v-chip>
              <div class="card-content d-flex flex-column">
                <v-card width="260" height="150">
                  <v-card-text class="d-flex flex-column">
                    <span class="mb-1"
                      ><v-icon icon="mdi-calendar-range"></v-icon>{{ group.time }}</span
                    >
                    <span class="mb-1"><v-icon icon="mdi-web"></v-icon> {{ group.type }}</span>
                    <span class="mb-1"
                      ><v-icon icon="mdi-forum"></v-icon> {{ group.contact_method }}</span
                    >
                    <span class="mb-1" v-if="group.type === '線下'"
                      ><v-icon icon="mdi-map-marker-outline"></v-icon>
                      {{ t('area.' + group.city) + group.region }}</span
                    >
                    <span
                      ><v-icon icon="mdi-account-multiple-outline"></v-icon>
                      {{ group.member_limit }}</span
                    >
                  </v-card-text>
                </v-card>
              </div>
              <div class="d-flex flex-column align-center" style="width: 260px" v-if="isMember">
                <v-btn
                  class="mt-3"
                  prepend-icon="mdi-clipboard-list"
                  style="width: 160px; height: 40px"
                  @click="contactDialog = true"
                  >聯絡資訊</v-btn
                >
              </div>
            </v-col>
          </div>
          <v-col cols="10">
            <div v-dompurify-html="group.content" class="ml-6 mt-5 mb-5"></div>
            <v-divider class="border-opacity-100"></v-divider>
            <!-- 分頁 -->
            <v-tabs
              v-model="tabSelect"
              align-tabs="star"
              color="orange"
              style="border-bottom: 1px solid #eeeeee"
              class="mt-8"
            >
              <v-tab v-for="tab in tabs" :key="tab.id">{{ tab.title }}</v-tab>
            </v-tabs>
            <v-tabs-window v-model="tabSelect" class="my-8">
              <v-tabs-window-item :value="0">
                <div class="d-flex">
                  <template v-for="number in group.groupMembers">
                    <div class="d-flex flex-column mr-9 align-center">
                      <v-avatar size="50">
                        <v-img :src="number.user_id.image" />
                      </v-avatar>
                      <span class="mt-3 ml-1"> {{ number.user_id.name }}</span>
                      <span class="mt-1">{{
                        group.organizer_id._id === number.user_id._id ? '主辦者' : '成員'
                      }}</span>
                    </div>
                  </template>
                </div>
              </v-tabs-window-item>
              <v-tabs-window-item :value="1">
                <template v-for="(comment, keys) of group.comments">
                  <div :class="['d-flex', 'mb-5', 'mt-3', 'w-100']">
                    <div class="d-flex flex-column mr-3 ml-5 order-1">
                      <v-avatar>
                        <v-img :src="comment.user_id.image"></v-img>
                      </v-avatar>
                      <span class="mt-1 ml-1">{{ comment.user_id.name }}</span>
                    </div>
                    <v-card class="order-2 pl-7" style="width: 600px">
                      <v-card-text class="pb-0 pl-2" style="font-size: 16px"
                        >{{ comment.content }}
                      </v-card-text>
                      <v-card-actions>
                        <span> B{{ keys }} </span>
                        <v-btn v-if="!comment.reply" @click="commentReplyAction(keys)">回覆</v-btn>
                        <span v-if="comment.reply" class="text-grey-lighten-1">已回覆</span>
                        <v-btn
                          v-if="group.organizer_id._id === user.id"
                          @click="commentDelete(keys, group)"
                          :isLoading="commentLoading"
                          >刪除</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </div>
                  <!-- 回覆留言 -->
                  <div
                    v-if="commentReply.open && commentReply.id === keys && !commentReplyEditState"
                  >
                    <v-textarea
                      v-model="commentReplyMessage"
                      :placeholder="commentPlaceholder"
                      variant="outlined"
                      max-width="600"
                      no-resize
                      class="ml-5"
                      :disabled="commentState"
                      @keydown.esc="commentReplyCancel"
                    ></v-textarea>
                    <div class="d-flex justify-end mb-5" style="max-width: 600px">
                      <v-btn
                        height="50"
                        @click="commentReplyCancel"
                        :disabled="commentState"
                        class="mr-3"
                        >取消</v-btn
                      >
                      <v-btn
                        height="50"
                        @click="commentReplySubmit(group)"
                        :disabled="commentState"
                        :loading="commentLoading"
                        >確定送出</v-btn
                      >
                    </div>
                  </div>
                  <!-- 已回覆顯示 -->
                  <div :class="['d-flex', 'mb-5', 'mt-3', 'w-100', 'ml-16']" v-if="comment.reply">
                    <div class="d-flex flex-column mr-3 ml-5 order-2">
                      <v-avatar>
                        <v-img :src="comment.reply.author.image"></v-img>
                      </v-avatar>
                      <span class="mt-1 ml-1">{{ comment.reply.author.name }}</span>
                    </div>
                    <div class="d-flex">
                      <v-icon
                        icon="mdi-reply"
                        class="mr-5 ml-2 mt-10"
                        style="transform: rotate(180deg)"
                      ></v-icon>
                      <!-- 編輯留言 -->
                      <div
                        v-if="
                          commentReply.open && commentReply.id === keys && commentReplyEditState
                        "
                        style="width: 600px"
                      >
                        <v-textarea
                          v-model="commentReplyMessage"
                          :placeholder="commentPlaceholder"
                          variant="solo"
                          max-width="600"
                          no-resize
                          :disabled="commentState"
                          @keydown.esc="commentReplyCancel"
                          rows="3"
                          class="custom-textarea"
                        ></v-textarea>
                        <div class="d-flex justify-end mb-5" style="max-width: 600px">
                          <v-btn
                            height="50"
                            @click="commentReplyCancel"
                            :disabled="commentState"
                            class="mr-3"
                            >取消</v-btn
                          >
                          <v-btn
                            height="50"
                            @click="commentReplySubmit(group)"
                            :disabled="commentState"
                            :loading="commentLoading"
                            >確定送出</v-btn
                          >
                          <v-btn
                            height="50"
                            @click="commentReplyDelete(group)"
                            :disabled="commentState"
                            :loading="commentLoading"
                            >刪除</v-btn
                          >
                        </div>
                      </div>

                      <v-card
                        class="order-1 pl-7"
                        style="width: 600px"
                        @click="commentReplyEdit(keys, comment)"
                        v-if="
                          !commentReplyEditState ||
                          (commentReply.open && commentReply.id !== keys && commentReplyEditState)
                        "
                      >
                        <v-card-text class="d-flex flex-column px-0">
                          <span class="mt-1 mb-3" style="font-size: 14px"
                            >主辦者 回覆B{{ keys }}</span
                          >
                          <span style="font-size: 16px">{{ comment.reply.message }}</span>
                        </v-card-text>
                      </v-card>
                    </div>
                  </div>
                </template>
                <!-- 留言 -->
                <p class="font-weight-bold ml-5 mb-3">發佈留言</p>
                <v-textarea
                  v-model="commentMessage"
                  :placeholder="commentPlaceholder"
                  variant="outlined"
                  max-width="600"
                  no-resize
                  class="ml-5"
                  :disabled="commentState"
                ></v-textarea>
                <div class="d-flex justify-end mb-5" style="max-width: 600px">
                  <v-btn
                    height="50"
                    @click="commentAction"
                    :disabled="commentState"
                    :loading="commentLoading"
                    >確定送出</v-btn
                  >
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
            <v-divider class="border-opacity-100"></v-divider>
          </v-col>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex justify-space-between mb-13 mt-4">
          <div class="d-flex flex-column">
            <span>
              {{ group.time }}
            </span>
            <h2>{{ group.name }}</h2>
          </div>
          <div class="d-flex">
            <div class="d-flex flex-column mr-8 align-center">
              <span>{{ group.member_limit - group.member_count }}個空位</span>
              <v-btn
                @click="favoriteAction"
                :icon="favoriteState ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
                variant="text"
              ></v-btn>
            </div>
            <v-btn class="mr-5" height="50" width="200" :disabled="true">{{ groupRole }}</v-btn>
            <v-btn height="50" width="200" :disabled="groupButtonState" @click="groupAction">{{
              groupState
            }}</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="contactDialog" width="350" opacity="0">
    <v-card>
      <v-card-title class="d-flex align-center mb-0 pb-0">
        <span>{{ t('group.contactInfo') }}</span>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" variant="text" @click="contactDialog = false"></v-btn>
      </v-card-title>
      <v-card-text class="pt-0">
        <v-list class="py-0">
          <v-list-item class="py-0" v-for="(item, index) in contactDialogItems" :key="index">
            {{ item.title }}: <v-icon v-if="item.icon" :icon="item.icon"></v-icon> {{ item.value }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
  <group-footer></group-footer>
</template>

<style>
.custom-textarea .v-field__input {
  padding-left: 28px;
}
</style>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'
import GroupFooter from '@/components/GroupFooter.vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useDate } from 'vuetify'
import { useSnackbar } from 'vuetify-use-dialog'

const { api, apiAuth } = useAxios()
const route = useRoute()
const router = useRouter()
const tabSelect = ref(0)
const tabs = [
  { id: 0, title: '參與者' },
  { id: 1, title: '留言' },
]
const contactDialog = ref(false)
const { t } = useI18n()
const user = useUserStore()
const date = useDate()
const createSnackbar = useSnackbar()

const favoriteState = computed(() => {
  return user.favorite_groups.some((favorite) => favorite.group_id === group.value._id)
})

const isMember = computed(() => {
  return group.value.groupMembers.some((users) => users.user_id._id === user.id)
})

const commentMessage = ref('')
const commentState = computed(() => {
  return !user.id || date.date(group.value.time) < date.date()
})
const commentPlaceholder = computed(() => {
  return date.date(group.value.time) < date.date()
    ? '揪團已結束'
    : !user.id
      ? '請先登入'
      : 'Write a comment...'
})
const commentReply = reactive({
  id: '',
  open: false,
})
const commentReplyMessage = ref('')
const commentReplyEditState = ref(false)
const commentLoading = ref(false)

const commentReplyAction = (key) => {
  commentReply.id = key
  commentReply.open = true
  commentReplyEditState.value = false
  commentReplyMessage.value = ''
}

const commentDelete = async (key, values) => {
  try {
    if (!user.id) throw new Error('LOGIN')
    commentLoading.value = true
    await apiAuth.delete('/group/' + values._id + '/comment', {
      data: {
        comment_id: values.comments[key]._id,
      },
    })

    await getGroup()
    createSnackbar({
      text: '刪除留言成功',
      snackbarProps: {
        color: 'green',
      },
    })
    commentLoading.value = false
  } catch (error) {
    console.log(error)
    if (error.message === 'LOGIN') {
      createSnackbar({
        text: '請先登入',
        snackbarProps: {
          color: 'red',
        },
      })
      router.push('/login')
    }
  }
}
const commentReplyDelete = async (values) => {
  try {
    if (!user.id) throw new Error('LOGIN')
    commentLoading.value = true
    await apiAuth.delete('/group/' + values._id + '/replayComment', {
      data: {
        comment_id: values.comments[commentReply.id]._id,
      },
    })
    await getGroup()
    createSnackbar({
      text: '刪除回覆留言成功',
      snackbarProps: {
        color: 'green',
      },
    })
    commentLoading.value = false
    commentReply.open = false
    commentReply.id = ''
    commentReplyMessage.value = ''
    commentReplyEditState.value = false
  } catch (erorr) {
    console.log(error)
    if (error.message === 'LOGIN') {
      createSnackbar({
        text: '請先登入',
        snackbarProps: {
          color: 'red',
        },
      })
      router.push('/login')
    }
  }
}

const commentReplyCancel = () => {
  commentReply.open = false
  commentReply.id = ''
  commentReplyMessage.value = ''
  commentReplyEditState.value = false
}

const commentReplyEdit = (key, value) => {
  console.log(value)
  commentReplyEditState.value = true
  commentReply.id = key
  commentReply.open = true
  commentReplyMessage.value = value.reply.message
}

const commentReplySubmit = async (values) => {
  try {
    if (!commentReplyMessage.value.trim()) throw new Error('EMPTY')
    if (!user.id) throw new Error('LOGIN')
    commentLoading.value = true
    await apiAuth.patch('/group/' + values._id + '/replayComment', {
      comment_id: values.comments[commentReply.id]._id,
      message: commentReplyMessage.value,
    })
    commentLoading.value = false
    commentReplyEditState.value = false
    commentReply.open = false
    commentReply.id = ''
    commentReplyMessage.value = ''
    await getGroup()
    createSnackbar({
      text: '留言成功',
      snackbarProps: {
        color: 'green',
      },
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'EMPTY') {
      createSnackbar({
        text: '留言不可為空',
        snackbarProps: {
          color: 'red',
        },
      })
    } else if (error.message === 'LOGIN') {
      createSnackbar({
        text: '請先登入',
        snackbarProps: {
          color: 'red',
        },
      })
      router.push('/login')
    }
  }
}

const isUserInGroup = computed(() => {
  return group.value.groupMembers.some((users) => users.user_id._id === user.id)
})
const groupRole = computed(() => {
  return group.value.organizer_id._id === user.id
    ? '主辦者'
    : isUserInGroup.value
      ? '參與者'
      : '未參加'
})
const groupState = computed(() => {
  return date.date(group.value.time) < date.date()
    ? '揪團已結束'
    : group.value.organizer_id._id === user.id
      ? '取消揪團'
      : isUserInGroup.value
        ? '取消參加揪團'
        : group.value.member_count === group.value.member_limit
          ? '揪團已滿'
          : '參加揪團'
})
const groupButtonState = computed(() => {
  return date.date(group.value.time) < date.date()
})
const group = ref({
  _id: '',
  organizer_id: {},
  name: '',
  image: '',
  description: '',
  content: '',
  type: '',
  member_count: 0,
  member_limit: 0,
  contact_method: '',
  contact_info: '',
  city: '',
  region: '',
  time: '',
  tags: [],
  groupMembers: [],
  comments: [],
})

const contactDialogItems = computed(() => [
  { title: '聯絡方式', icon: 'mdi-forum', value: group.value.contact_method },
  { title: '聯絡資訊', icon: '', value: group.value.contact_info },
])

const getGroup = async () => {
  try {
    const { data } = await api.get('/group/' + route.params.id)
    group.value = data.result
  } catch (error) {
    console.log(error)
  }
}
getGroup()

const groupAction = async () => {
  try {
    if (date.date(group.value.time) < date.date()) throw new Error('END')
    if (group.value.member_count === group.value.member_limit) throw new Error('Full')
    if (!user.id) throw new Error('LOGIN')

    if (group.value.organizer_id._id === user.id) {
      // 取消揪團
      await apiAuth.delete('/user/organizerGroup/' + group.value._id)
      router.push('/group')
      createSnackbar({
        text: '取消揪團成功',
        snackbarProps: {
          color: 'green',
        },
      })
      return
    } else if (!isUserInGroup.value) {
      // 參加揪團
      await apiAuth.post('/user/joinGroup/' + group.value._id)
      createSnackbar({
        text: '參加揪團成功',
        snackbarProps: {
          color: 'green',
        },
      })
    } else if (isUserInGroup.value) {
      // 取消參加揪團
      await apiAuth.delete('/user/joinGroup/' + group.value._id)
      createSnackbar({
        text: '取消參加揪團成功',
        snackbarProps: {
          color: 'green',
        },
      })
    }
    // 重新取得揪團資訊
    await getGroup()
  } catch (error) {
    console.log(error)
    if (error.message === 'END') {
      createSnackbar({
        text: '揪團已結束',
        snackbarProps: {
          color: 'red',
        },
      })
      router.push('/group')
    } else if (error.message === 'Full') {
      createSnackbar({
        text: '揪團已滿',
        snackbarProps: {
          color: 'red',
        },
      })
    } else if (error.message === 'LOGIN') {
      createSnackbar({
        text: '請先登入',
        snackbarProps: {
          color: 'red',
        },
      })
      router.push('/login')
    }
  }
}

const commentAction = async () => {
  try {
    if (!user.id) throw new Error('LOGIN')
    if (!commentMessage.value.trim()) throw new Error('EMPTY')

    await apiAuth.post('/group/' + group.value._id + '/comment', {
      content: commentMessage.value,
    })
    createSnackbar({
      text: '留言成功',
      snackbarProps: {
        color: 'green',
      },
    })
    commentMessage.value = ''
    await getGroup()
  } catch (error) {
    console.log(error)
    if (error.message === 'LOGIN') {
      createSnackbar({
        text: '請先登入',
        snackbarProps: {
          color: 'red',
        },
      })
      router.push('/login')
    } else if (error.message === 'EMPTY') {
      createSnackbar({
        text: '留言不可為空',
        snackbarProps: {
          color: 'red',
        },
      })
    }
  }
}

const favoriteAction = async () => {
  try {
    if (!user.id) throw new Error('LOGIN')

    if (favoriteState.value) {
      await apiAuth.delete('/user/favoriteGroup/' + group.value._id)
      user.updateFavoriteGroups(group.value, true)
      createSnackbar({
        text: '取消收藏成功',
        snackbarProps: {
          color: 'green',
        },
      })
    } else if (!favoriteState.value) {
      await apiAuth.post('/user/favoriteGroup/' + group.value._id)
      user.updateFavoriteGroups(group, false)
      createSnackbar({
        text: '收藏成功',
        snackbarProps: {
          color: 'green',
        },
      })
    }
  } catch (error) {
    console.log(error)
    if (error.message === 'LOGIN') {
      createSnackbar({
        text: '請先登入',
        snackbarProps: {
          color: 'red',
        },
      })
      router.push('/login')
    }
  }
}
</script>

<route lang="yaml">
meta:
  title: 'nav.groupDetail'
</route>
