import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Maximize2, Minimize2, GripHorizontal, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const TAU = Math.PI * 2;

const gcd = (a, b) => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    [x, y] = [y, x % y];
  }
  return x || 1;
};

const lcm = (a, b) => Math.abs(a * b) / gcd(a, b || 1);

// Formülasyonların açıklamaları
const Formulas = {
  rose: {
    formula: 'r = a·sin(n/d·θ)',
    description: 'Rose/Rozet Eğrisi',
    params: 'n: yaprak sayısı, d: yoğunluk'
  },
  spiral: {
    formula: 'r = a·t, θ = 2πkt',
    description: 'Arşimet Spirali',
    params: 'turns: dönüş sayısı, lines: çizgi sayısı'
  },
  lissajous: {
    formula: 'x = A·sin(at + δ), y = B·sin(bt)',
    description: 'Lissajous Eğrisi',
    params: 'a, b: frekans, δ: faz farkı'
  },
  polygon: {
    formula: 'Katmanlı açısal transformasyon',
    description: 'Dönen Çokgen',
    params: 'sides: kenar sayısı, layers: katman'
  },
  triangleSpiral: {
    formula: 'Eşkenar Δ + Rotasyon',
    description: 'Katmanlı Üçgen Spiral',
    params: 'layers: katman, twist: dönme'
  },
  superellipse: {
    formula: 'Gielis Formülü: |x/a|^n + |y/b|^n = 1',
    description: 'Superellipse',
    params: 'n1, n2, n3: şekil parametreleri'
  },
  polygon2: {
    formula: 'Katmanlı açısal transformasyon (8-kenar)',
    description: 'Dönen Çokgen (8)',
    params: 'sides: kenar sayısı, layers: katman'
  },
  lissajousPro: {
    formula: 'x = A·sin(a·t + δ), y = B·sin(b·t)',
    description: 'Lissajous (Genişletilmiş)',
    params: 'A, B: genlik; a, b: frekans; δ: faz'
  },
  hypotrochoid: {
    formula: 'x = (R−r)cos(t) + d cos(k t)',
    description: 'Hypotrochoid',
    params: 'R, r: yarıçap; d: uzaklık'
  },
  epitrochoid: {
    formula: 'x = (R+r)cos(t) − d cos(k t)',
    description: 'Epitrochoid',
    params: 'R, r: yarıçap; d: uzaklık'
  },
  arch_spiral: {
    formula: 'r = a + b·θ',
    description: 'Arşimet Spirali',
    params: 'a, b: ölçek; turns: tur sayısı'
  },
  log_spiral: {
    formula: 'r = a·e^{bθ}',
    description: 'Logaritmik Spiral',
    params: 'a, b: ölçek; turns: tur sayısı'
  },
  fermat_spiral: {
    formula: 'r = √θ · scale',
    description: 'Fermat Spirali',
    params: 'scale: ölçek; turns: tur sayısı'
  },
  lemniscate: {
    formula: 'r² = a² cos(2θ)',
    description: 'Bernoulli Lemniscate',
    params: 'a: yarıçap'
  },
  astroid: {
    formula: 'x = a cos³t, y = a sin³t',
    description: 'Astroid',
    params: 'a: yarıçap'
  },
  deltoid: {
    formula: 'x = 2a cos t + a cos 2t',
    description: 'Deltoid',
    params: 'a: yarıçap'
  },
  cardioid: {
    formula: 'r = a(1 + cos θ)',
    description: 'Kardioid',
    params: 'a: yarıçap'
  },
  nephroid: {
    formula: 'r = a(1 − cos θ)',
    description: 'Nefroid',
    params: 'a: yarıçap'
  },
  cycloid: {
    formula: 'x = r(t − sin t), y = r(1 − cos t)',
    description: 'Cycloid',
    params: 'r: yarıçap, turns: tur'
  },
  epicycloid: {
    formula: 'Epicycloid',
    description: 'Epicycloid',
    params: 'r: yarıçap, k: çember oranı'
  },
  hypocycloid: {
    formula: 'Hypocycloid',
    description: 'Hypocycloid',
    params: 'r: yarıçap, k: çember oranı'
  },
  superformula: {
    formula: 'Gielis Superformula',
    description: 'Organik logo üretici',
    params: 'm, a, b, n1, n2, n3'
  },
  wave_circle: {
    formula: 'r = a + b·sin(kθ)',
    description: 'Dalgasız Çember',
    params: 'a, b: genlik; k: harmonik'
  },
  moire_polar: {
    formula: 'r = a sin(kθ) + b sin(mθ)',
    description: 'Moiré (Polar)',
    params: 'a, b: genlik; k, m: frekans'
  },
  polygon_polar: {
    formula: 'r = cos(π/n) / cos((θ mod 2π/n) − π/n)',
    description: 'Polar Çokgen Morf',
    params: 'n: kenar sayısı, morph: dönüşüm'
  },
  param_noise: {
    formula: 'x = r cos θ + ε sin(nθ)',
    description: 'Kontrollü Gürültü',
    params: 'r: yarıçap; ε: gürültü; n, m: frekans'
  },
  rose_combo: {
    formula: 'r = a cos(kθ) + b cos(mθ)',
    description: 'Rose Kombinasyonu',
    params: 'a, b: genlik; k, m: frekans'
  }
};

