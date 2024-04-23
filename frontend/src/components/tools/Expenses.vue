<template>
  <CardList :title="title" :columns="columns" :rows="rows" @headerButtonClicked="headerButtonClicked"
    @rowClicked="rowClicked"></CardList>
</template>

<script lang="ts">
import CardList from '@/components/ui/CardList.vue';

export default {
  components: {
    CardList,
  },

  data: () => ({
    title: "Expenses",
    columns: [],
    rows: [],
  }),

  methods: {
    headerButtonClicked(button: string) {
      console.log(button);
    },

    rowClicked(item: any) {
      console.log(item);
    },
  },
};
</script>