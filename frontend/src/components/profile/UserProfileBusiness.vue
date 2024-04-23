<template>
  <CardListVue :title="title" :columns="columns" :rows="business" />
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
import CardListVue from '../ui/CardList.vue';

export default defineComponent({
  components: {
    CardListVue,
  },

  data: () => ({
    title: "Business",
    columns: [
      { label: "Name", field: "name" },
      { label: "Created At", field: "createdAt" },
    ],
  }),

  computed: {
    ...mapState(useUserStore, ["business"]),
  }
});
</script>