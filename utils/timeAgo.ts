export function timeAgo(createdAt: Date): string {
    const now = new Date();
    const elapsed = now.getTime() - createdAt.getTime(); // Calculate the time difference in milliseconds

    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    } else if (minutes < 60) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hours < 24) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (days < 7) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (weeks < 4) {
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (months < 12) {
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
}

// Example usage
const createdAt = new Date('2024-07-24T10:00:00');
console.log(timeAgo(createdAt));
