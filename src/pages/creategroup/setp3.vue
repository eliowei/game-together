<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12"
        ><h2 class="text-center mb-2 mt-2">{{ $t('group.createSetp3') }}</h2>
        <v-progress-linear model-value="60" height="10" color="green-accent-4"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <h1 class="text-center">{{ $t('group.detail') }}</h1>
    <h2 class="text-center mb-5">
      {{ $t('group.detailIllustrateLine1') }}<br />
      {{ $t('group.detailIllustrateLine2') }}
    </h2>

    <v-row>
      <v-col cols="8" offset="2" class="mb-10">
        <div style="height: 450px">
          <quill-editor
            theme="snow"
            v-model:content="editorContent"
            :toolbar="editorOptions.modules.toolbar"
            :options="editorOptions"
            contentType="html"
          />
        </div>
      </v-col>
      <v-col cols="6" offset="3" class="mt-10">
        <v-card height="190" color="blue-grey-lighten-5">
          <v-card-title>範例</v-card-title>
          <v-card-text class="px-15">
            如果你正在尋找一個有趣且能夠增進友誼的活動，那麼遊戲揪團就是你不容錯過的選擇。
            這項活動不僅能夠讓你沉浸在令人興奮的遊戲世界中，還能增強團隊合作、策略思維和反應速度。
            我們的揪團將會在線上或特定的遊戲場所進行，提供完善的設施和遊戲環境
            任何人都能在這裡找到適合自己的遊戲對手與夥伴。
            在遊戲之後，我們也可以一起分享心得、討論戰術，讓大家能夠在輕鬆愉悅的氛圍中享受社交樂趣。
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" offset="7"
        ><a href="https://chatgpt.com/" class="link"
          >詢問ChatGPT <v-icon icon="mdi-open-in-new"></v-icon
        ></a>
      </v-col>
      <v-col cols="12" offset="2">
        <span class="text-h6 font-weight-bold ml-15">上傳相片</span>
      </v-col>
      <v-col offset="3">
        <VueFileAgent
          v-model="fileRecords"
          v-model:raw-model-value="rawFileRecords"
          accept="image/jpeg,image/png"
          deletable
          max-size="1MB"
          :help-text="$t('fileAgent.helpText')"
          :error-text="{
            type: $t('fileAgent.errorType'),
            size: $t('fileAgent.errorSize'),
          }"
          class="w-25"
          ref="fileAgent"
        ></VueFileAgent>
      </v-col>
      <v-col cols="8" offset="2">
        <v-divider class="border-opacity-100 my-12"></v-divider>
      </v-col>
      <v-col offset="3">
        <v-btn width="100" append-icon="mdi-arrow-left" to="/creategroup/setp2">{{
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

<style>
.link {
  text-decoration: none;
  &:visited {
    color: black;
  }
  &:hover {
    color: orange;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import BlotFormatter from 'quill-blot-formatter'
import { useI18n } from 'vue-i18n'
import { useGroupStore } from '@/stores/group'
import { useSnackbar } from 'vuetify-use-dialog'
import { useAxios } from '@/composables/axios'
import { useRouter } from 'vue-router'

const fileRecords = ref([])
const rawFileRecords = ref([])
const fileAgent = ref(null)
const { t } = useI18n()
const group = useGroupStore()
const createSnackbar = useSnackbar()
const { apiAuth } = useAxios()
const router = useRouter()

const editorContent = ref('')
const editorOptions = {
  modules: {
    toolbar: [
      // 粗體 斜體 底線 刪除線 -----['bold', 'italic', 'underline', 'strike']
      ['bold', 'italic', 'underline', 'strike'],
      // 引用  程式碼-----['blockquote', 'code-block']
      ['blockquote', 'code-block'],
      // 1、2 級標題-----[{ header: 1 }, { header: 2 }]
      [{ header: 1 }, { header: 2 }],
      // 有序、無序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
      [{ list: 'ordered' }, { list: 'bullet' }],
      // 上標/下標-----[{ script: 'sub' }, { script: 'super' }]
      [{ script: 'sub' }, { script: 'super' }],
      // 縮排-----[{ indent: '-1' }, { indent: '+1' }]
      [{ indent: '-1' }, { indent: '+1' }],
      // 文本方向-----[{'direction': 'rtl'}]
      [{ direction: 'rtl' }],
      // 字體大小-----[{ size: ['small', false, 'large', 'huge'] }]
      [{ size: ['small', false, 'large', 'huge'] }],
      // 標題-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // 字體顏色、字體背景顏色-----[{ color: [] }, { background: [] }]
      [{ color: [] }, { background: [] }],
      // 字體種類-----[{ font: [] }]
      [{ font: [] }],
      // 對齊方式-----[{ align: [] }]
      [{ align: [] }],
      // 清除文本格式-----['clean']
      ['clean'],
      // 連結、圖片、視頻-----['link', 'image', 'video']
      ['link'],
      // ['table'] // 表格
    ],
    BlotFormatter,
  },
  placeholder: '請輸入內容...',
}

const onSubmit = async () => {
  const fd = new FormData()
  const data = []

  if (editorContent.value === '') {
    createSnackbar({
      text: '請輸入內容',
      snackbarProps: {
        color: 'red',
      },
    })
    return
  }

  if (fileRecords.value.length === 0) {
    createSnackbar({
      text: '請上傳相片',
      snackbarProps: {
        color: 'red',
      },
    })
    return
  }
  fd.append('image', fileRecords.value[0].file)

  const result = await apiAuth.post('/api/upload', fd)

  data.push({
    content: editorContent.value,
    image: result.data.url,
  })
  group.setStep3(data)
  router.push('/creategroup/setp4')
}
</script>

<route lang="yaml">
meta:
  title: 'nav.groupCreate'
  login: true
</route>
