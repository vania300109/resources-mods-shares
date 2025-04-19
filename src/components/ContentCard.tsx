import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MinecraftContent, CONTENT_TYPE_LABELS } from "@/lib/types";
import { Download, Calendar, HardDrive } from "lucide-react";
import { Link } from "react-router-dom";

interface ContentCardProps {
  item: MinecraftContent;
}

export default function ContentCard({ item }: ContentCardProps) {
  const formatDownloads = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}М`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}К`;
    }
    return count.toString();
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute top-2 right-2">
          {CONTENT_TYPE_LABELS[item.type]}
        </Badge>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-1">
          <Link to={`/content/${item.id}`} className="hover:underline">
            {item.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <span>Автор: {item.author}</span>
          <span className="mx-1">•</span>
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            {formatDownloads(item.downloadCount)}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {item.minecraftVersions.slice(0, 3).map((version) => (
            <Badge key={version} variant="outline" className="text-xs">
              {version}
            </Badge>
          ))}
          {item.minecraftVersions.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{item.minecraftVersions.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{new Date(item.updatedAt).toLocaleDateString('ru-RU')}</span>
        </div>
        <div className="flex items-center gap-1">
          <HardDrive className="h-3 w-3" />
          <span>{item.fileSize}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
