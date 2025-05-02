import { ContentItem, ContentType, VideoContent } from "./types";

// Хранилище контента, созданного пользователями
let userCreatedContent: ContentItem[] = [];

// Инициализация контента из localStorage при загрузке
try {
  const savedContent = localStorage.getItem('userCreatedContent');
  if (savedContent) {
    userCreatedContent = JSON.parse(savedContent);
  }
} catch (error) {
  console.error('Ошибка при загрузке контента:', error);
}

// Функция для получения всего контента
export function getMockContent(): ContentItem[] {
  // Заново загружаем контент при каждом вызове, чтобы отражать изменения
  try {
    const savedContent = localStorage.getItem('userCreatedContent');
    if (savedContent) {
      userCreatedContent = JSON.parse(savedContent);
    }
  } catch (error) {
    console.error('Ошибка при загрузке контента:', error);
  }
  
  return [...userCreatedContent, ...SAMPLE_ITEMS];
}

// Функция для сохранения нового контента
export function saveNewContent(content: ContentItem): void {
  userCreatedContent = [content, ...userCreatedContent];
  
  // Сохраняем в localStorage
  try {
    localStorage.setItem('userCreatedContent', JSON.stringify(userCreatedContent));
  } catch (error) {
    console.error('Ошибка при сохранении контента:', error);
  }
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

// Создаем примерный контент для страницы деталей
export const SAMPLE_CONTENT = [
  {
    id: "1",
    title: "Пример контента",
    description: "Это пример контента для тестирования страницы деталей. В реальном приложении здесь будет полное описание.",
    imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070",
    thumbnailUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070",
    downloadCount: 1250,
    type: "mod",
    authorId: "author1",
    authorName: "Разработчик",
    author: "Разработчик",
    authorAvatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1780",
    minecraftVersions: ["1.19", "1.20"],
    fileSize: "12.5 MB",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-04-30T15:30:00Z",
    videos: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Демонстрация работы"
      }
    ] as VideoContent[]
  }
];

// Пример контента для тестирования
export const SAMPLE_ITEMS: ContentItem[] = [];
