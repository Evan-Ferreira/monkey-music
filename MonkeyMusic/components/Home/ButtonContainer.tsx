import {
    View,
    Text,
    Animated,
    Easing,
    Pressable,
    StyleSheet,
} from 'react-native';
import { useRef, useEffect, useState, useContext } from 'react';
import transferPlaylist from '../../actions/transferPlaylist';
import { transferPlaylistContext } from '../../app/_layout';
import downloadSong from '../../controllers/downloadSong';

interface Props {
    setTransfer: (value: boolean) => void;
    transfer: boolean;
    inputText: string;
    setInputText: (value: string) => void;
}

export default function ButtonContainer({
    transfer,
    setTransfer,
    inputText,
    setInputText,
}: Props) {
    const opacity = useRef(new Animated.Value(0)).current;
    const [placeholder, setPlaceholder] = useState('');

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: transfer ? 1 : 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, [transfer]);

    const transferClick = async () => {
        setTransfer(true);
        const playlistInfo = await transferPlaylist(inputText);
        if (!playlistInfo) {
            setPlaceholder('Failed to transfer playlist');
        } else {
            setPlaceholder('');
            transferPlaylistName.setTransferedPlaylist(
                String(playlistInfo.playlistName)
            );
        }
        setInputText('');
    };

    const transferPlaylistName = useContext(transferPlaylistContext);

    return (
        <View style={styles.parentContainer}>
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
                            onPress={() => {
                                transferClick();
                            }}
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
                        onPress={() => {
                            setTransfer(true), { transfer };
                        }}
                    >
                        <Text
                            style={{
                                color: '#EEE',
                                fontFamily: 'Inter-SemiBold',
                            }}
                        >
                            {transfer
                                ? 'Transfer Now'
                                : 'Transfer Spotify Playlist'}
                        </Text>
                    </Pressable>
                )}
            </View>
            <Text style={styles.placeholderText}>{placeholder}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    parentContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        marginTop: 10,
        color: '#EEE',
        fontFamily: 'Inter-SemiBold',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
});
