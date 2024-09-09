import { View, Text, StyleSheet, Pressable } from 'react-native';
import Transfer from '@/components/Home/Transfer';

export default function TopHalf() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Monkey Music</Text>
            </View>
            <Transfer></Transfer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
    headerContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '50%',
    },
    header: {
        fontFamily: 'Inter-Bold',
        color: '#EEE',
        fontSize: 40,
    },
});
