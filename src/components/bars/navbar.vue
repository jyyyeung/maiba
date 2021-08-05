<template>
  <!-- <v-card flat class="mx-auto overflow-hidden" width="256" height="400"> -->
  <v-card>
    <v-app-bar app color="deep-purple" tile dark>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Save Songlist</v-toolbar-title>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    toggleDrawer: Function,
  },
  data: () => ({
    drawer: true,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ],
    right: null,
  }),
};
</script>
