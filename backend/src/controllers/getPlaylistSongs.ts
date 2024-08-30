import { URL } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SPOTIFY_ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN;

export const getPlaylistTracks = async (playlistURL: string) => {
    try {
        const parsedURL = new URL(playlistURL);
        let playlistID = parsedURL.pathname.split('/')[2];
        let endpoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
        let allTrackNames: string[] = [];
        while (endpoint) {
            let response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
                },
            });
            let trackNames = response.data.items.map(
                (item: any) => item.track.name
            );
            allTrackNames = allTrackNames.concat(trackNames);
            endpoint = response.data.next;
        }
        return allTrackNames;
    } catch (error) {
        console.log(error);
        return null;
    }
};
