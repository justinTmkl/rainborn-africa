import React, { useState, useEffect, useMemo } from "react";
import {
  Search, ClipboardCheck, AlertTriangle, Server, Wrench, ArrowLeft,
  Plus, X, Check, ChevronRight, ShieldAlert, Inbox, ThumbsUp, ThumbsDown,
  Clock, User, Calculator, CircleGauge, Ban, Lightbulb, Filter
} from "lucide-react";

/* ================================================================== */
/*  FELDKIT — Gerüst v0.2                                             */
/*  Wissens-Skelett: Maschine → Störungen + Checklisten               */
/*  Vorschlag+Freigabe · Instrument-Panel-Look                        */
/* ================================================================== */

const C = {
  bg: "#F6F4EF", panel: "#FFFFFF", panel2: "#EFECE4", line: "#E5E1D8",
  ink: "#242A33", steel: "#5C6572", steelDim: "#767C86",
  amber: "#F4A81C", amberDim: "#D89A2E", amberInk: "#9A6800",
  green: "#1E8F5A", red: "#D4552F", blue: "#3D82C9",
  onAmber: "#2C2510", onFill: "#FFFFFF",
};

/* --------------------------- Seed-Daten ---------------------------- */
const MACHINES = [
  { id: "358016/130", type: "PROTOS M5s", role: "Maker", site: "Poznań · Imperial", faults: 3 },
  { id: "358016/135", type: "BOB-ME MAX", role: "Filteransatz", site: "Poznań · Imperial", faults: 1 },
  { id: "358016/140", type: "BOB-ME SE", role: "Filteransatz", site: "Poznań · Imperial", faults: 0 },
  { id: "358016/145", type: "BOB-ME VE", role: "Filteransatz", site: "Poznań · Imperial", faults: 1 },
  { id: "358016/150", type: "HLP", role: "Packer", site: "Poznań · Imperial", faults: 0 },
];

const FAULTS = [
  {
    id: 1, machine: "358016/130", title: "Laser wirft Druckluft-Fehler, Maschine steht",
    symptom: "Sporadischer Druckluft-Fehler am Laser, Maschine schaltet ab. Kein klares Muster.",
    cause: "SMC-Durchflusssensor (S105L) defekt — meldete Unterdruck trotz anliegender Luft.",
    fix: "Durchflusssensor S105L getauscht, danach stabil.",
    deadends: ["RV1/RV2/RV3-Regler geprüft und getauscht — war es nicht", "AFM30-Filter gereinigt — kein Effekt"],
    cond: "Trat verstärkt nach längerem Stillstand auf",
    lost: "≈ 3,5 h", by: "Justin T.", date: "12.03.26", code: "PA-105",
  },
  {
    id: 2, machine: "358016/130", title: "Fortuna Red KS — PD und FV außerhalb Toleranz",
    symptom: "QC meldet systematisch PD > 57 mmWG und FV < 28 %. Über mehrere Chargen.",
    cause: "Filterstab-Verklebung zu fest, dadurch Ventilation zu niedrig und Druckabfall zu hoch.",
    fix: "Kleberauftrag reduziert, Ventilationszone nachjustiert. Werte wieder in Spec.",
    deadends: ["Zunächst DIA verdächtigt — lag mit 7,80 mm im Soll"],
    cond: "Blend PLPL373C15, hohe Recon-Anteil",
    lost: "≈ 2 h", by: "Justin T.", date: "28.06.26", code: "",
  },
  {
    id: 3, machine: "358016/130", title: "Maschine läuft nach Rüsten unrund",
    symptom: "Nach Formatwechsel Vibration und unsaubere Schnittkante.",
    cause: "Messerwelle nicht korrekt ausgerichtet nach Umbau.",
    fix: "Welle neu ausgerichtet mit Wasserwaage, Lagerspiel geprüft.",
    deadends: ["Messer als erstes getauscht — war nicht die Ursache"],
    cond: "Format 6,1 mm",
    lost: "≈ 1,5 h", by: "M. K.", date: "02.07.26", code: "",
  },
  {
    id: 4, machine: "358016/135", title: "Filtertrommel klemmt sporadisch",
    symptom: "MAX-Filtertrommel blockiert unregelmäßig, Stau am Übergang.",
    cause: "Vakuum an Trommel zu niedrig — Dichtung porös.",
    fix: "Dichtung erneuert, Vakuum wieder im Sollbereich.",
    deadends: ["Trommel gereinigt — half nur kurz"],
    cond: "", lost: "≈ 2,5 h", by: "Justin T.", date: "05.07.26", code: "",
  },
  {
    id: 5, machine: "358016/145", title: "VE — Leimpumpe fördert unregelmäßig",
    symptom: "Schwankender Leimauftrag, teils zu wenig.",
    cause: "Luft im Leimsystem nach Kanisterwechsel.",
    fix: "System entlüftet, Ansaugung geprüft.",
    deadends: [], cond: "", lost: "≈ 1 h", by: "M. K.", date: "08.07.26", code: "",
  },
];

