<template>
  <section class="w-100 index__steps mx-auto" style="max-width: 1440px; margin-bottom: 115px">
    <v-row>
      <v-col
        cols="10"
        offset="2"
        offset-sm="2"
        offset-md="1"
        offset-lg="1"
        offset-xl="1"
        sm="10"
        md="3"
        lg="3"
        xl="3"
        class="index__steps-content"
      >
        <div
          class="info d-flex flex-column font-weight-bold index__steps-content"
          style="max-width: 320px; min-width: 160px"
        >
          <div class="d-flex flex-column align-center">
            <p class="mb-5" style="font-size: 32px">五步驟，立刻主辦揪團</p>
            <p style="font-size: 20px">Step.1 填寫揪團資料</p>
            <div class="divider">
              <v-divider
                class="border-opacity-100 mt-5 mb-5"
                vertical
                style="height: 60px"
              ></v-divider>
            </div>
            <p style="font-size: 20px">Step.2 填寫揪團標籤</p>
            <div class="divider">
              <v-divider
                class="border-opacity-100 mt-5 mb-5"
                vertical
                style="height: 60px"
              ></v-divider>
            </div>
            <p style="font-size: 20px">Step.3 填寫揪團詳情</p>
            <div class="divider">
              <v-divider
                class="border-opacity-100 mt-5 mb-5"
                vertical
                style="height: 60px"
              ></v-divider>
            </div>
            <p style="font-size: 20px">Step.4 預覽揪團頁面</p>
            <div class="divider">
              <v-divider
                class="border-opacity-100 mt-5 mb-5"
                vertical
                style="height: 60px"
              ></v-divider>
            </div>
            <p style="font-size: 20px">Step.5 主辦揪團成功!</p>
          </div>
          <v-col cols="12" offset="5">
            <v-btn
              append-icon="mdi-arrow-right"
              :to="'/creategroup/step1/'"
              max-width="200"
              min-width="125"
              max-height="50"
              min-height="40"
              class="mt-4"
              >主辦揪團</v-btn
            >
          </v-col>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6" xl="6" offset-md="1">
        <v-img
          src="@/assets/section-image.jpg"
          height="600"
          width="900"
          class="index__steps-img"
        ></v-img>
      </v-col>
    </v-row>
  </section>
</template>
