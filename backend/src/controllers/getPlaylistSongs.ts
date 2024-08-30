import { URL } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SPOTIFY_ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN;
const getPlaylistTracks = async (playlistURL: string) => {
    try {
        const parsedURL = new URL(playlistURL);
        let playlistID = parsedURL.pathname.split('/')[2];
        let endpoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
        let allTracks: { trackName: string; artistName: string }[] = [];

        while (endpoint) {
            let response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
                },
            });

            let tracks = response.data.items.map((item: any) => ({
                trackName: item.track.name,
                artistName: item.track.artists
                    .map((artist: any) => artist.name)
                    .join(', '), // Join multiple artist names if there are any
            }));

            allTracks = allTracks.concat(tracks);
            endpoint = response.data.next;
        }

        let slicedList = allTracks.slice(0, 10);
        return slicedList;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default getPlaylistTracks;
