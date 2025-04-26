import { useParams } from "react-router-dom";
import { CONTENT_TYPE_LABELS, ContentType, MinecraftContent } from "@/lib/types";
import ContentGrid from "@/components/ContentGrid";
import CategoryFilter from "@/components/CategoryFilter";
import { Box, Cpu, FileCode, FileImage, Flame, Layers, Map, Package, Palette } from "lucide-react";
import { useMemo } from "react";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  
  const mockContent: MinecraftContent[] = useMemo(() => {
    // В реальном приложении данные будут приходить с сервера
    return Array.from({ length: 12 }, (_, i) => ({
      id: `content-${i}`,
      title: `Контент #${i + 1}`,
      description: "Описание контента, которое может быть довольно длинным и содержать много информации об этом конкретном файле",
      type: category as ContentType || "mod",
      author: "Minecraft Мастер",
      downloadCount: Math.floor(Math.random() * 10000),
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
      imageUrl: `https://source.unsplash.com/random/300x200?minecraft&sig=${i}`,
      downloadUrl: "#",
      minecraftVersions: ["1.19.4", "1.20.1"],
      fileSize: `${Math.floor(Math.random() * 100) + 1} МБ`,
    }));
  }, [category]);

  const getCategoryIcon = () => {
    switch (category) {
      case "mod":
        return <Box className="h-5 w-5 mr-2" />;
      case "resource-pack":
        return <Palette className="h-5 w-5 mr-2" />;
      case "data-pack":
        return <FileCode className="h-5 w-5 mr-2" />;
      case "skin":
        return <FileImage className="h-5 w-5 mr-2" />;
      case "shader":
        return <Flame className="h-5 w-5 mr-2" />;
      case "modpack":
        return <Package className="h-5 w-5 mr-2" />;
      case "shader-pack":
        return <Layers className="h-5 w-5 mr-2" />;
      case "resource-pack-collection":
        return <Layers className="h-5 w-5 mr-2" />;
      case "complete-pack":
        return <Layers className="h-5 w-5 mr-2" />;
      case "plugin":
        return <Cpu className="h-5 w-5 mr-2" />;
      case "map":
        return <Map className="h-5 w-5 mr-2" />;
      default:
        return <Layers className="h-5 w-5 mr-2" />;
    }
  };

  const getCategoryTitle = () => {
    if (category === 'all') {
      return 'Весь контент для Minecraft';
    }
    
    if (!category || !(category in CONTENT_TYPE_LABELS)) {
      return 'Контент для Minecraft';
    }

    const categoryLabel = CONTENT_TYPE_LABELS[category as ContentType];
    
    if (category === 'mod') {
      return `${categoryLabel}ы для Minecraft`;
    } else if (category === 'plugin') {
      return `${categoryLabel}ы для Minecraft`;
    } else if (category === 'map') {
      return `${categoryLabel}ы для Minecraft`;
    } else if (category === 'skin') {
      return `${categoryLabel}ы для Minecraft`;
    } else {
      return `${categoryLabel}и для Minecraft`;
    }
  };

  // В реальном приложении здесь будет фильтрация по категории из API
  const filteredContent = category === 'all' 
    ? mockContent 
    : mockContent.filter(content => content.type === category);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        {getCategoryIcon()}
        {getCategoryTitle()}
      </h1>
      
      <CategoryFilter activeCategory={category as ContentType} />
      
      <ContentGrid content={filteredContent} />
    </div>
  );
}