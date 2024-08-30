import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const YT_API_KEY = process.env.YT_API_KEY;

interface SongName {
    trackName: string;
    artistName: string;
}

const findSongLink = async (songName: SongName) => {
    let newSongName =
        songName.trackName + ' ' + songName.artistName + ' official audio';
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

export default findSongLink;
