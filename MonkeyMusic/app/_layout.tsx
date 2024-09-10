import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, createContext, useState } from 'react';

SplashScreen.preventAutoHideAsync();

interface songPlayingContextType {
    songContext: string;
    setSongContext: (page: string) => void;
}

interface transferPlaylistContextType {
    playlistName: string;
    setPlaylistName: (name: string) => void;
}

interface playlistContextType {
    selectPlaylistName: string;
    setPlaylistName: (name: string) => void;
}

export const songPlayingContext = createContext<
    songPlayingContextType | undefined
>(undefined);

export const transferPlaylistContext = createContext<
    transferPlaylistContextType | undefined
>(undefined);

export const playlistContext = createContext<playlistContextType | undefined>(
    undefined
);

export default function RootLayout() {
    const [songContext, setSongContext] = useState('null');
    const [playlistName, setPlaylistName] = useState('');
    const [loaded, error] = useFonts({
        'Inter-Bold': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_28pt-Bold.ttf'),
        'Inter-SemiBold': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_18pt-SemiBold.ttf'),
        'Inter-Regular': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_24pt-Regular.ttf'),
        'Inter-Light': require('/Users/evanferreira/Documents/GitHub/monkey-music/MonkeyMusic/assets/fonts/Inter/Inter_18pt-Light.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }
    return (
        <transferPlaylistContext.Provider
            value={{ playlistName, setPlaylistName }}
        >
            <songPlayingContext.Provider
                value={{ songContext, setSongContext }}
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
    );
}
