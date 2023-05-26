<template>
  <v-container fluid>
    <v-card flat>
      <v-row>
        <v-col>
          <v-form @submit.prevent="onSearchSong">
            <v-text-field v-model="searchQuery" hide-details outlined single-line label="Search Song"
              prepend-icon="mdi-magnify"></v-text-field>
          </v-form>
        </v-col>
        <!-- <v-col cols="3">
          <v-btn @click="getHotList">
            热播榜
          </v-btn>
        </v-col> -->
      </v-row>

      <v-row v-if="songs.length != 0">
        <v-col v-for="song in songs" :key="song.id" cols="6" xs="12" md="6" lg="4" xl="3">
          <song-card :song="song" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import SongCard from "../card/SongCard.vue";
import { mapState, mapActions } from "vuex";

export default {
  data(): { searchQuery: string } {
    return {
      searchQuery: ""
    }
  },
  components: {
    SongCard
  },
  computed: mapState({
    songs: 'songResultsFromQuery'
  }),
  methods: {
    ...mapActions([
      'searchSongFromQuery',
    ]),
    onSearchSong() {
      this.searchSongFromQuery(this.searchQuery)
    }
  }
}
</script>
