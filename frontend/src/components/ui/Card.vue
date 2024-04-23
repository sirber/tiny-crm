<template>
  <div class="card mb-4">
    <header class="card-header">
      <span class="card-header-title">
        {{ title }}
      </span>
      <div class="card-header-icon buttons">
        <input type="search" class="button is-small" placeholder="Search" v-if="showSearch" v-model="search" />

        <button type="button" class="button is-small" v-for="button in headerButtons" :key="button.name"
          :class="[button.class]" v-on:click="headerButtonClick(button.name)">
          {{ button.name }}
        </button>
      </div>
    </header>

    <div class="card-content">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    headerButtons: Array<any>,
    showSearch: Boolean,
  },

  data: () => ({
    search: "",
  }),

  emits: ["headerButtonClicked", "search"],

  watch: {
    search(newSearch: string) {
      this.$emit("search", newSearch);
    },
  },

  methods: {
    headerButtonClick(buttonName: string) {
      this.$emit("headerButtonClicked", buttonName);
    },
  },
});
</script>