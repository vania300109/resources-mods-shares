import { useParams } from "react-router-dom";
import ContentGrid from "@/components/ContentGrid";
import { getMockContent } from "@/lib/data";
import { CONTENT_TYPE_LABELS, ContentType } from "@/lib/types";
import CategoryFilter from "@/components/CategoryFilter";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const currentCategory = category as ContentType;
  
  // Получаем пустой массив контента
  const content = getMockContent();

  // Фильтрация контента по выбранной категории
  const filteredContent = 
    currentCategory === "all" 
      ? content 
      : content.filter(item => item.type === currentCategory);

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">
        {CONTENT_TYPE_LABELS[currentCategory] || "Все материалы"}
      </h2>
      
      <CategoryFilter activeCategory={currentCategory} />
      
      <div className="mt-8">
        <ContentGrid 
          items={filteredContent}
          emptyMessage={`В категории "${CONTENT_TYPE_LABELS[currentCategory] || 'Все материалы'}" пока нет контента. Станьте первым, кто добавит его!`}
        />
      </div>
    </div>
  );
}
