import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Music } from '../../interfaces/music.interface';

export interface MusicListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    musics: Music[][];
    afterDelete?: () => void;
    playlistId?: string;
}