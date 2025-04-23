
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MinecraftContent, CONTENT_TYPE_LABELS } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ArrowDownToLine, Calendar, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface ContentCardProps {
  item: MinecraftContent;
}

export default function ContentCard({ item }: ContentCardProps) {
  const formattedDate = formatDistanceToNow(new Date(item.updatedAt), {
    addSuffix: true,
    locale: ru
  });

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link to={`/content/${item.id}`}>
        <div className="aspect-[16/10] w-full overflow-hidden">
          <img
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.title}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-semibold line-clamp-1">{item.title}</h3>
            <Badge variant="outline" className="whitespace-nowrap">
              {CONTENT_TYPE_LABELS[item.type]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-muted-foreground text-sm line-clamp-2">
            {item.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
          <div className="w-full flex flex-wrap gap-y-1 justify-between items-center">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{item.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowDownToLine className="h-3 w-3" />
              <span>{item.downloadCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
            <span className="text-xs font-medium">{item.fileSize}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
