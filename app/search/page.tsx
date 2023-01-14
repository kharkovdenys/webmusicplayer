"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { MusicList, CircularProgress, Banner } from '../../components';

export default function SearchPage(): JSX.Element {
    const searchParams = useSearchParams();
    const { isFetching, isLoading, isError, data: musics } = useQuery(["musicsSearch", searchParams.get('')], ({ signal }) =>
        axios.post('https://ytmusicsearch.azurewebsites.net/search', { query: searchParams.get('') }, { signal }).then(res => res.data),
        { enabled: !!searchParams.get('') }
    );
    if (isLoading && isFetching)
        return <CircularProgress variant='for-list' />;
    if (isError || !musics || musics.length === 0)
        return <Banner>😑 Oops.. Nothing found</Banner>;
    return <MusicList musics={musics} />;
}