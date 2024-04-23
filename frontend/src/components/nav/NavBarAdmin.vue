<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">{{ title }}</a>
    <div class="navbar-dropdown">
      <a class="navbar-item" href="#/admin/user">Users</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    title: "Administration",
  }),

});
</script>