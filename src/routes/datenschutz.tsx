import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";

export const Route = createFileRoute("/datenschutz")({ component: Page });

function Page() {
  return (
    <PublicLayout>
      <div className="container-app py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-[color:var(--color-text)]">Datenschutz</h1>
        <p className="mt-3 text-[color:var(--color-text-muted)]">SoVoice Calendar verarbeitet personenbezogene Daten ausschliesslich zur Abwicklung deiner Terminbuchung gemäss DSG und DSGVO.</p>
        <div className="mt-8 space-y-6 text-sm text-[color:var(--color-text-muted)]">
          <section>
            <h2 className="text-lg font-semibold text-[color:var(--color-text)] mb-2">1. Erhobene Daten</h2>
            <p>Name, E Mail Adresse, Telefonnummer, Firma und ergänzende Angaben zur Terminvorbereitung.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[color:var(--color-text)] mb-2">2. Zweck der Verarbeitung</h2>
            <p>Die Daten werden ausschliesslich zur Terminkoordination und Vorbereitung deines SoVoice Demo Calls verwendet.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[color:var(--color-text)] mb-2">3. Speicherung</h2>
            <p>Daten werden auf europäischen Servern gespeichert und nach Abschluss der Terminreihe gelöscht oder anonymisiert.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[color:var(--color-text)] mb-2">4. Deine Rechte</h2>
            <p>Du hast jederzeit Recht auf Auskunft, Berichtigung, Löschung und Widerspruch. Kontakt: privacy@sovoice.ch</p>
          </section>
        </div>
        <Link to="/" className="btn-secondary mt-10 inline-flex">Zurück zur Startseite</Link>
      </div>
    </PublicLayout>
  );
}
