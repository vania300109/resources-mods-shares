import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ContentType, ContentUploaded, FileVersion } from "@/lib/types";
import { formSchema, FormValues } from "./types";
import { FileVersionForm } from "./FileVersionForm";
import { MainInfoForm } from "./MainInfoForm";
import { ThumbnailSection } from "./ThumbnailSection";

export default function UploadForm() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [versions, setVersions] = useState<FileVersion[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "mod",
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

  const handleThumbnailRemove = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const addVersion = (version: FileVersion) => {
    setVersions([...versions, version]);
  };

  const removeVersion = (index: number) => {
    setVersions(versions.filter((_, i) => i !== index));
  };

  const validateForm = (values: FormValues): boolean => {
    if (!thumbnail) {
      toast({
        title: "Ошибка",
        description: "Загрузите обложку",
        variant: "destructive",
      });
      return false;
    }

    if (versions.length === 0) {
      toast({
        title: "Ошибка",
        description: "Добавьте хотя бы одну версию файла",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const onSubmit = (values: FormValues) => {
    if (!validateForm(values)) return;

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
    
    // Сбрасываем форму после успешной отправки
    form.reset({
      title: "",
      description: "",
      type: "mod",
    });
    setThumbnail(null);
    setThumbnailPreview(null);
    setVersions([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MainInfoForm form={form} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Обложка</CardTitle>
            </CardHeader>
            <CardContent>
              <ThumbnailSection 
                thumbnailPreview={thumbnailPreview}
                onThumbnailChange={handleThumbnailChange}
                onThumbnailRemove={handleThumbnailRemove}
              />
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
