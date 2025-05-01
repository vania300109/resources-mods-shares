import { ContentItem, ContentType } from "./types";

// Функция для имитации API получения контента
export function getMockContent(): ContentItem[] {
  return []; // Возвращаем пустой массив, чтобы изначально не было материалов
}

// Пустая версия контента, соответствующая интерфейсу ContentItem
export const createEmptyContent = (type: ContentType = "mod"): ContentItem => ({
  id: "",
  title: "",
  description: "",
  thumbnailUrl: "",
  downloadCount: 0,
  type,
  authorId: "",
  authorName: "",
  authorAvatarUrl: "",
  minecraftVersions: ["1.19", "1.20"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});
