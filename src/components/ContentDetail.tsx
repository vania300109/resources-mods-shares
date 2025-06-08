import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileVersion, MinecraftContent } from "@/lib/types";
import { Download, Calendar, User, FileBox, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import VideoGallery from "./VideoGallery";

interface ContentDetailProps {
  content: MinecraftContent;
}

function VersionDownloadCard({ version }: { version: FileVersion }) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Версия Minecraft: {version.version}</h3>
            <p className="text-sm text-muted-foreground">
              {version.fileName} ({version.fileSize})
            </p>
          </div>
          <Button asChild>
            <a href={version.url} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Скачать
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ContentDetail({ content }: ContentDetailProps) {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
        <div className="md:w-2/3">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Link>
          
          <h1 className="text-3xl font-bold">{content.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mt-2 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="mr-1 h-4 w-4" />
              Автор: {content.author}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Дата: {new Date(content.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <FileBox className="mr-1 h-4 w-4" />
              Размер: {content.fileSize}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Download className="mr-1 h-4 w-4" />
              Загрузок: {content.downloadCount.toLocaleString()}
            </div>
          </div>
          
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p>{content.description}</p>
          </div>
          
          {content.screenshots && content.screenshots.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Скриншоты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.screenshots.map((url, index) => (
                  <a 
                    key={index} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg border"
                  >
                    <img 
                      src={url} 
                      alt={`Скриншот ${index + 1}`} 
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {content.videos && content.videos.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Видео</h2>
              <VideoGallery videos={content.videos} />
            </div>
          )}
        </div>
        
        <div className="md:w-1/3">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={content.imageUrl} 
                  alt={content.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Версии Minecraft:</h3>
                  <div className="flex flex-wrap gap-2">
                    {content.minecraftVersions.map((version) => (
                      <div
                        key={version}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                      >
                        {version}
                      </div>
                    ))}
                  </div>
                </div>
                
                {content.fileVersions && content.fileVersions.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="font-medium">Скачать для разных версий:</h3>
                    {content.fileVersions.map((version, index) => (
                      <VersionDownloadCard key={index} version={version} />
                    ))}
                  </div>
                ) : (
                  <Button asChild className="w-full">
                    <a href={content.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Скачать
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}