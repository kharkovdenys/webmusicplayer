import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Music, MusicMix } from '../../interfaces/music.interface';

export interface MusicListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    musics: Music[] | MusicMix[];
    afterDelete?: () => void;
    playlistId?: string;
}