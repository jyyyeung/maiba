import axios from "axios";

const net_ease = "https://netease-cloud-music-api-three-eta.vercel.app";

export const list_songs = (name) => {
  axios.get(`${net_ease}/search?keywords=${name}`).then((response) => {
    const data = response.data.result;
    console.log(data);
    return data;
  });
};

export const song_details = (songId) => {
  axios.get(`${net_ease}/song/detail?ids=${songId}`).then((response) => {
    const data = response.data.result;
    console.log(data);
    return data;
  });
};
