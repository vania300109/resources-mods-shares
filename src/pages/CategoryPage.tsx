import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ContentGrid from "@/components/ContentGrid";
import { CONTENT_TYPE_LABELS, ContentType } from "@/lib/types";
import CategoryFilter from "@/components/CategoryFilter";
import { getMockContent } from "@/lib/data";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  // Проверяем и приводим к типу ContentType
  const currentCategory = (category as ContentType) || "mod";
  
  useEffect(() => {
    // Проверяем, существует ли категория
    if (!category || !CONTENT_TYPE_LABELS[category as ContentType]) {
      // Если категория не существует, перенаправляем на страницу с модами
      navigate("/category/mod", { replace: true });
    }
  }, [category, navigate]);

  // Если категория не валидна, возвращаем null пока происходит редирект
  if (!category || !CONTENT_TYPE_LABELS[category as ContentType]) {
    return null;
  }
  
  // Получаем контент и фильтруем по категории
  const content = getMockContent();
  const filteredContent = content.filter(item => item.type === currentCategory);

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">{CONTENT_TYPE_LABELS[currentCategory]}</h2>
      
      <CategoryFilter activeCategory={currentCategory} />
      
      <div className="mt-8">
        <ContentGrid 
          items={filteredContent}
          title={`${CONTENT_TYPE_LABELS[currentCategory]}`}
          emptyMessage={`В категории "${CONTENT_TYPE_LABELS[currentCategory]}" пока нет контента. Станьте первым, кто добавит его!`}
        />
      </div>
    </div>
  );
}
