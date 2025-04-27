import { Button } from "@/components/ui/button";
import { X, Upload, Youtube } from "lucide-react";
import { VideoItemProps } from "./types";

export const VideoItem = ({ video, onRemove }: VideoItemProps) => {
  return (
    <div className="flex items-center justify-between border rounded-md p-2">
      <div className="flex items-center gap-2">
        {video.type === "youtube" ? (
          <Youtube className="h-5 w-5 text-red-500" />
        ) : (
          <Upload className="h-5 w-5 text-primary" />
        )}
        <span className="text-sm font-medium truncate max-w-[250px]" title={video.title}>
          {video.title}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={onRemove}
        aria-label="Удалить видео"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VideoItem;
