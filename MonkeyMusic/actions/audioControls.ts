import { Audio, AVPlaybackStatus } from 'expo-av';

export let sound: Audio.Sound | null = null;

export const initializeSound = async () => {
    sound = new Audio.Sound();
};

export const loadTrack = async (uri: string) => {
    if (!sound) return;
    try {
        await sound.unloadAsync();
        await sound.loadAsync({ uri });
    } catch (error) {
        console.error('Error loading track:', error);
    }
};

export const playTrack = async () => {
    if (!sound) return;
    try {
        await sound.playAsync();
    } catch (error) {
        console.error('Error playing track:', error);
    }
};

export const pauseTrack = async () => {
    if (!sound) return;
    try {
        await sound.pauseAsync();
    } catch (error) {
        console.error('Error pausing track:', error);
    }
};

export const unloadTrack = async () => {
    if (!sound) return;
    try {
        await sound.unloadAsync();
    } catch (error) {
        console.error('Error unloading track:', error);
    }
};

export const setPlaybackStatusListener = (
    onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void
) => {
    if (!sound) return;
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
};
