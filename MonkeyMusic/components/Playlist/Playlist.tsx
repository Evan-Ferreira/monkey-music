import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { playlistContext } from '@/app/_layout';

interface Props {
    imageURL: string;
    name: string;
}

const Playlist: React.FC<Props> = ({ imageURL, name }) => {
    const selectPlaylistName = useContext(playlistContext);
    const click = () => {
        selectPlaylistName.setPlaylistName(name);
    };
    return (
        <Link href="/playlist" onPress={click}>
            <View>
                <Image style={styles.playlist} source={{ uri: imageURL }} />
            </View>
        </Link>
    );
};

const styles = StyleSheet.create({
    playlist: {
        width: 100,
        height: 100,
    },
});

export default Playlist;
