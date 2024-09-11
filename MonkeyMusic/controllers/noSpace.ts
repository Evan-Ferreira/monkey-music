export default function noSpace(songName: string): string {
    const noSpaces = songName.replace(/ /g, '_');
    return noSpaces;
}
