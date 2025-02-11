import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGroupStore = defineStore(
  'createGroupData',
  () => {
    // 步驟1 揪團資訊
    const step1 = ref({
      name: '',
      description: '',
      type: '',
      member_limit: 0,
      contact_method: '',
      contact_info: '',
      city: '',
      region: '',
      address: '',
      date: '',
      time: '',
    })
    // 步驟2 揪團標籤
    const step2 = ref({
      tags: [],
    })
    // 步驟3 揪團詳情
    const step3 = ref({
      content: '',
      image: '',
    })

    const setStep1 = (value) => {
      step1.value.name = value.name
      step1.value.description = value.description
      step1.value.type = value.type
      step1.value.contact_method = value.contact_method
      step1.value.member_limit = value.member_limit
      step1.value.contact_info = value.contact_info
      step1.value.city = value.city
      step1.value.region = value.region
      step1.value.address = value.address
      step1.value.date = value.date
      step1.value.time = value.time
    }

    const setStep2 = (value) => {
      console.log(value)
      step2.value.tags = value
    }

    const setStep3 = (value) => {
      console.log(value)
      step3.value.content = value[0].content
      step3.value.image = value[0].image
    }

    const restData = () => {
      step1.value = {
        name: '',
        description: '',
        type: '',
        member_limit: 0,
        contact_method: '',
        contact_info: '',
        city: '',
        region: '',
        address: '',
        date: '',
        time: '',
      }
      step2.value = {
        tags: [],
      }
      step3.value = {
        content: '',
        image: '',
      }
    }

    return {
      step1,
      step2,
      step3,
      setStep1,
      setStep2,
      setStep3,
      restData,
    }
  },
  {
    persist: {
      key: 'createGroupData',
      pick: ['step1', 'step2', 'step3'],
    },
  },
)
