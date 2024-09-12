import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import noSpace from './noSpace';

const RAPID_API_KEY = process.env.EXPO_PUBLIC_RAPID_API_KEY;

const downloadMP3 = async (songName: string, videoID: string) => {
    const URL = await getDownloadLink(videoID);
    const videoName = noSpace(songName as string) + '.mp3';
    const response = await FileSystem.downloadAsync(
        URL,
        FileSystem.documentDirectory + videoName
    );
    return response.uri;
};

const getDownloadLink = async (videoID: string) => {
    const options = {
        method: 'GET',
        url: 'https://youtube-mp36.p.rapidapi.com/dl',
        params: { id: videoID },
        headers: {
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        return response.data.link;
    } catch (error) {
        console.error(error);
    }
};

export default downloadMP3;