const JOB_TYPES = [
  { id: "safety", name: "Safety-Standard", fixed: true, icon: ShieldAlert, color: C.red },
  { id: "install", name: "Installation", icon: Server, color: C.blue },
  { id: "umbau", name: "Umbau / Formatwechsel", icon: Wrench, color: C.amber },
  { id: "support", name: "Production Support", icon: CircleGauge, color: C.green },
  { id: "wartung", name: "Wartung", icon: ClipboardCheck, color: C.steel },
];

const CHECKLISTS = {
  safety: [
    { sec: "Vor Arbeitsbeginn", items: ["Sicherheitseinweisung Standort erhalten", "PSA vollständig (Schuhe, Brille, Gehörschutz)", "Not-Aus-Positionen bekannt", "Freischaltung / LOTO geklärt"] },
    { sec: "Bei Arbeiten in der Höhe", items: ["Absturzsicherung vorhanden und geprüft", "Anschlagpunkt bestätigt"] },
  ],
  install: [
    { sec: "Werkzeug mitnehmen (oft vergessen)", items: ["Langer 27er (Fußausrichtung) — nicht im Standardkoffer", "Maschinenwasserwaage", "Fühlerlehren-Satz", "Drehmomentschlüssel bis 200 Nm"] },
    { sec: "Vor Ort prüfen", items: ["Fundament / Boden eben", "Druckluft und Strom am Aufstellort verfügbar", "Kranweg / Transportweg frei"] },
    { sec: "Durchführung", items: ["Maschine grob positioniert", "Füße ausgerichtet (Wasserwaage)", "Nivellierung final geprüft"] },
    { sec: "Abschluss", items: ["Probelauf durchgeführt", "Übergabe an Kunde dokumentiert"] },
  ],
  umbau: [
    { sec: "Vorbereitung", items: ["Zielformat / Blend bestätigt", "Formatteile vollständig vorhanden", "Alte Einstellwerte notiert (Rückweg)"] },
    { sec: "Durchführung", items: ["Formatteile getauscht", "Messer / Schnitt geprüft", "Ventilationszone eingestellt"] },
    { sec: "Nach dem Umbau", items: ["Erste Muster gezogen", "QC-Werte im Soll (DIA, PD, FV)", "Abweichungen im Log notiert"] },
  ],
  support: [
    { sec: "Ankunft", items: ["Aktuelles Störbild vom Kunden aufnehmen", "Fehlerspeicher / Bildschirm auslesen", "Störungslog dieser Maschine checken"] },
    { sec: "Abschluss", items: ["Lösung im Störungslog eingetragen", "Maschine läuft stabil (≥ 30 min)"] },
  ],
  wartung: [
    { sec: "Standard", items: ["Filter / Dichtungen sichtprüfen", "Schmierstellen abgearbeitet", "Verschleißteile dokumentiert"] },
  ],
};

const PENDING = [
  { id: 1, job: "Installation", text: "Langen 27er auch für MAX-Fußausrichtung ergänzen — gleiche Geometrie", by: "P. Nowak", date: "10.07.26" },
  { id: 2, job: "Umbau / Formatwechsel", text: "Punkt „Sauganzeige vor Umbau fotografieren\" — spart Rückweg-Sucherei", by: "M. K.", date: "14.07.26" },
];

