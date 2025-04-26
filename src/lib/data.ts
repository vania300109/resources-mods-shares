import { MinecraftContent } from "./types";

// Примеры данных для приложения
export const SAMPLE_CONTENT: MinecraftContent[] = [
  {
    id: "optifine-1",
    title: "OptiFine HD",
    description: "OptiFine — это оптимизационный мод для Minecraft, который значительно улучшает FPS и производительность игры. Он также добавляет поддержку HD текстур, шейдеров и многое другое.",
    type: "mod",
    author: "sp614x",
    downloadCount: 15000000,
    createdAt: "2020-08-25T12:00:00Z",
    updatedAt: "2023-10-15T15:30:00Z",
    imageUrl: "https://source.unsplash.com/random/300x200?minecraft,mod",
    downloadUrl: "#",
    minecraftVersions: ["1.20.1", "1.19.4", "1.18.2", "1.17.1", "1.16.5"],
    fileSize: "5 МБ",
    screenshots: [
      "https://source.unsplash.com/random/800x450?minecraft,optifine,1",
      "https://source.unsplash.com/random/800x450?minecraft,optifine,2",
      "https://source.unsplash.com/random/800x450?minecraft,optifine,3"
    ],
    videos: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "OptiFine HD обзор",
        thumbnail: "https://source.unsplash.com/random/300x200?minecraft,video"
      }
    ],
    fileVersions: [
      {
        version: "1.20.1",
        url: "#",
        fileName: "OptiFine_1.20.1_HD_U_I9.jar",
        fileSize: "5.2 МБ"
      },
      {
        version: "1.19.4",
        url: "#",
        fileName: "OptiFine_1.19.4_HD_U_I8.jar",
        fileSize: "5.1 МБ"
      },
      {
        version: "1.18.2",
        url: "#",
        fileName: "OptiFine_1.18.2_HD_U_H7.jar",
        fileSize: "5.0 МБ"
      }
    ]
  },
  {
    id: "faithful-2",
    title: "Faithful 32x",
    description: "Faithful 32x — это ресурс-пак, который удваивает разрешение ванильных текстур, сохраняя при этом оригинальный стиль Minecraft. Идеально подходит для тех, кто хочет улучшить внешний вид игры, не меняя её атмосферу.",
    type: "resource-pack",
    author: "Faithful Team",
    downloadCount: 8000000,
    createdAt: "2021-04-10T08:15:00Z",
    updatedAt: "2023-09-20T10:45:00Z",
    imageUrl: "https://source.unsplash.com/random/300x200?minecraft,texture",
    downloadUrl: "#",
    minecraftVersions: ["1.20", "1.19", "1.18", "1.17", "1.16"],
    fileSize: "25 МБ",
    screenshots: [
      "https://source.unsplash.com/random/800x450?minecraft,texture,1",
      "https://source.unsplash.com/random/800x450?minecraft,texture,2"
    ]
  },
  {
    id: "bsl-3",
    title: "BSL Shaders",
    description: "BSL Shaders — это реалистичный шейдер для Minecraft, который добавляет красивые световые эффекты, тени, отражения и многое другое, при этом сохраняя хорошую производительность.",
    type: "shader",
    author: "Capt Tatsu",
    downloadCount: 5000000,
    createdAt: "2022-01-05T14:30:00Z",
    updatedAt: "2023-08-12T18:20:00Z",
    imageUrl: "https://source.unsplash.com/random/300x200?minecraft,shader",
    downloadUrl: "#",
    minecraftVersions: ["1.20", "1.19", "1.18", "1.17", "1.16"],
    fileSize: "15 МБ",
    screenshots: [
      "https://source.unsplash.com/random/800x450?minecraft,shader,1",
      "https://source.unsplash.com/random/800x450?minecraft,shader,2",
      "https://source.unsplash.com/random/800x450?minecraft,shader,3",
      "https://source.unsplash.com/random/800x450?minecraft,shader,4"
    ],
    videos: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "BSL Shaders Showcase",
        thumbnail: "https://source.unsplash.com/random/300x200?minecraft,shader,video"
      }
    ]
  },
  {
    id: "rlcraft-4",
    title: "RLCraft",
    description: "RLCraft — это хардкорная сборка модов, которая превращает Minecraft в сложную игру на выживание с элементами RPG. Включает более 100 модов, которые добавляют новые механики, мобов, измерения и многое другое.",
    type: "modpack",
    author: "Shivaxi",
    downloadCount: 3000000,
    createdAt: "2020-05-20T09:45:00Z",
    updatedAt: "2023-07-08T11:30:00Z",
    imageUrl: "https://source.unsplash.com/random/300x200?minecraft,dragon",
    downloadUrl: "#",
    minecraftVersions: ["1.12.2"],
    fileSize: "250 МБ",
    screenshots: [
      "https://source.unsplash.com/random/800x450?minecraft,dragon,1",
      "https://source.unsplash.com/random/800x450?minecraft,dragon,2"
    ],
    videos: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "RLCraft гайд для начинающих",
        thumbnail: "https://source.unsplash.com/random/300x200?minecraft,dragon,video"
      }
    ]
  },
  {
    id: "adventure-5",
    title: "Epic Adventure",
    description: "Epic Adventure — это приключенческая карта для Minecraft, наполненная головоломками, испытаниями и эпическими сражениями с боссами. Пройдите через различные биомы и подземелья, чтобы найти сокровища и спасти королевство!",
    type: "map",
    author: "BuilderTeam",
    downloadCount: 1000000,
    createdAt: "2022-03-15T16:20:00Z",
    updatedAt: "2023-05-30T13:10:00Z",
    imageUrl: "https://source.unsplash.com/random/300x200?minecraft,castle",
    downloadUrl: "#",
    minecraftVersions: ["1.19.4", "1.19.3", "1.19.2"],
    fileSize: "120 МБ",
    screenshots: [
      "https://source.unsplash.com/random/800x450?minecraft,castle,1",
      "https://source.unsplash.com/random/800x450?minecraft,castle,2",
      "https://source.unsplash.com/random/800x450?minecraft,castle,3"
    ],
    videos: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Epic Adventure трейлер",
        thumbnail: "https://source.unsplash.com/random/300x200?minecraft,castle,video"
      }
    ]
  },
  {
    id: "essentials-6",
    title: "EssentialsX",
    description: "EssentialsX — это популярный плагин для серверов Minecraft, который добавляет множество команд и функций для администрирования сервера и улучшения игрового процесса. Включает телепортацию, экономику, чат-форматирование и многое другое.",
    type: "plugin",
    author: "EssentialsX Team",
    downloadCount: 4500000,
    createdAt: "2020-10-10T10:00:00Z",
    updatedAt: "2023-11-05T09:25:00Z",
    imageUrl: "https://source.unsplash.com/random/300x200?minecraft,server",
    downloadUrl: "#",
    minecraftVersions: ["1.20.1", "1.19.4", "1.18.2", "1.17.1", "1.16.5"],
    fileSize: "8 МБ"
  },
  {
    id: "ultimate-7",
    title: "Ultimate Edition",
    description: "Ultimate Edition — это полная комплексная сборка для Minecraft, которая включает в себя моды для оптимизации, ресурс-паки для улучшения графики и шейдеры для реалистичного освещения. Всё тщательно настроено для совместной работы и максимального удобства игрока.",
    type: "complete-pack",
    author: "UltraTeam",
    downloadCount: 750000,
    createdAt: "2023-01-20T12:30:00Z",
    updatedAt: "2023-12-01T14:15:00Z",
    imageUrl: "https://source.unsplash.com/random/300x200?minecraft,landscape",
    downloadUrl: "#",
    minecraftVersions: ["1.19.4", "1.18.2"],
    fileSize: "1.2 ГБ",
    screenshots: [
      "https://source.unsplash.com/random/800x450?minecraft,landscape,1",
      "https://source.unsplash.com/random/800x450?minecraft,landscape,2",
      "https://source.unsplash.com/random/800x450?minecraft,landscape,3",
      "https://source.unsplash.com/random/800x450?minecraft,landscape,4"
    ],
    videos: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Ultimate Edition Showcase",
        thumbnail: "https://source.unsplash.com/random/300x200?minecraft,landscape,video"
      }
    ],
    fileVersions: [
      {
        version: "1.19.4",
        url: "#",
        fileName: "Ultimate_Edition_1.19.4.zip",
        fileSize: "1.2 ГБ"
      },
      {
        version: "1.18.2",
        url: "#",
        fileName: "Ultimate_Edition_1.18.2.zip",
        fileSize: "1.1 ГБ"
      }
    ]
  }
];

// Функция для получения контента (имитация API)
export function getMockContent(): MinecraftContent[] {
  return SAMPLE_CONTENT;
}