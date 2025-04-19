import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { MinecraftContent, CONTENT_TYPE_LABELS } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface ContentGridProps {
  items: MinecraftContent[];
  title?: string;
  emptyMessage?: string;
}

export default function ContentGrid({ items, title, emptyMessage = "Ничего не найдено" }: ContentGridProps) {
  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link key={item.id} to={`/content/${item.id}`}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                <div className="relative">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={item.imageUrl || "/placeholder.svg"} 
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="font-normal">
                      {CONTENT_TYPE_LABELS[item.type]}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="line-clamp-1 text-lg">{item.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="p-4 text-sm space-y-2">
                  <p className="line-clamp-2 text-muted-foreground text-xs">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {item.minecraftVersions.slice(0, 3).map(version => (
                      <Badge key={version} variant="outline" className="font-normal text-xs">
                        {version}
                      </Badge>
                    ))}
                    {item.minecraftVersions.length > 3 && (
                      <Badge variant="outline" className="font-normal text-xs">
                        +{item.minecraftVersions.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 text-xs flex justify-between items-center">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true, locale: ru })}
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Download className="h-3 w-3" />
                    {item.downloadCount.toLocaleString()}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}