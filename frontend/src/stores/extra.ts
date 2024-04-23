import { defineStore } from 'pinia'
import type { Extra } from '@/types/Extra'

export const useExtraStore = defineStore({
  id: 'extra',

  state: () => ({
    extras: [] as Extra[]
  }),

  getters: {
    extrasAsJson: (state) => JSON.stringify(state.extras),
    notes: (state) => state.extras.filter((extra: Extra) => extra.type == 'note'),
    links: (state) => state.extras.filter((extra: Extra) => extra.type == 'link'),
    followups: (state) => state.extras.filter((extra: Extra) => extra.type == 'followup')
  },

  actions: {
    clearExtras() {
      this.extras = []
    },

    setExtras(extras: Array<Extra>) {
      this.clearExtras()

      if (!extras) {
        return
      }

      this.extras = extras
    },

    save(extra: Extra) {
      const index = this.extras.findIndex((e: Extra) => e.id == extra.id)

      if (index != -1) {
        this.extras[index] = extra
      } else {
        this.extras.push(extra)
      }
    },

    remove(extra: Extra) {
      const index = this.extras.findIndex((e: Extra) => e.id == extra.id)

      if (index == -1) {
        return
      }

      this.extras.splice(index, 1)
    }
  }
})
