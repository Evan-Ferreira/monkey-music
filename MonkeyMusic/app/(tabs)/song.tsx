import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Pressable,
} from 'react-native';
import { Link } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { songPlayingContext } from '../../app/_layout';
import qs from 'qs';
import { playlistContext } from '../../app/_layout';

const Song = () => {
    const songContext = useContext(songPlayingContext);
    const playlistName = useContext(playlistContext);
    if (!songContext || !playlistName) {
        throw new Error('Context is not available');
    }
    const [trackName, setTrackName] = useState('');
    const [artist, setArtist] = useState('');
    const [playlist, setPlaylist] = useState('');
    useEffect(() => {
        const trackInfo = qs.parse(songContext.songContext);
        setTrackName((trackInfo.trackName as string) || '');
        setArtist((trackInfo.artist as string) || '');
        setPlaylist((playlistName.selectPlaylistName as string) || '');
    }, [songContext.songContext]);

    const handlePlay = () => {
        if (songContext.songAction === 'play') {
            songContext.setSongAction('pause');
        } else {
            songContext.setSongAction('play');
        }
    };

    const handleSkip = () => {
        songContext.setSongAction('skip');
    };

    const handlePrevious = () => {
        songContext.setSongAction('back');
    };
    return (
        <View style={styles.background}>
            <Image
                source={require('../../assets/images/blue_blob.png')}
                style={styles.blueBlob}
            />
            <Image
                source={require('../../assets/images/red_blob.png')}
                style={styles.redBlob}
            ></Image>
            <View style={styles.container}>
                <View style={styles.backContainer}>
                    <Link href="/(tabs)/playlist">
                        <Image
                            source={require('../../assets/images/back.png')}
                        ></Image>
                    </Link>
                </View>
                <Image
                    style={{ marginTop: '5%' }}
                    source={require('../../assets/images/shuffle.png')}
                ></Image>
                <Text style={styles.playlistHeader}>{playlist}</Text>
                <Image
                    style={styles.songArt}
                    source={require('../../assets/images/monke.jpg')}
                ></Image>
                <View style={styles.description}>
                    <Text style={styles.song}>{trackName}</Text>
                    <Text style={styles.artist}>{artist}</Text>
                </View>
                <View style={styles.progress}></View>
                <View style={styles.controls}>
                    <Pressable onPress={handlePrevious}>
                        <Image
                            source={require('../../assets/images/songBack.png')}
                        ></Image>
                    </Pressable>
                    <Pressable onPress={handlePlay}>
                        <Image
                            source={
                                songContext.songAction === 'play'
                                    ? require('../../assets/images/bigPause.png')
                                    : require('../../assets/images/songPlayRegular.png')
                            }
                        ></Image>
                    </Pressable>
                    <Pressable onPress={handleSkip}>
                        <Image
                            source={require('../../assets/images/songSkip.png')}
                        ></Image>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Song;

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#222',
        height: screenHeight,
        width: screenWidth,
    },
    redBlob: {
        position: 'absolute',
        bottom: '-40%',
        left: '-40%',
    },
    blueBlob: {
        position: 'absolute',
        top: '-40%',
        right: '-40%',
    },
    container: {
        flex: 1,
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    playlistHeader: {
        marginTop: '5%',
        color: '#EEE',
        fontSize: 25,
        fontFamily: 'Inter-Bold',
    },
    songArt: {
        marginTop: '5%',
        height: 300,
        width: 300,
    },
    song: {
        color: '#EEE',
        fontSize: 30,
        fontFamily: 'Inter-Bold',
    },
    artist: {
        color: '#EEE',
        fontSize: 20,
        fontFamily: 'Inter-Light',
    },
    description: {
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    progress: {
        backgroundColor: '#CCC',
        height: 5,
        width: '80%',
        marginTop: '15%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
        marginTop: '10%',
    },
    backContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%',
    },
});
