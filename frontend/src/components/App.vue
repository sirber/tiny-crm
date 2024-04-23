<template>
  <div>
    <header>
      <NavBar />
    </header>
    <main class="content p-4">
      <Notification />
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/nav/NavBar.vue";
import Notification from "@/components/ui/Notification.vue";

export default defineComponent({
  name: "App",

  components: {
    NavBar,
    Notification,
  },
});
</script>

<style type="css">
html {
  overflow: hidden;
}

#app {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: url("@/assets/backgrounds/bg5.jpg") no-repeat center center fixed;
  background-size: cover;
}

#app .content {
  flex-grow: 1;
}
</style>
