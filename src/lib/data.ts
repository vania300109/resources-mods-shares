import { ContentItem, ContentType, VideoContent, Comment, FileVersion } from "./types";

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
  
  // Также проверяем в примерном контенте
  const sampleIndex = SAMPLE_ITEMS.findIndex(item => item.id === id);
  if (sampleIndex !== -1) {
    SAMPLE_ITEMS[sampleIndex] = {
      ...SAMPLE_ITEMS[sampleIndex],
      downloadCount: (SAMPLE_ITEMS[sampleIndex].downloadCount || 0) + 1
    };
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
  minecraftVersions: ["1.19", "1.20"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  fileVersions: [
    {
      version: "1.19",
      fileUrl: "#",
      fileName: "example_file_1.19.zip",
      fileSize: "10MB"
    },
    {
      version: "1.20",
      fileUrl: "#",
      fileName: "example_file_1.20.zip",
      fileSize: "12MB"
    }
  ]
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
    minecraftVersions: ["1.19", "1.20"],
    fileSize: "12.5 MB",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-04-30T15:30:00Z",
    fileVersions: [
      {
        version: "1.19",
        fileUrl: "#",
        fileName: "example_mod_1.19.jar",
        fileSize: "10MB"
      },
      {
        version: "1.20",
        fileUrl: "#",
        fileName: "example_mod_1.20.jar",
        fileSize: "12MB"
      }
    ],
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
export const SAMPLE_ITEMS: ContentItem[] = [
  {
    id: "sample1",
    title: "Технологический мод",
    description: "Добавляет новые механизмы и технологии в игру. Множество новых руд, механизмов и систем автоматизации.",
    thumbnailUrl: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=2070",
    downloadCount: 2500,
    type: "mod",
    authorId: "author1",
    authorName: "TechDev",
    minecraftVersions: ["1.19", "1.20"],
    createdAt: "2025-02-10T10:00:00Z",
    updatedAt: "2025-04-15T15:30:00Z",
    fileVersions: [
      {
        version: "1.19",
        fileUrl: "#",
        fileName: "tech_mod_1.19.jar",
        fileSize: "15MB"
      },
      {
        version: "1.20",
        fileUrl: "#",
        fileName: "tech_mod_1.20.jar",
        fileSize: "16.5MB"
      }
    ]
  },
  {
    id: "sample2",
    title: "Средневековый ресурс-пак",
    description: "Преобразует игру в средневековый стиль. Новые текстуры для блоков, предметов и мобов.",
    thumbnailUrl: "https://images.unsplash.com/photo-1599823336658-8ad1124c90ae?q=80&w=2070",
    downloadCount: 1800,
    type: "resource-pack",
    authorId: "author2",
    authorName: "MedievalArtist",
    minecraftVersions: ["1.19", "1.20"],
    createdAt: "2025-03-05T14:20:00Z",
    updatedAt: "2025-04-10T09:15:00Z",
    fileVersions: [
      {
        version: "1.19",
        fileUrl: "#",
        fileName: "medieval_pack_1.19.zip",
        fileSize: "45MB"
      },
      {
        version: "1.20",
        fileUrl: "#",
        fileName: "medieval_pack_1.20.zip",
        fileSize: "48MB"
      }
    ]
  },
  {
    id: "sample3",
    title: "Реалистичные шейдеры",
    description: "Добавляет реалистичное освещение, тени и эффекты воды. Требовательны к производительности!",
    thumbnailUrl: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2074",
    downloadCount: 4200,
    type: "shader",
    authorId: "author3",
    authorName: "RealShaders",
    minecraftVersions: ["1.19", "1.20"],
    createdAt: "2025-01-20T11:30:00Z",
    updatedAt: "2025-04-25T16:40:00Z",
    fileVersions: [
      {
        version: "1.19",
        fileUrl: "#",
        fileName: "real_shaders_1.19.zip",
        fileSize: "32MB"
      },
      {
        version: "1.20",
        fileUrl: "#",
        fileName: "real_shaders_1.20.zip",
        fileSize: "35MB"
      }
    ]
  }
];

// Генерация уникального ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}