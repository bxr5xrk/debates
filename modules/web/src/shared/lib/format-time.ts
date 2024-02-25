export function formatTime(time: number): string {
    const totalSeconds = Math.floor(time * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
  
    return `${formattedMinutes}:${formattedSeconds}`;
}
