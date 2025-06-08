import { CONTENT_TYPE_LABELS, ContentType } from "@/lib/types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

interface MainInfoFormProps {
  form: UseFormReturn<FormValues>;
}

export const MainInfoForm = ({ form }: MainInfoFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Название</FormLabel>
            <FormControl>
              <Input placeholder="Введите название" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Описание</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Опишите ваш контент" 
                className="min-h-32"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Тип контента</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value || "mod"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип контента" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(CONTENT_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
