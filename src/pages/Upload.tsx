import { useEffect } from "react";
import { UploadForm } from "@/components/upload-form";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const navigate = useNavigate();
  
  // Используем useEffect для проверки, был ли пользователь перенаправлен с этой страницы
  // чтобы избежать двойного рендера компонентов
  useEffect(() => {
    // Сбрасываем флаг перенаправления, если он был установлен
    localStorage.removeItem("redirectedToUpload");
  }, []);

  return (
    <div>
      <main className="container py-10">
        <h1 className="font-bold text-3xl mb-6 text-center">Загрузка контента</h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Поделитесь своими модами, ресурс-паками, скинами или шейдерами с сообществом Minecraft
        </p>
        <UploadForm />
      </main>
    </div>
  );
}