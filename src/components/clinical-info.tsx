import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clinicalData } from "@/lib/clinical-data";
import { BookText } from "lucide-react";

export function ClinicalInfo() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <BookText className="w-8 h-8 text-primary" />
          <div>
            <CardTitle>Información Clínica</CardTitle>
            <CardDescription>Resumen de FPIES</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue="protocol">
          <AccordionItem value="definition">
            <AccordionTrigger>{clinicalData.definition.title}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {clinicalData.definition.content}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="symptoms">
            <AccordionTrigger>{clinicalData.symptoms.title}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {clinicalData.symptoms.content}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="protocol">
            <AccordionTrigger>{clinicalData.protocol.title}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground whitespace-pre-line">
              {clinicalData.protocol.content}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="other-data">
            <AccordionTrigger>{clinicalData.otherData.title}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {clinicalData.otherData.content}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="bibliography">
            <AccordionTrigger>
              {clinicalData.bibliography.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-4">
                {clinicalData.bibliography.references.map((ref, index) => (
                  <li key={index}>
                    <p className="text-sm text-foreground/80">{ref.text}</p>
                    <a
                      href={`https://doi.org/${ref.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      DOI: {ref.doi}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
