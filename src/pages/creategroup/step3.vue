<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12"
        ><h2 class="text-center mb-2 mt-2">{{ $t('group.createStep3') }}</h2>
        <v-progress-linear model-value="60" height="10" color="green-accent-4"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>

  <v-container style="max-width: 1440px">
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
      <v-col cols="6" offset="3" class="mt-16">
        <v-card color="blue-grey-lighten-5">
          <v-card-title>範例</v-card-title>
          <v-card-text class="px-15 h-100">
            如果你正在尋找一個有趣且能夠增進友誼的活動，那麼遊戲揪團就是你不容錯過的選擇。
            這項活動不僅能夠讓你沉浸在令人興奮的遊戲世界中，還能增強團隊合作、策略思維和反應速度。
            我們的揪團將會在線上或特定的遊戲場所進行，提供完善的設施和遊戲環境
            任何人都能在這裡找到適合自己的遊戲對手與夥伴。
            在遊戲之後，我們也可以一起分享心得、討論戰術，讓大家能夠在輕鬆愉悅的氛圍中享受社交樂趣。
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" offset="7"
        ><a href="https://chatgpt.com/" class="creategroup__step3-chatgpt-link"
          >詢問ChatGPT <v-icon icon="mdi-open-in-new"></v-icon
        ></a>
      </v-col>
      <v-col cols="12" offset="2">
        <span class="text-h6 font-weight-bold ml-15">上傳相片</span>
      </v-col>
      <v-col offset="3">
        <div style="max-width: 200px">
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
            ref="fileAgent"
          ></VueFileAgent>
        </div>
      </v-col>
      <v-col cols="8" offset="2">
        <v-divider class="border-opacity-100 my-12"></v-divider>
      </v-col>
      <v-col offset="3">
        <v-btn width="110" append-icon="mdi-arrow-left" to="/creategroup/step2">{{
          t('group.previous')
        }}</v-btn>
      </v-col>
      <v-col offset="1" class="mb-16">
        <v-btn
          type="submit"
          width="110"
          append-icon="mdi-arrow-right"
          @click="onSubmit"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          >{{ t('group.next') }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
  <group-footer></group-footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter'
import { useI18n } from 'vue-i18n'
import { useGroupStore } from '@/stores/group'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import GroupFooter from '@/components/GroupFooter.vue'

const fileRecords = ref([])
const rawFileRecords = ref([])
const fileAgent = ref(null)
const { t } = useI18n()
const group = useGroupStore()
const createSnackbar = useSnackbar()
const router = useRouter()
const isSubmitting = ref(false)

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

const fileToBase64 = async (file) => {
  // 先做基本驗證
  if (!file) {
    throw new Error('沒有選擇檔案')
  }

  if (!file.type.match(/image\/(jpeg|png)/)) {
    throw new Error('檔案格式不支援')
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // 成功讀取
    reader.onload = () => resolve(reader.result)

    // 讀取失敗
    reader.onerror = () => reject(new Error('檔案讀取發生錯誤'))

    // 開始讀取檔案
    reader.readAsDataURL(file)
  })
}

const onSubmit = async () => {
  if (isSubmitting.value) return

  try {
    isSubmitting.value = true

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

    const allowedTypes = ['image/jpeg', 'image/png']
    if (!allowedTypes.includes(fileRecords.value[0].file.type)) {
      throw new Error('檔案格式必須是 JPG 或 PNG')
    }

    // 檢查檔案大小（1MB = 1024 * 1024 bytes）
    const maxSize = 1024 * 1024 // 1MB
    if (fileRecords.value[0].file.size > maxSize) {
      throw new Error('檔案大小不能超過 1MB')
    }

    // 將圖片轉為 base64
    const base64 = await fileToBase64(fileRecords.value[0].file)

    data.push({
      content: editorContent.value,
      image: base64,
    })
    group.setStep3(data)
    router.push('/creategroup/step4')
  } catch (error) {
    console.log(error)
    if (error.message === '檔案格式必須是 JPG 或 PNG') {
      createSnackbar({
        text: '檔案格式必須是 JPG 或 PNG',
        snackbarProps: {
          color: 'red',
        },
      })
    } else if (error.message === '檔案大小不能超過 1MB') {
      createSnackbar({
        text: '檔案大小不能超過 1MB',
        snackbarProps: {
          color: 'red',
        },
      })
    } else {
      createSnackbar({
        text: '上傳失敗',
        snackbarProps: {
          color: 'red',
        },
      })
    }
  } finally {
    isSubmitting.value = false
  }
}

// 將 base64 轉為 File 物件
const base64ToFile = (base64String, filename) => {
  // 1. 移除 base64 的前綴（例如：data:image/jpeg;base64,）
  const arr = base64String.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  // 2. 轉換為 ArrayBuffer
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  // 3. 建立 File 物件
  return new File([u8arr], filename, { type: mime })
}

onMounted(() => {
  if (group.hasData.resotre.step3) {
    const fileImage = base64ToFile(group.step3.image, 'image.jpg')
    editorContent.value = group.step3.content
    rawFileRecords.value = [{ file: fileImage }]
  }
})
</script>

<route lang="yaml">
meta:
  title: 'nav.groupCreate'
  login: true
</route>
