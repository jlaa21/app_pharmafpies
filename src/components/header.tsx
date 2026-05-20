import { Stethoscope } from "lucide-react";

export function AppHeader() {
  return (
    <header className="flex flex-col items-center justify-center space-y-2 text-center mb-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Stethoscope className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          PharmaFPIES
        </h1>
      </div>
      <p className="text-lg text-muted-foreground">
        Calculadora de dosis y consulta para el manejo de FPIES
      </p>
    </header>
  );
}
