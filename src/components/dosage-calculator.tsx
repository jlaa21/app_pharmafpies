"use client";

import { useState, useMemo, type FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Droplets, Pill, Beaker } from "lucide-react";

interface CalculationResult {
  title: string;
  dose: string;
  referenceDose: string;
  preparation: string;
  volume: string;
  finalDilution: string;
  Icon: FC<React.SVGProps<SVGSVGElement>>;
}

const formatNumber = (num: number | null | undefined, precision = 2): string => {
  if (num === null || num === undefined || isNaN(num)) return "-";
  // Use Intl.NumberFormat for locale-aware formatting, e.g., using comma as decimal separator
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(num);
};

export function DosageCalculator() {
  const [weight, setWeight] = useState<number[]>([12.5]);

  const parsedWeight = useMemo(() => {
    const w = weight[0];
    return isNaN(w) || w <= 0 ? null : w;
  }, [weight]);

  const calculations: CalculationResult[] = useMemo(() => {
    if (!parsedWeight) {
      return [];
    }

    // Ondansetrón
    const ondansetronDose = parsedWeight * 0.15;
    const ondansetronVol = ondansetronDose / 1; // Diluted to 1mg/ml

    // Actocortina
    const actocortinaDoseMin = parsedWeight * 1;
    const actocortinaDoseMax = parsedWeight * 5;
    const actocortinaVolMin = actocortinaDoseMin / 25;
    const actocortinaVolMax = actocortinaDoseMax / 25;

    // Polaramine
    const polaramineDoseMin = parsedWeight * 0.2;
    const polaramineDoseMax = Math.min(5, parsedWeight * 0.3);
    const polaramineVolMin = polaramineDoseMin / 1;
    const polaramineVolMax = polaramineDoseMax / 1;

    // Suero Salino
    const salineDose = parsedWeight * 20;

    return [
      {
        title: "Ondansetrón",
        dose: `${formatNumber(ondansetronDose)} mg`,
        referenceDose: "0.15 mg/kg",
        preparation: "Ampolla (4mg/2ml) diluir con 2ml SSF -> 1mg/ml.",
        volume: `Extraer ${formatNumber(ondansetronVol)} ml.`,
        finalDilution: `Completar con SSF hasta 5 ml en jeringa.`,
        Icon: Pill,
      },
      {
        title: "Actocortina",
        dose: `${formatNumber(actocortinaDoseMin)} - ${formatNumber(
          actocortinaDoseMax
        )} mg`,
        referenceDose: "1 - 5 mg/kg",
        preparation: "Polvo (75mg) reconstituir con 3ml SSF -> 25mg/ml.",
        volume: `Extraer ${formatNumber(actocortinaVolMin)} - ${formatNumber(
          actocortinaVolMax
        )} ml.`,
        finalDilution: `Completar con SSF hasta 5 ml en jeringa.`,
        Icon: Beaker,
      },
      {
        title: "Polaramine",
        dose: `${formatNumber(polaramineDoseMin)} - ${formatNumber(
          polaramineDoseMax
        )} mg`,
        referenceDose: "0.2 - 0.3 mg/kg (máx. 5 mg)",
        preparation: "Ampolla (5mg/1ml) diluir con 4ml SSF -> 1mg/ml.",
        volume: `Extraer ${formatNumber(polaramineVolMin)} - ${formatNumber(
          polaramineVolMax
        )} ml.`,
        finalDilution: `Completar con SSF hasta 5 ml en jeringa.`,
        Icon: Pill,
      },
      {
        title: "Suero Salino (Fluidoterapia)",
        dose: `${formatNumber(salineDose, 0)} ml`,
        referenceDose: "20 ml/kg",
        preparation: "Administración intravenosa directa.",
        volume: "",
        finalDilution: "",
        Icon: Droplets,
      },
    ];
  }, [parsedWeight]);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Calculadora Rápida de Dosis</CardTitle>
        <CardDescription>
          Desliza para ajustar el peso del paciente y calcular las dosis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-baseline">
            <Label htmlFor="weight-slider" className="text-base">
              Peso del Paciente
            </Label>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary w-[70px] text-right">
                {formatNumber(parsedWeight, 1)}
              </span>
              <span className="text-lg text-muted-foreground">kg</span>
            </div>
          </div>
          <Slider
            id="weight-slider"
            min={2}
            max={50}
            step={0.5}
            value={weight}
            onValueChange={setWeight}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>2 kg</span>
            <span>50 kg</span>
          </div>
        </div>

        {parsedWeight && calculations.length > 0 ? (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary">
              Resultados para {formatNumber(parsedWeight, 1)} kg
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {calculations.map((calc, index) => (
                <Card key={index} className="flex flex-col bg-primary/5">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-medium">
                      {calc.title}
                    </CardTitle>
                    <calc.Icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="flex-grow space-y-1">
                    <div className="text-2xl font-bold text-primary">
                      {calc.dose}
                    </div>
                    <p className="text-xs font-bold text-muted-foreground">
                      {calc.referenceDose}
                    </p>
                    <p className="text-xs text-muted-foreground pt-2">
                      {calc.preparation}
                    </p>
                    {calc.volume && (
                      <p className="text-xs text-muted-foreground">
                        {calc.volume}
                      </p>
                    )}
                    {calc.finalDilution && (
                      <p className="text-xs text-muted-foreground">
                        {calc.finalDilution}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-10 border-2 border-dashed rounded-lg">
            <p>Ajuste el peso para ver los cálculos.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
