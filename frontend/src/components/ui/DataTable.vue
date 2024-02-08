<!-- 
    Simple DataTable for Vue 2.x and 3.x

    Features:
    - local data only
    - search
    - pagination
-->

<template>
  <div>
    <table class="dataTable table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.field" v-on:click="onHeaderClick(column.field)">
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody v-if="paginatedRows.length">
        <tr class="hand" v-for="row in paginatedRows" :key="row.id" v-on:click="onRowClick(row)">
          <td v-for="column in columns" :key="column.field">
            {{ row[column.field] || "--" }}
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="10">No data.</td>
        </tr>
      </tbody>
    </table>

    <div class="dataTableHeader level">
      <div class="level-right">
        <p class="level-item hand" v-for="page in pages" :key="page.id" v-on:click="onPageClick(page.id)">
          {{ page.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { assert } from "chai";

function searchRows(rows: Array<any> = [], searchPattern = "", columns: Array<any>) {
  if (!searchPattern.trim()) {
    return rows;
  }

  return rows.filter((row) => {
    for (let i = 0, n = columns.length; i <= n; i++) {
      let field = columns[i]?.field;
      if (
        field &&
        row[field]?.toLowerCase().search(searchPattern.toLowerCase()) >= 0
      ) {
        return true;
      }
    }

    return false;
  });
}

function paginateRows(rows: Array<any>, index = 0, length = 10) {
  assert.isArray(rows, "paginateRows() param rows is an array");
  return rows.slice(index, index + length);
}

function sortRows(rows: Array<any>, sortColumn: string, ascending: boolean = true) {
  // TODO: sort by column
  return rows;
}

export default defineComponent({
  props: {
    options: Object,
    columns: {
      type: Array<any>,
      required: true,
    },
    rows: Array<any>,
    search: String,
  },

  emits: ["rowClicked"],

  data: () => ({
    pageIndex: 0,
    pageLength: 10,
    ascending: true,
    sortColumn: "",
  }),

  computed: {
    searchedRows(): Array<any> {
      return searchRows(this.rows, this.search, this.columns);
    },

    sortedRows(): Array<any> {
      return sortRows(this.searchedRows, "", this.ascending);
    },

    paginatedRows(): Array<any> {
      return paginateRows(this.sortedRows, this.pageIndex, this.pageLength);
    },

    pages(): Array<any> {
      const nbPages = this.searchedRows.length / this.pageLength || 1;
      const pages = [];

      for (let i = 0; i < nbPages; i++) {
        pages.push({ id: i, text: i + 1 });
      }

      return pages;
    },
  },

  methods: {
    onHeaderClick(cell: any) {
      // TODO: sort row
      console.log(cell);
    },

    onRowClick(row: any) {
      this.$emit("rowClicked", row);
    },

    onPageClick(index: number) {

    },
  },
});
</script>

<style scoped>
.hand {
  cursor: pointer;
}
</style>