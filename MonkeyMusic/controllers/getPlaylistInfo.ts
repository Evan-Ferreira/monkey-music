import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getPlaylistInfo(playlistURL: string) {
    const token = await AsyncStorage.getItem('SPOTIFY_TOKEN');
    try {
        const parsedURL = new URL(playlistURL);
        let playlistID = parsedURL.pathname.split('/')[2];
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const playlistName = response.data.name;
        const coverArt = response.data.images[0]?.url || null;
        const allTracks = response.data.tracks.items.map((item) => ({
            name: item.track.name,
            artist: item.track.artists.map((artist) => artist.name).join(', '),
            album: item.track.album.name,
            duration_ms: item.track.duration_ms,
        }));
        return {
            playlistName: playlistName,
            coverArt: coverArt,
            allTracks: allTracks,
        };
    } catch (error) {
        console.error('Error fetching playlist details:', error);
        return null;
    }
}
