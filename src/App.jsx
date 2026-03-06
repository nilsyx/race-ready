import { useState, useRef, useEffect } from "react";

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
    { id: "sh1", name: "Nike Aeroswift 2\"", brand: "Nike", color: "#1a1a1a", accent: "#FF4136", length: "2in" },
    { id: "sh2", name: "Nike Stride 5\"", brand: "Nike", color: "#001f3f", accent: "#0074D9", length: "5in" },
    { id: "sh3", name: "Adidas Adizero Split", brand: "Adidas", color: "#FFFFFF", accent: "#1a1a1a", length: "split" },
    { id: "sh4", name: "Adidas Own The Run 5\"", brand: "Adidas", color: "#2ECC40", accent: "#1a8a2a", length: "5in" },
    { id: "sh5", name: "Tracksmith Session 5\"", brand: "Tracksmith", color: "#85144b", accent: "#c0392b", length: "5in" },
    { id: "sh6", name: "Tracksmith Van Cortlandt", brand: "Tracksmith", color: "#001f3f", accent: "#85144b", length: "split" },
    { id: "sh7", name: "Satisfy Short Distance 3\"", brand: "Satisfy", color: "#B10DC9", accent: "#7d0990", length: "3in" },
    { id: "sh8", name: "Lululemon Fast & Free 6\"", brand: "Lululemon", color: "#1a1a1a", accent: "#39CCCC", length: "6in" },
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

/*
 ╔══════════════════════════════════════════════════════════════════════╗
 ║  RUNNING ANIMATION — SKELETAL KEYFRAMES                            ║
 ║                                                                     ║
 ║  The figure is built as an articulated skeleton:                    ║
 ║    • Each limb segment is a <g> that rotates around its joint      ║
 ║    • Child segments inherit parent rotation (hierarchical)          ║
 ║    • Gear (shoes, socks, shorts, shirt) is inside the same <g>    ║
 ║      so it moves with the body part it's attached to               ║
 ║                                                                     ║
 ║  Gait cycle (0.55s):                                               ║
 ║    0%   = left leg forward contact, right leg back toe-off         ║
 ║    25%  = left midstance, right swing-through                      ║
 ║    50%  = right forward contact, left back toe-off                 ║
 ║    75%  = right midstance, left swing-through                      ║
 ║                                                                     ║
 ║  Arms oppose legs (contralateral pattern)                          ║
 ╚══════════════════════════════════════════════════════════════════════╝
*/

