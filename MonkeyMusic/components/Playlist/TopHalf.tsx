import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import PlaylistControls from './PlaylistControls';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';

interface Props {
    imageURL: string;
    playlistSelected: string;
}

const TopHalf = ({ imageURL, playlistSelected }: Props) => {
    const [playlistName, setPlaylistName] = useState<string | null>(null);
    const [playlistCoverArt, setPlaylistCoverArt] = useState<string | null>(
        null
    );
    const [playlistTracks, setPlaylistTracks] = useState<any>(null);

    const getPlaylistInfo = async () => {
        try {
            const storedValue = await AsyncStorage.getItem(playlistSelected);
            if (storedValue) {
                const playlistInfo = qs.parse(storedValue);
                setPlaylistName(playlistInfo.playlistName as string);
                setPlaylistCoverArt(playlistInfo.coverArt as string);
                setPlaylistTracks(playlistInfo.tracks);
            }
        } catch (error) {
            console.error('Failed to load playlist info:', error);
        }
    };

    useEffect(() => {
        getPlaylistInfo();
    }, [playlistSelected]);

    return (
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <Link href="/(tabs)">
                    <Image source={require('../../assets/images/back.png')} />
                </Link>
            </View>
            {playlistName && <Text style={styles.header}>{playlistName}</Text>}
            {playlistCoverArt && (
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: playlistCoverArt }}
                    />
                </View>
            )}
            <PlaylistControls />
        </View>
    );
};

export default TopHalf;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
    },
    header: {
        fontFamily: 'Inter-Bold',
        color: '#EEE',
        fontSize: 30,
        textAlign: 'center',
        marginHorizontal: '5%',
    },
    image: {
        width: 150,
        height: 150,
    },
    imageContainer: {
        marginVertical: 20,
    },
    backContainer: {
        width: '85%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '5%',
        marginBottom: '5%',
    },
});
