import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
