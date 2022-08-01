import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Playlist } from '../../interfaces/playlist.interface';

export interface PlaylistListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    playlists: Playlist[];
    canDelete: boolean;
    update?: () => void;
}