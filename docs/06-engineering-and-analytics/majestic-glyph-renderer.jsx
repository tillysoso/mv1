import { useState } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const COLORS = {
  bg: "#1A1A2E",
  surface: "#16213E",
  purple: "#9500FF",
  text: "#F0EDE8",
  muted: "#A8A8B8",
  fire: "#C94B2C",
  water: "#2A7B8C",
  earth: "#5C6B3A",
  air: "#A8B4C8",
};

// ─── SVG HELPERS ─────────────────────────────────────────────────────────────
const Node = ({ cx, cy, r = 3, stroke }) => (
  <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth="1.5" />
);

// ─── CASPER GEOMETRY (computed once, shared between preview + export SVG) ────
const CX = 160, CY = 160, R = 130;
const a1 = -Math.PI / 2;
const a2 = -Math.PI / 2 + (2 * Math.PI) / 3;
const a3 = -Math.PI / 2 + (4 * Math.PI) / 3;
const oT  = { x: CX + R * Math.cos(a1), y: CY + R * Math.sin(a1) }; // apex
const oBR = { x: CX + R * Math.cos(a2), y: CY + R * Math.sin(a2) }; // bottom-right
const oBL = { x: CX + R * Math.cos(a3), y: CY + R * Math.sin(a3) }; // bottom-left
// Inner triangle: vertices = midpoints of outer triangle sides (same orientation)
const iTop = { x: (oBR.x + oBL.x) / 2, y: (oBR.y + oBL.y) / 2 }; // midpoint bottom edge → inner apex
const iBR  = { x: (oT.x  + oBR.x) / 2, y: (oT.y  + oBR.y) / 2 }; // midpoint right edge
const iBL  = { x: (oT.x  + oBL.x) / 2, y: (oT.y  + oBL.y) / 2 }; // midpoint left edge
const outerPts = `${oT.x},${oT.y} ${oBR.x},${oBR.y} ${oBL.x},${oBL.y}`;
const innerPts = `${iTop.x},${iTop.y} ${iBR.x},${iBR.y} ${iBL.x},${iBL.y}`;

// ─── SEAL SVG BODIES ─────────────────────────────────────────────────────────

const CasperBody = ({ stroke }) => (
  <>
    <circle cx={CX} cy={CY} r={R} stroke={stroke} strokeWidth="2" />
    <polygon points={outerPts} stroke={stroke} strokeWidth="2" fill="none" />
    <polygon points={innerPts} stroke={stroke} strokeWidth="2" fill="none" />
    <line x1={CX} y1={oT.y} x2={CX} y2={CY - R} stroke={stroke} strokeWidth="2" />
    <Node cx={oT.x}  cy={oT.y}  r={4} stroke={stroke} />
    <Node cx={oBR.x} cy={oBR.y} r={4} stroke={stroke} />
    <Node cx={oBL.x} cy={oBL.y} r={4} stroke={stroke} />
    <Node cx={CX}    cy={CY}    r={3} stroke={stroke} />
  </>
);

const DestinyBody = ({ stroke }) => (
  <>
    <circle cx="160" cy="160" r="130" stroke={stroke} strokeWidth="2" />
    <path d="M 36 120 Q 160 310 284 120" stroke={stroke} strokeWidth="2" fill="none" />
    <path d="M 90 120 Q 160 270 230 120" stroke={stroke} strokeWidth="2" fill="none" />
    <path d="M 120 120 Q 160 230 200 120" stroke={stroke} strokeWidth="2" fill="none" />
    <line x1="36" y1="120" x2="284" y2="120" stroke={stroke} strokeWidth="2" />
    <line x1="160" y1="120" x2="160" y2="290" stroke={stroke} strokeWidth="2" />
    <Node cx={36}  cy={120} r={4} stroke={stroke} />
    <Node cx={284} cy={120} r={4} stroke={stroke} />
    <Node cx={160} cy={290} r={4} stroke={stroke} />
    <Node cx={160} cy={120} r={3} stroke={stroke} />
    <Node cx={160} cy={190} r={3} stroke={stroke} />
  </>
);

