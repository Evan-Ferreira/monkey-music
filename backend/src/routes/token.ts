import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import qs from 'qs';
import { setupMiddlewares } from '../middleware/middleware';

dotenv.config();
const router = express.Router();
setupMiddlewares(router);

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

router.get('/', async (req, res) => {
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify({
                grant_type: 'client_credentials',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        res.cookie('spotifyAccessToken', response.data.access_token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
        });
        res.status(200).send('Token stored in HTTP-only cookie');
    } catch (error) {
        console.error('Failed to retrieve access token:', error);
        res.status(500).send('Something went wrong');
    }
});

export default router;
