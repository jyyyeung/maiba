
import { createStore, Store } from "vuex";
// import { vuexfireMutations, firestoreAction } from "vuefire";
import { db } from "./api/db";
import { InjectionKey } from "vue";
import { doc } from "firebase/firestore";
import axios from "axios";

export interface State {
  songDetailsFromIds: Song[];
  songlistFirebase: [];
  songlist: Song[];
  songIdList: number[];
  songDbInfoList: StoreSongState[];
  dbRef: any
  songResultsFromQuery: Song[]

}

export const key: InjectionKey<Store<State>> = Symbol()
const net_ease: string = "https://netease-cloud-music-api-three-eta.vercel.app";

export const store = createStore<State>({
  state: {
    songlistFirebase: [],
    songlist: [],
    songIdList: [],
    songDbInfoList: [],
    dbRef: doc(db, "songlist", "0rsQhlGv6gcLX63RIvPc"),
    songResultsFromQuery: []
  },
  mutations: {
    // other mutations
    // ...vuexfireMutations,
    toggleSong(state: State, songId: number): void {
      const newSongsList: StoreSongState[] = state.songDbInfoList;
      if (!state.songIdList.includes(songId)) {
        newSongsList.push({ index: songId, status: "default" });
      } else {
        newSongsList.forEach((song: StoreSongState, id: number): void => {
          if (song.index == songId) {
            newSongsList.splice(id, 1);
          }
        });
      }
      state.dbRef.update({
        songs: newSongsList,
      });
    },
    changeSongStatus(state: State, songInfo: StoreSongState): void {
      const songId: number = songInfo.index;
      const newSongsList: StoreSongState[] = state.songDbInfoList;

      newSongsList.forEach((song: StoreSongState, id: number): void => {
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
    // bindSonglist: firestoreAction((context) => {
    //   return context.bindFirestoreRef(
    //     "songlistFirebase",
    //     collection(db, "songlist")
    //   );
    // }),
    getSonglistDetails: async ({ state }: { state: State }) => {
      if (state.songlistFirebase[0]) {
        const infoList = state.songlistFirebase[0].songs;
        let idList: number[] = [];
        infoList.forEach((song: StoreSongState) => {
          idList.push(song.index);
        });
        const songDetailsList: Song[] = state.songResultsFromQuery;
        state.songDbInfoList = infoList;
        state.songIdList = idList;
        state.songlist = songDetailsList;
      }
    },
    searchSongFromQuery: ({ state }: { state: State }, name: String) => {
      console.log(name)
      axios.get(`${net_ease}/cloudsearch?keywords=${name}`).then((response) => {
        const data: CloudsearchResult = response.data.result;
        console.log(data.songs)
        state.songResultsFromQuery = data.songs;
      }).catch((error) => {
        console.error(error);
      })
    },
    get_songs_from_ids: ({ state }: { state: State }, songIdList: string) => {
      axios
        .get(`${net_ease}/song/detail?ids=${songIdList}`)
        .then((response) => {
          const data: Song[] = response.data.songs;
          console.log("song detail return data", data);
          state.songDetailsFromIds = data;

        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
});

export default store;
