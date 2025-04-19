import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentType, CONTENT_TYPE_LABELS, VideoContent } from "@/lib/types";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import VideoUploader from "@/components/VideoUploader";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ContentType | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [minecraftVersions, setMinecraftVersions] = useState("");
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !type || !file) {
      toast({
        title: "Ошибка заполнения формы",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Имитация загрузки
    setTimeout(() => {
      toast({
        title: "Успешно загружено!",
        description: "Ваш файл отправлен на модерацию",
      });
      
      // Сброс формы
      setTitle("");
      setDescription("");
      setType("");
      setFile(null);
      setImage(null);
      setMinecraftVersions("");
      setVideos([]);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Загрузка нового контента</CardTitle>
        <CardDescription>
          Поделитесь своими модами, ресурс-паками, скинами и другими материалами с сообществом
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название *</Label>
            <Input 
              id="title" 
              placeholder="Название вашего материала" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание *</Label>
            <Textarea 
              id="description" 
              placeholder="Подробное описание функционала" 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Тип контента *</Label>
            <Select 
              value={type} 
              onValueChange={(value) => setType(value as ContentType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип контента" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CONTENT_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="versions">Версии Minecraft</Label>
            <Input 
              id="versions" 
              placeholder="Например: 1.20.1, 1.19.4, 1.18.2" 
              value={minecraftVersions}
              onChange={(e) => setMinecraftVersions(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Укажите версии через запятую
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Файл контента *</Label>
            <div className="border rounded-md p-4 flex items-center justify-center flex-col gap-2">
              {file ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Upload className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} МБ)</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    type="button"
                    onClick={() => setFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Input 
                    id="file" 
                    type="file" 
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                  <Label 
                    htmlFor="file" 
                    className="flex flex-col items-center gap-2 cursor-pointer py-4"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <span className="text-sm font-medium">Нажмите для загрузки файла</span>
                    <span className="text-xs text-muted-foreground">ZIP, JAR или другие форматы</span>
                  </Label>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Изображение</Label>
            <div className="border rounded-md p-4 flex items-center justify-center flex-col gap-2">
              {image ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Upload className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{image.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    type="button"
                    onClick={() => setImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImage(e.target.files[0]);
                      }
                    }}
                  />
                  <Label 
                    htmlFor="image" 
                    className="flex flex-col items-center gap-2 cursor-pointer py-4"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <span className="text-sm font-medium">Загрузите скриншот или обложку</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG или GIF до 5 МБ</span>
                  </Label>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Видео</Label>
            <VideoUploader videos={videos} onChange={setVideos} />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Загрузка..." : "Загрузить контент"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}