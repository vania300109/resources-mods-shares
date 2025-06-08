import {
  ContentItem,
  ContentType,
  VideoContent,
  Comment,
  FileVersion,
} from "./types";
import { getCurrentUser } from "./auth";

// Ключи для localStorage
const CONTENT_STORAGE_KEY = "minecraft_vani_content";
const COMMENTS_STORAGE_KEY = "minecraft_vani_comments";

// Хранилище контента, созданного пользователями
let userCreatedContent: ContentItem[] = [];

// Хранилище комментариев
let comments: Comment[] = [];

// Инициализация контента из localStorage при загрузке
function initializeData() {
  try {
    const savedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (savedContent) {
      userCreatedContent = JSON.parse(savedContent);
    }

    const savedComments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (savedComments) {
      comments = JSON.parse(savedComments);
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    // В случае ошибки очищаем поврежденные данные
    localStorage.removeItem(CONTENT_STORAGE_KEY);
    localStorage.removeItem(COMMENTS_STORAGE_KEY);
    userCreatedContent = [];
    comments = [];
  }
}

// Инициализируем данные
initializeData();

// Сохранение контента в localStorage
function saveContentToStorage() {
  try {
    localStorage.setItem(
      CONTENT_STORAGE_KEY,
      JSON.stringify(userCreatedContent),
    );
  } catch (error) {
    console.error("Ошибка при сохранении контента:", error);
  }
}

// Сохранение комментариев в localStorage
function saveCommentsToStorage() {
  try {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  } catch (error) {
    console.error("Ошибка при сохранении комментариев:", error);
  }
}

// Функция для получения всего контента
export function getMockContent(): ContentItem[] {
  // Заново загружаем контент при каждом вызове, чтобы отражать изменения
  try {
    const savedContent = localStorage.getItem("userCreatedContent");
    if (savedContent) {
      userCreatedContent = JSON.parse(savedContent);
    }
  } catch (error) {
    console.error("Ошибка при загрузке контента:", error);
  }

  // Обновляем рейтинги для каждого элемента
  const contentWithRatings = userCreatedContent.map((item) => {
    const itemComments = getCommentsByContentId(item.id);
    const ratings = itemComments
      .map((comment) => comment.rating)
      .filter((rating) => rating > 0);

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : undefined;

    return {
      ...item,
      averageRating,
      ratingsCount: ratings.length,
    };
  });

  return contentWithRatings;
}

// Функция для получения контента по ID
export function getContentById(id: string): ContentItem | undefined {
  const allContent = getMockContent();
  return allContent.find((item) => item.id === id);
}

// Функция для увеличения счетчика скачиваний
export function incrementDownloadCount(id: string): void {
  const contentIndex = userCreatedContent.findIndex((item) => item.id === id);

  if (contentIndex !== -1) {
    userCreatedContent[contentIndex] = {
      ...userCreatedContent[contentIndex],
      downloadCount: (userCreatedContent[contentIndex].downloadCount || 0) + 1,
    };

    localStorage.setItem(
      "userCreatedContent",
      JSON.stringify(userCreatedContent),
    );
  }
}

export function saveNewContent(content: ContentItem): void {
  userCreatedContent = [content, ...userCreatedContent];
  saveContentToStorage();
}

// Функция для удаления контента
export function deleteContent(id: string): boolean {
  const contentIndex = userCreatedContent.findIndex((item) => item.id === id);
  const currentUser = getCurrentUser();

  // Проверяем, существует ли контент
  if (contentIndex === -1) {
    return false;
  }

  // Проверяем, принадлежит ли контент текущему пользователю
  if (
    !currentUser ||
    userCreatedContent[contentIndex].authorId !== currentUser.id
  ) {
    return false;
  }

  // Удаляем контент
  userCreatedContent = userCreatedContent.filter((item) => item.id !== id);
  saveContentToStorage();

  // Также удаляем все комментарии к этому контенту
  comments = comments.filter((comment) => comment.contentId !== id);
  saveCommentsToStorage();

  return true;
}

export function isContentOwner(contentId: string): boolean {
  const content = getContentById(contentId);
  const currentUser = getCurrentUser();
  return content && currentUser ? content.authorId === currentUser.id : false;
}

// Функции для работы с комментариями
export function getCommentsByContentId(contentId: string): Comment[] {
  try {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      comments = JSON.parse(savedComments);
    }
  } catch (error) {
    console.error("Ошибка при загрузке комментариев:", error);
  }

  return comments
    .filter((comment) => comment.contentId === contentId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function addComment(comment: Comment): void {
  comments = [comment, ...comments];
  saveCommentsToStorage();
}

export const createEmptyContent = (type: ContentType = "mod"): ContentItem => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error("Пользователь не авторизован");
  }

  return {
    id: generateId(),
    title: "",
    description: "",
    thumbnailUrl: "",
    downloadCount: 0,
    type,
    authorId: currentUser.id,
    authorName: currentUser.username,
    minecraftVersions: ["1.19", "1.20"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fileVersions: [],
  };
};

// Генерация уникального ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
