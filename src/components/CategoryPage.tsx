import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContentType } from "@/lib/types";
import ContentGrid from "@/components/ContentGrid";
import { getMockContent } from "@/lib/data";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [content, setContent] = useState(getMockContent());
  
  useEffect(() => {
    setContent(getMockContent());
  }, [category]);
  
  // Определяем категорию из параметра URL или используем all как дефолтное значение
  const categoryType: ContentType = (category as ContentType) || "all";
  
  // Фильтруем контент по категории
  const filteredContent = categoryType === "all" 
    ? content 
    : content.filter(item => item.type === categoryType);

  // Преобразуем первую букву категории в заглавную для заголовка
  const categoryTitle = categoryType === "all" 
    ? "Весь контент" 
    : categoryType.charAt(0).toUpperCase() + categoryType.slice(1) + "ы";

  return (
    <div>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">{categoryTitle}</h1>
        
        <ContentGrid 
          items={filteredContent}
          title="Доступные материалы"
          emptyMessage={`В категории "${categoryTitle}" контент не найден. Будьте первым!`}
        />
      </div>
    </div>
  );
}