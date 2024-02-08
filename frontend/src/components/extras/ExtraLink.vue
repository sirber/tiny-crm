<template>
  <Modal :title="title" @save="save" @cancel="cancel">
    <FormInput type="text" label="Title" :value="extra.title" :focus="true" @updateValue="updateTitle" />
    <FormInput type="url" label="Link" :value="extra.link" @updateValue="updateLink" />
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Modal from '@/components/ui/Modal.vue';
import FormInput from '@/components/ui/form/FormInput.vue';

export default defineComponent({
  components: {
    Modal,
    FormInput,
  },

  props: {
    extraEdit: Object,
  },

  emits: ["save", "remove", "cancel"],

  data: () => ({
    title: "Add a link",
    extra: {
      id: "",
      title: "",
      link: "",
      type: 'link',
      createdAt: "",
      updatedAt: "",
    },
  }),

  methods: {
    new() {
      this.extra = {
        id: "",
        title: "",
        link: "",
        type: 'link',
        createdAt: "",
        updatedAt: "",
      };
    },

    updateTitle(title: string) {
      this.extra.title = title;
    },

    updateLink(link: string) {
      this.extra.link = link;
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

  beforeMount() {
    const haveId = this.extraEdit?.id;
    haveId ? this.edit() : this.new();
  },
});
</script>