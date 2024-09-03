import {
    View,
    Text,
    Animated,
    Easing,
    Pressable,
    StyleSheet,
} from 'react-native';
import { useRef, useEffect } from 'react';

interface Props {
    setTransfer: (value: boolean) => void;
    transfer: boolean;
}

export default function ButtonContainer({ transfer, setTransfer }: Props) {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: transfer ? 1 : 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, [transfer]);

    return (
        <View style={styles.container}>
            {transfer && (
                <Animated.View
                    style={[
                        styles.animatedContainer,
                        {
                            opacity,
                        },
                    ]}
                >
                    <Pressable
                        style={styles.backButton}
                        onPress={() => setTransfer(false)}
                    >
                        <Text
                            style={{
                                color: '#EEE',
                                fontFamily: 'Inter-SemiBold',
                            }}
                        >
                            Go Back
                        </Text>
                    </Pressable>
                    <Pressable
                        style={styles.transferNowButton}
                        onPress={() => setTransfer(true)}
                    >
                        <Text
                            style={{
                                color: '#EEE',
                                fontFamily: 'Inter-SemiBold',
                            }}
                        >
                            Transfer Now
                        </Text>
                    </Pressable>
                </Animated.View>
            )}
            {!transfer && (
                <Pressable
                    style={styles.goTransferButton}
                    onPress={() => setTransfer(true)}
                >
                    <Text
                        style={{ color: '#EEE', fontFamily: 'Inter-SemiBold' }}
                    >
                        {transfer
                            ? 'Transfer Now'
                            : 'Transfer Spotify Playlist'}
                    </Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'relative',
    },
    goTransferButton: {
        borderColor: '#EEE',
        borderRadius: 5,
        borderWidth: 1,
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transferNowButton: {
        borderColor: '#EEE',
        borderRadius: 5,
        borderWidth: 1,
        width: '35%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '5%',
    },
    backButton: {
        borderColor: '#EEE',
        borderRadius: 5,
        borderWidth: 1,
        width: '35%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '5%',
    },
    animatedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
});
