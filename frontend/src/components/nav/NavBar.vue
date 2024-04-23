<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#" @click="clickMenu">
        <img src="/favicon.png" width="28" height="28" />
      </a>
      <a v-bind:class="{ 'is-active': burgerActive }" v-on:click="clickBurger" role="button"
        class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbar" class="navbar-menu" v-bind:class="{ 'is-active': burgerActive }">
      <div class="navbar-start" v-if="isAuthenticated">
        <a class="navbar-item" href="#dashboard" @click="clickMenu">Dashboard</a>

        <nav-busniness @menuClicked="clickMenu"></nav-busniness>
        <nav-people @menuClicked="clickMenu"></nav-people>
        <nav-bar-product @menuClicked="clickMenu"></nav-bar-product>
        <nav-tools @menuClicked="clickMenu"></nav-tools>

        <a class="navbar-item" href="#report">Reports</a>
      </div>

      <div class="navbar-end" v-if="isAuthenticated">
        <nav-admin @menuClicked="clickMenu"></nav-admin>

        <div class="navbar-item">
          <div class="buttons">
            <a class="button" href="#profile" @click="clickMenu">Profile</a>
            <a class="button is-danger" @click="logOut">Log out</a>
          </div>
        </div>
      </div>

      <div class="navbar-end" v-else>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" href="#login" @click="clickMenu">Login</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";
import NavBusniness from "./NavBarBusiness.vue";
import NavPeople from "./NavBarPeople.vue";
import NavBarProduct from "./NavBarProduct.vue";
import NavTools from "./NavBarTools.vue";
import NavAdmin from "./NavBarAdmin.vue";
import { useUserStore } from "@/stores/user";

export default defineComponent({
  components: {
    NavBusniness,
    NavPeople,
    NavTools,
    NavBarProduct,
    NavAdmin,
  },

  data: () => ({
    burgerActive: false,
  }),

  computed: {
    ...mapState(useUserStore, ["isAdmin", "isAuthenticated"]),
  },

  methods: {
    ...mapActions(useUserStore, ["doLogout"]),

    clickBurger() {
      this.burgerActive = !this.burgerActive;
    },

    clickMenu() {
      this.burgerActive = false;
    },

    logOut() {
      this.clickMenu();

      this.doLogout();
      this.$router.push("/");
    },
  },
});
</script>

<style>

</style>