import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="md:w-1/3">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo-b.svg" alt="Логотип" className="h-6 w-6" />
              <span className="text-lg font-bold">МайнКрафт Моды</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Лучший сайт для скачивания и публикации модов, ресурс-паков, скинов и других материалов для Minecraft.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Категории</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/category/mod" className="text-muted-foreground hover:text-foreground">Моды</Link></li>
                <li><Link to="/category/resource-pack" className="text-muted-foreground hover:text-foreground">Ресурс-паки</Link></li>
                <li><Link to="/category/data-pack" className="text-muted-foreground hover:text-foreground">Дата-паки</Link></li>
                <li><Link to="/category/skin" className="text-muted-foreground hover:text-foreground">Скины</Link></li>
                <li><Link to="/category/shader" className="text-muted-foreground hover:text-foreground">Шейдеры</Link></li>
                <li><Link to="/category/plugin" className="text-muted-foreground hover:text-foreground">Плагины</Link></li>
                <li><Link to="/category/modpack" className="text-muted-foreground hover:text-foreground">Сборки</Link></li>
                <li><Link to="/category/map" className="text-muted-foreground hover:text-foreground">Карты</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} МайнКрафт Моды. Все права защищены.</p>
          <p className="mt-1">Minecraft принадлежит Mojang AB. Этот сайт не связан с Mojang.</p>
        </div>
      </div>
    </footer>
  );
}