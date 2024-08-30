import express from 'express';
import dotenv from 'dotenv';
import getSpotifyToken from '../controllers/getToken';
import { setupMiddlewares } from '../middleware/middleware';

dotenv.config();
const router = express.Router();
setupMiddlewares(router);

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

router.get('/', async (req, res) => {
    const spotifyAccessToken = await getSpotifyToken();
    if (!spotifyAccessToken) {
        res.status(500).send('Failed to retrieve access token');
    } else {
        res.cookie('spotifyAccessToken', spotifyAccessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
        });
        res.status(200).send('Token stored in HTTP-only cookie');
    }
});

router.get('/:code', async (req, res) => {});

export default router;
