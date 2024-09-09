import { View, ScrollView, StyleSheet } from 'react-native';
import Playlist from '@/components/Playlist/Playlist';
import { useContext, useEffect, useState } from 'react';
import { transferPlaylistContext } from '../../app/_layout';

export default function PlaylistScroll() {
    const [playlists, setPlaylists] = useState([]);
    const playlistName = useContext(transferPlaylistContext);

    useEffect(() => {
        if (playlistName.playlistName) {
            setPlaylists((prevPlaylists) => [
                ...prevPlaylists,
                playlistName.playlistName,
            ]);
        }
    }, [playlistName]);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {playlists.map((name, index) => (
                    <Playlist key={index} playlistName={name} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 150,
    },
});
