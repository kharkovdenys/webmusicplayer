export interface Author {
    id: string;
    name: string;
}

export interface Thumbnail {
    height: number;
    url: string;
    width: number;
}

export interface Playlist {
    author: Author[];
    count: string;
    description: string;
    playlistId: string;
    thumbnails: Thumbnail[];
    title: string;
}
