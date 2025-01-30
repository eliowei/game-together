<template>
  <div class="editor-container" ref="fileAgent">
    <div id="toolbar-container"></div>
    <div id="editor-container"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { createEditor, createToolbar } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'

const editor = ref(null)
const toolbar = ref(null)
const fileAgent = ref(null)

// 取得文字編輯器內容
const getContent = () => {
  return editor.value?.getHtml() || ''
}

defineExpose({
  getContent,
  editor,
})

onMounted(() => {
  // 建立編輯器實例
  editor.value = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: {
      placeholder: '請輸入內容...',
      MENU_CONF: {
        uploadImage: {
          // 自定義上傳按鈕點擊事件
          customUpload: async (file, insertFn) => {
            const formData = new FormData()
            formData.append('image', file)

            try {
              const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              })
              const data = await response.json()

              // 插入圖片到編輯器
              insertFn(data.data.url)
            } catch (error) {
              console.error('上傳失敗:', error)
            }
          },
        },
      },
    },
  })

  // 建立工具列
  toolbar.value = createToolbar({
    editor: editor.value,
    selector: '#toolbar-container',
    config: {
      toolbarKeys: [
        'headerSelect',
        'blockquote',
        '|',
        'bold',
        'underline',
        'italic',
        {
          key: 'group-more-style',
          title: '更多',
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>',
          menuKeys: ['through', 'code', 'sup', 'sub', 'clearStyle'],
        },
        'color',
        'bgColor',
        '|',
        'fontSize',
        'fontFamily',
        'lineHeight',
        '|',
        'bulletedList',
        'numberedList',
        'todo',
        {
          key: 'group-justify',
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
          menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
        },
        {
          key: 'group-indent',
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
          menuKeys: ['indent', 'delIndent'],
        },
        '|',
        'emotion',
        'insertLink',
        {
          key: 'group-image',
          title: '图片',
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
          menuKeys: ['uploadImage'],
        },
        'insertTable',
        'codeBlock',
        'divider',
        '|',
        'undo',
        'redo',
        '|',
        'fullScreen',
      ],
    },
  })
  console.log(toolbar.value.getConfig())
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style>
.editor-container {
  border: 1px solid #ccc;
}
#toolbar-container {
  border-bottom: 1px solid #ccc;
}
#editor-container {
  height: 500px;
}
</style>