/* ============================ App ================================= */
export default function App() {
  const [screen, setScreen] = useState({ name: "start" });
  const [role, setRole] = useState("kurator"); // 'techniker' | 'kurator'
  const [pending, setPending] = useState(PENDING);

  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap";
    document.head.appendChild(l);
    return () => { document.head.removeChild(l); };
  }, []);

  const go = (name, props = {}) => setScreen({ name, ...props });
  const back = () => setScreen({ name: "start" });

  const navItems = [
    { id: "start", label: "Start", Icon: Search },
    { id: "prepare", label: "Vorbereiten", Icon: ClipboardCheck },
    { id: "faults", label: "Störungen", Icon: AlertTriangle },
    { id: "machines", label: "Maschinen", Icon: Server },
    { id: "tools", label: "Werkzeuge", Icon: Wrench },
  ];
  const activeNav = ["fault", "checklist"].includes(screen.name)
    ? { fault: "faults", checklist: "prepare" }[screen.name] : screen.name;

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
        .h{font-family:'Barlow Condensed',sans-serif;letter-spacing:.03em;}
        .m{font-family:'JetBrains Mono',monospace;}
        .glow{text-shadow:none;}
        input,textarea,select{font-family:inherit;}
        input:focus,textarea:focus,select:focus{outline:2px solid ${C.amber};outline-offset:1px;}
        button:focus-visible{outline:2px solid ${C.amber};outline-offset:2px;}
        .hz{background:repeating-linear-gradient(-45deg,${C.amber} 0 10px,${C.bg} 10px 20px);}
        ::-webkit-scrollbar{width:0;height:0;}
        .card{background:${C.panel};border:1px solid ${C.line};border-radius:12px;box-shadow:0 1px 2px rgba(28,30,38,.04),0 2px 6px rgba(28,30,38,.05);}
        .press:active{transform:scale(.985);}
      `}</style>

      <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <main style={{ flex: 1, overflowY: "auto", padding: "0 0 92px" }}>
          {screen.name === "start" && <Start go={go} role={role} setRole={setRole} pendingCount={pending.length} />}
          {screen.name === "prepare" && <Prepare go={go} />}
          {screen.name === "checklist" && <ChecklistView key={screen.jobId} jobId={screen.jobId} back={() => go("prepare")} role={role} />}
          {screen.name === "faults" && <Faults go={go} />}
          {screen.name === "fault" && <FaultDetail fault={screen.fault} back={() => go("faults")} />}
          {screen.name === "machines" && <Machines go={go} />}
          {screen.name === "machine" && <MachineDetail machine={screen.machine} go={go} back={() => go("machines")} />}
          {screen.name === "tools" && <Tools />}
          {screen.name === "approve" && <Approve pending={pending} setPending={setPending} back={back} />}
        </main>

        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, display: "flex", background: C.panel, borderTop: `1px solid ${C.line}`, paddingBottom: "env(safe-area-inset-bottom)" }}>
          {navItems.map(({ id, label, Icon }) => {
            const on = activeNav === id;
            return (
              <button key={id} onClick={() => go(id)} aria-label={label} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "9px 2px 11px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: on ? C.amberInk : C.steelDim, borderTop: `2px solid ${on ? C.amber : "transparent"}`, marginTop: -1 }}>
                <Icon size={20} strokeWidth={on ? 2.4 : 1.9} />
                <span className="h" style={{ fontSize: 11.5 }}>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

/* --------------------------- Kopfzeile ----------------------------- */
function TopBar({ title, back, right }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 5, background: C.bg, borderBottom: `1px solid ${C.line}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
      {back && <button onClick={back} aria-label="Zurück" style={{ background: "none", border: "none", color: C.ink, cursor: "pointer", padding: 0, display: "flex" }}><ArrowLeft size={22} /></button>}
      <h1 className="h" style={{ fontSize: 21, fontWeight: 600, margin: 0, flex: 1 }}>{title}</h1>
      {right}
    </div>
  );
}

