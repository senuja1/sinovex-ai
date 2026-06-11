import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Brain, Sparkles, Workflow, ArrowRight } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Visioning",
    subtext: "Data collection, analysis, and custom AI models for your unique business needs.",
    highlightWord: "custom AI models for your unique business needs",
    icon: Eye,
    color: { r: 37, g: 99, b: 235 }, // Blue-600
    hoverColor: "text-blue-600",
    borderColor: "group-hover:border-blue-500/30",
    bgClass: "hover:bg-blue-50/40",
    glowColor: "rgba(37, 99, 235, 0.15)",
  },
  {
    id: "02",
    title: "Thinking",
    subtext: "Intelligent analysis and predictions powered by advanced AI processing.",
    highlightWord: "predictions powered by advanced AI processing",
    icon: Brain,
    color: { r: 147, g: 51, b: 234 }, // Purple-600
    hoverColor: "text-purple-600",
    borderColor: "group-hover:border-purple-500/30",
    bgClass: "hover:bg-purple-50/40",
    glowColor: "rgba(147, 51, 234, 0.15)",
  },
  {
    id: "03",
    title: "Creating",
    subtext: "Professional visuals for photos, videos, and animations for your business needs.",
    highlightWord: "photos, videos, and animations for your business needs",
    icon: Sparkles,
    color: { r: 236, g: 72, b: 153 }, // Rose-500
    hoverColor: "text-rose-600",
    borderColor: "group-hover:border-rose-500/30",
    bgClass: "hover:bg-rose-50/40",
    glowColor: "rgba(236, 72, 153, 0.15)",
  },
  {
    id: "04",
    title: "Automating",
    subtext: "AI-powered workflows integrated into your apps for streamlined operations.",
    highlightWord: "workflows integrated into your apps for streamlined operations",
    icon: Workflow,
    color: { r: 16, g: 185, b: 129 }, // Emerald-500
    hoverColor: "text-emerald-600",
    borderColor: "group-hover:border-emerald-500/30",
    bgClass: "hover:bg-emerald-50/40",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
];

