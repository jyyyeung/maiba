<template>
  <v-card flat outlined shaped class="fill-height">
    <v-row align="stretch" class="fill-height">
      <v-col v-if="updatedSong.album.picUrl" cols="2">
        <v-avatar class="ma-3" size="100" tile>
          <v-img
            :src="updatedSong.album.picUrl"
            :ref="updatedSong.album.pic || updatedSong.album.picId"
          ></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="1" :sm="!updatedSong.album.picUrl && 2">
        <v-card-actions>
          <v-btn
            @click="onSaveSong"
            class="ml-2 mt-3"
            fab
            icon
            height="40px"
            right
            width="40px"
          >
            <v-icon v-if="updatedSong.isSaved">mdi-music-box</v-icon>
            <v-icon v-else>mdi-music-box-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
      <v-col>
        <v-card-title class="text-h5" v-text="updatedSong.name"></v-card-title>
        <v-card-subtitle>
          <v-chip
            v-for="artist in updatedSong.artist"
            outlined
            :key="artist.id"
            class="ma-2"
            label
          >
            {{ artist.name }}
          </v-chip>
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "SongCard",
  props: {
    song: Object,
  },
  data() {
    return {
      // updatedSong: {},
    };
  },
  computed: {
    songIdList: function() {
      return this.$store.state.songIdList;
    },
    updatedSong: function() {
      const song = this.song;
      const transformSong = {
        ...song,
        artist: song.artists ? song.artists : song.ar,
        album: song.album ? song.album : song.al,
        isSaved: this.songIdList.includes(song.id),
      };
      return transformSong;
    },
  },

  methods: {
    onSaveSong() {
      this.$store.commit("toggleSong", this.updatedSong.id);
      this.updatedSong.isSaved = !this.updatedSong.isSaved;
    },
  },
};
</script>
