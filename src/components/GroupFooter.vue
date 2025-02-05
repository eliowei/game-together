<template>
  <v-footer>
    <v-container>
      <v-row class="d-flex justify-space-around">
        <v-col cols="4" class="d-flex align-center">
          <h1>GAME TOGETHER</h1>
        </v-col>
        <v-col cols="3">
          <h1>SITEMAP</h1>
          <v-list>
            <v-list-item-group>
              <v-list-item>
                <v-list-item-title>揪團列表</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>主辦揪團</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>會員專區</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>關於我們</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="3">
          <div class="d-flex flex-column">
            <h2 class="mb-4">COPYRIGHT</h2>
            <p>
              ©2025 GAME TOGETHER
              <br />
              BY BOWEI LI
              <br />
              All rights reserved.
            </p>
            <div class="d-flex mt-5">
              <button class="mr-5">
                <v-icon icon="mdi-facebook" size="x-large"></v-icon>
              </button>
              <button class="mr-5">
                <v-icon icon="mdi-instagram" size="x-large"></v-icon>
              </button>
              <button class="mr-5">
                <v-icon icon="mdi-twitter" size="x-large"></v-icon>
              </button>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
* {
  background: black;
  color: white;
}
</style>
