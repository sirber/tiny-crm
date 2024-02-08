<template>
  <div>
    <CardEdit :title="title" :extraRow="true" :hideBack="true" @headerButtonClicked="headerButtonClicked">
      <div class="columns">
        <div class="column">
          <FormInput label="First Name" :focus="true" :value="user.firstName" @updateValue="updateFirstName" />
        </div>
        <div class="column">
          <FormInput label="Last Name" :value="user.lastName" @updateValue="updateLastName" />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <FormInput label="Email" :value="user.email" @updateValue="updateEmail" />
        </div>
        <div class="column">
          <FormSelect label="Default Business" :value="defaultBusinessId" :options="businessOptions" />
        </div>
      </div>

      <template v-slot:extraRow>
        <UserProfileBusinessVue />
      </template>
    </CardEdit>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapStores } from "pinia";
import { ActionButtons } from "@/constant";
import CardEdit from "@/components/ui/CardEdit.vue";
import FormInput from "@/components/ui/form/FormInput.vue";
import FormSelect from "@/components/ui/form/FormInputSelect.vue";
import { getProfile } from "@/api/profile";
import type { SelectOption } from "@/types/SelectOption";
import type { User } from "@/types/User";
import UserProfileBusinessVue from "./UserProfileBusiness.vue";
import { useExtraStore } from "@/stores/extra";
import { useUserStore } from "@/stores/user";

export default defineComponent({
  components: {
    CardEdit,
    FormInput,
    FormSelect,
    UserProfileBusinessVue
  },

  data: () => ({
    title: "Profile",

    user: {
      firstName: "",
      lastName: "",
      email: "",
    },
  }),

  computed: {
    ...mapStores(useUserStore),

    businessOptions(): SelectOption[] {
      const options = this.userStore.business
        .map((b: any) => ({
          title: b.name,
          value: b.id,
        }));

      return options;
    },

    defaultBusinessId: {
      get(): string {
        return this.userStore.business
          .find(b => b.isDefault)?.id
          || this.userStore.business[0].id;
      },

      set(id: string) {
        const business = this.userStore.business
          .find(b => b.id == id);

        if (business) {
          business.isDefault = true;
        }
      }
    },
  },

  methods: {
    ...mapActions(useExtraStore, ["setExtras"]),

    loadProfile() {
      getProfile()
        .then((profile: User) => {
          this.user.firstName = profile.firstName;
          this.user.lastName = profile.lastName;
          this.user.email = profile.email;

          this.setExtras(profile.extras);
        });
    },

    headerButtonClicked(button: string) {
      switch (button) {
        case ActionButtons.Save:
          // TODO: save!
          break;
      }
    },

    updateFirstName(firstName: string) {
      this.user.firstName = firstName;
    },

    updateLastName(lastName: string) {
      this.user.lastName = lastName;
    },

    updateEmail(email: string) {
      this.user.email = email;
    },
  },

  watch: {
    $route() {
      this.loadProfile();
    },
  },

  beforeMount: function () {
    this.loadProfile();
  },
});
</script>