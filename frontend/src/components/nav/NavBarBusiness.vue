<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">{{ title }}</a>
    <div class="navbar-dropdown">
      <a class="navbar-item" v-for="b in business" v-bind:key="b.id" @click="changeBusiness(b)">
        {{ b.name }}
      </a>
      <hr class="navbar-divider">
      <a class="navbar-item" href="#/business/users">Manage users</a>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import type { Business } from "@/types/Business";
import { mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["menuClicked"],

  data: () => ({
    title: "Business",
  }),

  computed: {
    ...mapState(useUserStore, ["business"]),
  },

  methods: {
    changeBusiness(business: Business) {
      // TODO: call backend to change business
      // TODO: refresh
      this.$emit("menuClicked");
    },
  },
});
</script>

<style></style>