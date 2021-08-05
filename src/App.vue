<template>
  <v-app>
    <navbar :toggleDrawer="toggleDrawer" />

    <v-main>
      <v-tabs v-model="tab" centered>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#save">
          歌单
        </v-tab>

        <v-tab href="#search">
          寻找
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="save">
          <v-card flat>
            <songlist />
          </v-card>
        </v-tab-item>
        <v-tab-item value="search">
          <v-card flat>
            <SearchSong />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/bars/Navbar.vue";
import { list_songs } from "./api/net-ease.js";
import Songlist from "./components/page/Songlist.vue";
import SearchSong from "./components/page/SearchSong.vue";

export default {
  name: "App",

  components: {
    Navbar,
    Songlist,
    SearchSong,

    // HelloWorld,
  },

  mounted() {
    this.songList = list_songs("海阔天空");
  },

  data: () => ({
    drawer: true,
    tab: "save",
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>
