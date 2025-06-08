import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import useMediaQuery from "@/hooks/use-mobile";
import AuthDialog from "@/components/auth/AuthDialog";
import { getCurrentUser, logout, isAuthenticated } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleAuthSuccess = () => {
    setUser(getCurrentUser());
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из аккаунта",
    });
  };

  const handleUploadClick = () => {
    if (!isAuthenticated()) {
      setAuthDialogOpen(true);
    } else {
      navigate("/upload");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo-b.svg" alt="Logo" className="h-6 w-6" />
            <span className="hidden md:inline">Minecraft Vani</span>
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Главная
              </Link>
              <Link
                to="/category/all"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Всё
              </Link>
              <Link
                to="/category/mod"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Моды
              </Link>
              <Link
                to="/category/resource-pack"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Ресурс-паки
              </Link>
              <Link
                to="/category/shader"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Шейдеры
              </Link>
              <Link
                to="/category/plugin"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Плагины
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск..."
              className="w-44 lg:w-64 pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <ThemeToggle />

          {!isMobile ? (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">{user.username}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleUploadClick}>
                      Загрузить контент
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setAuthDialogOpen(true)}>Войти</Button>
              )}
              <Button onClick={handleUploadClick}>Загрузить контент</Button>
            </>
          ) : (
            <>
              <form onSubmit={handleSearch} className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Поиск..."
                  className="w-32 pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <MobileNav />
            </>
          )}
        </div>
      </div>
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onSuccess={handleAuthSuccess}
      />
    </header>
  );
}
