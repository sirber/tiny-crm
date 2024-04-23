<template>
  <CardList :title="title" :columns="columns" :rows="rows" @headerButtonClicked="headerButtonClicked"
    @rowClicked="rowClicked"></CardList>
</template>

<script lang="ts">
import { getPeople } from '@/api/routes/people';
import { defineComponent } from "vue";
import CardList from "@/components/ui/CardList.vue";
import { ActionButtons } from "@/constant";
import type { PersonDto } from '@/dtos/PersonDto';

export default defineComponent({
  components: {
    CardList,
  },

  props: {
    type: String,
  },

  data: () => ({
    rows: [] as PersonDto[],
    columns: [
      { label: "Last Name", field: "lastName" },
      { label: "First Name", field: "firstName" },
      { label: "Email", field: "email" },
      { label: "Phone", field: "phone.home" },
    ],
  }),

  computed: {
    title() {
      switch (this.type) {
        case "contact":
          return "Contacts";
        case "prospect":
          return "Prospects";
        case "customer":
          return "Customers";
        default:
          return "";
      }
    },
  },

  methods: {
    loadList() {
      getPeople()
        .then((people: PersonDto[]) => {
          this.rows = people
            .filter((person: PersonDto) => person.type == this.type);
        });
    },

    headerButtonClicked(buttonName: string) {
      switch (buttonName) {
        case ActionButtons.Add:
          this.$router.push(`/${this.type}/new`);
          break;

        default:
          throw "unhandled headerButtonClicked:" + buttonName;
      }
    },

    rowClicked(row: any) {
      this.$router.push(`/${this.type}/${row.id}`);
    },
  },

  watch: {
    $route() {
      this.loadList();
    },
  },

  mounted() {
    this.loadList();
  }
});
</script>
@/api/routes/people