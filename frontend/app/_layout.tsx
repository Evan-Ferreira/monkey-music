import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, createContext, useState } from 'react';

SplashScreen.preventAutoHideAsync();

interface songPlayingContextType {
    songContext: string;
    setSongContext: (page: string) => void;
}

export const songPlayingContext = createContext<
    songPlayingContextType | undefined
>(undefined);

export default function RootLayout() {
    const [songContext, setSongContext] = useState('null');
    const [loaded, error] = useFonts({
        'Inter-Bold': require('/Users/evanferreira/Documents/GitHub/monkey-music/frontend/assets/fonts/Inter/Inter_28pt-Bold.ttf'),
        'Inter-SemiBold': require('/Users/evanferreira/Documents/GitHub/monkey-music/frontend/assets/fonts/Inter/Inter_18pt-SemiBold.ttf'),
        'Inter-Regular': require('/Users/evanferreira/Documents/GitHub/monkey-music/frontend/assets/fonts/Inter/Inter_24pt-Regular.ttf'),
        'Inter-Light': require('/Users/evanferreira/Documents/GitHub/monkey-music/frontend/assets/fonts/Inter/Inter_18pt-Light.ttf'),
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
        <songPlayingContext.Provider value={{ songContext, setSongContext }}>
            <Stack
                screenOptions={{ headerShown: false }}
                initialRouteName="home"
            >
                <Stack.Screen name="home" options={{ headerShown: false }} />
            </Stack>
        </songPlayingContext.Provider>
    );
}
