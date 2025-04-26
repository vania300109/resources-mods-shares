import { Route, Routes } from "react-router-dom";
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
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
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
      <Toaster />
    </ThemeProvider>
  );
}

export default App;