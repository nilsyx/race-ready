import { useState, useRef, useMemo } from "react";

// ─── PRODUCT DATABASE ───────────────────────────────────────────────────────
const PRODUCTS = {
  shoes: [
    { id: "s1", name: "Nike Vaporfly 3", brand: "Nike", color: "#2ECC40", accent: "#1a8a2a" },
    { id: "s2", name: "Nike Alphafly 3", brand: "Nike", color: "#FF4136", accent: "#c0392b" },
    { id: "s3", name: "Adidas Adios Pro 3", brand: "Adidas", color: "#0074D9", accent: "#003d7a" },
    { id: "s4", name: "Adidas Boston 12", brand: "Adidas", color: "#FF851B", accent: "#e67300" },
    { id: "s5", name: "Asics Metaspeed Sky+", brand: "Asics", color: "#FFDC00", accent: "#ccb000" },
    { id: "s6", name: "Asics Magic Speed 3", brand: "Asics", color: "#B10DC9", accent: "#7d0990" },
    { id: "s7", name: "New Balance SC Elite v4", brand: "New Balance", color: "#39CCCC", accent: "#2a9999" },
    { id: "s8", name: "NB FuelCell Rebel v4", brand: "New Balance", color: "#F012BE", accent: "#b00d8c" },
    { id: "s9", name: "Saucony Endorphin Pro 4", brand: "Saucony", color: "#FF4136", accent: "#c0392b" },
    { id: "s10", name: "Saucony Endorphin Speed 4", brand: "Saucony", color: "#2ECC40", accent: "#1a8a2a" },
    { id: "s11", name: "Hoka Rocket X 2", brand: "Hoka", color: "#FF851B", accent: "#e67300" },
    { id: "s12", name: "Hoka Cielo X1", brand: "Hoka", color: "#0074D9", accent: "#003d7a" },
    { id: "s13", name: "Brooks Hyperion Elite 4", brand: "Brooks", color: "#85144b", accent: "#5c0e34" },
    { id: "s14", name: "Brooks Ghost Max", brand: "Brooks", color: "#AAAAAA", accent: "#777" },
    { id: "s15", name: "On Cloudboom Echo 3", brand: "On", color: "#111111", accent: "#444" },
    { id: "s16", name: "On Cloudmonster", brand: "On", color: "#7FDBFF", accent: "#4fc3f7" },
    { id: "s17", name: "Puma Deviate Nitro 3", brand: "Puma", color: "#FFDC00", accent: "#ccb000" },
    { id: "s18", name: "Mizuno Wave Rebellion Pro 2", brand: "Mizuno", color: "#3D9970", accent: "#2d7353" },
    { id: "s19", name: "Nike Pegasus 41", brand: "Nike", color: "#001f3f", accent: "#001126" },
    { id: "s20", name: "Adidas Supernova Rise", brand: "Adidas", color: "#DDDDDD", accent: "#bbb" },
  ],
  socks: [
    { id: "sk1", name: "No-Show White", color: "#FFFFFF", accent: "#ddd", pattern: "solid" },
    { id: "sk2", name: "No-Show Black", color: "#1a1a1a", accent: "#444", pattern: "solid" },
    { id: "sk3", name: "Quarter Neon Green", color: "#2ECC40", accent: "#1a8a2a", pattern: "solid" },
    { id: "sk4", name: "Quarter Hot Pink", color: "#F012BE", accent: "#b00d8c", pattern: "solid" },
    { id: "sk5", name: "Quarter Electric Blue", color: "#0074D9", accent: "#003d7a", pattern: "solid" },
    { id: "sk6", name: "Crew Stripe Red", color: "#FF4136", accent: "#fff", pattern: "stripe" },
    { id: "sk7", name: "Crew Stripe Orange", color: "#FF851B", accent: "#fff", pattern: "stripe" },
    { id: "sk8", name: "No-Show Grey", color: "#999", accent: "#666", pattern: "solid" },
    { id: "sk9", name: "Quarter Coral", color: "#FF6B6B", accent: "#e55a5a", pattern: "solid" },
    { id: "sk10", name: "Crew Teal", color: "#39CCCC", accent: "#2a9999", pattern: "solid" },
  ],
  shorts: [
    { id: "sh1", name: "Nike Aeroswift 2\"", brand: "Nike", color: "#1a1a1a", accent: "#FF4136" },
    { id: "sh2", name: "Nike Stride 5\"", brand: "Nike", color: "#001f3f", accent: "#0074D9" },
    { id: "sh3", name: "Adidas Adizero Split", brand: "Adidas", color: "#FFFFFF", accent: "#1a1a1a" },
    { id: "sh4", name: "Adidas Own The Run 5\"", brand: "Adidas", color: "#2ECC40", accent: "#1a8a2a" },
    { id: "sh5", name: "Tracksmith Session 5\"", brand: "Tracksmith", color: "#85144b", accent: "#c0392b" },
    { id: "sh6", name: "Tracksmith Van Cortlandt", brand: "Tracksmith", color: "#001f3f", accent: "#85144b" },
    { id: "sh7", name: "Satisfy Short Distance 3\"", brand: "Satisfy", color: "#B10DC9", accent: "#7d0990" },
    { id: "sh8", name: "Lululemon Fast & Free 6\"", brand: "Lululemon", color: "#1a1a1a", accent: "#39CCCC" },
  ],
  shirts: [
    { id: "t1", name: "Nike Aeroswift Singlet", brand: "Nike", color: "#FF4136", accent: "#c0392b", type: "singlet" },
    { id: "t2", name: "Nike Dri-FIT Rise 365", brand: "Nike", color: "#0074D9", accent: "#003d7a", type: "tee" },
    { id: "t3", name: "Adidas Adizero Singlet", brand: "Adidas", color: "#2ECC40", accent: "#1a8a2a", type: "singlet" },
    { id: "t4", name: "Adidas Own The Run Tee", brand: "Adidas", color: "#FFDC00", accent: "#ccb000", type: "tee" },
    { id: "t5", name: "Tracksmith Singlet", brand: "Tracksmith", color: "#85144b", accent: "#5c0e34", type: "singlet" },
    { id: "t6", name: "Tracksmith Twilight Tee", brand: "Tracksmith", color: "#001f3f", accent: "#0074D9", type: "tee" },
    { id: "t7", name: "Satisfy MothTech™ Singlet", brand: "Satisfy", color: "#B10DC9", accent: "#F012BE", type: "singlet" },
    { id: "t8", name: "Lululemon Swiftly SS", brand: "Lululemon", color: "#39CCCC", accent: "#2a9999", type: "tee" },
    { id: "t9", name: "On Race Singlet", brand: "On", color: "#111111", accent: "#FF851B", type: "singlet" },
    { id: "t10", name: "Ciele Athletics Tee", brand: "Ciele", color: "#7FDBFF", accent: "#4fc3f7", type: "tee" },
  ],
  hats: [
    { id: "h1", name: "Nike AeroBill Cap", brand: "Nike", color: "#FFFFFF", accent: "#FF4136" },
    { id: "h2", name: "Nike Dri-FIT Visor", brand: "Nike", color: "#1a1a1a", accent: "#2ECC40", type: "visor" },
    { id: "h3", name: "Ciele GOCap", brand: "Ciele", color: "#7FDBFF", accent: "#0074D9" },
    { id: "h4", name: "Ciele ALZCap", brand: "Ciele", color: "#FF851B", accent: "#FFDC00" },
    { id: "h5", name: "Tracksmith Eliot Cap", brand: "Tracksmith", color: "#85144b", accent: "#FFFFFF" },
    { id: "h6", name: "Satisfy Peaceshell Cap", brand: "Satisfy", color: "#B10DC9", accent: "#F012BE" },
    { id: "h7", name: "On Lightweight Cap", brand: "On", color: "#111111", accent: "#AAAAAA" },
    { id: "h8", name: "None", brand: "", color: "transparent", accent: "transparent", isEmpty: true },
  ],
  sunglasses: [
    { id: "g1", name: "Oakley Kato", brand: "Oakley", color: "#FF4136", lensColor: "#1a1a1a" },
    { id: "g2", name: "Oakley Sutro Lite", brand: "Oakley", color: "#FFFFFF", lensColor: "#0074D9" },
    { id: "g3", name: "Oakley Encoder", brand: "Oakley", color: "#1a1a1a", lensColor: "#FF851B" },
    { id: "g4", name: "Nike Windshield", brand: "Nike", color: "#2ECC40", lensColor: "#1a1a1a" },
    { id: "g5", name: "100% Speedcraft", brand: "100%", color: "#F012BE", lensColor: "#B10DC9" },
    { id: "g6", name: "Goodr OG", brand: "Goodr", color: "#39CCCC", lensColor: "#001f3f" },
    { id: "g7", name: "Rudy Project Cutline", brand: "Rudy Project", color: "#FFDC00", lensColor: "#FF4136" },
    { id: "g8", name: "SunGod Velans", brand: "SunGod", color: "#FFFFFF", lensColor: "#2ECC40" },
    { id: "g9", name: "Blenders Eclipse X2", brand: "Blenders", color: "#1a1a1a", lensColor: "#7FDBFF" },
    { id: "g10", name: "None", brand: "", color: "transparent", lensColor: "transparent", isEmpty: true },
  ],
};

