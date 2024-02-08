<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">Tools</a>
    <div class="navbar-dropdown">
      <a class="navbar-item" href="#expense" @click="clickMenu">Expenses</a>
      <a class="navbar-item" href="#travel" @click="clickMenu">Travels</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["menuClicked"],

  methods: {
    clickMenu() {
      this.$emit("menuClicked");
    },
  },
});
</script>

<style>

</style>