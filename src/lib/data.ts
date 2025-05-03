import { ContentItem, ContentType, VideoContent, Comment, FileVersion } from "./types";

// Хранилище контента, созданного пользователями
let userCreatedContent: ContentItem[] = [];

// Хранилище комментариев
let comments: Comment[] = [];

// Мокап текущего пользователя (в реальном приложении придет из авторизации)
let currentUser = {
  id: "user1",
  name: "Текущий пользователь"
};

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
  
  // Загружаем информацию о текущем пользователе
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  } else {
    // Если нет, сохраняем текущего пользователя
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
} catch (error) {
  console.error('Ошибка при загрузке данных:', error);
}

// Получение текущего пользователя
export function getCurrentUser() {
  return currentUser;
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
  const contentWithRatings = userCreatedContent.map(item => {
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

// Функция для увеличения счетчика скачиваний
export function incrementDownloadCount(id: string): void {
  const contentIndex = userCreatedContent.findIndex(item => item.id === id);
  
  if (contentIndex !== -1) {
    userCreatedContent[contentIndex] = {
      ...userCreatedContent[contentIndex],
      downloadCount: (userCreatedContent[contentIndex].downloadCount || 0) + 1
    };
    
    localStorage.setItem('userCreatedContent', JSON.stringify(userCreatedContent));
  }
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

// Функция для удаления контента
export function deleteContent(id: string): boolean {
  const contentIndex = userCreatedContent.findIndex(item => item.id === id);
  
  // Проверяем, существует ли контент
  if (contentIndex === -1) {
    return false;
  }
  
  // Проверяем, принадлежит ли контент текущему пользователю
  if (userCreatedContent[contentIndex].authorId !== currentUser.id) {
    return false;
  }
  
  // Удаляем контент
  userCreatedContent = userCreatedContent.filter(item => item.id !== id);
  
  // Сохраняем в localStorage
  try {
    localStorage.setItem('userCreatedContent', JSON.stringify(userCreatedContent));
    
    // Также удаляем все комментарии к этому контенту
    comments = comments.filter(comment => comment.contentId !== id);
    localStorage.setItem('comments', JSON.stringify(comments));
    
    return true;
  } catch (error) {
    console.error('Ошибка при удалении контента:', error);
    return false;
  }
}

// Функция для проверки, является ли пользователь владельцем контента
export function isContentOwner(contentId: string): boolean {
  const content = getContentById(contentId);
  return content ? content.authorId === currentUser.id : false;
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
  id: generateId(),
  title: "",
  description: "",
  thumbnailUrl: "",
  downloadCount: 0,
  type,
  authorId: currentUser.id,
  authorName: currentUser.name,
  minecraftVersions: ["1.19", "1.20"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  fileVersions: []
});

// Генерация уникального ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}