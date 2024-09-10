import express from 'express';
import getPlaylistTracks from '../controllers/getPlaylistSongs';
import getToken from '../controllers/getToken';

const router = express.Router();

router.get('/', (req, res) => {
    getToken();
    getPlaylistTracks(
        'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M'
    );
});

export default router;
