<template>
  <v-app>
    <navbar />

    <v-main>
      <!-- <HelloWorld/> -->
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/bars/navbar.vue";
import { list_songs } from "./api/net-ease.js";

export default {
  name: "App",

  components: {
    Navbar,
    // HelloWorld,
  },

  mounted() {
    this.songList = list_songs("海阔天空");
  },

  data: () => ({
    //
  }),
};
</script>
