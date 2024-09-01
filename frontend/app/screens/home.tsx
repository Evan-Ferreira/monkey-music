import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';
import TopHalf from '@/components/Home/TopHalf';
import BottomHalf from '@/components/Home/BottomHalf';

export default function Home() {
    return (
        <View style={styles.background}>
            <Image
                source={require('../../assets/images/blue_blob.png')}
                style={styles.blueBlob}
            ></Image>
            <Image
                source={require('../../assets/images/red_blob.png')}
                style={styles.redBlob}
            ></Image>
            <View style={styles.container}>
                <TopHalf></TopHalf>
                <BottomHalf></BottomHalf>
            </View>
        </View>
    );
}

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
        position: 'relative',
    },
});
