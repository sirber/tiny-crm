import { ref } from 'vue'
import { defineStore } from 'pinia'

const noMessage = 'n/a'

type NotificationType = 'success' | 'error'

export const useNotificationStore = defineStore('notification', () => {
  const notificationVisible = ref(false)
  const notificationMessage = ref(noMessage)
  const notificationType = ref('success' as NotificationType)

  function notificationShow(message: string, type: NotificationType) {
    notificationMessage.value = message
    notificationType.value = type
    notificationVisible.value = true
  }

  function notificationHide() {
    notificationMessage.value = noMessage
    notificationVisible.value = false
  }

  return {
    notificationVisible,
    notificationMessage,
    notificationType,

    notificationHide,
    notificationShow
  }
})
