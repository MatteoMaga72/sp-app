"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// --- Types ---
interface Particle {
  x: number;
  y: number;
  progress: number;
  speed: number;
  size: number;
  opacity: number;
  pathIndex: number;
  color: string;
  trail: { x: number; y: number; opacity: number }[];
  flash: number; // 0 = no flash, >0 = flash intensity
}

interface Appliance {
  id: string;
  name: string;
  emoji: string;
  kwh: number;
  color: string;
  glowColor: string;
  x: number;
  y: number;
  pulsePhase: number;
}

// --- Helpers ---
function getBezierPoint(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
) {
  const mt = 1 - t;
  return {
    x:
      mt * mt * mt * p0.x +
      3 * mt * mt * t * p1.x +
      3 * mt * t * t * p2.x +
      t * t * t * p3.x,
    y:
      mt * mt * mt * p0.y +
      3 * mt * mt * t * p1.y +
      3 * mt * t * t * p2.y +
      t * t * t * p3.y,
  };
}

const APPLIANCES_DATA: Omit<Appliance, "x" | "y" | "pulsePhase">[] = [
  { id: "ac", name: "Air Conditioning", emoji: "\ud83c\udf21\ufe0f", kwh: 8.5, color: "#FF8A65", glowColor: "rgba(255,138,101,0.4)" },
  { id: "lighting", name: "Lighting", emoji: "\ud83d\udca1", kwh: 2.1, color: "#FFD54F", glowColor: "rgba(255,213,79,0.4)" },
  { id: "fridge", name: "Refrigerator", emoji: "\ud83e\uddca", kwh: 3.2, color: "#4FC3F7", glowColor: "rgba(79,195,247,0.4)" },
  { id: "heater", name: "Water Heater", emoji: "\ud83d\udebf", kwh: 4.8, color: "#FF7043", glowColor: "rgba(255,112,67,0.4)" },
  { id: "electronics", name: "Electronics", emoji: "\ud83d\udcfa", kwh: 1.4, color: "#BA68C8", glowColor: "rgba(186,104,200,0.4)" },
];

const TOTAL_KWH = APPLIANCES_DATA.reduce((s, a) => s + a.kwh, 0);
const RATE = 0.2391;

