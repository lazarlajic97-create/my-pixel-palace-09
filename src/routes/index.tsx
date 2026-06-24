import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { CosmicParallaxBg } from "@/components/CosmicParallaxBg";
import {
  ArrowRight, Check, Shield, Zap, Calendar as CalIcon, PhoneCall, Sparkles,
  Building2, Stethoscope, Wrench, GraduationCap, Scale, Dumbbell,
  Home as HomeIcon, ShieldCheck, Clock, TrendingUp, Star, Quote,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <PublicLayout>
      {/* HERO – Cosmic Parallax */}
      <section className="relative">
        <CosmicParallaxBg
          head="SoVoice Calendar"
          text="Dein KI Kalender für Demos, Beratung & Onboarding"
          className="min-h-[88vh] flex items-center justify-center pt-12 pb-24"
        >
          <div className="mt-10 flex flex-col items-center gap-4">
            <span className="chip backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-[color:var(--color-accent)]" />
              Powered by SoVoice AI · Vollautomatische Terminvergabe
            </span>
            <p className="max-w-2xl text-base md:text-lg text-[color:var(--color-text-muted)]">
              Die Kalender Plattform für Unternehmen mit SoVoice. Definiere deine Event Typen,
              Verfügbarkeiten und Regeln – der SoVoice KI Agent telefoniert mit deinen Kunden
              und trägt jeden Termin mit allen Details automatisch ein.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link to="/admin" className="btn-primary pulse-glow">
                Admin Dashboard öffnen <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/book" className="btn-secondary">Buchungsansicht ansehen</Link>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-[color:var(--color-text-muted)]">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[color:var(--color-success)]" /> Vollständig konfigurierbar</span>
              <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[color:var(--color-accent)]" /> DSG & DSGVO bewusst</span>
              <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-[color:var(--color-warning)]" /> Für SoVoice Kunden</span>
            </div>
          </div>
        </CosmicParallaxBg>

        {/* Floating preview card overlapping hero */}
        <div className="container-app -mt-20 md:-mt-28 relative z-20 max-w-5xl">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-4 items-stretch">
            <div className="glass-strong p-5 float-slow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[13px] font-semibold">SoVoice Demo Call</div>
                  <div className="text-[11px] text-[color:var(--color-text-muted)]">30 Min · Google Meet</div>
                </div>
                <span className="chip text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)] animate-pulse" /> Live</span>
              </div>
              <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-[color:var(--color-text-dim)] mb-1.5">
                {["Mo","Di","Mi","Do","Fr","Sa","So"].map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-0.5 mb-4">
                {Array.from({length:35}, (_,i) => {
                  const day = i - 2;
                  const valid = day > 0 && day <= 30;
                  const wknd = i % 7 >= 5;
                  const sel = day === 18;
                  return (
                    <div key={i} className={`aspect-square grid place-items-center rounded text-[10px] transition ${
                      sel ? "bg-gradient-to-br from-[#3b82f6] to-[#1e40af] text-white shadow-[0_0_14px_-2px_rgba(59,130,246,0.7)] font-semibold scale-105" :
                      !valid || wknd ? "text-[color:var(--color-text-dim)] opacity-30" : "text-[color:var(--color-text)] hover:bg-white/5"
                    }`}>{valid ? day : ""}</div>
                  );
                })}
              </div>
              <div className="text-[11px] font-medium text-[color:var(--color-text-muted)] mb-1.5">Verfügbare Zeiten · Do, 18. Juni</div>
              <div className="grid grid-cols-4 gap-1.5">
                {["09:00","10:30","14:00","16:30"].map((t,i) => (
                  <div key={t} className={`px-1 py-1.5 rounded-md text-[11px] text-center font-medium border ${i===1 ? "bg-gradient-to-br from-[#3b82f6] to-[#1e40af] text-white border-[#60a5fa] shadow-[0_6px_18px_-8px_rgba(59,130,246,0.6)]" : "border-[color:var(--color-border-strong)] bg-white/[0.02]"}`}>{t}</div>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <div className="glass-strong p-4 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[rgba(34,211,238,0.25)] blur-3xl" />
                <div className="relative flex items-start gap-2.5">
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-[#22d3ee] to-[#0891b2] grid place-items-center pulse-glow">
                    <PhoneCall className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold">SoVoice Agent · Live</div>
                    <div className="text-[10px] text-[color:var(--color-text-muted)] mt-0.5">Antwortet in Echtzeit · 24/7 erreichbar.</div>
                    <div className="mt-2 flex items-end gap-0.5 h-6">
                      {[6,12,8,14,10,16,9,13,7,11,8,14].map((h,i) => (
                        <span key={i} className="w-0.5 rounded-full bg-gradient-to-t from-[#3b82f6] to-[#22d3ee]" style={{height: h*1.2, animation: `float-y ${1 + (i%5)*0.3}s ease-in-out infinite`}} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "+38%", l: "mehr Buchungen", i: TrendingUp },
                  { v: "<2 Min", l: "Buchungsdauer", i: Clock },
                ].map(({v,l,i:Icon}) => (
                  <div key={l} className="glass p-3">
                    <Icon className="h-3.5 w-3.5 text-[color:var(--color-accent)] mb-1.5" />
                    <div className="text-lg font-bold bg-gradient-to-r from-white to-[#93c5fd] bg-clip-text text-transparent leading-none">{v}</div>
                    <div className="text-[10px] text-[color:var(--color-text-muted)] mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Branchen marquee */}
      <section className="py-12 mt-12 border-y border-[color:var(--color-border)] bg-[color:var(--color-bg-elev)]/40 overflow-hidden">
        <div className="text-center text-xs uppercase tracking-widest text-[color:var(--color-text-dim)] mb-6">
          Vertraut von Unternehmen aus 8+ Branchen
        </div>
        <div className="relative">
          <div className="flex marquee-track whitespace-nowrap gap-12 w-max">
            {[...Array(2)].flatMap((_,k) =>
              ["Arztpraxen","Garagen","Fitnessstudios","Kanzleien","Versicherungsbroker","Bildungsanbieter","Handwerksbetriebe","Dienstleister"]
                .map((b,i) => (
                  <span key={`${k}-${i}`} className="text-base md:text-lg font-semibold text-[color:var(--color-text-muted)] inline-flex items-center gap-3">
                    {b} <span className="text-[color:var(--color-accent)]">·</span>
                  </span>
                ))
            )}
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section id="vorteile" className="container-app py-24">
        <div className="max-w-2xl">
          <span className="chip mb-4"><Zap className="h-3 w-3 text-[color:var(--color-accent)]" /> Vorteile</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Du definierst.<br/><span className="bg-gradient-to-r from-[#60a5fa] via-[#22d3ee] to-[#a78bfa] bg-clip-text text-transparent">SoVoice bucht.</span></h2>
          <p className="mt-4 text-[color:var(--color-text-muted)] text-lg">Du legst Event Typen, Zeiten und Regeln fest – die KI übernimmt jedes Telefonat und trägt Termine automatisch in deinen Kalender ein.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: CalIcon, t: "Eigene Event Typen", d: "Demo, Beratung, Service – definiere alles, was dein Unternehmen anbietet." },
            { icon: Clock, t: "Verfügbarkeiten steuern", d: "Arbeitszeiten, Pausen, Puffer und Mindestvorlauf – alles in deiner Hand." },
            { icon: PhoneCall, t: "KI bucht automatisch", d: "Der SoVoice Agent telefoniert und trägt Termine vollautomatisch ein." },
            { icon: Sparkles, t: "Volle Übersicht", d: "Jeder Lead, jeder Termin, jede Statistik – live im Dashboard." },
          ].map(({icon:Icon,t,d}) => (
            <div key={t} className="glass p-6 group hover:border-[rgba(59,130,246,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.4)]">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[rgba(37,99,235,0.3)] to-[rgba(34,211,238,0.2)] border border-[rgba(59,130,246,0.3)] grid place-items-center mb-4 group-hover:scale-110 transition">
                <Icon className="h-5 w-5 text-[#60a5fa]" />
              </div>
              <h3 className="font-semibold text-base">{t}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-muted)] leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* So funktioniert es */}
      <section className="container-app py-24">
        <div className="max-w-2xl">
          <span className="chip mb-4"><CalIcon className="h-3 w-3 text-[color:var(--color-accent)]" /> Ablauf</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">So funktioniert SoVoice Calendar</h2>
          <p className="mt-4 text-[color:var(--color-text-muted)] text-lg">Vier Schritte vom Setup bis zum vollautomatisierten Kalender.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {t:"Event Typen anlegen", d:"Erstelle deine Termin Arten – Dauer, Ort, Puffer, Beschreibung."},
            {t:"Verfügbarkeiten setzen", d:"Definiere Arbeitszeiten, Pausen und Buchungsregeln pro Event."},
            {t:"SoVoice KI verbinden", d:"Der KI Agent übernimmt Anrufe und qualifiziert deine Leads."},
            {t:"Termine im Überblick", d:"Alle Buchungen erscheinen live im Kalender – inklusive Details."},
          ].map((s,i) => (
            <div key={s.t} className="glass p-6 relative overflow-hidden hover:border-[rgba(59,130,246,0.4)] transition">
              <div className="text-6xl font-bold bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent opacity-70 leading-none">0{i+1}</div>
              <div className="mt-3 font-semibold">{s.t}</div>
              <div className="mt-1 text-sm text-[color:var(--color-text-muted)]">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="container-app py-16">
        <div className="glass-strong p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[rgba(139,92,246,0.2)] blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[rgba(34,211,238,0.18)] blur-3xl" />
          <div className="relative max-w-3xl mx-auto text-center">
            <Quote className="h-10 w-10 text-[color:var(--color-accent)] mx-auto opacity-70" />
            <p className="mt-6 text-xl md:text-2xl font-medium leading-relaxed">
              „SoVoice Calendar hat unseren Buchungsprozess komplett verändert.
              Wir gewinnen messbar mehr Demo Termine – ohne zusätzlichen Aufwand."
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]" />
              <div className="text-left">
                <div className="text-sm font-semibold">M. Keller</div>
                <div className="text-xs text-[color:var(--color-text-muted)]">CEO · Praxis Gruppe Zürich</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Für wen */}
      <section className="container-app py-20">
        <div className="max-w-2xl">
          <span className="chip mb-4"><Building2 className="h-3 w-3 text-[color:var(--color-accent)]" /> Zielgruppen</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Für wen ist SoVoice geeignet?</h2>
          <p className="mt-4 text-[color:var(--color-text-muted)] text-lg">Branchenübergreifend optimiert für Unternehmen mit hohem Anrufvolumen.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {icon:Stethoscope,name:"Arztpraxen"},{icon:Wrench,name:"Garagen"},{icon:Dumbbell,name:"Fitnessstudios"},
            {icon:Scale,name:"Kanzleien"},{icon:ShieldCheck,name:"Versicherungsbroker"},{icon:GraduationCap,name:"Bildungsanbieter"},
            {icon:Building2,name:"Handwerksbetriebe"},{icon:HomeIcon,name:"Dienstleister"},
          ].map(({icon:Icon,name}) => (
            <div key={name} className="glass p-4 flex items-center gap-3 hover:border-[rgba(59,130,246,0.4)] hover:bg-white/[0.04] transition">
              <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-[rgba(37,99,235,0.25)] to-[rgba(34,211,238,0.15)] grid place-items-center"><Icon className="h-4 w-4 text-[#60a5fa]" /></div>
              <span className="text-sm font-medium truncate">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-app pb-24">
        <div className="glass-strong p-8 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-[rgba(59,130,246,0.25)] blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Bereit, deinen Kalender zu automatisieren?</h2>
              <p className="mt-3 text-[color:var(--color-text-muted)] text-lg">Richte deine Event Typen ein und lass SoVoice ab sofort jeden Termin für dich buchen.</p>
            </div>
            <Link to="/admin" className="btn-primary pulse-glow whitespace-nowrap">Zum Admin Dashboard <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
