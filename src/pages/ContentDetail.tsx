import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SAMPLE_CONTENT } from "@/lib/data";
import { Download, User, Calendar, FileType, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import VideoGallery from "@/components/VideoGallery";

export default function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  
  // В реальном приложении здесь был бы API-запрос
  const content = SAMPLE_CONTENT.find(item => item.id === id);
  
  if (!content) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Контент не найден</h1>
        <p className="text-muted-foreground mb-6">
          Запрашиваемый материал не существует или был удален
        </p>
        <Button asChild>
          <a href="/">Вернуться на главную</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold">{content.title}</h1>
        
        <div className="rounded-md overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <img 
              src={content.imageUrl || "/placeholder.svg"} 
              alt={content.title}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
        
        {content.videos && content.videos.length > 0 && (
          <VideoGallery videos={content.videos} />
        )}
        
        <div className="prose max-w-none">
          <h2>Описание</h2>
          <p>{content.description}</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <Button className="w-full gap-2 mb-4" size="lg">
            <Download className="h-5 w-5" />
            Скачать
          </Button>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-muted-foreground">Автор</div>
                <div>{content.author}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-muted-foreground">Обновлено</div>
                <div>{formatDistanceToNow(new Date(content.updatedAt), { addSuffix: true, locale: ru })}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Download className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-muted-foreground">Загрузок</div>
                <div>{content.downloadCount.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <FileType className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-muted-foreground">Размер файла</div>
                <div>{content.fileSize}</div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="text-sm text-muted-foreground mb-2">Поддерживаемые версии</div>
              <div className="flex flex-wrap gap-2">
                {content.minecraftVersions.map(version => (
                  <div key={version} className="bg-accent rounded-full px-3 py-1 text-xs">
                    {version}
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="text-sm text-muted-foreground mb-2">Категория</div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span>{content.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}