const CATEGORIES = ["shoes", "socks", "shorts", "shirts", "hats", "sunglasses"];
const CAT_ICONS = { shoes: "👟", socks: "🧦", shorts: "🩳", shirts: "👕", hats: "🧢", sunglasses: "🕶️" };
const CAT_LABELS = { shoes: "Shoes", socks: "Socks", shorts: "Shorts", shirts: "Shirt", hats: "Hat", sunglasses: "Shades" };

const SKIN_TONES = [
  { id: "light", color: "#FDEBD0", label: "Light", eye: "#5D4037", pupil: "#2c1810" },
  { id: "tan", color: "#DEB887", label: "Tan", eye: "#4E342E", pupil: "#1a0e08" },
  { id: "brown", color: "#A0522D", label: "Brown", eye: "#FFFFFF", pupil: "#1a1a1a" },
  { id: "dark", color: "#4E2E1E", label: "Dark", eye: "#FFFFFF", pupil: "#1a1a1a" },
  { id: "black", color: "#1a1a1a", label: "Black", eye: "#FFFFFF", pupil: "#1a1a1a" },
  { id: "yellow", color: "#FFD93D", label: "Yellow", eye: "#5D4037", pupil: "#2c1810" },
];

// ─── DYNAMIC KEYFRAMES GENERATOR ────────────────────────────────────────────
// Pace 1 = easy jog (big stride, upright, slow cadence)
// Pace 8 = full sprint (shorter stride, higher cadence, more lean, higher knee drive)
function generateKeyframes(pace) {
  // t = 0..1 where 0 = slowest, 1 = fastest
  const t = (pace - 1) / 7;

  // Stride: thigh swing range shrinks at speed (less overstride, tighter turnover)
  const thighFwd = -18 - 14 * (1 - t);  // forward swing: -32 at slow, -18 at fast
  const thighBack = 22 + 16 * (1 - t);   // back extension: 38 at slow, 22 at fast

  // Knee lift increases at speed
  const kneeMax = 65 + 25 * t;           // 65° at slow, 90° at fast
  const kneeMid = 35 + 10 * t;

  // Foot angle
  const footFwd = 8 + 4 * t;
  const footBack = -15 - 13 * (1 - t);

  // Arm swing: tighter at speed
  const armFwd = -22 - 16 * (1 - t);     // -38 at slow, -22 at fast
  const armBack = 18 + 14 * (1 - t);      // 32 at slow, 18 at fast
  const foreMin = -45 - 10 * (1 - t);
  const foreMax = -70 - 25 * t;

  // Body bounce decreases at speed
  const bounceUp = -3 - 2 * (1 - t);     // -5 slow, -3 fast
  const bounceDn = 1 + 2 * (1 - t);      // 3 slow, 1 fast

  // Forward lean increases at speed
  const lean = 1 + 4 * t;                // 1° slow, 5° fast

  return `
    @keyframes bodyBounce {
      0%, 100% { transform: translateY(0px); }
      12% { transform: translateY(${bounceUp}px); }
      25% { transform: translateY(-1px); }
      37% { transform: translateY(${bounceDn}px); }
      50% { transform: translateY(0px); }
      62% { transform: translateY(${bounceUp}px); }
      75% { transform: translateY(-1px); }
      87% { transform: translateY(${bounceDn}px); }
    }
    @keyframes torsoLean {
      0%, 50%, 100% { transform: rotate(${lean}deg); }
      25% { transform: rotate(${lean + 1.5}deg); }
      75% { transform: rotate(${lean - 1}deg); }
    }
    @keyframes lThigh {
      0%   { transform: rotate(${thighFwd}deg); }
      25%  { transform: rotate(${(thighFwd + thighBack) * 0.35}deg); }
      50%  { transform: rotate(${thighBack}deg); }
      75%  { transform: rotate(${(thighFwd + thighBack) * 0.5}deg); }
      100% { transform: rotate(${thighFwd}deg); }
    }
    @keyframes lShin {
      0%   { transform: rotate(${kneeMid + 10}deg); }
      12%  { transform: rotate(8deg); }
      30%  { transform: rotate(0deg); }
      50%  { transform: rotate(8deg); }
      68%  { transform: rotate(${kneeMax}deg); }
      82%  { transform: rotate(${kneeMid}deg); }
      100% { transform: rotate(${kneeMid + 10}deg); }
    }
    @keyframes lFoot {
      0%   { transform: rotate(${footFwd}deg); }
      20%  { transform: rotate(-5deg); }
      50%  { transform: rotate(${footBack}deg); }
      68%  { transform: rotate(${footFwd + 6}deg); }
      100% { transform: rotate(${footFwd}deg); }
    }
    @keyframes rThigh {
      0%   { transform: rotate(${thighBack}deg); }
      25%  { transform: rotate(${(thighFwd + thighBack) * 0.5}deg); }
      50%  { transform: rotate(${thighFwd}deg); }
      75%  { transform: rotate(${(thighFwd + thighBack) * 0.35}deg); }
      100% { transform: rotate(${thighBack}deg); }
    }
    @keyframes rShin {
      0%   { transform: rotate(8deg); }
      18%  { transform: rotate(${kneeMax}deg); }
      32%  { transform: rotate(${kneeMid}deg); }
      50%  { transform: rotate(${kneeMid + 10}deg); }
      62%  { transform: rotate(8deg); }
      80%  { transform: rotate(0deg); }
      100% { transform: rotate(8deg); }
    }
    @keyframes rFoot {
      0%   { transform: rotate(${footBack}deg); }
      18%  { transform: rotate(${footFwd + 6}deg); }
      50%  { transform: rotate(${footFwd}deg); }
      70%  { transform: rotate(-5deg); }
      100% { transform: rotate(${footBack}deg); }
    }
    @keyframes lUArm {
      0%   { transform: rotate(${armBack}deg); }
      50%  { transform: rotate(${armFwd}deg); }
      100% { transform: rotate(${armBack}deg); }
    }
    @keyframes lFArm {
      0%   { transform: rotate(${foreMin}deg); }
      25%  { transform: rotate(${foreMax}deg); }
      50%  { transform: rotate(${foreMin - 10}deg); }
      75%  { transform: rotate(${foreMax}deg); }
      100% { transform: rotate(${foreMin}deg); }
    }
    @keyframes rUArm {
      0%   { transform: rotate(${armFwd}deg); }
      50%  { transform: rotate(${armBack}deg); }
      100% { transform: rotate(${armFwd}deg); }
    }
    @keyframes rFArm {
      0%   { transform: rotate(${foreMin - 10}deg); }
      25%  { transform: rotate(${foreMax}deg); }
      50%  { transform: rotate(${foreMin}deg); }
      75%  { transform: rotate(${foreMax}deg); }
      100% { transform: rotate(${foreMin - 10}deg); }
    }
  `;
}

