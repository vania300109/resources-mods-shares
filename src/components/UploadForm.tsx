import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ContentType, ContentUploaded, CONTENT_TYPE_LABELS, FileVersion } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus, Trash, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Название должно содержать не менее 5 символов.",
  }).max(100, {
    message: "Название должно содержать не более 100 символов.",
  }),
  description: z.string().min(20, {
    message: "Описание должно содержать не менее 20 символов.",
  }).max(2000, {
    message: "Описание должно содержать не более 2000 символов.",
  }),
  type: z.string().min(1, {
    message: "Выберите тип контента.",
  }),
});

interface FileVersionFormProps {
  versions: FileVersion[];
  onAdd: (version: FileVersion) => void;
  onRemove: (index: number) => void;
}

const FileVersionForm = ({ versions, onAdd, onRemove }: FileVersionFormProps) => {
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
              onCheckedChange={setUseFileUrl}
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
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div>
                  <span className="font-medium">{v.version}</span>
                  <p className="text-sm text-muted-foreground">
                    {v.fileUrl 
                      ? `URL: ${v.fileUrl.substring(0, 30)}...` 
                      : `Файл: ${v.file?.name} (${(v.file!.size / (1024 * 1024)).toFixed(2)} MB)`}
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function UploadForm() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [versions, setVersions] = useState<FileVersion[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
    },
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      
      // Создаем превью изображения
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addVersion = (version: FileVersion) => {
    setVersions([...versions, version]);
  };

  const removeVersion = (index: number) => {
    setVersions(versions.filter((_, i) => i !== index));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!thumbnail) {
      toast({
        title: "Ошибка",
        description: "Загрузите обложку",
        variant: "destructive",
      });
      return;
    }

    if (versions.length === 0) {
      toast({
        title: "Ошибка",
        description: "Добавьте хотя бы одну версию файла",
        variant: "destructive",
      });
      return;
    }

    const contentData: ContentUploaded = {
      title: values.title,
      description: values.description,
      type: values.type as ContentType,
      thumbnail,
      files: versions,
    };

    console.log("Отправка данных:", contentData);

    toast({
      title: "Контент загружен!",
      description: "Ваш контент был успешно загружен и отправлен на модерацию.",
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите название" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Опишите ваш контент" 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип контента</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип контента" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(CONTENT_TYPE_LABELS).map(([value, label]) => (
                          value !== 'all' && (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          )
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Обложка</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Label htmlFor="thumbnail">Изображение обложки</Label>
                
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 h-48">
                  {thumbnailPreview ? (
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
                        onClick={() => {
                          setThumbnail(null);
                          setThumbnailPreview(null);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
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
                        onChange={handleThumbnailChange}
                      />
                    </label>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Файлы</CardTitle>
            </CardHeader>
            <CardContent>
              <FileVersionForm 
                versions={versions} 
                onAdd={addVersion} 
                onRemove={removeVersion} 
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              <Upload className="h-4 w-4 mr-2" />
              Опубликовать материал
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}