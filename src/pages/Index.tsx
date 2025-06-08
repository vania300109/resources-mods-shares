import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ContentItem, ContentType } from "@/lib/types";
import { getMockContent } from "@/lib/data";

export default function Index() {
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ContentType | "all">("all");

  useEffect(() => {
    // Загружаем контент при монтировании
    loadContent();
  }, []);

  const loadContent = () => {
    const content = getMockContent();
    setAllContent(content);
  };

  // Фильтрация контента
  const filteredContent = allContent.filter((item) => {
    // Фильтр по типу
    const typeMatches = selectedType === "all" || item.type === selectedType;

    // Фильтр по поисковому запросу
    const searchMatches =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatches && searchMatches;
  });

  // Обработчик поиска
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Обработчик изменения типа
  const handleTypeChange = (value: string) => {
    setSelectedType(value as ContentType | "all");
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Библиотека материалов</h1>
          <p className="text-muted-foreground">
            Найдите моды, ресурс-паки, шейдеры и карты
          </p>
        </div>
        <Link to="/upload">
          <Button className="w-full md:w-auto">
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Загрузить материал
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Поиск..."
          value={searchQuery}
          onChange={handleSearch}
          className="max-w-md"
        />
      </div>

      <Tabs
        defaultValue="all"
        value={selectedType}
        onValueChange={handleTypeChange}
        className="mb-8"
      >
        <TabsList className="mb-4 grid w-full grid-cols-6 lg:grid-cols-12">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="mod">Моды</TabsTrigger>
          <TabsTrigger value="resource-pack">Ресурсы</TabsTrigger>
          <TabsTrigger value="shader">Шейдеры</TabsTrigger>
          <TabsTrigger value="map">Карты</TabsTrigger>
          <TabsTrigger value="plugin">Плагины</TabsTrigger>
          <TabsTrigger value="data-pack" className="hidden lg:block">
            Датапаки
          </TabsTrigger>
          <TabsTrigger value="skin" className="hidden lg:block">
            Скины
          </TabsTrigger>
          <TabsTrigger value="modpack" className="hidden lg:block">
            Сборки модов
          </TabsTrigger>
          <TabsTrigger value="shader-pack" className="hidden lg:block">
            Сборки шейдеров
          </TabsTrigger>
          <TabsTrigger
            value="resource-pack-collection"
            className="hidden lg:block"
          >
            Коллекции
          </TabsTrigger>
          <TabsTrigger value="complete-pack" className="hidden lg:block">
            Полные сборки
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedType}>
          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">
                Материалы не найдены
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Попробуйте изменить поисковый запрос или фильтры"
                  : "Будьте первым, кто загрузит материал в этой категории"}
              </p>
              <Link to="/upload">
                <Button>Загрузить материал</Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard = ({ item }: ContentCardProps) => {
  const getTypeLabel = (type: ContentType) => {
    const labels: Record<ContentType, string> = {
      mod: "Мод",
      "resource-pack": "Ресурс-пак",
      "data-pack": "Датапак",
      skin: "Скин",
      shader: "Шейдер",
      modpack: "Сборка модов",
      "shader-pack": "Сборка шейдеров",
      "resource-pack-collection": "Сборка ресурс-паков",
      "complete-pack": "Полная сборка",
      plugin: "Плагин",
      map: "Карта",
    };
    return labels[type] || type;
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video relative">
        <img
          src={
            item.thumbnailUrl ||
            "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070"
          }
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2">
          {getTypeLabel(item.type)}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <Link to={`/content/${item.id}`} className="hover:underline">
          <h3 className="text-xl font-semibold line-clamp-1">{item.title}</h3>
        </Link>
        <div className="text-sm text-muted-foreground">
          {item.authorName} • {new Date(item.createdAt).toLocaleDateString()}
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm line-clamp-3">{item.description}</p>
      </CardContent>
      <CardFooter className="justify-between text-sm pt-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <svg
              className="mr-1 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {item.downloadCount || 0}
          </div>
          {item.averageRating && (
            <div className="flex items-center">
              <svg
                className="mr-1 h-4 w-4 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {item.averageRating.toFixed(1)}
            </div>
          )}
        </div>
        <Link to={`/content/${item.id}`}>
          <Button variant="ghost" size="sm">
            Подробнее
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
