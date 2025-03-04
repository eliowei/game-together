<template>
  <v-container fluid max-width="1440">
    <v-row>
      <v-col cols="11" offset="1">
        <h2>{{ group.name }}</h2>
        <!-- 主辦者 -->
        <div class="d-flex d-wrap align-center mb-10">
          <v-avatar size="50">
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
  <div class="bg-orange-lighten-5">
    <v-container fluid style="max-width: 1440px">
      <v-row>
        <v-col
          cols="11"
          offset="1"
          sm="11"
          offset-sm="1"
          md="11"
          offset-md="1"
          lg="11"
          offset-lg="1"
          xl="11"
          offset-xl="1"
        >
          <!-- 揪團內容 -->
          <div class="group-content mt-15" style="margin-bottom: 100px">
            <div class="d-flex flex-wrap">
              <v-col cols="12" sm="12" md="7" lg="7" xl="7">
                <v-img
                  :src="group.image"
                  max-height="400"
                  min-width="300"
                  max-width="628"
                  aspect-ratio="16/9"
                  cover
                  style="flex: 0 1 628px"
                ></v-img>
              </v-col>
              <v-col
                cols="10"
                offset="2"
                sm="9"
                offset-sm="3"
                md="4"
                offset-md="0"
                lg="4"
                offset-lg="0"
                xl="4"
                offset-xl="0"
              >
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
                    @click="openDialog('contact')"
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
                  <div class="d-flex flex-wrap">
                    <template v-for="number in group.groupMembers">
                      <div
                        class="d-flex flex-column mr-9 align-center pa-5"
                        :class="{
                          'cursor-pointer':
                            group.organizer_id._id === user.id &&
                            group.organizer_id._id !== number.user_id._id,
                          'member-card':
                            group.organizer_id._id === user.id &&
                            group.organizer_id._id !== number.user_id._id,
                        }"
                        @click="
                          group.organizer_id._id === user.id &&
                          group.organizer_id._id !== number.user_id._id
                            ? openDialog('kick', number)
                            : null
                        "
                      >
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
                    <template v-if="keys < commentvalidLimt * 5">
                      <div :class="['d-flex', 'mb-5', 'mt-3', 'w-100']">
                        <div class="d-flex flex-column mr-3 ml-5 align-center">
                          <v-avatar>
                            <v-img :src="comment.user_id.image"></v-img>
                          </v-avatar>
                          <span class="mt-1 ml-1">{{ comment.user_id.name }}</span>
                        </div>
                        <v-card class="pl-7 mr-3" style="max-width: 600px; width: 100%">
                          <v-card-text class="pb-0 pl-2" style="font-size: 16px">
                            <span style="font-size: 14px; color: gray">{{
                              formatTimeAgo(comment.updatedAt)
                            }}</span>
                            <br />
                            <span>{{ comment.content }}</span>
                          </v-card-text>
                          <v-card-actions>
                            <span> B{{ keys }} </span>
                            <div v-if="group.organizer_id._id === user.id">
                              <v-btn
                                v-if="!comment.reply && commentPlaceholder !== '揪團已結束'"
                                @click="commentReplyAction(keys)"
                                >回覆</v-btn
                              >
                              <span v-if="comment.reply" class="text-grey-lighten-1">已回覆</span>
                              <v-btn @click="openDialog('commentsDelete', group, keys)">刪除</v-btn>
                            </div>
                          </v-card-actions>
                        </v-card>
                      </div>
                      <!-- 回覆留言 -->
                      <div
                        v-if="
                          commentReply.open && commentReply.id === keys && !commentReplyEditState
                        "
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
                      <div
                        :class="['d-flex', 'mb-5', 'mt-3', 'w-100', 'ml-16']"
                        v-if="comment.reply"
                      >
                        <div class="d-flex flex-grow-1 mr-3">
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
                            style="max-width: 600px; width: 100%"
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
                            <div
                              class="d-flex mb-5 w-100 flex-wrap group__page-edit"
                              style="max-width: 600px"
                            >
                              <v-btn
                                height="40"
                                @click="commentReplyCancel"
                                :disabled="commentState"
                                class="mr-3 mb-1"
                                >取消</v-btn
                              >
                              <v-btn
                                height="40"
                                @click="commentReplySubmit(group)"
                                :disabled="commentState"
                                :loading="commentLoading"
                                class="mr-3 mb-1"
                                style="max-width: 600px"
                                >確定送出</v-btn
                              >
                              <v-btn
                                height="40"
                                @click="openDialog('commentsReplyDelete', group)"
                                :disabled="commentState"
                                class="mb-1"
                                style="max-width: 600px"
                                >刪除</v-btn
                              >
                            </div>
                          </div>
                          <v-card
                            class="pl-7"
                            style="max-width: 600px; width: 100%"
                            v-if="
                              !commentReplyEditState ||
                              (commentReply.open &&
                                commentReply.id !== keys &&
                                commentReplyEditState)
                            "
                          >
                            <v-card-text class="d-flex flex-column px-0">
                              <span style="font-size: 14px"
                                >主辦者 回覆B{{ keys }}
                                <span style="font-size: 14px; color: gray">{{
                                  formatTimeAgo(comment.reply.date)
                                }}</span>

                                <v-btn
                                  variant="text"
                                  @click="
                                    group.organizer_id._id === user.id
                                      ? commentReplyEdit(keys, comment)
                                      : ''
                                  "
                                  v-if="
                                    group.organizer_id._id === user.id &&
                                    commentPlaceholder !== '揪團已結束'
                                  "
                                  >編輯</v-btn
                                ></span
                              >
                              <span style="font-size: 16px">{{ comment.reply.message }}</span>
                            </v-card-text>
                          </v-card>
                          <div class="d-flex flex-column ml-5 align-center mr-15">
                            <v-avatar>
                              <v-img :src="comment.reply.author.image"></v-img>
                            </v-avatar>
                            <span class="mt-1 ml-1">{{ comment.reply.author.name }}</span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                  <div class="d-flex justify-center" style="max-width: 700px; width: 100%">
                    <v-btn
                      v-if="commentvalidLimt * 5 < group.comments.length"
                      @click="commentvalidLimt++"
                      >查看更多</v-btn
                    >
                  </div>

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
  </div>

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
            <div class="d-flex group__page-action">
              <v-btn class="mr-5" height="50" width="200" :disabled="true">{{ groupRole }}</v-btn>
              <v-btn
                height="50"
                width="200"
                :disabled="groupButtonState || isUserInGroup"
                @click="groupAction"
                >{{ groupState }}</v-btn
              >
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-btn
    v-if="!chatState && isMember"
    icon="mdi-chat-processing-outline"
    color="black"
    @click="chatClickAction"
    style="position: fixed; right: 2%; bottom: 10%; z-index: 999; box-shadow: 0 0 30px white"
  ></v-btn>
  <!-- 聊天室 -->
  <div
    v-if="chatState && isMember"
    class="group__page-chat"
    style="position: fixed; right: 1%; bottom: 0; z-index: 999"
  >
    <v-card width="300" height="410">
      <v-card-title class="d-flex align-center mb-0 pb-0 bg-black">
        <span class="group__page-chat-title">{{ group.name }}</span>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-chevron-down"
          variant="text"
          @click="disconnectSocket"
          style="font-size: 18px"
          size="30"
          rounded
          class="mb-1"
        ></v-btn>
      </v-card-title>
      <div
        ref="chatContainer"
        style="height: 300px; overflow-y: auto; padding: 12px"
        @scroll="scrollChat"
      >
        <template v-for="(chat, index) of chatMessage" :key="chat._id">
          <div v-if="shouldShowDate(chat, index)" class="text-center my-2 text-grey">
            {{ new Date(chat.create_at).toLocaleDateString() }}
          </div>

          <div class="d-flex my-3">
            <v-avatar class="mr-5">
              <v-img :src="chat.image" />
            </v-avatar>
            <div class="w-100">
              <div class="d-flex justify-space-between w-100" style="font-size: 16px">
                <span>{{ chat.name }} </span>
                <span>
                  {{ formatTime(chat.create_at) }}
                </span>
              </div>
              <p class="mb-3" style="font-size: 14px">
                {{ chat.text }}
              </p>
            </div>
          </div>
          <v-divider></v-divider>
        </template>
      </div>
      <v-card-actions>
        <v-text-field
          variant="outlined"
          max-width="300"
          v-model="message"
          placeholder="請輸入訊息"
        ></v-text-field>
        <v-btn @click="onSubmit" :loading="chatMessageLoading">送出</v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <v-dialog v-model="dialogState.open" width="350" opacity="0">
    <v-card v-if="dialogState.type === 'contact'">
      <v-card-title class="d-flex align-center mb-0 pb-0">
        <span>{{ t('group.contactInfo') }}</span>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" variant="text" @click="dialogState.open = false"></v-btn>
      </v-card-title>
      <v-card-text class="pt-0">
        <v-list class="py-0">
          <v-list-item class="py-0" v-for="(item, index) in contactDialogItems" :key="index">
            {{ item.title }}: <v-icon v-if="item.icon" :icon="item.icon"></v-icon> {{ item.value }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card v-if="dialogState.type !== 'contact'">
      <v-card-text>{{
        dialogState.type === 'kick'
          ? '確定要踢除該成員嗎?'
          : dialogState.type === 'commentsDelete'
            ? '確定要刪除留言嗎?'
            : dialogState.type === 'commentsReplyDelete'
              ? '確定要刪除回覆留言嗎?'
              : dialogState.type === 'cancelsGroup'
                ? '確定要取消揪團嗎?'
                : ''
      }}</v-card-text>
      <v-card-actions>
        <v-btn @click="DialogAction('cancel')">取消</v-btn>
        <v-btn @click="DialogAction('confirm')">確定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <group-footer></group-footer>
</template>

<style>
.custom-textarea .v-field__input {
  padding-left: 28px;
}

.member-card {
  transition: 0.4s ease;
}

.member-card:hover {
  border-radius: 4px;
  background-color: #ffe0b2;
}
</style>

<script setup>
import { ref, computed, reactive, onUnmounted, nextTick } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'
import GroupFooter from '@/components/GroupFooter.vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useDate } from 'vuetify'
import { useSnackbar } from 'vuetify-use-dialog'
import { io } from 'socket.io-client'

const { api, apiAuth } = useAxios()
const route = useRoute()
const router = useRouter()
const tabSelect = ref(0)
const tabs = [
  { id: 0, title: '參與者' },
  { id: 1, title: '留言' },
]
const dialogState = reactive({
  open: false,
  type: '',
  data: {},
  key: 0,
})
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
const commentvalidLimt = ref(1)

// 聊天室 Socket 相關
const newSocket = io(import.meta.env.VITE_API, {
  autoConnect: false,
})
const chatMessage = reactive([])
const isConnected = ref(false)
const message = ref('')
const chatState = ref(false)

const chatContainer = ref(null)
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const chatMessageLoading = ref(false)

const commentReplyAction = (key) => {
  if (commentPlaceholder.value === '揪團已結束') return

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

const commentReplyCancel = () => {
  commentReply.open = false
  commentReply.id = ''
  commentReplyMessage.value = ''
  commentReplyEditState.value = false
}

const commentReplyEdit = (key, value) => {
  if (commentPlaceholder.value === '揪團已結束') return
  // console.log(value)
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
  return group.value.groupMembers.some(
    (users) => group.value.organizer_id._id !== user.id && users.user_id._id === user.id,
  )
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
        ? '已參加揪團'
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

const openDialog = (type, data, key) => {
  dialogState.open = true
  dialogState.type = type
  dialogState.data = data
  dialogState.key = key
  // console.log(dialogState.data)
}

const DialogAction = (type) => {
  if (type === 'cancel') {
    dialogState.open = false
  } else if (type === 'confirm') {
    dialogState.open = false
    if (dialogState.type === 'kick') {
      groupMembersAction(dialogState.data)
    } else if (dialogState.type === 'commentsDelete') {
      commentDelete(dialogState.key, dialogState.data)
    } else if (dialogState.type === 'commentsReplyDelete') {
      commentReplyDelete(dialogState.data)
    } else if (dialogState.type === 'cancelsGroup') {
      cancelGroup()
    }
  }
}

const cancelGroup = async () => {
  try {
    // 取消主辦揪團
    await apiAuth.delete('/user/organizerGroup/' + group.value._id)
    disconnectSocket()
    router.push('/group')
    createSnackbar({
      text: '取消揪團成功',
      snackbarProps: {
        color: 'green',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

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
      openDialog('cancelsGroup')
    } else if (!isUserInGroup.value) {
      // 參加揪團
      await apiAuth.post('/user/joinGroup/' + group.value._id)
      createSnackbar({
        text: '參加揪團成功',
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

const groupMembersAction = async (member) => {
  try {
    // console.log(group.value._id)
    if (group.value.organizer_id._id !== user.id) throw new Error('NOT_ORGANIZER')
    if (group.value.organizer_id._id === member.user_id._id) throw new Error('ORGANIZER')

    await apiAuth.patch('user/organizerGroup/' + group.value._id + '/kick', {
      user_id: member.user_id._id,
    })

    createSnackbar({
      text: '踢除成功',
      snackbarProps: {
        color: 'green',
      },
    })
    getGroup()
  } catch (error) {
    console.log(error)
    if (error.message === 'NOT_ORGANIZER') {
      createSnackbar({
        text: '您不是主辦者',
        snackbarProps: {
          color: 'red',
        },
      })
    } else if (error.message === 'ORGANIZER') {
      createSnackbar({
        text: '無法踢除主辦者',
        snackbarProps: {
          color: 'red',
        },
      })
    }
  }
}

// 聊天室連線
const connectSocket = () => {
  if (isConnected.value) return

  // console.log('嘗試建立連線...') // 添加除錯訊息
  newSocket.connect()

  newSocket.on('connect', () => {
    // console.log('連線成功，Socket ID:', newSocket.id) // 添加更多連線資訊
    isConnected.value = true
    getChatMessage()
  })

  newSocket.on('receive_message', (data) => {
    // console.log('收到新訊息:', data)
    chatMessage.push(data)
    scrollToBottom()
    chatMessageLoading.value = false
  })

  newSocket.emit('join_room', group.value._id)
}

// 聊天室離線
const disconnectSocket = () => {
  if (!isConnected.value) return

  isConnected.value = false
  newSocket.off('receive_message')
  newSocket.emit('leave_room', group.value._id)
  newSocket.disconnect()
  // console.log('已離線')
  chatMessage.length = 0
  chatState.value = false
  loading.value = false
  hasMore.value = true
  page.value = 1
}

// 聊天室開啟
const chatClickAction = async () => {
  const isStillMember = await checkMemberStatus()

  if (!isStillMember) {
    router.push('/group')
    return
  }
  chatState.value = true
  connectSocket()
}

// 聊天室送出訊息
const onSubmit = async () => {
  try {
    const isStillMember = await checkMemberStatus()

    if (!isStillMember) {
      router.push('/group')
      return
    }
    if (!message.value.trim()) return

    // console.log(message.value)
    chatMessageLoading.value = true
    await apiAuth.post(`/chat/${group.value._id}/message`, {
      text: message.value,
    })
    // 透過 socket.io 送出訊息
    newSocket.emit('send_message', {
      roomId: group.value._id,
      text: message.value,
      id: user.id,
      image: user.image,
      name: user.nickname,
    })
    message.value = ''
  } catch (error) {
    console.log(error)
  }
}

onUnmounted(() => {
  if (isConnected.value) {
    disconnectSocket()
  }
})

// 滾動到底部
const scrollToBottom = async () => {
  await nextTick()
  if (!chatContainer.value) return

  // console.log('滾動到底部')
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight
}

// 取得聊天訊息
const getChatMessage = async () => {
  try {
    if (loading.value || !hasMore.value) return

    loading.value = true
    const { data } = await apiAuth.get(`/chat/${group.value._id}?page=${page.value}&limit=10`)

    if (data.result.length < 10) {
      hasMore.value = false
    }

    // 更新前的總高度
    const previousHeight = chatContainer.value.scrollHeight

    chatMessage.unshift(...data.result.reverse())
    page.value++

    await nextTick()

    // 更新後的總高度
    const newHeight = chatContainer.value.scrollHeight

    // 高度差
    const heightDiff = newHeight - previousHeight

    // 調整滾動軸位置
    chatContainer.value.scrollTop = heightDiff

    loading.value = false

    if (page.value === 2) {
      await scrollToBottom()
    }
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}

// 滾動事件
const scrollChat = async () => {
  if (!chatContainer.value) return

  // 獲取 DOM 元素的滾動位置
  const { scrollTop, scrollHeight, clientHeight } = chatContainer.value
  // console.log('捲動位置:', scrollTop)
  // console.log('內容總高度:', scrollHeight)
  // console.log('可視區域高度:', clientHeight)

  // 當滾動到頂部時載入更多訊息
  if (scrollTop === 0 && !loading.value && hasMore.value) {
    await getChatMessage()
  }
}

const checkMemberStatus = async () => {
  await getGroup()

  if (!isMember.value) {
    disconnectSocket()
    chatState.value = false
    createSnackbar({
      text: '您已不是揪團成員',
      snackbarProps: {
        color: 'red',
      },
    })
    return false
  }
  return true
}

const formatTime = (date) => {
  const time = new Date(date)
  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  const seconds = String(time.getSeconds()).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}

const formatTimeAgo = (date) => {
  const now = new Date()
  const past = new Date(date)
  const diff = now - past

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) return `${years} 年前`
  if (months > 0) return `${months} 個月前`
  if (days > 0) return `${days} 天前`
  if (hours > 0) return `${hours} 小時前`
  if (minutes > 0) return `${minutes} 分鐘前`
  return '剛剛'
}

const shouldShowDate = (currentMessage, index) => {
  if (index === 0) return true

  const currentDate = new Date(currentMessage.create_at).toLocaleDateString()
  const previousDate = new Date(chatMessage[index - 1].create_at).toLocaleDateString()

  return currentDate !== previousDate
}
</script>

<route lang="yaml">
meta:
  title: 'nav.groupDetail'
</route>
