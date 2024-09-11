import getToken from '../controllers/getSpotifyToken';
import getPlaylistInfo from '../controllers/getPlaylistInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import downloadCoverArt from '../controllers/downloadCoverArt';
import downloadPlaylist from './downloadPlaylist';

const storePlaylistInfo = async (response: any) => {
    try {
        await AsyncStorage.setItem(
            response.playlistName,
            qs.stringify(response)
        );
    } catch (e) {
        console.error(`Failed to ${response.playlistName} Info:`, e);
    }
};

export default async function transferPlaylist(playlistURL: string) {
    await getToken();
    const response = await getPlaylistInfo(playlistURL);
    if (!response) {
        return null;
    } else {
        await storePlaylistInfo(response);
        await downloadCoverArt(response.playlistName, response.coverArt);
        await downloadPlaylist(response.playlistName);
        const playlistInfo = await AsyncStorage.getItem(response.playlistName);
        return qs.parse(playlistInfo);
    }
}
