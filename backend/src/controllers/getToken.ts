import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import { getYouTubeAuthCode } from './googleTokenFunctions';

dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const YT_CLIENT_ID = process.env.YT_CLIENT_ID;
const YT_CLIENT_SECRET = process.env.YT_CLIENT_SECRET;

var GOOGLE_SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

const oauth2client = new google.auth.OAuth2(
    YT_CLIENT_ID,
    YT_CLIENT_SECRET,
    'http://localhost:3000/token'
);

export const getSpotifyToken = async () => {
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
        return response.data.access_token;
    } catch (error) {
        console.error('Failed to retrieve access token:', error);
        return null;
    }
};

export const getYouTubeToken = async () => {
    try {
        const authUrl = getYouTubeAuthCode();
        return authUrl;
    } catch (error) {
        console.error('Failed to retrieve access token:', error);
        return null;
    }
};
