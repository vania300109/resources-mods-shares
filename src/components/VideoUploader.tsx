import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Upload, Youtube } from "lucide-react";
import { VideoContent, VideoType } from "@/lib/types";

interface VideoUploaderProps {
  videos: VideoContent[];
  onChange: (videos: VideoContent[]) => void;
}

export default function VideoUploader({ videos, onChange }: VideoUploaderProps) {
  const [activeTab, setActiveTab] = useState<VideoType>("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");

  const extractYoutubeVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleAddYoutubeVideo = () => {
    const videoId = extractYoutubeVideoId(youtubeUrl);
    if (!videoId) {
      return;
    }

    const newVideo: VideoContent = {
      type: "youtube",
      url: youtubeUrl,
      title: videoTitle || "YouTube видео",
      thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`
    };

    onChange([...videos, newVideo]);
    setYoutubeUrl("");
    setVideoTitle("");
  };

  const handleAddDirectVideo = () => {
    if (!videoFile) {
      return;
    }

    const newVideo: VideoContent = {
      type: "direct",
      url: URL.createObjectURL(videoFile),
      title: videoTitle || videoFile.name
    };

    onChange([...videos, newVideo]);
    setVideoFile(null);
    setVideoTitle("");
  };

  const handleRemoveVideo = (index: number) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    onChange(newVideos);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="youtube" onValueChange={(value) => setActiveTab(value as VideoType)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="youtube">
            <Youtube className="h-4 w-4 mr-2" />
            YouTube видео
          </TabsTrigger>
          <TabsTrigger value="direct">
            <Upload className="h-4 w-4 mr-2" />
            Загрузить видео
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="youtube" className="space-y-4 mt-4">
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
            onClick={handleAddYoutubeVideo}
            disabled={!youtubeUrl}
          >
            Добавить YouTube видео
          </Button>
        </TabsContent>
        
        <TabsContent value="direct" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="video-file">Видео файл</Label>
            <div className="border rounded-md p-4 flex items-center justify-center flex-col gap-2">
              {videoFile ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Upload className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} МБ)</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    type="button"
                    onClick={() => setVideoFile(null)}
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
                    className="flex flex-col items-center gap-2 cursor-pointer py-4"
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
            onClick={handleAddDirectVideo}
            disabled={!videoFile}
          >
            Добавить видео
          </Button>
        </TabsContent>
      </Tabs>
      
      {videos.length > 0 && (
        <div className="mt-4">
          <Label>Добавленные видео</Label>
          <div className="mt-2 space-y-2">
            {videos.map((video, index) => (
              <div key={index} className="flex items-center justify-between border rounded-md p-2">
                <div className="flex items-center gap-2">
                  {video.type === "youtube" ? (
                    <Youtube className="h-5 w-5 text-red-500" />
                  ) : (
                    <Upload className="h-5 w-5 text-primary" />
                  )}
                  <span className="text-sm font-medium">{video.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => handleRemoveVideo(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}