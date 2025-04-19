export type ContentType = 
  | 'mod'
  | 'resource-pack'
  | 'data-pack'
  | 'skin'
  | 'shader'
  | 'modpack'
  | 'shader-pack'
  | 'resource-pack-collection';

export type VideoType = 'youtube' | 'direct';

export interface VideoContent {
  type: VideoType;
  url: string;
  title?: string;
  thumbnail?: string;
}

export interface MinecraftContent {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  author: string;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  downloadUrl: string;
  minecraftVersions: string[];
  fileSize: string;
  videos?: VideoContent[];
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  'mod': 'Мод',
  'resource-pack': 'Ресурс-пак',
  'data-pack': 'Дата-пак',
  'skin': 'Скин',
  'shader': 'Шейдер',
  'modpack': 'Сборка модов',
  'shader-pack': 'Сборка шейдеров',
  'resource-pack-collection': 'Сборка ресурс-паков'
};