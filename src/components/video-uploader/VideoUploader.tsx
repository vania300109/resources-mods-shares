import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Youtube } from "lucide-react";
import { VideoContent, VideoType } from "@/lib/types";
import { VideoUploaderProps } from "./types";
import YouTubeTab from "./YouTubeTab";
import DirectUploadTab from "./DirectUploadTab";
import VideoList from "./VideoList";
import { extractYoutubeVideoId } from "./utils";

/**
 * VideoUploader component allows users to add videos from YouTube or upload directly
 */
export default function VideoUploader({ videos, onChange }: VideoUploaderProps) {
  const [activeTab, setActiveTab] = useState<VideoType>("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");

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
      <Tabs 
        defaultValue="youtube" 
        onValueChange={(value) => setActiveTab(value as VideoType)}
      >
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
        
        <TabsContent value="youtube">
          <YouTubeTab 
            youtubeUrl={youtubeUrl}
            videoTitle={videoTitle}
            setYoutubeUrl={setYoutubeUrl}
            setVideoTitle={setVideoTitle}
            onAddVideo={handleAddYoutubeVideo}
          />
        </TabsContent>
        
        <TabsContent value="direct">
          <DirectUploadTab 
            videoFile={videoFile}
            videoTitle={videoTitle}
            setVideoFile={setVideoFile}
            setVideoTitle={setVideoTitle}
            onAddVideo={handleAddDirectVideo}
          />
        </TabsContent>
      </Tabs>
      
      <VideoList 
        videos={videos} 
        onRemoveVideo={handleRemoveVideo} 
      />
    </div>
  );
}
