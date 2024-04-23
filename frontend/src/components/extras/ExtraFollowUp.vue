<template>
  <Modal :title="title" @save="save" @cancel="cancel">
    <FormInput type="text" label="Title" :value="extra.title" :focus="true" @updateValue="updateTitle" />

    <FormInput type="date" label="Follow Up At" :value="extra.followUpAt" @updateValue="updateFollowUpAt" />

    <TextArea label="Note" :value="extra.note" @updateValue="updateNote" />
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Modal from '@/components/ui/Modal.vue';
import FormInput from '@/components/ui/form/FormInput.vue';
import TextArea from '@/components/ui/form/FormTextArea.vue';

export default defineComponent({
  components: {
    Modal,
    FormInput,
    TextArea,
  },

  props: {
    extraEdit: Object,
  },

  emits: ["save", "remove", "cancel"],

  data: () => ({
    title: "Add a follow up",
    extra: {
      id: "",
      title: "",
      followUpAt: "",
      note: "",
      type: 'followup',
      createdAt: "",
      updatedAt: "",
    },
  }),

  methods: {
    new() {
      this.extra = {
        id: "",
        title: "",
        followUpAt: "",
        note: "",
        type: 'followup',
        createdAt: "",
        updatedAt: "",
      };
    },

    updateTitle(title: string) {
      this.extra.title = title;
    },

    updateFollowUpAt(date: string) {
      this.extra.followUpAt = date;
    },

    updateNote(note: string) {
      this.extra.note = note;
    },

    edit() {
      this.extra = { ...this.extra, ...this.extraEdit };
    },

    remove() {
      this.$emit("remove", this.extra);
    },

    save() {
      if (!this.extra.id) {
        this.extra.id = uuidv4();
      }

      const now = dayjs().format("YYYY-MM-DD HH:mm:ss"); // TODO: be an helper

      this.extra.createdAt = now;
      this.extra.updatedAt = now;

      this.$emit("save", this.extra);
    },

    cancel() {
      this.$emit("cancel");
    },
  },
});
</script>