import downloadMP3 from './downloadSong';
import findSongLink from '../../../MonkeyMusic/controllers/findSongYT';
import getSpotifyToken from './getToken';
import getPlaylistTracks from './getPlaylistSongs';

const downloadPlaylist = async (playlistID: string) => {
    try {
        getSpotifyToken();
        const playlistTracks = await getPlaylistTracks(playlistID);
        if (playlistTracks === null) {
            console.log('Failed to retrieve playlist tracks');
            return null;
        } else {
            for (let track of playlistTracks) {
                const songID = await findSongLink(track);
                if (songID === null) {
                    console.log('Failed to retrieve song');
                    return null;
                } else {
                    downloadMP3(songID);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export default downloadPlaylist;
