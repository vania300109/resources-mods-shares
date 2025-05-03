import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContentType, FileVersion } from "@/lib/types";
import { MainInfoForm } from "@/components/upload-form/MainInfoForm";
import { FileVersionForm } from "@/components/upload-form/FileVersionForm";
import { saveNewContent, createEmptyContent, generateId } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function Upload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [contentType, setContentType] = useState<ContentType>("mod");
  const [minecraftVersions, setMinecraftVersions] = useState<string[]>([]);
  const [fileVersions, setFileVersions] = useState<FileVersion[]>([]);
  
  const handleAddFileVersion = (version: FileVersion) => {
    setFileVersions([...fileVersions, version]);
  };
  
  const handleRemoveFileVersion = (index: number) => {
    setFileVersions(fileVersions.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!title.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите название",
        variant: "destructive",
      });
      return;
    }
    
    if (!thumbnailUrl) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, загрузите изображение обложки",
        variant: "destructive",
      });
      return;
    }
    
    if (fileVersions.length === 0) {
      toast({
        title: "Ошибка",
        description: "Добавьте хотя бы одну версию файла",
        variant: "destructive",
      });
      return;
    }
    
    if (minecraftVersions.length === 0) {
      toast({
        title: "Ошибка",
        description: "Укажите хотя бы одну поддерживаемую версию Minecraft",
        variant: "destructive",
      });
      return;
    }
    
    // Создаем объект контента
    const newContent = {
      ...createEmptyContent(contentType),
      id: generateId(),
      title,
      description,
      thumbnailUrl,
      type: contentType,
      minecraftVersions,
      fileVersions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Сохраняем контент
    saveNewContent(newContent);
    
    toast({
      title: "Успешно!",
      description: "Ваш контент успешно загружен",
    });
    
    // Перенаправляем на страницу созданного контента
    navigate(`/content/${newContent.id}`);
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Загрузить контент</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
          </CardHeader>
          <CardContent>
            <MainInfoForm 
              title={title}
              description={description}
              thumbnailUrl={thumbnailUrl}
              type={contentType}
              minecraftVersions={minecraftVersions}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onThumbnailUrlChange={setThumbnailUrl}
              onTypeChange={setContentType}
              onMinecraftVersionsChange={setMinecraftVersions}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Файлы</CardTitle>
          </CardHeader>
          <CardContent>
            <FileVersionForm
              versions={fileVersions}
              onAdd={handleAddFileVersion}
              onRemove={handleRemoveFileVersion}
            />
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Отмена
          </Button>
          <Button type="submit">Опубликовать</Button>
        </div>
      </form>
    </div>
  );
}