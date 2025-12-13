import React, { useState, useCallback } from 'react';
import { Settings, Maximize2, Minimize2, GripHorizontal } from 'lucide-react';

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

const ShapeCard = ({ title, shapeType, defaultParams, isMaximized, onMaximize, style, onResize }) => {
  const [params, setParams] = useState(defaultParams);
  const [rotation, setRotation] = useState(0);
  const [svgSize, setSvgSize] = useState(250);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cardRef = React.useRef(null);

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
    if (e.target.closest('.resize-handle')) {
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
      className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-all ${isMaximized ? 'z-50 fixed inset-4' : ''}`}
      style={style}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing">
          <GripHorizontal size={18} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <button
          onClick={onMaximize}
          className="p-2 hover:bg-white/20 rounded transition-colors"
        >
          {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

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
  const [showInfo, setShowInfo] = useState(false);
  const [maximizedCard, setMaximizedCard] = useState(null);

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
      type: 'polygon',
      params: { sides: 8, layers: 10, size: 135 },
      id: 'polygon2'
    }
  ];

  const handleMaximize = useCallback((id) => {
    setMaximizedCard(maximizedCard === id ? null : id);
  }, [maximizedCard]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            ✨ Parametrik 2D Şekil Üreteci
          </h1>
          <p className="text-blue-200 text-lg mb-6">
            Matematiksel formüller ile animasyonlu geometrik desenler — Panelleri sürükle, yeniden boyutlandır ve keşfet!
          </p>
          
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl font-medium"
          >
            <Settings size={20} />
            {showInfo ? 'Bilgileri Gizle' : 'Formülasyonları Göster'}
          </button>
        </div>

        {/* Info Section */}
        {showInfo && (
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 text-white">📐 Matematiksel Formüller</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <strong className="text-blue-300">Rose/Rozet:</strong>
                <div className="text-sm mt-2">r = a·sin(n/d·θ)</div>
                <div className="text-xs text-gray-300 mt-1">Parametreler: n, d</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <strong className="text-purple-300">Spiral:</strong>
                <div className="text-sm mt-2">r = a·t, θ = 2πkt</div>
                <div className="text-xs text-gray-300 mt-1">Parametreler: turns, lines</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <strong className="text-pink-300">Lissajous:</strong>
                <div className="text-sm mt-2">x = A·sin(at + δ)</div>
                <div className="text-xs text-gray-300 mt-1">Parametreler: a, b, δ</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <strong className="text-cyan-300">Dönen Çokgen:</strong>
                <div className="text-sm mt-2">Katmanlı açısal transform</div>
                <div className="text-xs text-gray-300 mt-1">Parametreler: sides, layers</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <strong className="text-green-300">Katmanlı Üçgen:</strong>
                <div className="text-sm mt-2">Eşkenar Δ + Rotasyon</div>
                <div className="text-xs text-gray-300 mt-1">Parametreler: layers, twist</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <strong className="text-yellow-300">Superellipse:</strong>
                <div className="text-sm mt-2">Gielis Formülü</div>
                <div className="text-xs text-gray-300 mt-1">Parametreler: n1, n2, n3</div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {shapes.map((shape, idx) => (
            <div 
              key={shape.id}
              className={`${maximizedCard === shape.id ? 'hidden' : 'block'} h-96 min-h-96`}
            >
              <ShapeCard
                title={shape.title}
                shapeType={shape.type}
                defaultParams={shape.params}
                isMaximized={false}
                onMaximize={() => handleMaximize(shape.id)}
              />
            </div>
          ))}
          
          {/* Maximized Card */}
          {maximizedCard && (
            <div className="fixed inset-0 z-50 p-4">
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
          <p>💡 İpucu: Panelleri sürükleyerek yeniden düzenleyebilir, boyutu değiştirebilir ve parametreleri keşfedebilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}