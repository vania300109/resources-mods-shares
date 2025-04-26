import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MinecraftContent } from "@/lib/types";
import ContentGrid from "@/components/ContentGrid";
import { getMockContent } from "@/lib/data";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<MinecraftContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация поиска
    setLoading(true);
    
    setTimeout(() => {
      // Получаем все данные и фильтруем их локально
      const allContent = getMockContent();
      
      // Фильтруем по поисковому запросу (в заголовке или описании)
      const filtered = allContent.filter(content => 
        content.title.toLowerCase().includes(query.toLowerCase()) || 
        content.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filtered);
      setLoading(false);
    }, 500);
  }, [query]);

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight mb-4">
        Результаты поиска: "{query}"
      </h1>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : results.length > 0 ? (
        <ContentGrid items={results} />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Ничего не найдено</h2>
          <p className="text-muted-foreground">
            По запросу "{query}" не найдено подходящего контента. Попробуйте изменить поисковый запрос.
          </p>
        </div>
      )}
    </>
  );
}