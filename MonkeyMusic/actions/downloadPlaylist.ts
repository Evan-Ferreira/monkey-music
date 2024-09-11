import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import downloadMP3 from '../controllers/downloadSong';
import findVideoID from '@/controllers/findSongYT';

const downloadPlaylist = async (playlistName: string) => {
    try {
        const stringPlaylistInfo = await AsyncStorage.getItem(playlistName);
        if (!stringPlaylistInfo) {
            console.error(`No playlist found for ${playlistName}`);
            return;
        }

        const playlistInfo = qs.parse(stringPlaylistInfo);
        if (!playlistInfo.allTracks) {
            console.error(`Invalid playlist format for ${playlistName}`);
            return;
        }
        for (const trackKey in playlistInfo.allTracks as Record<string, any>) {
            const track = playlistInfo.allTracks[trackKey];
            const artist = track.artist as string;
            const trackName = track.name as string;
            const videoID = await findVideoID(trackName, artist);
            const trackURI = await downloadMP3(trackName, videoID);
            track.uri = trackURI;
        }
        await AsyncStorage.setItem(playlistName, qs.stringify(playlistInfo));
    } catch (e) {
        console.error(`Failed to update ${playlistName} Info:`, e);
    }
};

export default downloadPlaylist;
