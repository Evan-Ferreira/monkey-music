import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;

const storeAccessToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('SPOTIFY_TOKEN', token);
    } catch (e) {
        console.error('Failed to store access token:', e);
    }
};

const getToken = async () => {
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify({
                grant_type: 'client_credentials',
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        storeAccessToken(response.data.access_token);
    } catch (error) {
        console.error('Failed to retrieve access token:', error);
    }
};

export default getToken;
