import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

const SongPeak = () => {
    return (
        <View style={styles.container}>
            <Link href="/song">
                <Image
                    style={styles.image}
                    source={require('../../assets/images/RBC.png')}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Flashing Lights</Text>
                    <Text style={styles.artist}>Kanye West</Text>
                </View>
            </Link>
            <View style={styles.songControls}>
                <Image source={require('../../assets/images/wavePlay.png')} />
                <Image
                    style={{ paddingLeft: '10%' }}
                    source={require('../../assets/images/smallPlay.png')}
                />
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
        height: '100%',
    },
    songControls: {
        flexDirection: 'row',
        marginLeft: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '20%',
    },
});
