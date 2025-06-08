import { useState, useEffect } from "react";
import { ContentType, SortOption, CONTENT_TYPE_LABELS } from "@/lib/types";
import CategoryFilter from "@/components/CategoryFilter";
import CategoryFilter from "@/components/CategoryFilter";
import Hero from "@/components/Hero";
import ContentGrid from "@/components/ContentGrid";
import { getMockContent } from "@/lib/data";

  // Загрузка сохраненных настроек из localStorage с проверкой на валидность
  const [selectedCategory, setSelectedCategory] = useState<ContentType>(() => {
    const saved = localStorage.getItem("selectedCategory");
    // Проверяем, является ли сохраненное значение допустимой категорией
    return (saved && CONTENT_TYPE_LABELS[saved as ContentType]) 
      ? (saved as ContentType) 
      : "mod";
  });
  
  const [selectedVersion, setSelectedVersion] = useState<string>(() => {
    const saved = localStorage.getItem("selectedVersion");
    return saved || "1.19";
  });
  
  const [sortOption, setSortOption] = useState<SortOption>(() => {
    const saved = localStorage.getItem("sortOption");
    return (saved === "newest") ? "newest" : "popular";
  });

  // Сохранение настроек в localStorage
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("selectedVersion", selectedVersion);
    localStorage.setItem("sortOption", sortOption);
  }, [selectedCategory, selectedVersion, sortOption]);
  
  // Получаем пустой массив контента
  const content = getMockContent();
  
  // Фильтрация контента по выбранной категории
  const filteredContent = content.filter(item => item.type === selectedCategory);

  const handleCategoryChange = (category: ContentType) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <main>
        <div className="container py-8">
          <h2 className="text-2xl font-bold mb-6">Найдите лучший контент для Minecraft</h2>
          
          <CategoryFilter 
            activeCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange}
          />
          
          <div className="mt-8">
            <ContentGrid 
              items={filteredContent}
              title={
                sortOption === "newest" 
                  ? "Новые материалы" 
                  : "Популярные материалы"
              }
              emptyMessage={
                "В данный момент контент не доступен. Загрузите первым свой контент!"
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}
