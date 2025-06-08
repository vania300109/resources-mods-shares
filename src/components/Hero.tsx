import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-primary/10 py-10 md:py-16">
      <div className="container relative z-10">
        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Лучшие моды, скины и текстуры для Minecraft
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Скачивайте и загружайте модификации для любимой игры. Улучшайте графику, геймплей и делитесь своими творениями.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link to="/category/mod">
              <Button size="lg">Найти моды</Button>
            </Link>
            <Link to="/upload">
              <Button size="lg" variant="outline">Загрузить свой контент</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 hidden md:block">
        <img 
          src="/placeholder.svg" 
          alt="Декоративное изображение" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
