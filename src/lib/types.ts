export type ContentType = 
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

export interface Comment {
  id: string;
  contentId: string;
  author: string;
  authorId: string;
  text: string;
  createdAt: string;
  rating: number; // Рейтинг от 1 до 5
}

export interface FileVersion {
  version: string;
  file?: File;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  downloadCount: number;
  type: ContentType;
  authorId: string;
  authorName: string;
  minecraftVersions: string[];
  createdAt: string;
  updatedAt: string;
  averageRating?: number; // Средний рейтинг материала
  ratingsCount?: number; // Количество оценок
  fileVersions?: FileVersion[]; // Добавляем версии файлов
}

export interface ContentUploaded {
  title: string;
  description: string;
  type: ContentType;
  thumbnail: File | null;
  files: FileVersion[];
}

export interface VideoContent {
  type: "youtube" | "direct";
  url: string;
  title: string;
  thumbnail?: string;
}

export type VideoType = "youtube" | "direct";