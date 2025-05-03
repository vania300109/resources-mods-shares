import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/lib/types";

interface ContentGridProps {
  items: ContentItem[];
  title: string;
  emptyMessage: string;
}

export default function ContentGrid({ items, title, emptyMessage }: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Link to={`/content/${item.id}`} key={item.id}>
            <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070'} 
                  alt={item.title} 
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 right-2">
                  {item.type}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold truncate">{item.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="text-sm">
                  {item.authorName}
                </div>
                <div className="flex items-center space-x-2">
                  {item.averageRating !== undefined && (
                    <div className="flex items-center text-yellow-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-xs ml-1">{item.averageRating.toFixed(1)}</span>
                    </div>
                  )}
                  <div className="flex items-center text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span className="text-xs ml-1">{item.downloadCount}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}