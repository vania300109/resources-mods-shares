import { Label } from "@/components/ui/label";
import { VideoListProps } from "./types";
import VideoItem from "./VideoItem";

export const VideoList = ({ videos, onRemoveVideo }: VideoListProps) => {
  if (videos.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4">
      <Label>Добавленные видео</Label>
      <div className="mt-2 space-y-2">
        {videos.map((video, index) => (
          <VideoItem 
            key={index} 
            video={video} 
            onRemove={() => onRemoveVideo(index)} 
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
