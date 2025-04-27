import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { YouTubeTabProps } from "./types";

export const YouTubeTab = ({ 
  youtubeUrl, 
  videoTitle, 
  setYoutubeUrl, 
  setVideoTitle, 
  onAddVideo 
}: YouTubeTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="youtube-url">Ссылка на YouTube видео</Label>
        <Input
          id="youtube-url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="youtube-title">Название видео (необязательно)</Label>
        <Input
          id="youtube-title"
          placeholder="Название видео"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
      </div>
      
      <Button 
        type="button" 
        onClick={onAddVideo}
        disabled={!youtubeUrl}
      >
        Добавить YouTube видео
      </Button>
    </div>
  );
};

export default YouTubeTab;
