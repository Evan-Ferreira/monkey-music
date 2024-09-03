import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const PlaylistControls = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/images/shuffle.png')}
            ></Image>
            <Image
                style={[styles.image, { marginHorizontal: '10%' }]}
                source={require('../../assets/images/play.png')}
            ></Image>
            <Image
                style={styles.image}
                source={require('../../assets/images/download.png')}
            ></Image>
        </View>
    );
};

export default PlaylistControls;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {},
});
