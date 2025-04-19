import ContentCard from "./ContentCard";
import { MinecraftContent } from "@/lib/types";

interface ContentGridProps {
  items: MinecraftContent[];
  title?: string;
}

export default function ContentGrid({ items, title }: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl font-semibold">Материалы не найдены</h2>
        <p className="text-muted-foreground mt-2">
          По вашему запросу не найдено подходящих материалов
        </p>
      </div>
    );
  }

  return (
    <section className="py-6">
      {title && (
        <h2 className="font-bold text-2xl mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
