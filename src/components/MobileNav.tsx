import { Link } from "react-router-dom";
import { Blocks, Package, Database, User, Paintbrush, Box } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const navItems = [
  {
    title: "Моды",
    href: "/mods",
    icon: <Blocks className="h-5 w-5" />,
  },
  {
    title: "Ресурс-паки",
    href: "/resource-packs",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Дата-паки",
    href: "/datapacks",
    icon: <Database className="h-5 w-5" />,
  },
  {
    title: "Скины",
    href: "/skins",
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Шейдеры",
    href: "/shaders",
    icon: <Paintbrush className="h-5 w-5" />,
  },
  {
    title: "Сборки",
    href: "/modpacks",
    icon: <Box className="h-5 w-5" />,
  },
];

export function MobileNav() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
      <div className="flex flex-col gap-2 p-4">
        <Link to="/" className="flex items-center gap-2 px-4 py-2">
          <img src="/logo-b.svg" alt="Логотип" className="h-6 w-6" />
          <span className="text-lg font-bold">МайнКрафт Моды</span>
        </Link>

        <div className="mt-4">
          <div className="text-sm font-semibold px-4 py-2 text-muted-foreground">
            Категории
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </div>

        <div className="mt-4">
          <div className="text-sm font-semibold px-4 py-2 text-muted-foreground">
            Действия
          </div>
          <Link
            to="/upload"
            className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
          >
            <Box className="h-5 w-5" />
            <span>Загрузить контент</span>
          </Link>
        </div>
      </div>
    </ScrollArea>
  );
}