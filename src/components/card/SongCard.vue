<template>
  <v-card flat outlined shaped class="fill-height">
    <v-row align="stretch" class="fill-height">
      <v-col v-if="updatedSong.album.picUrl" cols="2">
        <v-avatar class="ma-3" size="100" tile>
          <v-img :src="updatedSong.album.picUrl" :ref="updatedSong.album.pic || updatedSong.album.picId"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="1" :sm="!updatedSong.album.picUrl && 2">
        <v-card-actions>
          <v-btn @click="onSaveSong" class="ma-3 mt-2" fab icon height="40px" right width="40px">
            <v-icon v-if="updatedSong.isSaved">mdi-music-box</v-icon>
            <v-icon v-else>mdi-music-box-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
      <v-col>
        <v-card-title class="text-h5" v-text="updatedSong.name"></v-card-title>
        <v-card-subtitle>
          <v-row>
            <v-col cols="auto">
              <v-chip @change="onSaveSong" v-for="artist in updatedSong.artist" :key="artist.id" class="ma-2" label>
                {{ artist.name }}
              </v-chip>
            </v-col>
            <v-col>
              <v-select @change="onChangeState" :items="statusChoice" dense rounded hide-details chips solo flat
                :value="updatedSong.status"><template #selection="{ item }">
                  <v-chip color="primary" class="ma-2" label>{{
                    item.text
                  }}</v-chip>
                </template></v-select>
            </v-col>
          </v-row>
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
      statusChoice: [
        { text: "未选", value: "default" },
        { text: "好听", value: "listen" },
        { text: "想唱", value: "want" },
        { text: "会唱", value: "know" },
        { text: "唱得好", value: "good" },
        { text: "简直了", value: "great" },
      ],

      // updatedSong: {},
    };
  },
  computed: {
    songIdList: function () {
      return this.$store.state.songIdList;
    },
    songInfoList: function () {
      return this.$store.state.songDbInfoList;
    },
    updatedSong: function () {
      const song = this.song;
      let status = "default";

      this.songInfoList.forEach((songInfo) => {
        if (songInfo.index == song.id) {
          status = songInfo.status;
        }
      });
      const transformSong = {
        ...song,
        artist: song.artists ? song.artists : song.ar,
        album: song.album ? song.album : song.al,
        isSaved: this.songIdList.includes(song.id),
        status: status,
      };
      return transformSong;
    },
  },

  methods: {
    onSaveSong() {
      this.$store.commit("toggleSong", this.updatedSong.id);
      this.updatedSong.isSaved = !this.updatedSong.isSaved;
    },
    onChangeState(state) {
      this.$store.commit("changeSongStatus", {
        index: this.updatedSong.id,
        status: state,
      });
    },
  },
};
</script>
