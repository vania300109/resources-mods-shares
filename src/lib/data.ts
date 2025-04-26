import { MinecraftContent } from './types';

// Пример данных для демонстрации
export const SAMPLE_CONTENT: MinecraftContent[] = [
  {
    id: '1',
    title: 'OptiFine',
    description: 'Оптимизирует Minecraft, повышает FPS и добавляет поддержку HD-текстур',
    type: 'mod',
    author: 'sp614x',
    downloadCount: 10542367,
    createdAt: '2022-03-15',
    updatedAt: '2023-09-21',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['1.19.4', '1.19.3', '1.19.2', '1.18.2'],
    fileSize: '5.2 МБ'
  },
  {
    id: '2',
    title: 'Faithful 32x',
    description: 'Улучшенные текстуры Minecraft с сохранением оригинального стиля',
    type: 'resource-pack',
    author: 'Faithful Team',
    downloadCount: 7854291,
    createdAt: '2022-04-10',
    updatedAt: '2023-10-05',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['1.20.1', '1.19.4', '1.19.3', '1.18.2'],
    fileSize: '128 МБ'
  },
  {
    id: '3',
    title: 'BSL Shaders',
    description: 'Реалистичные шейдеры с красивым освещением и эффектами',
    type: 'shader',
    author: 'CaptTatsu',
    downloadCount: 5209431,
    createdAt: '2022-01-22',
    updatedAt: '2023-11-17',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['1.20.1', '1.19.4', '1.18.2'],
    fileSize: '2.4 МБ'
  },
  {
    id: '4',
    title: 'Структуры Фэнтези',
    description: 'Дата-пак добавляющий магические структуры в мир',
    type: 'data-pack',
    author: 'MagicBuilder',
    downloadCount: 2451928,
    createdAt: '2022-07-11',
    updatedAt: '2023-08-29',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['1.20.1', '1.19.4'],
    fileSize: '1.8 МБ'
  },
  {
    id: '5',
    title: 'Скин Эндермена',
    description: 'Стильный скин Эндермена в костюме',
    type: 'skin',
    author: 'CrafterGirl',
    downloadCount: 389217,
    createdAt: '2023-01-05',
    updatedAt: '2023-01-05',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['Все версии'],
    fileSize: '12 КБ'
  },
  {
    id: '6',
    title: 'RLCraft',
    description: 'Хардкорная сборка модов с элементами выживания и RPG',
    type: 'modpack',
    author: 'Shivaxi',
    downloadCount: 8921547,
    createdAt: '2021-09-15',
    updatedAt: '2023-06-10',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['1.12.2'],
    fileSize: '285 МБ'
  },
  {
    id: '7',
    title: 'Коллекция Шейдеров Сони',
    description: 'Набор оптимизированных шейдеров для разных стилей игры',
    type: 'shader-pack',
    author: 'SonikShaders',
    downloadCount: 3254196,
    createdAt: '2022-11-05',
    updatedAt: '2023-12-18',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['1.20.1', '1.19.4', '1.18.2'],
    fileSize: '16.7 МБ'
  },
  {
    id: '8',
    title: 'Ультра HD Коллекция',
    description: 'Сборка высококачественных ресурс-паков для реалистичной графики',
    type: 'resource-pack-collection',
    author: 'RealisticTeam',
    downloadCount: 2874532,
    createdAt: '2022-08-12',
    updatedAt: '2023-11-29',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['1.20.1', '1.19.4'],
    fileSize: '512 МБ'
  },
  {
    id: '9',
    title: 'Затерянный Город',
    description: 'Огромная приключенческая карта с квестами и головоломками',
    type: 'map',
    author: 'MapMaster',
    downloadCount: 4256198,
    createdAt: '2022-10-18',
    updatedAt: '2023-10-05',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['1.20.1', '1.19.4', '1.18.2'],
    fileSize: '45.3 МБ'
  },
  {
    id: '10',
    title: 'Ultimate Edition',
    description: 'Полноценная сборка с модами, ресурс-паками и шейдерами для максимального погружения',
    type: 'complete-pack',
    author: 'MasterCrafter',
    downloadCount: 1526843,
    createdAt: '2022-12-01',
    updatedAt: '2023-11-15',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['1.19.4', '1.18.2'],
    fileSize: '1.2 ГБ'
  },
  {
    id: '11',
    title: 'EssentialsX',
    description: 'Набор базовых команд и функций для серверов Minecraft',
    type: 'plugin',
    author: 'EssentialsTeam',
    downloadCount: 12458963,
    createdAt: '2021-10-18',
    updatedAt: '2023-09-25',
    imageUrl: '/placeholder.svg',
    downloadUrl: '#',
    minecraftVersions: ['1.20.1', '1.19.4', '1.18.2', '1.17.1'],
    fileSize: '8.4 МБ'
  }
];

// Экспортируем функцию для получения всех данных, чтобы исправить ошибку в SearchPage
export const getMockContent = (): MinecraftContent[] => {
  return SAMPLE_CONTENT;
};
