
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentGrid from "@/components/ContentGrid";
import CategoryFilter from "@/components/CategoryFilter";
import { SAMPLE_CONTENT } from "@/lib/data";
import { MinecraftContent, ContentType, SortOption, CONTENT_TYPE_LABELS } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Blocks, Package, Database, User, Paintbrush, Box } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'mod': <Blocks className="h-5 w-5" />,
  'resource-pack': <Package className="h-5 w-5" />,
  'data-pack': <Database className="h-5 w-5" />,
  'skin': <User className="h-5 w-5" />,
  'shader': <Paintbrush className="h-5 w-5" />,
  'modpack': <Box className="h-5 w-5" />
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [content, setContent] = useState<MinecraftContent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedVersion, setSelectedVersion] = useState<string>("all");
  
  const getCategoryTitle = () => {
    if (!category) return 'Все материалы';
    return CONTENT_TYPE_LABELS[category as ContentType] || 'Материалы';
  };
  
  useEffect(() => {
    // Get settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSortBy(settings.sortBy || "newest");
      setSelectedVersion(settings.selectedVersion || "all");
    }
    
    // Check if we're on category page
    const isCategoryPage = location.pathname.startsWith('/category/');
    
    // Redirect if needed
    if (isCategoryPage && !category) {
      navigate('/');
      return;
    }
    
    // Handle filtering
    let filteredContent = [...SAMPLE_CONTENT];
    
    if (category) {
      filteredContent = filteredContent.filter(item => item.type === category);
    }
    
    if (selectedVersion !== "all") {
      filteredContent = filteredContent.filter(item => 
        item.minecraftVersions.includes(selectedVersion)
      );
    }
    
    // Sorting
    if (sortBy === "newest") {
      filteredContent.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (sortBy === "popular") {
      filteredContent.sort((a, b) => b.downloadCount - a.downloadCount);
    }
    
    setContent(filteredContent);
    
    // Save settings
    localStorage.setItem('userSettings', JSON.stringify({
      sortBy,
      selectedVersion
    }));
  }, [category, sortBy, selectedVersion, location.pathname, navigate]);
  
  // Фильтрация по поиску
  const filteredContent = searchQuery
    ? content.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : content;
    
  const handleCategoryChange = (newCategory: ContentType | "all") => {
    if (newCategory === "all") {
      navigate('/');
    } else {
      navigate(`/category/${newCategory}`);
    }
  };
  
  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
  };
  
  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container py-8">
        <div className="flex items-center gap-3 mb-6">
          {category && CATEGORY_ICONS[category]}
          <h1 className="text-3xl font-bold">{getCategoryTitle()}</h1>
        </div>
        
        <div className="mb-8">
          <CategoryFilter
            selectedCategory={category as ContentType || "all"}
            onCategoryChange={handleCategoryChange}
            sortOption={sortBy}
            onSortChange={handleSortChange}
            selectedVersion={selectedVersion}
            onVersionChange={handleVersionChange}
          />
        </div>
        
        <div className="mb-8">
          <Input
            placeholder="Поиск по названию или описанию"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <ContentGrid items={filteredContent} />
      </main>
      <Footer />
    </div>
  );
}
