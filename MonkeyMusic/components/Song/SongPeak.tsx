import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { songPlayingContext } from '../../app/_layout';
import qs from 'qs';

const SongPeak = () => {
    const songContext = useContext(songPlayingContext);
    if (!songContext) {
        throw new Error('Context is not available');
    }
    const [trackName, setTrackName] = useState('');
    const [artist, setArtist] = useState('');

    useEffect(() => {
        const trackInfo = qs.parse(songContext.songContext);
        setTrackName((trackInfo.trackName as string) || '');
        setArtist((trackInfo.artist as string) || '');
    }, [songContext.songContext]);

    const handlePlay = () => {
        if (songContext.songAction === 'play') {
            songContext.setSongAction('pause');
        } else {
            songContext.setSongAction('play');
        }
    };
    return (
        <View style={styles.container}>
            <Link href="/song">
                <View style={styles.textImageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/monke.jpg')}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{trackName}</Text>
                        <Text style={styles.artist}>{artist}</Text>
                    </View>
                </View>
            </Link>
            <View style={styles.songControls}>
                <Image source={require('../../assets/images/wavePlay.png')} />
                <Pressable onPress={handlePlay}>
                    <Image
                        style={{ paddingLeft: '10%' }}
                        source={
                            songContext.songAction === 'play'
                                ? require('../../assets/images/smallPause.png')
                                : require('../../assets/images/smallPlay.png')
                        }
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default SongPeak;

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: 'rgba(191, 191, 191, 1)',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
    title: {
        color: '#FFF',
        fontSize: 17,
        fontFamily: 'Inter-Bold',
    },
    artist: {
        color: '#FFF',
        fontSize: 13,
        fontFamily: 'Inter-Light',
    },
    image: {
        width: 65,
        height: 65,
    },
    textContainer: {
        marginHorizontal: '5%',
        justifyContent: 'center',
    },
    songControls: {
        flexDirection: 'row',
        marginLeft: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '20%',
    },
    textImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
