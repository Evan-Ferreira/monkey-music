import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const editAccessToken = async (
    accessToken: string,
    envPath: string,
    variableName: string
) => {
    let fileContent: string = '';
    if (fs.existsSync(envPath)) {
        fileContent = fs.readFileSync(envPath, 'utf8');
    }

    const lines = fileContent.split('\n');
    let variableFound = false;

    const updatedLines = lines.map((line) => {
        if (line.startsWith(variableName)) {
            variableFound = true;
            return `${variableName}=${accessToken}`;
        }
        return line;
    });

    if (!variableFound) {
        updatedLines.push(`${variableName}=${accessToken}`);
    }

    fs.writeFileSync(envPath, updatedLines.join('\n'), 'utf8');
    console.log(`Updated ${variableName} in ${envPath}`);
};

const getSpotifyToken = async () => {
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
        editAccessToken(
            response.data.access_token,
            '.env',
            'SPOTIFY_ACCESS_TOKEN'
        );
    } catch (error) {
        console.error('Failed to retrieve access token:', error);
        return null;
    }
};

export default getSpotifyToken;
