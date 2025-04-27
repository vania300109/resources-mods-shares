export type ContentType = 
  | "all"
  | "mod" 
  | "resource-pack" 
  | "data-pack" 
  | "skin" 
  | "shader" 
  | "modpack" 
  | "shader-pack" 
  | "resource-pack-collection" 
  | "complete-pack" 
  | "plugin" 
  | "map";

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  "all": "Всё",
  "mod": "Моды",
  "resource-pack": "Ресурс-паки",
  "data-pack": "Датапаки",
  "skin": "Скины",
  "shader": "Шейдеры",
  "modpack": "Сборки модов",
  "shader-pack": "Сборки шейдеров",
  "resource-pack-collection": "Сборки ресурс-паков",
  "complete-pack": "Полные сборки",
  "plugin": "Плагины",
  "map": "Карты"
};

export type SortOption = "popular" | "newest";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  downloadCount: number;
  type: ContentType;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string;
  minecraftVersions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FileVersion {
  version: string;
  file?: File;
  fileUrl?: string;
}

export interface ContentUploaded {
  title: string;
  description: string;
  type: ContentType;
  thumbnail: File | null;
  files: FileVersion[];
}
