import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

export default function TopHalf() {
    return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        position: 'absolute',
    },
});
