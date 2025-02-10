<template>
  <v-container-fluid>
    <v-row>
      <v-col cols="12"
        ><h2 class="text-center mb-2 mt-2">{{ $t('group.createSetp1') }}</h2>
        <v-progress-linear model-value="20" height="10" color="green-accent-4"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container-fluid>

  <v-container>
    <v-text-field
      v-model="name.value.value"
      :label="$t('group.name')"
      :error-messages="name.errorMessage.value"
      minLength="1"
    ></v-text-field>

    <v-text-field
      v-model="description.value.value"
      :label="$t('group.description')"
      :error-messages="description.errorMessage.value"
      minLength="1"
    ></v-text-field>

    <v-select
      v-model="type.value.value"
      :label="$t('group.type')"
      :items="typeItems"
      :error-messages="type.errorMessage.value"
      item-title="text"
      item-value="value"
      variant="solo"
    ></v-select>

    <v-select
      v-model="member_limit.value.value"
      :label="$t('group.memberLimit')"
      :items="memberLimitItems"
      :error-messages="member_limit.errorMessage.value"
      item-title="text"
      item-value="value"
    ></v-select>

    <v-select
      v-model="contact_method.value.value"
      :label="$t('group.contactMethod')"
      :items="['Line', 'Discord', 'Facebook']"
      :error-messages="contact_method.errorMessage.value"
      variant="solo"
    ></v-select>

    <v-text-field
      v-model="contact_info.value.value"
      :label="$t('group.contactInfo')"
      :error-messages="contact_info.errorMessage.value"
    ></v-text-field>

    <v-select
      v-model="city.value.value"
      :label="$t('group.city')"
      :error-messages="city.errorMessage.value"
      v-if="type.value.value === typeItems[1].value"
      :items="cityItems"
      item-title="text"
      item-value="value"
    ></v-select>

    <v-select
      v-model="region.value.value"
      :label="$t('group.region')"
      :error-messages="region.errorMessage.value"
      v-if="type.value.value === typeItems[1].value"
      :items="regionItems"
      item-title="text"
      item-value="value"
    ></v-select>

    <v-text-field
      v-model="address.value.value"
      :label="$t('group.address')"
      :error-messages="address.errorMessage.value"
      v-if="type.value.value === typeItems[1].value"
    ></v-text-field>

    <div class="d-flex align-center">
      <v-col cols="2">
        <span>{{ $t('group.time') }}</span>
      </v-col>

      <v-col cols="5">
        <VueDatePicker
          v-model="date.value.value"
          auto-apply
          :enable-time-picker="false"
          :format-locale="zhTW"
          hide-input-icon
          :format="format"
          :min-date="new Date()"
        ></VueDatePicker
      ></v-col>
      <v-col cols="2">
        <span>{{ $t('group.startTime') }}</span>
      </v-col>
      <v-col cols="2">
        <VueDatePicker
          v-model="time.value.value"
          time-picker
          hide-input-icon
          :select-text="$t('group.selectSure')"
          :cancel-text="$t('group.selectCancel')"
          :format="formatTime"
          :error-messages="time.errorMessage.value"
        ></VueDatePicker>
      </v-col>
    </div>
  </v-container>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import VueDatePicker from 'vue3-datepicker'

const { t } = useI18n()

const typeItems = computed(() => [
  { text: t('group.online'), value: '線上' },
  { text: t('group.offline'), value: '線下' },
])

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().required(),
  member_limit: yup.string().required(),
  contact_method: yup.string().required(),
  contact_info: yup.string().required(),
  city: yup.string().required(),
  region: yup.string().required(),
  address: yup.string().required(),
  date: yup.string().required(),
  time: yup.string().required(),
})


const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

// 表單欄位
const name = useField('name')
const description = useField('description')
const type = useField('type')
const member_limit = useField('member_limit')
const contact_method = useField('contact_method')
const contact_info = useField('contact_info')
const city = useField('city')
const region = useField('region')
const address = useField('address')
const date = useField('date')
const time = useField('time')


</script>

<route lang="yaml">
meta:
  title: 'nav.groupCreate'
  login: true
</route>
ㄋ
