import { View, Text, StyleSheet } from 'react-native';
import Songs from '@/components/Playlist/Songs';

interface Props {
    playlistSelected: string;
}

const BottomHalf = ({ playlistSelected }: Props) => {
    return (
        <View style={styles.container}>
            <Songs playlistName={playlistSelected}></Songs>
        </View>
    );
};

export default BottomHalf;

const styles = StyleSheet.create({
    container: {
        height: '50%',
        alignItems: 'center',
        borderRadius: 20,
    },
});
