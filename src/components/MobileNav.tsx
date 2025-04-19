import { Menu, X, Search, Upload, Home, Package, Layers, Palette, Moon, Sun, Monitor } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/providers/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] pr-0">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <img src="/logo-b.svg" alt="Logo" className="h-6 w-6" />
            Minecraft Hub
          </SheetTitle>
        </SheetHeader>
        
        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <nav className="space-y-1">
          <Link 
            to="/" 
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <Home className="h-4 w-4" />
            <span>Главная</span>
          </Link>
          <Link 
            to="/category/mod" 
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <Package className="h-4 w-4" />
            <span>Моды</span>
          </Link>
          <Link 
            to="/category/resource-pack" 
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <Layers className="h-4 w-4" />
            <span>Ресурс-паки</span>
          </Link>
          <Link 
            to="/category/shader" 
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <Palette className="h-4 w-4" />
            <span>Шейдеры</span>
          </Link>
          <Link 
            to="/upload" 
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <Upload className="h-4 w-4" />
            <span>Загрузить контент</span>
          </Link>
        </nav>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Label htmlFor="light-mode">Светлая тема</Label>
              </div>
              <Switch 
                id="light-mode" 
                checked={theme === "light"} 
                onCheckedChange={() => setTheme("light")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <Label htmlFor="dark-mode">Тёмная тема</Label>
              </div>
              <Switch 
                id="dark-mode" 
                checked={theme === "dark"} 
                onCheckedChange={() => setTheme("dark")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <Label htmlFor="system-mode">Системная тема</Label>
              </div>
              <Switch 
                id="system-mode" 
                checked={theme === "system"} 
                onCheckedChange={() => setTheme("system")}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}