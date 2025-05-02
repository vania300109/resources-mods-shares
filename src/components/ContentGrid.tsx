import { Link } from "react-router-dom";
import ContentCard from "@/components/ContentCard";
import { ContentItem } from "@/lib/types";

interface ContentGridProps {
  items: ContentItem[];
  title: string;
  emptyMessage?: string;
}

export default function ContentGrid({ 
  items, 
  title, 
  emptyMessage = "Контент не найден" 
}: ContentGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <Link key={item.id} to={`/content/${item.id}`}>
              <ContentCard item={item} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-muted p-8 rounded-lg text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
          <Link 
            to="/upload" 
            className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Загрузить контент
          </Link>
        </div>
      )}
    </div>
  );
}
