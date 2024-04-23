<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <span class="modal-card-title">{{ title || "Modal" }}</span>
        <button class="delete" aria-label="close" v-on:click="cancel"></button>
      </header>

      <section class="modal-card-body">
        <slot></slot>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-success" v-on:click="save">Save</button>
        <button class="button is-danger is-outlined" v-if="isEdit" v-on:click="remove">
          Remove
        </button>
        <button class="button" v-on:click="cancel">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    isEdit: Boolean,
  },

  emits: ["save", "remove", "cancel"],

  methods: {
    save() {
      this.$emit("save");
    },

    remove() {
      this.$emit("remove");
    },

    cancel() {
      this.$emit("cancel");
    },
  },
});
</script>