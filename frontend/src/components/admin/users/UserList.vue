<template>
  <CardList :title="title" :columns="columns" :rows="rows" @row-clicked="userClicked"
    @header-button-clicked="headerClicked" />
</template>

<script lang="ts">
import { getUsers } from '@/api/user';
import CardList from '@/components/ui/CardList.vue';
import type { User } from '@/types/User';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { CardList },

  data: () => ({
    title: "Users",
    columns: [
      { label: "Last Name", field: "lastName" },
      { label: "First Name", field: "firstName" },
      { label: "Email", field: "email" },
      { label: "Roles", field: "roles" },
    ],
    rows: [] as User[],
  }),

  methods: {
    loadList() {
      getUsers().then((users) => {
        this.rows = users;
      });
    },

    headerClicked(button: string) {
      switch (button) {
        case "Add":
          this.$router.push(`/admin/user/new`);
          break;
      }
    },

    userClicked(user: User) {
      this.$router.push(`/admin/user/${user.id}`);
    }
  },

  watch: {
    $route() {
      this.loadList();
    },
  },

  mounted() {
    this.loadList();
  },
});

</script>
