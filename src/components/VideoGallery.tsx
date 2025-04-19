import { useState } from "react";
import { VideoContent } from "@/lib/types";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Youtube, Video } from "lucide-react";

interface VideoGalleryProps {
  videos: VideoContent[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Видео</h3>
      
      <div className="w-full">
        <VideoPlayer video={videos[activeVideoIndex]} />
      </div>
      
      {videos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {videos.map((video, index) => (
            <Card 
              key={index} 
              className={`min-w-[180px] max-w-[180px] cursor-pointer ${activeVideoIndex === index ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setActiveVideoIndex(index)}
            >
              <CardContent className="p-2">
                <div className="relative aspect-video bg-muted rounded-md overflow-hidden mb-2">
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || "Превью видео"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-accent">
                      {video.type === "youtube" ? (
                        <Youtube className="h-8 w-8 text-red-500" />
                      ) : (
                        <Video className="h-8 w-8 text-primary" />
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium truncate">{video.title}</p>
                <div className="flex items-center mt-1">
                  {video.type === "youtube" ? (
                    <Youtube className="h-3 w-3 text-red-500 mr-1" />
                  ) : (
                    <Video className="h-3 w-3 text-primary mr-1" />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {video.type === "youtube" ? "YouTube" : "Видео"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}