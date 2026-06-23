import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";

export const Route = createFileRoute("/impressum")({ component: Page });

function Page() {
  return (
    <PublicLayout>
      <div className="container-app py-12 max-w-3xl">
        <h1 className="text-3xl font-bold">Impressum</h1>
        <div className="mt-8 grid sm:grid-cols-2 gap-6 text-sm">
          <div className="glass p-5">
            <div className="text-xs text-[color:var(--color-text-muted)] mb-1">Betreiber</div>
            <div className="font-semibold">SoVoice AG</div>
            <div className="text-[color:var(--color-text-muted)] mt-1">Bahnhofstrasse 1<br/>8001 Zürich<br/>Schweiz</div>
          </div>
          <div className="glass p-5">
            <div className="text-xs text-[color:var(--color-text-muted)] mb-1">Kontakt</div>
            <div className="text-[color:var(--color-text-muted)]">team@sovoice.ch<br/>+41 44 000 00 00</div>
          </div>
          <div className="glass p-5">
            <div className="text-xs text-[color:var(--color-text-muted)] mb-1">Handelsregister</div>
            <div className="text-[color:var(--color-text-muted)]">CHE-XXX.XXX.XXX</div>
          </div>
          <div className="glass p-5">
            <div className="text-xs text-[color:var(--color-text-muted)] mb-1">Verantwortlich</div>
            <div className="text-[color:var(--color-text-muted)]">SoVoice Team</div>
          </div>
        </div>
        <Link to="/" className="btn-secondary mt-10 inline-flex">Zurück zur Startseite</Link>
      </div>
    </PublicLayout>
  );
}
