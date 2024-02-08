<template>
  <Modal :title="title" :isEdit="!!extra.id" @save="save" @cancel="cancel" @remove="remove">
    <FormInput type="text" label="Title" :value="extra.title" :focus="true" @updateValue="updateTitle" />
    <TextArea label="Note" :value="extra.note" @updateValue="updateNote" />
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Modal from "@/components/ui/Modal.vue";
import FormInput from "@/components/ui/form/FormInput.vue";
import TextArea from "@/components/ui/form/FormTextArea.vue";

export default defineComponent({
  components: {
    Modal,
    FormInput,
    TextArea,
  },

  props: {
    extraEdit: Object,
  },

  data: () => ({
    title: "Add a note",
    extra: {
      id: "",
      title: "",
      note: "",
      type: "note",
      createdAt: "",
      updatedAt: "",
    },
  }),

  emits: ["save", "remove", "cancel"],

  methods: {
    new() {
      this.extra = {
        id: "",
        title: "",
        note: "",
        type: "note",
        createdAt: "",
        updatedAt: "",
      };
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

    updateTitle(title: string) {
      this.extra.title = title;
    },

    updateNote(note: string) {
      this.extra.note = note;
    },
  },

  beforeMount() {
    const haveId = this.extraEdit?.id;
    haveId ? this.edit() : this.new();
  },
});
</script>