import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { DirectUploadTabProps } from "./types";
import { formatFileSize } from "./utils";

export const DirectUploadTab = ({ 
  videoFile, 
  videoTitle, 
  setVideoFile, 
  setVideoTitle, 
  onAddVideo 
}: DirectUploadTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="video-file">Видео файл</Label>
        <div className="border rounded-md p-4 flex items-center justify-center flex-col gap-2">
          {videoFile ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Upload className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm truncate max-w-[200px]" title={videoFile.name}>
                  {videoFile.name} ({formatFileSize(videoFile.size)})
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                type="button"
                onClick={() => setVideoFile(null)}
                aria-label="Удалить файл"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Input 
                id="video-file" 
                type="file" 
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setVideoFile(e.target.files[0]);
                  }
                }}
              />
              <Label 
                htmlFor="video-file" 
                className="flex flex-col items-center gap-2 cursor-pointer py-4 w-full"
              >
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-sm font-medium">Нажмите для загрузки видео</span>
                <span className="text-xs text-muted-foreground">MP4, WebM или другие форматы до 100 МБ</span>
              </Label>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="video-title">Название видео (необязательно)</Label>
        <Input
          id="video-title"
          placeholder="Название видео"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />
      </div>
      
      <Button 
        type="button" 
        onClick={onAddVideo}
        disabled={!videoFile}
      >
        Добавить видео
      </Button>
    </div>
  );
};

export default DirectUploadTab;
