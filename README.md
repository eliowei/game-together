# GameTogether 遊戲揪團平台

以 Vue 搭配 Vuetify UI框架製作的單頁式應用網站(SPA)，可觀看桌面板及平板版

### Demo:https://eliowei.github.io/game-together/

註:後端部屬在Render上，請稍後等待約30秒等待喚醒，便可正常操作。

相關連結: [Wireframe 線稿圖](https://www.figma.com/design/JbCRhjezMwJbiCL2esE0k1/%E9%81%8A%E6%88%B2%E6%8F%AA%E5%9C%98%E5%B9%B3%E5%8F%B0?node-id=0-1&t=CedlF5iGgoH3YaqW-1)、[後端](https://github.com/eliowei/game-together-back)


## 網站功能

### 參加者
- 瀏覽所有揪團
- 關鍵字搜尋、地區搜尋、標籤搜尋、日期搜尋
- 觀看詳細揪團資訊，參加別人主辦的揪團
- 揪團留言板
- 參加及收藏揪團
- 管理已參加及收藏的揪團
- 管理個人資訊

### 主辦者
- 根據網站提供步驟主辦揪團
- 主辦者管理自己主辦的揪團、編輯揪團資訊

### 管理者
- 管理揪團，新增、編輯、刪除揪團
- 管理會員，新增、編輯、刪除會員
- 管理聯絡表單，查看、編輯聯絡表單

## 專案技術
- Vite 環境建置
- Vue 3 Options API
- Vue Router 建構路由
- Pinia 全局狀態管理
- 元件拆分與使用
- Vue axios 串接 RESTful API資料
- ESLint + Prettier 統一程式碼結構
- Vuetify UI 框架
- VeeValidate 搭配 Yup 進行表單驗證，並輔以 validator 進行資料格式驗證
- vue-dompurify-html 避免XSS攻擊
- 後端採用 Node.js，結合 MongoDB 進行資料儲存與管理

## 使用的套件
| 套件名稱 | 主要功能 |
|-------|-------|
| Vuetify | Vue 的 UI 框架，提供豐富的元件和佈局系統 |
| VeeValidate, Yup, validator | 表單驗證，確保用戶輸入的資料正確性 |
| vue-dompurify-html | 防止 XSS 攻擊，過濾 HTML 資料 |
| Pinia, pinia-plugin-persistedstate | 狀態管理，與 localStorage 整合保持應用程式狀態 |
| Axios | HTTP 請求套件，與後端進行資料傳遞
| Prettier, ESLint + Prettier | 自動格式化程式碼，保持一致的程式碼風格 |
| Swiper | 輪播圖功能 |
| GSAP | 動畫套件 | 
| Vue Quill, quill-blot-formatter | 富文本編輯器，支持格式化文字和調整圖片大小 |
| FullCalendar | 行事曆功能，顯示和管理事件 |
| Vue I18n | 實現多語言國際化，讓應用程式支持不同語言版本 |