const RUN_CSS = `
  @keyframes bodyBounce {
    0%, 100% { transform: translateY(0px); }
    12% { transform: translateY(-5px); }
    25% { transform: translateY(-1px); }
    37% { transform: translateY(3px); }
    50% { transform: translateY(0px); }
    62% { transform: translateY(-5px); }
    75% { transform: translateY(-1px); }
    87% { transform: translateY(3px); }
  }

  @keyframes torsoLean {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-1.5deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(1.5deg); }
  }

  /* ─── LEFT LEG: forward at 0%, back at 50% ─── */
  @keyframes lThigh {
    0%   { transform: rotate(-32deg); }
    25%  { transform: rotate(-5deg); }
    50%  { transform: rotate(38deg); }
    75%  { transform: rotate(8deg); }
    100% { transform: rotate(-32deg); }
  }
  @keyframes lShin {
    0%   { transform: rotate(45deg); }
    12%  { transform: rotate(8deg); }
    30%  { transform: rotate(0deg); }
    50%  { transform: rotate(8deg); }
    68%  { transform: rotate(90deg); }
    82%  { transform: rotate(65deg); }
    100% { transform: rotate(45deg); }
  }
  @keyframes lFoot {
    0%   { transform: rotate(12deg); }
    20%  { transform: rotate(-5deg); }
    50%  { transform: rotate(-28deg); }
    68%  { transform: rotate(18deg); }
    100% { transform: rotate(12deg); }
  }

  /* ─── RIGHT LEG: back at 0%, forward at 50% ─── */
  @keyframes rThigh {
    0%   { transform: rotate(38deg); }
    25%  { transform: rotate(8deg); }
    50%  { transform: rotate(-32deg); }
    75%  { transform: rotate(-5deg); }
    100% { transform: rotate(38deg); }
  }
  @keyframes rShin {
    0%   { transform: rotate(8deg); }
    18%  { transform: rotate(90deg); }
    32%  { transform: rotate(65deg); }
    50%  { transform: rotate(45deg); }
    62%  { transform: rotate(8deg); }
    80%  { transform: rotate(0deg); }
    100% { transform: rotate(8deg); }
  }
  @keyframes rFoot {
    0%   { transform: rotate(-28deg); }
    18%  { transform: rotate(18deg); }
    50%  { transform: rotate(12deg); }
    70%  { transform: rotate(-5deg); }
    100% { transform: rotate(-28deg); }
  }

  /* ─── LEFT ARM: opposes left leg → back at 0%, forward at 50% ─── */
  @keyframes lUArm {
    0%   { transform: rotate(32deg); }
    50%  { transform: rotate(-38deg); }
    100% { transform: rotate(32deg); }
  }
  @keyframes lFArm {
    0%   { transform: rotate(-55deg); }
    25%  { transform: rotate(-85deg); }
    50%  { transform: rotate(-65deg); }
    75%  { transform: rotate(-95deg); }
    100% { transform: rotate(-55deg); }
  }

  /* ─── RIGHT ARM: opposes right leg → forward at 0%, back at 50% ─── */
  @keyframes rUArm {
    0%   { transform: rotate(-38deg); }
    50%  { transform: rotate(32deg); }
    100% { transform: rotate(-38deg); }
  }
  @keyframes rFArm {
    0%   { transform: rotate(-65deg); }
    25%  { transform: rotate(-95deg); }
    50%  { transform: rotate(-55deg); }
    75%  { transform: rotate(-85deg); }
    100% { transform: rotate(-65deg); }
  }

  @keyframes motionDash {
    0%   { stroke-dashoffset: 0; opacity: 0.25; }
    50%  { opacity: 0.12; }
    100% { stroke-dashoffset: -24; opacity: 0.25; }
  }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  ::-webkit-scrollbar { display: none; }
`;

const CYCLE = "0.55s";
const EASE = "cubic-bezier(0.37, 0, 0.63, 1)";

