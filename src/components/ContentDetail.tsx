import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { getContentById, incrementDownloadCount } from "@/lib/data";
import { ContentItem, FileVersion } from "@/lib/types";
import CommentSection from "@/components/CommentSection";

export default function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [fileVersion, setFileVersion] = useState<FileVersion | null>(null);

  useEffect(() => {
    if (id) {
      const foundContent = getContentById(id);
      setContent(foundContent || null);
      
      // Устанавливаем первую версию по умолчанию, если есть версии файлов
      if (foundContent?.fileVersions && foundContent.fileVersions.length > 0) {
        setSelectedVersion(foundContent.fileVersions[0].version);
        setFileVersion(foundContent.fileVersions[0]);
      }
      
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (content?.fileVersions && selectedVersion) {
      const version = content.fileVersions.find(v => v.version === selectedVersion);
      setFileVersion(version || null);
    }
  }, [selectedVersion, content]);

  const handleVersionChange = (value: string) => {
    setSelectedVersion(value);
  };

  const handleDownload = () => {
    if (!fileVersion || !id) return;
    
    // Создаем ссылку на файл для скачивания через sendfilesencrypted
    window.open('https://sendfilesencrypted.com/send-files-online-fast/?lang=ru', '_blank');
    
    // Увеличиваем счетчик скачиваний
    incrementDownloadCount(id);
    
    // Обновляем счетчик в UI
    if (content) {
      setContent({
        ...content,
        downloadCount: content.downloadCount + 1
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Контент не найден</h2>
        <p className="text-muted-foreground mb-6">
          Запрашиваемый материал не существует или был удален.
        </p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Вернуться назад
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Левая колонка с изображением */}
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden aspect-video mb-4">
            <img 
              src={content.thumbnailUrl || "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070"} 
              alt={content.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-medium">{content.authorName}</p>
              <p className="text-sm text-muted-foreground">Автор</p>
            </div>

            <div className="flex items-center space-x-2">
              <Badge>{content.type}</Badge>
              <Badge variant="outline" className="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>{content.downloadCount}</span>
              </Badge>
              {content.averageRating && (
                <Badge variant="secondary" className="flex gap-1 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{content.averageRating.toFixed(1)}</span>
                </Badge>
              )}
            </div>

            {content.fileVersions && content.fileVersions.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Выберите версию</label>
                <Select value={selectedVersion} onValueChange={handleVersionChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите версию" />
                  </SelectTrigger>
                  <SelectContent>
                    {content.fileVersions.map((version) => (
                      <SelectItem key={version.version} value={version.version}>
                        {version.version} {version.fileSize && `(${version.fileSize})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {fileVersion && (
                  <div className="text-sm text-muted-foreground">
                    {fileVersion.fileName && <p>Файл: {fileVersion.fileName}</p>}
                    {fileVersion.fileSize && <p>Размер: {fileVersion.fileSize}</p>}
                  </div>
                )}
              </div>
            )}

            <Button 
              className="w-full" 
              onClick={handleDownload}
              disabled={!fileVersion}
            >
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {fileVersion ? "Скачать" : "Выберите версию для скачивания"}
            </Button>
          </div>
        </div>

        {/* Правая колонка с описанием и комментариями */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Описание</h2>
              <p className="whitespace-pre-line">
                {content.description || "Описание отсутствует"}
              </p>
              
              {content.minecraftVersions && content.minecraftVersions.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Поддерживаемые версии Minecraft</h3>
                  <div className="flex flex-wrap gap-2">
                    {content.minecraftVersions.map((version) => (
                      <Badge key={version} variant="outline">
                        {version}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Секция комментариев */}
          <CommentSection contentId={content.id} />
        </div>
      </div>
    </div>
  );
}