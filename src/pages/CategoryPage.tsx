import { useParams, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SAMPLE_CONTENT } from "@/lib/data";
import { useState, useEffect } from "react";
import { ContentType, SortOption } from "@/lib/types";
import ContentGrid from "@/components/ContentGrid";
import CategoryFilter from "@/components/CategoryFilter";
import { Bookmark, Code, Layers, Package, Palette, FileImage, Map, Box } from "lucide-react";

// Словарь иконок для разных типов контента
const CATEGORY_ICONS = {
  'mod': <Code size={24} />,
  'resource-pack': <Palette size={24} />,
  'data-pack': <Layers size={24} />,
  'skin': <FileImage size={24} />,
  'shader': <Palette size={24} />,
  'modpack': <Package size={24} />,
  'shader-pack': <Package size={24} />,
  'resource-pack-collection': <Box size={24} />,
  'map': <Map size={24} />
};

// Названия категорий для заголовков
const CATEGORY_TITLES: Record<ContentType, string> = {
  'mod': 'Моды для Minecraft',
  'resource-pack': 'Ресурс-паки для Minecraft',
  'data-pack': 'Дата-паки для Minecraft',
  'skin': 'Скины для Minecraft',
  'shader': 'Шейдеры для Minecraft',
  'modpack': 'Сборки модов для Minecraft',
  'shader-pack': 'Сборки шейдеров для Minecraft',
  'resource-pack-collection': 'Сборки ресурс-паков для Minecraft',
  'map': 'Карты для Minecraft'
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const categoryFromPath = location.pathname.split('/').pop() as ContentType | undefined;
  
  const validCategory = (category || categoryFromPath) as ContentType;
  
  const [selectedCategory, setSelectedCategory] = useState<ContentType | "all">(
    validCategory || "all"
  );
  const [sortOption, setSortOption] = useState<SortOption>(
    localStorage.getItem('sortOption') as SortOption || 'newest'
  );
  const [selectedVersion, setSelectedVersion] = useState<string | "all">(
    localStorage.getItem('selectedVersion') || "all"
  );

  useEffect(() => {
    if (validCategory) {
      setSelectedCategory(validCategory);
    }
  }, [validCategory]);

  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  useEffect(() => {
    localStorage.setItem('selectedVersion', selectedVersion);
  }, [selectedVersion]);

  // Фильтрация по категории и версии
  const filteredContent = SAMPLE_CONTENT.filter(item => {
    // Фильтрация по категории
    const categoryMatch = selectedCategory === "all" || item.type === selectedCategory;
    
    // Фильтрация по версии
    const versionMatch = selectedVersion === "all" || 
      item.minecraftVersions.includes(selectedVersion) ||
      item.minecraftVersions.includes('Все версии');
    
    return categoryMatch && versionMatch;
  });

  // Сортировка
  const sortedContent = [...filteredContent].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else {
      return b.downloadCount - a.downloadCount;
    }
  });

  const renderCategoryIcon = () => {
    if (selectedCategory === "all") {
      return <Bookmark size={24} />;
    }
    return CATEGORY_ICONS[selectedCategory as ContentType] || <Bookmark size={24} />;
  };

  const getCategoryTitle = () => {
    if (selectedCategory === "all") {
      return "Все материалы для Minecraft";
    }
    return CATEGORY_TITLES[selectedCategory as ContentType] || "Материалы для Minecraft";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-6">
            {renderCategoryIcon()}
            <h1 className="text-2xl font-bold">{getCategoryTitle()}</h1>
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
            selectedVersion={selectedVersion}
            onVersionChange={setSelectedVersion}
          />
          
          <div className="mt-8">
            <ContentGrid items={sortedContent} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}