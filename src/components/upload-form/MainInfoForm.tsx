import { useState, useEffect } from "react";
import { MainInfoFormProps } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

export const MainInfoForm = ({ 
  title, 
  description, 
  thumbnailUrl,
  type,
  minecraftVersions = [],
  onTitleChange,
  onDescriptionChange, 
  onThumbnailUrlChange,
  onTypeChange,
  onMinecraftVersionsChange
}: MainInfoFormProps) => {
  const [versions, setVersions] = useState<string[]>(minecraftVersions);
  const [versionInput, setVersionInput] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(thumbnailUrl || null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    onMinecraftVersionsChange(versions);
  }, [versions, onMinecraftVersionsChange]);

  // Добавление версии Minecraft
  const handleAddVersion = () => {
    if (!versionInput.trim()) return;
    
    // Проверяем, что версия еще не добавлена
    if (!versions.includes(versionInput.trim())) {
      const newVersions = [...versions, versionInput.trim()];
      setVersions(newVersions);
      setVersionInput("");
    } else {
      toast({
        title: "Предупреждение",
        description: "Эта версия уже добавлена",
        variant: "default",
      });
    }
  };

  // Удаление версии Minecraft
  const handleRemoveVersion = (versionToRemove: string) => {
    setVersions(versions.filter(version => version !== versionToRemove));
  };

  // Обработка загрузки изображения
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, загрузите изображение",
          variant: "destructive",
        });
        return;
      }
      
      // Проверяем размер файла (5MB максимум)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Ошибка",
          description: "Изображение слишком большое. Максимальный размер: 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setThumbnailFile(file);
      
      // Создаем превью
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setThumbnailPreview(event.target.result);
          onThumbnailUrlChange(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Название</Label>
          <Input
            id="title"
            placeholder="Название вашего контента"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="content-type">Тип контента</Label>
          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger id="content-type">
              <SelectValue placeholder="Выберите тип контента" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mod">Мод</SelectItem>
              <SelectItem value="resource-pack">Ресурс-пак</SelectItem>
              <SelectItem value="shader">Шейдер</SelectItem>
              <SelectItem value="map">Карта</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            placeholder="Подробное описание вашего контента. Расскажите о функциях, особенностях использования и т.д."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={5}
          />
        </div>
        
        <div>
          <Label htmlFor="thumbnail">Изображение обложки (обязательно)</Label>
          <Input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="mb-2"
          />
          {!thumbnailPreview && (
            <Alert className="bg-red-50 border-red-200 mt-2">
              <AlertDescription className="text-red-700">
                Обложка является обязательной. Пожалуйста, загрузите изображение.
              </AlertDescription>
            </Alert>
          )}
          {thumbnailPreview && (
            <div className="mt-2 relative aspect-video rounded-md overflow-hidden">
              <img 
                src={thumbnailPreview} 
                alt="Превью" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            Рекомендуемый размер: 1280x720 или 16:9. Максимальный размер файла: 5MB.
          </p>
        </div>
      </div>
      
      <div>
        <Label>Поддерживаемые версии Minecraft</Label>
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Например: 1.19.3"
            value={versionInput}
            onChange={(e) => setVersionInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddVersion();
              }
            }}
          />
          <Button type="button" onClick={handleAddVersion}>
            Добавить
          </Button>
        </div>
        
        {versions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {versions.map(version => (
              <Badge key={version} variant="secondary" className="flex items-center gap-1">
                {version}
                <button
                  type="button"
                  className="ml-1 rounded-full text-muted-foreground hover:text-foreground"
                  onClick={() => handleRemoveVersion(version)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span className="sr-only">Удалить</span>
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};