// ─── ANIMATED RUNNER AVATAR ─────────────────────────────────────────────────
function RunnerAvatar({ gear, onSlotTap, activeSlot, isAnimating }) {
  const shoes = PRODUCTS.shoes.find(p => p.id === gear.shoes);
  const socks = PRODUCTS.socks.find(p => p.id === gear.socks);
  const shorts = PRODUCTS.shorts.find(p => p.id === gear.shorts);
  const shirt = PRODUCTS.shirts.find(p => p.id === gear.shirts);
  const hat = PRODUCTS.hats.find(p => p.id === gear.hats);
  const sg = PRODUCTS.sunglasses.find(p => p.id === gear.sunglasses);

  const a = (name, dur) => isAnimating ? `${name} ${dur || CYCLE} ${EASE} infinite` : "none";

  const glow = (cat) => activeSlot === cat
    ? "drop-shadow(0 0 6px rgba(199,92,58,0.9)) drop-shadow(0 0 14px rgba(199,92,58,0.4))" : "none";

  const ink = { fill: "none", stroke: "#000000", strokeWidth: 2.8, strokeLinecap: "round", strokeLinejoin: "round" };

  // Helper: draw a thick limb segment (rounded rect along a line)
  const Limb = ({ x, y1, y2, w, filter: f }) => (
    <rect x={x - w/2} y={y1} width={w} height={y2 - y1} rx={w/2} ry={w/2}
      fill="#000000" stroke="none" filter={f} />
  );

  // Pivot points (in SVG coords): hip=75,0  shoulders=75,-120  head=75,-158

  const LegWithGear = ({ side, thighAnim, shinAnim, footAnim, xOff, zThick }) => {
    const hipX = 75 + xOff;
    const limbW = zThick * 3.2; // width of the limb shape
    return (
      <g style={{ transformOrigin: `${hipX}px 0px`, animation: a(thighAnim) }}>
        {/* Thigh — thick black bar */}
        <Limb x={hipX} y1={-2} y2={72} w={limbW} filter="url(#pencilF)" />
        {/* Shorts piece on thigh */}
        <g onClick={() => onSlotTap("shorts")} style={{ cursor: "pointer" }}>
          <path d={`M ${hipX-8} -2 L ${hipX-11} 38 Q ${hipX-5} 41 ${hipX} 41 Q ${hipX+5} 41 ${hipX+11} 38 L ${hipX+8} -2 Z`}
            fill={shorts?.color} stroke={shorts?.accent} strokeWidth="1.2" opacity="0.88" />
        </g>

        {/* Shin pivot at knee */}
        <g style={{ transformOrigin: `${hipX}px 70px`, animation: a(shinAnim) }}>
          {/* Shin — thick black bar */}
          <Limb x={hipX} y1={68} y2={142} w={limbW * 0.9} filter="url(#pencilF)" />

          {/* Sock */}
          <g onClick={() => onSlotTap("socks")} style={{ cursor: "pointer", filter: glow("socks") }}>
            <path d={`M ${hipX-6} 115 L ${hipX-6} 141 Q ${hipX-2} 145 ${hipX} 145 Q ${hipX+2} 145 ${hipX+6} 141 L ${hipX+6} 115`}
              fill={socks?.color} stroke={socks?.accent} strokeWidth="1" opacity="0.9" />
            {socks?.pattern === "stripe" && <>
              <line x1={hipX-6} y1={122} x2={hipX+6} y2={122} stroke={socks?.accent} strokeWidth="1.5" />
              <line x1={hipX-6} y1={128} x2={hipX+6} y2={128} stroke={socks?.accent} strokeWidth="1.5" />
            </>}
          </g>

          {/* Foot pivot at ankle */}
          <g style={{ transformOrigin: `${hipX}px 140px`, animation: a(footAnim) }}>
            {/* Foot — black wedge shape */}
            <path d={`M ${hipX-4} 136 L ${hipX-4} 148 L ${hipX+30} 150 Q ${hipX+32} 146 ${hipX+30} 142 L ${hipX+4} 136 Z`}
              fill="#000000" filter="url(#pencilF)" />
            {/* Shoe sticker */}
            <g onClick={() => onSlotTap("shoes")} style={{ cursor: "pointer", filter: glow("shoes") }}>
              <path d={`M ${hipX-6} 135 L ${hipX-8} 150 L ${hipX+34} 154 L ${hipX+36} 144 L ${hipX+4} 135 Z`}
                fill={shoes?.color} stroke={shoes?.accent} strokeWidth="1.6" opacity="0.92" />
              <line x1={hipX-4} y1={148} x2={hipX+31} y2={152} stroke="#fff" strokeWidth="0.8" opacity="0.3" />
              <text x={hipX+14} y={151} textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold" opacity="0.65">
                {shoes?.brand?.split(" ")[0]}
              </text>
            </g>
          </g>
        </g>
      </g>
    );
  };

  const ArmSegment = ({ xBase, upperAnim, foreAnim, zThick }) => {
    const limbW = zThick * 2.8;
    return (
      <g style={{ transformOrigin: `${xBase}px -115px`, animation: a(upperAnim) }}>
        {/* Upper arm — thick black bar */}
        <Limb x={xBase} y1={-117} y2={-63} w={limbW} filter="url(#pencilF)" />
        <g style={{ transformOrigin: `${xBase}px -65px`, animation: a(foreAnim) }}>
          {/* Forearm — thick black bar */}
          <Limb x={xBase} y1={-67} y2={-18} w={limbW * 0.85} filter="url(#pencilF)" />
          {/* Hand — filled black circle */}
          <circle cx={xBase} cy={-16} r={5} fill="#000000" filter="url(#pencilF)" />
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

      {/* ── Whole body vertical bounce ── */}
      <g style={{ animation: a("bodyBounce"), transformOrigin: "75px 0px" }}>
        {/* ── Torso lean/twist ── */}
        <g style={{ animation: a("torsoLean"), transformOrigin: "75px -60px" }}>

          {/* ═══ LAYER 1 (back): right leg, left arm ═══ */}
          <LegWithGear side="right" thighAnim="rThigh" shinAnim="rShin" footAnim="rFoot" xOff={10} zThick={2.4} />
          <ArmSegment xBase={55} upperAnim="lUArm" foreAnim="lFArm" zThick={2.2} />

          {/* ═══ LAYER 2: TORSO + SHIRT + SHORTS BODY ═══ */}
          <g onClick={() => onSlotTap("shirts")} style={{ cursor: "pointer", filter: glow("shirts") }}>
            {/* Torso — solid black body shape */}
            <path d="M 55 -120 L 50 -10 Q 60 5 75 5 Q 90 5 100 -10 L 95 -120 Z"
              fill="#000000" stroke="none" filter="url(#pencilF)" />
            {/* Shirt fill on top */}
            <path d="M 56 -118 L 51 -10 Q 61 4 75 4 Q 89 4 99 -10 L 94 -118 Z"
              fill={shirt?.color} stroke={shirt?.accent} strokeWidth="1" opacity="0.9" />
            {shirt?.type === "singlet" ? <>
              <path d="M 62 -118 L 62 -105 Q 68 -98 75 -100 Q 70 -108 66 -118" fill={shirt?.accent} opacity="0.25" />
              <path d="M 88 -118 L 88 -105 Q 82 -98 75 -100 Q 80 -108 84 -118" fill={shirt?.accent} opacity="0.25" />
            </> : <>
              <path d="M 56 -118 Q 42 -112 38 -98 L 50 -94 Q 51 -106 55 -112" fill={shirt?.color} stroke={shirt?.accent} strokeWidth="0.8" opacity="0.87" />
              <path d="M 94 -118 Q 108 -112 112 -98 L 100 -94 Q 99 -106 95 -112" fill={shirt?.color} stroke={shirt?.accent} strokeWidth="0.8" opacity="0.87" />
            </>}
            <text x="75" y="-52" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold" opacity="0.4">
              {shirt?.brand}
            </text>
          </g>

          {/* Shorts waist area */}
          <g onClick={() => onSlotTap("shorts")} style={{ cursor: "pointer", filter: glow("shorts") }}>
            <path d="M 52 -12 L 48 28 Q 60 34 75 34 Q 90 34 102 28 L 98 -12 Z"
              fill={shorts?.color} stroke={shorts?.accent} strokeWidth="1.2" opacity="0.88" />
            <line x1="75" y1="-8" x2="75" y2="30" stroke={shorts?.accent} strokeWidth="0.8" opacity="0.3" />
            <text x="75" y="14" textAnchor="middle" fontSize="6" fill={shorts?.accent} fontWeight="bold" opacity="0.4">
              {shorts?.brand}
            </text>
          </g>

          {/* ═══ LAYER 3 (front): left leg, right arm ═══ */}
          <LegWithGear side="left" thighAnim="lThigh" shinAnim="lShin" footAnim="lFoot" xOff={-10} zThick={3} />
          <ArmSegment xBase={95} upperAnim="rUArm" foreAnim="rFArm" zThick={2.8} />

          {/* ═══ HEAD + ACCESSORIES ═══ */}
          <g>
            {/* Neck — thick black */}
            <rect x="69" y="-133" width="12" height="15" rx="6" fill="#000000" filter="url(#pencilF)" />
            {/* Head — filled black oval */}
            <ellipse cx="75" cy="-158" rx="23" ry="28" fill="#000000" filter="url(#pencilF)" />
            {/* Eyes — white on black */}
            <circle cx="67" cy="-162" r="2.5" fill="#ffffff" />
            <circle cx="83" cy="-162" r="2.5" fill="#ffffff" />
            <circle cx="67.8" cy="-161.5" r="1.2" fill="#000000" />
            <circle cx="83.8" cy="-161.5" r="1.2" fill="#000000" />
            {/* Smile */}
            <path d="M 69 -150 Q 75 -144 81 -150" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            {/* Ears */}
            <ellipse cx="51" cy="-158" rx="5" ry="7" fill="#000000" filter="url(#pencilF)" />
            <ellipse cx="99" cy="-158" rx="5" ry="7" fill="#000000" filter="url(#pencilF)" />

            {/* ── HAT ── */}
            <g onClick={() => onSlotTap("hats")} style={{ cursor: "pointer", filter: glow("hats") }}>
              {!hat?.isEmpty && <>
                <ellipse cx="75" cy="-180" rx="28" ry="7" fill={hat?.color} stroke="#333" strokeWidth="1.2" opacity="0.92" />
                <path d="M 50 -180 Q 50 -200 75 -205 Q 100 -200 100 -180" fill={hat?.color} stroke="#333" strokeWidth="1.2" />
                <ellipse cx="75" cy="-180" rx="33" ry="5.5" fill={hat?.accent} opacity="0.55" />
                <text x="75" y="-190" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="bold" opacity="0.65">
                  {hat?.brand}
                </text>
              </>}
              <rect x="42" y="-212" width="66" height="42" fill="transparent" />
            </g>

            {/* ── SUNGLASSES ── */}
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

        </g>{/* end torso lean */}

        {/* ── MOTION LINES ── */}
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

      </g>{/* end body bounce */}
    </svg>
  );
}


// ─── PRODUCT CARD ───────────────────────────────────────────────────────────
function ProductCard({ product, category, isSelected, onSelect }) {
  if (product.isEmpty) {
    return (
      <div onClick={onSelect} style={{
        width: 88, minHeight: 96, borderRadius: 14, border: isSelected ? "2.5px solid #c75c3a" : "2px dashed #c0a0a0",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: isSelected ? "rgba(199,92,58,0.08)" : "rgba(255,255,255,0.5)",
        cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
      }}>
        <span style={{ fontSize: 22, opacity: 0.4 }}>✕</span>
        <span style={{ fontSize: 10, color: "#b09090", marginTop: 4 }}>None</span>
      </div>
    );
  }
  const mainColor = product.color || product.lensColor || "#666";
  return (
    <div onClick={onSelect} style={{
      width: 88, minHeight: 96, borderRadius: 14,
      border: isSelected ? "2.5px solid #c75c3a" : "2px solid rgba(0,0,0,0.08)",
      background: isSelected
        ? "linear-gradient(135deg, rgba(199,92,58,0.12), rgba(199,92,58,0.04))"
        : "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))",
      cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column",
      alignItems: "center", padding: "8px 4px", gap: 4, flexShrink: 0,
      boxShadow: isSelected ? "0 0 12px rgba(199,92,58,0.2)" : "0 2px 6px rgba(0,0,0,0.08)",
    }}>
      <div style={{
        width: 52, height: 36, borderRadius: 8,
        background: `linear-gradient(135deg, ${mainColor}, ${product.accent || mainColor})`,
        boxShadow: `0 2px 8px ${mainColor}44`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 20, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>
          {CAT_ICONS[category]}
        </span>
      </div>
      <span style={{
        fontSize: 9, color: "#6b5050", textAlign: "center", lineHeight: 1.2,
        maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis",
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
      }}>
        {product.name}
      </span>
      {product.brand && (
        <span style={{ fontSize: 8, color: "#a08080", fontWeight: 600, letterSpacing: 0.5 }}>
          {product.brand.toUpperCase()}
        </span>
      )}
    </div>
  );
}


// ─── GEAR DRAWER ────────────────────────────────────────────────────────────
function GearDrawer({ category, gear, onSelect, onClose }) {
  const products = PRODUCTS[category] || [];
  const currentId = gear[category];
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "linear-gradient(to top, #f2dad2 0%, #fce8e2 100%)",
      borderRadius: "24px 24px 0 0", padding: "16px 0 32px",
      boxShadow: "0 -8px 32px rgba(0,0,0,0.12)",
      zIndex: 100, maxHeight: "55vh", overflowY: "auto",
      animation: "slideUp 0.3s ease-out",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px 12px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div>
          <span style={{ fontSize: 20, marginRight: 8 }}>{CAT_ICONS[category]}</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#3d2c2c", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>
            {CAT_LABELS[category]?.toUpperCase()}
          </span>
        </div>
        <button onClick={onClose} style={{
          background: "rgba(0,0,0,0.06)", border: "none", color: "#3d2c2c",
          width: 32, height: 32, borderRadius: 16, fontSize: 16, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>✕</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: "16px 16px 8px", justifyContent: "center" }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} category={category}
            isSelected={currentId === p.id} onSelect={() => onSelect(category, p.id)} />
        ))}
      </div>
    </div>
  );
}


