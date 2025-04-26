import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTENT_TYPE_LABELS, ContentType } from "@/lib/types";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader className="pb-4">
          <SheetTitle>Меню навигации</SheetTitle>
        </SheetHeader>
        <div className="grid gap-2 py-4">
          <Button asChild variant="default" className="justify-start gap-2">
            <Link to="/upload">
              <Plus className="h-4 w-4" />
              Загрузить контент
            </Link>
          </Button>

          <div className="mt-4 mb-2">
            <div className="text-xs font-semibold text-muted-foreground mb-2 px-1">
              Навигация
            </div>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/">Главная</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to="/search">
                <Search className="h-4 w-4 mr-2" />
                Поиск
              </Link>
            </Button>
          </div>

          <div className="mt-4">
            <div className="text-xs font-semibold text-muted-foreground mb-2 px-1">
              Категории
            </div>
            <div className="grid gap-1">
              {Object.entries(CONTENT_TYPE_LABELS).map(([type, label]) => (
                <Button 
                  key={type} 
                  asChild 
                  variant="ghost" 
                  className="w-full justify-start"
                >
                  <Link to={`/category/${type}`}>{label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}