import { VideoContent, VideoType } from "@/lib/types";

export interface VideoUploaderProps {
  videos: VideoContent[];
  onChange: (videos: VideoContent[]) => void;
}

export interface VideoItemProps {
  video: VideoContent;
  onRemove: () => void;
}

export interface YouTubeTabProps {
  youtubeUrl: string;
  videoTitle: string;
  setYoutubeUrl: (url: string) => void;
  setVideoTitle: (title: string) => void;
  onAddVideo: () => void;
}

export interface DirectUploadTabProps {
  videoFile: File | null;
  videoTitle: string;
  setVideoFile: (file: File | null) => void;
  setVideoTitle: (title: string) => void;
  onAddVideo: () => void;
}

export interface VideoListProps {
  videos: VideoContent[];
  onRemoveVideo: (index: number) => void;
}
