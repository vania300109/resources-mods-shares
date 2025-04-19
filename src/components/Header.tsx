import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileNav } from "./MobileNav";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <MobileNav />
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-b.svg" alt="Логотип" className="h-8 w-8" />
            <span className="text-xl font-bold">МайнКрафт Моды</span>
          </Link>
        </div>

        {isSearchOpen ? (
          <div className="flex-1 mx-4 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Искать моды, ресурс-паки, шейдеры..."
                className="pl-8 w-full"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/mods" className="hover:text-primary font-medium">Моды</Link>
            <Link to="/resource-packs" className="hover:text-primary font-medium">Ресурс-паки</Link>
            <Link to="/datapacks" className="hover:text-primary font-medium">Дата-паки</Link>
            <Link to="/skins" className="hover:text-primary font-medium">Скины</Link>
            <Link to="/shaders" className="hover:text-primary font-medium">Шейдеры</Link>
            <Link to="/modpacks" className="hover:text-primary font-medium">Сборки</Link>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {!isSearchOpen && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Link to="/upload">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Загрузить
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
