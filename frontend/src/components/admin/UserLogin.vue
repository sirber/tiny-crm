<template>
  <form onsubmit="return false;">
    <Card :title="title" class="login">
      <FormInput label="Email" :focus="true" :value="user.email" @updateValue="updateEmail" />
      <FormInput label="Password" type="password" :value="user.password" @updateValue="updatePassword" />

      <div class="buttons">
        <button type="submit" class="button is-primary" @click="login">
          Login
        </button>
      </div>
    </Card>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from 'pinia';
import { useUserStore } from "@/stores/user"
import Card from "@/components/ui/Card.vue";
import FormInput from "@/components/ui/form/FormInput.vue";
import { useNotificationStore } from "@/stores/notification";

export default defineComponent({
  components: {
    Card,
    FormInput,
  },

  data: () => ({
    title: "Login",
    user: {
      email: "",
      password: "",
    },
  }),

  methods: {
    ...mapActions(useUserStore, ["doLogin"]),
    ...mapActions(useNotificationStore, ["notificationShow"]),

    updateEmail(email: string) {
      this.user.email = email;
    },

    updatePassword(password: string) {
      this.user.password = password;
    },

    login() {
      this.doLogin(this.user.email, this.user.password)
        .then(() => {
          this.$router.replace("/");
        })
        .catch(() => {
          this.notificationShow("Could not login", "error");
        });
    },
  },
});
</script>

<style>
.login {
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  width: 600px;
}
</style>