import React, { useState } from 'react';
import { Circle, Settings } from 'lucide-react';

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

const ShapeCard = ({ title, shapeType, defaultParams }) => {
  const [params, setParams] = useState(defaultParams);
  const [rotation, setRotation] = useState(0);

  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: parseFloat(value) }));
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.02) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const paths = ShapeGenerators[shapeType]({ ...params, rotation });

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      
      <svg width="300" height="300" className="border border-gray-200 rounded mb-3">
        {Array.isArray(paths) ? (
          paths.map((path, idx) => (
            <path
              key={idx}
              d={path}
              fill="none"
              stroke="#333"
              strokeWidth="1"
              opacity={0.7}
            />
          ))
        ) : (
          <path d={paths} fill="none" stroke="#333" strokeWidth="1.5" />
        )}
      </svg>

      <div className="space-y-2">
        {Object.entries(defaultParams).map(([key, value]) => (
          key !== 'rotation' && (
            <div key={key} className="flex items-center gap-2">
              <label className="text-sm text-gray-600 w-16">{key}:</label>
              <input
                type="range"
                min="0.5"
                max={key === 'size' ? 145 : key === 'turns' ? 10 : key.includes('n') ? 10 : 20}
                step="0.5"
                value={params[key]}
                onChange={(e) => updateParam(key, e.target.value)}
                className="flex-1"
              />
              <span className="text-sm text-gray-700 w-12">{params[key].toFixed(1)}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [showInfo, setShowInfo] = useState(false);

  const shapes = [
    {
      title: 'Rose/Rozet',
      type: 'rose',
      params: { n: 5, d: 1, size: 135 }
    },
    {
      title: 'Spiral',
      type: 'spiral',
      params: { turns: 3, size: 125, lines: 12 }
    },
    {
      title: 'Lissajous',
      type: 'lissajous',
      params: { a: 3, b: 4, delta: Math.PI / 2, size: 125 }
    },
    {
      title: 'Dönen Çokgen',
      type: 'polygon',
      params: { sides: 6, layers: 12, size: 135 }
    },
    {
      title: 'Katmanlı Üçgen',
      type: 'triangleSpiral',
      params: { layers: 15, size: 135, twist: 2 }
    },
    {
      title: 'Superellipse',
      type: 'superellipse',
      params: { n1: 4, n2: 2.5, n3: 2.5, size: 135 }
    },
    {
      title: 'Rose (7/3)',
      type: 'rose',
      params: { n: 7, d: 3, size: 135 }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Parametrik 2D Şekil Üreteci
          </h1>
          <p className="text-gray-600">
            Matematiksel formüller ile animasyonlu geometrik desenler
          </p>
          
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings size={18} />
            {showInfo ? 'Bilgileri Gizle' : 'Formülasyonları Göster'}
          </button>
        </div>

        {showInfo && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Matematiksel Formüller</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <strong>Rose/Rozet:</strong> r = a·sin(n/d·θ)
                <br />Parametreler: n (yaprak sayısı), d (yoğunluk)
              </div>
              <div>
                <strong>Spiral:</strong> r = a·t, θ = 2πkt
                <br />Parametreler: turns (dönüş), lines (çizgi sayısı)
              </div>
              <div>
                <strong>Lissajous:</strong> x = A·sin(at + δ), y = B·sin(bt)
                <br />Parametreler: a, b (frekans), δ (faz farkı)
              </div>
              <div>
                <strong>Dönen Çokgen:</strong> Katmanlı açısal transformasyon
                <br />Parametreler: sides (kenar), layers (katman)
              </div>
              <div>
                <strong>Katmanlı Üçgen:</strong> Eşkenar üçgen + rotasyon
                <br />Parametreler: layers (katman), twist (dönme)
              </div>
              <div>
                <strong>Superellipse:</strong> Gielis formülü
                <br />Parametreler: n1, n2, n3 (şekil parametreleri)
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shapes.map((shape, idx) => (
            <ShapeCard
              key={idx}
              title={shape.title}
              shapeType={shape.type}
              defaultParams={shape.params}
            />
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Slider'ları kullanarak parametreleri değiştirebilir ve farklı desenler oluşturabilirsiniz</p>
        </div>
      </div>
    </div>
  );
}