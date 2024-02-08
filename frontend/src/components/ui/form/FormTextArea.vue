<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <textarea class="textarea" v-model="propModel"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: String,
    type: String,
    value: String,
  },

  emits: ['updateValue'],

  computed: {
    propModel: {
      get() {
        return this.value;
      },

      set(value: string) {
        this.$emit('updateValue', value);
      },
    },
  },
});
</script>