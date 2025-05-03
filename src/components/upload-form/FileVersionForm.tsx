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

    // Проверяем URL файла для SendFilesEncrypted
    if (useFileUrl && fileUrl) {
      const validFileHosting = "sendfilesencrypted.com";

      // Проверяем, содержит ли URL допустимый хостинг
      const isValidFileUrl = fileUrl.includes(validFileHosting);

      if (!isValidFileUrl) {
        toast({
          title: "Предупреждение",
          description: "Используйте только sendfilesencrypted.com для загрузки файлов",
          variant: "destructive",
        });
        return; // Не позволяем добавить версию с неправильным URL
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

  // Обрабатываем открытие сервиса в новой вкладке
  const handleOpenService = () => {
    window.open('https://sendfilesencrypted.com/send-files-online-fast/?lang=ru', '_blank');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Файлы для разных версий</h3>
      
      <Alert className="bg-blue-50 border-blue-200 mb-4">
        <AlertTitle className="text-blue-700">Важно! Используйте только SendFilesEncrypted</AlertTitle>
        <AlertDescription className="text-blue-700">
          <p className="mb-2">Для загрузки файла используйте только рекомендованный сервис:</p>
          <Button
            variant="outline"
            className="mb-2 border-blue-300 hover:bg-blue-100 text-blue-700"
            onClick={handleOpenService}
          >
            <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            SendFilesEncrypted.com
          </Button>
          <p>Загрузите файл на сервис, затем вставьте полученную ссылку в поле ниже.</p>
          <p className="mt-2 font-medium">Ссылка должна быть только на скачивание файла!</p>
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
              placeholder="https://sendfilesencrypted.com/..."
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Ссылка должна быть с SendFilesEncrypted и вести напрямую на скачивание файла
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