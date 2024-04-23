<template>
  <div class="notification" :class="{ 'is-danger': !isSuccess, 'is-success': isSuccess }" v-if="isVisible"
    @click="notificationHide">
    <button class="delete"></button>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNotificationStore } from "@/stores/notification";
import { mapActions, mapState } from "pinia";

let timeout: number | null = null;

export default defineComponent({
  data: () => ({
    isVisible: false,
  }),

  computed: {
    ...mapState(useNotificationStore, ["notificationMessage", "notificationType", "notificationVisible"]),

    isSuccess(): boolean {
      return this.notificationType == "success";
    },

    message(): string {
      return this.notificationMessage || "n/a";
    },
  },

  methods: {
    ...mapActions(useNotificationStore, ["notificationHide", "notificationShow"]),
  },

  watch: {
    notificationVisible(isVisible: boolean) {
      this.isVisible = isVisible;

      if (timeout) {
        clearTimeout(timeout);
      }

      if (isVisible && this.isSuccess) {
        timeout = window.setTimeout(() => this.notificationHide(), 5_000);
      }
    },
  },
});
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>