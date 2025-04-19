import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SAMPLE_CONTENT } from "@/lib/data";
import { MinecraftContent, CONTENT_TYPE_LABELS } from "@/lib/types";
import { Download, Calendar, User, HardDrive, Clock } from "lucide-react";
import ContentGrid from "@/components/ContentGrid";

export default function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<MinecraftContent | null>(null);
  const [relatedContent, setRelatedContent] = useState<MinecraftContent[]>([]);
  
  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    const foundContent = SAMPLE_CONTENT.find(item => item.id === id);
    setContent(foundContent || null);
    
    if (foundContent) {
      // Находим похожий контент того же типа
      const related = SAMPLE_CONTENT
        .filter(item => item.id !== id && item.type === foundContent.type)
        .slice(0, 3);
      setRelatedContent(related);
    }
  }, [id]);
  
  if (!content) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container py-10 text-center">
          <h1 className="text-2xl font-bold">Контент не найден</h1>
          <p className="text-muted-foreground mt-2">
            Запрашиваемый материал не существует или был удален
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка с изображением */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <img 
                  src={content.imageUrl} 
                  alt={content.title}
                  className="w-full h-auto rounded-t-lg"
                />
                <div className="p-4">
                  <Button className="w-full mb-3">
                    <Download className="mr-2 h-4 w-4" />
                    Скачать
                  </Button>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        Загрузки:
                      </span>
                      <span className="font-medium">{content.downloadCount.toLocaleString('ru-RU')}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Автор:
                      </span>
                      <span className="font-medium">{content.author}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <HardDrive className="mr-2 h-4 w-4" />
                        Размер:
                      </span>
                      <span className="font-medium">{content.fileSize}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Обновлено:
                      </span>
                      <span className="font-medium">{new Date(content.updatedAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Создано:
                      </span>
                      <span className="font-medium">{new Date(content.createdAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Правая колонка с информацией */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{CONTENT_TYPE_LABELS[content.type]}</Badge>
              {content.minecraftVersions.slice(0, 3).map((version) => (
                <Badge key={version} variant="outline">
                  {version}
                </Badge>
              ))}
              {content.minecraftVersions.length > 3 && (
                <Badge variant="outline">
                  +{content.minecraftVersions.length - 3}
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
            
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="installation">Установка</TabsTrigger>
                <TabsTrigger value="changelog">История изменений</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="pt-4">
                <div className="space-y-4">
                  <p>{content.description}</p>
                  
                  {/* Здесь может быть расширенное описание с картинками и т.д. */}
                  <p>
                    Это расширенное описание контента, которое включает в себя подробную информацию
                    о функциональности, особенностях и преимуществах данного материала для Minecraft.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6">Особенности</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Особенность 1 - описание функциональности</li>
                    <li>Особенность 2 - описание функциональности</li>
                    <li>Особенность 3 - описание функциональности</li>
                    <li>Особенность 4 - описание функциональности</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="installation" className="pt-4">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Инструкция по установке</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Скачайте файл по кнопке "Скачать"</li>
                    <li>Откройте папку .minecraft в вашей системе</li>
                    <li>Переместите файл в соответствующую папку (mods, resourcepacks, и т.д.)</li>
                    <li>Запустите Minecraft и наслаждайтесь!</li>
                  </ol>
                  
                  <div className="p-4 bg-primary/10 rounded-md mt-4">
                    <h4 className="font-medium">Требования</h4>
                    <ul className="list-disc list-inside mt-2">
                      <li>Minecraft {content.minecraftVersions[0]} или новее</li>
                      <li>Forge/Fabric (для модов)</li>
                      <li>4 ГБ оперативной памяти (рекомендуется)</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="changelog" className="pt-4">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">История изменений</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <span>Версия 1.2.0</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({new Date(content.updatedAt).toLocaleDateString('ru-RU')})
                        </span>
                      </h4>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Добавлена новая функциональность</li>
                        <li>Исправлены ошибки с совместимостью</li>
                        <li>Улучшена производительность</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center">
                        <span>Версия 1.1.0</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          (15.06.2023)
                        </span>
                      </h4>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Добавлена поддержка Minecraft 1.19.4</li>
                        <li>Улучшен пользовательский интерфейс</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center">
                        <span>Версия 1.0.0</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({new Date(content.createdAt).toLocaleDateString('ru-RU')})
                        </span>
                      </h4>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Первый релиз</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Похожие материалы */}
        {relatedContent.length > 0 && (
          <div className="mt-12">
            <ContentGrid
              title="Похожие материалы"
              items={relatedContent}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
