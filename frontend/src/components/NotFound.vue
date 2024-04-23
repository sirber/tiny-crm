<template>
  <Card title="Essential Manager" class="app-error"> Not found </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/ui/Card.vue";

export default defineComponent({
  components: {
    Card,
  },
});
</script>

<style>
div.app-error {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
}
</style>