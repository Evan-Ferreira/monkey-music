import { Downloader } from 'ytdl-mp3';

export const downloadMP3 = async () => {
    try {
        const videoID = '_dK2tDK9grQ';
        const downloader = new Downloader({
            getTags: true,
            outputDir: './src/controllers',
        });

        await downloader.downloadSong(
            `https://www.youtube.com/watch?v=${videoID}`
        );
    } catch (error) {
        console.error(error);
    }
};
