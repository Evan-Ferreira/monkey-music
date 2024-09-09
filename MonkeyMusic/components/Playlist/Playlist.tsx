import { View, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import RNFS from 'react-native-fs';

interface Props {
    playlistName: string;
}

export default function Playlist({ playlistName }: Props) {
    const coverArtPath = `file://${RNFS.DocumentDirectoryPath}/${playlistName}`;
    return (
        <Link href="/playlist">
            <View>
                <Image
                    style={styles.playlist}
                    source={{ uri: coverArtPath }}
                ></Image>
            </View>
        </Link>
    );
}

const styles = StyleSheet.create({
    playlist: {
        width: 150,
        height: 150,
        marginHorizontal: 15,
    },
});
