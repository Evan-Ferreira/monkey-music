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
    const sound = useRef<Audio.Sound | null>(null);

    const [loaded, error] = useFonts({
        'Inter-Bold': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_28pt-Bold.ttf'),
        'Inter-SemiBold': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_18pt-SemiBold.ttf'),
        'Inter-Regular': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_24pt-Regular.ttf'),
        'Inter-Light': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_18pt-Light.ttf'),
    });

    useEffect(() => {
        const configureAudio = async () => {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: true,
                interruptionModeIOS: InterruptionModeIOS.DuckOthers,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
                playThroughEarpieceAndroid: false,
            });
        };

        configureAudio();
    }, []);

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
            }
        };
        fetchData();
    }, [selectPlaylistName]);

    useEffect(() => {
        if (playlist.length > 0 && songContext === null) {
            setSongContext(playlist[currentSongIndex]);
        }
    }, [playlist]);

    useEffect(() => {
        const initializeSound = async () => {
            sound.current = new Audio.Sound();
            sound.current.setOnPlaybackStatusUpdate((status: any) => {
                if (status.didJustFinish) {
                    handleSkipSong();
                }
            });
        };
        initializeSound();
        return () => {
            if (sound.current) {
                sound.current.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        if (songContext) {
            handlePlaySong();
        }
    }, [songContext]);

    const handlePlaySong = async () => {
        if (!songContext || !sound.current) return;

        const songURI = qs.parse(songContext).uri as string;

        try {
            await sound.current.unloadAsync();
            await sound.current.loadAsync({ uri: songURI });
        } catch (error) {
            console.error('Error loading or playing track:', error);
        }
    };

    const handleSkipSong = () => {
        if (currentSongIndex < playlist.length - 1) {
            setCurrentSongIndex((prevIndex) => prevIndex + 1);
            setSongContext(playlist[currentSongIndex + 1]);
        } else {
            setCurrentSongIndex(0);
            setSongContext(playlist[0]);
        }
        setSongAction('play');
    };

    const handlePreviousSong = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex((prevIndex) => prevIndex - 1);
            setSongContext(playlist[currentSongIndex - 1]);
            setSongAction('play');
        }
    };

    const handleSongActionChange = (
        action: 'play' | 'pause' | 'skip' | 'back'
    ) => {
        if (action === 'skip') {
            handleSkipSong();
        } else if (action === 'pause') {
            sound.current?.pauseAsync();
        } else if (action === 'back') {
            handlePreviousSong();
        } else {
            handlePlaySong();
        }
    };

    useEffect(() => {
        handleSongActionChange(songAction);
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
                        setSongAction: handleSongActionChange,
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
