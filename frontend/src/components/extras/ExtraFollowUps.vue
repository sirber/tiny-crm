<template>
  <div>
    <List :title="title" :columns="columns" :rows="extras" @headerButtonClicked="headerButtonClicked"
      @rowClicked="rowClicked"></List>

    <ExtraFollowUp v-if="isVisible" :extraEdit="extra" @save="itemSave" @remove="itemRemove" @cancel="itemCancel">
    </ExtraFollowUp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import List from "@/components/ui/CardList.vue";
import ExtraFollowUp from "@/components/extras/ExtraFollowUp.vue";

export default defineComponent({
  components: {
    List,
    ExtraFollowUp,
  },

  props: {
    extras: Array,
  },

  data: () => ({
    // List
    title: "Follow Ups",
    type: "followup",
    componentItem: "ExtraFollowUp",
    columns: [
      { label: "Date", field: "createdAt" },
      { label: "Follow At", field: "followUpAt" },
      { label: "Title", field: "title" },
    ],

    // Modal
    isVisible: false,
    extra: undefined,
  }),

  emits: ["saveExtra", "removeExtra"],

  methods: {
    headerButtonClicked(buttonName: string) {
      switch (buttonName) {
        case "Add":
          this.isVisible = true;
          break;

        default:
          throw "unhandled headerButtonClicked:" + buttonName;
      }
    },

    rowClicked(extra: any) {
      this.extra = extra;
      this.isVisible = true;
    },

    itemSave(extra: any) {
      this.$emit("saveExtra", extra);
      this.itemCancel();
    },

    itemRemove(extra: any) {
      this.$emit("removeExtra", extra);
      this.itemCancel();
    },

    itemCancel() {
      this.extra = undefined;
      this.isVisible = false;
    },
  },

});
</script>