import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const YT_API_KEY = process.env.YT_API_KEY;

const findSongLink = async (songName: String) => {
    songName = songName + ' official audio';
    try {
        const response = await axios.get(
            'https://www.googleapis.com/youtube/v3/search',
            {
                params: {
                    part: 'snippet',
                    type: 'video',
                    maxResults: 1,
                    q: songName,
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

export default findSongLink;
