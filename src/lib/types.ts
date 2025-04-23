export type ContentType = 
  | 'mod'
  | 'resource-pack'
  | 'data-pack'
  | 'skin'
  | 'shader'
  | 'modpack'
  | 'shader-pack'
  | 'resource-pack-collection'
  | 'map';

export type SortOption = 'newest' | 'popular';

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
  'resource-pack-collection': 'Сборка ресурс-паков',
  'map': 'Карта'
};

export const MINECRAFT_VERSIONS = [
  '1.20.4', '1.20.3', '1.20.2', '1.20.1', '1.20', 
  '1.19.4', '1.19.3', '1.19.2', '1.19.1', '1.19',
  '1.18.2', '1.18.1', '1.18', 
  '1.17.1', '1.17', 
  '1.16.5', '1.16.4', '1.16.3', '1.16.2', '1.16.1', '1.16',
  '1.15.2', '1.15.1', '1.15', 
  '1.14.4', '1.14.3', '1.14.2', '1.14.1', '1.14',
  '1.13.2', '1.13.1', '1.13',
  '1.12.2', '1.12.1', '1.12'
];