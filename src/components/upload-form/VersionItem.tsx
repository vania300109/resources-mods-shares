import { FileVersion } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VersionItemProps {
  version: FileVersion;
  index: number;
  onRemove: (index: number) => void;
}

export const VersionItem = ({ version, index, onRemove }: VersionItemProps) => {
  // Получаем имя файла для отображения
  const displayName = version.fileName || (version.file 
    ? version.file.name 
    : version.fileUrl 
      ? new URL(version.fileUrl).pathname.split('/').pop() || 'file.zip'
      : 'file.zip');

  // Получаем размер файла для отображения
  const fileSize = version.fileSize || (version.file 
    ? `${(version.file.size / (1024 * 1024)).toFixed(2)} MB` 
    : '');

  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-background">
      <div className="flex items-center space-x-3">
        <Badge variant="outline">{version.version}</Badge>
        <div className="flex flex-col">
          <span className="text-sm font-medium truncate max-w-[200px]">{displayName}</span>
          {fileSize && <span className="text-xs text-muted-foreground">{fileSize}</span>}
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </Button>
    </div>
  );
};