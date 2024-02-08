<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">Products</a>
    <div class="navbar-dropdown">
      <a class="navbar-item" href="#product" @click="clickMenu">Products</a>
      <a class="navbar-item" href="#transaction" @click="clickMenu">Transactions</a>
      <a class="navbar-item" href="#inventory" @click="clickMenu">Inventory</a>
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