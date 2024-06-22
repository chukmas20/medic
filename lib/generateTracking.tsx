export function generateTrackingNumber(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const trackingNumberLength = 8;
    let trackingNumber = '';

    for (let i = 0; i < trackingNumberLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        trackingNumber += characters[randomIndex];
    }

    return trackingNumber;
}

// Example usage:
console.log(generateTrackingNumber());