const OliviaBody = ({ stroke }) => (
  <>
    <circle cx="160" cy="160" r="130" stroke={stroke} strokeWidth="2" />
    {/* Trunk — full vertical span, circle to circle */}
    <line x1="160" y1="30"  x2="160" y2="290" stroke={stroke} strokeWidth="2" />
    {/* Bottom primary branches — from node (160,180) to circle edge */}
    <line x1="160" y1="180" x2="79"  y2="261" stroke={stroke} strokeWidth="2" />
    <line x1="160" y1="180" x2="241" y2="261" stroke={stroke} strokeWidth="2" />
    {/* Bottom secondary branches — from node (160,210) to circle edge */}
    <line x1="160" y1="210" x2="106" y2="278" stroke={stroke} strokeWidth="2" />
    <line x1="160" y1="210" x2="214" y2="278" stroke={stroke} strokeWidth="2" />
    {/* Top primary branches — mirrored from node (160,140) to circle edge */}
    <line x1="160" y1="140" x2="79"  y2="59"  stroke={stroke} strokeWidth="2" />
    <line x1="160" y1="140" x2="241" y2="59"  stroke={stroke} strokeWidth="2" />
    {/* Top secondary branches — mirrored from node (160,110) to circle edge */}
    <line x1="160" y1="110" x2="106" y2="42"  stroke={stroke} strokeWidth="2" />
    <line x1="160" y1="110" x2="214" y2="42"  stroke={stroke} strokeWidth="2" />
    {/* Branch nodes — bottom */}
    <Node cx={160} cy={180} r={4} stroke={stroke} />
    <Node cx={160} cy={210} r={3} stroke={stroke} />
    <Node cx={79}  cy={261} r={3} stroke={stroke} />
    <Node cx={241} cy={261} r={3} stroke={stroke} />
    <Node cx={106} cy={278} r={3} stroke={stroke} />
    <Node cx={214} cy={278} r={3} stroke={stroke} />
    {/* Branch nodes — top (mirrored) */}
    <Node cx={160} cy={140} r={4} stroke={stroke} />
    <Node cx={160} cy={110} r={3} stroke={stroke} />
    <Node cx={79}  cy={59}  r={3} stroke={stroke} />
    <Node cx={241} cy={59}  r={3} stroke={stroke} />
    <Node cx={106} cy={42}  r={3} stroke={stroke} />
    <Node cx={214} cy={42}  r={3} stroke={stroke} />
    {/* Trunk endpoints */}
    <Node cx={160} cy={30}  r={4} stroke={stroke} />
    <Node cx={160} cy={290} r={4} stroke={stroke} />
  </>
);

const EliBody = ({ stroke }) => (
  <>
    <circle cx="160" cy="160" r="130" stroke={stroke} strokeWidth="2" />
    <circle cx="160" cy="160" r="35"  stroke={stroke} strokeWidth="2" />
    <circle cx="160" cy="160" r="75"  stroke={stroke} strokeWidth="2" />
    <circle cx="160" cy="160" r="110" stroke={stroke} strokeWidth="2" />
    <line x1="160" y1="30"  x2="160" y2="140" stroke={stroke} strokeWidth="2" />
    <line x1="160" y1="180" x2="160" y2="290" stroke={stroke} strokeWidth="2" />
    <line x1="30"  y1="160" x2="140" y2="160" stroke={stroke} strokeWidth="2" />
    <line x1="180" y1="160" x2="290" y2="160" stroke={stroke} strokeWidth="2" />
    <Node cx={160} cy={160} r={4} stroke={stroke} />
    <Node cx={160} cy={30}  r={3} stroke={stroke} />
    <Node cx={160} cy={290} r={3} stroke={stroke} />
    <Node cx={30}  cy={160} r={3} stroke={stroke} />
    <Node cx={290} cy={160} r={3} stroke={stroke} />
  </>
);

