import { useState } from "react";
import { FileVersion } from "@/lib/types";
import { FileVersionFormProps } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { VersionItem } from "./VersionItem";
import { 
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";

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

    // Проверяем URL файла для скачивания
    if (useFileUrl && fileUrl) {
      const validFileHostings = [
        "wetransfer.com",
        "files.io",
        "drive.google.com",
        "dropbox.com",
        "mediafire.com",
        "mega.nz",
        "yandex.ru/disk",
        "cloud.mail.ru"
      ];

      // Проверяем, содержит ли URL один из допустимых хостингов
      const isValidFileUrl = validFileHostings.some(host => fileUrl.includes(host));

      if (!isValidFileUrl) {
        toast({
          title: "Предупреждение",
          description: "Ссылка должна быть на проверенный файловый хостинг и вести на скачивание файла",
          variant: "destructive",
        });
        // Разрешаем продолжить, но с предупреждением
      }
    }

    const newVersion: FileVersion = {
      version,
      ...(useFileUrl ? { fileUrl, fileName: getFileNameFromUrl(fileUrl) } : { file: file!, fileName: file!.name, fileSize: formatFileSize(file!.size) }),
    };

    onAdd(newVersion);
    setVersion("");
    setFileUrl("");
    setFile(null);
  };

  // Получаем имя файла из URL
  const getFileNameFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const pathSegments = urlObj.pathname.split('/');
      const lastSegment = pathSegments[pathSegments.length - 1];

      // Если последний сегмент содержит расширение файла, возвращаем его
      if (lastSegment.includes('.')) {
        return lastSegment;
      }
      
      // Иначе возвращаем общее название
      return `file-${version}.zip`;
    } catch (e) {
      return `file-${version}.zip`;
    }
  };

  // Форматируем размер файла
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
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
      
      <Alert className="bg-amber-50 border-amber-200 mb-4">
        <AlertTitle className="text-amber-700">Важно! Подготовьте файл для загрузки</AlertTitle>
        <AlertDescription className="text-amber-700">
          <p className="mb-2">Для загрузки файла используйте один из следующих сервисов:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><a href="https://wetransfer.com" target="_blank" rel="noopener noreferrer" className="underline">WeTransfer</a></li>
            <li><a href="https://files.io" target="_blank" rel="noopener noreferrer" className="underline">Files.io</a></li>
            <li><a href="https://www.mediafire.com" target="_blank" rel="noopener noreferrer" className="underline">MediaFire</a></li>
            <li>Или другой файловый хостинг</li>
          </ul>
          <p className="mt-2">После загрузки скопируйте прямую ссылку на скачивание файла.</p>
        </AlertDescription>
      </Alert>
      
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
            <Label htmlFor="file-url">URL файла для скачивания</Label>
            <Input
              id="file-url"
              placeholder="https://wetransfer.com/downloads/your-file"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Ссылка должна вести напрямую на скачивание файла
            </p>
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