<template>
  <v-card flat outlined shaped class="fill-height">
    <v-row align="stretch" class="fill-height">
      <v-col v-if="this.updatedSong.album.picUrl" cols="2">
        <v-avatar class="ma-3" size="100" tile>
          <v-img :src="this.updatedSong.album.picUrl"
            :ref="this.updatedSong.album.pic || this.updatedSong.album.picId"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="1" :sm="!this.updatedSong.album.picUrl && 2">
        <v-card-actions>
          <v-btn @click="onSaveSong" class="ma-3 mt-2" fab icon height="40px" right width="40px">
            <v-icon v-if="this.updatedSong.isSaved">mdi-music-box</v-icon>
            <v-icon v-else>mdi-music-box-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
      <v-col>
        <v-card-title class="text-h5" v-text="this.updatedSong.name"></v-card-title>
        <v-card-subtitle>
          <v-row>
            <v-col cols="auto">
              <v-chip @change="onSaveSong" v-for="artist in this.updatedSong.artist" :key="artist.id" class="ma-2" label>
                {{ artist.name }}
              </v-chip>
            </v-col>
            <v-col>
              <v-select @change="onChangeState" :items="statusChoice" dense rounded hide-details chips solo flat
                :value="this.updatedSong.status"><template #selection="{ item }">
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

<script lang="ts">
import { mapState, mapActions } from 'vuex';


export default {
  props: {
    song: Object
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
    }
  },
  computed: {
    ...mapState([
      'songIdlist',
      'songDbInfoList'
    ]),
    updatedSong(): SongTransformed {
      const song: SongTransformed = this.song;
      let status: string = "default";

      this.songInfoList.forEach((songInfo: StoreSongState) => {
        if (songInfo.index == song.id) {
          status = songInfo.status;
        }
      });
      const transformSong: SongTransformed = {
        ...song,
        artist: song.artists ? song.artists : song.ar,
        album: song.album ? song.album : song.al,
        isSaved: this.songIdList.includes(song.id),
        status: status,
      };
      return transformSong;
    }
  },
  methods: {
    ...mapActions(["toggleSong", 'changeSongStatus']),
    onSaveSong() {
      this.toggleSong(this.updatedSong.id)
    },
    onChangeState(status: string) {
      this.changeSongStatus({ index: this.updatedSong.id, status: status })
    }
  }
}



</script>
