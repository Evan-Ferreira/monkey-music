import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { songPlayingContext } from '../../app/_layout';
import {
    initializeSound,
    loadTrack,
    playTrack,
    pauseTrack,
    unloadTrack,
    setPlaybackStatusListener,
} from '@/actions/audioControls';
import { playlistContext } from '../../app/_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';

interface Props {
    trackName: string;
    artist: string;
    uri: string;
}

const Song = ({ trackName, artist, uri }: Props) => {
    const [press, setPress] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const songContext = useContext(songPlayingContext);
    const playlistName = useContext(playlistContext);
    const songInfo = { trackName, artist, uri };
    if (!songContext || !playlistName) {
        throw new Error('Context is not available');
    }
    const handleClick = () => {
        setPress(true);
        songContext.setSongContext(qs.stringify(songInfo));
    };

    return (
        <View
            style={[
                styles.container,
                press
                    ? {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    : {
                          backgroundColor: 'transparent',
                      },
            ]}
        >
            <Pressable
                onPressIn={handleClick}
                onPressOut={() => setPress(false)}
            >
                <View style={styles.innerWrapper}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/monke.jpg')}
                    ></Image>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{trackName}</Text>
                        <Text style={styles.artist}>{artist}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default Song;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: '1.5%',
    },
    innerWrapper: {
        flexDirection: 'row',
        marginHorizontal: '10%',
    },
    image: {
        width: 50,
        height: 50,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: '5%',
    },
    title: {
        color: '#EEE',
        fontSize: 17,
        fontFamily: 'Inter-Bold',
    },
    artist: {
        color: '#BBB',
        fontSize: 12,
        fontFamily: 'Inter-Light',
    },
});
