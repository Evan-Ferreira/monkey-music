import express from 'express';
import findSong from '../controllers/findSong';

const router = express.Router();

router.get('/find', async (req, res) => {
    const songID = await findSong('shape of you');
    if (songID === null) {
        res.status(500).send('Failed to retrieve song');
        console.log('Failed to retrieve song');
    } else {
        res.status(200).json({ songID: songID });
    }
});

export default router;
