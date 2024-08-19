import express from 'express';
import tokenRouter from './routes/token';
import playlistRouter from './routes/playlist';
import songRouter from './routes/findSong';
import { setupMiddlewares } from './middleware/middleware';

const app = express();
const port = 3000;

setupMiddlewares(app);

app.get('/', (req, res) => {
    res.send('Hello, TypeScript Node Express!');
});

app.use('/token', tokenRouter);
app.use('/playlist', playlistRouter);
app.use('/song', songRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
