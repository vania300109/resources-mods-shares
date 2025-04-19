import { VideoContent } from "@/lib/types";

interface VideoPlayerProps {
  video: VideoContent;
  className?: string;
}

export default function VideoPlayer({ video, className = "" }: VideoPlayerProps) {
  if (video.type === "youtube") {
    // Извлекаем ID видео из URL
    const extractYoutubeVideoId = (url: string): string | null => {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[7].length === 11) ? match[7] : null;
    };

    const videoId = extractYoutubeVideoId(video.url);
    if (!videoId) {
      return <div className="text-center text-red-500 p-4">Неверная ссылка на YouTube видео</div>;
    }

    return (
      <div className={`aspect-video w-full rounded-md overflow-hidden ${className}`}>
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.title || "YouTube видео"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  } else { // Direct video
    return (
      <div className={`aspect-video w-full ${className}`}>
        <video 
          src={video.url}
          controls
          className="w-full h-full rounded-md"
          title={video.title}
        />
      </div>
    );
  }
}