import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UploadForm } from "@/components/upload-form";

export default function Upload() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container py-10">
        <h1 className="font-bold text-3xl mb-6 text-center">Загрузка контента</h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Поделитесь своими модами, ресурс-паками, скинами или шейдерами с сообществом Minecraft
        </p>
        <UploadForm />
      </main>
      <Footer />
    </div>
  );
}
