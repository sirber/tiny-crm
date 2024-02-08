<template>
  <div>
    <Card :title="title"> Hello! And welcome! </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/ui/Card.vue";

export default defineComponent({
  components: {
    Card,
  },

  data: () => ({
    title: "Essential Manager",
  }),
});
</script>

<style>

</style>