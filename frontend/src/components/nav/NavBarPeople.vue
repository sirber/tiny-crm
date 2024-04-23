<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">People</a>
    <div class="navbar-dropdown">
      <a class="navbar-item" href="#contact" @click="clickMenu">Contacts</a>
      <a class="navbar-item" href="#prospect" @click="clickMenu">Prospects</a>
      <a class="navbar-item" href="#customer" @click="clickMenu">Customers</a>
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