import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Song from '@/components/Playlist/Song';

const Songs = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
                <Song></Song>
            </ScrollView>
        </View>
    );
};

export default Songs;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '90%',
        minHeight: '100%',
        borderRadius: 20,
        overflow: 'hidden',
    },
});
