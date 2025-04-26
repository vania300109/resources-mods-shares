import ContentGrid from "@/components/ContentGrid";
import { SAMPLE_CONTENT } from "@/lib/data";
import { useState, useEffect } from "react";
import { ContentType, SortOption } from "@/lib/types";
import CategoryFilter from "@/components/CategoryFilter";

export default function Index() {
  // Загрузка сохраненных настроек из localStorage
  const [selectedCategory, setSelectedCategory] = useState<ContentType | "all">(() => {
    const saved = localStorage.getItem("selectedCategory");
    return (saved as ContentType | "all") || "all";
  });
  
  const [selectedVersion, setSelectedVersion] = useState<string | "all">(() => {
    const saved = localStorage.getItem("selectedVersion");
    return saved || "all";
  });
  
  const [sortOption, setSortOption] = useState<SortOption>(() => {
    const saved = localStorage.getItem("sortOption");
    return (saved as SortOption) || "popular";
  });

  // Сохранение настроек в localStorage
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("selectedVersion", selectedVersion);
    localStorage.setItem("sortOption", sortOption);
  }, [selectedCategory, selectedVersion, sortOption]);
  
  // Фильтрация контента
  let filteredContent = [...SAMPLE_CONTENT];
  
  // Фильтр по категории
  if (selectedCategory !== "all") {
    filteredContent = filteredContent.filter(item => item.type === selectedCategory);
  }
  
  // Фильтр по версии
  if (selectedVersion !== "all") {
    filteredContent = filteredContent.filter(item => 
      item.minecraftVersions.includes(selectedVersion)
    );
  }
  
  // Сортировка
  filteredContent.sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return b.downloadCount - a.downloadCount;
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <div className="container py-8">
          <h2 className="text-2xl font-bold mb-6">Найдите лучший контент для Minecraft</h2>
          
          <CategoryFilter activeCategory={selectedCategory} />
          
          <div className="mt-8">
            <ContentGrid 
              items={filteredContent}
              title={
                sortOption === "newest" 
                  ? "Новые материалы" 
                  : "Популярные материалы"
              }
              emptyMessage={
                "По вашему запросу ничего не найдено. Попробуйте изменить параметры фильтрации."
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}