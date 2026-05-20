import { AppHeader } from "@/components/header";
import { DosageCalculator } from "@/components/dosage-calculator";
import { ClinicalInfo } from "@/components/clinical-info";
import { AiSearch } from "@/components/ai-search";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <AppHeader />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <DosageCalculator />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <ClinicalInfo />
          <AiSearch />
        </div>
      </div>
    </main>
  );
}
