import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { setupMiddlewares } from '../middleware/middleware';

const router = express.Router();
dotenv.config();
setupMiddlewares(router);

router.get('/:PLAYLIST_ID/tracks', async (req, res) => {
    const { PLAYLIST_ID } = req.params;
    const accessToken = req.cookies.spotifyAccessToken;
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
    }
});

export default router;
