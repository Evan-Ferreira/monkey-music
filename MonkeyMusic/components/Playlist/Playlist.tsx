import { View, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

interface Props {
    imageURL: string;
}

export default function Playlist({ imageURL }: Props) {
    return (
        <Link href="/playlist">
            <View>
                <Image
                    style={styles.playlist}
                    source={{ uri: imageURL }}
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
