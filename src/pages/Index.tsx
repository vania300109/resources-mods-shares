import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContentGrid from "@/components/ContentGrid";
import Footer from "@/components/Footer";
import { SAMPLE_CONTENT } from "@/lib/data";
import { useState } from "react";
import { ContentType } from "@/lib/types";
import CategoryFilter from "@/components/CategoryFilter";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<ContentType | "all">("all");
  
  const filteredContent = selectedCategory === "all" 
    ? SAMPLE_CONTENT 
    : SAMPLE_CONTENT.filter(item => item.type === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        
        <div className="container py-8">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <ContentGrid 
            items={filteredContent}
            title={selectedCategory === "all" ? "Популярные материалы" : undefined}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
