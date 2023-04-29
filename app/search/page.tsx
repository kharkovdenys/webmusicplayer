"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { MusicList, CircularProgress, Banner } from '../../components';

export default function SearchPage(): JSX.Element {
    const searchParams = useSearchParams();
    const { isInitialLoading, isError, data: musics } = useQuery(["musicsSearch", searchParams.get('')], ({ signal }) =>
        axios.post(`${process.env.NEXT_PUBLIC_SEARCH_API}/search`, { query: searchParams.get('') }, { signal }).then(res => res.data),
        { enabled: !!searchParams.get('') }
    );
    if (isInitialLoading)
        return <CircularProgress variant='for-list' />;
    if (isError || !musics || musics.length === 0)
        return <Banner>😑 Oops.. Nothing found</Banner>;
    return <MusicList musics={musics} />;
}