export default function TechSuite() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const canvasRef = useRef(null);

  // References for animation interpolation (to ensure 60fps buttery smooth state updates)
  const animRef = useRef({
    currentR: 90,
    targetR: 90,
    currentScale: 1.0,
    targetScale: 1.0,
    r: 99,
    g: 102,
    b: 241, // Indigo initial
    targetRgb: { r: 99, g: 102, b: 241 },
    speedX: 0,
    targetSpeedX: 0,
    speedY: 0.002,
    targetSpeedY: 0.002,
    angleX: 0.35, // Earth axial tilt (~20 degrees)
    angleY: 0,
    pulseTime: 0,
    scannerY: 0,
    scannerDir: 1,
  });

  // Handle active states and transition canvas parameters
  useEffect(() => {
    const anim = animRef.current;
    if (hoveredIndex === null) {
      anim.targetRgb = { r: 99, g: 102, b: 241 }; // Default Indigo
      anim.targetSpeedX = 0;
      anim.targetSpeedY = 0.002;
      anim.targetScale = 1.0;
    } else {
      const step = steps[hoveredIndex];
      anim.targetRgb = step.color;
      anim.targetScale = 1.0;
      
      if (hoveredIndex === 0) {
        // Visioning: Slower scan spin
        anim.targetSpeedX = 0;
        anim.targetSpeedY = 0.0035;
      } else if (hoveredIndex === 1) {
        // Thinking: Slower neural contemplation spin
        anim.targetSpeedX = 0;
        anim.targetSpeedY = 0.001;
      } else if (hoveredIndex === 2) {
        // Creating: Gentle pulse spin
        anim.targetSpeedX = 0;
        anim.targetSpeedY = 0.0022;
      } else if (hoveredIndex === 3) {
        // Automating: Calm orbit flow spin
        anim.targetSpeedX = 0;
        anim.targetSpeedY = 0.0028;
      }
    }
  }, [hoveredIndex]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let isDark = false;

    // Setup High DPI Canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate High-Density Quad Mesh Vertices
    const vertices = [];
    const edges = [];
    const numLatitudes = 24;
    const numLongitudes = 32;

    for (let i = 0; i <= numLatitudes; i++) {
      const theta = (i * Math.PI) / numLatitudes - Math.PI / 2; // Latitude: -PI/2 to PI/2
      for (let j = 0; j < numLongitudes; j++) {
        const phi = (j * 2 * Math.PI) / numLongitudes; // Longitude: 0 to 2*PI
        const x = Math.cos(theta) * Math.sin(phi);
        const y = Math.sin(theta);
        const z = Math.cos(theta) * Math.cos(phi);
        vertices.push({ x, y, z });
      }
    }

    const edgeSet = new Set();
    const addEdge = (u, v) => {
      const min = Math.min(u, v);
      const max = Math.max(u, v);
      const key = `${min}-${max}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([min, max]);
      }
    };

    // Construct Quad Grid Wireframe (no diagonals)
    for (let i = 0; i <= numLatitudes; i++) {
      for (let j = 0; j < numLongitudes; j++) {
        const curr = i * numLongitudes + j;
        
        // Connect horizontally to next longitude
        const nextLong = i * numLongitudes + ((j + 1) % numLongitudes);
        addEdge(curr, nextLong);

        // Connect vertically to next latitude row
        if (i < numLatitudes) {
          const nextLat = (i + 1) * numLongitudes + j;
          addEdge(curr, nextLat);
        }
      }
    }

    // Thinking: Neural Pulsing Nodes Setup
    const neuralPulses = Array.from({ length: 6 }, () => ({
      edgeIndex: Math.floor(Math.random() * edges.length),
      progress: Math.random(),
      speed: 0.012 + Math.random() * 0.016,
    }));

    // Automating: Satellites Setup
    const satellites = [
      { radiusMult: 1.45, angle: 0, speed: 0.018, axis: "XZ", color: "rgba(16, 185, 129, 0.8)" },
      { radiusMult: 1.3, angle: Math.PI / 3, speed: -0.014, axis: "YZ", color: "rgba(52, 211, 153, 0.7)" },
      { radiusMult: 1.5, angle: Math.PI / 6, speed: 0.022, axis: "XY", color: "rgba(5, 150, 105, 0.6)" },
    ];

    // Stable sphere shape rotating like a world (no displacement)
    const getDisplacement = (x, y, z, time) => 0;

    // Interpolate neon gradient based on rotated X coordinate (Blue/Cyan -> Purple/Violet -> Pink/Magenta)
    const getGradientColor = (nX, opacity, activeRGB) => {
      let r, g, b;
      const tClamped = Math.max(0, Math.min(1, nX));

      if (tClamped < 0.5) {
        // Left half: Neon Cyan/Blue (#00f0ff to #8b5cf6)
        const t = tClamped * 2;
        r = Math.round(0 + (139 - 0) * t);
        g = Math.round(240 + (92 - 240) * t);
        b = Math.round(255 + (246 - 255) * t);
      } else {
        // Right half: Purple to Neon Pink (#8b5cf6 to #ff00b8)
        const t = (tClamped - 0.5) * 2;
        r = Math.round(139 + (255 - 139) * t);
        g = Math.round(92 + (0 - 92) * t);
        b = Math.round(246 + (184 - 246) * t);
      }

      // Blend with active hover mode color
      if (activeRGB) {
        r = Math.round(r * 0.35 + activeRGB.r * 0.65);
        g = Math.round(g * 0.35 + activeRGB.g * 0.65);
        b = Math.round(b * 0.35 + activeRGB.b * 0.65);
      }

      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    // Drag-to-Rotate Mouse & Touch Event Handlers
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      dragVelocity = { x: 0, y: 0 };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      const anim = animRef.current;
      anim.angleY += deltaX * 0.007;
      anim.angleX += deltaY * 0.007;

      dragVelocity = { x: deltaX * 0.007, y: deltaY * 0.007 };
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
      const anim = animRef.current;
      if (Math.abs(dragVelocity.x) > 0.001 || Math.abs(dragVelocity.y) > 0.001) {
        anim.speedY = dragVelocity.x;
        anim.speedX = dragVelocity.y;
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      dragVelocity = { x: 0, y: 0 };
    };

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      const anim = animRef.current;
      anim.angleY += deltaX * 0.007;
      anim.angleX += deltaY * 0.007;

      dragVelocity = { x: deltaX * 0.007, y: deltaY * 0.007 };
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      const anim = animRef.current;

      // 1. Interpolate visual state variables
      anim.r += (anim.targetRgb.r - anim.r) * 0.08;
      anim.g += (anim.targetRgb.g - anim.g) * 0.08;
      anim.b += (anim.targetRgb.b - anim.b) * 0.08;

      anim.speedX += (anim.targetSpeedX - anim.speedX) * 0.08;
      anim.speedY += (anim.targetSpeedY - anim.speedY) * 0.08;
      anim.currentScale += (anim.targetScale - anim.currentScale) * 0.08;

      if (!isDragging) {
        anim.angleY += anim.speedY;
        anim.angleX += anim.speedX + (0.35 - anim.angleX) * 0.04;
        anim.speedX *= 0.95;
      }
      anim.pulseTime += 0.008;

      const activeColorRGB = hoveredIndex !== null ? animRef.current : null;

      // Keep base radius static and clean
      let baseR = anim.currentR * anim.currentScale;

      // Rotate and deform vertices
      const cosX = Math.cos(anim.angleX);
      const sinX = Math.sin(anim.angleX);
      const cosY = Math.cos(anim.angleY);
      const sinY = Math.sin(anim.angleY);

      // Helper function to project a point (Spin around Y first, then Tilt around X)
      const project = (vx, vy, vz) => {
        // 1. Spin around Y-axis (horizontal spin)
        let x1 = vx * cosY - vz * sinY;
        let z1 = vx * sinY + vz * cosY;

        // 2. Tilt around X-axis (axial tilt)
        let x2 = x1;
        let y2 = vy * cosX - z1 * sinX;
        let z2 = vy * sinX + z1 * cosX;

        const cameraDistance = 2.4;
        const perspective = 250 / (cameraDistance + rzNormalize(z2));
        const projX = centerX + x2 * (perspective / 100);
        const projY = centerY + y2 * (perspective / 100);

        return {
          x: projX,
          y: projY,
          zDepth: z2 / baseR,
          rotX: x2,
          rotY: y2,
        };
      };

      // Handle edge cases where baseR becomes 0
      const rzNormalize = (zVal) => {
        return baseR === 0 ? 0 : zVal / baseR;
      };

      const rotatedVertices = [];
      const haloVertices1 = [];
      const haloVertices2 = [];

      for (let idx = 0; idx < vertices.length; idx++) {
        const v = vertices[idx];
        
        // Calculate organic wave displacement
        const dispVal = getDisplacement(v.x, v.y, v.z, anim.pulseTime);
        
        // 1. Mesh vertex projection
        const rMesh = baseR * (1 + dispVal);
        const pMesh = project(v.x * rMesh, v.y * rMesh, v.z * rMesh);
        rotatedVertices.push(pMesh);

        // 2. Halo 1 vertex projection (inner shell at ~1.15)
        const jitter1 = Math.sin(idx * 0.3 + anim.pulseTime * 1.2) * 0.015;
        const rHalo1 = baseR * (1 + dispVal) * (1.15 + jitter1);
        const pHalo1 = project(v.x * rHalo1, v.y * rHalo1, v.z * rHalo1);
        haloVertices1.push(pHalo1);

        // 3. Halo 2 vertex projection (outer shell at ~1.28)
        const jitter2 = Math.cos(idx * 0.4 + anim.pulseTime * 1.5) * 0.025;
        const rHalo2 = baseR * (1 + dispVal) * (1.28 + jitter2);
        const pHalo2 = project(v.x * rHalo2, v.y * rHalo2, v.z * rHalo2);
        haloVertices2.push(pHalo2);
      }

      // Build depth sorting list (Painters Algorithm)
      const drawList = [];

      // Add mesh edges
      edges.forEach(([u, v]) => {
        const p1 = rotatedVertices[u];
        const p2 = rotatedVertices[v];
        if (p1 && p2) {
          const avgDepth = (p1.zDepth + p2.zDepth) / 2;
          drawList.push({
            type: "edge",
            zDepth: avgDepth,
            p1,
            p2
          });
        }
      });

      // Add inner halo dots (every 2nd for organic spacing)
      haloVertices1.forEach((p, idx) => {
        if (idx % 2 === 0) {
          drawList.push({
            type: "halo",
            zDepth: p.zDepth,
            p,
            size: 1.2,
            opacityMult: 0.8
          });
        }
      });

      // Add outer halo dots (every 3rd for organic spacing)
      haloVertices2.forEach((p, idx) => {
        if (idx % 3 === 0) {
          drawList.push({
            type: "halo",
            zDepth: p.zDepth,
            p,
            size: 1.6,
            opacityMult: 0.55
          });
        }
      });

      // Add mesh nodes
      rotatedVertices.forEach((p) => {
        drawList.push({
          type: "node",
          zDepth: p.zDepth,
          p
        });
      });

      // Sort by depth: largest zDepth (furthest away) is drawn first
      drawList.sort((a, b) => b.zDepth - a.zDepth);

      let drawnGlow = false;

      // Draw sorted items
      drawList.forEach((item) => {
        // Draw the volumetric core glow inside when passing the center plane
        if (!drawnGlow && item.zDepth < 0) {
          ctx.globalCompositeOperation = "source-over"; // normal blend for backing glow
          const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseR * 1.0);
          glowGrad.addColorStop(0, "rgba(180, 0, 255, 0.24)"); // Violet center
          glowGrad.addColorStop(0.5, "rgba(0, 194, 255, 0.08)"); // Cyan shell
          glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(centerX, centerY, baseR * 1.35, 0, 2 * Math.PI);
          ctx.fill();

          ctx.globalCompositeOperation = "screen"; // screen blend for wireframe
          drawnGlow = true;
        }

        if (item.type === "edge") {
          const { p1, p2, zDepth } = item;
          // Opacity fades in the back
          const opacity = Math.max(0.06, Math.min(0.9, 0.45 - zDepth * 0.32));
          
          const avgX = (p1.rotX + p2.rotX) / 2;
          const nX = baseR === 0 ? 0.5 : (avgX / (baseR * 1.2) + 1) / 2;

          // Pass 1: Soft line glow bloom
          ctx.strokeStyle = getGradientColor(nX, opacity * 0.32, activeColorRGB);
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // Pass 2: Sharp core line
          ctx.strokeStyle = getGradientColor(nX, opacity * 0.95, activeColorRGB);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

        } else if (item.type === "halo") {
          const { p, size, opacityMult } = item;
          const opacity = Math.max(0.04, Math.min(0.85, 0.42 - p.zDepth * 0.35)) * opacityMult;
          const nX = baseR === 0 ? 0.5 : (p.rotX / (baseR * 1.4) + 1) / 2;

          ctx.fillStyle = getGradientColor(nX, opacity, activeColorRGB);
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, 2 * Math.PI);
          ctx.fill();

        } else if (item.type === "node") {
          const { p } = item;
          const opacity = Math.max(0.08, Math.min(0.9, 0.48 - p.zDepth * 0.38)) * 0.75;
          const nX = baseR === 0 ? 0.5 : (p.rotX / (baseR * 1.2) + 1) / 2;

          ctx.fillStyle = getGradientColor(nX, opacity + 0.18, activeColorRGB);
          ctx.beginPath();
          const nodeSize = p.zDepth < 0 ? 1.5 : 0.8;
          ctx.arc(p.x, p.y, nodeSize, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      // Volumetric glow fallback
      if (!drawnGlow) {
        ctx.globalCompositeOperation = "source-over";
        const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseR * 1.0);
        glowGrad.addColorStop(0, "rgba(180, 0, 255, 0.24)");
        glowGrad.addColorStop(0.5, "rgba(0, 194, 255, 0.08)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseR * 1.35, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalCompositeOperation = "screen";
      }

      // 5. Special Mode: 01. Visioning (Laser scanner rings)
      if (hoveredIndex === 0) {
        anim.scannerY += 0.022 * anim.scannerDir;
        if (anim.scannerY > 0.9) anim.scannerDir = -1;
        if (anim.scannerY < -0.9) anim.scannerDir = 1;

        const scanYVal = anim.scannerY;
        const scanRadius = Math.sqrt(Math.max(0, 1 - scanYVal * scanYVal));

        const ringPoints = [];
        const ringResolution = 36;
        for (let k = 0; k < ringResolution; k++) {
          const angle = (k * 2 * Math.PI) / ringResolution;
          const x = scanRadius * Math.sin(angle);
          const z = scanRadius * Math.cos(angle);
          ringPoints.push({ x, y: scanYVal, z });
        }

        ctx.strokeStyle = "rgba(0, 240, 255, 0.95)";
        ctx.shadowColor = "rgba(0, 240, 255, 0.6)";
        ctx.shadowBlur = 9;
        ctx.lineWidth = 2.0;
        ctx.beginPath();

        ringPoints.forEach((p, idx) => {
          // Spin around Y
          let x1 = p.x * cosY - p.z * sinY;
          let z1 = p.x * sinY + p.z * cosY;

          // Tilt around X
          let x2 = x1;
          let y2 = p.y * cosX - z1 * sinX;
          let z2 = p.y * sinX + z1 * cosX;

          const cameraDistance = 2.4;
          const perspective = 250 / (cameraDistance + rzNormalize(z2));
          const px = centerX + x2 * (perspective / 100);
          const py = centerY + y2 * (perspective / 100);

          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });

        ctx.closePath();
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 6. Special Mode: 02. Thinking (Neural impulses traveling along pathways)
      if (hoveredIndex === 1) {
        ctx.shadowColor = "rgba(255, 0, 184, 0.9)";
        ctx.shadowBlur = 6;

        neuralPulses.forEach((pulse) => {
          pulse.progress += pulse.speed;
          if (pulse.progress >= 1.0) {
            pulse.progress = 0;
            pulse.edgeIndex = Math.floor(Math.random() * edges.length);
          }

          const edge = edges[pulse.edgeIndex];
          if (edge) {
            const startPt = rotatedVertices[edge[0]];
            const endPt = rotatedVertices[edge[1]];
            if (startPt && endPt) {
              const pulseX = startPt.x + (endPt.x - startPt.x) * pulse.progress;
              const pulseY = startPt.y + (endPt.y - startPt.y) * pulse.progress;

              ctx.fillStyle = "rgb(255, 0, 184)";
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 3.8, 0, 2 * Math.PI);
              ctx.fill();
            }
          }
        });

        ctx.shadowBlur = 0;
      }

      // 7. Special Mode: 03. Creating (Concentric secondary ripples)
      if (hoveredIndex === 2) {
        const outerScale = 1.25 + Math.sin(anim.pulseTime * 2.2) * 0.06;
        const outerRadius = baseR * outerScale;

        ctx.strokeStyle = "rgba(255, 0, 184, 0.22)";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius * 1.16, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // 8. Special Mode: 04. Automating (Orbiting Satellite Nodes)
      if (hoveredIndex === 3) {
        satellites.forEach((sat) => {
          sat.angle += sat.speed;

          let sx = 0, sy = 0, sz = 0;
          if (sat.axis === "XZ") {
            sx = Math.cos(sat.angle);
            sz = Math.sin(sat.angle);
          } else if (sat.axis === "YZ") {
            sy = Math.cos(sat.angle);
            sz = Math.sin(sat.angle);
          } else {
            sx = Math.cos(sat.angle);
            sy = Math.sin(sat.angle);
          }

          const orbitR = baseR * sat.radiusMult;
          sx *= orbitR;
          sy *= orbitR;
          sz *= orbitR;

          // Spin around Y
          let rx1 = sx * cosY - sz * sinY;
          let rz1 = sx * sinY + sz * cosY;

          // Tilt around X
          let rx2 = rx1;
          let ry2 = sy * cosX - rz1 * sinX;
          let rz2 = sy * sinX + rz1 * cosX;

          const cameraDistance = 2.4;
          const perspective = 250 / (cameraDistance + rzNormalize(rz2));
          const projX = centerX + rx2 * (perspective / 100);
          const projY = centerY + ry2 * (perspective / 100);

          ctx.shadowColor = sat.color;
          ctx.shadowBlur = 7;
          ctx.fillStyle = sat.color;
          ctx.beginPath();
          ctx.arc(projX, projY, 4.8, 0, 2 * Math.PI);
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.strokeStyle = `rgba(16, 185, 129, ${Math.max(0.05, 0.28 - rzNormalize(rz2) / 2)})`;
          ctx.lineWidth = 0.55;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(projX, projY);
          ctx.stroke();
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [hoveredIndex]);

  // Highlight bold sections of text dynamically
  const renderSubtext = (step) => {
    const parts = step.subtext.split(step.highlightWord);
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}
          <strong className="font-semibold text-foreground">{step.highlightWord}</strong>
          {parts[1]}
        </>
      );
    }
    return step.subtext;
  };

  const getStepTextClass = (idx) => {
    if (idx === null) return "bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent";
    if (idx === 0) return "bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent";
    if (idx === 1) return "bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent";
    if (idx === 2) return "bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent";
    if (idx === 3) return "bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent";
    return "";
  };

  const activeColorGlow = hoveredIndex !== null ? steps[hoveredIndex].glowColor : "rgba(99, 102, 241, 0.05)";

  return (
    <section id="technology-suite" className="relative overflow-hidden bg-background px-6 py-28 text-foreground transition-colors duration-300">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activeColorGlow} 0%, transparent 70%)`
        }}
      />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-muted"
          >
            How It Works
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl text-foreground"
          >
            Our Intelligent <span className="text-blue-500 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Technology Suite</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted"
          >
            Advanced AI technology that thinks, creates, and automates. Our suite combines data
            intelligence, predictive analysis, content generation, and seamless automation for your business.
          </motion.p>
        </div>

        {/* 3-Column Interactive Grid */}
        <div className="grid gap-10 lg:grid-cols-[1fr_380px_1fr] items-center">
          
          {/* Left Column (01 Visioning & 02 Thinking) */}
          <div className="flex flex-col gap-12 lg:text-right order-2 lg:order-1">
            {steps.slice(0, 2).map((step, idx) => {
              const Icon = step.icon;
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onTouchStart={() => setHoveredIndex(idx)}
                  className={`group relative flex flex-col gap-4 rounded-3xl border border-border bg-surface p-6 shadow-sm cursor-pointer transition-all duration-300 ${step.bgClass} ${isHovered ? "shadow-md scale-[1.02] border-transparent" : "hover:scale-[1.01]"}`}
                  style={{
                    boxShadow: isHovered ? `0 10px 30px ${step.glowColor}` : ""
                  }}
                >
                  <div className="flex items-center gap-3 lg:flex-row-reverse">
                    <span className={`text-sm font-semibold tracking-[0.1em] text-muted transition-colors duration-300 ${isHovered ? step.hoverColor : ""}`}>
                      {step.id}
                    </span>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-bg border border-border text-muted transition-all duration-300 ${isHovered ? "bg-foreground text-background scale-110 border-transparent" : "group-hover:text-foreground"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className={`text-xl font-semibold transition-colors duration-300 ${isHovered ? step.hoverColor : "text-foreground"}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-6 text-muted transition-colors duration-300">
                    {renderSubtext(step)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Center Column (Core Sphere Visual Card Refined) */}
          <div className="flex justify-center order-1 lg:order-2">
            <motion.div
              layout
              className="relative flex flex-col items-center justify-between w-full max-w-[360px] h-[380px] rounded-3xl border border-white/10 bg-[#080613] shadow-2xl overflow-hidden p-6 transition-all duration-500"
              style={{
                boxShadow: hoveredIndex !== null 
                  ? `0 25px 60px -15px ${steps[hoveredIndex].glowColor.replace("0.15", "0.45")}` 
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.45)"
              }}
            >
              {/* Central Core Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-[280px] cursor-grab active:cursor-grabbing"
              />

              {/* Central Label "Sinovex Core" */}
              <div className="text-center relative z-10 select-none pb-2">
                <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold">Sinovex Core</span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={hoveredIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className={`text-sm font-semibold mt-1 ${getStepTextClass(hoveredIndex)}`}
                  >
                    {hoveredIndex === null ? "System Idle" : `${steps[hoveredIndex].title} Mode`}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right Column (03 Creating & 04 Automating) */}
          <div className="flex flex-col gap-12 order-3">
            {steps.slice(2, 4).map((step, idx) => {
              const index = idx + 2;
              const Icon = step.icon;
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onTouchStart={() => setHoveredIndex(index)}
                  className={`group relative flex flex-col gap-4 rounded-3xl border border-border bg-surface p-6 shadow-sm cursor-pointer transition-all duration-300 ${step.bgClass} ${isHovered ? "shadow-md scale-[1.02] border-transparent" : "hover:scale-[1.01]"}`}
                  style={{
                    boxShadow: isHovered ? `0 10px 30px ${step.glowColor}` : ""
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold tracking-[0.1em] text-muted transition-colors duration-300 ${isHovered ? step.hoverColor : ""}`}>
                      {step.id}
                    </span>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-bg border border-border text-muted transition-all duration-300 ${isHovered ? "bg-foreground text-background scale-110 border-transparent" : "group-hover:text-foreground"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className={`text-xl font-semibold transition-colors duration-300 ${isHovered ? step.hoverColor : "text-foreground"}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-6 text-muted transition-colors duration-300">
                    {renderSubtext(step)}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
