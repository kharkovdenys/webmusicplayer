export interface Music {
    album: ArtistsEntityOrAlbum;
    artists?: (ArtistsEntityOrAlbum)[] | null;
    length: string;
    thumbnail?: (ThumbnailEntity)[] | null;
    title: string;
    videoId: string;
    setVideoId?: string;
}
export interface ArtistsEntityOrAlbum {
    id: string;
    name: string;
}
export interface ThumbnailEntity {
    height: number;
    url: string;
    width: number;
}
export interface MusicMix {
    related: string;
    tracks: Music[];
}