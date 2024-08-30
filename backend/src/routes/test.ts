import express from 'express';
import { getPlaylistTracks } from '../controllers/getPlaylistSongs';

const router = express.Router();

router.get('/', (req, res) => {
    getPlaylistTracks(
        'https://open.spotify.com/playlist/2MoXqUTKKC4E7G18sqMcqX?si=c6828c8b09444695'
    );
});

export default router;
