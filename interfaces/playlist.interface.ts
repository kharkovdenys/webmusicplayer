import { Music } from "./music.interface";

export interface Playlist {
    title: string;
    count: string;
    playlistId: string;
    thumbnail: string;
    tracks: Music[];
}
