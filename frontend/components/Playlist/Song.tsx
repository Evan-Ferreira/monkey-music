import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useState, useContext } from 'react';
import { songPlayingContext } from '../../app/_layout';

const Song = () => {
    const [press, setPress] = useState(false);
    const songContext = useContext(songPlayingContext);
    if (!songContext) {
        throw new Error('Context is not available');
    }
    return (
        <View
            style={[
                styles.container,
                press
                    ? {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    : {
                          backgroundColor: 'transparent',
                      },
            ]}
        >
            <Pressable
                onPressIn={() => {
                    setPress(true);
                    songContext.setSongContext('song');
                }}
                onPressOut={() => setPress(false)}
            >
                <View style={styles.innerWrapper}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/RBC.png')}
                    ></Image>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Flashing Lights</Text>
                        <Text style={styles.artist}>Kanye West</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default Song;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: '1.5%',
    },
    innerWrapper: {
        flexDirection: 'row',
        marginHorizontal: '10%',
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