const ParametricShapes = {
  lissajousPro: {
    params: ['A', 'B', 'a', 'b', 'delta'],
    point: (t, p) => ({
      x: p.A * Math.sin(p.a * t + p.delta),
      y: p.B * Math.sin(p.b * t)
    }),
    tMax: (p) => TAU * lcm(Math.round(p.a), Math.round(p.b)),
    samples: 1400
  },
  hypotrochoid: {
    params: ['R', 'r', 'd'],
    point: (t, p) => {
      const k = (p.R - p.r) / p.r;
      return {
        x: (p.R - p.r) * Math.cos(t) + p.d * Math.cos(k * t),
        y: (p.R - p.r) * Math.sin(t) - p.d * Math.sin(k * t)
      };
    },
    tMax: (p) => {
      const R = Math.round(p.R);
      const r = Math.round(p.r);
      return TAU * (r / gcd(R - r, r));
    },
    samples: 1600
  },
  epitrochoid: {
    params: ['R', 'r', 'd'],
    point: (t, p) => {
      const k = (p.R + p.r) / p.r;
      return {
        x: (p.R + p.r) * Math.cos(t) - p.d * Math.cos(k * t),
        y: (p.R + p.r) * Math.sin(t) - p.d * Math.sin(k * t)
      };
    },
    tMax: (p) => {
      const R = Math.round(p.R);
      const r = Math.round(p.r);
      return TAU * (r / gcd(R + r, r));
    },
    samples: 1600
  },
  arch_spiral: {
    params: ['a', 'b', 'turns'],
    point: (t, p) => {
      const theta = t;
      const r = p.a + p.b * theta;
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: (p) => TAU * p.turns,
    samples: 900
  },
  log_spiral: {
    params: ['a', 'b', 'turns'],
    point: (t, p) => {
      const theta = t;
      const r = p.a * Math.exp(p.b * theta);
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: (p) => TAU * p.turns,
    samples: 900
  },
  fermat_spiral: {
    params: ['scale', 'turns'],
    point: (t, p) => {
      const theta = t;
      const r = p.scale * Math.sqrt(theta);
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: (p) => TAU * p.turns,
    samples: 900
  },
  lemniscate: {
    params: ['a'],
    point: (t, p) => {
      const theta = t;
      const c = Math.cos(2 * theta);
      const r = c >= 0 ? p.a * Math.sqrt(c) : 0;
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: () => TAU,
    samples: 1000
  },
  astroid: {
    params: ['a'],
    point: (t, p) => ({
      x: p.a * Math.pow(Math.cos(t), 3),
      y: p.a * Math.pow(Math.sin(t), 3)
    }),
    tMax: () => TAU,
    samples: 900
  },
  deltoid: {
    params: ['a'],
    point: (t, p) => ({
      x: 2 * p.a * Math.cos(t) + p.a * Math.cos(2 * t),
      y: 2 * p.a * Math.sin(t) - p.a * Math.sin(2 * t)
    }),
    tMax: () => TAU,
    samples: 900
  },
  cardioid: {
    params: ['a'],
    point: (t, p) => {
      const theta = t;
      const r = p.a * (1 + Math.cos(theta));
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: () => TAU,
    samples: 900
  },
  nephroid: {
    params: ['a'],
    point: (t, p) => {
      const theta = t;
      const r = p.a * (1 - Math.cos(theta));
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: () => TAU,
    samples: 900
  },
  cycloid: {
    params: ['r', 'turns'],
    point: (t, p) => ({
      x: p.r * (t - Math.sin(t)),
      y: p.r * (1 - Math.cos(t))
    }),
    tMax: (p) => TAU * p.turns,
    samples: 1200
  },
  epicycloid: {
    params: ['r', 'k'],
    point: (t, p) => ({
      x: p.r * (p.k + 1) * Math.cos(t) - p.r * Math.cos((p.k + 1) * t),
      y: p.r * (p.k + 1) * Math.sin(t) - p.r * Math.sin((p.k + 1) * t)
    }),
    tMax: (p) => TAU * p.k,
    samples: 1200
  },
  hypocycloid: {
    params: ['r', 'k'],
    point: (t, p) => ({
      x: p.r * (p.k - 1) * Math.cos(t) + p.r * Math.cos((p.k - 1) * t),
      y: p.r * (p.k - 1) * Math.sin(t) - p.r * Math.sin((p.k - 1) * t)
    }),
    tMax: (p) => TAU * p.k,
    samples: 1200
  },
  superformula: {
    params: ['m', 'a', 'b', 'n1', 'n2', 'n3'],
    point: (t, p) => {
      const theta = t;
      const part1 = Math.pow(Math.abs(Math.cos((p.m * theta) / 4) / p.a), p.n2);
      const part2 = Math.pow(Math.abs(Math.sin((p.m * theta) / 4) / p.b), p.n3);
      const r = Math.pow(part1 + part2, -1 / p.n1);
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: () => TAU,
    samples: 1400
  },
  wave_circle: {
    params: ['a', 'b', 'k'],
    point: (t, p) => {
      const theta = t;
      const r = p.a + p.b * Math.sin(p.k * theta);
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: () => TAU,
    samples: 1200
  },
  moire_polar: {
    params: ['a', 'b', 'k', 'm'],
    point: (t, p) => {
      const theta = t;
      const r = p.a * Math.sin(p.k * theta) + p.b * Math.sin(p.m * theta);
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: () => TAU,
    samples: 1400
  },
  polygon_polar: {
    params: ['n', 'morph'],
    point: (t, p) => {
      const theta = t;
      const n = Math.max(3, Math.round(p.n));
      const sector = TAU / n;
      const phi = ((theta % sector) + sector) % sector;
      const polyR = Math.cos(Math.PI / n) / Math.cos(phi - Math.PI / n);
      const r = (1 - p.morph) * polyR + p.morph;
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: () => TAU,
    samples: 1000
  },
  param_noise: {
    params: ['r', 'eps', 'n', 'm'],
    point: (t, p) => {
      const theta = t;
      return {
        x: p.r * Math.cos(theta) + p.eps * Math.sin(p.n * theta),
        y: p.r * Math.sin(theta) + p.eps * Math.cos(p.m * theta)
      };
    },
    tMax: () => TAU,
    samples: 1400
  },
  rose_combo: {
    params: ['a', 'b', 'k', 'm'],
    point: (t, p) => {
      const theta = t;
      const r = p.a * Math.cos(p.k * theta) + p.b * Math.cos(p.m * theta);
      return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
    },
    tMax: () => TAU,
    samples: 1200
  }
};

const createParametricGenerator = (def) => (params) => {
  const rotation = params.rotation || 0;
  const localParams = { ...params };
  delete localParams.rotation;

  const samples = def.samples || 1200;
  const tEnd = def.tMax(localParams);
  const points = [];
  const cosR = Math.cos(rotation);
  const sinR = Math.sin(rotation);

  for (let i = 0; i <= samples; i++) {
    const t = (tEnd * i) / samples;
    const p = def.point(t, localParams);
    const x = p.x * cosR - p.y * sinR;
    const y = p.x * sinR + p.y * cosR;
    points.push({ x, y });
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  points.forEach((p) => {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  });

  const width = Math.max(maxX - minX, 1e-6);
  const height = Math.max(maxY - minY, 1e-6);
  const fit = 0.9;
  const scale = fit * (300 / Math.max(width, height));
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const cx = 150;
  const cy = 150;

  const svgPoints = points.map((p) => `${cx + (p.x - midX) * scale},${cy + (p.y - midY) * scale}`);
  return `M ${svgPoints.join(' L ')}`;
};

const ParametricGenerators = Object.fromEntries(
  Object.entries(ParametricShapes).map(([key, def]) => [key, createParametricGenerator(def)])
);

// Parametrik şekil formülasyonları (mevcut + yeni parametreli)
const BaseShapeGenerators = {
  rose: (params) => {
    const { n, d, size, rotation } = params;
    const points = [];
    const steps = 360;
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2 * d;
      const r = size * Math.sin((n / d) * theta);
      const x = 150 + r * Math.cos(theta + rotation);
      const y = 150 + r * Math.sin(theta + rotation);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  },

  spiral: (params) => {
    const { turns, size, lines, rotation } = params;
    const paths = [];
    for (let l = 0; l < lines; l++) {
      const points = [];
      const offset = (l / lines) * Math.PI * 2;
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const theta = t * Math.PI * 2 * turns + offset + rotation;
        const r = size * t;
        const x = 150 + r * Math.cos(theta);
        const y = 150 + r * Math.sin(theta);
        points.push(`${x},${y}`);
      }
      paths.push(`M ${points.join(' L ')}`);
    }
    return paths;
  },

  lissajous: (params) => {
    const { a, b, delta, size, rotation } = params;
    const points = [];
    const steps = 360;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const x = 150 + size * Math.sin(a * t + rotation);
      const y = 150 + size * Math.sin(b * t + delta);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  },

  polygon: (params) => {
    const { sides, layers, size, rotation } = params;
    const paths = [];
    for (let layer = 0; layer < layers; layer++) {
      const points = [];
      const layerRotation = rotation + (layer / layers) * (Math.PI / sides);
      const layerSize = size * (1 - layer / (layers * 1.5));
      
      for (let i = 0; i <= sides; i++) {
        const angle = (i / sides) * Math.PI * 2 + layerRotation;
        const x = 150 + layerSize * Math.cos(angle);
        const y = 150 + layerSize * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      paths.push(`M ${points.join(' L ')}`);
    }
    return paths;
  },

  superellipse: (params) => {
    const { n1, n2, n3, size, rotation } = params;
    const points = [];
    const steps = 360;
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      const t1 = Math.abs(Math.cos(n1 * theta / 4));
      const t2 = Math.abs(Math.sin(n1 * theta / 4));
      const r = size * Math.pow(Math.pow(t1, n2) + Math.pow(t2, n3), -1 / n2);
      const x = 150 + r * Math.cos(theta + rotation);
      const y = 150 + r * Math.sin(theta + rotation);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  },

  polygon2: (params) => {
    const { sides, layers, size, rotation } = params;
    const paths = [];
    for (let layer = 0; layer < layers; layer++) {
      const points = [];
      const layerRotation = rotation + (layer / layers) * (Math.PI / sides);
      const layerSize = size * (1 - layer / (layers * 1.5));
      
      for (let i = 0; i <= sides; i++) {
        const angle = (i / sides) * Math.PI * 2 + layerRotation;
        const x = 150 + layerSize * Math.cos(angle);
        const y = 150 + layerSize * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      paths.push(`M ${points.join(' L ')}`);
    }
    return paths;
  },

  triangleSpiral: (params) => {
    const { layers, size, twist, rotation } = params;
    const paths = [];
    
    const getTrianglePoints = (scale, rot) => {
      const angles = [Math.PI / 2, Math.PI / 2 + (2 * Math.PI / 3), Math.PI / 2 + (4 * Math.PI / 3)];
      return angles.map(angle => ({
        x: 150 + scale * Math.cos(angle + rot),
        y: 150 + scale * Math.sin(angle + rot)
      }));
    };

    for (let layer = 0; layer < layers; layer++) {
      const t = layer / layers;
      const layerSize = size * (1 - t * 0.7);
      const layerRotation = rotation + (t * twist * Math.PI / 4);
      
      const points = getTrianglePoints(layerSize, layerRotation);
      paths.push(`M ${points[0].x},${points[0].y} L ${points[1].x},${points[1].y} L ${points[2].x},${points[2].y} Z`);
    }
    
    return paths;
  }
};

const ShapeGenerators = { ...BaseShapeGenerators, ...ParametricGenerators };

const ShapeCard = ({ title, shapeType, defaultParams, paramMeta = {}, isMaximized, onMaximize, style, onResize, id }) => {
  const [params, setParams] = useState(defaultParams);
  const [rotation, setRotation] = useState(0);
  const [svgSize, setSvgSize] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showFormula, setShowFormula] = useState(false);
  const cardRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const gsapTimeline = useRef(null);
  const { t } = useLanguage();
  const safeT = t || { buttons: { showFormula: 'Show formula', hideFormula: 'Hide formula' }, home: { size: 'Size', px: 'px' } };

  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: parseFloat(value) }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.02) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e) => {
    const header = e.target.closest('div')?.parentElement;
    if (header && header.classList.contains('bg-gradient-to-r')) {
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      setIsDragging(true);
    } else if (e.target.closest('.resize-handle')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      if (cardRef.current && onResize) {
        onResize(deltaX, deltaY);
      }
    };

    const handleMouseUp = () => {
      if (cardRef.current && gsapTimeline.current) {
        gsap.to(cardRef.current, {
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          duration: 0.3,
          ease: 'back.out'
        });
      }
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, onResize]);

  const generator = ShapeGenerators[shapeType];
  const paths = generator ? generator({ ...params, rotation }) : '';

  return (
    <div 
      ref={cardRef}
      data-card-id={id}
      className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-all ${isMaximized ? 'z-50 fixed inset-4' : ''}`}
      style={style}
    >
      <div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between text-white cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing flex-1">
          <GripHorizontal size={18} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="p-2 hover:bg-white/20 rounded transition-colors"
            title={showFormula ? (safeT.buttons?.hideFormula || 'Hide formula') : (safeT.buttons?.showFormula || 'Show formula')}
          >
            {showFormula ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={onMaximize}
            className="p-2 hover:bg-white/20 rounded transition-colors"
          >
            {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {showFormula && Formulas[shapeType] && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200 p-4">
          <div className="text-sm">
            <p className="text-gray-700 font-semibold mb-1">{Formulas[shapeType].description}</p>
            <p className="text-blue-700 font-mono text-lg mb-2">{Formulas[shapeType].formula}</p>
            <p className="text-gray-600 text-xs">{Formulas[shapeType].params}</p>
          </div>
        </div>
      )}

      <div className={`flex-1 overflow-auto p-4 flex flex-col gap-4 ${isMaximized ? 'min-h-screen' : ''}`}>
        <div className="flex justify-center">
          <div className="flex gap-3 items-center mb-2">
            <label className="text-sm text-gray-600">{safeT.home?.size || 'Size'}</label>
            <input
              type="range"
              min="150"
              max={isMaximized ? 600 : 350}
              step="10"
              value={svgSize}
              onChange={(e) => setSvgSize(parseInt(e.target.value, 10))}
              className="w-32"
            />
            <span className="text-sm text-gray-700">{svgSize}{safeT.home?.px || 'px'}</span>
          </div>
        </div>
        
        <div className="flex justify-center flex-1">
          <svg 
            width={svgSize} 
            height={svgSize} 
            className="border-2 border-gray-300 rounded-lg bg-gray-50 shadow-md"
            viewBox="0 0 300 300"
            style={{ minWidth: svgSize, minHeight: svgSize }}
          >
            {Array.isArray(paths) ? (
              paths.map((path, idx) => (
                <path
                  key={idx}
                  d={path}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1"
                  opacity={0.8}
                />
              ))
            ) : (
              <path d={paths} fill="none" stroke="#2563eb" strokeWidth="1.5" />
            )}
          </svg>
        </div>

        <div className={`space-y-3 ${isMaximized ? 'grid grid-cols-2 gap-4' : ''}`}>
          {Object.entries(defaultParams).map(([key]) => (
            key !== 'rotation' && (
              <div key={key} className="flex flex-col gap-1 bg-gray-50 p-3 rounded">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">{paramMeta[key]?.label || key}</label>
                  <span className="text-sm font-semibold text-blue-600">
                    {Number.isFinite(params[key]) ? params[key].toFixed((paramMeta[key]?.step || 0.1) < 1 ? 2 : 0) : params[key]}
                  </span>
                </div>
                <input
                  type="range"
                  min={paramMeta[key]?.min ?? 0.5}
                  max={paramMeta[key]?.max ?? (key === 'size' ? 145 : key === 'turns' ? 10 : key.includes('n') ? 10 : 20)}
                  step={paramMeta[key]?.step ?? 0.1}
                  value={params[key]}
                  onChange={(e) => updateParam(key, e.target.value)}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            )
          ))}
        </div>
      </div>

      <div
        className="resize-handle absolute bottom-0 right-0 w-6 h-6 bg-blue-600 cursor-se-resize hover:bg-blue-700 transition-colors"
        onMouseDown={handleMouseDown}
        style={{ cursor: 'nwse-resize' }}
      />
    </div>
  );
};

export default ShapeCard;
