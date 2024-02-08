<template>
  <CardEdit :title="title" @headerButtonClicked="headerButtonClicked">
    <div class="columns">
      <div class="column">
        <FormInput label="First Name" :value="people.firstName" :focus="true" @updateValue="updateFirstName" />
      </div>
      <div class="column">
        <FormInput label="Last Name" :value="people.lastName" @updateValue="updateLastName" />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <FormInput label="Email" type="email" :value="people.email" @updateValue="updateEmail" />
      </div>
      <div class="column">
        <FormInput label="Birthday" type="date" :value="people.birthday" @updateValue="updateBirthday" />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <FormInput label="Home Phone" type="tel" :value="people.phone.home" @updateValue="updatePrimaryPhone" />
      </div>
      <div class="column">
        <FormInput label="Work Phone" type="tel" :value="people.phone.work" @updateValue="updateSecondaryPhone" />
      </div>
    </div>
  </CardEdit>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { v4 as uuidv4 } from "uuid";
import { ActionButtons } from "@/constant";
import CardEdit from "@/components/ui/CardEdit.vue";
import FormInput from "@/components/ui/form/FormInput.vue";
import { getPerson, addPerson, updatePerson } from "@/api/people";
import { useNotificationStore } from "@/stores/notification";
import { mapActions, mapState } from "pinia";
import { useExtraStore } from "@/stores/extra";
import { PersonDto } from "@/dtos/PersonDto";

export default defineComponent({
  components: {
    CardEdit,
    FormInput,
  },

  props: {
    type: String,
  },

  data: () => ({
    title: "People",
    people: new PersonDto(),
  }),

  computed: {
    ...mapState(useExtraStore, ["extras"]),
  },

  methods: {
    ...mapActions(useExtraStore, ["clearExtras", "setExtras"]),

    headerButtonClicked(buttonName: string) {
      const isNew = !this.people.id || this.people.id == "new";
      const notificationStore = useNotificationStore();

      switch (buttonName) {
        case ActionButtons.Save:
          this.people.type = this.type || "contact";
          this.people.extras = this.extras;

          if (isNew) {
            this.people.id = uuidv4();

            addPerson(this.people)
              .then((people) => {
                this.$router.replace(`/${this.type}/${people.id}`);
                notificationStore.notificationShow(`${this.type} added!`, "success");
              })
              .catch(() => {
                notificationStore.notificationShow(`Could not save ${this.type}`, "error");
              });
          } else {
            updatePerson(this.people)
              .then(() => {
                notificationStore.notificationShow(`${this.type} updated!`, "success");
              })
              .catch(() => {
                notificationStore.notificationShow(`Could not save ${this.type}`, "error");
              });
          }
          break;

        case ActionButtons.Back:
          this.$router.push(`/${this.type}`);
          break;
      }
    },

    loadPerson() {
      const id = this.$route.params?.id as string;

      if (!id || id == "new") {
        this.clearExtras();
        return;
      }

      getPerson(id)
        .then((people: PersonDto) => {
          this.people = people;
          this.setExtras(people.extras);
        })
        .catch(() => {
          this.$router.push("/error");
        });
    },

    // People
    updateFirstName(nameFirst: string) {
      this.people.firstName = nameFirst;
    },

    updateLastName(nameLast: string) {
      this.people.lastName = nameLast;
    },

    updateEmail(email: string) {
      this.people.email = email;
    },

    updateBirthday(birthday: string) {
      this.people.birthday = birthday;
    },

    updatePrimaryPhone(phone: string) {
      this.people.phone.home = phone;
    },

    updateSecondaryPhone(phone: string) {
      this.people.phone.work = phone;
    },
  },

  watch: {
    $route() {
      this.loadPerson();
    },
  },

  mounted() {
    console.log(this.people);
    this.loadPerson();
  },
});
</script>
