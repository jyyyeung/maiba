<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="song in songlist" :key="song.id" cols="6" sm="12" md="6" lg="4" xl="3">
        <song-card :song="song" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import SongCard from "../card/SongCard.vue";
import { mapActions, mapState } from 'vuex';

export default {
  computed: mapState([
    'songlistFirebase',
    'songlist'
  ]),
  components: {
    SongCard
  },
  methods: mapActions(['getSonglistDetails']),
  watch: {
    songlistFirebase: (val) => {
      console.log((val))
      // if (val[0]) {
      //   this.getSonglistDetails();
      // }
    }
  }
}

</script>
