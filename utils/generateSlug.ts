export default function generateSlug(title: string) {
    return title.toLowerCase()                   // Convert the title to lowercase
                .replace(/[^\w\s\-]/g, '')       // Remove non-word characters (except spaces and dashes)
                .trim()                          // Trim leading/trailing spaces
                .replace(/\s+/g, '-')            // Replace spaces with dashes
                .replace(/\-\-+/g, '-')          // Replace consecutive dashes with single dash
                .substring(0, 50);                // Limit to 50 characters (adjust as needed)
  }