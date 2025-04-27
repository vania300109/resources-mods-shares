import { Label } from "@/components/ui/label";
import { ThumbnailPreview } from "./ThumbnailPreview";
import { ThumbnailUpload } from "./ThumbnailUpload";

interface ThumbnailSectionProps {
  thumbnailPreview: string | null;
  onThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThumbnailRemove: () => void;
}

export const ThumbnailSection = ({ 
  thumbnailPreview, 
  onThumbnailChange,
  onThumbnailRemove
}: ThumbnailSectionProps) => {
  return (
    <div className="grid gap-4">
      <Label htmlFor="thumbnail">Изображение обложки</Label>
      
      <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 h-48">
        {thumbnailPreview ? (
          <ThumbnailPreview 
            thumbnailPreview={thumbnailPreview} 
            onRemove={onThumbnailRemove} 
          />
        ) : (
          <ThumbnailUpload onFileChange={onThumbnailChange} />
        )}
      </div>
    </div>
  );
};
