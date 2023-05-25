<template>
  <v-container fluid>
    <v-card flat>
      <v-row>
        <v-col>
          <SearchBar @song-name="onSearchSong" />
        </v-col>
        <!-- <v-col cols="3">
          <v-btn @click="getHotList">
            热播榜
          </v-btn>
        </v-col> -->
      </v-row>

      <v-row>
        <v-col v-for="song in result.songs" :key="song.id" cols="6" xs="12" md="6" lg="4" xl="3">
          <song-card :song="song" />
          <!-- <v-divider /> -->
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { list_songs } from "../../api/net-ease";
import SearchBar from "../bars/SearchBar.vue";
import SongCard from "../card/SongCard.vue";
export default {
  name: "SearchSong",
  components: {
    SearchBar,
    SongCard,
  },
  data() {
    return {
      search: {
        name: "",
      },
      result: {},
    };
  },
  methods: {
    onSearchSong(song_name) {
      this.search.name = song_name;
      this.songQuery();
    },
    async songQuery() {
      this.result = await list_songs(this.search.name);
      console.log(this.result);
    },
    // async getHotList() {
    //   this.result = await hot_list();
    //   console.log(this.result);
    // },
  },
};
</script>