// ─── CATEGORY BAR ───────────────────────────────────────────────────────────
function CategoryBar({ activeSlot, onSlotTap }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: "8px 8px", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
      {CATEGORIES.map(cat => (
        <button key={cat} onClick={() => onSlotTap(cat)} style={{
          flex: "0 0 auto", padding: "8px 14px", borderRadius: 20,
          border: activeSlot === cat ? "2px solid #c75c3a" : "2px solid transparent",
          background: activeSlot === cat ? "rgba(199,92,58,0.12)" : "rgba(0,0,0,0.04)",
          color: activeSlot === cat ? "#c75c3a" : "#8a6b6b",
          fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
          display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <span style={{ fontSize: 16 }}>{CAT_ICONS[cat]}</span>
          {CAT_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}


// ─── UPLOAD SCREEN ──────────────────────────────────────────────────────────
function UploadScreen({ onStart, onSkip }) {
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div style={{
      minHeight: "100dvh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: 24,
      background: "linear-gradient(160deg, #f5e6e0 0%, #fce4dc 40%, #fdf0ec 100%)",
      textAlign: "center",
    }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: "#c75c3a", letterSpacing: 4, margin: 0, lineHeight: 1 }}>RACE READY</h1>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: "#d4887a", margin: "4px 0 0", letterSpacing: 1 }}>dress your runner self</p>
      </div>
      {!preview ? <>
        <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => fileRef.current?.click()}
          style={{
            width: "100%", maxWidth: 280, height: 280, borderRadius: 24,
            border: `3px dashed ${dragOver ? "#c75c3a" : "rgba(0,0,0,0.12)"}`,
            background: dragOver ? "rgba(199,92,58,0.08)" : "rgba(0,0,0,0.03)",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", cursor: "pointer", transition: "all 0.3s",
          }}>
          <span style={{ fontSize: 48, marginBottom: 12 }}>📸</span>
          <span style={{ color: "#8a6b6b", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Upload a running photo</span>
          <span style={{ color: "#b09090", fontSize: 12, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>or tap to browse</span>
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files?.[0])} />
        <button onClick={onSkip} style={{
          marginTop: 24, padding: "12px 32px", borderRadius: 24,
          background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)",
          color: "#8a6b6b", fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
        }}>Skip → use default avatar</button>
      </> : <>
        <div style={{
          width: 200, height: 200, borderRadius: 24, overflow: "hidden",
          border: "3px solid #c75c3a", boxShadow: "0 0 24px rgba(199,92,58,0.2)",
        }}>
          <img src={preview} alt="Your photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <p style={{ color: "#b09090", fontSize: 12, marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>
          🎨 In V2, this becomes your cartoon avatar!
        </p>
        <button onClick={() => onStart(preview)} style={{
          marginTop: 16, padding: "14px 40px", borderRadius: 28,
          background: "linear-gradient(135deg, #c75c3a, #e07a5a)",
          border: "none", color: "#fff", fontSize: 16, fontWeight: 700,
          cursor: "pointer", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2,
          boxShadow: "0 4px 16px rgba(199,92,58,0.3)",
        }}>GEAR UP →</button>
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
  const [gear, setGear] = useState({
    shoes: "s1", socks: "sk1", shorts: "sh1",
    shirts: "t1", hats: "h1", sunglasses: "g1",
  });

  const handleStart = (p) => { setPhoto(p); setScreen("editor"); };
  const handleSkip = () => setScreen("editor");
  const handleGearChange = (cat, id) => setGear(prev => ({ ...prev, [cat]: id }));
  const handleSlotTap = (cat) => setActiveSlot(prev => prev === cat ? null : cat);
  const randomize = () => {
    const g = {};
    CATEGORIES.forEach(cat => {
      const items = PRODUCTS[cat];
      g[cat] = items[Math.floor(Math.random() * items.length)].id;
    });
    setGear(g);
  };

  if (screen === "upload") {
    return <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@400;600&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{RUN_CSS}</style>
      <UploadScreen onStart={handleStart} onSkip={handleSkip} />
    </>;
  }

  return <>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@400;600&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>{RUN_CSS}</style>
    <div style={{
      minHeight: "100dvh",
      background: "linear-gradient(175deg, #fdf6f0 0%, #f8e8de 35%, #f2d5c4 65%, #e8c2ae 100%)",
      color: "#3d2c2c", fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column",
      paddingBottom: activeSlot ? "55vh" : 0,
      transition: "padding-bottom 0.3s ease",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 4px" }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#c75c3a", letterSpacing: 3, margin: 0, lineHeight: 1 }}>
          RACE READY
        </h1>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setIsAnimating(v => !v)} style={{
            background: isAnimating ? "rgba(199,92,58,0.12)" : "rgba(0,0,0,0.04)",
            border: isAnimating ? "1px solid rgba(199,92,58,0.3)" : "1px solid rgba(0,0,0,0.1)",
            color: isAnimating ? "#c75c3a" : "#999",
            padding: "6px 12px", borderRadius: 16, fontSize: 12, fontWeight: 600,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
          }}>
            {isAnimating ? "⏸ Pause" : "▶ Run"}
          </button>
          <button onClick={randomize} style={{
            background: "rgba(199,92,58,0.1)", border: "1px solid rgba(199,92,58,0.25)",
            color: "#c75c3a", padding: "6px 12px", borderRadius: 16,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>
            🎲 Shuffle
          </button>
        </div>
      </div>

      <CategoryBar activeSlot={activeSlot} onSlotTap={handleSlotTap} />

      {/* Avatar */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 16px 8px", position: "relative",
      }}>
        {photo && (
          <div style={{
            position: "absolute", top: 8, right: 16,
            width: 44, height: 44, borderRadius: 12, overflow: "hidden",
            border: "2px solid rgba(0,0,0,0.1)", opacity: 0.6,
          }}>
            <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <div style={{ width: "100%", maxWidth: 340 }}>
          <RunnerAvatar gear={gear} onSlotTap={handleSlotTap} activeSlot={activeSlot} isAnimating={isAnimating} />
        </div>
      </div>

      {/* Outfit summary */}
      <div style={{ display: "flex", gap: 6, padding: "0 12px 12px", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {CATEGORIES.map(cat => {
          const product = PRODUCTS[cat].find(p => p.id === gear[cat]);
          if (product?.isEmpty) return null;
          return (
            <div key={cat} onClick={() => handleSlotTap(cat)} style={{
              flex: "0 0 auto", padding: "6px 10px", borderRadius: 12,
              background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.08)",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: 4,
                background: `linear-gradient(135deg, ${product?.color}, ${product?.accent || product?.color})`,
              }} />
              <span style={{ fontSize: 10, color: "#6b5050", whiteSpace: "nowrap" }}>
                {product?.name?.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
          );
        })}
      </div>

      {!activeSlot && (
        <div style={{ textAlign: "center", padding: "0 0 20px", color: "#c0a0a0", fontSize: 12, fontFamily: "'Caveat', cursive" }}>
          tap on gear or categories to customize ↑
        </div>
      )}

      {activeSlot && <>
        <div onClick={() => setActiveSlot(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 99 }} />
        <GearDrawer category={activeSlot} gear={gear} onSelect={handleGearChange} onClose={() => setActiveSlot(null)} />
      </>}
    </div>
  </>;
}
