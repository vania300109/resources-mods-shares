import { useState } from "react";
import { FileVersion } from "@/lib/types";
import { FileVersionFormProps } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { VersionItem } from "./VersionItem";

export const FileVersionForm = ({ versions, onAdd, onRemove }: FileVersionFormProps) => {
  const [version, setVersion] = useState("");
  const [useFileUrl, setUseFileUrl] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAdd = () => {
    if (!version) {
      toast({
        title: "Ошибка",
        description: "Укажите версию Minecraft",
        variant: "destructive",
      });
      return;
    }

    if (useFileUrl && !fileUrl) {
      toast({
        title: "Ошибка",
        description: "Укажите URL файла",
        variant: "destructive",
      });
      return;
    }

    if (!useFileUrl && !file) {
      toast({
        title: "Ошибка",
        description: "Выберите файл",
        variant: "destructive",
      });
      return;
    }

    const newVersion: FileVersion = {
      version,
      ...(useFileUrl ? { fileUrl } : { file: file! }),
    };

    onAdd(newVersion);
    setVersion("");
    setFileUrl("");
    setFile(null);
  };

  // Сбрасываем поля при переключении между URL и файлом
  const handleToggleFileUrl = (checked: boolean) => {
    setUseFileUrl(checked);
    // Сбрасываем соответствующие поля при переключении
    if (checked) {
      setFile(null);
    } else {
      setFileUrl("");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Файлы для разных версий</h3>
      
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mc-version">Версия Minecraft</Label>
            <Input
              id="mc-version"
              placeholder="Например: 1.19.3"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-6">
            <Switch
              id="use-url"
              checked={useFileUrl}
              onCheckedChange={handleToggleFileUrl}
            />
            <Label htmlFor="use-url">{useFileUrl ? "Ссылка на файл" : "Загрузить файл"}</Label>
          </div>
        </div>
        
        {useFileUrl ? (
          <div>
            <Label htmlFor="file-url">URL файла</Label>
            <Input
              id="file-url"
              placeholder="https://example.com/file.zip"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="file-upload">Файл</Label>
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              // Уберем value для неконтролируемого input file
              // Сделаем ключ зависимым от file, чтобы сбрасывать поле при очистке
              key={file ? "file-selected" : "file-empty"}
            />
            {file && (
              <p className="text-sm text-muted-foreground mt-1">
                Выбран файл: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
          </div>
        )}
        
        <Button type="button" onClick={handleAdd}>
          Добавить версию
        </Button>
      </div>
      
      {versions.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Добавленные версии:</h4>
          <div className="space-y-2">
            {versions.map((v, index) => (
              <VersionItem 
                key={index} 
                version={v} 
                index={index} 
                onRemove={onRemove} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
