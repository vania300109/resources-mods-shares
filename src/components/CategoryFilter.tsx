import { CONTENT_TYPE_LABELS, ContentType } from "@/lib/types";
import { Link, useParams } from "react-router-dom";
import { Box, Cpu, FileCode, FileImage, Flame, Layers, Map, Package, Palette, ScrollText } from "lucide-react";

interface CategoryFilterProps {
  activeCategory?: ContentType;
}

const getCategoryIcon = (type: ContentType) => {
  switch (type) {
    case "all":
      return <Layers className="h-4 w-4 mr-2" />;
    case "mod":
      return <Box className="h-4 w-4 mr-2" />;
    case "resource-pack":
      return <Palette className="h-4 w-4 mr-2" />;
    case "data-pack":
      return <FileCode className="h-4 w-4 mr-2" />;
    case "skin":
      return <FileImage className="h-4 w-4 mr-2" />;
    case "shader":
      return <Flame className="h-4 w-4 mr-2" />;
    case "modpack":
      return <Package className="h-4 w-4 mr-2" />;
    case "shader-pack":
      return <Layers className="h-4 w-4 mr-2" />;
    case "resource-pack-collection":
      return <Layers className="h-4 w-4 mr-2" />;
    case "complete-pack":
      return <Layers className="h-4 w-4 mr-2" />;
    case "plugin":
      return <Cpu className="h-4 w-4 mr-2" />;
    case "map":
      return <Map className="h-4 w-4 mr-2" />;
    default:
      return <ScrollText className="h-4 w-4 mr-2" />;
  }
};

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const params = useParams();
  const currentCategory = activeCategory || (params.category as ContentType);

  return (
    <div className="pb-4 mb-6">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Object.entries(CONTENT_TYPE_LABELS).map(([type, label]) => (
          <Link
            key={type}
            to={`/category/${type}`}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentCategory === type 
                ? "bg-primary text-primary-foreground" 
                : "bg-card hover:bg-accent"
            }`}
          >
            {getCategoryIcon(type as ContentType)}
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}