export default function EnergyFlowPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const selectedRef = useRef<string | null>(null);
  const timeRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const [selectedAppliance, setSelectedAppliance] = useState<string | null>(null);
  const [currentKW, setCurrentKW] = useState(2.1);

  // Sync ref with state for canvas reads
  useEffect(() => {
    selectedRef.current = selectedAppliance;
  }, [selectedAppliance]);

  const getAppliances = useCallback((w: number, h: number): Appliance[] => {
    const cx = w / 2;
    const cy = h * 0.42;
    return [
      { ...APPLIANCES_DATA[0], x: cx + 120, y: cy - 80, pulsePhase: 0 },
      { ...APPLIANCES_DATA[1], x: cx + 140, y: cy + 20, pulsePhase: 1.2 },
      { ...APPLIANCES_DATA[2], x: cx + 100, y: cy + 110, pulsePhase: 2.4 },
      { ...APPLIANCES_DATA[3], x: cx - 100, y: cy + 110, pulsePhase: 3.6 },
      { ...APPLIANCES_DATA[4], x: cx - 140, y: cy + 20, pulsePhase: 4.8 },
    ];
  }, []);

  const getPaths = useCallback(
    (w: number, h: number) => {
      const gridX = 40;
      const gridY = h * 0.22;
      const houseX = w / 2;
      const houseY = h * 0.38;
      const appliances = getAppliances(w, h);

      // Path from grid to house
      const gridToHouse = {
        p0: { x: gridX, y: gridY },
        p1: { x: gridX + 60, y: gridY - 30 },
        p2: { x: houseX - 80, y: houseY - 20 },
        p3: { x: houseX, y: houseY },
      };

      // Paths from house to each appliance
      const houseToAppliance = appliances.map((a) => ({
        p0: { x: houseX, y: houseY },
        p1: { x: houseX + (a.x - houseX) * 0.3, y: houseY + (a.y - houseY) * 0.1 },
        p2: { x: houseX + (a.x - houseX) * 0.7, y: a.y - (a.y - houseY) * 0.1 },
        p3: { x: a.x, y: a.y },
      }));

      return { gridToHouse, houseToAppliance };
    },
    [getAppliances]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // HiDPI support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    const appliances = getAppliances(W, H);
    const paths = getPaths(W, H);
    const isDark = document.documentElement.classList.contains("dark");

    function spawnParticle(pathIndex: number, isGrid: boolean) {
      const speedBase = isGrid ? 0.006 : 0.004;
      const speedVar = isGrid ? 0.003 : 0.002;
      // Color based on destination appliance
      let color = "#00BFA5";
      if (!isGrid && pathIndex >= 0 && pathIndex < appliances.length) {
        color = appliances[pathIndex].color;
      }
      const p: Particle = {
        x: 0,
        y: 0,
        progress: 0,
        speed: speedBase + Math.random() * speedVar,
        size: 2 + Math.random() * 3,
        opacity: 0.8 + Math.random() * 0.2,
        pathIndex,
        color,
        trail: [],
        flash: 0,
      };
      particlesRef.current.push(p);
    }

    function drawPylon(ctx: CanvasRenderingContext2D, x: number, y: number) {
      ctx.save();
      ctx.strokeStyle = isDark ? "#4DB6AC" : "#00897B";
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      // Tower legs
      ctx.beginPath();
      ctx.moveTo(x - 14, y + 30);
      ctx.lineTo(x - 5, y - 10);
      ctx.lineTo(x + 5, y - 10);
      ctx.lineTo(x + 14, y + 30);
      ctx.stroke();
      // Cross bars
      ctx.beginPath();
      ctx.moveTo(x - 8, y + 10);
      ctx.lineTo(x + 8, y + 10);
      ctx.moveTo(x - 10, y + 20);
      ctx.lineTo(x + 10, y + 20);
      ctx.stroke();
      // Arms
      ctx.beginPath();
      ctx.moveTo(x - 20, y - 5);
      ctx.lineTo(x + 20, y - 5);
      ctx.moveTo(x - 16, y - 12);
      ctx.lineTo(x + 16, y - 12);
      ctx.stroke();
      // Top
      ctx.beginPath();
      ctx.moveTo(x, y - 22);
      ctx.lineTo(x - 3, y - 12);
      ctx.moveTo(x, y - 22);
      ctx.lineTo(x + 3, y - 12);
      ctx.stroke();
      // Wires hanging
      ctx.strokeStyle = isDark ? "rgba(77,182,172,0.5)" : "rgba(0,137,123,0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - 20, y - 5);
      ctx.quadraticCurveTo(x - 25, y + 5, x - 20, y + 2);
      ctx.moveTo(x + 20, y - 5);
      ctx.quadraticCurveTo(x + 25, y + 5, x + 20, y + 2);
      ctx.stroke();
      ctx.restore();
    }

    function drawHouse(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      time: number
    ) {
      ctx.save();
      const scale = 1 + Math.sin(time * 0.8) * 0.005;
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);

      const bw = 60;
      const bh = 45;
      const roofH = 35;

      // House body
      const bodyGrad = ctx.createLinearGradient(cx - bw, cy - roofH, cx + bw, cy + bh);
      if (isDark) {
        bodyGrad.addColorStop(0, "#1a3a38");
        bodyGrad.addColorStop(1, "#0d2624");
      } else {
        bodyGrad.addColorStop(0, "#E0F7FA");
        bodyGrad.addColorStop(1, "#B2DFDB");
      }
      ctx.fillStyle = bodyGrad;

      // Body rect
      ctx.beginPath();
      ctx.rect(cx - bw, cy, bw * 2, bh);
      ctx.fill();

      // Roof
      ctx.beginPath();
      ctx.moveTo(cx - bw - 10, cy);
      ctx.lineTo(cx, cy - roofH);
      ctx.lineTo(cx + bw + 10, cy);
      ctx.closePath();
      ctx.fillStyle = isDark ? "#00897B" : "#00BFA5";
      ctx.fill();

      // Door
      ctx.fillStyle = isDark ? "#004D40" : "#00897B";
      ctx.fillRect(cx - 10, cy + 15, 20, 30);
      // Doorknob
      ctx.beginPath();
      ctx.arc(cx + 6, cy + 30, 2, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "#FFD54F" : "#FFC107";
      ctx.fill();

      // Windows
      ctx.fillStyle = isDark
        ? `rgba(255,213,79,${0.3 + Math.sin(time * 1.5) * 0.15})`
        : `rgba(255,235,59,${0.4 + Math.sin(time * 1.5) * 0.2})`;
      ctx.fillRect(cx - bw + 12, cy + 8, 18, 14);
      ctx.fillRect(cx + bw - 30, cy + 8, 18, 14);

      // Window frames
      ctx.strokeStyle = isDark ? "#00695C" : "#009688";
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - bw + 12, cy + 8, 18, 14);
      ctx.strokeRect(cx + bw - 30, cy + 8, 18, 14);

      // Outline
      ctx.strokeStyle = isDark ? "#26A69A" : "#009688";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.rect(cx - bw, cy, bw * 2, bh);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - bw - 10, cy);
      ctx.lineTo(cx, cy - roofH);
      ctx.lineTo(cx + bw + 10, cy);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }

    function drawApplianceNode(
      ctx: CanvasRenderingContext2D,
      a: Appliance,
      time: number,
      isSelected: boolean
    ) {
      ctx.save();
      const pulse = 1 + Math.sin(time * 2 + a.pulsePhase) * 0.06 * (a.kwh / TOTAL_KWH) * 5;
      const r = 25 * pulse;

      // Selection ring
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(a.x, a.y, r + 8 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = "#00BFA5";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -time * 30;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Glow
      ctx.beginPath();
      ctx.arc(a.x, a.y, r + 6, 0, Math.PI * 2);
      ctx.fillStyle = a.glowColor;
      ctx.fill();

      // Circle bg
      ctx.beginPath();
      ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(30,40,50,0.9)" : "rgba(255,255,255,0.95)";
      ctx.fill();
      ctx.strokeStyle = a.color;
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.stroke();

      // Emoji
      ctx.font = "18px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(a.emoji, a.x, a.y - 1);

      // kWh label
      ctx.font = "bold 9px Arial";
      ctx.fillStyle = isDark ? "#ccc" : "#555";
      ctx.fillText(`${a.kwh} kWh`, a.x, a.y + r + 14);

      ctx.restore();
    }

    function drawEnergyLine(
      ctx: CanvasRenderingContext2D,
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number },
      color: string
    ) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.25;
      ctx.stroke();
      ctx.restore();
    }

    function animate(timestamp: number) {
      const dt = Math.min((timestamp - timeRef.current) / 1000, 0.05);
      timeRef.current = timestamp;
      spawnTimerRef.current += dt;

      const time = timestamp / 1000;

      // Update current kW reading with oscillation
      const kw = 2.1 + Math.sin(time * 0.3) * 0.2 + Math.sin(time * 0.7) * 0.1 + Math.sin(time * 1.1) * 0.05;
      setCurrentKW(parseFloat(kw.toFixed(2)));

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      if (isDark) {
        bgGrad.addColorStop(0, "#0a1a1f");
        bgGrad.addColorStop(1, "#0f2a2d");
      } else {
        bgGrad.addColorStop(0, "#f0faf9");
        bgGrad.addColorStop(1, "#e6f5f3");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Draw energy lines
      const { gridToHouse, houseToAppliance } = paths;
      drawEnergyLine(ctx, gridToHouse.p0, gridToHouse.p1, gridToHouse.p2, gridToHouse.p3, isDark ? "#26A69A" : "#80CBC4");
      houseToAppliance.forEach((p, i) => {
        drawEnergyLine(ctx, p.p0, p.p1, p.p2, p.p3, appliances[i].color);
      });

      // Draw pylon
      drawPylon(ctx, 40, H * 0.22);

      // Label under pylon
      ctx.save();
      ctx.font = "bold 8px Arial";
      ctx.fillStyle = isDark ? "#4DB6AC" : "#00897B";
      ctx.textAlign = "center";
      ctx.fillText("POWER GRID", 40, H * 0.22 + 44);
      ctx.restore();

      // Draw house
      drawHouse(ctx, W / 2, H * 0.38, time);

      // Draw appliance nodes
      const sel = selectedRef.current;
      appliances.forEach((a) => {
        drawApplianceNode(ctx, a, time, sel === a.id);
      });

      // Spawn particles
      if (spawnTimerRef.current > 0.12) {
        spawnTimerRef.current = 0;
        // Grid to house particle
        spawnParticle(-1, true);
        // House to appliance particles based on consumption weight
        appliances.forEach((a, i) => {
          const rate = a.kwh / TOTAL_KWH;
          const boosted = sel === a.id ? rate * 2.5 : rate;
          if (Math.random() < boosted * 2.5) {
            spawnParticle(i, false);
          }
        });
      }

      // Update and draw particles
      const alive: Particle[] = [];
      for (const p of particlesRef.current) {
        p.progress += p.speed;

        // Store trail
        p.trail.unshift({ x: p.x, y: p.y, opacity: p.opacity });
        if (p.trail.length > 5) p.trail.pop();

        let pos: { x: number; y: number };
        if (p.pathIndex === -1) {
          pos = getBezierPoint(
            Math.min(p.progress, 1),
            gridToHouse.p0,
            gridToHouse.p1,
            gridToHouse.p2,
            gridToHouse.p3
          );
        } else {
          const path = houseToAppliance[p.pathIndex];
          pos = getBezierPoint(
            Math.min(p.progress, 1),
            path.p0,
            path.p1,
            path.p2,
            path.p3
          );
        }
        p.x = pos.x;
        p.y = pos.y;

        if (p.progress >= 1) {
          // Flash effect at destination
          p.flash = 1;
          // Draw flash
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
          ctx.fillStyle =
            p.pathIndex === -1
              ? "rgba(0,191,165,0.4)"
              : appliances[p.pathIndex]
              ? appliances[p.pathIndex].glowColor
              : "rgba(0,191,165,0.4)";
          ctx.fill();
          ctx.restore();
          continue; // Remove particle
        }

        // Draw trail
        for (let t = 1; t < p.trail.length; t++) {
          const tp = p.trail[t];
          ctx.save();
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, p.size * (1 - t * 0.18), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * (1 - t * 0.22);
          ctx.fill();
          ctx.restore();
        }

        // Draw particle with glow
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.restore();

        alive.push(p);
      }
      particlesRef.current = alive;

      // Draw real-time readings at top
      ctx.save();
      ctx.font = "bold 13px Arial";
      ctx.fillStyle = isDark ? "#B2DFDB" : "#00695C";
      ctx.textAlign = "center";
      const kwVal = kw.toFixed(1);
      ctx.fillText(`Currently using: ${kwVal} kW`, W / 2, 28);

      ctx.font = "11px Arial";
      ctx.fillStyle = isDark ? "#80CBC4" : "#00897B";
      const cost = (kw * RATE).toFixed(2);
      ctx.fillText(`$${cost}/hr`, W / 2, 46);
      ctx.restore();

      animRef.current = requestAnimationFrame(animate);
    }

    // Click handler
    function handleClick(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found: string | null = null;
      for (const a of appliances) {
        const dx = mx - a.x;
        const dy = my - a.y;
        if (dx * dx + dy * dy < 35 * 35) {
          found = a.id;
          break;
        }
      }
      setSelectedAppliance((prev) => (prev === found ? null : found));
    }

    canvas.addEventListener("click", handleClick);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("click", handleClick);
    };
  }, [getAppliances, getPaths]);

  const costPerHour = currentKW * RATE;

  return (
    <div className="bg-sp-gray min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 px-4 pt-12 pb-3 flex items-center gap-3">
        <Link href="/" className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <ArrowLeft className="w-5 h-5 text-sp-dark" />
        </Link>
        <h1 className="text-lg font-bold text-sp-dark">Live Energy Flow</h1>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-xs text-green-600 dark:text-green-400 font-medium">Live</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="mx-4 mt-3 rounded-2xl overflow-hidden shadow-sm dark:shadow-gray-900/30">
        <canvas
          ref={canvasRef}
          className="w-full bg-white dark:bg-gray-900"
          style={{ height: 500, width: "100%" }}
        />
      </div>

      {/* Appliance Cards - horizontal scroll */}
      <div className="mt-3 px-4">
        <h3 className="text-sm font-semibold text-sp-dark mb-2">Appliances</h3>
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {APPLIANCES_DATA.map((a) => {
            const pct = ((a.kwh / TOTAL_KWH) * 100).toFixed(0);
            const costHr = (a.kwh / 24 * RATE).toFixed(2);
            const isSelected = selectedAppliance === a.id;
            return (
              <button
                key={a.id}
                onClick={() =>
                  setSelectedAppliance((prev) => (prev === a.id ? null : a.id))
                }
                className={`flex-shrink-0 w-[120px] rounded-xl p-3 text-left transition-all press-effect ${
                  isSelected
                    ? "ring-2 ring-sp-teal bg-white dark:bg-gray-800 shadow-md"
                    : "bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/30"
                }`}
              >
                <div className="text-xl mb-1">{a.emoji}</div>
                <p className="text-xs font-semibold text-sp-dark leading-tight">{a.name}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  {a.kwh} kWh/day
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: a.color + "22",
                      color: a.color,
                    }}
                  >
                    {pct}%
                  </span>
                  <span className="text-[10px] text-gray-400">${costHr}/hr</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-4 mt-3 pb-24 space-y-3">
        {/* Daily total and projected */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm dark:shadow-gray-900/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Daily total</p>
              <p className="text-xl font-bold text-sp-dark">{TOTAL_KWH.toFixed(1)} kWh</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">Current rate</p>
              <p className="text-lg font-bold text-sp-teal">
                ${costPerHour.toFixed(2)}/hr
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Projected monthly cost
              </span>
              <span className="text-sm font-bold text-sp-dark">$143.70</span>
            </div>
          </div>
        </div>

        {/* Tip card */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4">
          <div className="flex gap-2">
            <span className="text-lg flex-shrink-0">💡</span>
            <div>
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                Energy Saving Tip
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 leading-relaxed">
                Your AC is using 42% of your energy. Raising temperature by 2 degrees C could save $18/month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
