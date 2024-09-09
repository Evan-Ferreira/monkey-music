import { View, Text, StyleSheet } from 'react-native';
import Songs from '@/components/Playlist/Songs';

const BottomHalf = () => {
    return (
        <View style={styles.container}>
            <Songs></Songs>
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
