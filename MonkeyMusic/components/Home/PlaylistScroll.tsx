import { View, ScrollView, StyleSheet } from 'react-native';
import Playlist from '@/components/Playlist/Playlist';
import { useContext, useEffect, useState } from 'react';
import { transferPlaylistContext } from '../../app/_layout';
import downloadCoverArt from '@/controllers/downloadCoverArt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';

export default function PlaylistScroll() {
    const [playlists, setPlaylists] = useState([]);
    const transferPlaylist = useContext(transferPlaylistContext);

    useEffect(() => {
        const fetchData = async () => {
            if (transferPlaylist.transferedPlaylist) {
                let playlistInfo = await AsyncStorage.getItem(
                    transferPlaylist.transferedPlaylist
                );

                if (playlistInfo) {
                    const parsedInfo = qs.parse(playlistInfo);
                    const response = await downloadCoverArt(
                        transferPlaylist.transferedPlaylist,
                        parsedInfo.coverArt
                    );

                    if (response) {
                        parsedInfo.coverArt = response;
                        await AsyncStorage.setItem(
                            transferPlaylist.transferedPlaylist,
                            qs.stringify(parsedInfo)
                        );

                        setPlaylists((prevPlaylists) => [
                            ...prevPlaylists,
                            {
                                name: transferPlaylist.transferedPlaylist,
                                imageURL: response,
                            },
                        ]);
                    } else {
                        console.error('Failed to download cover art');
                    }
                } else {
                    console.error('No playlist info found in storage');
                }
            }
        };

        fetchData();
    }, [transferPlaylist.transferedPlaylist]);
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {playlists.map((playlist, index) => (
                    <Playlist
                        key={index}
                        name={playlist.name}
                        imageURL={playlist.imageURL}
                    />
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
