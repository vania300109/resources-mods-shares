import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileVersion } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

interface FileVersionFormProps {
  versions: FileVersion[];
  onAdd: (version: FileVersion) => void;
  onRemove: (index: number) => void;
}

export const FileVersionForm = ({
  versions,
  onAdd,
  onRemove,
}: FileVersionFormProps) => {
  const [versionName, setVersionName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!versionName.trim() || !fileUrl.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    // Проверяем, не существует ли уже такая версия
    if (versions.find((v) => v.version === versionName.trim())) {
      toast({
        title: "Ошибка",
        description: "Версия с таким названием уже существует",
        variant: "destructive",
      });
      return;
    }

    // Простая проверка URL
    try {
      new URL(fileUrl);
    } catch {
      toast({
        title: "Ошибка",
        description: "Некорректная ссылка на файл",
        variant: "destructive",
      });
      return;
    }

    const newVersion: FileVersion = {
      version: versionName.trim(),
      fileUrl: fileUrl.trim(),
      fileName: fileName.trim() || undefined,
    };

    onAdd(newVersion);

    // Очищаем форму
    setVersionName("");
    setFileUrl("");
    setFileName("");

    toast({
      title: "Успешно!",
      description: "Версия файла добавлена",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Добавить версию файла</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="version-name">Название версии *</Label>
              <Input
                id="version-name"
                placeholder="Например: v1.0, beta-2.1"
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="file-url">Ссылка на файл *</Label>
              <Input
                id="file-url"
                type="url"
                placeholder="https://example.com/file.zip"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Загрузите файл на любой файлообменник и вставьте прямую ссылку
                на скачивание
              </p>
            </div>

            <div>
              <Label htmlFor="file-name">Название файла (необязательно)</Label>
              <Input
                id="file-name"
                placeholder="mod-v1.0.jar"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Добавить версию
            </Button>
          </form>
        </CardContent>
      </Card>

      {versions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Добавленные версии</h3>
          <div className="space-y-2">
            {versions.map((version, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{version.version}</Badge>
                    {version.fileName && (
                      <span className="text-sm text-muted-foreground">
                        {version.fileName}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {version.fileUrl}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(index)}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                >
                  Удалить
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
