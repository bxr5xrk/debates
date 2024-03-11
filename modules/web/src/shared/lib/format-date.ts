export const formatDate = (date: string): string => {
    return new Date(date).toLocaleString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};