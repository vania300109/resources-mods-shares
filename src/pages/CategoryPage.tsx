import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ContentGrid from "@/components/ContentGrid";
import { SAMPLE_CONTENT } from "@/lib/data";
import { ContentItem, ContentType, CONTENT_TYPE_LABELS } from "@/lib/types";
import CategoryFilter from "@/components/CategoryFilter";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    setLoading(true);
    
    setTimeout(() => {
      let filteredItems = [...SAMPLE_CONTENT];
      
      // Если категория не "all", применяем фильтрацию
      if (category && category !== 'all') {
        filteredItems = SAMPLE_CONTENT.filter(
          (item) => item.type === category
        );
      }
      
      setItems(filteredItems);
      setLoading(false);
    }, 500);
  }, [category]);

  const categoryTitle = category ? 
    (category === 'all' ? 'Все материалы' : CONTENT_TYPE_LABELS[category as ContentType]) : 
    'Материалы';

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryTitle}</h1>
      
      <CategoryFilter activeCategory={category as ContentType} />
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <ContentGrid 
          items={items} 
          title={`${categoryTitle} (${items.length})`}
          emptyMessage={`Контент категории "${categoryTitle}" не найден.`}
        />
      )}
    </div>
  );
}