import { ContentItem, ContentType, VideoContent, Comment } from "./types";

// Хранилище контента, созданного пользователями
let userCreatedContent: ContentItem[] = [];

// Хранилище комментариев
let comments: Comment[] = [];

// Инициализация контента из localStorage при загрузке
try {
  const savedContent = localStorage.getItem('userCreatedContent');
  if (savedContent) {
    userCreatedContent = JSON.parse(savedContent);
  }
  
  const savedComments = localStorage.getItem('comments');
  if (savedComments) {
    comments = JSON.parse(savedComments);
  }
} catch (error) {
  console.error('Ошибка при загрузке данных:', error);
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
  
  // Обновляем рейтинги для каждого элемента
  const contentWithRatings = [...userCreatedContent, ...SAMPLE_ITEMS].map(item => {
    const itemComments = getCommentsByContentId(item.id);
    const ratings = itemComments.map(comment => comment.rating).filter(rating => rating > 0);
    
    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
      : undefined;
    
    return {
      ...item,
      averageRating,
      ratingsCount: ratings.length
    };
  });
  
  return contentWithRatings;
}

// Функция для получения контента по ID
export function getContentById(id: string): ContentItem | undefined {
  const allContent = getMockContent();
  return allContent.find(item => item.id === id);
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

// Функции для работы с комментариями
export function getCommentsByContentId(contentId: string): Comment[] {
  try {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      comments = JSON.parse(savedComments);
    }
  } catch (error) {
    console.error('Ошибка при загрузке комментариев:', error);
  }
  
  return comments.filter(comment => comment.contentId === contentId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Добавление нового комментария
export function addComment(comment: Comment): void {
  comments = [comment, ...comments];
  
  try {
    localStorage.setItem('comments', JSON.stringify(comments));
  } catch (error) {
    console.error('Ошибка при сохранении комментария:', error);
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

// Генерация уникального ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}