import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertNewsletterSubscriberSchema } from "@shared/schema";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail } from "lucide-react";

const newsletterFormSchema = insertNewsletterSubscriberSchema.extend({
  email: insertNewsletterSubscriberSchema.shape.email.email("Email inválido"),
});

type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

export default function NewsletterForm() {
  const { toast } = useToast();

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      source: "website",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: NewsletterFormValues) => {
      const response = await apiRequest("/api/newsletter-subscribers", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Inscrição confirmada!",
        description: "Você receberá nossas novidades em breve.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Erro ao inscrever",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterFormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
      <Input
        type="text"
        placeholder="Seu nome (opcional)"
        {...form.register("name")}
        className="flex-1"
        data-testid="input-newsletter-name"
      />
      <Input
        type="email"
        placeholder="Seu melhor email"
        {...form.register("email")}
        className="flex-1"
        data-testid="input-newsletter-email"
      />
      <Button
        type="submit"
        disabled={mutation.isPending}
        className="md:w-auto"
        data-testid="button-newsletter-submit"
      >
        <Mail className="h-4 w-4 mr-2" />
        {mutation.isPending ? "Inscrevendo..." : "Inscrever"}
      </Button>
    </form>
  );
}
