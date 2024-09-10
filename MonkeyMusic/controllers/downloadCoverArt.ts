import * as FileSystem from 'expo-file-system';

export default async function downloadCoverArt(playlistName, imageURL) {
    try {
        const fileName = `${playlistName}.jpg`;
        const response = await FileSystem.downloadAsync(
            imageURL,
            FileSystem.documentDirectory + fileName
        );
        return response.uri;
    } catch (error) {
        console.error('Error downloading the image:', error);
        return null;
    }
}
