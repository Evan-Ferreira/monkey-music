import axios from 'axios';
import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';

export default async function downloadCoverArt(playlistName, imageURL) {
    try {
        const fileName = `${playlistName}.jpg`;
        const downloadPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        const response = await axios({
            url: imageURL,
            method: 'GET',
            responseType: 'arraybuffer',
        });
        await RNFS.writeFile(downloadPath, response.data, 'base64');
    } catch (error) {
        console.error('Error downloading the image:', error);
    }
}
