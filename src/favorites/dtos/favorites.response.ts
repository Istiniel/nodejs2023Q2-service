import { Album, Artist, Track } from "src/types";

export default interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}