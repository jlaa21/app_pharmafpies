"use client";

import { useFormStatus } from "react-dom";
import { BrainCircuit, Sparkles, LoaderCircle } from "lucide-react";
import { askAI } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useActionState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  summary: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-accent hover:bg-accent/90 text-accent-foreground"
    >
      {pending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Sparkles />
      )}
      Consultar IA
    </Button>
  );
}

export function AiSearch() {
  const [state, formAction] = useActionState(askAI, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error de la IA",
        description: state.error,
      });
    }
    if(state.summary) {
        // Not resetting form on purpose to allow follow-up questions.
    }
  }, [state, toast]);


  return (
    <Card className="shadow-lg">
      <form action={formAction} ref={formRef}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>Buscador Inteligente</CardTitle>
              <CardDescription>
                Consulta sobre protocolo o bibliografía
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ai-query">Tu pregunta:</Label>
              <Textarea
                id="ai-query"
                name="query"
                placeholder="Ej: ¿Cuál es la dosis de Ondansetrón para un niño de 15kg?"
                required
                rows={3}
              />
            </div>
            {state?.summary && (
              <Card className="bg-primary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Respuesta de la IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/90">{state.summary}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
