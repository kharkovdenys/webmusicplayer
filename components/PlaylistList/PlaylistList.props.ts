import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Playlist } from '../../interfaces/playlist.interface';

export interface CustomListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    playlists: Playlist[];
}