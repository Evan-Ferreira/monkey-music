import dotenv from 'dotenv';
import express from 'express';
import { google } from 'googleapis';

const router = express.Router();
dotenv.config();

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YT_KEY,
});

router.get('/find', async (req, res) => {
    try {
        const songName = 'Shape of You';
        const response = await youtube.search.list({
            part: 'snippet',
            q: `${songName} official audio`,
            maxResults: 5,
            type: 'video',
        });
    } catch (error) {
        console.error(error);
    }
});

export default router;
