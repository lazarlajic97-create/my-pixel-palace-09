import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { ArrowRight, Check, Shield, Zap, Calendar as CalIcon, PhoneCall, Sparkles, Building2, Stethoscope, Wrench, GraduationCap, Scale, Dumbbell, Home as HomeIcon, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="container-app pt-16 md:pt-24 pb-16 md:pb-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="chip mb-5">
                <Sparkles className="h-3 w-3 text-[color:var(--color-accent)]" />
                KI Telefonagent für Unternehmen
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                Buche deinen <span className="bg-gradient-to-r from-[#60a5fa] via-[#22d3ee] to-[#a78bfa] bg-clip-text text-transparent">SoVoice Demo</span> Termin in wenigen Sekunden.
              </h1>
              <p className="mt-6 text-lg text-[color:var(--color-text-muted)] max-w-xl">
                Wähle einen passenden Zeitpunkt und erfahre, wie ein KI Telefonagent deine Anrufe automatisiert, dein Team entlastet und mehr Termine für dein Unternehmen sichert.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/book" className="btn-primary">Termin buchen <ArrowRight className="h-4 w-4" /></Link>
                <a href="https://sovoice.ch" className="btn-secondary">SoVoice kennenlernen</a>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-xs text-[color:var(--color-text-muted)]">
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[color:var(--color-success)]" /> Demo in 30 Minuten</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[color:var(--color-success)]" /> Keine Kreditkarte erforderlich</span>
                <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[color:var(--color-accent)]" /> DSG & DSGVO bewusst</span>
              </div>
            </div>

            {/* Calendar preview card */}
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-[rgba(37,99,235,0.25)] via-transparent to-[rgba(139,92,246,0.2)] blur-3xl" />
              <div className="relative glass-strong p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm font-semibold">SoVoice Demo Call</div>
                    <div className="text-xs text-[color:var(--color-text-muted)]">30 Minuten · Online</div>
                  </div>
                  <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" /> Verfügbar</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-[color:var(--color-text-dim)] mb-2">
                  {["Mo","Di","Mi","Do","Fr","Sa","So"].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1 mb-5">
                  {Array.from({length:35}, (_,i) => {
                    const day = i - 2;
                    const valid = day > 0 && day <= 30;
                    const wknd = i % 7 >= 5;
                    const sel = day === 18;
                    return (
                      <div key={i} className={`aspect-square grid place-items-center rounded-md text-xs ${
                        sel ? "bg-gradient-to-br from-[#3b82f6] to-[#1e40af] text-white shadow-[0_0_18px_-2px_rgba(59,130,246,0.7)] font-semibold" :
                        !valid || wknd ? "text-[color:var(--color-text-dim)] opacity-30" : "text-[color:var(--color-text)] hover:bg-white/5"
                      }`}>{valid ? day : ""}</div>
                    );
                  })}
                </div>
                <div className="text-xs font-medium text-[color:var(--color-text-muted)] mb-2">Verfügbare Zeiten</div>
                <div className="grid grid-cols-3 gap-2">
                  {["09:00","10:30","14:00"].map((t,i) => (
                    <div key={t} className={`px-2 py-2 rounded-lg text-xs text-center font-medium border ${i===1 ? "bg-gradient-to-br from-[#3b82f6] to-[#1e40af] text-white border-[#60a5fa]" : "border-[color:var(--color-border-strong)] bg-white/[0.02]"}`}>{t}</div>
                  ))}
                </div>
              </div>

              {/* Floating AI Call Card */}
              <div className="absolute -bottom-6 -left-4 md:-left-12 glass-strong p-4 max-w-xs hidden sm:block">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-[#22d3ee] to-[#0891b2] grid place-items-center">
                    <PhoneCall className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold">SoVoice Agent · Live</div>
                    <div className="text-[11px] text-[color:var(--color-text-muted)] mt-0.5">Antwortet in Echtzeit. Bucht Termine. Entlastet dein Team.</div>
                    <div className="mt-2 flex items-center gap-0.5">
                      {[6,12,8,14,10,16,9,13,7,11].map((h,i) => (
                        <span key={i} className="w-0.5 rounded-full bg-[color:var(--color-accent)]" style={{height: h}} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center text-xs text-[color:var(--color-text-muted)]">
            Für Praxen · Garagen · Fitnessstudios · Kanzleien · Versicherungen · Bildungsanbieter · Handwerk · Dienstleister
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="container-app py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">Mehr Termine. Weniger Telefonstress.</h2>
          <p className="mt-3 text-[color:var(--color-text-muted)]">Ein professioneller Buchungsprozess gepaart mit einem KI Telefonagenten, der nie ein Gespräch verpasst.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Zap, t: "Demo in Sekunden buchen", d: "Interessenten wählen direkt einen passenden Zeitpunkt." },
            { icon: CalIcon, t: "Automatisierte Terminstruktur", d: "Alle Anfragen landen sauber im Kalender." },
            { icon: PhoneCall, t: "Perfekt für SoVoice Demos", d: "Zeige Kunden direkt, wie KI Telefonie im Alltag funktioniert." },
            { icon: Sparkles, t: "Professioneller erster Eindruck", d: "Ein hochwertiger Prozess stärkt Vertrauen vor dem Gespräch." },
          ].map(({icon:Icon,t,d}) => (
            <div key={t} className="glass p-5 hover:border-[rgba(59,130,246,0.3)] transition group">
              <div className="h-10 w-10 rounded-lg bg-[rgba(37,99,235,0.15)] border border-[rgba(59,130,246,0.3)] grid place-items-center mb-4 group-hover:scale-110 transition">
                <Icon className="h-5 w-5 text-[#60a5fa]" />
              </div>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm text-[color:var(--color-text-muted)]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* So funktioniert es */}
      <section className="container-app py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">So funktioniert die Buchung</h2>
          <p className="mt-3 text-[color:var(--color-text-muted)]">In vier klaren Schritten zu deinem SoVoice Termin.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Terminart wählen","Zeitpunkt auswählen","Daten eintragen","Bestätigung erhalten"].map((s,i) => (
            <div key={s} className="glass p-5 relative">
              <div className="text-5xl font-bold bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent opacity-60">0{i+1}</div>
              <div className="mt-2 font-semibold">{s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Für wen */}
      <section className="container-app py-20">
        <div className="max-w-2xl"><h2 className="text-3xl md:text-4xl font-bold">Für wen ist SoVoice geeignet?</h2>
          <p className="mt-3 text-[color:var(--color-text-muted)]">Branchenübergreifend optimiert für Unternehmen mit hohem Anrufvolumen.</p></div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {icon:Stethoscope,name:"Arztpraxen"},{icon:Wrench,name:"Garagen"},{icon:Dumbbell,name:"Fitnessstudios"},
            {icon:Scale,name:"Kanzleien"},{icon:ShieldCheck,name:"Versicherungsbroker"},{icon:GraduationCap,name:"Bildungsanbieter"},
            {icon:Building2,name:"Handwerksbetriebe"},{icon:HomeIcon,name:"Dienstleister"},
          ].map(({icon:Icon,name}) => (
            <div key={name} className="glass p-4 flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-lg bg-white/5 grid place-items-center"><Icon className="h-4 w-4 text-[#60a5fa]" /></div>
              <span className="text-sm font-medium truncate">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-app pb-20">
        <div className="glass-strong p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Bereit für deinen Demo Call?</h2>
              <p className="mt-2 text-[color:var(--color-text-muted)]">30 Minuten – unverbindlich. Wir analysieren gemeinsam, wo Automatisierung Sinn macht.</p>
            </div>
            <Link to="/book" className="btn-primary">Jetzt Termin buchen <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
