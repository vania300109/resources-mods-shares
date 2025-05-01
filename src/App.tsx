import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Index from "@/pages/Index";
import CategoryPage from "@/pages/CategoryPage";
import ContentDetail from "@/pages/ContentDetail";
import NotFound from "@/pages/NotFound";
import Upload from "@/pages/Upload";
import SearchPage from "@/pages/SearchPage";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntroModal from "@/components/IntroModal";
import "./App.css";

function App() {
  // Функция для перезагрузки страницы после 3 минут бездействия
  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;
    
    const resetTimer = () => {
      // Очищаем предыдущий таймер
      clearTimeout(inactivityTimer);
      // Устанавливаем новый таймер на 3 минуты (180000 мс)
      inactivityTimer = setTimeout(() => {
        window.location.reload();
      }, 180000);
    };
    
    // События, которые сбрасывают таймер
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    
    // Инициализируем таймер
    resetTimer();
    
    // Добавляем слушатели событий
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });
    
    // Очистка при размонтировании компонента
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/content/:id" element={<ContentDetail />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <IntroModal />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
