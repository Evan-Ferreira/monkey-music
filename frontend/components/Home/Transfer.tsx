import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Animated,
    Easing,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import ButtonContainer from './ButtonContainer';

export default function Transfer() {
    const [transfer, setTransfer] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: transfer ? 1 : 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        Animated.timing(translateY, {
            toValue: transfer ? 0 : 20,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, [transfer]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.animatedContainer,
                    {
                        opacity,
                        transform: [{ translateY }],
                    },
                ]}
            >
                {transfer && (
                    <>
                        <Text style={styles.description}>
                            Please paste the link to your PUBLIC Spotify
                            playlist:
                        </Text>
                        <TextInput style={styles.input}></TextInput>
                    </>
                )}
            </Animated.View>
            <ButtonContainer
                setTransfer={setTransfer}
                transfer={transfer}
            ></ButtonContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '50%',
    },
    animatedContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    description: {
        fontFamily: 'Inter-Light',
        color: '#FFF',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: 300,
        height: 50,
        borderRadius: 5,
        marginVertical: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        color: '#FFF',
    },
});
