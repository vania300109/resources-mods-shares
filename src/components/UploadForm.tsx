import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentType, CONTENT_TYPE_LABELS, FileVersion, MINECRAFT_VERSIONS, VideoContent } from "@/lib/types";
import { useState } from "react";
import { Trash, Upload, X, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import VideoUploader from "@/components/VideoUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FileVersionFormProps {
  versions: FileVersion[];
  onVersionsChange: (versions: FileVersion[]) => void;
}

function FileVersionForm({ versions, onVersionsChange }: FileVersionFormProps) {
  const [fileUrl, setFileUrl] = useState("");
  const [fileVersion, setFileVersion] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("url");

  const addVersion = () => {
    if (!fileVersion) {
      toast({
        title: "Ошибка",
        description: "Укажите версию Minecraft",
        variant: "destructive"
      });
      return;
    }

    if (uploadMethod === "url" && !fileUrl) {
      toast({
        title: "Ошибка",
        description: "Укажите URL файла",
        variant: "destructive"
      });
      return;
    }

    if (uploadMethod === "file" && !file) {
      toast({
        title: "Ошибка",
        description: "Выберите файл для загрузки",
        variant: "destructive"
      });
      return;
    }

    const newVersion: FileVersion = {
      version: fileVersion,
      url: uploadMethod === "url" ? fileUrl : undefined,
      file: uploadMethod === "file" ? file : undefined,
      fileName: fileName || (uploadMethod === "file" && file ? file.name : "file.zip"),
      fileSize: fileSize || (uploadMethod === "file" && file ? `${(file.size / (1024 * 1024)).toFixed(2)} МБ` : "Неизвестно")
    };

    onVersionsChange([...versions, newVersion]);
    
    // Сбросить форму
    setFileUrl("");
    setFileVersion("");
    setFileName("");
    setFileSize("");
    setFile(null);
  };

  const removeVersion = (index: number) => {
    const newVersions = [...versions];
    newVersions.splice(index, 1);
    onVersionsChange(newVersions);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="url" onValueChange={(v) => setUploadMethod(v as "file" | "url")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">Ссылка на файл</TabsTrigger>
          <TabsTrigger value="file">Загрузить файл</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-url">URL файла</Label>
            <Input 
              id="file-url" 
              placeholder="https://example.com/file.zip" 
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="file" className="space-y-4">
          <div className="border rounded-md p-4">
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
                  id="version-file" 
                  type="file" 
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                      if (!fileName) setFileName(e.target.files[0].name);
                      if (!fileSize) setFileSize(`${(e.target.files[0].size / (1024 * 1024)).toFixed(2)} МБ`);
                    }
                  }}
                />
                <Label 
                  htmlFor="version-file" 
                  className="flex flex-col items-center gap-2 cursor-pointer py-4"
                >
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <span className="text-sm font-medium">Нажмите для загрузки файла</span>
                  <span className="text-xs text-muted-foreground">ZIP, JAR или другие форматы</span>
                </Label>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="file-version">Версия Minecraft</Label>
          <Select value={fileVersion} onValueChange={setFileVersion}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите версию" />
            </SelectTrigger>
            <SelectContent>
              {MINECRAFT_VERSIONS.map((version) => (
                <SelectItem key={version} value={version}>
                  {version}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-name">Имя файла (необязательно)</Label>
          <Input 
            id="file-name" 
            placeholder="my-awesome-mod.jar" 
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-size">Размер файла (необязательно)</Label>
          <Input 
            id="file-size" 
            placeholder="10 МБ" 
            value={fileSize}
            onChange={(e) => setFileSize(e.target.value)}
          />
        </div>
      </div>

      <Button type="button" onClick={addVersion} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Добавить версию
      </Button>

      {versions.length > 0 && (
        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-medium">Добавленные версии:</h4>
          <div className="space-y-2">
            {versions.map((version, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <span className="font-medium">{version.version}</span>
                  <div className="text-sm text-muted-foreground">
                    {version.fileName} ({version.fileSize})
                    {version.url && <div className="text-xs opacity-70">Ссылка: {version.url}</div>}
                    {version.file && <div className="text-xs opacity-70">Файл: {version.file.name}</div>}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeVersion(index)}
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ScreenshotsFormProps {
  screenshots: string[];
  onScreenshotsChange: (screenshots: string[]) => void;
}

function ScreenshotsForm({ screenshots, onScreenshotsChange }: ScreenshotsFormProps) {
  const [imageUrl, setImageUrl] = useState("");

  const addScreenshot = () => {
    if (!imageUrl) {
      toast({
        title: "Ошибка",
        description: "Укажите URL изображения",
        variant: "destructive"
      });
      return;
    }

    onScreenshotsChange([...screenshots, imageUrl]);
    setImageUrl("");
  };

  const removeScreenshot = (index: number) => {
    const newScreenshots = [...screenshots];
    newScreenshots.splice(index, 1);
    onScreenshotsChange(newScreenshots);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="https://example.com/screenshot.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button type="button" onClick={addScreenshot}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {screenshots.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {screenshots.map((url, index) => (
            <div key={index} className="relative group">
              <img 
                src={url} 
                alt={`Скриншот ${index + 1}`} 
                className="w-full h-24 object-cover rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeScreenshot(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ContentType | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [minecraftVersions, setMinecraftVersions] = useState("");
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [fileVersions, setFileVersions] = useState<FileVersion[]>([]);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [imageMethod, setImageMethod] = useState<"file" | "url">("file");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !type) {
      toast({
        title: "Ошибка заполнения формы",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }
    
    if (uploadMethod === "file" && !file && fileVersions.length === 0) {
      toast({
        title: "Файл не выбран",
        description: "Загрузите файл или добавьте версии с ссылками",
        variant: "destructive"
      });
      return;
    }
    
    if (uploadMethod === "url" && !fileUrl && fileVersions.length === 0) {
      toast({
        title: "Ссылка не указана",
        description: "Укажите ссылку на файл или добавьте версии с ссылками",
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
      setFileUrl("");
      setImage(null);
      setImageUrl("");
      setMinecraftVersions("");
      setVideos([]);
      setFileVersions([]);
      setScreenshots([]);
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
                {Object.entries(CONTENT_TYPE_LABELS)
                  .filter(([key]) => key !== 'all') // Исключаем категорию "Всё" из списка загрузки
                  .map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))
                }
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
            <Label>Файл контента *</Label>
            <Tabs defaultValue="file" onValueChange={(v) => setUploadMethod(v as "file" | "url")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file">Загрузить файл</TabsTrigger>
                <TabsTrigger value="url">Указать ссылку</TabsTrigger>
              </TabsList>
              <TabsContent value="file" className="space-y-4">
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
              </TabsContent>
              <TabsContent value="url">
                <div className="space-y-2">
                  <Input
                    placeholder="https://example.com/file.zip"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Укажите прямую ссылку на файл для скачивания
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label>Файлы для разных версий Minecraft</Label>
            <FileVersionForm
              versions={fileVersions}
              onVersionsChange={setFileVersions}
            />
          </div>

          <div className="space-y-2">
            <Label>Изображение обложки</Label>
            <Tabs defaultValue="file" onValueChange={(v) => setImageMethod(v as "file" | "url")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file">Загрузить файл</TabsTrigger>
                <TabsTrigger value="url">Указать ссылку</TabsTrigger>
              </TabsList>
              <TabsContent value="file" className="space-y-4">
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
              </TabsContent>
              <TabsContent value="url">
                <div className="space-y-2">
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Укажите прямую ссылку на изображение
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-2">
            <Label>Скриншоты</Label>
            <ScreenshotsForm
              screenshots={screenshots}
              onScreenshotsChange={setScreenshots}
            />
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