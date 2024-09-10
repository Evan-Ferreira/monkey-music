import { View, ScrollView, StyleSheet } from 'react-native';
import Playlist from '@/components/Playlist/Playlist';
import { useContext, useEffect, useState } from 'react';
import { transferPlaylistContext } from '../../app/_layout';
import downloadCoverArt from '@/controllers/downloadCoverArt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';

export default function PlaylistScroll() {
    const [playlists, setPlaylists] = useState([]);
    const playlistName = useContext(transferPlaylistContext);
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (playlistName.playlistName) {
                setPlaylists((prevPlaylists) => [
                    ...prevPlaylists,
                    playlistName.playlistName,
                ]);
                let playlistInfo = await AsyncStorage.getItem(
                    playlistName.playlistName
                );

                if (playlistInfo) {
                    const parsedInfo = qs.parse(playlistInfo);
                    const response = await downloadCoverArt(
                        playlistName.playlistName,
                        parsedInfo.coverArt
                    );

                    if (response) {
                        setImageURL(response);
                        parsedInfo.coverArt = response;
                        await AsyncStorage.setItem(
                            playlistName.playlistName,
                            qs.stringify(parsedInfo)
                        );
                    } else {
                        console.error('Failed to download cover art');
                    }
                } else {
                    console.error('No playlist info found in storage');
                }
            }
        };

        fetchData();
    }, [playlistName]);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {playlists.map((name, index) => (
                    <Playlist key={index} imageURL={imageURL} />
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
