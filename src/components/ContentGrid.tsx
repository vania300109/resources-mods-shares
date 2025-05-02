import { Link } from "react-router-dom";
import ContentCard from "@/components/ContentCard";
import { ContentItem } from "@/lib/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const pageSize = 12; // Ограничиваем до 12 элементов на странице
  const [currentPage, setCurrentPage] = useState(1);
  
  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(items.length / pageSize);
  
  // Получаем элементы для текущей страницы
  const currentItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  // Обработчики пагинации
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentItems.map(item => (
              <Link key={item.id} to={`/content/${item.id}`}>
                <ContentCard item={item} />
              </Link>
            ))}
          </div>
          
          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Назад
              </Button>
              <span className="px-4 py-2">
                Страница {currentPage} из {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Вперед
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </>
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
