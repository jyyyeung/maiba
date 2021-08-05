import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "./api/db";
import { song_details } from "./api/net-ease";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    songlistFirebase: [],
    songlist: [],
    songIdList: [],
    songDbInfoList: [],
    dbRef: db.collection("songlist").doc("0rsQhlGv6gcLX63RIvPc"),
  },
  mutations: {
    // other mutations
    ...vuexfireMutations,
    toggleSong(state, songId) {
      const newSongsList = state.songDbInfoList;
      if (!state.songIdList.includes(songId)) {
        newSongsList.push({ index: songId, status: "default" });
      } else {
        newSongsList.forEach((song, id) => {
          if (song.index == songId) {
            newSongsList.splice(id, 1);
          }
        });
      }
      state.dbRef.update({
        songs: newSongsList,
      });
    },
    changeSongStatus(state, songInfo) {
      const songId = songInfo.index;
      const newSongsList = state.songDbInfoList;

      newSongsList.forEach((song, id) => {
        if (song.index == songId) {
          newSongsList.splice(id, 1);
          newSongsList.push(songInfo);
        }
      });

      state.dbRef.update({
        songs: newSongsList,
      });
    },
  },
  actions: {
    bindSonglist: firestoreAction((context) => {
      return context.bindFirestoreRef(
        "songlistFirebase",
        db.collection("songlist")
      );
    }),
    getSonglistDetails: async ({ state }) => {
      if (state.songlistFirebase[0]) {
        const infoList = state.songlistFirebase[0].songs;
        let idList = [];
        infoList.forEach((song) => {
          idList.push(song.index);
        });
        const songDetailsList = await song_details(idList);
        state.songDbInfoList = infoList;
        state.songIdList = idList;
        state.songlist = songDetailsList;
      }
    },
  },
});

export default store;
