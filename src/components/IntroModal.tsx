import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function IntroModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Принудительно показываем интро для демонстрации
    localStorage.removeItem("introShown");
    
    // Проверяем, показывали ли мы уже интро
    const introShown = localStorage.getItem("introShown");
    
    if (!introShown) {
      // Показываем интро через короткую задержку
      const timer = setTimeout(() => {
        setOpen(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Запоминаем, что интро уже показано
    localStorage.setItem("introShown", "true");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) handleClose();
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-2">
            Добро пожаловать в Minecraft Ресурсы!
          </DialogTitle>
          <DialogDescription className="text-center">
            Ваш новый источник модов, текстур и контента для Minecraft
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
            <div className="bg-primary/20 rounded-full p-2 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Находите контент</h3>
              <p className="text-sm text-muted-foreground">Просматривайте тысячи модов, текстур и других материалов</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
            <div className="bg-primary/20 rounded-full p-2 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m8 17 4 4 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Загружайте</h3>
              <p className="text-sm text-muted-foreground">Скачивайте и устанавливайте любой контент одним кликом</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
            <div className="bg-primary/20 rounded-full p-2 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 11v2" />
                <path d="m11 14 2 2.5" />
                <path d="M19.071 4.929a10 10 0 1 0 .929 14.142" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Делитесь</h3>
              <p className="text-sm text-muted-foreground">Публикуйте свои работы и получайте отзывы от сообщества</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={handleClose} className="w-full">
            Начать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}