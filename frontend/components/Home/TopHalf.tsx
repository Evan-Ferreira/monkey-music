import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function TopHalf() {
    return (
        <View style={styles.topContainer}>
            <Text style={styles.header}>Monkey Music</Text>
            <Pressable style={styles.button}>
                <Text style={{ color: '#EEE', fontFamily: 'Inter-SemiBold' }}>
                    Transfer Spotify Playlist
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '50%',
        width: '100%',
        position: 'absolute',
    },
    header: {
        fontFamily: 'Inter-Bold',
        color: '#EEE',
        fontSize: 40,
    },
    button: {
        borderColor: '#EEE',
        borderRadius: 5,
        borderWidth: 1,
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
