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
                <li><Link to="/mods" className="text-muted-foreground hover:text-foreground">Моды</Link></li>
                <li><Link to="/resource-packs" className="text-muted-foreground hover:text-foreground">Ресурс-паки</Link></li>
                <li><Link to="/datapacks" className="text-muted-foreground hover:text-foreground">Дата-паки</Link></li>
                <li><Link to="/skins" className="text-muted-foreground hover:text-foreground">Скины</Link></li>
                <li><Link to="/shaders" className="text-muted-foreground hover:text-foreground">Шейдеры</Link></li>
                <li><Link to="/modpacks" className="text-muted-foreground hover:text-foreground">Сборки</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-3">Сообщество</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Форум</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Блог</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Дискорд</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Авторам</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-3">Информация</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">О нас</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Правила</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Контакты</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Политика конфиденциальности</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© 2023 МайнКрафт Моды. Все права защищены.</p>
          <p className="mt-1">Minecraft принадлежит Mojang AB. Этот сайт не связан с Mojang.</p>
        </div>
      </div>
    </footer>
  );
}
