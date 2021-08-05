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
    dbRef: db.collection("songlist").doc("0rsQhlGv6gcLX63RIvPc"),
  },
  mutations: {
    // other mutations
    ...vuexfireMutations,
    toggleSong(state, songId) {
      const newSongsList = state.songIdList;
      if (!newSongsList.includes(songId)) {
        newSongsList.push(songId);
      } else {
        newSongsList.splice(newSongsList.indexOf(songId), 1);
      }
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
        const idList = state.songlistFirebase[0].songs;
        const songDetailsList = await song_details(idList);
        state.songIdList = idList;
        state.songlist = songDetailsList;
        console.log("store", songDetailsList);
      }
    },
  },
});

export default store;