const STATIC_CSS = `
  @keyframes motionDash {
    0%   { stroke-dashoffset: 0; opacity: 0.25; }
    50%  { opacity: 0.12; }
    100% { stroke-dashoffset: -24; opacity: 0.25; }
  }
  @keyframes skylineScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  ::-webkit-scrollbar { display: none; }
`;

const EASE = "cubic-bezier(0.37, 0, 0.63, 1)";

// ─── LONDON SKYLINE ─────────────────────────────────────────────────────────
function LondonSkyline({ isAnimating, pace }) {
  const scrollDur = `${22 / pace}s`;
  const sky = `M 0 180 L 0 140 L 8 140 L 8 120 L 14 120 L 14 140 L 20 140 L 20 155 L 28 155 L 28 135 L 32 135 L 32 155 L 38 155 L 38 130 L 40 100 L 42 80 L 43 60 L 44 80 L 46 100 L 48 130 L 48 155 L 55 155 L 55 145 L 62 145 L 62 155 L 68 155 L 68 110 L 70 90 L 72 75 L 73 90 L 73 95 L 77 95 L 77 90 L 78 75 L 80 90 L 82 110 L 82 155 L 88 155 L 88 148 L 92 148 L 92 155 L 98 155 L 98 50 L 100 35 L 102 50 L 102 155 L 110 155 L 110 140 L 118 140 L 118 155 L 125 155 L 128 120 L 131 155 L 136 155 L 136 145 L 140 145 L 140 130 L 144 130 L 144 145 L 148 145 L 148 155 L 155 155 L 155 100 L 157 100 L 157 95 Q 163 80 169 95 L 169 100 L 171 100 L 171 155 L 178 155 L 178 140 L 184 140 L 184 155 L 192 155 L 192 125 L 194 115 L 196 108 L 198 115 L 200 125 L 200 155 L 206 155 L 206 148 L 210 148 L 210 155 L 218 155 L 220 130 L 222 120 L 224 130 L 226 155 L 232 155 L 232 140 L 238 140 L 238 155 L 245 155 L 245 135 L 248 125 L 251 135 L 251 155 L 260 155 L 260 140 L 268 140 L 268 120 L 274 120 L 274 140 L 280 140 L 280 155 L 288 155 L 288 135 L 292 135 L 292 155 L 298 155 L 298 130 L 300 100 L 302 80 L 303 60 L 304 80 L 306 100 L 308 130 L 308 155 L 315 155 L 315 145 L 322 145 L 322 155 L 328 155 L 328 110 L 330 90 L 332 75 L 333 90 L 333 95 L 337 95 L 337 90 L 338 75 L 340 90 L 342 110 L 342 155 L 348 155 L 348 148 L 352 148 L 352 155 L 358 155 L 358 50 L 360 35 L 362 50 L 362 155 L 370 155 L 370 140 L 378 140 L 378 155 L 385 155 L 388 120 L 391 155 L 396 155 L 396 145 L 400 145 L 400 130 L 404 130 L 404 145 L 408 145 L 408 155 L 415 155 L 415 100 L 417 100 L 417 95 Q 423 80 429 95 L 429 100 L 431 100 L 431 155 L 438 155 L 438 140 L 444 140 L 444 155 L 452 155 L 452 125 L 454 115 L 456 108 L 458 115 L 460 125 L 460 155 L 466 155 L 466 148 L 470 148 L 470 155 L 478 155 L 480 130 L 482 120 L 484 130 L 486 155 L 492 155 L 492 140 L 498 140 L 498 155 L 505 155 L 505 135 L 508 125 L 511 135 L 511 155 L 520 155 L 520 180`;
  return (
    <svg viewBox="0 0 260 180" preserveAspectRatio="xMidYMax slice"
      style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", height: "55%", opacity: 0.13, pointerEvents: "none", overflow: "hidden" }}>
      <g style={{ animation: isAnimating ? `skylineScroll ${scrollDur} linear infinite` : "none" }}>
        <path d={sky} fill="none" stroke="#5a3a2a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// ─── ANIMATED RUNNER AVATAR ─────────────────────────────────────────────────
function RunnerAvatar({ gear, onSlotTap, activeSlot, isAnimating, pace, skinColor }) {
  const shoes = PRODUCTS.shoes.find(p => p.id === gear.shoes);
  const socks = PRODUCTS.socks.find(p => p.id === gear.socks);
  const shorts = PRODUCTS.shorts.find(p => p.id === gear.shorts);
  const shirt = PRODUCTS.shirts.find(p => p.id === gear.shirts);
  const hat = PRODUCTS.hats.find(p => p.id === gear.hats);
  const sg = PRODUCTS.sunglasses.find(p => p.id === gear.sunglasses);

  const skin = SKIN_TONES.find(s => s.id === skinColor) || SKIN_TONES[4];
  const sc = skin.color;

  // Cadence: pace 1 = 0.75s cycle, pace 8 = 0.28s cycle
  const cycleTime = `${0.85 - pace * 0.07}s`;

  const a = (name) => isAnimating ? `${name} ${cycleTime} ${EASE} infinite` : "none";

  const glow = (cat) => activeSlot === cat
    ? "drop-shadow(0 0 6px rgba(199,92,58,0.9)) drop-shadow(0 0 14px rgba(199,92,58,0.4))" : "none";

  const Limb = ({ x, y1, y2, w, filter: f }) => (
    <rect x={x - w/2} y={y1} width={w} height={y2 - y1} rx={w/2} ry={w/2}
      fill={sc} stroke="none" filter={f} />
  );

  const LegWithGear = ({ thighAnim, shinAnim, footAnim, xOff, zThick }) => {
    const hx = 75 + xOff;
    const lw = zThick * 3.2;
    return (
      <g style={{ transformOrigin: `${hx}px 0px`, animation: a(thighAnim) }}>
        <Limb x={hx} y1={-2} y2={72} w={lw} filter="url(#pencilF)" />
        <g onClick={() => onSlotTap("shorts")} style={{ cursor: "pointer" }}>
          <path d={`M ${hx-8} -2 L ${hx-11} 38 Q ${hx-5} 41 ${hx} 41 Q ${hx+5} 41 ${hx+11} 38 L ${hx+8} -2 Z`}
            fill={shorts?.color} stroke={shorts?.accent} strokeWidth="1.2" opacity="0.88" />
        </g>
        <g style={{ transformOrigin: `${hx}px 70px`, animation: a(shinAnim) }}>
          <Limb x={hx} y1={68} y2={142} w={lw * 0.9} filter="url(#pencilF)" />
          <g onClick={() => onSlotTap("socks")} style={{ cursor: "pointer", filter: glow("socks") }}>
            <path d={`M ${hx-6} 115 L ${hx-6} 141 Q ${hx-2} 145 ${hx} 145 Q ${hx+2} 145 ${hx+6} 141 L ${hx+6} 115`}
              fill={socks?.color} stroke={socks?.accent} strokeWidth="1" opacity="0.9" />
            {socks?.pattern === "stripe" && <>
              <line x1={hx-6} y1={122} x2={hx+6} y2={122} stroke={socks?.accent} strokeWidth="1.5" />
              <line x1={hx-6} y1={128} x2={hx+6} y2={128} stroke={socks?.accent} strokeWidth="1.5" />
            </>}
          </g>
          <g style={{ transformOrigin: `${hx}px 140px`, animation: a(footAnim) }}>
            <path d={`M ${hx-4} 136 L ${hx-4} 148 L ${hx+30} 150 Q ${hx+32} 146 ${hx+30} 142 L ${hx+4} 136 Z`}
              fill={sc} filter="url(#pencilF)" />
            <g onClick={() => onSlotTap("shoes")} style={{ cursor: "pointer", filter: glow("shoes") }}>
              <path d={`M ${hx-6} 135 L ${hx-8} 150 L ${hx+34} 154 L ${hx+36} 144 L ${hx+4} 135 Z`}
                fill={shoes?.color} stroke={shoes?.accent} strokeWidth="1.6" opacity="0.92" />
              <line x1={hx-4} y1={148} x2={hx+31} y2={152} stroke="#fff" strokeWidth="0.8" opacity="0.3" />
              <text x={hx+14} y={151} textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold" opacity="0.65">
                {shoes?.brand?.split(" ")[0]}
              </text>
            </g>
          </g>
        </g>
      </g>
    );
  };

  const ArmSegment = ({ xBase, upperAnim, foreAnim, zThick }) => {
    const lw = zThick * 2.8;
    const isTee = shirt?.type === "tee";
    return (
      <g style={{ transformOrigin: `${xBase}px -115px`, animation: a(upperAnim) }}>
        <Limb x={xBase} y1={-117} y2={-63} w={lw} filter="url(#pencilF)" />
        {isTee && (
          <g onClick={() => onSlotTap("shirts")} style={{ cursor: "pointer" }}>
            <rect x={xBase - lw/2 - 2} y={-118} width={lw + 4} height={28} rx={lw/2 + 1}
              fill={shirt?.color} stroke={shirt?.accent} strokeWidth="0.8" opacity="0.88" />
          </g>
        )}
        <g style={{ transformOrigin: `${xBase}px -65px`, animation: a(foreAnim) }}>
          <Limb x={xBase} y1={-67} y2={-18} w={lw * 0.85} filter="url(#pencilF)" />
          <circle cx={xBase} cy={-16} r={5} fill={sc} filter="url(#pencilF)" />
        </g>
      </g>
    );
  };

  return (
    <svg viewBox="-80 -230 310 510" style={{ width: "100%", maxWidth: 340, margin: "0 auto", display: "block", overflow: "visible" }}>
      <defs>
        <filter id="pencilF">
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" />
        </filter>
      </defs>

      <g style={{ animation: a("bodyBounce"), transformOrigin: "75px 0px" }}>
        <g style={{ animation: a("torsoLean"), transformOrigin: "75px -60px" }}>
          <LegWithGear thighAnim="rThigh" shinAnim="rShin" footAnim="rFoot" xOff={10} zThick={2.4} />
          <ArmSegment xBase={55} upperAnim="lUArm" foreAnim="lFArm" zThick={2.2} />

          <g onClick={() => onSlotTap("shirts")} style={{ cursor: "pointer", filter: glow("shirts") }}>
            <path d="M 55 -120 L 50 -10 Q 60 5 75 5 Q 90 5 100 -10 L 95 -120 Z"
              fill={sc} stroke="none" filter="url(#pencilF)" />
            <path d="M 56 -118 L 51 -10 Q 61 4 75 4 Q 89 4 99 -10 L 94 -118 Z"
              fill={shirt?.color} stroke={shirt?.accent} strokeWidth="1" opacity="0.9" />
            {shirt?.type === "singlet" && <>
              <path d="M 62 -118 L 62 -105 Q 68 -98 75 -100 Q 70 -108 66 -118" fill={shirt?.accent} opacity="0.25" />
              <path d="M 88 -118 L 88 -105 Q 82 -98 75 -100 Q 80 -108 84 -118" fill={shirt?.accent} opacity="0.25" />
            </>}
            <text x="75" y="-52" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold" opacity="0.4">{shirt?.brand}</text>
          </g>

          <g onClick={() => onSlotTap("shorts")} style={{ cursor: "pointer", filter: glow("shorts") }}>
            <path d="M 52 -12 L 48 28 Q 60 34 75 34 Q 90 34 102 28 L 98 -12 Z"
              fill={shorts?.color} stroke={shorts?.accent} strokeWidth="1.2" opacity="0.88" />
            <line x1="75" y1="-8" x2="75" y2="30" stroke={shorts?.accent} strokeWidth="0.8" opacity="0.3" />
            <text x="75" y="14" textAnchor="middle" fontSize="6" fill={shorts?.accent} fontWeight="bold" opacity="0.4">{shorts?.brand}</text>
          </g>

          <LegWithGear thighAnim="lThigh" shinAnim="lShin" footAnim="lFoot" xOff={-10} zThick={3} />
          <ArmSegment xBase={95} upperAnim="rUArm" foreAnim="rFArm" zThick={2.8} />

          <g>
            <rect x="69" y="-133" width="12" height="15" rx="6" fill={sc} filter="url(#pencilF)" />
            <ellipse cx="75" cy="-158" rx="23" ry="28" fill={sc} filter="url(#pencilF)" />
            <circle cx="67" cy="-162" r="2.5" fill={skin.eye} />
            <circle cx="83" cy="-162" r="2.5" fill={skin.eye} />
            <circle cx="67.8" cy="-161.5" r="1.2" fill={skin.pupil} />
            <circle cx="83.8" cy="-161.5" r="1.2" fill={skin.pupil} />
            <path d="M 69 -150 Q 75 -144 81 -150" fill="none" stroke={skin.eye} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
            <ellipse cx="51" cy="-158" rx="5" ry="7" fill={sc} filter="url(#pencilF)" />
            <ellipse cx="99" cy="-158" rx="5" ry="7" fill={sc} filter="url(#pencilF)" />

            <g onClick={() => onSlotTap("hats")} style={{ cursor: "pointer", filter: glow("hats") }}>
              {!hat?.isEmpty && <>
                <ellipse cx="75" cy="-180" rx="28" ry="7" fill={hat?.color} stroke="#333" strokeWidth="1.2" opacity="0.92" />
                <path d="M 50 -180 Q 50 -200 75 -205 Q 100 -200 100 -180" fill={hat?.color} stroke="#333" strokeWidth="1.2" />
                <ellipse cx="75" cy="-180" rx="33" ry="5.5" fill={hat?.accent} opacity="0.55" />
                <text x="75" y="-190" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold" opacity="0.65">{hat?.brand}</text>
              </>}
              <rect x="42" y="-212" width="66" height="42" fill="transparent" />
            </g>

            <g onClick={() => onSlotTap("sunglasses")} style={{ cursor: "pointer", filter: glow("sunglasses") }}>
              {!sg?.isEmpty && <>
                <rect x="55" y="-168" width="17" height="11" rx="3.5" fill={sg?.lensColor} stroke={sg?.color} strokeWidth="1.8" opacity="0.88" />
                <rect x="76" y="-168" width="17" height="11" rx="3.5" fill={sg?.lensColor} stroke={sg?.color} strokeWidth="1.8" opacity="0.88" />
                <line x1="72" y1="-163" x2="76" y2="-163" stroke={sg?.color} strokeWidth="1.8" />
                <line x1="55" y1="-163" x2="48" y2="-165" stroke={sg?.color} strokeWidth="1.3" />
                <line x1="93" y1="-163" x2="100" y2="-165" stroke={sg?.color} strokeWidth="1.3" />
              </>}
              <rect x="44" y="-173" width="62" height="20" fill="transparent" />
            </g>
          </g>
        </g>

        {isAnimating && (
          <g stroke="#c4785e" strokeWidth="1.8" strokeLinecap="round"
             strokeDasharray="6 5" style={{ animation: "motionDash 0.35s linear infinite" }}>
            <line x1="-15" y1="-110" x2="-45" y2="-108" opacity="0.3" />
            <line x1="-10" y1="-65" x2="-45" y2="-63" opacity="0.35" />
            <line x1="-8" y1="-20" x2="-42" y2="-18" opacity="0.3" />
            <line x1="-12" y1="25" x2="-48" y2="27" opacity="0.35" />
            <line x1="-6" y1="70" x2="-40" y2="72" opacity="0.25" />
          </g>
        )}
      </g>
    </svg>
  );
}

// ─── PRODUCT CARD ───────────────────────────────────────────────────────────
function ProductCard({ product, category, isSelected, onSelect }) {
  if (product.isEmpty) {
    return (
      <div onClick={onSelect} style={{
        width: 88, minHeight: 96, borderRadius: 14, border: isSelected ? "2.5px solid #c75c3a" : "2px dashed #bbb",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: isSelected ? "rgba(199,92,58,0.08)" : "rgba(0,0,0,0.02)",
        cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
      }}>
        <span style={{ fontSize: 22, opacity: 0.4 }}>✕</span>
        <span style={{ fontSize: 10, color: "#aaa", marginTop: 4 }}>None</span>
      </div>
    );
  }
  const mc = product.color || product.lensColor || "#666";
  return (
    <div onClick={onSelect} style={{
      width: 88, minHeight: 96, borderRadius: 14,
      border: isSelected ? "2.5px solid #c75c3a" : "2px solid rgba(0,0,0,0.08)",
      background: isSelected ? "linear-gradient(135deg, rgba(199,92,58,0.1), rgba(199,92,58,0.03))" : "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))",
      cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column",
      alignItems: "center", padding: "8px 4px", gap: 4, flexShrink: 0,
      boxShadow: isSelected ? "0 0 12px rgba(199,92,58,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
    }}>
      <div style={{ width: 52, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${mc}, ${product.accent || mc})`,
        boxShadow: `0 2px 8px ${mc}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 20, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}>{CAT_ICONS[category]}</span>
      </div>
      <span style={{ fontSize: 9, color: "#555", textAlign: "center", lineHeight: 1.2, maxWidth: 80, overflow: "hidden",
        textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{product.name}</span>
      {product.brand && <span style={{ fontSize: 8, color: "#999", fontWeight: 600, letterSpacing: 0.5 }}>{product.brand.toUpperCase()}</span>}
    </div>
  );
}

function GearDrawer({ category, gear, onSelect, onClose }) {
  const products = PRODUCTS[category] || [];
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, #fdf6f0, #f8ece4)",
      borderRadius: "24px 24px 0 0", padding: "16px 0 32px", boxShadow: "0 -8px 32px rgba(0,0,0,0.12)", zIndex: 100, maxHeight: "55vh", overflowY: "auto", animation: "slideUp 0.3s ease-out" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div>
          <span style={{ fontSize: 20, marginRight: 8 }}>{CAT_ICONS[category]}</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#3d2c2c", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>{CAT_LABELS[category]?.toUpperCase()}</span>
        </div>
        <button onClick={onClose} style={{ background: "rgba(0,0,0,0.06)", border: "none", color: "#3d2c2c", width: 32, height: 32, borderRadius: 16, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: "16px 16px 8px", justifyContent: "center" }}>
        {products.map(p => <ProductCard key={p.id} product={p} category={category} isSelected={gear[category] === p.id} onSelect={() => onSelect(category, p.id)} />)}
      </div>
    </div>
  );
}

function CategoryBar({ activeSlot, onSlotTap }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: "8px 8px", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
      {CATEGORIES.map(cat => (
        <button key={cat} onClick={() => onSlotTap(cat)} style={{
          flex: "0 0 auto", padding: "8px 14px", borderRadius: 20,
          border: activeSlot === cat ? "2px solid #c75c3a" : "2px solid transparent",
          background: activeSlot === cat ? "rgba(199,92,58,0.1)" : "rgba(255,255,255,0.5)",
          color: activeSlot === cat ? "#c75c3a" : "#8a6b6b", fontSize: 12, fontWeight: 600,
          cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
          whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif",
        }}>
          <span style={{ fontSize: 16 }}>{CAT_ICONS[cat]}</span>{CAT_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}

function UploadScreen({ onStart, onSkip }) {
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const handleFile = (f) => { if (f?.type.startsWith("image/")) { const r = new FileReader(); r.onload = (e) => setPreview(e.target.result); r.readAsDataURL(f); } };
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24,
      background: "linear-gradient(160deg, #fdf6f0 0%, #f2d5c4 50%, #e8c2ae 100%)", textAlign: "center" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: "#c75c3a", letterSpacing: 4, margin: 0, lineHeight: 1 }}>RACE READY</h1>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: "#8a5a3a", margin: "4px 0 0", letterSpacing: 1 }}>dress your runner self</p>
      </div>
      {!preview ? <>
        <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => fileRef.current?.click()}
          style={{ width: "100%", maxWidth: 280, height: 280, borderRadius: 24,
            border: `3px dashed ${dragOver ? "#c75c3a" : "rgba(0,0,0,0.15)"}`,
            background: dragOver ? "rgba(199,92,58,0.05)" : "rgba(255,255,255,0.4)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <span style={{ fontSize: 48, marginBottom: 12 }}>📸</span>
          <span style={{ color: "#8a6b6b", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Upload a running photo</span>
          <span style={{ color: "#b09090", fontSize: 12, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>or tap to browse</span>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files?.[0])} />
        <button onClick={onSkip} style={{ marginTop: 24, padding: "12px 32px", borderRadius: 24, background: "rgba(255,255,255,0.5)",
          border: "1px solid rgba(0,0,0,0.1)", color: "#8a6b6b", fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
          Skip → use default avatar</button>
      </> : <>
        <div style={{ width: 200, height: 200, borderRadius: 24, overflow: "hidden", border: "3px solid #c75c3a", boxShadow: "0 0 24px rgba(199,92,58,0.2)" }}>
          <img src={preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <p style={{ color: "#b09090", fontSize: 12, marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>🎨 In V2, this becomes your cartoon avatar!</p>
        <button onClick={() => onStart(preview)} style={{ marginTop: 16, padding: "14px 40px", borderRadius: 28,
          background: "linear-gradient(135deg, #c75c3a, #e07a5a)", border: "none", color: "#fff", fontSize: 16, fontWeight: 700,
          cursor: "pointer", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, boxShadow: "0 4px 16px rgba(199,92,58,0.3)" }}>GEAR UP →</button>
      </>}
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function RaceReady() {
  const [screen, setScreen] = useState("upload");
  const [photo, setPhoto] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [pace, setPace] = useState(4);
  const [skinColor, setSkinColor] = useState("dark");
  const [gear, setGear] = useState({ shoes: "s1", socks: "sk1", shorts: "sh1", shirts: "t1", hats: "h1", sunglasses: "g1" });

  // Regenerate keyframes when pace changes
  const dynamicCSS = useMemo(() => generateKeyframes(pace), [pace]);

  const handleStart = (p) => { setPhoto(p); setScreen("editor"); };
  const handleSkip = () => setScreen("editor");
  const handleGearChange = (cat, id) => setGear(prev => ({ ...prev, [cat]: id }));
  const handleSlotTap = (cat) => setActiveSlot(prev => prev === cat ? null : cat);
  const randomize = () => { const g = {}; CATEGORIES.forEach(c => { const i = PRODUCTS[c]; g[c] = i[Math.floor(Math.random() * i.length)].id; }); setGear(g); };

  const paceLabel = (p) => {
    const mpk = 7.5 - (p - 1) * 0.75;
    return `${Math.floor(mpk)}:${(Math.round((mpk % 1) * 60)).toString().padStart(2, "0")}/km`;
  };

  if (screen === "upload") {
    return <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@400;600&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{STATIC_CSS}{dynamicCSS}</style>
      <UploadScreen onStart={handleStart} onSkip={handleSkip} />
    </>;
  }

  return <>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@400;600&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>{STATIC_CSS}{dynamicCSS}</style>
    <div style={{ minHeight: "100dvh", background: "linear-gradient(175deg, #fdf6f0 0%, #f8e8de 35%, #f2d5c4 65%, #e8c2ae 100%)",
      color: "#3d2c2c", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column",
      paddingBottom: activeSlot ? "55vh" : 0, transition: "padding-bottom 0.3s ease", position: "relative", overflow: "hidden" }}>

      <LondonSkyline isAnimating={isAnimating} pace={pace} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 4px", position: "relative", zIndex: 2 }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#c75c3a", letterSpacing: 3, margin: 0, lineHeight: 1 }}>RACE READY</h1>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setIsAnimating(v => !v)} style={{
            background: isAnimating ? "rgba(199,92,58,0.12)" : "rgba(0,0,0,0.04)",
            border: isAnimating ? "1px solid rgba(199,92,58,0.3)" : "1px solid rgba(0,0,0,0.1)",
            color: isAnimating ? "#c75c3a" : "#999", padding: "6px 12px", borderRadius: 16, fontSize: 12, fontWeight: 600,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
          }}>{isAnimating ? "⏸ Pause" : "▶ Run"}</button>
          <button onClick={randomize} style={{ background: "rgba(199,92,58,0.1)", border: "1px solid rgba(199,92,58,0.25)",
            color: "#c75c3a", padding: "6px 12px", borderRadius: 16, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            🎲 Shuffle</button>
        </div>
      </div>

      <CategoryBar activeSlot={activeSlot} onSlotTap={handleSlotTap} />

      {/* Controls row */}
      <div style={{ padding: "4px 16px 8px", display: "flex", gap: 12, alignItems: "center", position: "relative", zIndex: 2 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#8a6b6b", fontWeight: 600, whiteSpace: "nowrap" }}>🏃 {paceLabel(pace)}</span>
          <input type="range" min="1" max="8" step="1" value={pace} onChange={(e) => setPace(Number(e.target.value))}
            style={{ flex: 1, height: 4, appearance: "none", WebkitAppearance: "none",
              background: `linear-gradient(to right, #c75c3a ${(pace-1)/7*100}%, rgba(0,0,0,0.1) ${(pace-1)/7*100}%)`,
              borderRadius: 4, outline: "none", cursor: "pointer" }} />
          <span style={{ fontSize: 9, color: "#b09090", minWidth: 14, textAlign: "center" }}>
            {pace <= 2 ? "🐢" : pace <= 5 ? "🏃" : pace <= 7 ? "⚡" : "🚀"}</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {SKIN_TONES.map(s => (
            <div key={s.id} onClick={() => setSkinColor(s.id)} style={{
              width: 22, height: 22, borderRadius: 11, background: s.color,
              border: skinColor === s.id ? "2.5px solid #c75c3a" : "2px solid rgba(0,0,0,0.12)",
              cursor: "pointer", transition: "all 0.15s",
              boxShadow: skinColor === s.id ? "0 0 8px rgba(199,92,58,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
            }} />
          ))}
        </div>
      </div>

      {/* Avatar */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center",
        padding: "0 16px 0", position: "relative", zIndex: 2, marginBottom: -20 }}>
        {photo && (
          <div style={{ position: "absolute", top: 8, right: 16, width: 44, height: 44, borderRadius: 12, overflow: "hidden",
            border: "2px solid rgba(0,0,0,0.1)", opacity: 0.6 }}>
            <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <div style={{ width: "100%", maxWidth: 340 }}>
          <RunnerAvatar gear={gear} onSlotTap={handleSlotTap} activeSlot={activeSlot}
            isAnimating={isAnimating} pace={pace} skinColor={skinColor} />
        </div>
      </div>

      {/* Outfit summary */}
      <div style={{ display: "flex", gap: 6, padding: "0 12px 12px", overflowX: "auto", WebkitOverflowScrolling: "touch", position: "relative", zIndex: 2 }}>
        {CATEGORIES.map(cat => {
          const p = PRODUCTS[cat].find(x => x.id === gear[cat]);
          if (p?.isEmpty) return null;
          return (
            <div key={cat} onClick={() => handleSlotTap(cat)} style={{ flex: "0 0 auto", padding: "6px 10px", borderRadius: 12,
              background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.08)", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: `linear-gradient(135deg, ${p?.color}, ${p?.accent || p?.color})` }} />
              <span style={{ fontSize: 10, color: "#6b5050", whiteSpace: "nowrap" }}>{p?.name?.split(" ").slice(0, 2).join(" ")}</span>
            </div>
          );
        })}
      </div>

      {!activeSlot && <div style={{ textAlign: "center", padding: "0 0 16px", color: "#c0a0a0", fontSize: 12, fontFamily: "'Caveat', cursive", position: "relative", zIndex: 2 }}>
        tap on gear or categories to customize ↑</div>}

      {activeSlot && <>
        <div onClick={() => setActiveSlot(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 99 }} />
        <GearDrawer category={activeSlot} gear={gear} onSelect={handleGearChange} onClose={() => setActiveSlot(null)} />
      </>}
    </div>
  </>;
}
