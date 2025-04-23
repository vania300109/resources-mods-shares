
import { ContentType, CONTENT_TYPE_LABELS, SortOption, MINECRAFT_VERSIONS } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface CategoryFilterProps {
  selectedCategory: ContentType | "all";
  onCategoryChange: (category: ContentType | "all") => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  selectedVersion: string | "all";
  onVersionChange: (version: string | "all") => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  selectedVersion,
  onVersionChange
}: CategoryFilterProps) {
  const navigate = useNavigate();
  
  const handleCategoryChange = (value: string) => {
    onCategoryChange(value as ContentType | "all");
    
    if (value !== "all") {
      navigate(`/category/${value}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Тематика</Label>
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
            <TabsList className="w-full flex flex-wrap h-auto p-1">
              <TabsTrigger value="all" className="flex-grow my-1">
                Все
              </TabsTrigger>
              <TabsTrigger value="mod" className="flex-grow my-1">
                {CONTENT_TYPE_LABELS.mod}
              </TabsTrigger>
              <TabsTrigger value="resource-pack" className="flex-grow my-1">
                {CONTENT_TYPE_LABELS["resource-pack"]}
              </TabsTrigger>
              <TabsTrigger value="data-pack" className="flex-grow my-1">
                {CONTENT_TYPE_LABELS["data-pack"]}
              </TabsTrigger>
              <TabsTrigger value="skin" className="flex-grow my-1">
                {CONTENT_TYPE_LABELS.skin}
              </TabsTrigger>
              <TabsTrigger value="shader" className="flex-grow my-1">
                {CONTENT_TYPE_LABELS.shader}
              </TabsTrigger>
              <TabsTrigger value="modpack" className="flex-grow my-1">
                {CONTENT_TYPE_LABELS.modpack}
              </TabsTrigger>
              <TabsTrigger value="shader-pack" className="flex-grow my-1">
                {CONTENT_TYPE_LABELS["shader-pack"]}
              </TabsTrigger>
              <TabsTrigger value="resource-pack-collection" className="flex-grow my-1">
                {CONTENT_TYPE_LABELS["resource-pack-collection"]}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label>Версия Minecraft</Label>
          <Select
            value={selectedVersion}
            onValueChange={(value) => onVersionChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Все версии" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все версии</SelectItem>
              <Separator className="my-1" />
              {MINECRAFT_VERSIONS.map((version) => (
                <SelectItem key={version} value={version}>
                  {version}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Сортировка</Label>
          <Select
            value={sortOption}
            onValueChange={(value) => onSortChange(value as SortOption)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Новые</SelectItem>
              <SelectItem value="popular">Популярные</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
