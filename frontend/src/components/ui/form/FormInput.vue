<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <input class="input" ref="inputText" v-bind:type="type || 'text'" v-bind:required="required"
        v-model="propModel" />
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
    focus: Boolean,
    required: Boolean,
  },

  emits: ["updateValue"],

  computed: {
    propModel: {
      get() {
        return this.value;
      },

      set(value: string) {
        this.$emit("updateValue", value);
      },
    },
  },

  mounted() {
    if (this.focus) {
      const inputText = this.$refs.inputText as HTMLInputElement;
      inputText.focus();
    }
  },
});
</script>