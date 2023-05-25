<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="song in songlist" :key="song.id" cols="6" sm="12" md="6" lg="4" xl="3">
        <song-card :song="song" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongCard from "../card/SongCard.vue";

export default {
  components: { SongCard },
  name: "Songlist",
  data() {
    return {
      // songlistFirebase: [],
      // songlist: [],
    };
  },
  mounted() {
    console.log(this.$store.state.songlist);
    this.$store.dispatch("bindSonglist");
  },
  watch: {
    songlistFirebase: function (val) {
      if (val[0]) {
        this.$store.dispatch("getSonglistDetails");
      }
    },
  },
  computed: {
    songlistFirebase: function () {
      return this.$store.state.songlistFirebase;
    },
    songlist: function () {
      return this.$store.state.songlist;
    },
  },
};
</script>
