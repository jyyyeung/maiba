interface Artist {
  id: number
  name: string
  tns: any[]
  alias: any[]
}

interface Album {
  id: number
  name: string
  picUrl: string
  tns: any[]
  pic_str: string
  pic: number
}

interface Song {
  name: string
  id: number
  ar: Artist[]
  alia: string[]
  pop: number
  al: Album
}

interface SongTransformed extends Song {
  artist?: Artist[]
  artists?: Artist[]
  album: Album
  isSaved: boolean
  status: string

}

interface CloudsearchResult {
  songs: Song[]
  songCount: number
}

interface StatusChoice {
  text: string
  value: string
}

interface StoreSongState {
  index: number
  status: string
}
