import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const Song = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/images/RBC.png')}
            ></Image>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Flashing Lights</Text>
                <Text style={styles.artist}>Kanye West</Text>
            </View>
        </View>
    );
};

export default Song;

const styles = StyleSheet.create({
    container: {
        marginTop: '5%',
        flexDirection: 'row',
        width: '90%',
        marginHorizontal: '10%',
        marginBottom: '-2%',
    },
    image: {
        width: 50,
        height: 50,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: '5%',
    },
    title: {
        color: '#EEE',
        fontSize: 17,
        fontFamily: 'Inter-Bold',
    },
    artist: {
        color: '#BBB',
        fontSize: 12,
        fontFamily: 'Inter-Light',
    },
});
