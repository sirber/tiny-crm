<template>
  <div class="columns">
    <div class="column">
      <Card :title="title" :headerButtons="buttons" @header-button-clicked="headerButtonClicked">
        <slot></slot>
      </Card>

      <slot name="extraRow"></slot>
    </div>
    <div class="column" v-if="!hideExtras">
      <Extras :extras="extras" @saveExtra="saveExtra" @removeExtra="removeExtra" />
    </div>
    <div class="column" v-if="extraColumn">
      <slot name="extraColumn"></slot>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/ui/Card.vue";
import Extras from "@/components/extras/ItemExtras.vue";
import type { Extra } from "@/types/Extra";

export default defineComponent({
  components: {
    Card,
    Extras,
  },

  data: () => ({
    routeId: null,
  }),

  props: {
    title: String,
    hideBack: Boolean,
    extras: Array<Extra>,
    hideExtras: Boolean,
    extraColumn: Boolean,
  },

  computed: {
    buttons() {
      const removeButton = { name: "Remove", class: "is-danger is-outlined" };

      const buttons = [
        { name: "Save", class: "is-primary" },
      ];

      if (!this.hideBack) {
        buttons.push(
          { name: "Back", class: "" },
        );
      }

      if (this.routeId && this.routeId != "new") {
        buttons.splice(1, 0, removeButton);
      }

      return buttons;
    },
  },

  emits: ["headerButtonClicked", "saveExtra", "removeExtra"],

  methods: {
    headerButtonClicked(buttonName: string) {
      this.$emit("headerButtonClicked", buttonName);
    },

    saveExtra(extra: Extra) {
      this.$emit("saveExtra", extra);
    },

    removeExtra(extra: Extra) {
      this.$emit("removeExtra", extra);
    },
  },

  watch: {
    "$route.params.id": {
      handler: function (id) {
        this.routeId = id;
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>

<style>

</style>