// ─── GLYPH CARD ──────────────────────────────────────────────────────────────
const GlyphCard = ({ label, sublabel, accent, filename, svgId, previewChildren, exportChildren }) => {
  const handleExport = () => {
    const el = document.getElementById(svgId);
    if (!el) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(el);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      background: COLORS.surface,
      border: `1px solid ${accent}30`,
      borderRadius: 8,
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "center",
    }}>
      {/* Hidden export-quality SVG */}
      <div style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0, overflow: "hidden" }}>
        {exportChildren}
      </div>
      {/* Visible preview */}
      <div style={{
        width: 160, height: 160,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#0d0d1a", borderRadius: 4, color: accent,
      }}>
        {previewChildren}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ color: COLORS.text, fontFamily: "monospace", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
        {sublabel && <div style={{ color: COLORS.muted, fontFamily: "monospace", fontSize: 11, marginTop: 4 }}>{sublabel}</div>}
      </div>
      <button onClick={handleExport} style={{
        background: "transparent",
        border: `1px solid ${accent}60`,
        color: accent,
        fontFamily: "monospace",
        fontSize: 11,
        letterSpacing: "0.08em",
        padding: "6px 14px",
        borderRadius: 3,
        cursor: "pointer",
        textTransform: "uppercase",
      }}>
        Export SVG
      </button>
    </div>
  );
};

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function MajesticGlyphRenderer() {
  const [activeTab, setActiveTab] = useState("seals");

  const tabStyle = (tab) => ({
    fontFamily: "monospace",
    fontSize: 12,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "8px 20px",
    background: activeTab === tab ? COLORS.purple + "20" : "transparent",
    border: `1px solid ${activeTab === tab ? COLORS.purple : COLORS.muted + "40"}`,
    color: activeTab === tab ? COLORS.purple : COLORS.muted,
    borderRadius: 3,
    cursor: "pointer",
  });

  const seals = [
    {
      label: "Casper", sublabel: "Fire — glyph-seal-casper.svg",
      accent: COLORS.fire, filename: "glyph-seal-casper", svgId: "svg-casper",
      Body: CasperBody,
    },
    {
      label: "Destiny", sublabel: "Water — glyph-seal-destiny.svg",
      accent: COLORS.water, filename: "glyph-seal-destiny", svgId: "svg-destiny",
      Body: DestinyBody,
    },
    {
      label: "Olivia", sublabel: "Earth — glyph-seal-olivia.svg",
      accent: COLORS.earth, filename: "glyph-seal-olivia", svgId: "svg-olivia",
      Body: OliviaBody,
    },
    {
      label: "Eli", sublabel: "Air — glyph-seal-eli.svg",
      accent: COLORS.air, filename: "glyph-seal-eli", svgId: "svg-eli",
      Body: EliBody,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "monospace", padding: 32 }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: COLORS.purple, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
          Majestic — Glyph System
        </div>
        <div style={{ fontSize: 22, letterSpacing: "0.05em" }}>Elemental Seals & Signal Markers</div>
        <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 6 }}>Tasks #74 + #75 — SVG Production Pass</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        <button style={tabStyle("seals")}   onClick={() => setActiveTab("seals")}>#74 Elemental Seals</button>
        <button style={tabStyle("markers")} onClick={() => setActiveTab("markers")}>#75 Signal Markers</button>
      </div>

      {/* ── SEALS ── */}
      {activeTab === "seals" && (
        <div>
          <div style={{ color: COLORS.muted, fontSize: 11, letterSpacing: "0.1em", marginBottom: 20 }}>
            4 seals — SVG masters for export at 80/160/320px — used in card art and codex
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {seals.map(({ label, sublabel, accent, filename, svgId, Body }) => (
              <GlyphCard
                key={svgId}
                label={label} sublabel={sublabel} accent={accent}
                filename={filename} svgId={svgId}
                previewChildren={
                  <svg viewBox="0 0 320 320" width="140" height="140" fill="none">
                    <Body stroke={accent} />
                  </svg>
                }
                exportChildren={
                  <svg id={svgId} viewBox="0 0 320 320" width="320" height="320" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Body stroke="black" />
                  </svg>
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* ── MARKERS ── */}
      {activeTab === "markers" && (
        <div>
          <div style={{ color: COLORS.muted, fontSize: 11, letterSpacing: "0.1em", marginBottom: 20 }}>
            4 markers — SVG masters for export at 16/24/32px — UI micro-detail components
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>

            <GlyphCard label="Directional Arrow" sublabel="marker-directional-arrow.svg" accent={COLORS.purple} filename="marker-directional-arrow" svgId="svg-marker-arrow"
              previewChildren={
                <svg viewBox="0 0 32 32" width="80" height="80" fill="none">
                  <line x1="14" y1="16" x2="26" y2="16" stroke={COLORS.purple} strokeWidth="1.5" />
                  <line x1="14" y1="16" x2="7"  y2="11" stroke={COLORS.purple} strokeWidth="1.5" />
                  <line x1="14" y1="16" x2="7"  y2="21" stroke={COLORS.purple} strokeWidth="1.5" />
                  <circle cx="26" cy="16" r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                  <circle cx="7"  cy="11" r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                  <circle cx="7"  cy="21" r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                </svg>
              }
              exportChildren={
                <svg id="svg-marker-arrow" viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="14" y1="16" x2="26" y2="16" stroke="black" strokeWidth="1.5" />
                  <line x1="14" y1="16" x2="7"  y2="11" stroke="black" strokeWidth="1.5" />
                  <line x1="14" y1="16" x2="7"  y2="21" stroke="black" strokeWidth="1.5" />
                  <circle cx="26" cy="16" r="1.5" fill="black" stroke="black" strokeWidth="1" />
                  <circle cx="7"  cy="11" r="1.5" fill="black" stroke="black" strokeWidth="1" />
                  <circle cx="7"  cy="21" r="1.5" fill="black" stroke="black" strokeWidth="1" />
                </svg>
              }
            />

            <GlyphCard label="Signal Node" sublabel="marker-signal-node.svg" accent={COLORS.purple} filename="marker-signal-node" svgId="svg-marker-signal"
              previewChildren={
                <svg viewBox="0 0 32 32" width="80" height="80" fill="none">
                  <circle cx="16" cy="16" r="9"   stroke={COLORS.purple} strokeWidth="1.5" />
                  <circle cx="16" cy="16" r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                  <circle cx="16"   cy="3.5"  r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                  <circle cx="16"   cy="28.5" r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                  <circle cx="3.5"  cy="16"   r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                  <circle cx="28.5" cy="16"   r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                </svg>
              }
              exportChildren={
                <svg id="svg-marker-signal" viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="9"   stroke="black" strokeWidth="1.5" />
                  <circle cx="16" cy="16" r="1.5" fill="black" stroke="black" strokeWidth="1" />
                  <circle cx="16"   cy="3.5"  r="1.5" fill="black" stroke="black" strokeWidth="1" />
                  <circle cx="16"   cy="28.5" r="1.5" fill="black" stroke="black" strokeWidth="1" />
                  <circle cx="3.5"  cy="16"   r="1.5" fill="black" stroke="black" strokeWidth="1" />
                  <circle cx="28.5" cy="16"   r="1.5" fill="black" stroke="black" strokeWidth="1" />
                </svg>
              }
            />

            <GlyphCard label="Threshold Marker" sublabel="marker-threshold.svg" accent={COLORS.purple} filename="marker-threshold" svgId="svg-marker-threshold"
              previewChildren={
                <svg viewBox="0 0 32 32" width="80" height="80" fill="none">
                  <path d="M 8 12 Q 16 -7 24 12" stroke={COLORS.purple} strokeWidth="1.5" fill="none" />
                  <line x1="8"  y1="12" x2="8"  y2="28" stroke={COLORS.purple} strokeWidth="1.5" />
                  <line x1="24" y1="12" x2="24" y2="28" stroke={COLORS.purple} strokeWidth="1.5" />
                  <circle cx="16" cy="3"  r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                  <circle cx="8"  cy="12" r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                  <circle cx="24" cy="12" r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                  <circle cx="8"  cy="28" r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                  <circle cx="24" cy="28" r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                </svg>
              }
              exportChildren={
                <svg id="svg-marker-threshold" viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 8 12 Q 16 -7 24 12" stroke="black" strokeWidth="1.5" fill="none" />
                  <line x1="8"  y1="12" x2="8"  y2="28" stroke="black" strokeWidth="1.5" />
                  <line x1="24" y1="12" x2="24" y2="28" stroke="black" strokeWidth="1.5" />
                  <circle cx="16" cy="3"  r="1.5" fill="black" stroke="black" strokeWidth="1" />
                  <circle cx="8"  cy="12" r="1.5" fill="black" stroke="black" strokeWidth="1" />
                  <circle cx="24" cy="12" r="1.5" fill="black" stroke="black" strokeWidth="1" />
                  <circle cx="8"  cy="28" r="1.5" fill="black" stroke="black" strokeWidth="1" />
                  <circle cx="24" cy="28" r="1.5" fill="black" stroke="black" strokeWidth="1" />
                </svg>
              }
            />

            <GlyphCard label="Phase Indicator" sublabel="marker-phase-indicator.svg" accent={COLORS.purple} filename="marker-phase-indicator" svgId="svg-marker-phase"
              previewChildren={
                <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                  {[1, 2, 3].map(p => (
                    <div key={p} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg viewBox="0 0 32 32" width="60" height="60" fill="none">
                        {Array.from({ length: 3 }, (_, i) => {
                          const rr = 12, ccx = 16, ccy = 16;
                          const segAngle = (2 * Math.PI) / 3;
                          const gap = 0.08;
                          const sa = -Math.PI / 2 + i * segAngle + gap / 2;
                          const ea = sa + segAngle - gap;
                          const x1 = ccx + rr * Math.cos(sa), y1 = ccy + rr * Math.sin(sa);
                          const x2 = ccx + rr * Math.cos(ea), y2 = ccy + rr * Math.sin(ea);
                          return <path key={i} d={`M ${x1} ${y1} A ${rr} ${rr} 0 0 1 ${x2} ${y2}`} stroke={COLORS.purple} strokeWidth="1.5" opacity={i < p ? 1 : 0.25} />;
                        })}
                        <circle cx="26.39" cy="22"  r="1.5" fill={COLORS.purple} />
                        <circle cx="5.61"  cy="22"  r="1.5" fill={COLORS.purple} />
                        <circle cx="16"    cy="4"   r="1.5" fill={COLORS.purple} />
                        <circle cx="16" cy="16" r="1.5" fill={COLORS.purple} stroke={COLORS.purple} strokeWidth="1" />
                      </svg>
                      <span style={{ color: COLORS.muted, fontSize: 10 }}>phase {p}/3</span>
                    </div>
                  ))}
                </div>
              }
              exportChildren={
                <svg id="svg-marker-phase" viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {Array.from({ length: 3 }, (_, i) => {
                    const rr = 12, ccx = 16, ccy = 16;
                    const segAngle = (2 * Math.PI) / 3;
                    const gap = 0.08;
                    const sa = -Math.PI / 2 + i * segAngle + gap / 2;
                    const ea = sa + segAngle - gap;
                    const x1 = ccx + rr * Math.cos(sa), y1 = ccy + rr * Math.sin(sa);
                    const x2 = ccx + rr * Math.cos(ea), y2 = ccy + rr * Math.sin(ea);
                    return <path key={i} d={`M ${x1} ${y1} A ${rr} ${rr} 0 0 1 ${x2} ${y2}`} stroke="black" strokeWidth="1.5" opacity={i < 2 ? 1 : 0.25} />;
                  })}
                  <circle cx="26.39" cy="22"  r="1.5" fill="black" />
                  <circle cx="5.61"  cy="22"  r="1.5" fill="black" />
                  <circle cx="16"    cy="4"   r="1.5" fill="black" />
                  <circle cx="16" cy="16" r="1.5" fill="black" stroke="black" strokeWidth="1" />
                </svg>
              }
            />

          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 40, padding: "16px 20px", background: COLORS.surface, borderRadius: 4, border: `1px solid ${COLORS.muted}20` }}>
        <div style={{ color: COLORS.muted, fontSize: 11, letterSpacing: "0.08em", lineHeight: 1.8 }}>
          PRODUCTION NOTES — Seals: 320×320px viewBox, strokeWidth 2, export at 80/160/320px · Markers: 32×32px viewBox, strokeWidth 1.5, export at 16/24/32px · Exports in monochrome black · Colour applied as separate layer in production
        </div>
      </div>
    </div>
  );
}
