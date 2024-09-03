import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import PlaylistScroll from '@/components/Home/PlaylistScroll';

export default function BottomHalf() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>EXISTING PLAYLISTS</Text>
            <PlaylistScroll></PlaylistScroll>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontFamily: 'Inter-Regular',
        letterSpacing: 3,
        color: '#C2C2C2',
        marginBottom: 30,
    },
});
