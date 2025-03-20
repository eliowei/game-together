<template>
    <v-container
      fluid
      style="
        background: linear-gradient(to bottom, #ffffff 0%, #f5f5f5 50%, #f5f5f5 50%, #ffffff 100%);
      "
      class="px-0"
    >
      <section
        class="w-100 mt-10 index__introduction mx-auto"
        style="margin-bottom: 110px; max-width: 1440px"
      >
        <v-row>
          <v-col cols="12">
            <p
              class="text-center mb-3 font-weight-bold index__introduction-title"
              style="font-size: 32px"
            >
              想找人一起玩遊戲嗎? 在遊戲揪團平台，你可以.......
            </p>
          </v-col>
          <v-col cols="10" offset="1" offset-sm="2" offset-md="1" offset-lg="1" offset-xl="1">
            <div class="d-flex flex-wrap justify-space-between">
              <v-card
                max-width="480"
                min-width="250"
                height="370"
                class="d-flex flex-column align-center justify-center index__introduction-card-left mb-5"
                style="flex: 0 1 480px"
              >
                <p class="font-weight-bold mb-5" style="font-size: 24px">主辦揪團</p>
                <v-icon icon="mdi-flag-outline" style="font-size: 50px"></v-icon>
                <p class="font-weight-bold mt-10 text-center" style="width: 305px; height: 70px">
                  找不到志同道合的夥伴一起玩遊戲嗎?
                  您可以自己當主揪，自己選擇類型、時間、地點、參與人數，發起您自己的揪團
                </p>
              </v-card>
              <v-card
                max-width="480"
                min-width="250"
                height="370"
                class="d-flex flex-column align-center justify-center index__introduction-card-right"
                style="flex: 0 1 480px"
              >
                <p class="font-weight-bold mb-5" style="font-size: 24px">加入揪團</p>
                <v-icon icon="mdi-account-group" style="font-size: 50px"></v-icon>
                <p class="font-weight-bold mt-10 text-center" style="width: 305px; height: 50px">
                  找不到志同道合的夥伴一起玩遊戲嗎?
                  您可以自己當主揪，自己選擇類型、時間、地點、參與人數，發起您自己的揪團
                </p>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>
</template>
