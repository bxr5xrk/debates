export function formatSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes.toFixed(0).toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toFixed(0).toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}