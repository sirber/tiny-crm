<template>
  <div>
    <ExtraNotes :extras="notes" @saveExtra="saveExtra" @removeExtra="removeExtra" />
    <ExtraLinks :extras="links" @saveExtra="saveExtra" @removeExtra="removeExtra" />
    <ExtraFollowUps :extras="followups" @saveExtra="saveExtra" @removeExtra="removeExtra" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { v4 as uuidv4 } from "uuid";
import ExtraNotes from "./ExtraNotes.vue";
import ExtraLinks from "./ExtraLinks.vue";
import ExtraFollowUps from "./ExtraFollowUps.vue";
import type { Extra } from "@/types/Extra";
import { useExtraStore } from "@/stores/extra";
import { mapActions, mapState } from "pinia";

export default defineComponent({
  components: {
    ExtraNotes,
    ExtraLinks,
    ExtraFollowUps,
  },

  computed: {
    ...mapState(useExtraStore, ["notes", "links", "followups"]),
  },

  methods: {
    ...mapActions(useExtraStore, ["save", "remove"]),

    saveExtra(extra: Extra) {
      if (!extra.id) {
        extra.id = uuidv4();
      }

      this.save(extra);
    },

    removeExtra(extra: Extra) {
      this.remove(extra);
    },
  },
});
</script>