/* ---------------------------- START -------------------------------- */
function Start({ go, role, setRole, pendingCount }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return null;
    const f = FAULTS.filter(x => (x.title + x.symptom + x.cause + x.fix + x.machine).toLowerCase().includes(s));
    const m = MACHINES.filter(x => (x.id + x.type + x.role).toLowerCase().includes(s));
    return { f, m };
  }, [q]);

  return (
    <div>
      <div style={{ padding: "18px 16px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="hz" style={{ width: 6, height: 30, borderRadius: 2 }} />
          <div>
            <div className="h" style={{ fontSize: 25, fontWeight: 700, lineHeight: 1 }}>FELD<span style={{ color: C.amberInk }}>KIT</span></div>
            <div style={{ fontSize: 10, letterSpacing: ".16em", color: C.steelDim, textTransform: "uppercase", marginTop: 3 }}>Service-Wissen · immer dabei</div>
          </div>
        </div>
        <button onClick={() => setRole(role === "kurator" ? "techniker" : "kurator")} aria-label="Rolle wechseln" className="h press"
          style={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 20, padding: "5px 12px", color: role === "kurator" ? C.amberInk : C.steel, fontSize: 12.5, fontWeight: 600, cursor: "pointer", letterSpacing: ".04em" }}>
          {role === "kurator" ? "KURATOR" : "TECHNIKER"}
        </button>
      </div>

      <div style={{ padding: "10px 16px 4px" }}>
        <div style={{ position: "relative" }}>
          <Search size={19} color={C.amber} style={{ position: "absolute", left: 14, top: 15 }} />
          <input autoFocus={false} value={q} onChange={e => setQ(e.target.value)} placeholder="Störung, Maschine, Werkzeug…"
            style={{ width: "100%", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, color: C.ink, fontSize: 16, padding: "13px 14px 13px 44px" }} />
        </div>
      </div>

      {results ? (
        <div style={{ padding: "8px 16px" }}>
          <Label>{results.f.length + results.m.length} Treffer</Label>
          {results.m.map(m => (
            <Row key={m.id} onClick={() => go("machine", { machine: m })} icon={<Server size={18} color={C.blue} />} title={m.id} sub={`${m.type} · ${m.role}`} />
          ))}
          {results.f.map(f => (
            <Row key={f.id} onClick={() => go("fault", { fault: f })} icon={<AlertTriangle size={18} color={C.amber} />} title={f.title} sub={`${f.machine} · behoben in ${f.lost}`} />
          ))}
          {results.f.length + results.m.length === 0 && <Empty>Kein Treffer. Vielleicht als neue Störung eintragen?</Empty>}
        </div>
      ) : (
        <div style={{ padding: "12px 16px" }}>
          {role === "kurator" && pendingCount > 0 && (
            <button onClick={() => go("approve")} className="press" style={{ width: "100%", textAlign: "left", background: "linear-gradient(90deg,#FFF6E2,#FFFFFF)", border: `1px solid ${C.amberDim}`, borderRadius: 12, padding: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ background: C.amber, borderRadius: 10, width: 40, height: 40, display: "grid", placeItems: "center", flexShrink: 0 }}><Inbox size={22} color={C.onAmber} /></div>
              <div style={{ flex: 1 }}>
                <div className="h" style={{ fontSize: 16, fontWeight: 600, color: C.ink }}>{pendingCount} Vorschläge warten auf Freigabe</div>
                <div style={{ fontSize: 12.5, color: C.steel }}>Techniker haben Ergänzungen eingereicht</div>
              </div>
              <ChevronRight size={20} color={C.steelDim} />
            </button>
          )}

          <Label>Schnellzugriff</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Tile onClick={() => go("prepare")} icon={<ClipboardCheck size={24} color={C.blue} />} title="Einsatz vorbereiten" sub="Checkliste holen" />
            <Tile onClick={() => go("faults")} icon={<AlertTriangle size={24} color={C.amber} />} title="Störung suchen" sub={`${FAULTS.length} Fälle`} />
            <Tile onClick={() => go("machines")} icon={<Server size={24} color={C.green} />} title="Maschinen" sub={`${MACHINES.length} am Standort`} />
            <Tile onClick={() => go("tools")} icon={<Calculator size={24} color={C.steel} />} title="Werkzeuge" sub="Rechner & Tabellen" />
          </div>

          <Label style={{ marginTop: 20 }}>Zuletzt behoben</Label>
          {FAULTS.slice(0, 3).map(f => (
            <Row key={f.id} onClick={() => go("fault", { fault: f })} icon={<AlertTriangle size={18} color={C.amber} />} title={f.title} sub={`${f.machine} · ${f.date}`} />
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------- VORBEREITEN ---------------------------- */
function Prepare({ go }) {
  return (
    <div>
      <TopBar title="Einsatz vorbereiten" />
      <div style={{ padding: "14px 16px" }}>
        <p style={{ fontSize: 13.5, color: C.steel, margin: "0 0 16px", lineHeight: 1.5 }}>
          Einsatzart wählen — du bekommst die passende Checkliste inkl. der Werkzeuge, die man erfahrungsgemäß vergisst.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {JOB_TYPES.map(j => (
            <button key={j.id} onClick={() => go("checklist", { jobId: j.id })} className="card press" style={{ width: "100%", textAlign: "left", cursor: "pointer", padding: 15, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ background: C.panel2, borderRadius: 10, width: 44, height: 44, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <j.icon size={23} color={j.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="h" style={{ fontSize: 17, fontWeight: 600 }}>{j.name}</div>
                <div style={{ fontSize: 12.5, color: C.steelDim }}>{j.fixed ? "Feste Standardliste" : "Erfahrungs-Checkliste"}</div>
              </div>
              <ChevronRight size={20} color={C.steelDim} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChecklistView({ jobId, back, role }) {
  const job = JOB_TYPES.find(j => j.id === jobId);
  const data = CHECKLISTS[jobId] || [];
  const [done, setDone] = useState({});
  const [suggesting, setSuggesting] = useState(false);
  const [sug, setSug] = useState("");
  const [sent, setSent] = useState(false);

  const toggle = k => setDone(d => ({ ...d, [k]: !d[k] }));
  const total = data.reduce((n, s) => n + s.items.length, 0);
  const doneCount = Object.values(done).filter(Boolean).length;

  return (
    <div>
      <TopBar title={job.name} back={back} right={<job.icon size={20} color={job.color} />} />
      <div style={{ padding: "14px 16px" }}>
        <div className="card" style={{ padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="h" style={{ fontSize: 14, color: C.steel, letterSpacing: ".06em" }}>ERLEDIGT</span>
          <span className="m glow" style={{ fontSize: 18, fontWeight: 700, color: doneCount === total ? C.green : C.amberInk }}>{doneCount} / {total}</span>
        </div>

        {data.map((sec, si) => (
          <div key={si} style={{ marginBottom: 18 }}>
            <Label>{sec.sec}</Label>
            <div className="card" style={{ overflow: "hidden" }}>
              {sec.items.map((it, ii) => {
                const k = `${si}-${ii}`;
                const on = !!done[k];
                return (
                  <button key={ii} onClick={() => toggle(k)} role="checkbox" aria-checked={on} className="press" style={{ width: "100%", textAlign: "left", background: "none", border: "none", borderTop: ii ? `1px solid ${C.line}` : "none", cursor: "pointer", padding: "13px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${on ? C.green : C.steelDim}`, background: on ? C.green : "transparent", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      {on && <Check size={16} color={C.onFill} strokeWidth={3} />}
                    </div>
                    <span style={{ fontSize: 14.5, color: on ? C.steelDim : C.ink, textDecoration: on ? "line-through" : "none", lineHeight: 1.35 }}>{it}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!job.fixed && (
          <div style={{ marginTop: 6 }}>
            {sent ? (
              <div className="card" style={{ padding: 14, display: "flex", alignItems: "center", gap: 10, borderColor: C.green }}>
                <Check size={18} color={C.green} /><span style={{ fontSize: 13.5, color: C.steel }}>Vorschlag eingereicht — geht an den Kurator zur Freigabe.</span>
              </div>
            ) : suggesting ? (
              <div className="card" style={{ padding: 14, borderColor: C.amber }}>
                <Label>Neuen Punkt vorschlagen</Label>
                <textarea value={sug} onChange={e => setSug(e.target.value)} rows={3} placeholder="z.B. „Sauganzeige vor Umbau fotografieren – spart Rückweg-Sucherei“"
                  style={{ width: "100%", background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontSize: 14, padding: "10px 12px", resize: "vertical", marginBottom: 10 }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setSuggesting(false)} className="h" style={{ flex: 1, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, color: C.steel, padding: "10px 0", fontSize: 14.5, fontWeight: 600, cursor: "pointer" }}>Abbrechen</button>
                  <button onClick={() => { if (sug.trim()) setSent(true); }} className="h" style={{ flex: 1, background: C.amber, border: "none", borderRadius: 8, color: C.onAmber, padding: "10px 0", fontSize: 14.5, fontWeight: 700, cursor: "pointer" }}>Einreichen</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setSuggesting(true)} className="press" style={{ width: "100%", background: "transparent", border: `1px dashed ${C.steelDim}`, borderRadius: 10, color: C.steel, padding: "13px 0", fontSize: 14.5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Plus size={18} /> Punkt vorschlagen
              </button>
            )}
            <p style={{ fontSize: 11.5, color: C.steelDim, marginTop: 10, textAlign: "center" }}>
              Ergänzungen gehen erst an den Kurator und werden nach Freigabe für alle sichtbar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------- STÖRUNGEN ----------------------------- */
function Faults({ go }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return FAULTS;
    return FAULTS.filter(x => (x.title + x.symptom + x.cause + x.fix + x.machine + (x.deadends || []).join(" ")).toLowerCase().includes(s));
  }, [q]);

  return (
    <div>
      <TopBar title="Störungen" right={<button aria-label="Neu" className="press" style={{ background: C.amber, border: "none", borderRadius: 8, width: 34, height: 34, display: "grid", placeItems: "center", cursor: "pointer" }}><Plus size={20} color={C.onAmber} /></button>} />
      <div style={{ padding: "12px 16px 6px" }}>
        <div style={{ position: "relative" }}>
          <Search size={18} color={C.amber} style={{ position: "absolute", left: 13, top: 13 }} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Symptom, Ursache, Maschine…"
            style={{ width: "100%", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 11, color: C.ink, fontSize: 15, padding: "11px 12px 11px 42px" }} />
        </div>
      </div>
      <div style={{ padding: "6px 16px" }}>
        {list.map(f => (
          <button key={f.id} onClick={() => go("fault", { fault: f })} className="card press" style={{ width: "100%", textAlign: "left", cursor: "pointer", padding: 14, marginBottom: 9, display: "block" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.3 }}>{f.title}</span>
              {f.code && <span className="m" style={{ fontSize: 11, color: C.bg, background: C.steel, padding: "2px 6px", borderRadius: 5, flexShrink: 0 }}>{f.code}</span>}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 12, color: C.steelDim, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Server size={13} />{f.machine}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={13} />{f.lost}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><User size={13} />{f.by}</span>
            </div>
          </button>
        ))}
        {list.length === 0 && <Empty>Kein Treffer für „{q}“. Trag den Fall ein — der Nächste dankt's dir.</Empty>}
      </div>
    </div>
  );
}

function FaultDetail({ fault, back }) {
  return (
    <div>
      <TopBar title="Störung" back={back} />
      <div style={{ padding: "16px 16px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
          <Chip icon={<Server size={13} />}>{fault.machine}</Chip>
          <Chip icon={<Clock size={13} />}>{fault.lost}</Chip>
          <Chip icon={<User size={13} />}>{fault.by} · {fault.date}</Chip>
          {fault.code && <Chip mono>{fault.code}</Chip>}
        </div>
        <h2 className="h" style={{ fontSize: 22, fontWeight: 600, margin: "6px 0 20px", lineHeight: 1.2 }}>{fault.title}</h2>

        <Field icon={<AlertTriangle size={16} color={C.amber} />} label="Symptom">{fault.symptom}</Field>
        <Field icon={<Search size={16} color={C.blue} />} label="Ursache">{fault.cause}</Field>
        <Field icon={<Lightbulb size={16} color={C.green} />} label="Lösung" highlight>{fault.fix}</Field>

        {fault.deadends?.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <FieldLabel icon={<Ban size={16} color={C.red} />}>Sackgassen — das war es NICHT</FieldLabel>
            <div className="card" style={{ padding: "4px 0", borderColor: "#F3DBD1" }}>
              {fault.deadends.map((d, i) => (
                <div key={i} style={{ padding: "9px 14px", borderTop: i ? `1px solid ${C.line}` : "none", fontSize: 14, color: C.steel, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <X size={16} color={C.red} style={{ marginTop: 1, flexShrink: 0 }} />{d}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11.5, color: C.steelDim, marginTop: 7 }}>Das spart dir den Irrweg — der eigentliche Wert gegenüber dem Handbuch.</p>
          </div>
        )}

        {fault.cond && <Field icon={<Filter size={16} color={C.steel} />} label="Bedingungen">{fault.cond}</Field>}
      </div>
    </div>
  );
}

/* --------------------------- MASCHINEN ----------------------------- */
function Machines({ go }) {
  return (
    <div>
      <TopBar title="Maschinen" />
      <div style={{ padding: "12px 16px" }}>
        {MACHINES.map(m => (
          <button key={m.id} onClick={() => go("machine", { machine: m })} className="card press" style={{ width: "100%", textAlign: "left", cursor: "pointer", padding: 14, marginBottom: 9, display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{ background: C.panel2, borderRadius: 10, width: 46, height: 46, display: "grid", placeItems: "center", flexShrink: 0 }}>
              <Server size={22} color={C.blue} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="m" style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{m.id}</div>
              <div style={{ fontSize: 12.5, color: C.steel }}>{m.type} · {m.role}</div>
              <div style={{ fontSize: 11.5, color: C.steelDim, marginTop: 1 }}>{m.site}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="m glow" style={{ fontSize: 19, fontWeight: 700, color: m.faults ? C.amberInk : C.steelDim }}>{m.faults}</div>
              <div style={{ fontSize: 10, color: C.steelDim, letterSpacing: ".05em" }}>FÄLLE</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MachineDetail({ machine, go, back }) {
  const faults = FAULTS.filter(f => f.machine === machine.id);
  return (
    <div>
      <TopBar title={machine.id} back={back} />
      <div style={{ padding: "14px 16px" }}>
        <div className="card" style={{ padding: 15, marginBottom: 18 }}>
          <div className="h" style={{ fontSize: 19, fontWeight: 600 }}>{machine.type}</div>
          <div style={{ fontSize: 13.5, color: C.steel, marginTop: 2 }}>{machine.role} · {machine.site}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <Stat n={faults.length} l="Störfälle" />
            <Stat n={faults.reduce((a, f) => a + (f.deadends?.length || 0), 0)} l="Sackgassen" />
          </div>
        </div>

        <Label>Störungs-Historie</Label>
        {faults.length ? faults.map(f => (
          <Row key={f.id} onClick={() => go("fault", { fault: f })} icon={<AlertTriangle size={18} color={C.amber} />} title={f.title} sub={`${f.date} · behoben in ${f.lost}`} />
        )) : <Empty>Noch keine Störung erfasst — saubere Maschine.</Empty>}
      </div>
    </div>
  );
}

/* --------------------------- FREIGABEN ----------------------------- */
function Approve({ pending, setPending, back }) {
  const act = (id) => setPending(p => p.filter(x => x.id !== id));
  return (
    <div>
      <TopBar title="Vorschläge freigeben" back={back} />
      <div style={{ padding: "14px 16px" }}>
        {pending.length === 0 && <Empty>Alles abgearbeitet. Keine offenen Vorschläge.</Empty>}
        {pending.map(p => (
          <div key={p.id} className="card" style={{ padding: 15, marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <Chip>{p.job}</Chip><Chip icon={<User size={13} />}>{p.by} · {p.date}</Chip>
            </div>
            <p style={{ fontSize: 14.5, color: C.ink, margin: "0 0 14px", lineHeight: 1.45 }}>{p.text}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => act(p.id)} className="h press" style={{ flex: 1, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, color: C.steel, padding: "10px 0", fontSize: 14.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <ThumbsDown size={16} /> Ablehnen
              </button>
              <button onClick={() => act(p.id)} className="h press" style={{ flex: 1, background: C.green, border: "none", borderRadius: 8, color: C.onFill, padding: "10px 0", fontSize: 14.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <ThumbsUp size={16} /> Freigeben
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- WERKZEUGE ----------------------------- */
function Tools() {
  const [sub, setSub] = useState("convert");
  const subs = [["convert", "Umrechnen"], ["torque", "Drehmoment"], ["qc", "Filter-QC"]];
  return (
    <div>
      <TopBar title="Werkzeuge" />
      <div style={{ padding: "12px 16px 4px", display: "flex", gap: 7 }}>
        {subs.map(([id, l]) => (
          <button key={id} onClick={() => setSub(id)} className="h" style={{ flex: 1, border: `1px solid ${sub === id ? C.amber : C.line}`, background: sub === id ? C.amber : "transparent", color: sub === id ? C.onAmber : C.steel, borderRadius: 8, padding: "8px 0", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      <div style={{ padding: "10px 16px" }}>
        {sub === "convert" && <Converter />}
        {sub === "torque" && <Torque />}
        {sub === "qc" && <QCCheck />}
      </div>
    </div>
  );
}

const CATS = {
  Länge: { units: { mm: 1, cm: 10, m: 1000, inch: 25.4, thou: 0.0254 } },
  Druck: { units: { bar: 1, psi: 0.0689476, kPa: 0.01, mmWG: 0.0000980665 } },
};
function Converter() {
  const cats = Object.keys(CATS);
  const [cat, setCat] = useState("Länge");
  const units = Object.keys(CATS[cat].units);
  const [from, setFrom] = useState(units[0]);
  const [val, setVal] = useState("1");
  useEffect(() => { setFrom(Object.keys(CATS[cat].units)[0]); }, [cat]);
  const num = parseFloat(val.replace(",", "."));
  const res = units.map(u => [u, (num * CATS[cat].units[from]) / CATS[cat].units[u]]);
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {cats.map(c => <button key={c} onClick={() => setCat(c)} className="h" style={{ border: `1px solid ${cat === c ? C.amber : C.line}`, background: cat === c ? C.amber : "transparent", color: cat === c ? C.onAmber : C.steel, borderRadius: 8, padding: "6px 14px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{c}</button>)}
      </div>
      <div className="card" style={{ padding: 12, marginBottom: 10, display: "flex", gap: 10 }}>
        <input value={val} onChange={e => setVal(e.target.value)} inputMode="decimal" className="m" style={{ flex: 1, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontSize: 24, padding: "8px 12px" }} />
        <select value={from} onChange={e => setFrom(e.target.value)} className="h" style={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, color: C.amberInk, fontSize: 16, padding: "0 10px", cursor: "pointer", fontWeight: 600 }}>
          {units.map(u => <option key={u} style={{ background: C.panel, color: C.ink }}>{u}</option>)}
        </select>
      </div>
      {res.filter(([u]) => u !== from).map(([u, r]) => (
        <div key={u} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "11px 14px", marginBottom: 7 }}>
          <span className="h" style={{ fontSize: 14, color: C.steel }}>{u}</span>
          <span className="m glow" style={{ fontSize: 21, fontWeight: 700, color: C.amberInk }}>{isNaN(r) ? "—" : r.toLocaleString("de-DE", { maximumFractionDigits: 3 })}</span>
        </div>
      ))}
    </div>
  );
}

const TORQUE = [["M4", 2.8, 4.1, 4.8], ["M5", 5.5, 8.1, 9.5], ["M6", 9.5, 14, 16.5], ["M8", 23, 34, 40], ["M10", 46, 68, 79], ["M12", 80, 117, 140], ["M16", 197, 289, 347], ["M20", 385, 560, 675]];
function Torque() {
  const [cls, setCls] = useState(1);
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["8.8", "10.9", "12.9"].map((c, i) => <button key={c} onClick={() => setCls(i + 1)} className="h" style={{ flex: 1, border: `1px solid ${cls === i + 1 ? C.amber : C.line}`, background: cls === i + 1 ? C.amber : "transparent", color: cls === i + 1 ? C.onAmber : C.steel, borderRadius: 8, padding: "8px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{c}</button>)}
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        {TORQUE.map((r, i) => (
          <div key={r[0]} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 15px", borderTop: i ? `1px solid ${C.line}` : "none" }}>
            <span className="h" style={{ fontSize: 18, fontWeight: 600 }}>{r[0]}</span>
            <span className="m glow" style={{ fontSize: 20, fontWeight: 700, color: C.amberInk }}>{r[cls]} <span style={{ fontSize: 12, color: C.steelDim }}>Nm</span></span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: C.steelDim, marginTop: 10 }}>Richtwerte µ≈0,14 · immer Herstellervorgabe prüfen.</p>
    </div>
  );
}

/* Filter-QC gegen Spec (Fortuna Red KS Beispiel) */
const QC_SPEC = [
  { k: "DIA", label: "Durchmesser", unit: "mm", target: 7.80, tol: 0.05 },
  { k: "GWg", label: "Gesamtgewicht", unit: "mg", target: 791.8, tol: 15 },
  { k: "PD", label: "Druckabfall", unit: "mmWG", target: 57, tol: 5 },
  { k: "FV", label: "Ventilation", unit: "%", target: 28, tol: 3 },
];
function QCCheck() {
  const [vals, setVals] = useState({});
  return (
    <div>
      <p style={{ fontSize: 12.5, color: C.steel, margin: "0 0 14px" }}>Beispiel-Spec: Fortuna Red KS. Messwert eintippen → sofort in/out of Spec.</p>
      {QC_SPEC.map(s => {
        const v = parseFloat((vals[s.k] || "").replace(",", "."));
        const ok = !isNaN(v) && Math.abs(v - s.target) <= s.tol;
        const has = !isNaN(v);
        return (
          <div key={s.k} className="card" style={{ padding: 12, marginBottom: 9, borderColor: has ? (ok ? C.green : C.red) : C.line }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div><span className="m" style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{s.k}</span> <span style={{ fontSize: 12.5, color: C.steelDim }}>{s.label}</span></div>
              <span style={{ fontSize: 12, color: C.steelDim }}>Soll {s.target} ±{s.tol} {s.unit}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input value={vals[s.k] || ""} onChange={e => setVals(x => ({ ...x, [s.k]: e.target.value }))} inputMode="decimal" placeholder="Messwert" className="m" style={{ flex: 1, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 7, color: C.ink, fontSize: 17, padding: "8px 11px" }} />
              {has && <span className="h" style={{ fontSize: 14, fontWeight: 700, color: C.onFill, background: ok ? C.green : C.red, padding: "6px 12px", borderRadius: 7, whiteSpace: "nowrap" }}>{ok ? "IN SPEC" : "OUT"}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------- Bausteine ----------------------------- */
function Label({ children, style }) {
  return <div className="h" style={{ fontSize: 12.5, letterSpacing: ".1em", color: C.steelDim, textTransform: "uppercase", margin: "0 0 9px", ...style }}>{children}</div>;
}
function Tile({ onClick, icon, title, sub }) {
  return (
    <button onClick={onClick} className="card press" style={{ textAlign: "left", cursor: "pointer", padding: 14, display: "flex", flexDirection: "column", gap: 8, minHeight: 96 }}>
      {icon}
      <div style={{ marginTop: "auto" }}>
        <div className="h" style={{ fontSize: 15.5, fontWeight: 600, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 12, color: C.steelDim, marginTop: 2 }}>{sub}</div>
      </div>
    </button>
  );
}
function Row({ onClick, icon, title, sub }) {
  return (
    <button onClick={onClick} className="press" style={{ width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: `1px solid ${C.line}`, cursor: "pointer", padding: "12px 0", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, color: C.ink, lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontSize: 12, color: C.steelDim, marginTop: 1 }}>{sub}</div>
      </div>
      <ChevronRight size={18} color={C.steelDim} style={{ flexShrink: 0 }} />
    </button>
  );
}
function Field({ icon, label, children, highlight }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <FieldLabel icon={icon}>{label}</FieldLabel>
      <div className="card" style={{ padding: "12px 14px", fontSize: 14.5, color: highlight ? C.ink : C.steel, lineHeight: 1.5, borderColor: highlight ? C.green : C.line, background: highlight ? "#EAF6EE" : C.panel }}>{children}</div>
    </div>
  );
}
function FieldLabel({ icon, children }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>{icon}<span className="h" style={{ fontSize: 13.5, letterSpacing: ".08em", color: C.steel, textTransform: "uppercase" }}>{children}</span></div>;
}
function Chip({ children, icon, mono }) {
  return <span className={mono ? "m" : "h"} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: C.steel, background: C.panel2, border: `1px solid ${C.line}`, padding: "4px 9px", borderRadius: 20 }}>{icon}{children}</span>;
}
function Stat({ n, l }) {
  return <div style={{ flex: 1, background: C.bg, borderRadius: 9, padding: "9px 12px", border: `1px solid ${C.line}` }}><div className="m glow" style={{ fontSize: 20, fontWeight: 700, color: C.amberInk }}>{n}</div><div style={{ fontSize: 11, color: C.steelDim }}>{l}</div></div>;
}
function Empty({ children }) {
  return <div style={{ textAlign: "center", color: C.steelDim, fontSize: 13.5, padding: "34px 20px", lineHeight: 1.5 }}>{children}</div>;
}
