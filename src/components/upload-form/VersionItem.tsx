import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { FileVersion } from "@/lib/types";

interface VersionItemProps {
  version: FileVersion;
  index: number;
  onRemove: (index: number) => void;
}

export const VersionItem = ({ version, index, onRemove }: VersionItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
      <div>
        <span className="font-medium">{version.version}</span>
        <p className="text-sm text-muted-foreground">
          {version.fileUrl 
            ? `URL: ${version.fileUrl.substring(0, 30)}...` 
            : `Файл: ${version.file?.name} (${(version.file!.size / (1024 * 1024)).toFixed(2)} MB)`}
        </p>
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onRemove(index)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
