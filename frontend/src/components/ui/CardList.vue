<template>
  <Card :title="title" :headerButtons="buttons" :showSearch="true" @header-button-clicked="headerButtonClicked"
    @search="doSearch">
    <DataTable :columns="columns" :rows="rows" :search="search" @rowClicked="rowClicked" />
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/ui/Card.vue";
import DataTable from "@/components/ui/DataTable.vue";

export default defineComponent({
  components: {
    Card,
    DataTable,
  },

  props: {
    title: String,
    columns: {
      type: Array,
      required: true,
    },
    rows: Array,
  },

  data: () => ({
    buttons: [{ name: "Add", class: "is-primary" }],
    search: "",
  }),

  emits: ["headerButtonClicked", "rowClicked"],

  methods: {
    headerButtonClicked(buttonName: string) {
      this.$emit("headerButtonClicked", buttonName);
    },

    rowClicked(row: any) {
      this.$emit("rowClicked", row);
    },

    doSearch(search: string) {
      this.search = search;
    },
  },
});
</script>
