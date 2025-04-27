import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ThumbnailPreviewProps } from "./types";

export const ThumbnailPreview = ({ thumbnailPreview, onRemove }: ThumbnailPreviewProps) => {
  if (!thumbnailPreview) return null;
  
  return (
    <div className="relative w-full h-full">
      <img 
        src={thumbnailPreview} 
        alt="Preview" 
        className="w-full h-full object-contain" 
      />
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="absolute top-0 right-0"
        onClick={onRemove}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
