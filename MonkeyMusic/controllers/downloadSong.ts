import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import noSpace from './noSpace';

const RAPID_API_KEY = process.env.EXPO_PUBLIC_RAPID_API_KEY;

const downloadMP3 = async (songName: string, videoID: string) => {
    const URL = await getDownloadLink(videoID);
    const videoName = noSpace(songName as string);
    const fileURI = `${FileSystem.documentDirectory}${videoName}.mp3`;
    const downloadResumable = FileSystem.createDownloadResumable(
        URL,
        fileURI,
        {},
        (downloadProgress) => {
            console.log('Download progress: ', downloadProgress);
        }
    );

    try {
        const { uri } = await downloadResumable.downloadAsync();
        console.log('Download completed: ', uri);
        return uri;
    } catch (error) {
        console.error('Download error: ', error);
        return null;
    }
};

const getDownloadLink = async (videoID: string) => {
    try {
        const response = await axios.get(
            'https://youtube-mp3-download1.p.rapidapi.com/dl',
            {
                params: { id: videoID },
                headers: {
                    'x-rapidapi-host': 'youtube-mp3-download1.p.rapidapi.com',
                    'x-rapidapi-key': RAPID_API_KEY,
                },
            }
        );
        return response.data.link;
        return 'https://mp3api.ytjar.info/mp3.php?id=NBtPMSLeLl59rA80SehdFNjh9AuXscMaCttfVmZW3Z07qdJikujPCyHCSAF%2BGw%3D%3D&return=0';
    } catch (error) {
        console.error(error);
    }
};

export default downloadMP3;
