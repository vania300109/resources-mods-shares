import { Button } from "@/components/ui/button";
import { ContentType, CONTENT_TYPE_LABELS } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryFilterProps {
  selectedCategory: ContentType | "all";
  onCategoryChange: (category: ContentType | "all") => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium mb-3">Категории</h3>
      <Tabs defaultValue={selectedCategory} onValueChange={(value) => onCategoryChange(value as ContentType | "all")}>
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
        </TabsList>
      </Tabs>
    </div>
  );
}
