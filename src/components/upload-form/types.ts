import { z } from "zod";
import { ContentType, FileVersion } from "@/lib/types";

// Схема валидации формы
export const formSchema = z.object({
  title: z.string().min(5, {
    message: "Название должно содержать не менее 5 символов.",
  }).max(100, {
    message: "Название должно содержать не более 100 символов.",
  }),
  description: z.string().min(20, {
    message: "Описание должно содержать не менее 20 символов.",
  }).max(2000, {
    message: "Описание должно содержать не более 2000 символов.",
  }),
  type: z.string().min(1, {
    message: "Выберите тип контента.",
  }).default("mod"),
});

// Тип для данных формы
export type FormValues = z.infer<typeof formSchema>;

// Интерфейс для компонента работы с версиями файлов
export interface FileVersionFormProps {
  versions: FileVersion[];
  onAdd: (version: FileVersion) => void;
  onRemove: (index: number) => void;
}

// Интерфейс для компонента превью обложки
export interface ThumbnailPreviewProps {
  thumbnailPreview: string | null;
  onRemove: () => void;
}

// Интерфейс для компонента загрузки обложки
export interface ThumbnailUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
