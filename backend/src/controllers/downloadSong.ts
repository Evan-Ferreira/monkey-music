import { Downloader } from 'ytdl-mp3';

const downloadMP3 = async (videoID: string) => {
    try {
        const downloader = new Downloader({
            getTags: true,
            outputDir: './music',
        });

        await downloader.downloadSong(
            `https://www.youtube.com/watch?v=${videoID}`
        );
    } catch (error) {
        console.error(error);
    }
};

export default downloadMP3;
