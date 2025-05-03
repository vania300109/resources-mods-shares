import { ContentType, FileVersion } from "@/lib/types";

export interface MainInfoFormProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  type: ContentType;
  minecraftVersions: string[];
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onThumbnailUrlChange: (url: string) => void;
  onTypeChange: (type: ContentType) => void;
  onMinecraftVersionsChange: (versions: string[]) => void;
}

export interface FileVersionFormProps {
  versions: FileVersion[];
  onAdd: (version: FileVersion) => void;
  onRemove: (index: number) => void;
}
