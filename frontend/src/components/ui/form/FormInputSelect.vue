<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="select">
      <select v-model="propModel">
        <option></option>
        <option v-for="option in options" :key="option.value" v-bind:value="option.value">
          {{ option.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { SelectOption } from "@/types/SelectOption";

export default defineComponent({
  props: {
    label: String,
    value: String,
    options: Array<SelectOption>,
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

<style>
div.select,
div.select>select {
  width: 100%;
}
</style>