import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Song from '@/components/Playlist/Song';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs'; // Assuming that data is stored as a query string format

interface Props {
    playlistName: string;
}

const Songs = ({ playlistName }: Props) => {
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        const fetchPlaylistSongs = async () => {
            try {
                const playlistSongs = await AsyncStorage.getItem(playlistName);
                if (playlistSongs) {
                    const parsedTracks =
                        qs.parse(playlistSongs).allTracks || [];
                    setTracks(Object.values(parsedTracks));
                }
            } catch (error) {
                console.error('Error loading playlist:', error);
            }
        };
        fetchPlaylistSongs();
    }, [playlistName]);

    return (
        <View style={styles.container}>
            <ScrollView>
                {tracks.map((track, index) => (
                    <Song
                        key={index}
                        trackName={track.name}
                        artist={track.artist}
                        uri={track.uri}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Songs;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '90%',
        borderRadius: 20,
        overflow: 'hidden',
        paddingVertical: '2%',
    },
});
