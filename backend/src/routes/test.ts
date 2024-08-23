import express from 'express';
import { downloadMP3 } from '../controllers/downloadSong';

const router = express.Router();

router.get('/', (req, res) => {
    downloadMP3();
});

export default router;
