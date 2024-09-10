import { View, Image, Text, StyleSheet } from 'react-native';
import PlaylistControls from './PlaylistControls';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';

interface Props {
    imageURL: string;
    playlistSelected: string;
}

const TopHalf = async ({ imageURL, playlistSelected }: Props) => {
    const playlistInfo = qs.parse(await AsyncStorage.getItem(playlistSelected));
    return (
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <Link href="/(tabs)">
                    <Image
                        source={require('../../assets/images/back.png')}
                    ></Image>
                </Link>
            </View>
            <Text style={styles.header}>MONKEY WORKOUT 🦍</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: imageURL }} />
            </View>
            <PlaylistControls></PlaylistControls>
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
