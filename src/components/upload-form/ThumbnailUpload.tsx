import { ImagePlus } from "lucide-react";
import { ThumbnailUploadProps } from "./types";

export const ThumbnailUpload = ({ onFileChange }: ThumbnailUploadProps) => {
  return (
    <label 
      htmlFor="thumbnail" 
      className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
    >
      <ImagePlus className="h-12 w-12 text-muted-foreground mb-2" />
      <span className="text-sm text-muted-foreground">
        Нажмите или перетащите файл сюда
      </span>
      <input
        id="thumbnail"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </label>
  );
};
