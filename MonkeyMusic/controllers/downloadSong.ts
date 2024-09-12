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
        params: { id: 'ic8j13piAhQ' },
        headers: {
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        // return 'https://mbeta.123tokyo.xyz/get.php/0/57/ic8j13piAhQ.mp3?cid=MmEwMTo0Zjg6YzAxMDo5ZmE2OjoxfE5BfERF&h=zzNTMB4LDdOQpkc-qMdUEw&s=1726114800&n=Taylor%20Swift%20-%20Cruel%20Summer%20%28Official%20Audio%29';
        return response.data.link;
    } catch (error) {
        console.error(error);
    }
};

export default downloadMP3;
