import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/lib/types";
import { getCommentsByContentId, addComment, generateId } from "@/lib/data";
import StarRating from "@/components/StarRating";

interface CommentSectionProps {
  contentId: string;
}

export default function CommentSection({ contentId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState(() => {
    return localStorage.getItem("commentAuthorName") || "";
  });
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Загрузка комментариев при монтировании компонента
  useEffect(() => {
    loadComments();
  }, [contentId]);

  // Сохранение имени автора в localStorage
  useEffect(() => {
    if (authorName) {
      localStorage.setItem("commentAuthorName", authorName);
    }
  }, [authorName]);

  const loadComments = () => {
    const loadedComments = getCommentsByContentId(contentId);
    setComments(loadedComments);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !authorName.trim()) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    
    setIsSubmitting(true);
    
    // Создаем новый комментарий
    const comment: Comment = {
      id: generateId(),
      contentId,
      author: authorName,
      authorId: "user-" + Date.now(),
      text: newComment,
      createdAt: new Date().toISOString(),
      rating: rating
    };
    
    // Добавляем комментарий
    addComment(comment);
    
    // Обновляем список комментариев
    loadComments();
    
    // Сбрасываем поле для ввода нового комментария
    setNewComment("");
    setRating(5);
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Комментарии ({comments.length})</h2>
      
      {/* Форма добавления комментария */}
      <Card>
        <form onSubmit={handleCommentSubmit}>
          <CardHeader className="pb-3">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <label htmlFor="author-name" className="text-sm font-medium leading-none mb-2 block">
                  Ваше имя
                </label>
                <input
                  id="author-name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">
                  Ваша оценка
                </label>
                <StarRating 
                  rating={rating} 
                  onChange={setRating} 
                  size={24} 
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Поделитесь своим мнением..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[120px]"
              required
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить комментарий"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Список комментариев */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium">{comment.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                  <div>
                    <StarRating rating={comment.rating} readonly size={16} />
                  </div>
                </div>
                <p className="text-sm mt-3 whitespace-pre-line">{comment.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">
            Пока нет комментариев. Будьте первым, кто оставит отзыв!
          </p>
        </div>
      )}
    </div>
  );
}