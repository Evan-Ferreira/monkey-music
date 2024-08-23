import { google } from 'googleapis';

const YT_CLIENT_ID = process.env.YT_CLIENT_ID;
const YT_CLIENT_SECRET = process.env.YT_CLIENT_SECRET;
const oauth2Client = new google.auth.OAuth2(
    YT_CLIENT_ID,
    YT_CLIENT_SECRET,
    'http://localhost:3000/token'
);
const GOOGLE_SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

export const getYouTubeAuthCode = async () => {
    try {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: GOOGLE_SCOPES,
        });
        return authUrl;
    } catch (error) {
        console.log('PENIS MISTAKE');
        return null;
    }
};
