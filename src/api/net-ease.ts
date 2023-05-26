import axios from "axios";

const net_ease: string = "https://netease-cloud-music-api-three-eta.vercel.app";

export const list_songs = (name: string) => {
  return new Promise((resolve, reject): CloudsearchResult | undefined | void => {
    axios
      .get(`${net_ease}/cloudsearch?keywords=${name}`)
      .then((response) => {
        const data: CloudsearchResult = response.data.result;
        console.log(data);
        return resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};

export const song_details = (songIdList: string) => {
  console.log(songIdList);
  return new Promise((resolve, reject) => {
    axios
      .get(`${net_ease}/song/detail?ids=${songIdList}`)
      .then((response) => {
        const data: Song[] = response.data.songs;
        console.log("song detail return data", data);
        return resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};

// export const hot_list = () => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`${net_ease}/search/hot/detail`)
//       .then((response) => {
//         const data = response.data.data;
//         console.log("song detail return data", data); 
//         return resolve(data);
//       })
//       .catch((error) => {
//         console.log(error);
//         reject();
//       });
//   });
// };
