import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import readline from 'readline';

export const downloadMP3 = async () => {
    try {
        const videoURL = `https://www.youtube.com/watch?v=${'_dK2tDK9grQ'}`;
        const stream = ytdl('_dK2tDK9grQ', { quality: 'highestaudio' });
        const start = Date.now();
        ffmpeg(stream)
            .audioBitrate(128)
            .save(`${__dirname}/${'shape_of_you'}.mp3`)
            .on('progress', (p) => {
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
                console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
            });
        console.log('Downloaded in:', Date.now() - start);
    } catch (error) {
        console.error('Failed to download song:', error);
    }
};
