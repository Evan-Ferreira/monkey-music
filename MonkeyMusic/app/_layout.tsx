import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, createContext, useState, useRef } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';

SplashScreen.preventAutoHideAsync();

interface SongPlayingContextType {
    songContext: string;
    setSongContext: (name: string) => void;
    songAction: string;
    setSongAction: (action: 'play' | 'pause' | 'skip' | 'back') => void;
}

interface TransferPlaylistContextType {
    transferedPlaylist: string;
    setTransferedPlaylist: (name: string) => void;
}

interface PlaylistContextType {
    selectPlaylistName: string;
    setPlaylistName: (name: string) => void;
}

export const songPlayingContext = createContext<
    SongPlayingContextType | undefined
>(undefined);
export const transferPlaylistContext = createContext<
    TransferPlaylistContextType | undefined
>(undefined);
export const playlistContext = createContext<PlaylistContextType | undefined>(
    undefined
);

export default function RootLayout() {
    const [songContext, setSongContext] = useState<string | null>(null);
    const [transferedPlaylist, setTransferedPlaylist] = useState<string>('');
    const [selectPlaylistName, setPlaylistName] = useState<string>('');
    const [songAction, setSongAction] = useState<
        'play' | 'pause' | 'skip' | 'back'
    >('pause');
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
    const [playlist, setPlaylist] = useState<string[]>([]);
    const sound = useRef(new Audio.Sound());
    const [loaded, error] = useFonts({
        'Inter-Bold': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_28pt-Bold.ttf'),
        'Inter-SemiBold': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_18pt-SemiBold.ttf'),
        'Inter-Regular': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_24pt-Regular.ttf'),
        'Inter-Light': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_18pt-Light.ttf'),
    });
    const [currentSongURI, setCurrentSongURI] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await AsyncStorage.getItem(selectPlaylistName);
            if (data) {
                const playlistInfo = qs.parse(data);
                const playlistSongs = playlistInfo.allTracks as string[];
                setPlaylist(playlistSongs);
                console.log(playlistSongs);
            }
        };
        fetchData();
    }, [selectPlaylistName]);

    const handlePlaySong = async () => {
        if (!songContext) return;
        const songURI = qs.parse(playlist[currentSongIndex]).uri as string;
        try {
            await sound.current.unloadAsync();
            await sound.current.loadAsync({ uri: songURI });
            await sound.current.playAsync();
            setCurrentSongURI(songURI);
            setIsPlaying(true);
        } catch (error) {
            console.error('Error loading or playing track:', error);
        }
    };

    const handlePauseSong = async () => {
        if (isPlaying) {
            await sound.current.pauseAsync();
            setIsPlaying(false);
        }
    };

    const handleSkipSong = () => {
        if (currentSongIndex < playlist.length - 1) {
            const newIndex = currentSongIndex + 1;
            setCurrentSongIndex(newIndex);
            setSongContext(playlist[newIndex]);
        } else {
            setCurrentSongIndex(0);
            setSongContext(playlist[0]);
        }
        setSongAction('play');
    };

    const handlePreviousSong = () => {
        if (currentSongIndex > 0) {
            const newIndex = currentSongIndex - 1;
            setCurrentSongIndex(newIndex);
            setSongContext(playlist[newIndex]);
        } else {
            setCurrentSongIndex(playlist.length - 1);
            setSongContext(playlist[playlist.length - 1]);
        }
        setSongAction('play');
    };

    useEffect(() => {
        if (songAction === 'play') {
            handlePlaySong();
        } else if (songAction === 'pause') {
            handlePauseSong();
        } else if (songAction === 'skip') {
            handleSkipSong();
        } else if (songAction === 'back') {
            handlePreviousSong();
        }
    }, [songAction]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <playlistContext.Provider
            value={{ selectPlaylistName, setPlaylistName }}
        >
            <transferPlaylistContext.Provider
                value={{ transferedPlaylist, setTransferedPlaylist }}
            >
                <songPlayingContext.Provider
                    value={{
                        songContext,
                        setSongContext,
                        songAction,
                        setSongAction,
                    }}
                >
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="(tabs)/index"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(tabs)/playlist"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(tabs)/song"
                            options={{ headerShown: false }}
                        />
                    </Stack>
                </songPlayingContext.Provider>
            </transferPlaylistContext.Provider>
        </playlistContext.Provider>
    );
}
