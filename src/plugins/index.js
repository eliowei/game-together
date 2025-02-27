/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import i18n from '@/i18N'
import VuetifyUseDialog from 'vuetify-use-dialog'
import VueFileAgentNext from '@boindil/vue-file-agent-next'
import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import VueDOMPurifyHTML from 'vue-dompurify-html'

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(i18n)
    .use(pinia)
    .use(router)
    .use(VuetifyUseDialog, {
      snackbar: {
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
        },
      },
    })
    .use(VueFileAgentNext)
    .use(VueDOMPurifyHTML)
    .component('QuillEditor', QuillEditor)
}
