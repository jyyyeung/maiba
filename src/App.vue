<template>
  <v-app>
    <navbar />
    <v-main>
      <v-tabs v-model="tab" centered>
        <v-tab value="save">
          歌单
        </v-tab>
        <v-tab value="search">
          寻找
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="save">
          <v-card flat>
            <songlist />
          </v-card>
        </v-window-item>
        <v-window-item value="search">
          <v-card flat>
            <SearchSong />
          </v-card>
        </v-window-item>
      </v-window>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Navbar from "./components/bars/Navbar.vue";
import SearchSong from "./components/page/SearchSong.vue";
import Songlist from "./components/page/Songlist.vue";

export default {
  data(): { tab: string } {
    return {
      tab: 'save'
    }
  },
  components: {
    Songlist,
    Navbar,
    SearchSong
  }
}

</script>
