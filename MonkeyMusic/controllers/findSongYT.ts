import axios from 'axios';

const YT_API_KEY = process.env.EXPO_PUBLIC_YT_API_KEY;

const findVideoID = async (songName: string, artistName: string) => {
    let newSongName = songName + ' ' + artistName + ' official audio';
    try {
        const response = await axios.get(
            'https://www.googleapis.com/youtube/v3/search',
            {
                params: {
                    part: 'snippet',
                    type: 'video',
                    maxResults: 1,
                    q: newSongName,
                    key: YT_API_KEY,
                },
            }
        );
        return response.data.items[0].id.videoId;
    } catch (error) {
        console.error('Failed to retrieve song:', error);
        return null;
    }
};

export default findVideoID;
