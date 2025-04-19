import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentGrid from "@/components/ContentGrid";
import { SAMPLE_CONTENT } from "@/lib/data";
import { MinecraftContent, ContentType, CONTENT_TYPE_LABELS } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Cubes, Package, Database, User, Paintbrush, Box } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'mods': <Cubes className="h-5 w-5" />,
  'resource-packs': <Package className="h-5 w-5" />,
  'datapacks': <Database className="h-5 w-5" />,
  'skins': <User className="h-5 w-5" />,
  'shaders': <Paintbrush className="h-5 w-5" />,
  'modpacks': <Box className="h-5 w-5" />
};

const CATEGORY_MAP: Record<string, ContentType> = {
  'mods': 'mod',
  'resource-packs': 'resource-pack',
  'datapacks': 'data-pack',
  'skins': 'skin',
  'shaders': 'shader',
  'modpacks': 'modpack'
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [content, setContent] = useState<MinecraftContent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  
  const getCategoryTitle = (categorySlug: string) => {
    switch (categorySlug) {
      case 'mods': return 'Моды';
      case 'resource-packs': return 'Ресурс-паки';
      case 'datapacks': return 'Дата-паки';
      case 'skins': return 'Скины';
      case 'shaders': return 'Шейдеры';
      case 'modpacks': return 'Сборки модов';
      default: return 'Материалы';
    }
  };
  
  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    if (!category || !CATEGORY_MAP[category]) {
      setContent([]);
      return;
    }
    
    const filteredContent = SAMPLE_CONTENT.filter(item => item.type === CATEGORY_MAP[category]);
    let sortedContent = [...filteredContent];
    
    // Сортировка
    if (sortBy === "newest") {
      sortedContent.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (sortBy === "popular") {
      sortedContent.sort((a, b) => b.downloadCount - a.downloadCount);
    } else if (sortBy === "alphabetical") {
      sortedContent.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setContent(sortedContent);
  }, [category, sortBy]);
  
  // Фильтрация по поиску
  const filteredContent = searchQuery
    ? content.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : content;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container py-8">
        <div className="flex items-center gap-3 mb-6">
          {category && CATEGORY_ICONS[category]}
          <h1 className="text-3xl font-bold">{getCategoryTitle(category || '')}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-3">
            <Input
              placeholder="Поиск по названию или описанию"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="sort-by" className="sr-only">Сортировка</Label>
            <Select 
              value={sortBy} 
              onValueChange={setSortBy}
            >
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Сначала новые</SelectItem>
                <SelectItem value="popular">Популярные</SelectItem>
                <SelectItem value="alphabetical">По алфавиту</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <ContentGrid items={filteredContent} />
      </main>
      <Footer />
    </div>
  );
}
