import { createContext, ReactNode, useState } from 'react';
import { Music } from '../interfaces/music.interface';

export interface IAppContext {
    playlist: Music[];
    current: number;
    setPlaylist?: (newMusics: Music[]) => void;
    setCurrent?: (newCurrent: number) => void;
}

export const AppContext = createContext<IAppContext>({ playlist: [], current: 0 });

export const AppContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [musicsState, setMusicsState] = useState<Music[]>([]);
    const [currentState, setCurrentState] = useState<number>(0);
    const setMusics = (newMusics: Music[]): void => {
        setMusicsState(newMusics);
    };
    const setCurrent = (newCurrent: number): void => {
        setCurrentState(newCurrent);
    };

    return <AppContext.Provider value={{ playlist: musicsState, setPlaylist: setMusics, current: currentState, setCurrent: setCurrent }}>
        {children}
    </AppContext.Provider>;
}; 