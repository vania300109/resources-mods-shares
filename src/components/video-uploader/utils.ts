/**
 * Extracts the YouTube video ID from a URL
 * @param url YouTube URL
 * @returns Video ID or null if not found
 */
export const extractYoutubeVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

/**
 * Format file size to human readable format
 * @param bytes File size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  return `${(bytes / (1024 * 1024)).toFixed(2)} МБ`;
};
