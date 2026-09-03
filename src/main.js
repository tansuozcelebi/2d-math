import React, { useState, useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Settings, Maximize2, Minimize2, GripHorizontal, Eye, EyeOff } from 'lucide-react';

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
  }
};


// Parametrik şekil formülasyonları
const ShapeGenerators = {
  // Rose/Rozet deseni: r = a·sin(k·θ)
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

  // Spiral: Arşimet spirali
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

  // Lissajous eğrisi
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

  // Dönen çokgen
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

  // Superellipse/Gielis formülü basitleştirilmiş
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

  // Dönen çokgen - polygon2 varyasyonu
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

  // Üçgen spiral - katmanlı üçgen deseni
  triangleSpiral: (params) => {
    const { layers, size, twist, rotation } = params;
    const paths = [];
    
    // Üçgenin köşe noktaları (eşkenar üçgen)
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

const ShapeCard = ({ title, shapeType, defaultParams, isMaximized, onMaximize, style, onResize, id }) => {
  const [params, setParams] = useState(defaultParams);
  const [rotation, setRotation] = useState(0);
  const [svgSize, setSvgSize] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showFormula, setShowFormula] = useState(false);
  const cardRef = React.useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const gsapTimeline = useRef(null);

  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: parseFloat(value) }));
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.02) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e) => {
    const header = e.target.closest('div')?.parentElement;
    if (header && header.classList.contains('bg-gradient-to-r')) {
      // Dragging header
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      setIsDragging(true);
    } else if (e.target.closest('.resize-handle')) {
      // Resizing
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  React.useEffect(() => {
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

  const paths = ShapeGenerators[shapeType]({ ...params, rotation });

  return (
    <div 
      ref={cardRef}
      data-card-id={id}
      className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-all ${isMaximized ? 'z-50 fixed inset-4' : ''}`}
      style={style}
    >
      {/* Header */}
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
            title={showFormula ? 'Formülü Gizle' : 'Formülü Göster'}
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

      {/* Formula Display */}
      {showFormula && Formulas[shapeType] && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200 p-4">
          <div className="text-sm">
            <p className="text-gray-700 font-semibold mb-1">{Formulas[shapeType].description}</p>
            <p className="text-blue-700 font-mono text-lg mb-2">{Formulas[shapeType].formula}</p>
            <p className="text-gray-600 text-xs">{Formulas[shapeType].params}</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`flex-1 overflow-auto p-4 flex flex-col gap-4 ${isMaximized ? 'min-h-screen' : ''}`}>
        {/* SVG Canvas */}
        <div className="flex justify-center">
          <div className="flex gap-3 items-center mb-2">
            <label className="text-sm text-gray-600">Boyut:</label>
            <input
              type="range"
              min="150"
              max={isMaximized ? 600 : 350}
              step="10"
              value={svgSize}
              onChange={(e) => setSvgSize(parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-700">{svgSize}px</span>
          </div>
        </div>
        
        <div className="flex justify-center flex-1">
          <svg 
            width={svgSize} 
            height={svgSize} 
            className="border-2 border-gray-300 rounded-lg bg-gray-50 shadow-md"
            viewBox={`0 0 300 300`}
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

        {/* Parameters */}
        <div className={`space-y-3 ${isMaximized ? 'grid grid-cols-2 gap-4' : ''}`}>
          {Object.entries(defaultParams).map(([key, value]) => (
            key !== 'rotation' && (
              <div key={key} className="flex flex-col gap-1 bg-gray-50 p-3 rounded">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">{key}</label>
                  <span className="text-sm font-semibold text-blue-600">{params[key].toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max={key === 'size' ? 145 : key === 'turns' ? 10 : key.includes('n') ? 10 : 20}
                  step="0.1"
                  value={params[key]}
                  onChange={(e) => updateParam(key, e.target.value)}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            )
          ))}
        </div>
      </div>

      {/* Resize Handle */}
      <div
        className="resize-handle absolute bottom-0 right-0 w-6 h-6 bg-blue-600 cursor-se-resize hover:bg-blue-700 transition-colors"
        onMouseDown={handleMouseDown}
        style={{ cursor: 'nwse-resize' }}
      />
    </div>
  );
};

export default function App() {
  const [maximizedCard, setMaximizedCard] = useState(null);
  const [layouts, setLayouts] = useState({
    rose1: { x: 0, y: 0, w: 400, h: 500 },
    spiral: { x: 420, y: 0, w: 400, h: 500 },
    lissajous: { x: 840, y: 0, w: 400, h: 500 },
    polygon: { x: 0, y: 520, w: 400, h: 500 },
    triangle: { x: 420, y: 520, w: 400, h: 500 },
    superellipse: { x: 840, y: 520, w: 400, h: 500 },
    rose2: { x: 0, y: 1040, w: 400, h: 500 },
    rose3: { x: 420, y: 1040, w: 400, h: 500 },
    polygon2: { x: 840, y: 1040, w: 400, h: 500 },
  });

  const shapes = [
    {
      title: 'Rose/Rozet',
      type: 'rose',
      params: { n: 5, d: 1, size: 135 },
      id: 'rose1'
    },
    {
      title: 'Spiral',
      type: 'spiral',
      params: { turns: 3, size: 125, lines: 12 },
      id: 'spiral'
    },
    {
      title: 'Lissajous',
      type: 'lissajous',
      params: { a: 3, b: 4, delta: Math.PI / 2, size: 125 },
      id: 'lissajous'
    },
    {
      title: 'Dönen Çokgen',
      type: 'polygon',
      params: { sides: 6, layers: 12, size: 135 },
      id: 'polygon'
    },
    {
      title: 'Katmanlı Üçgen',
      type: 'triangleSpiral',
      params: { layers: 15, size: 135, twist: 2 },
      id: 'triangle'
    },
    {
      title: 'Superellipse',
      type: 'superellipse',
      params: { n1: 4, n2: 2.5, n3: 2.5, size: 135 },
      id: 'superellipse'
    },
    {
      title: 'Rose (7/3)',
      type: 'rose',
      params: { n: 7, d: 3, size: 135 },
      id: 'rose2'
    },
    {
      title: 'Rose (11/4)',
      type: 'rose',
      params: { n: 11, d: 4, size: 135 },
      id: 'rose3'
    },
    {
      title: 'Dönen Çokgen (8)',
      type: 'polygon2',
      params: { sides: 8, layers: 10, size: 135 },
      id: 'polygon2'
    }
  ];

  const handleMaximize = useCallback((id) => {
    const element = document.querySelector(`[data-card-id="${id}"]`);
    if (element) {
      if (maximizedCard === id) {
        // Minimize animation
        gsap.to(element, {
          inset: 'auto',
          width: layouts[id].w,
          height: layouts[id].h,
          duration: 0.5,
          ease: 'back.out',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
        });
      } else {
        // Maximize animation
        gsap.to(element, {
          inset: '1rem',
          width: 'auto',
          height: 'auto',
          duration: 0.5,
          ease: 'back.out',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)'
        });
      }
    }
    setMaximizedCard(maximizedCard === id ? null : id);
  }, [maximizedCard, layouts]);

  const handleCardResize = (id, deltaX, deltaY) => {
    setLayouts(prev => {
      const newLayout = {
        ...prev,
        [id]: {
          ...prev[id],
          w: Math.max(300, prev[id].w + deltaX),
          h: Math.max(300, prev[id].h + deltaY)
        }
      };
      
      const element = document.querySelector(`[data-card-id="${id}"]`);
      if (element) {
        gsap.to(element, {
          width: newLayout[id].w,
          height: newLayout[id].h,
          duration: 0.1,
          overwrite: 'auto'
        });
      }
      
      return newLayout;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 overflow-auto">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 max-w-full">
        {/* Header */}
        <div className="text-center mb-8 sticky top-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-6">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            KREA Parametrik 2D Şekil Üreteci
          </h1>
          <p className="text-blue-200 text-lg">
            Her panel başlığında formülü göster/gizle butonunu kullanabilirsiniz. Panelleri sürükleyerek boyutlandırın.
          </p>
        </div>

        {/* Dashboard - Absolute Positioning for Resize */}
        <div className="relative" style={{ height: 'auto', minHeight: '100vh' }}>
          {shapes.map((shape) => {
            if (maximizedCard === shape.id) return null;
            
            const layout = layouts[shape.id];
            return (
              <div
                key={shape.id}
                className="absolute transition-all"
                style={{
                  left: `${layout.x}px`,
                  top: `${layout.y}px`,
                  width: `${layout.w}px`,
                  height: `${layout.h}px`,
                  zIndex: maximizedCard === shape.id ? 50 : 10,
                }}
              >
                <ShapeCard
                  title={shape.title}
                  shapeType={shape.type}
                  defaultParams={shape.params}
                  isMaximized={false}
                  onMaximize={() => handleMaximize(shape.id)}
                  onResize={(dx, dy) => handleCardResize(shape.id, dx, dy)}
                  style={{ position: 'relative' }}
                  id={shape.id}
                />
              </div>
            );
          })}

          {/* Maximized Card */}
          {maximizedCard && (
            <div className="fixed inset-0 z-50 p-4 bg-black/50">
              {shapes.map((shape) => (
                maximizedCard === shape.id && (
                  <div key={shape.id} className="w-full h-full">
                    <ShapeCard
                      title={shape.title}
                      shapeType={shape.type}
                      defaultParams={shape.params}
                      isMaximized={true}
                      onMaximize={() => handleMaximize(shape.id)}
                    />
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-blue-300 text-sm">
          <p>💡 Panel sağ alt köşesini sürükleyerek boyutlarını değiştirebilirsiniz. Panelleri sürükleyerek yeniden düzenleyebilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}