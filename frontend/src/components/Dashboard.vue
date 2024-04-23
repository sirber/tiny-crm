<template>
  <Columns>
    <Column>
      <DashFollowUps />
    </Column>
    <Column>
      <DashFollowUps />
    </Column>
    <Column>
      <DashFollowUps />
    </Column>
  </Columns>
  <div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Columns from '@/components/ui/Columns.vue';
import Column from '@/components/ui/Column.vue';
import DashFollowUps from "@/components/dashboard/DashFollowUps.vue";

export default defineComponent({
  components: {
    Columns,
    Column,
    DashFollowUps,
  }
});
</script>

<style>

</style>