<template>
  <v-container class="h-100">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('member.index') }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<route lang="yaml">
meta:
  layout: members
  title: 'nav.memberIndex'
  login: true
</route>
