import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Tophalf from '@/components/Playlist/TopHalf';
import BottomHalf from '@/components/Playlist/BottomHalf';
import { useContext } from 'react';
import { songPlayingContext } from './_layout';
import SongPeak from '../components/Song/SongPeak';

const Playlist = () => {
    const songContext = useContext(songPlayingContext);
    if (!songContext) {
        throw new Error('Context is not available');
    }
    return (
        <View style={styles.background}>
            <Image
                source={require('../assets/images/blue_blob.png')}
                style={styles.blueBlob}
            />
            <Image
                source={require('../assets/images/red_blob.png')}
                style={styles.redBlob}
            ></Image>
            <View style={styles.container}>
                <Tophalf></Tophalf>
                <BottomHalf></BottomHalf>
            </View>
            {songContext.songContext !== 'null' ? <SongPeak></SongPeak> : null}
        </View>
    );
};

export default Playlist;

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#222',
        height: screenHeight,
        width: screenWidth,
        position: 'absolute',
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
        position: 'relative',
    },
});
