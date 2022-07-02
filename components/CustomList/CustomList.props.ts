import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Music } from '../../interfaces/music.interface';

export interface CustomListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    musics: Music[]
}