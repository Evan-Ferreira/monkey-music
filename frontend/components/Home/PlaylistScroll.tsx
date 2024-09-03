import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';

export default function PlaylistScoll() {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View>
                    <Image
                        style={styles.playlist}
                        source={require('/Users/evanferreira/Documents/GitHub/monkey-music/frontend/assets/images/WealthSimple.png')}
                    ></Image>
                </View>
                <View>
                    <Image
                        style={styles.playlist}
                        source={require('/Users/evanferreira/Documents/GitHub/monkey-music/frontend/assets/images/AWS.png')}
                    ></Image>
                </View>
                <View>
                    <Image
                        style={styles.playlist}
                        source={require('/Users/evanferreira/Documents/GitHub/monkey-music/frontend/assets/images/RBC.png')}
                    ></Image>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    playlist: {
        width: 150,
        height: 150,
        marginHorizontal: 15,
    },
    container: {
        height: 150,
    },
});
